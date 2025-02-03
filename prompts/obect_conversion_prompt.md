Convert the following code code below into the following:

1. An array of tuples, each with a string representing the name of a JavaScript function, and a reference to the local
   implementation of that function. An example is referenced in the section ARRAY, below.
2. Functions updated to be compatible with the current paradigm which is documented in the section FUNCTIONS, below.

## CODE

Here is the code for reference:

```typescript
javascriptNamespace.set(
  types.createSymbolNode('Object'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = Object(value); // ctor
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = new Object(value); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.assign'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const target = types.toJs<types.AstNode>(astArgs[0]);

        const sources = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Object.assign(target, ...sources);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.assign"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.create'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 2) && (types.isNilNode(astArgs[0]) || types.isAstNode(astArgs[0])) &&
        types.isMapNode(astArgs[1])
      ) {
        const o = types.toJs<types.AstNode>(astArgs[0]);
        const properties = types.toJs<types.MapNode>(astArgs[1]);
        const result = Object.create(o, properties);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.create"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.defineProperties'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isMapNode(astArgs[1])) {
        const o = types.toJs<types.AstNode>(astArgs[0]);
        const properties = types.toJs<types.MapNode>(astArgs[1]);
        const result = Object.defineProperties(o, properties);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.defineProperties"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.defineProperty'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) &&
        (types.isNumberNode(astArgs[1]) || types.isSymbolNode(astArgs[1]) || types.isStringNode(astArgs[1])) &&
        types.isAstNode(astArgs[2])
      ) {
        const o = types.toJs<types.AstNode>(astArgs[0]);
        const property = types.toJs<types.NumberNode | types.SymbolNode | types.StringNode>(astArgs[1]);
        const descriptor = types.toJs<types.AstNode>(astArgs[2]);
        const result = Object.defineProperty(o, property, descriptor);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.defineProperty"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.entries'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && (types.isVectorNode(astArgs[0]) || types.isMapNode(astArgs[0]))) {
        const o = types.toJs<types.VectorNode | types.MapNode>(astArgs[0]);
        const result = Object.entries(o);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.entries"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.freeze'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const o = types.toJs<types.AstNode>(astArgs[0]);
        const result = Object.freeze(o);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.freeze"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.fromEntries'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 1) && (
          types.isVectorNode(astArgs[0]) &&
          (astArgs[0].value.length === 2) &&
          types.isAstNode(astArgs[0].value[0]) &&
          types.isAstNode(astArgs[0].value[1])
        )
      ) {
        const iterable = types.toJs<types.VectorNode<types.VectorNode<types.AstNode>>>(astArgs[0]);
        const result = Object.fromEntries(iterable);
        return types.toAst(result);
      }
      if ((astArgs.length === 1) && types.isVectorNode(astArgs[0])) {
        const iterable = types.toJs<types.VectorNode>(astArgs[0]);
        const result = Object.fromEntries(iterable);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.fromEntries"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.getOwnPropertyDescriptor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 2) && types.isAstNode(astArgs[0]) &&
        (types.isNumberNode(astArgs[1]) || types.isSymbolNode(astArgs[1]) || types.isStringNode(astArgs[1]))
      ) {
        const o = types.toJs<types.AstNode>(astArgs[0]);
        const p = types.toJs<types.NumberNode | types.SymbolNode | types.StringNode>(astArgs[1]);
        const result = Object.getOwnPropertyDescriptor(o, p);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.getOwnPropertyDescriptor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.getOwnPropertyDescriptors'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const obj = types.toJs<types.AstNode>(astArgs[0]);
        const result = Object.getOwnPropertyDescriptors(obj);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.getOwnPropertyDescriptors"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.getOwnPropertyNames'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const o = types.toJs<types.AstNode>(astArgs[0]);
        const result = Object.getOwnPropertyNames(o);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.getOwnPropertyNames"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.getOwnPropertySymbols'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const o = types.toJs<types.AstNode>(astArgs[0]);
        const result = Object.getOwnPropertySymbols(o);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.getOwnPropertySymbols"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.getPrototypeOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const o = types.toJs<types.AstNode>(astArgs[0]);
        const result = Object.getPrototypeOf(o);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.getPrototypeOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.groupBy'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isVectorNode(astArgs[0]) && types.isFunctionNode(astArgs[1])) {
        const items = types.toJs<types.VectorNode>(astArgs[0]);
        const keySelector = types.toJs<types.FunctionNode>(astArgs[1]);
        const result = Object.groupBy(items, keySelector);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.groupBy"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.hasOwn'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 2) && types.isAstNode(astArgs[0]) &&
        (types.isNumberNode(astArgs[1]) || types.isSymbolNode(astArgs[1]) || types.isStringNode(astArgs[1]))
      ) {
        const o = types.toJs<types.AstNode>(astArgs[0]);
        const v = types.toJs<types.NumberNode | types.SymbolNode | types.StringNode>(astArgs[1]);
        const result = Object.hasOwn(o, v);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.hasOwn"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.is'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isAstNode(astArgs[1])) {
        const value1 = types.toJs<types.AstNode>(astArgs[0]);
        const value2 = types.toJs<types.AstNode>(astArgs[1]);
        const result = Object.is(value1, value2);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.is"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.isExtensible'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const o = types.toJs<types.AstNode>(astArgs[0]);
        const result = Object.isExtensible(o);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.isExtensible"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.isFrozen'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const o = types.toJs<types.AstNode>(astArgs[0]);
        const result = Object.isFrozen(o);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.isFrozen"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.isSealed'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const o = types.toJs<types.AstNode>(astArgs[0]);
        const result = Object.isSealed(o);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.isSealed"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.keys'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const o = types.toJs<types.AstNode>(astArgs[0]);
        const result = Object.keys(o);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.keys"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.preventExtensions'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const o = types.toJs<types.AstNode>(astArgs[0]);
        const result = Object.preventExtensions(o);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.preventExtensions"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.seal'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const o = types.toJs<types.AstNode>(astArgs[0]);
        const result = Object.seal(o);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.seal"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.setPrototypeOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 2) && types.isAstNode(astArgs[0]) &&
        (types.isNilNode(astArgs[1]) || types.isAstNode(astArgs[1]))
      ) {
        const o = types.toJs<types.AstNode>(astArgs[0]);
        const proto = types.toJs<types.AstNode>(astArgs[1]);
        const result = Object.setPrototypeOf(o, proto);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.setPrototypeOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.values'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && (types.isVectorNode(astArgs[0]) || types.isMapNode(astArgs[0]))) {
        const o = types.toJs<types.VectorNode | types.MapNode>(astArgs[0]);
        const result = Object.values(o);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.values"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.prototype.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Object.prototype.toLocaleString.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.prototype.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.prototype.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Object.prototype.toString.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.prototype.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.prototype.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Object.prototype.valueOf.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.prototype.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Object.prototype.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Object.prototype.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Object.prototype.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);
```

The top of the file should contain an array of strings and function references, like this:

```typescript
import * as types from '@/types.ts';

export const objectFunctions: Array<[string, types.Closure]> = [
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
