CC=java -jar /devtools/closure-compiler/compiler.jar

src_files = $(shell find src -type f -name "*.js" | sort --ignore-case)
api_files = $(filter-out src/_%.js,$(src_files))
dist_files = $(patsubst src/%,dist/%,$(src_files))
api_docs = $(patsubst src/%.js,build/docs/api/%.md,$(api_files))

clean:; rm -rf dist

.PHONY: build/docs
build/docs: $(api_docs) build/mkdocs.yml

build/mkdocs.yml: docs/mkdocs.yml docs/nav.jq api.json
	jq --raw-output -f docs/nav.jq api.json | cat $< - >$@

build/docs/api/%.md: api.json docs/rtfm.ejs
	mkdir -p $(@D)
	FUNC=$* npx ejs --no-with -f $^ >$@

api.json: api.jq $(api_files) 
	npx jsdoc -X $^ | jq -f $< >$@

.PHONY: test
test: dist
	yarn -s tape test/*.js

.PHONY: dist
dist: $(dist_files) dist/index.js dist/browser.min.js

dist/%: src/%
	mkdir -p $(@D)
	cp $< $@

dist/__externs.js: api.json
	mkdir -p $(@D)
	jq --raw-output '"var __________;", (.[].function_name | "var \(.);")' $< >$@

dist/__exports.js: api.json
	mkdir -p $(@D)
	jq --raw-output '"window.__________ = {", (.[].function_name | "  \(.): require(\"./\(.)\"),"),"};"' $< >$@

dist/__compiled.js: $(dist_files) dist/__exports.js dist/__externs.js
	mkdir -p $(@D)
	$(CC) --compilation_level ADVANCED_OPTIMIZATIONS \
				--language_in ECMASCRIPT_NEXT \
				--module_resolution NODE \
				--process_common_js_modules \
				--isolation_mode IIFE \
				--externs dist/__externs.js \
				--js $(dist_files) dist/__exports.js \
				--js_output_file $@

dist/index.js: dist/__compiled.js
	mkdir -p $(@D)
	sed 's/window.__________/module.exports/' $< > $@

dist/browser.min.js: dist/__compiled.js
	mkdir -p $(@D)
	sed 's#window.__________#window["$(LIBRARY_NAMESPACE)"]#' $< > $@
