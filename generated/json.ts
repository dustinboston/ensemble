import * as types from '../src/types.ts';

/** Defines language features and builtins for JavaScript */
export const javascriptNamespace = new Map<types.MapKeyNode, types.FunctionNode>();

javascriptNamespace.set(
  types.createSymbolNode('JSON.parse'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isStringNode(astArgs[0]) &&
        types.isFunctionNode(astArgs[1])
      ) {
        const text = types.toJs<types.StringNode>(astArgs[0]);
        const reviver = types.toJs<types.FunctionNode>(astArgs[1] ?? types.createNilNode());
        const result = JSON.parse(text, reviver);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "JSON.parse"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('JSON.stringify'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) &&
        (types.isNilNode(astArgs[1]) || types.isFunctionNode(astArgs[1])) &&
        (types.isStringNode(astArgs[2]) || types.isNumberNode(astArgs[2]))
      ) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const replacer = types.toJs<types.NilNode | types.FunctionNode>(astArgs[1] ?? types.createNilNode());
        const space = types.toJs<types.StringNode | types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = JSON.stringify(value, replacer, space);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "JSON.stringify"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);
