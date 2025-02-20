import runner from "../../tests/test_runner.ts";
import * as types from "../../types.ts";
import * as mapFunctions from "./map.ts";

runner.test("mapNew(): should create a map from alternating args", () => {
	runner.assert(
		mapFunctions.mapNew(
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
	"mapNew(): should return an empty map if no arguments are passed",
	() => {
		runner.assert(mapFunctions.mapNew(), types.createMapNode());
	},
);

runner.test("mapIsMap(): should return true if argument is a MapNode", () => {
	runner.assert(
		mapFunctions.mapIsMap(
			types.createMapNode(new Map([["foo", types.createNumberNode(1)]])),
		),
		types.createBooleanNode(true),
	);
});

runner.test(
	"mapIsMap(): should return false if argument is not a MapNode",
	() => {
		runner.assert(
			mapFunctions.mapIsMap(types.createNumberNode(2)),
			types.createBooleanNode(false),
		);
	},
);

runner.test("mapSet(): should merge key/value pairs into a map", () => {
	runner.assert(
		mapFunctions.mapSet(
			mapFunctions.mapNew(
				types.createStringNode("foo"),
				types.createNumberNode(1),
			),
			types.createStringNode("bar"),
			types.createNumberNode(2),
		),
		mapFunctions.mapNew(
			types.createStringNode("foo"),
			types.createNumberNode(1),
			types.createStringNode("bar"),
			types.createNumberNode(2),
		),
	);
});

runner.test("mapDelete(): should remove elements from a dict", () => {
	runner.assert(
		mapFunctions.mapDelete(
			mapFunctions.mapNew(
				types.createStringNode("foo"),
				types.createNumberNode(1),
				types.createStringNode("bar"),
				types.createNumberNode(2),
			),
			types.createStringNode("foo"),
		),
		mapFunctions.mapNew(
			types.createStringNode("bar"),
			types.createNumberNode(2),
		),
	);
});

runner.test("mapGet(): should get a value from a map using a key", () => {
	runner.assert(
		mapFunctions.mapGet(
			mapFunctions.mapNew(
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

runner.test("mapGet(): should return nil if key does not exist", () => {
	runner.assert(
		mapFunctions.mapGet(
			mapFunctions.mapNew(
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
		mapFunctions.mapGet(
			types.createStringNode("sharks"),
			types.createKeywordNode("surfers"),
		),
		types.createNilNode(),
	);
});

runner.test("contains(): should return true if key exists", () => {
	runner.assert(
		mapFunctions.mapHas(
			mapFunctions.mapNew(
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
		mapFunctions.mapHas(
			mapFunctions.mapNew(
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
		mapFunctions.mapKeys(
			mapFunctions.mapNew(
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
		mapFunctions.mapValues(
			mapFunctions.mapNew(
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
