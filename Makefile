CC=java -jar /devtools/closure-compiler/compiler.jar
EJS=yarn -s ejs --no-with

src_files = $(shell find src -type f -name "*.js")
dist_files = $(patsubst src/%,dist/%,$(src_files))
meta_files = $(patsubst src/%.js,tmp/%.meta.json,$(src_files))

clean:; rm -rf tmp dist docs

.PHONY: docs
docs: docs/includes docs/index.html.md

docs/includes: tmp/__fullmeta.json scripts/slate-include.ejs
	mkdir -p $@
	for inc in `jq --raw-output '.[].name' $<`; do \
		$(MAKE) docs/includes/_$$inc.md; \
	done

docs/includes/%.json: tmp/__fullmeta.json
	jq 'map(select(.name=="$*"))[0]' $< > $@

docs/includes/_%.md: docs/includes/%.json scripts/slate-include.ejs
	$(EJS) \
		--data-file $< \
		--locals-name sym \
			scripts/slate-include.ejs > $@

docs/index.html.md: tmp/__fullmeta.json scripts/slate-index.ejs
	$(EJS) \
		--data-file $< \
		--locals-name syms \
			scripts/slate-index.ejs > $@

.PHONY: test
test: dist
	yarn -s tape test/*.js

.PHONY: dist
dist: $(dist_files) dist/index.js dist/browser.min.js

dist/%: src/%
	mkdir -p $(@D)
	cp $< $@

dist/__exports.js: $(dist_files) tmp/__exports.json scripts/externs.jq scripts/exports.ejs
	jq \
		-f scripts/externs.jq \
		--raw-output \
			tmp/__exports.json > dist/__externs.js
	$(EJS) \
		--locals-name exports \
		--data-file tmp/__exports.json \
		--output-file dist/__exports-raw.js \
			scripts/exports.ejs
	$(CC) \
		--compilation_level ADVANCED_OPTIMIZATIONS \
		--language_in ECMASCRIPT_NEXT \
		--module_resolution NODE \
		--process_common_js_modules \
		--isolation_mode IIFE \
		--externs dist/__externs.js \
		--js $(dist_files) dist/__exports-raw.js \
		--js_output_file $@

dist/index.js: dist/__exports.js
	sed 's/window.__________/module.exports/' $< > $@

dist/browser.min.js: dist/__exports.js
	sed 's/window.__________/window.$(BROWSER_NS)/' $< > $@

# For each file in `src` we have a corresponding file in `tmp` e.g.,
# src/foo.js -> tmp/foo.raw.json
# src/utils/bar.js -> tmp/utils/bar.raw.json
# Each *.raw.json file contains the output of JSDoc running
# against the corresponding file in the src directory.
# The *.raw.json files are automatically deleted by Make
# when these targets are called implicitly (i.e. in order to make other targets).
# However if you'd like to see their content you can call them
# explicitly. e.g., `make tmp/foo.raw.json`.
tmp/%.raw.json: src/%.js
	mkdir -p $(@D)
	yarn -s jsdoc --configure jsdoc.json --explain $< > $@

tmp/%.meta.json: tmp/%.raw.json scripts/metadata.jq
	jq -f scripts/metadata.jq $< > $@

tmp/__exports.json: $(meta_files) scripts/exports.jq
	jq -f scripts/exports.jq --raw-output -M --slurp $(meta_files) > $@

tmp/__fullmeta.json: $(meta_files)
	jq 'map(select(.namespace != null and .exports != null) | .exports[])' --slurp $^ > $@
