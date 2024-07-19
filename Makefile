# Makefile

# Variables
FILE=$(file)

# Lint and fix the current file
# Nvim Usage: make lint file=%
lint_file:
	npx xo --fix $(FILE)

lint:
	npx xo --fix

# Run tests
# Nvim Usage: make test
test:
	node --test

build:
	../quickjs/qjsc -o ensemble ensemble.js

start:
	../quickjs/qjs server.js

# Default target
# Nvim Usage: make all file=%
all: lint test

