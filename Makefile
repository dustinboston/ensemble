# Builds the Ensemble interpreter JavaScript using ESBuild and the standalone 
# executable using QuickJS-NG. QuickJS-NG is a fork of the QuickJS JavaScript 
# engine that is actively maintained.

# Variables
DENO=deno
ENSEMBLE=ensemble
PYTHON=python
NODE=npx -y
QUICKJS_BUILD=./quickjs/build
QJS=$(QUICKJS_BUILD)/qjs
QJSC=$(QUICKJS_BUILD)/qjsc
VSCE=vsce

# Directories
SRC=./src
BUILD=./build
BUILD_SRC=$(BUILD)/src
BUILD_TESTS=$(BUILD)/tests
EXAMPLES=./examples
SCRIPTS=./scripts
TESTS=./tests
REFERENCE=./reference
DOCS=./docs

TS_FILES := $(shell find $(SRC) -name '*.ts')

# Targets
.PHONY: clean build test install package run-example repl

all: build

# Compile the ensemble interpreter into a standalone binary
$(BUILD)/ensemble: $(QJSC) $(BUILD)/ensemble.js
	$(QJSC) -o $(BUILD)/ensemble $(BUILD)/ensemble.js

# Ensure that the quickjs binaries are built
$(QJSC): quickjs/Makefile
	cd quickjs && make

$(QJS): $(QJSC)

# Convert Typescript to JavaScript and bundle into a single file
# --banner:js="import * as std from 'std'; import * as os from 'os';"
$(BUILD)/ensemble.js: $(TS_FILES)
	$(NODE) esbuild --bundle $(SRC)/cli.ts --outfile=$(BUILD)/ensemble.js --format=esm --external:std --external:os

# Compile all of the Typescript files to JavaScript
$(BUILD)/cli.js: $(TS_FILES)
	tsc --build

# Build the Ensemble CLI JavaScript file and standalone binary
# $(SRC)/ensemble_cli.js 
build: $(BUILD)/cli.js $(BUILD)/ensemble.js $(BUILD)/ensemble

# Clean the build directory, build Typescript files, and the quickjs binaries
clean:
	rm -rf $(BUILD)
	tsc --build --clean
	@if [ -d quickjs ]; then cd quickjs && make clean; fi

# Install syntax and snippets extensions
install: package
	npm install -g $(VSCE)
	code --install-extension ./syntax/ensemble-syntax-0.0.5.vsix
	code --install-extension ./snippets/ensemble-snippets-0.0.5.vsix

# Package syntax and snippets extensions
package:
	cd syntax && $(VSCE) package
	cd snippets && $(VSCE) package

# Run the example fibonacci program
run-example: ensemble
	$(ENSEMBLE) $(EXAMPLES)/fibonacci.ensmbl

# Run the Ensemble REPL
repl: $(QJS)
	$(QJS) $(BUILD)/ensemble.js
	
# Testing
test: test-e2e test-fun test-unit

test-e2e:
	$(PYTHON) $(SCRIPTS)/runtest.py --deferrable --optional $(TESTS)/stepA_mal.mal -- $(SCRIPTS)/run

test-fun: $(BUILD_SRC)/cli.js
	@for file in $(wildcard $(BUILD_TESTS)/**/*_test.js); do \
		$(QJS) $$file; \
	done

test-unit: $(BUILD_SRC)/io.js
	@for file in $(shell find $(BUILD_SRC) -name '*_test.js'); do \
		echo "Running $$file"; \
		$(QJS) --std $$file; \
	done

# Run functional tests in parallel
# Find all JavaScript test files in the $(TESTS) directory
# -name '*_test.js'    → Looks for files ending with '_test.js'
# -print0              → Prints file names separated by null characters (safer for handling spaces)
# | xargs -0           → Reads null-separated filenames
# -P 4                 → Runs up to 4 tests in parallel
# -I {}                → Replaces '{}' with the filename in the command
# test-fun: $(SRC)/ensemble_cli.js
# 	find $(TESTS) -name '*_test.js' -print0 | xargs -0 -P 4 -I {} sh -c 'echo "Running {}"; $(QJS) {}'

# Run unit tests in parallel
# Find all JavaScript unit test files in the $(SRC) directory
# -name '*_test.js'    → Selects test files matching the pattern
# -print0              → Uses null character as separator (prevents issues with spaces in filenames)
# | xargs -0           → Reads null-separated input from find
# -P 4                 → Runs up to 4 test scripts in parallel
# -I {}                → Substitutes '{}' with each filename
# test-unit: $(SRC)/ensemble_cli.js
# 	find $(SRC) -name '*_test.js' -print0 | xargs -0 -P 4 -I {} sh -c 'echo "Running {}"; $(QJS) --std {}'
