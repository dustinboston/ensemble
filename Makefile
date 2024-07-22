test:
	./quickjs/qjs ./ensemble-test.mjs

build:
	./quickjs/qjsc -m -o ensemble repl.js

repl:
	./quickjs/qjs --module --std ./repl.js

start:
	./quickjs/qjs --module --std ./server.js

all: test

