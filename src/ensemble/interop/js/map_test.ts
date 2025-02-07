import { assertEquals, test } from '../../../../tests/test_runner';
import * as types from '../../types';
import * as mapFunctions from './map';

// Hash-map
test('mapNew(): should create a map from alternating args', () => {
  assertEquals(
    mapFunctions.mapNew(
      types.createStringNode('foo'),
      types.createNumberNode(1),
      types.createStringNode('bar'),
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

test('mapNew(): should return an empty map if no arguments are passed', () => {
  assertEquals(mapFunctions.mapNew(), types.createMapNode());
});

test('mapIsMap(): should return true if argument is a MapNode', () => {
  assertEquals(
    mapFunctions.mapIsMap(types.createMapNode(new Map([['foo', types.createNumberNode(1)]]))),
    types.createBooleanNode(true),
  );
});

test('mapIsMap(): should return false if argument is not a MapNode', () => {
  assertEquals(
    mapFunctions.mapIsMap(types.createNumberNode(2)),
    types.createBooleanNode(false),
  );
});

test('mapSet(): should merge key/value pairs into a map', () => {
  assertEquals(
    mapFunctions.mapSet(
      mapFunctions.mapNew(
        types.createStringNode('foo'),
        types.createNumberNode(1),
      ),
      types.createStringNode('bar'),
      types.createNumberNode(2),
    ),
    mapFunctions.mapNew(
      types.createStringNode('foo'),
      types.createNumberNode(1),
      types.createStringNode('bar'),
      types.createNumberNode(2),
    ),
  );
});

test('mapDelete(): should remove elements from a dict', () => {
  assertEquals(
    mapFunctions.mapDelete(
      mapFunctions.mapNew(
        types.createStringNode('foo'),
        types.createNumberNode(1),
        types.createStringNode('bar'),
        types.createNumberNode(2),
      ),
      types.createStringNode('foo'),
    ),
    mapFunctions.mapNew(types.createStringNode('bar'), types.createNumberNode(2)),
  );
});

test('mapGet(): should get a value from a map using a key', () => {
  assertEquals(
    mapFunctions.mapGet(
      mapFunctions.mapNew(
        types.createKeywordNode('foo:'),
        types.createNumberNode(1),
        types.createKeywordNode('bar:'),
        types.createNumberNode(2),
      ),
      types.createKeywordNode('bar:'),
    ),
    types.createNumberNode(2),
  );
});

test('mapGet(): should return nil if key does not exist', () => {
  assertEquals(
    mapFunctions.mapGet(
      mapFunctions.mapNew(
        types.createKeywordNode('foo:'),
        types.createNumberNode(1),
        types.createKeywordNode('bar:'),
        types.createNumberNode(2),
      ),
      types.createKeywordNode('baz:'),
    ),
    types.createNilNode(),
  );
});

test('get(): should return nil for invalid maps', () => {
  assertEquals(
    mapFunctions.mapGet(types.createStringNode('sharks'), types.createKeywordNode('surfers')),
    types.createNilNode(),
  );
});

test('contains(): should return true if key exists', () => {
  assertEquals(
    mapFunctions.mapHas(
      mapFunctions.mapNew(
        types.createKeywordNode('foo:'),
        types.createNumberNode(1),
        types.createKeywordNode('bar:'),
        types.createNumberNode(2),
      ),
      types.createKeywordNode('bar:'),
    ),
    types.createBooleanNode(true),
  );
});

test('contains(): should return false if key does not exist', () => {
  assertEquals(
    mapFunctions.mapHas(
      mapFunctions.mapNew(
        types.createKeywordNode('foo:'),
        types.createNumberNode(1),
        types.createKeywordNode('bar:'),
        types.createNumberNode(2),
      ),
      types.createKeywordNode('baz:'),
    ),
    types.createBooleanNode(false),
  );
});

test('keys(): should return a list of all keys in the map', () => {
  assertEquals(
    mapFunctions.mapKeys(mapFunctions.mapNew(
      types.createKeywordNode('foo:'),
      types.createNumberNode(1),
      types.createKeywordNode('bar:'),
      types.createNumberNode(2),
    )),
    types.createListNode([
      types.createKeywordNode('foo:'),
      types.createKeywordNode('bar:'),
    ]),
  );
});

test('vals(): should return a list of all values in the map', () => {
  assertEquals(
    mapFunctions.mapValues(mapFunctions.mapNew(
      types.createKeywordNode('foo:'),
      types.createNumberNode(1),
      types.createKeywordNode('bar:'),
      types.createNumberNode(2),
    )),
    types.createListNode([
      types.createNumberNode(1),
      types.createNumberNode(2),
    ]),
  );
});
