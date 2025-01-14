/*

javascriptNamespace.set(
  types.createSymbolNode('Symbol.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = Symbol.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Symbol.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Function.prototype.call.apply(Symbol, [thisArg, ...argArray]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = Symbol[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol[Symbol.hasInstance]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Symbol.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Symbol.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Symbol.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Symbol.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Symbol.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Symbol.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Symbol.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 0 && astArgs.length <= 1) &&
        (types.isStringNode(astArgs[0]) || types.isNumberNode(astArgs[0]))
      ) {
        const description = types.toJs<types.StringNode | types.NumberNode>(astArgs[0] ?? types.createNilNode());
        const result = Symbol(description); // ctor
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.asyncIterator'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Symbol.asyncIterator;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.asyncIterator"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.for'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertStringNode(astArgs[0]);
      const key = types.toJs<types.StringNode>(astArgs[0]);
      const result = Symbol.for(key);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.hasInstance'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Symbol.hasInstance;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.hasInstance"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.isConcatSpreadable'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Symbol.isConcatSpreadable;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.isConcatSpreadable"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.iterator'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Symbol.iterator;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.iterator"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.keyFor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isSymbolNode(astArgs[0])) {
        const sym = types.toJs<types.SymbolNode>(astArgs[0]);
        const result = Symbol.keyFor(sym);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.keyFor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.match'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Symbol.match;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.match"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.matchAll'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Symbol.matchAll;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.matchAll"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.prototype.description'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Symbol.prototype.description;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.prototype.description"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.prototype[Symbol.toPrimitive]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1])) {
        
        const context = types.toJs<undefined>(astArgs[0]);
        const hint = types.toJs<types.AstNode>(astArgs[1]);
        const result = Symbol.prototype[Symbol.toPrimitive].call(context, hint);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Symbol.prototype[Symbol.toPrimitive]"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.replace'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Symbol.replace;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.replace"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.search'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Symbol.search;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.search"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.split'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Symbol.split;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.split"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.toPrimitive'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Symbol.toPrimitive;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.toPrimitive"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.toStringTag'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Symbol.toStringTag;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.toStringTag"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Symbol.unscopables'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Symbol.unscopables;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Symbol.unscopables"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

*/