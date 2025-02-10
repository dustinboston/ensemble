# Builds the Ensemble interpreter JavaScript using ESBuild and the standalone 
# executable using QuickJS-NG. QuickJS-NG is a fork of the QuickJS JavaScript 
# engine that is actively maintained.
#
# **Note About Parallel Testing** 
# It is not possible to run the tests in parallel at the moment because there 
# when this code was ported from Deno to QuickJS there were tests with steps.
# These tests were not modified during conversion and remain order-dependent.
# 
# **Note Regarding Compiling**
# QuickJS-NG does NOT compile the same way that QuickJS does it.
# See https://quickjs-ng.github.io/quickjs/cli for more information.
#
# **Directory Structure**
# root
# ├── bin
# ├── lib
# │   └── quickjs
# │       └── build
# ├── src
# │   ├── ensemble
# │   │   ├── build
# │   │   └── tests
# │   ├── examples
# │   └── extension
# ├── var
# │   ├── data
# │   ├── generated
# │   └── reference
# └── Makefile
#

# Variables
PYTHON=python
NODE=npx -y
VSCE=vsce

# Directories
BIN_DIR=./bin
ENSEMBLE_SRC_DIR=./src/ensemble
ENSEMBLE_BINARY_FILE=$(BIN_DIR)/ensemble
ENSEMBLE_BUILD_DIR=$(ENSEMBLE_SRC_DIR)/build
ENSEMBLE_BUNDLE_FILE=$(BIN_DIR)/ensemble.js
ENSEMBLE_TESTS_DIR=$(ENSEMBLE_SRC_DIR)/tests
ENSEMBLE_TS_FILES:=$(shell find $(ENSEMBLE_SRC_DIR) -name '*.ts')
EXTENSION_DIR=./src/extension
QJS_BINARY_FILE=$(BIN_DIR)/qjs
QUICKJS_DIR=./lib/quickjs
QUICKJS_BUILD_DIR=$(QUICKJS_DIR)/build
EXTENSION_VERSION=0.0.5

# Targets
.PHONY: clean build test install package repl $(BIN_DIR)

all: build

# # Create the bin directory (and make qjs executables executable)
# $(BIN_DIR):
# 	mkdir -p $(BIN_DIR)

# Copy the QuickJS binary to the bin directory. Note, 
$(QJS_BINARY_FILE): $(QUICKJS_BUILD_DIR)/qjs $(BIN_DIR)
	@cp "$(QUICKJS_BUILD_DIR)/$(notdir $@)" $@; chmod +x $@

# Compile the ensemble.js interpreter into a standalone binary
$(ENSEMBLE_BINARY_FILE): $(QJS_BINARY_FILE) $(ENSEMBLE_BUNDLE_FILE)
	$(QJS_BINARY_FILE) --std --module --out "$(ENSEMBLE_BINARY_FILE)" --compile "$(ENSEMBLE_BUNDLE_FILE)"

# Bundle Typescript into a single file. See "Note Regarding Compiling".
$(ENSEMBLE_BUNDLE_FILE): $(ENSEMBLE_TS_FILES)
	$(NODE) esbuild "$(ENSEMBLE_SRC_DIR)/cli.ts" --outfile="$(ENSEMBLE_BUNDLE_FILE)" --bundle --format=esm --minify --platform=neutral --target=esnext --external:qjs:* --main-fields=main,module

# Ensure that the QuickJS compiler and interpreter are built
$(QUICKJS_BUILD_DIR)/qjs: $(QUICKJS_DIR)/Makefile
	cd "$(QUICKJS_DIR)" && make

# Compile all of the Typescript files to JavaScript in the build directory
$(ENSEMBLE_BUILD_DIR)/%.js: $(ENSEMBLE_TS_FILES)
	cd "$(ENSEMBLE_SRC_DIR)" && $(NODE) tsc --build

# # Test compilation rules
# $(ENSEMBLE_BUILD_DIR)/%_test.js: $(ENSEMBLE_SRC_DIR)/%.ts $(ENSEMBLE_BUILD_DIR)/cli.js
# 	$(NODE) esbuild --bundle $< --outfile $@ --format=esm --external:std --external:os

# $(ENSEMBLE_BUILD_DIR)/tests/%_test.js: $(ENSEMBLE_SRC_DIR)/tests/%.ts $(ENSEMBLE_BUILD_DIR)/cli.js
# 	$(NODE) esbuild --bundle $< --outfile $@ --format=esm --external:std --external:os

# Build the Ensemble CLI JavaScript file and standalone binary
build: $(QJS_BINARY_FILE) $(ENSEMBLE_BUNDLE_FILE) $(ENSEMBLE_BINARY_FILE) $(ENSEMBLE_BUILD_DIR)/%.js
	# $(ENSEMBLE_BUILD_DIR)/%.js $(ENSEMBLE_BUILD_DIR)/tests/%_test.js

# Clean the Ensemble build directory and artifacts
clean:
	@if [ -d "$(ENSEMBLE_BUILD_DIR)" ]; then cd "$(ENSEMBLE_SRC_DIR)" && $(NODE) tsc --build --clean; fi  
	@if [ -f "$(ENSEMBLE_BUNDLE_FILE)" ]; then rm $(ENSEMBLE_BUNDLE_FILE); fi
	@if [ -f "$(ENSEMBLE_BINARY_FILE)" ]; then rm $(ENSEMBLE_BINARY_FILE); fi
	
# Cleans up the QuickJS build directory and artifacts
deep-clean: clean
	@if [ -d "$(QUICKJS_DIR)" ]; then cd "$(QUICKJS_DIR)" && make clean; fi
	@if [ -d "$(QUICKJS_BUILD_DIR)" ]; then rm -rf "$(QUICKJS_BUILD_DIR)"; fi
	@if [ -f "$(QJS_BINARY_FILE)" ]; then rm $(QJS_BINARY_FILE); fi

# # Install syntax and snippets extensions
# install: package
# 	cd $(EXTENSION_DIR) && npm install
# 	code --install-extension $(EXTENSION_DIR)/ensemble-syntax-$(EXTENSION_VERSION).vsix

# # Package syntax and snippets extensions
# package:
# 	cd $(EXTENSION_DIR) && $(NODE) $(VSCE) package

# Testing
# test-e2e test-fun 
test: test-unit-fun test-e2e

test-e2e:
	$(PYTHON) "$(BIN_DIR)/runtest.py" --deferrable --optional "$(ENSEMBLE_TESTS_DIR)/stepA_mal.mal" -- $(BIN_DIR)/run

# # Run functional tests in the tests directory.
# test-fun: $(ENSEMBLE_BUILD_DIR)/tests/%_test.js
# 	find "$(ENSEMBLE_BUILD_DIR)/tests" -type f -name '*_test.js' -print0 -exec $(QJS_BINARY_FILE) {} \;

# Run both unit tests and functional tests.
test-unit-fun: $(ENSEMBLE_BUILD_DIR)/%_test.js
	find "$(ENSEMBLE_BUILD_DIR)" -type f -name '*_test.js' -print0 -exec $(QJS_BINARY_FILE) {} \;

# # Start the repl
# repl: $(ENSEMBLE_BUNDLE_FILE) $(QJS_BINARY_FILE)
# 	$(QJS_BINARY_FILE) --std --module "$(ENSEMBLE_BUNDLE_FILE)"

format:
	npx @biomejs/biome format --write
