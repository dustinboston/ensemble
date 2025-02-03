/*

javascriptNamespace.set(
  types.createSymbolNode('Set.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = Set.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Set.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);

        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Set.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Set.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);

        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Function.prototype.call.apply(Set, [thisArg, ...argArray]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Set[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = Set[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set[Symbol.hasInstance]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Set.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Set.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Set.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Set.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Set.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Set.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Set.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Set.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Set.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Set.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Set.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Set.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Set.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Set.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Set.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length >= 0 && astArgs.length <= 1) && types.isVectorNode(astArgs[0])) {
        const iterable = types.toJs<types.VectorNode>(astArgs[0] ?? types.createNilNode());
        const result = new Set(iterable); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Set.prototype.add'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isAstNode(astArgs[1])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const value = types.toJs<types.AstNode>(astArgs[1]);
        const result = Set.prototype.add.call(context, value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set.prototype.add"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Set.prototype.clear'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const result = Set.prototype.clear.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set.prototype.clear"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Set.prototype.delete'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isAstNode(astArgs[1])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const value = types.toJs<types.AstNode>(astArgs[1]);
        const result = Set.prototype.delete.call(context, value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set.prototype.delete"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Set.prototype.entries'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const result = Set.prototype.entries.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set.prototype.entries"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Set.prototype.forEach'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) &&
        types.isFunctionNode(astArgs[1]) && types.isAstNode(astArgs[2])
      ) {

        const context = types.toJs<undefined>(astArgs[0]);
        const callbackfn = types.toJs<types.AstNode>(astArgs[1]);
        const thisArg = types.toJs<types.FunctionNode>(astArgs[2] ?? types.createNilNode());
        const result = Set.prototype.forEach.call(context, callbackfn, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set.prototype.forEach"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Set.prototype.has'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isAstNode(astArgs[1])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const value = types.toJs<types.AstNode>(astArgs[1]);
        const result = Set.prototype.has.call(context, value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set.prototype.has"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Set.prototype.keys'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const result = Set.prototype.keys.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set.prototype.keys"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Set.prototype.values'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const result = Set.prototype.values.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set.prototype.values"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Set.prototype[Symbol.iterator]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const result = Set.prototype[Symbol.iterator].call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set.prototype[Symbol.iterator]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Set.prototype.size'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const result = Set.prototype.size;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Set.prototype.size"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

*/
