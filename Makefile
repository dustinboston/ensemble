# Variables
PYTHON=python
NODE=npx -y
VSCE=vsce

# Directories
BIN_DIR=./bin
ENSEMBLE_SRC_DIR=./src/ensemble
ENSEMBLE_BINARY_FILE=$(BIN_DIR)/ensemble
ENSEMBLE_BUILD_DIR=$(ENSEMBLE_SRC_DIR)/build
ENSEMBLE_BUNDLE_FILE=$(BIN_DIR)/ensemble_cli.js
ENSEMBLE_RUNTIME_FILE=$(BIN_DIR)/ensemble.js
ENSEMBLE_TESTS_DIR=$(ENSEMBLE_SRC_DIR)/tests
ENSEMBLE_TS_FILES:=$(shell find $(ENSEMBLE_SRC_DIR) -name '*.ts')
EXTENSION_DIR=./src/extension
QJS_BINARY_FILE=qjs
QJS_COMPILER_FILE=qjsc
EXTENSION_VERSION=$(shell date +"%y.%m.%d-%H%M")
EXTENSION_NAME=ensemble-syntax-$(EXTENSION_VERSION).vsix
NODE_MODULES_DIR="./node_modules"

# Targets
.PHONY: clean build test install install-dependencies package repl $(BIN_DIR)

all: build

# Verify that the QuickJS binary exists.
$(QJS_BINARY_FILE):
	@echo "QuickJS binary not found."

# Verify that the QuickJS compiler exists.
$(QJS_COMPILER_FILE):
	@echo "QuickJS compiler not found."

# Compile the ensemble.js interpreter into a standalone binary
$(ENSEMBLE_BINARY_FILE): $(QJS_COMPILER_FILE) $(ENSEMBLE_BUNDLE_FILE)
	$(QJS_COMPILER_FILE) -m -o "$(ENSEMBLE_BINARY_FILE)" "$(ENSEMBLE_BUNDLE_FILE)"

# Bundle Typescript into a single file.
$(ENSEMBLE_BUNDLE_FILE): $(ENSEMBLE_TS_FILES)
	$(NODE) esbuild "$(ENSEMBLE_SRC_DIR)/cli.ts" --outfile="$(ENSEMBLE_BUNDLE_FILE)" --bundle --format=esm --minify --platform=neutral --target=esnext --external:os --external:std --main-fields=main,module

$(ENSEMBLE_RUNTIME_FILE): $(ENSEMBLE_TS_FILES)	
	$(NODE) esbuild "$(ENSEMBLE_SRC_DIR)/lib.ts" --outfile="$(ENSEMBLE_RUNTIME_FILE)" --bundle --format=esm --platform=neutral --target=esnext --main-fields=rep,initEnv,module

# Compile all of the Typescript files to JavaScript in the build directory
$(ENSEMBLE_BUILD_DIR)/%.js: $(ENSEMBLE_TS_FILES)
	cd "$(ENSEMBLE_SRC_DIR)" && $(NODE) tsc --build

# Build the Ensemble CLI JavaScript file and standalone binary
build: install-dependencies $(QJS_COMPILER_FILE) $(QJS_BINARY_FILE) $(ENSEMBLE_BUNDLE_FILE) $(ENSEMBLE_RUNTIME_FILE) $(ENSEMBLE_BINARY_FILE) $(ENSEMBLE_BUILD_DIR)/%.js

# Clean the Ensemble build directory and artifacts
clean:
	@if [ -d "$(ENSEMBLE_BUILD_DIR)" ]; then rm -rf $(ENSEMBLE_BUILD_DIR); fi  
	@if [ -d "$(NODE_MODULES_DIR)" ]; then rm -rf $(NODE_MODULES_DIR); fi  
	@if [ -f "$(ENSEMBLE_BUNDLE_FILE)" ]; then rm $(ENSEMBLE_BUNDLE_FILE); fi
	@if [ -f "$(ENSEMBLE_RUNTIME_FILE)" ]; then rm $(ENSEMBLE_RUNTIME_FILE); fi
	@if [ -f "$(ENSEMBLE_BINARY_FILE)" ]; then rm $(ENSEMBLE_BINARY_FILE); fi
	
# Install syntax and snippets extensions
install: package
	cd $(EXTENSION_DIR) && code --install-extension $(EXTENSION_NAME)

# TODO: Fetch QuickJS binary from GitHub releases
install-dependencies:	
	npm install	

# Package syntax and snippets extensions
package:
	cd $(EXTENSION_DIR) && npm install
	cd $(EXTENSION_DIR) && npm version $(EXTENSION_VERSION) --no-git-tag-version --no-commit-hooks
	cd $(EXTENSION_DIR) && $(NODE) $(VSCE) package -o $(EXTENSION_NAME)

# Testing
test: test-unit-fun # test-e2e

test-e2e:
	$(PYTHON) "$(BIN_DIR)/runtest.py" --deferrable --optional "$(ENSEMBLE_TESTS_DIR)/stepA_mal.mal" -- $(BIN_DIR)/run

# Run both unit tests and functional tests.
test-unit-fun: $(ENSEMBLE_BUILD_DIR)/%_test.js
	@echo "TAP version 13" > test_results.tap
	@find "$(ENSEMBLE_BUILD_DIR)" -type f -name '*_test.js' -exec sh -c 'echo "# $$1" && $(QJS_BINARY_FILE) "$$1"' _ {} \; >> test_results.tap 2>&1
	@echo "Test results saved to test_results.tap"

# Start the repl
repl: $(ENSEMBLE_BUNDLE_FILE) $(QJS_BINARY_FILE)
	$(QJS_BINARY_FILE) --std --module "$(ENSEMBLE_BUNDLE_FILE)"

format:
	npx @biomejs/biome format --write
