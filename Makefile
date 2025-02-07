# Builds the Ensemble interpreter JavaScript using ESBuild and the standalone 
# executable using QuickJS-NG. QuickJS-NG is a fork of the QuickJS JavaScript 
# engine that is actively maintained.
#
# NOTE: It is not possible to run the tests in parallel at the moment because
# there were previously Deno steps that are run in a specific order. The
# conversion to QuickJS does not address this.

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
QJS_BINARY_FILE=$(BIN_DIR)/qjs
QJSC_BINARY_FILE=$(BIN_DIR)/qjsc
QUICKJS_DIR=./lib/quickjs
QUICKJS_BUILD_DIR=$(QUICKJS_DIR)/build


# Targets
.PHONY: clean build test install package

all: build

# Compile the ensemble.js interpreter into a standalone binary
$(ENSEMBLE_BINARY_FILE): $(QJSC_BINARY_FILE) $(ENSEMBLE_BUNDLE_FILE)
	$(QJSC_BINARY_FILE) -o "$(ENSEMBLE_BINARY_FILE)" "$(ENSEMBLE_BUNDLE_FILE)"

# Convert Ensemble Typescript to JavaScript and bundle into a single file
# --banner:js="import * as std from 'std'; import * as os from 'os';"
$(ENSEMBLE_BUNDLE_FILE): $(ENSEMBLE_TS_FILES)
	$(NODE) esbuild --bundle "$(ENSEMBLE_SRC_DIR)/cli.ts" --outfile="$(ENSEMBLE_BUNDLE_FILE)" --format=esm --external:std --external:os

# Copy the QuickJS compiler and interpreter binaries to the bin directory
$(QJSC_BINARY_FILE) $(QJS_BINARY_FILE): $(QUICKJS_BUILD_DIR)/qjsc $(QUICKJS_BUILD_DIR)/qjs
	@if [ -f "$(QUICKJS_BUILD_DIR)/qjsc" ]; then cp "$(QUICKJS_BUILD_DIR)/qjsc" $(QJSC_BINARY_FILE); fi
	@if [ -f "$(QUICKJS_BUILD_DIR)/qjs" ]; then cp "$(QUICKJS_BUILD_DIR)/qjs" $(QJS_BINARY_FILE); fi

# Ensure that the quickjs compiler an interpreters are built
$(QUICKJS_BUILD_DIR)/qjsc $(QUICKJS_BUILD_DIR)/qjs: $(QUICKJS_DIR)/Makefile
	cd "$(QUICKJS_DIR)" && make

# Compile all of the Typescript files to JavaScript in the build directory
$(ENSEMBLE_BUILD_DIR)/cli.js: $(ENSEMBLE_TS_FILES)
	cd "$(ENSEMBLE_SRC_DIR)" && tsc --build

# Build the Ensemble CLI JavaScript file and standalone binary
build: $(ENSEMBLE_BUNDLE_FILE) $(ENSEMBLE_BINARY_FILE)

# Clean the build directory, build Typescript files, and the quickjs binaries
clean:
	# Remove TypeScript build directory
	@if [ -d "$(ENSEMBLE_BUILD_DIR)" ]; then rm -rf "$(ENSEMBLE_BUILD_DIR)"; fi  
	
	# Remove bundled JavaScript file
	@if [ -f "$(ENSEMBLE_BUNDLE_FILE)" ]; then rm "$(ENSEMBLE_BUNDLE_FILE)"; fi

	# Remove standalone binary
	@if [ -f "$(ENSEMBLE_BINARY_FILE)" ]; then rm "$(ENSEMBLE_BINARY_FILE)"; fi

	# Clean TypeScript artifacts
	cd "$(ENSEMBLE_SRC_DIR)" && tsc --build --clean

	# Clean QuickJS build artifacts
	@if [ -d "$(QUICKJS_DIR)" ]; then cd "$(QUICKJS_DIR)" && make clean; fi

	# Remove QuickJS build directory
	@if [ -d "$(QUICKJS_BUILD_DIR)" ]; then rm -rf "$(QUICKJS_BUILD_DIR)"; fi


# Install syntax and snippets extensions
install: package
	npm install -g $(VSCE)
	code --install-extension ./syntax/ensemble-syntax-0.0.5.vsix

# Package syntax and snippets extensions
package:
	cd syntax && $(VSCE) package

# Testing
test: test-e2e test-fun test-unit

test-e2e:
	$(PYTHON) "$(BIN_DIR)/runtest.py" --deferrable --optional "$(ENSEMBLE_TESTS_DIR)/stepA_mal.mal" -- $(BIN_DIR)/run

test-fun: $(ENSEMBLE_BUILD_DIR)/cli.js
	@find "$(ENSEMBLE_BUILD_DIR)/tests" -type f -name '*_test.js' -print0 | xargs -0 -I {} $(QJS_BINARY_FILE) {}

test-unit: $(ENSEMBLE_BUILD_DIR)/io.js
	@find "$(ENSEMBLE_BUILD_DIR)" -type f -name '*_test.js' -print0 | while IFS= read -r -d '' file; do \
		echo "Running $$file"; \
		$(QJS_BINARY_FILE) --std "$$file"; \
	done
