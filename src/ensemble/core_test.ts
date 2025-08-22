import core from "./core.ts";
import runner from "./tests/test_runner.ts";
import * as types from "./types.ts";

runner.test("eq(): returns true for equal nodes", () => {
	runner.assert(
		core.eq(types.createNumberNode(1), types.createNumberNode(1)),
		types.createBooleanNode(true),
	);
});

runner.test("eq(): returns false for unequal nodes", () => {
	runner.assert(
		core.eq(types.createNumberNode(1), types.createNumberNode(2)),
		types.createBooleanNode(false),
	);
});

runner.test("printEscapedString(): returns escaped string", () => {
	runner.assert(
		core.printEscapedString(types.createStringNode("abc\ndef\nghi")),
		types.createStringNode('"abc\\ndef\\nghi"'),
	);
});

runner.test("printUnescapedString(): returns unescaped string", () => {
	runner.assert(
		core.printUnescapedString(types.createStringNode("abc\ndef\nghi")),
		types.createStringNode("abc\ndef\nghi"),
	);
});

runner.test("printEscapedStringToScreen(): logs the escaped string", () => {
	const oldLog = console.log;
	let calls = 0;
	let args: string[] = [];
	console.log = (...x) => {
		args = x;
		calls++;
	};

	try {
		runner.assert(
			core.printEscapedStringToScreen(types.createStringNode("abc\ndef\nghi")),
			types.createNilNode(),
		);
	} finally {
		console.log = oldLog;
	}

	runner.assert(args, ['"abc\\ndef\\nghi"']);
	runner.assert(calls, 1);
});

runner.test("printUnescapedStringToScreen(): logs the unescaped string", () => {
	const oldLog = console.log;
	let calls = 0;
	let args: string[] = [];
	console.log = (...x) => {
		args = x;
		calls++;
	};

	try {
		runner.assert(
			core.printUnescapedStringToScreen(
				types.createStringNode("abc\ndef\nghi"),
			),
			types.createNilNode(),
		);
	} finally {
		console.log = oldLog;
	}

	runner.assert(args, ["abc\ndef\nghi"]);
	runner.assert(calls, 1);
});

runner.test("readString(): should read string and return AST", () => {
	const input = types.createStringNode("(+ 2 3)");
	const expected = types.createListNode([
		types.createSymbolNode("+"),
		types.createNumberNode(2),
		types.createNumberNode(3),
	]);
	runner.assert(core.readString(input), expected);
});

runner.test("readString(): throws when there are zero arguments", () => {
	let threw = false;
	try {
		core.readString();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("readString(): throws when there is more than one argument", () => {
	let threw = false;
	try {
		core.readString(
			types.createStringNode("foo"),
			types.createStringNode("bar"),
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("readString(): should throw when argument is not a string", () => {
	let threw = false;
	try {
		core.readString(types.createNumberNode(42));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test(
	"trim(): should trim whitespace from the start and end of a string",
	() => {
		runner.assert(
			core.trim(types.createStringNode("  hello  ")),
			types.createStringNode("hello"),
		);
	},
);

runner.test(
	"trim(): should throw an error when no arguments are provided",
	() => {
		let threw = false;
		try {
			core.trim();
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

runner.test(
	"trim(): should throw an error when more than one argument is provided",
	() => {
		let threw = false;
		try {
			core.trim(
				types.createStringNode("hello"),
				types.createStringNode("world"),
			);
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

runner.test(
	"trim(): should throw an error when the argument is not a string",
	() => {
		let threw = false;
		try {
			core.trim(types.createNumberNode(123));
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

// Test for '<'
runner.test("lt(): should return false if 'a' is greater than 'b'", () => {
	const result1 = core.lt(types.createNumberNode(2), types.createNumberNode(1));
	runner.assert(result1, types.createBooleanNode(false));
});

runner.test("lt(): should return false if 'a' is equal to 'b'", () => {
	const result1 = core.lt(types.createNumberNode(1), types.createNumberNode(1));
	runner.assert(result1, types.createBooleanNode(false));
});

runner.test("lt(): should return true if 'a' is less than 'b'", () => {
	const result2 = core.lt(types.createNumberNode(1), types.createNumberNode(2));
	runner.assert(result2, types.createBooleanNode(true));
});

// Test for '<='
runner.test("lte(): should return false if 'a' is greater than 'b'", () => {
	const result1 = core.lte(
		types.createNumberNode(2),
		types.createNumberNode(1),
	);
	runner.assert(result1, types.createBooleanNode(false));
});

runner.test("lte(): should return true if 'a' is equal to 'b'", () => {
	const result2 = core.lte(
		types.createNumberNode(1),
		types.createNumberNode(1),
	);
	runner.assert(result2, types.createBooleanNode(true));
});

runner.test("lte(): should return true if 'a' is less than 'b'", () => {
	const result2 = core.lte(
		types.createNumberNode(1),
		types.createNumberNode(2),
	);
	runner.assert(result2, types.createBooleanNode(true));
});

// Test for '>'
runner.test("gt(): should return true if 'a' is greater than 'b'", () => {
	const result1 = core.gt(types.createNumberNode(2), types.createNumberNode(1));
	runner.assert(result1, types.createBooleanNode(true));
});

runner.test("gt(): should return false if 'a' is less than 'b'", () => {
	const result2 = core.gt(types.createNumberNode(1), types.createNumberNode(2));
	runner.assert(result2, types.createBooleanNode(false));
});

runner.test("gt(): should return false if 'a' is equal to 'b'", () => {
	const result2 = core.gt(types.createNumberNode(1), types.createNumberNode(1));
	runner.assert(result2, types.createBooleanNode(false));
});

// Test for '>='
runner.test("gte(): should return true if 'a' is greater than 'b'", () => {
	const result1 = core.gte(
		types.createNumberNode(2),
		types.createNumberNode(1),
	);
	runner.assert(result1, types.createBooleanNode(true));
});

runner.test("gte(): should return true if 'a' is equal to 'b'", () => {
	const result2 = core.gte(
		types.createNumberNode(1),
		types.createNumberNode(1),
	);
	runner.assert(result2, types.createBooleanNode(true));
});

// Test for '+'
runner.test("add(): should sum two numbers", () => {
	const result = core.add(types.createNumberNode(2), types.createNumberNode(1));
	runner.assert(result, types.createNumberNode(3));
});

// Test for '+' error case
runner.test(
	"add(): should throw an error if an argument is not a number",
	() => {
		let threw = false;
		try {
			core.add(types.createStringNode("not a num"), types.createNumberNode(1));
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

// Test for '-'
runner.test(
	"subtract(): should find the difference between two numbers",
	() => {
		const result = core.subtract(
			types.createNumberNode(2),
			types.createNumberNode(1),
		);
		runner.assert(result, types.createNumberNode(1));
	},
);

// Test for '-' error case
runner.test(
	"subtract(): should throw an error if an argument is not a number",
	() => {
		let threw = false;
		try {
			core.subtract(
				types.createStringNode("not a num"),
				types.createNumberNode(1),
			);
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

// Test for '*'
runner.test("multiply(): should find the product of two numbers", () => {
	const result = core.multiply(
		types.createNumberNode(2),
		types.createNumberNode(3),
	);
	runner.assert(result, types.createNumberNode(6));
});

// Test for '*' error case
runner.test(
	"multiply(): should throw an error if an argument is not a number",
	() => {
		let threw = false;
		try {
			core.multiply(
				types.createStringNode("not a num"),
				types.createNumberNode(1),
			);
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

// Test for '/'
runner.test("divide(): should find the quotient of two numbers", () => {
	const result = core.divide(
		types.createNumberNode(4),
		types.createNumberNode(2),
	);
	runner.assert(result, types.createNumberNode(2));
});

// Test for '/' error case
runner.test(
	"divide(): should throw an error if an argument is not a number",
	() => {
		let threw = false;
		try {
			core.divide(
				types.createStringNode("not a num"),
				types.createNumberNode(1),
			);
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

runner.test("timeMs(): should return a unix timestamp", () => {
	const result = core.timeMs() as types.NumberNode;
	const currentTime = new Date().getTime();

	// Ensure it's a number
	runner.assert(typeof result.value, "number");

	// Ensure it's reasonably close to the current time
	runner.assert(Math.abs(currentTime - result.value) < 1000, true);
});

runner.test("list(): should return a list containing the given args", () => {
	const a = types.createNumberNode(1);
	const b = types.createNumberNode(2);
	const result = core.list(a, b);
	runner.assert(types.isListNode(result), true);
	runner.assert(result.value, [a, b]);
});

// Test for 'isList'
runner.test(
	"isListNode(): should return true if the argument is a list",
	() => {
		const aList = types.createListNode([types.createNumberNode(1)]);
		runner.assert(types.isListNode(aList), true);
	},
);

runner.test(
	"isListNode(): should return false if the argument is not a list",
	() => {
		const notList = types.createNumberNode(1);
		runner.assert(types.isListNode(notList), false);
	},
);

runner.test("conj(): should throw with with less than 2 arguments", () => {
	let threw = false;
	try {
		core.conj(types.createListNode([types.createNumberNode(1)]));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("conj(): should conjoin values in a list", () => {
	runner.assert(
		core.conj(
			types.createListNode([
				types.createNumberNode(1),
				types.createNumberNode(2),
				types.createNumberNode(3),
			]),
			types.createNumberNode(4),
			types.createNumberNode(5),
		),
		types.createListNode([
			types.createNumberNode(5),
			types.createNumberNode(4),
			types.createNumberNode(1),
			types.createNumberNode(2),
			types.createNumberNode(3),
		]),
	);
});

runner.test("conj(): should conjoin values in a vector", () => {
	runner.assert(
		core.conj(
			types.createVectorNode([
				types.createNumberNode(1),
				types.createNumberNode(2),
				types.createNumberNode(3),
			]),
			types.createNumberNode(4),
			types.createNumberNode(5),
		),
		types.createVectorNode([
			types.createNumberNode(1),
			types.createNumberNode(2),
			types.createNumberNode(3),
			types.createNumberNode(4),
			types.createNumberNode(5),
		]),
	);
});

runner.test("conj(): should throw without a List or Vector", () => {
	let threw = false;
	try {
		core.conj(types.createNumberNode(42), types.createNumberNode(1));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("concat(): with no arguments", () => {
	runner.assert(core.concat(), types.createListNode([]));
});

runner.test("concat(): with one list", () => {
	runner.assert(
		core.concat(
			types.createListNode([
				types.createNumberNode(1),
				types.createNumberNode(2),
			]),
		),
		types.createListNode([
			types.createNumberNode(1),
			types.createNumberNode(2),
		]),
	);
});

runner.test("concat(): with two lists", () => {
	runner.assert(
		core.concat(
			types.createListNode([
				types.createNumberNode(1),
				types.createNumberNode(2),
			]),
			types.createListNode([
				types.createNumberNode(3),
				types.createNumberNode(4),
			]),
		),
		types.createListNode([
			types.createNumberNode(1),
			types.createNumberNode(2),
			types.createNumberNode(3),
			types.createNumberNode(4),
		]),
	);
});

runner.test("concat(): with three lists", () => {
	runner.assert(
		core.concat(
			types.createListNode([
				types.createNumberNode(1),
				types.createNumberNode(2),
			]),
			types.createListNode([
				types.createNumberNode(3),
				types.createNumberNode(4),
			]),
			types.createListNode([
				types.createNumberNode(5),
				types.createNumberNode(6),
			]),
		),
		types.createListNode([
			types.createNumberNode(1),
			types.createNumberNode(2),
			types.createNumberNode(3),
			types.createNumberNode(4),
			types.createNumberNode(5),
			types.createNumberNode(6),
		]),
	);
});

runner.test("concat(): with empty lists", () => {
	runner.assert(
		core.concat(types.createListNode([]), types.createListNode([])),
		types.createListNode([]),
	);
});

runner.test("concat(): with non-Seq type should throw", () => {
	let threw = false;
	try {
		core.concat(types.createNumberNode(1));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test(
	"cons(): should construct a list by prepending the given value",
	() => {
		runner.assert(
			core.cons(
				types.createNumberNode(0),
				types.createListNode([
					types.createNumberNode(1),
					types.createNumberNode(2),
					types.createNumberNode(3),
				]),
			),
			types.createListNode([
				types.createNumberNode(0),
				types.createNumberNode(1),
				types.createNumberNode(2),
				types.createNumberNode(3),
			]),
		);
	},
);

runner.test("cons(): should throw error with less than 2 arguments", () => {
	let threw = false;
	try {
		core.cons(types.createNumberNode(0));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("cons(): should throw error with more than 2 arguments", () => {
	let threw = false;
	try {
		core.cons(
			types.createNumberNode(0),
			types.createNumberNode(0),
			types.createNumberNode(0),
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test(
	"cons(): should throw error if second argument is not a List",
	() => {
		const value = types.createNumberNode(0);
		const notList = types.createNumberNode(42);
		let threw = false;
		try {
			core.cons(value, notList);
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

// Test for 'vec' when input is a list
runner.test("vec(): should convert a list into a vector", () => {
	runner.assert(
		core.vec(
			types.createListNode([
				types.createNumberNode(1),
				types.createNumberNode(2),
				types.createNumberNode(3),
			]),
		),
		types.createVectorNode([
			types.createNumberNode(1),
			types.createNumberNode(2),
			types.createNumberNode(3),
		]),
	);
});

// Test for 'vec' when input is not a list
runner.test(
	"vec(): should return the original node if the argument is not a List",
	() => {
		const notList = types.createNumberNode(1);
		runner.assert(core.vec(notList), notList);
	},
);

// Test for 'vec' when there are multiple arguments
runner.test("vec(): should ignore additional arguments", () => {
	runner.assert(
		core.vec(
			types.createListNode([types.createNumberNode(1)]),
			types.createNumberNode(2),
		),
		types.createVectorNode([types.createNumberNode(1)]),
	);
});

// Test for 'vec' when no arguments
runner.test(
	"vec(): should return undefined if no arguments are provided",
	() => {
		runner.assert(core.vec(), undefined);
	},
);

runner.test("nth(): should return the nth element of a list", () => {
	runner.assert(
		core.nth(
			types.createListNode([
				types.createSymbolNode("a"),
				types.createSymbolNode("b"),
				types.createSymbolNode("c"),
			]),
			types.createNumberNode(1),
		),
		types.createSymbolNode("b"),
	);
});

runner.test("nth(): should throw error when index is out of range", () => {
	let threw = false;
	try {
		core.nth(
			types.createListNode([types.createSymbolNode("a")]),
			types.createNumberNode(1),
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test(
	"firstNodeInList(): should return the first element of a list",
	() => {
		runner.assert(
			core.firstNodeInList(
				types.createListNode([
					types.createSymbolNode("a"),
					types.createSymbolNode("b"),
				]),
			),
			types.createSymbolNode("a"),
		);
	},
);

runner.test("firstNodeInList(): should return nil for empty list", () => {
	runner.assert(
		core.firstNodeInList(types.createListNode([])),
		types.createNilNode(),
	);
});

runner.test("rest(): should return a list without the first element", () => {
	runner.assert(
		core.rest(
			types.createListNode([
				types.createNumberNode(1),
				types.createNumberNode(2),
				types.createNumberNode(3),
			]),
		),
		types.createListNode([
			types.createNumberNode(2),
			types.createNumberNode(3),
		]),
	);
});

runner.test("rest(): should return empty list for single-element list", () => {
	runner.assert(
		core.rest(types.createListNode([types.createNumberNode(1)])),
		types.createListNode([]),
	);
});

runner.test("empty(): should return true for an empty list", () => {
	runner.assert(
		core.empty(types.createListNode([])),
		types.createBooleanNode(true),
	);
});

runner.test("empty(): should return false for a non-empty list", () => {
	runner.assert(
		core.empty(types.createListNode([types.createNumberNode(2)])),
		types.createBooleanNode(false),
	);
});

runner.test("count(): should return the length of a list", () => {
	runner.assert(
		core.length(
			types.createListNode([
				types.createNumberNode(1),
				types.createNumberNode(2),
			]),
		),
		types.createNumberNode(2),
	);
});

runner.test("count(): should return 0 for an empty list", () => {
	runner.assert(
		core.length(types.createListNode([])),
		types.createNumberNode(0),
	);
});

runner.test("should return 0 for a Nil value", () => {
	runner.assert(core.length(types.createNilNode()), types.createNumberNode(0));
});

runner.test("atom(): should create an Atom from a given node", () => {
	runner.assert(
		core.atom(types.createNumberNode(42)),
		types.createAtomNode(types.createNumberNode(42)),
	);
});

runner.test("atom(): should throw error when no arguments are provided", () => {
	let threw = false;
	try {
		core.atom();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("isAtom(): should return true if the node is an Atom", () => {
	runner.assert(
		core.isAtom(types.createAtomNode(types.createNumberNode(42))),
		types.createBooleanNode(true),
	);
});

runner.test("isAtom(): should return false if the node is not an Atom", () => {
	runner.assert(
		core.isAtom(types.createNumberNode(42)),
		types.createBooleanNode(false),
	);
});

runner.test("deref(): should return the node contained in the Atom", () => {
	runner.assert(
		core.deref(types.createAtomNode(types.createNumberNode(42))),
		types.createNumberNode(42),
	);
});

runner.test("deref(): should throw error for non-Atom nodes", () => {
	let threw = false;
	try {
		core.deref(types.createNumberNode(42));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test(
	"reset(): should update the Atom's value and return the node",
	() => {
		const atom = types.createAtomNode(types.createNumberNode(42));
		runner.assert(atom.value, types.createNumberNode(42));
		runner.assert(
			core.reset(atom, types.createNumberNode(43)),
			types.createNumberNode(43),
		);
		runner.assert(atom.value, types.createNumberNode(43));
	},
);

runner.test("reset(): should throw error for non-Atom first argument", () => {
	let threw = false;
	try {
		core.reset(types.createNumberNode(42), types.createNumberNode(43));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("should throw an error for insufficient arguments", () => {
	let threw = false;
	try {
		core.swap(types.createAtomNode(types.createStringNode("a")));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test(
	"swap(): should throw an error if the first argument is not an Atom",
	() => {
		let threw = false;
		try {
			core.swap(
				types.createStringNode("not an atom"),
				types.createFunctionNode((a) => a),
			);
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

runner.test(
	"swap(): should throw an error if the second argument is not a Func",
	() => {
		let threw = false;
		try {
			core.swap(
				types.createAtomNode(types.createStringNode("a")),
				types.createStringNode("not a function"),
			);
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

runner.test(
	"swap(): should swap the Atoms' value with the result of the function",
	() => {
		runner.assert(
			core.swap(
				types.createAtomNode(types.createNumberNode(6)),
				types.createFunctionNode((a) =>
					types.createNumberNode((a as types.NumberNode).value * 2),
				),
			),
			types.createNumberNode(12),
		);
	},
);

runner.test("swap(): should handle additional parameters correctly", () => {
	runner.assert(
		core.swap(
			types.createAtomNode(types.createNumberNode(5)),
			types.createFunctionNode((a, b) =>
				types.createNumberNode(
					(a as types.NumberNode).value + (b as types.NumberNode).value,
				),
			),
			types.createNumberNode(7),
		),
		types.createNumberNode(12),
	);
});

runner.test("throwError(): should throw the value of an ast node", () => {
	let threw = false;
	try {
		core.throwError(types.createStringNode("foo"));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test(
	"throwError(): should throw an error when no arguments are provided",
	() => {
		let threw = false;
		try {
			core.throwError();
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

runner.test(
	"throwError(): should throw an error when given an invalid argument type",
	() => {
		let threw = false;
		try {
			core.throwError(types.createBooleanNode(false));
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

runner.test("apply(): should call a function with list arguments", () => {
	runner.assert(
		core.apply(
			types.createFunctionNode((a, b) =>
				types.createNumberNode(
					(a as types.NumberNode).value + (b as types.NumberNode).value,
				),
			),
			types.createListNode([
				types.createNumberNode(2),
				types.createNumberNode(3),
			]),
		),
		types.createNumberNode(5),
	);
});

runner.test("apply(): should concatenate other arguments with list", () => {
	runner.assert(
		core.apply(
			types.createFunctionNode((a, b, c) =>
				types.createNumberNode(
					(a as types.NumberNode).value +
						(b as types.NumberNode).value +
						(c as types.NumberNode).value,
				),
			),
			types.createNumberNode(3),
			types.createListNode([
				types.createNumberNode(2),
				types.createNumberNode(1),
			]),
		),
		types.createNumberNode(6),
	);
});

runner.test("apply(): should throw error for non-Seq last argument", () => {
	let threw = false;
	try {
		core.apply(
			types.createFunctionNode((a, b) =>
				types.createNumberNode(
					(a as types.NumberNode).value + (b as types.NumberNode).value,
				),
			),
			types.createNumberNode(3),
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("apply(): should throw error for non-Func first argument", () => {
	let threw = false;
	try {
		core.apply(
			types.createNumberNode(42),
			types.createListNode([
				types.createNumberNode(2),
				types.createNumberNode(3),
			]),
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test(
	"applyToSequence(): should call function against each item in a list",
	() => {
		runner.assert(
			core.applyToSequence(
				types.createFunctionNode(function double(x) {
					return types.createNumberNode((x as types.NumberNode).value * 2);
				}),
				types.createListNode([
					types.createNumberNode(1),
					types.createNumberNode(2),
					types.createNumberNode(3),
				]),
			),
			types.createListNode([
				types.createNumberNode(2),
				types.createNumberNode(4),
				types.createNumberNode(6),
			]),
		);
	},
);

runner.test(
	"applyToSequence(): should throw error if not given exactly 2 arguments",
	() => {
		let threw = false;
		try {
			core.applyToSequence(
				types.createFunctionNode(function double(x) {
					return types.createNumberNode((x as types.NumberNode).value * 2);
				}),
			);
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

runner.test(
	"applyToSequence(): should throw error if second argument is not a List",
	() => {
		let threw = false;
		try {
			core.applyToSequence(
				types.createFunctionNode(function double(x) {
					return types.createNumberNode((x as types.NumberNode).value * 2);
				}),
				types.createNumberNode(42),
			);
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

runner.test("seq should return same list if given a list", () => {
	const list = types.createListNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
		types.createNumberNode(3),
	]);
	const result = core.seq(list);
	runner.assert(types.isListNode(result), true);
	runner.assert(result.value, list.value);
});

runner.test("seq(): should return a list if given a vec", () => {
	runner.assert(
		core.seq(
			types.createVectorNode([
				types.createNumberNode(1),
				types.createNumberNode(2),
				types.createNumberNode(3),
			]),
		),
		types.createListNode([
			types.createNumberNode(1),
			types.createNumberNode(2),
			types.createNumberNode(3),
		]),
	);
});

runner.test("seq(): should return a list of chars if given a string", () => {
	runner.assert(
		core.seq(types.createStringNode("foo")),
		types.createListNode([
			types.createStringNode("f"),
			types.createStringNode("o"),
			types.createStringNode("o"),
		]),
	);
});

runner.test("seq(): should return nil if given nil", () => {
	runner.assert(core.seq(types.createNilNode()), types.createNilNode());
});

runner.test("seq(): should return nil if given an empty list", () => {
	runner.assert(core.seq(types.createListNode([])), types.createNilNode());
});

runner.test("seq(): should return nil if given an empty vector", () => {
	runner.assert(core.seq(types.createVectorNode([])), types.createNilNode());
});

runner.test("meta(): should return metadata of an element", () => {
	runner.assert(
		core.meta(
			types.createFunctionNode(
				(x) => x, // Function
				undefined, // closureMeta
				false, // isMacro
				types.createMapNode(new Map([["b", types.createNumberNode(1)]])),
			),
		),
		types.createMapNode(new Map([["b", types.createNumberNode(1)]])),
	);
});

runner.test(
	"meta(): should throw error if not given exactly 1 argument",
	() => {
		let threw = false;
		try {
			core.meta();
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

runner.test(
	"meta(): should throw error if argument isn't a MetadataType",
	() => {
		const notMetadataType = types.createNumberNode(42);
		let threw = false;
		try {
			core.meta(notMetadataType);
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

runner.test("withMeta(): should set metadata", () => {
	const func = types.createFunctionNode((x) => x);
	const meta = types.createMapNode(new Map([["b", types.createNumberNode(1)]]));

	runner.assert(func.metadata, undefined);
	const updated = core.withMeta(func, meta) as types.FunctionNode;
	runner.assert(updated.metadata, meta);
	runner.assert(func.metadata, undefined);
});

runner.test(
	"withMeta(): should throw error if not given exactly 2 arguments",
	() => {
		let threw = false;
		try {
			core.withMeta();
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

runner.test(
	"withMeta(): should throw if first argument isn't MetadataType",
	() => {
		let threw = false;
		try {
			core.withMeta(
				types.createNumberNode(42),
				types.createMapNode(new Map([["b", types.createNumberNode(1)]])),
			);
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

runner.test("isNil(): should return true if argument is a NilNode", () => {
	runner.assert(
		core.isNil(types.createNilNode()),
		types.createBooleanNode(true),
	);
});

runner.test("isNil(): should return false if argument is not a NilNode", () => {
	runner.assert(
		core.isNil(types.createBooleanNode(true)),
		types.createBooleanNode(false),
	);
});

runner.test("isTrue(): should return true for a true value", () => {
	runner.assert(
		core.isTrue(types.createBooleanNode(true)),
		types.createBooleanNode(true),
	);
});

runner.test("isTrue(): should return false for a false value", () => {
	runner.assert(
		core.isTrue(types.createBooleanNode(false)),
		types.createBooleanNode(false),
	);
});

runner.test("isFalse(): should return true for a false value", () => {
	runner.assert(
		core.isFalse(types.createBooleanNode(false)),
		types.createBooleanNode(true),
	);
});

runner.test("isFalse(): should return false for a true value", () => {
	runner.assert(
		core.isFalse(types.createBooleanNode(true)),
		types.createBooleanNode(false),
	);
});

runner.test(
	"isString(): should return true if argument is a StringNode",
	() => {
		runner.assert(
			core.isString(types.createStringNode("foobar")),
			types.createBooleanNode(true),
		);
	},
);

runner.test(
	"isString(): should return false if argument is not a StringNode",
	() => {
		runner.assert(
			core.isString(types.createBooleanNode(true)),
			types.createBooleanNode(false),
		);
	},
);

runner.test("symbol(): should create symbol from a string", () => {
	const result = core.symbol(types.createStringNode("abc"));
	runner.assert(types.isSymbolNode(result), true);
});

runner.test(
	"isSymbol(): should return true if argument is a SymbolNode",
	() => {
		runner.assert(types.isSymbolNode(types.createSymbolNode("abc")), true);
	},
);

runner.test(
	"isSymbol(): should return false if argument is not a SymbolNode",
	() => {
		runner.assert(types.isSymbolNode(types.createStringNode("abc")), false);
	},
);

runner.test("keyword(): should create keyword from a string", () => {
	const result = core.keyword(types.createStringNode("pie"));
	runner.assert(result instanceof types.KeywordNode, true);
	runner.assert(result.value, "pie:");
});

runner.test("keyword(): should create new keyword from a symbol", () => {
	const result = core.keyword(types.createSymbolNode("cake"));
	runner.assert(result instanceof types.KeywordNode, true);
	runner.assert(result.value, "cake:");
});

runner.test("keyword(): should return an existing keyword", () => {
	const key = types.createKeywordNode("cookies");
	const result = core.keyword(key);
	runner.assert(result, key);
});

runner.test(
	"isKeyword(): should return true if argument is a KeywordNode",
	() => {
		runner.assert(
			core.isKeyword(types.createKeywordNode("abc")),
			types.createBooleanNode(true),
		);
	},
);

runner.test(
	"isKeyword(): should return false if argument is not a KeywordNode",
	() => {
		runner.assert(
			core.isKeyword(types.createSymbolNode("abc")),
			types.createBooleanNode(false),
		);
	},
);

runner.test(
	"isNumber(): should return true if argument is a NumberNode",
	() => {
		runner.assert(
			core.isNumber(types.createNumberNode(2)),
			types.createBooleanNode(true),
		);
	},
);

runner.test(
	"isNumber(): should return false if argument is not a NumberNode",
	() => {
		runner.assert(
			core.isNumber(types.createStringNode("2")),
			types.createBooleanNode(false),
		);
	},
);

runner.test("isFn(): should return true if argument is a FunctionNode", () => {
	const fn = types.createFunctionNode(() => types.createNilNode());
	fn.isMacro = false;
	runner.assert(core.isFn(fn), types.createBooleanNode(true));
});

runner.test(
	"isFn(): should return false if argument is not a FunctionNode",
	() => {
		runner.assert(
			core.isFn(types.createNumberNode(2)),
			types.createBooleanNode(false),
		);
	},
);

runner.test("isMacro(): should return true if argument is a macro", () => {
	const fn = types.createFunctionNode(() => types.createNilNode());
	fn.isMacro = true;
	runner.assert(core.isMacro(fn), types.createBooleanNode(true));
});

runner.test("isMacro(): should return false if argument is not a macro", () => {
	runner.assert(
		core.isMacro(types.createNumberNode(2)),
		types.createBooleanNode(false),
	);
});

runner.test("vector(): should create a vector from args", () => {
	runner.assert(
		core.vector(
			types.createNumberNode(1),
			types.createNumberNode(2),
			types.createNumberNode(3),
		),
		types.createVectorNode([
			types.createNumberNode(1),
			types.createNumberNode(2),
			types.createNumberNode(3),
		]),
	);
});

runner.test(
	"isVector(): should return true if argument is a VectorNode",
	() => {
		runner.assert(
			core.isVector(
				types.createVectorNode([
					types.createNumberNode(1),
					types.createNumberNode(2),
					types.createNumberNode(3),
				]),
			),
			types.createBooleanNode(true),
		);
	},
);

runner.test(
	"isVector(): should return false if argument is not a VectorNode",
	() => {
		runner.assert(
			core.isVector(types.createNumberNode(2)),
			types.createBooleanNode(false),
		);
	},
);

// Hash-map
runner.test("hashMap(): should create a map from alternating args", () => {
	runner.assert(
		core.hashMap(
			types.createStringNode("foo"),
			types.createNumberNode(1),
			types.createStringNode("bar"),
			types.createNumberNode(2),
		),
		types.createMapNode(
			new Map([
				['"foo"', types.createNumberNode(1)],
				['"bar"', types.createNumberNode(2)],
			]),
		),
	);
});

runner.test(
	"hashMap(): should return an empty map if no arguments are passed",
	() => {
		runner.assert(core.hashMap(), types.createMapNode());
	},
);

runner.test("isMap(): should return true if argument is a MapNode", () => {
	runner.assert(
		core.isMap(
			types.createMapNode(new Map([["foo", types.createNumberNode(1)]])),
		),
		types.createBooleanNode(true),
	);
});

runner.test("isMap(): should return false if argument is not a MapNode", () => {
	runner.assert(
		core.isMap(types.createNumberNode(2)),
		types.createBooleanNode(false),
	);
});

runner.test("assoc(): should merge key/value pairs into a map", () => {
	runner.assert(
		core.assoc(
			core.hashMap(types.createStringNode("foo"), types.createNumberNode(1)),
			types.createStringNode("bar"),
			types.createNumberNode(2),
		),
		core.hashMap(
			types.createStringNode("foo"),
			types.createNumberNode(1),
			types.createStringNode("bar"),
			types.createNumberNode(2),
		),
	);
});

runner.test("dissoc(): should remove elements from a dict", () => {
	runner.assert(
		core.dissoc(
			core.hashMap(
				types.createStringNode("foo"),
				types.createNumberNode(1),
				types.createStringNode("bar"),
				types.createNumberNode(2),
			),
			types.createStringNode("foo"),
		),
		core.hashMap(types.createStringNode("bar"), types.createNumberNode(2)),
	);
});

runner.test("get(): should get a value from a map using a key", () => {
	runner.assert(
		core.get(
			core.hashMap(
				types.createKeywordNode("foo:"),
				types.createNumberNode(1),
				types.createKeywordNode("bar:"),
				types.createNumberNode(2),
			),
			types.createKeywordNode("bar:"),
		),
		types.createNumberNode(2),
	);
});

runner.test("get(): should return nil if key does not exist", () => {
	runner.assert(
		core.get(
			core.hashMap(
				types.createKeywordNode("foo:"),
				types.createNumberNode(1),
				types.createKeywordNode("bar:"),
				types.createNumberNode(2),
			),
			types.createKeywordNode("baz:"),
		),
		types.createNilNode(),
	);
});

runner.test("get(): should return nil for invalid maps", () => {
	runner.assert(
		core.get(
			types.createStringNode("sharks"),
			types.createKeywordNode("surfers"),
		),
		types.createNilNode(),
	);
});

runner.test("contains(): should return true if key exists", () => {
	runner.assert(
		core.contains(
			core.hashMap(
				types.createKeywordNode("foo:"),
				types.createNumberNode(1),
				types.createKeywordNode("bar:"),
				types.createNumberNode(2),
			),
			types.createKeywordNode("bar:"),
		),
		types.createBooleanNode(true),
	);
});

runner.test("contains(): should return false if key does not exist", () => {
	runner.assert(
		core.contains(
			core.hashMap(
				types.createKeywordNode("foo:"),
				types.createNumberNode(1),
				types.createKeywordNode("bar:"),
				types.createNumberNode(2),
			),
			types.createKeywordNode("baz:"),
		),
		types.createBooleanNode(false),
	);
});

runner.test("keys(): should return a list of all keys in the map", () => {
	runner.assert(
		core.keys(
			core.hashMap(
				types.createKeywordNode("foo:"),
				types.createNumberNode(1),
				types.createKeywordNode("bar:"),
				types.createNumberNode(2),
			),
		),
		types.createListNode([
			types.createKeywordNode("foo:"),
			types.createKeywordNode("bar:"),
		]),
	);
});

runner.test("vals(): should return a list of all values in the map", () => {
	runner.assert(
		core.vals(
			core.hashMap(
				types.createKeywordNode("foo:"),
				types.createNumberNode(1),
				types.createKeywordNode("bar:"),
				types.createNumberNode(2),
			),
		),
		types.createListNode([
			types.createNumberNode(1),
			types.createNumberNode(2),
		]),
	);
});

runner.test("isSequential(): should return true for lists", () => {
	runner.assert(
		types.isSequentialNode(
			types.createListNode([
				types.createNumberNode(1),
				types.createNumberNode(2),
				types.createNumberNode(3),
			]),
		),
		true,
	);
});

runner.test("isSequential(): should return true for vectors", () => {
	runner.assert(
		types.isSequentialNode(
			types.createVectorNode([
				types.createNumberNode(4),
				types.createNumberNode(5),
				types.createNumberNode(6),
			]),
		),
		true,
	);
});

runner.test(
	"isSequential(): should return false for non-sequential nodes",
	() => {
		runner.assert(types.isSequentialNode(types.createNumberNode(42)), false);
	},
);

runner.test(
	"join(): should concatenate elements with the default delimiter (spaces)",
	() => {
		runner.assert(
			core.join(
				types.createListNode([
					types.createNumberNode(1),
					types.createNumberNode(2),
					types.createStringNode("three"),
				]),
			),
			types.createStringNode("1 2 three"),
		);
	},
);

runner.test(
	"join(): should concatenate elements with the given delimiter",
	() => {
		runner.assert(
			core.join(
				types.createListNode([
					types.createNumberNode(1),
					types.createNumberNode(2),
					types.createStringNode("three"),
				]),
				types.createStringNode(", "),
			),
			types.createStringNode("1, 2, three"),
		);
	},
);

runner.report();
