/// <reference path="./qjs.d.ts" />

import * as os from "qjs:os";
import * as std from "qjs:std";

import cli from "./io.ts";
import runner from "./tests/test_runner.ts";
import * as types from "./types.ts";

const { readir, readln, slurp, spit, writeToFile } = cli;

runner.test("readir(): should list directory contents", () => {
	const temporaryDir = ".tmpa";
	os.mkdir(temporaryDir);

	writeToFile("hello", `${temporaryDir}/file.txt`);
	writeToFile("hellow", `${temporaryDir}/file2.txt`);

	const input = types.createStringNode(temporaryDir);
	const result = readir(input);

	os.remove(`${temporaryDir}/file.txt`);
	os.remove(`${temporaryDir}/file2.txt`);
	os.remove(temporaryDir);

	types.assertVectorNode(result);
	const obj = result.value.map((item) => {
		types.assertStringNode(item);
		return item.value;
	});

	runner.assert(obj, ["file.txt", "file2.txt"]);
});

runner.test("readir(): should throw error if argument is not a string", () => {
	let threw = false;
	try {
		readir(types.createNumberNode(123) as unknown as types.StringNode);
	} catch (e) {
		threw = true;
	}

	runner.assert(threw, true);
});

runner.test("slurp(): should read a file", () => {
	const temporaryDir = ".tmpb";
	const filePath = `${temporaryDir}/file.txt`;
	const text = "content";

	os.mkdir(temporaryDir);

	writeToFile(text, filePath);

	const result = std.loadFile(filePath);

	// Remove the temporary directory before the assertion in case the assertion throws an error.
	os.remove(filePath);
	os.remove(temporaryDir);

	runner.assert(result, text);
});

runner.test("slurp(): should throw error if file does not exist", () => {
	let threw = false;
	try {
		slurp(types.createStringNode("mocks/nonexistent"));
	} catch (e) {
		threw = true;
	}

	runner.assert(threw, true);
});

runner.test("spit(): should write to a file", async () => {
	const temporaryDir = ".tmpc";
	const filePath = `${temporaryDir}/file.txt`;
	const content = "newContent";

	os.mkdir(temporaryDir);

	spit(types.createStringNode(filePath), types.createStringNode(content));

	const result = std.loadFile(filePath);

	// Remove the temporary directory before the assertion in case the assertion throws an error.
	os.remove(filePath);
	os.remove(temporaryDir);

	runner.assert(result, content);
});

runner.test("spit(): should throw error if path is not a string", () => {
	let threw = false;
	try {
		spit(types.createNumberNode(123), types.createStringNode("content"));
	} catch (e) {
		threw = true;
	}

	runner.assert(threw, true);
});

runner.test("readln(): should read line and return string", () => {
	const input = types.createStringNode("%");
	const expected = types.createStringNode('"foobar"');

	// Mock std.in.getline and std.out.puts to avoid actual I/O
	const originalGetline = std.in.getline;
	const originalPuts = std.out.puts;
	std.in.getline = () => '"foobar"';
	std.out.puts = () => {};

	try {
		runner.assert(readln(input), expected);
	} finally {
		std.in.getline = originalGetline;
		std.out.puts = originalPuts;
	}
});

runner.test(
	"readln(): should return nil/undef when readline returns null",
	() => {
		const input = types.createStringNode("%");
		const expected = types.createNilNode();

		// Mock std.in.getline and std.out.puts to avoid actual I/O
		const originalGetline = std.in.getline;
		const originalPuts = std.out.puts;
		std.in.getline = () => undefined;
		std.out.puts = () => {};

		try {
			runner.assert(readln(input), expected);
		} finally {
			std.in.getline = originalGetline;
			std.out.puts = originalPuts;
		}
	},
);

runner.test(
	"readln(): should throw when argument count is less than one",
	() => {
		let threw = false;
		try {
			readln();
		} catch (e) {
			threw = true;
		}

		runner.assert(threw, true);
	},
);

runner.test(
	"readln(): should throw when argument count is more than one",
	() => {
		let threw = false;
		try {
			readln(types.createStringNode("foo"), types.createStringNode("bar"));
		} catch (e) {
			threw = true;
		}

		runner.assert(threw, true);
	},
);

runner.test("readln(): should throw when argument is not a string", () => {
	let threw = false;
	try {
		readln(types.createNumberNode(42));
	} catch (e) {
		threw = true;
	}

	runner.assert(threw, true);
});

runner.report();
