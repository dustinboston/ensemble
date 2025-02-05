import { assertSpyCall, assertSpyCalls, returnsNext, stub } from '../tests/test_runner.js';
import { assertEquals, assertThrows } from "../tests/test_runner.js";
import { readir, readln, slurp, spit } from "./ensemble_cli.js";
import * as types from "./types.js";
test('readir(): should list directory contents', async () => {
    const temporaryDir = await Deno.makeTempDir();
    await Deno.mkdir(`${temporaryDir}/subdir`);
    await Deno.writeTextFile(`${temporaryDir}/file.txt`, 'hello');
    const input = types.createStringNode(temporaryDir);
    const expected = types.createVectorNode([
        types.createMapNode(
        // Make slug and ext null or empty for dirs
        new Map([
            ['isDirectory', types.createBooleanNode(false)],
            ['isFile', types.createBooleanNode(true)],
            ['isSymlink', types.createBooleanNode(false)],
            ['name', types.createSymbolNode('file.txt')],
        ])),
        types.createMapNode(
        // Make slug and ext null or empty for dirs
        new Map([
            ['isDirectory', types.createBooleanNode(true)],
            ['isFile', types.createBooleanNode(false)],
            ['isSymlink', types.createBooleanNode(false)],
            ['name', types.createSymbolNode('subdir')],
        ])),
    ]);
    const result = readir(input);
    assertEquals(result, expected);
});
test('readir(): should throw error if argument is not a string', () => {
    assertThrows(() => readir(types.createNumberNode(123)), TypeError, 'Invalid');
});
test('slurp(): should read a file', () => {
    const temporaryDir = Deno.makeTempDirSync();
    const filePath = `${temporaryDir}/file.txt`;
    Deno.writeTextFileSync(filePath, 'content');
    const result = slurp(types.createStringNode(filePath));
    assertEquals(result, types.createStringNode('content'));
});
test('slurp(): should throw error if file does not exist', () => {
    assertThrows(() => slurp(types.createStringNode('mocks/nonexistent')), Error, 'No such file or directory');
});
test('spit(): should write to a file', async () => {
    const temporaryDir = await Deno.makeTempDir();
    const filePath = `${temporaryDir}/file.txt`;
    const content = 'newContent';
    spit(types.createStringNode(filePath), types.createStringNode(content));
    const result = await Deno.readTextFile(filePath);
    assertEquals(result, content);
});
test('spit(): should throw error if path is not a string', () => {
    assertThrows(() => spit(types.createNumberNode(123), types.createStringNode('content')), Error, 'Invalid');
});
test('readln(): should read line and return string', () => {
    const input = types.createStringNode('%');
    const expected = types.createStringNode('"foobar"');
    const promptStub = stub(globalThis, 'prompt', returnsNext(['"foobar"']));
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
test('readln(): should return nil/undef when readline returns null', () => {
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
