import * as types from '../src/types.ts';

/** Defines language features and builtins for JavaScript */
export const javascriptNamespace = new Map<types.MapKeyNode, types.FunctionNode>();

javascriptNamespace.set(
  types.createSymbolNode('Proxy.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isMapNode(astArgs[1])) {
        const target = types.toJs<types.AstNode>(astArgs[0]);
        const handler = types.toJs<types.MapNode>(astArgs[1]);
        const result = new Proxy(target, handler); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Proxy.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Proxy.revocable'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isMapNode(astArgs[1])) {
        const target = types.toJs<types.AstNode>(astArgs[0]);
        const handler = types.toJs<types.MapNode>(astArgs[1]);
        const result = Proxy.revocable(target, handler);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Proxy.revocable"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);
