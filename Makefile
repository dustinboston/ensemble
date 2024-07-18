# Makefile

# Variables
FILE=$(file)

# Lint and fix the current file
# Nvim Usage: make lint file=%
lint:
	npx xo --fix $(FILE)

# Run tests
# Nvim Usage: make test
test:
	node --test

# Default target
# Nvim Usage: make all file=%
all: lint test

