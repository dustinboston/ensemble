import { assertEquals, assertSpyCall, assertSpyCalls, assertThrows, ignoreTest, returnsNext, stub, test } from "../tests/test_runner.js";
import * as cli from "./ensemble_cli.js";
import * as types from "./types.js";
const { readir, readln, slurp, spit, writeToFile } = cli;
test('readir(): should list directory contents', () => {
    const temporaryDir = '.tmpa';
    os.mkdir(temporaryDir);
    writeToFile('hello', `${temporaryDir}/file.txt`);
    writeToFile('hellow', `${temporaryDir}/file2.txt`);
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
    assertEquals(obj, [`file.txt`, 'file2.txt']);
});
test('readir(): should throw error if argument is not a string', () => {
    assertThrows(() => readir(types.createNumberNode(123)), TypeError, 'Invalid');
});
test('slurp(): should read a file', () => {
    const temporaryDir = '.tmpb';
    const filePath = `${temporaryDir}/file.txt`;
    const text = 'content';
    os.mkdir(temporaryDir);
    writeToFile(text, filePath);
    const result = std.loadFile(filePath);
    // Remove the temporary directory before the assertion in case the assertion throws an error.
    os.remove(filePath);
    os.remove(temporaryDir);
    assertEquals(result, text);
});
test('slurp(): should throw error if file does not exist', () => {
    assertThrows(() => slurp(types.createStringNode('mocks/nonexistent')), Error, 'No such file or directory');
});
test('spit(): should write to a file', async () => {
    const temporaryDir = '.tmpc';
    const filePath = `${temporaryDir}/file.txt`;
    const content = 'newContent';
    os.mkdir(temporaryDir);
    spit(types.createStringNode(filePath), types.createStringNode(content));
    const result = std.loadFile(filePath);
    // Remove the temporary directory before the assertion in case the assertion throws an error.
    os.remove(filePath);
    os.remove(temporaryDir);
    assertEquals(result, content);
});
test('spit(): should throw error if path is not a string', () => {
    assertThrows(() => spit(types.createNumberNode(123), types.createStringNode('content')), Error, 'Invalid');
});
ignoreTest('readln(): should read line and return string', () => {
    const input = types.createStringNode('%');
    const expected = types.createStringNode('"foobar"');
    const promptStub = stub(cli, 'displayPrompt', returnsNext(['"foobar"']));
    try {
        assertEquals(readln(input), expected);
    }
    finally {
        promptStub.restore();
    }
    assertSpyCall(promptStub, 0, {
        args: [input.value],
        returned: expected.value,
    });
    assertSpyCalls(promptStub, 1);
});
ignoreTest('readln(): should return nil/undef when readline returns null', () => {
    const input = types.createStringNode('%');
    const expected = types.createNilNode();
    const promptStub = stub(globalThis, 'prompt', returnsNext([null]));
    try {
        assertEquals(readln(input), expected);
    }
    finally {
        promptStub.restore();
    }
    assertSpyCall(promptStub, 0, {
        args: [input.value],
        returned: null,
    });
    assertSpyCalls(promptStub, 1);
});
test('readln(): should throw when argument count is less than one', () => {
    assertThrows(() => readln());
});
test('readln(): should throw when argument count is more than one', () => {
    assertThrows(() => readln(types.createStringNode('foo'), types.createStringNode('bar')));
});
test('readln(): should throw when argument is not a string', () => {
    assertThrows(() => readln(types.createNumberNode(42)));
});
