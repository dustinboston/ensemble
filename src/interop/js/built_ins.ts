// MARK: BUILT-INS
ns.set(
  types.createSymbolNode('decodeURI'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertStringNode(astArgs[0]);
      const encodedURI = types.toJs<types.StringNode>(astArgs[0]);
      const result = decodeURI(encodedURI);
      return types.toAst(result);
    } catch (e: unknown) {
      return types.toErrorNode(e);
    }
  }),
);

ns.set(
  types.createSymbolNode('decodeURIComponent'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertStringNode(astArgs[0]);
      const encodedURIComponent = types.toJs<types.StringNode>(astArgs[0]);
      const result = decodeURIComponent(encodedURIComponent);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

ns.set(
  types.createSymbolNode('encodeURI'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertStringNode(astArgs[0]);
      const uri = types.toJs<types.StringNode>(astArgs[0]);
      const result = encodeURI(uri);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

ns.set(
  types.createSymbolNode('encodeURIComponent'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertStringNode(astArgs[0]);
      const uriComponent = types.toJs<types.StringNode>(astArgs[0]);
      const result = encodeURIComponent(uriComponent);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

ns.set(
  types.createSymbolNode('isFinite'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const numberValue = types.toJs<types.NumberNode>(astArgs[0]);
      const result = isFinite(numberValue);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

ns.set(
  types.createSymbolNode('isNaN'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const numberValue = types.toJs<types.NumberNode>(astArgs[0]);
      const result = isNaN(numberValue);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

ns.set(
  types.createSymbolNode('parseFloat'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertStringNode(astArgs[0]);
      const stringValue = types.toJs<types.StringNode>(astArgs[0]);
      const result = parseFloat(stringValue);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

ns.set(
  types.createSymbolNode('parseInt'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isStringNode(astArgs[0]) && types.isNumberNode(astArgs[1])
      ) {
        const stringValue = types.toJs<types.StringNode>(astArgs[0]);
        const radix = types.toJs<types.NumberNode>(astArgs[1] ?? types.createNilNode());
        const result = parseInt(stringValue, radix);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "parseInt"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);
