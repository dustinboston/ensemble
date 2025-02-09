import { assertEquals, assertThrows, test } from '../../tests/test_runner.ts';
import * as types from '../../types.ts';
import * as dates from './date.ts';

test('newDate - no arguments', () => {
  const now = Date.now();
  const result = dates.newDate();
  assertEquals(types.isNumberNode(result), true);

  // Check that the result is a NumberNode representing a timestamp close to now.
  // We use a tolerance since some time passes between Date.now() and the function call.
  assertEquals(Math.abs(result.value - now) < 10, true); // Tolerance of 10ms
});

test('newDate - with arguments', () => {
  const result = dates.newDate(types.createNumberNode(2024), types.createNumberNode(0)); // Jan 2024

  assertEquals(types.isNumberNode(result), true);
  assertEquals(new Date(result.value).getFullYear(), 2024);
  assertEquals(new Date(result.value).getMonth(), 0);
});

test('now - returns current timestamp', () => {
  const before = Date.now();
  const result = dates.dateNow();
  const after = Date.now();

  assertEquals(types.isNumberNode(result), true);
  assertEquals(result.value >= before && result.value <= after, true);
});

test('parse - valid date string', () => {
  const result = dates.dateParse(types.createStringNode('2024-01-01T00:00:00.000Z'));
  assertEquals(types.isNumberNode(result), true);
  assertEquals(result.value, new Date('2024-01-01T00:00:00.000Z').getTime());
});

test('parse - invalid date string', () => {
  const result = dates.dateParse(types.createStringNode('invalid date'));
  assertEquals(types.isNumberNode(result), true);
  assertEquals(Number.isNaN(result.value), true);
});

test('parse - invalid arguments', () => {
  assertThrows(() => dates.dateParse());
  assertThrows(() => dates.dateParse(types.createNumberNode(1)));
});

test('utc - returns a timestamp', () => {
  const result = dates.dateUtc(types.createNumberNode(2024), types.createNumberNode(0), types.createNumberNode(1));
  assertEquals(types.isNumberNode(result), true);
  assertEquals(result.value, Date.UTC(2024, 0, 1));
});

test('utc - invalid arguments', () => {
  assertEquals(dates.dateUtc(types.createStringNode('s')), types.createNilNode());
});

// ... (Tests for other Date functions would follow a similar pattern)

// Example for a getter
test('getDate - valid date', () => {
  const date = new Date(2024, 0, 15);
  const timestamp = types.createNumberNode(date.getTime());

  const result = dates.dateGetDate(timestamp);
  assertEquals(result, types.createNumberNode(15));
});

test('getDate - invalid arguments', () => {
  assertThrows(() => dates.dateGetDate());
  assertThrows(() => dates.dateGetDate(types.createStringNode('test')));
});

// Example for a setter
test('setDate - valid date', () => {
  const date = new Date(2024, 0, 15);
  const timestamp = types.createNumberNode(date.getTime());
  const newDay = types.createNumberNode(20);

  const result = dates.dateSetDate(timestamp, newDay);
  assertEquals(new Date(result.value).getDate(), 20);
});

test('setDate - invalid arguments', () => {
  assertThrows(() => dates.dateSetDate());
  assertThrows(() => dates.dateSetDate(types.createStringNode('test')));
});

// ... tests for remaining functions

// toJSON
test('toJSON - returns ISO string', () => {
  const timestamp = types.createNumberNode(new Date('2024-01-01T12:00:00Z').getTime());
  const result = dates.dateToJSON(timestamp);

  assertEquals(types.isStringNode(result), true);
  assertEquals(result.value, '2024-01-01T12:00:00.000Z');
});

// ... more tests (same pattern)
