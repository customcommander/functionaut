CC=java -jar /devtools/closure-compiler/compiler.jar

src_files = $(shell find src -type f -name "*.js")
dist_files = $(patsubst src/%,dist/%,$(src_files))
cookbook_files = $(shell find docs/cookbook -type f -name "*.js")

clean:; rm -rf dist

.PHONY: build/docs
build/docs: api.json build/docs/manual/cookbook.md build/mkdocs.yml
	mkdir -p $(@D)
	jq --raw-output '.[].function_name' $< | xargs -I {} $(MAKE) build/docs/api/{}.md

build/api.json: api.json
	mkdir -p $(@D)
	jq 'map(.function_name) | sort_by(ascii_downcase) | map({(.): "api/\(.).md"})' $< >$@

build/mkdocs.json: docs/mkdocs.yml.json build/api.json
	mkdir -p $(@D)
	jq --slurpfile api build/api.json '.nav += [{"Flight Manual": $$api[0]}]' $< >$@

build/mkdocs.yml: build/mkdocs.json
	mkdir -p $(@D)
	npx js-yaml $< >$@

build/docs/api/%.md: api.json docs/rtfm.ejs
	mkdir -p $(@D)
	FUNC=$* npx ejs --no-with -f $^ >$@

build/cookbook.raw.json: $(cookbook_files)
	yarn -s jsdoc -X $^ >$@

build/cookbook.json: cookbook.jq build/cookbook.raw.json
	jq -f $^ >$@

build/docs/manual/cookbook.md: build/cookbook.json docs/cookbook.ejs
	yarn -s ejs --no-with -f $^ >$@

api.json: api.jq $(dist_files) 
	npx jsdoc -c jsdoc.json -X $^ | jq -f $< >$@

.PHONY: test
test: dist
	yarn -s tape test/*.test.js
	yarn -s tape docs/cookbook/*.js

.PHONY: dist
dist: $(dist_files) dist/index.js dist/browser.min.js

dist/%: src/%
	mkdir -p $(@D)
	cp $< $@

dist/_externs.js: api.json
	mkdir -p $(@D)
	jq --raw-output '"/** @externs */", "var __________;", (.[].function_name | "var \(.);")' $< >$@

dist/_exports.js: api.json
	mkdir -p $(@D)
	jq --raw-output '"window.__________ = {", (.[].function_name | "  \(.): require(\"./\(.)\"),"),"};"' $< >$@

dist/_compiled.js: $(dist_files) dist/_exports.js dist/_externs.js
	mkdir -p $(@D)
	$(CC) --compilation_level ADVANCED_OPTIMIZATIONS \
				--language_in ECMASCRIPT_NEXT \
				--module_resolution NODE \
				--process_common_js_modules \
				--isolation_mode IIFE \
				--js $^ \
				--js_output_file $@

dist/index.js: dist/_compiled.js
	mkdir -p $(@D)
	sed 's/window.__________/module.exports/' $< > $@

dist/browser.min.js: dist/_compiled.js
	mkdir -p $(@D)
	sed 's#window.__________#window["$(LIBRARY_NAMESPACE)"]#' $< > $@
