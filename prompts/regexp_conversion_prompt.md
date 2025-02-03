// regexp_conversion_prompt.md

Convert the following code code below into the following:

1. An array of tuples, each with a string representing the name of a JavaScript function, and a reference to the local
   implementation of that function. An example is referenced in the section ARRAY, below.
2. Functions updated to be compatible with the current paradigm which is documented in the section FUNCTIONS, below.

## CODE

Here is the code for reference:

```typescript
avascriptNamespace.set(
  types.createSymbolNode('RegExp.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = RegExp.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);

        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = RegExp.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);

        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Function.prototype.call.apply(RegExp, [thisArg, ...argArray]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = RegExp[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp[Symbol.hasInstance]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = RegExp.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = RegExp.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = RegExp.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = RegExp.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = RegExp.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = RegExp.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = RegExp.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isStringNode(astArgs[0]) && types.isStringNode(astArgs[1])
      ) {
        const pattern = types.toJs<types.StringNode>(astArgs[0]);
        const flags = types.toJs<types.StringNode>(astArgs[1] ?? types.createNilNode());
        const result = RegExp(pattern, flags); // ctor
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isStringNode(astArgs[0]) && types.isStringNode(astArgs[1])
      ) {
        const pattern = types.toJs<types.StringNode>(astArgs[0]);
        const flags = types.toJs<types.StringNode>(astArgs[1] ?? types.createNilNode());
        const result = new RegExp(pattern, flags); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.prototype.exec'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1])) {
        const context = types.toJs<undefined>(astArgs[0]);
        const stringValue = types.toJs<types.AstNode>(astArgs[1]);
        const result = RegExp.prototype.exec.call(context, stringValue);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.prototype.exec"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.prototype[Symbol.match]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1])) {
        const context = types.toJs<undefined>(astArgs[0]);
        const stringValue = types.toJs<types.AstNode>(astArgs[1]);
        const result = RegExp.prototype[Symbol.match].call(context, stringValue);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.prototype[Symbol.match]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.prototype[Symbol.matchAll]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1])) {
        const context = types.toJs<undefined>(astArgs[0]);
        const stringValue = types.toJs<types.AstNode>(astArgs[1]);
        const result = RegExp.prototype[Symbol.matchAll].call(context, stringValue);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.prototype[Symbol.matchAll]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.prototype[Symbol.replace]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1]) &&
        types.isStringNode(astArgs[2])
      ) {
        const context = types.toJs<undefined>(astArgs[0]);
        const stringValue = types.toJs<types.AstNode>(astArgs[1]);
        const replaceValue = types.toJs<types.StringNode>(astArgs[2]);
        const result = RegExp.prototype[Symbol.replace].call(context, stringValue, replaceValue);
        return types.toAst(result);
      }
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1]) &&
        types.isFunctionNode(astArgs[2])
      ) {
        const context = types.toJs<undefined>(astArgs[0]);
        const stringValue = types.toJs<types.AstNode>(astArgs[1]);
        const replaceValue = types.toJs<types.StringNode>(astArgs[2]);
        const result = RegExp.prototype[Symbol.replace].call(context, stringValue, replaceValue);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.prototype[Symbol.replace]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.prototype[Symbol.search]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1])) {
        const context = types.toJs<undefined>(astArgs[0]);
        const stringValue = types.toJs<types.AstNode>(astArgs[1]);
        const result = RegExp.prototype[Symbol.search].call(context, stringValue);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.prototype[Symbol.search]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.prototype[Symbol.split]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        const context = types.toJs<undefined>(astArgs[0]);
        const stringValue = types.toJs<types.AstNode>(astArgs[1]);
        const limit = types.toJs<types.StringNode>(astArgs[2] ?? types.createNilNode());
        const result = RegExp.prototype[Symbol.split].call(context, stringValue, limit);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.prototype[Symbol.split]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.prototype.test'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1])) {
        const context = types.toJs<undefined>(astArgs[0]);
        const stringValue = types.toJs<types.AstNode>(astArgs[1]);
        const result = RegExp.prototype.test.call(context, stringValue);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.prototype.test"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.prototype.dotAll'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const context = types.toJs<undefined>(astArgs[0]);
        const result = RegExp.prototype.dotAll;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.prototype.dotAll"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.prototype.flags'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const context = types.toJs<undefined>(astArgs[0]);
        const result = RegExp.prototype.flags;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.prototype.flags"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.prototype.global'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const context = types.toJs<undefined>(astArgs[0]);
        const result = RegExp.prototype.global;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.prototype.global"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.prototype.hasIndices'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const context = types.toJs<undefined>(astArgs[0]);
        const result = RegExp.prototype.hasIndices;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.prototype.hasIndices"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.prototype.ignoreCase'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const context = types.toJs<undefined>(astArgs[0]);
        const result = RegExp.prototype.ignoreCase;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.prototype.ignoreCase"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.prototype.lastIndex'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const context = types.toJs<undefined>(astArgs[0]);
        const result = RegExp.prototype.lastIndex;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.prototype.lastIndex"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.prototype.multiline'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const context = types.toJs<undefined>(astArgs[0]);
        const result = RegExp.prototype.multiline;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.prototype.multiline"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.prototype.source'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const context = types.toJs<undefined>(astArgs[0]);
        const result = RegExp.prototype.source;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.prototype.source"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.prototype.sticky'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const context = types.toJs<undefined>(astArgs[0]);
        const result = RegExp.prototype.sticky;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.prototype.sticky"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.prototype.unicode'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const context = types.toJs<undefined>(astArgs[0]);
        const result = RegExp.prototype.unicode;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.prototype.unicode"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('RegExp.prototype.unicodeSets'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const context = types.toJs<undefined>(astArgs[0]);
        const result = RegExp.prototype.unicodeSets;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "RegExp.prototype.unicodeSets"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);
```

The top of the file should contain an array of strings and function references, like this:

```typescript
import * as types from '@/types.ts';

export const regExpFunctions: Array<[string, types.Closure]> = [
  // ['Object.functionOrPropertyName', functionOrPropertyName],
];
```

Functions should be converted to the following format:

```typescript
// CORRECT:
function mathImul(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertNumberNode(astArgs[0]);
  types.assertNumberNode(astArgs[1]);

  const a = astArgs[0].value;
  const b = astArgs[1].value;

  const result = Math.imul(a, b);
  return types.toAst(result);
}
```

You should always use assertions and never throw an error.

Note, do not throw errors like this. This is wrong:

```typescript
// INCORRECT:
function mathImul(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 2) && types.isNumberNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {
    const a = astArgs[0].value;
    const b = astArgs[1].value;
    const result = Math.imul(a, b);
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Math.imul"');
}
```

## GUIDELINES

### Do not inline the function. Create a separate function instead.

```typescript
// INCORRECT
export const objectFunctions: Array<[string, types.Closure]> = [
  // Do
  ['Object', function Object(...astArgs: types.AstNode[]): types.AstNode {
    // ....
    types.assertArgumentCount(astArgs.length, 1);
    types.assertAstNode(astArgs[0]);
    const value = types.toJs<types.AstNode>(astArgs[0]);
    const result = Object(value);
    return types.toAst(result);
  }],
];
```

```typescript
// CORRECT
function newObject(...astArgs: types.AstNode[]): types.AstNode {
  // ....
}
```

### Do not use types.toJs. Use create*Node and `.value` instead

```typescript
// INCORRECT
const value = types.toJs<types.AstNode>(astArgs[0]);
```

```typescript
// CORRECT
const value = types.createNumberNode(astArgs[0].value);
```

Reference these files src/interop/js/arrays.ts, src/interop/js/booleans.ts, src/interop/js/dates.ts,
src/interop/js/error.ts, src/interop/js/function.ts, src/interop/js/json.ts, src/interop/js/map.ts,
src/interop/js/math.ts, src/interop/js/number.ts
