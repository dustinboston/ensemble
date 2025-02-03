# Variables
DENO=deno
ENSEMBLE=ensemble
PYTHON=python
NODE=npx
QJS=./quickjs/qjs
QJSC=./quickjs/qjsc
VSCE=vsce

# Directories
SRC=./src
GENERATED=./generated
EXAMPLES=./examples
SCRIPTS=./scripts
TESTS=./tests
REFERENCE=./reference
DOCS=./docs

# Targets

.PHONY: build clean install generate serve test

all: build

# Build
TS_FILES := $(shell find $(SRC) -name '*.ts')

$(GENERATED)/ensemble.js: $(TS_FILES)
	$(NODE) -y esbuild --bundle $(SRC)/ensemble_cli.ts --outfile=$(GENERATED)/ensemble.js --format=esm --external:std --banner:js="import * as std from 'std';"

bundle: $(GENERATED)/ensemble.js

ensemble: quickjs/qjsc $(GENERATED)/ensemble.js
	$(QJSC) -o ensemble $(GENERATED)/ensemble.js

quickjs/qjsc: quickjs/Makefile
	cd quickjs && make

quickjs/qjs: quickjs/qjsc

build: ensemble

clean:
	rm -f ensemble && cd quickjs && make clean

# Generate
generate: generate-coverage generate-docs # generate-interop

generate-coverage:
	$(SCRIPTS)/coverage.sh

generate-docs:
	$(SCRIPTS)/docs.sh

# generate-interop:
# 	$(DENO) run -A $(SCRIPTS)/js_interop.ts > $(GENERATED)/js_functions.ts

# Install
install: package install-extension-dependencies install-syntax install-snippets

install-extension-dependencies:
	npm install -g $(VSCE)

install-syntax:
	code --install-extension ./syntax/ensemble-syntax-0.0.5.vsix

install-snippets:
	code --install-extension ./snippets/ensemble-snippets-0.0.5.vsix

# Package
package: package-syntax package-snippets

package-syntax:
	cd syntax && $(VSCE) package

package-snippets:
	cd snippets && $(VSCE) package

# Run Examples
run-example: ensemble
	$(ENSEMBLE) $(EXAMPLES)/fibonacci.ensmbl

# Serve
serve: serve-coverage serve-docs # serve-demo

serve-coverage:
	$(PYTHON) -m http.server -d ./coverage

serve-docs:
	$(PYTHON) -m http.server -d $(DOCS)

repl: ensemble
	./ensemble
	
# Testing
test: test-e2e test-fun test-reference-implementation test-unit

test-e2e:
	$(PYTHON) $(SCRIPTS)/runtest.py --deferrable --optional $(TESTS)/stepA_mal.mal -- $(SCRIPTS)/run

test-fun:
	$(DENO) test -A --reporter=pretty --parallel $(TESTS)/**/*_test.ts

test-reference-implementation:
	$(DENO) test -A --reporter=pretty --parallel $(REFERENCE)/**/*_test.ts

test-unit:
	$(DENO) test -A --reporter=pretty --parallel $(SRC)/**/*_test.ts
