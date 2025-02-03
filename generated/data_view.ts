import * as types from '../src/types.ts';

/** Defines language features and builtins for JavaScript */
export const javascriptNamespace = new Map<types.MapKeyNode, types.FunctionNode>();

javascriptNamespace.set(
  types.createSymbolNode('DataView.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = DataView.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = DataView.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Function.prototype.call.apply(DataView, [thisArg, ...argArray]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = DataView[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView[Symbol.hasInstance]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = DataView.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = DataView.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = DataView.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = DataView.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = DataView.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = DataView.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = DataView.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 3) && types.isVectorNode(astArgs[0]) &&
        types.isTypedVector(astArgs[0], types.NumberNode) &&
        types.isNumberNode(astArgs[1]) && types.isNumberNode(astArgs[2])
      ) {
        const buffer = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const byteOffset = types.toJs<types.NumberNode>(astArgs[1] ?? types.createNilNode());
        const byteLength = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = new DataView(buffer, byteOffset, byteLength); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.getBigInt64'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isBooleanNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const byteOffset = types.toJs<types.AstNode>(astArgs[1]);
        const littleEndian = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = DataView.prototype.getBigInt64.call(context, byteOffset, littleEndian);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.getBigInt64"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.getBigUint64'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isBooleanNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const byteOffset = types.toJs<types.AstNode>(astArgs[1]);
        const littleEndian = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = DataView.prototype.getBigUint64.call(context, byteOffset, littleEndian);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.getBigUint64"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.getFloat32'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isBooleanNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const byteOffset = types.toJs<types.AstNode>(astArgs[1]);
        const littleEndian = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = DataView.prototype.getFloat32.call(context, byteOffset, littleEndian);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.getFloat32"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.getFloat64'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isBooleanNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const byteOffset = types.toJs<types.AstNode>(astArgs[1]);
        const littleEndian = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = DataView.prototype.getFloat64.call(context, byteOffset, littleEndian);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.getFloat64"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.getInt16'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isBooleanNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const byteOffset = types.toJs<types.AstNode>(astArgs[1]);
        const littleEndian = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = DataView.prototype.getInt16.call(context, byteOffset, littleEndian);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.getInt16"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.getInt32'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isBooleanNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const byteOffset = types.toJs<types.AstNode>(astArgs[1]);
        const littleEndian = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = DataView.prototype.getInt32.call(context, byteOffset, littleEndian);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.getInt32"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.getInt8'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const byteOffset = types.toJs<types.AstNode>(astArgs[1]);
        const result = DataView.prototype.getInt8.call(context, byteOffset);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.getInt8"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.getUint16'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isBooleanNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const byteOffset = types.toJs<types.AstNode>(astArgs[1]);
        const littleEndian = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = DataView.prototype.getUint16.call(context, byteOffset, littleEndian);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.getUint16"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.getUint32'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isBooleanNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const byteOffset = types.toJs<types.AstNode>(astArgs[1]);
        const littleEndian = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = DataView.prototype.getUint32.call(context, byteOffset, littleEndian);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.getUint32"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.getUint8'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const byteOffset = types.toJs<types.AstNode>(astArgs[1]);
        const result = DataView.prototype.getUint8.call(context, byteOffset);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.getUint8"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.setBigInt64'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 3 && astArgs.length <= 4) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2]) &&
        types.isBooleanNode(astArgs[3])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const byteOffset = types.toJs<types.AstNode>(astArgs[1]);
        const value = types.toJs<types.NumberNode>(astArgs[2]);
        const littleEndian = types.toJs<types.NumberNode>(astArgs[3] ?? types.createNilNode());
        const result = DataView.prototype.setBigInt64.call(context, byteOffset, value, littleEndian);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.setBigInt64"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.setBigUint64'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 3 && astArgs.length <= 4) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2]) &&
        types.isBooleanNode(astArgs[3])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const byteOffset = types.toJs<types.AstNode>(astArgs[1]);
        const value = types.toJs<types.NumberNode>(astArgs[2]);
        const littleEndian = types.toJs<types.NumberNode>(astArgs[3] ?? types.createNilNode());
        const result = DataView.prototype.setBigUint64.call(context, byteOffset, value, littleEndian);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.setBigUint64"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.setFloat32'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 3 && astArgs.length <= 4) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2]) &&
        types.isBooleanNode(astArgs[3])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const byteOffset = types.toJs<types.AstNode>(astArgs[1]);
        const value = types.toJs<types.NumberNode>(astArgs[2]);
        const littleEndian = types.toJs<types.NumberNode>(astArgs[3] ?? types.createNilNode());
        const result = DataView.prototype.setFloat32.call(context, byteOffset, value, littleEndian);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.setFloat32"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.setFloat64'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 3 && astArgs.length <= 4) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2]) &&
        types.isBooleanNode(astArgs[3])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const byteOffset = types.toJs<types.AstNode>(astArgs[1]);
        const value = types.toJs<types.NumberNode>(astArgs[2]);
        const littleEndian = types.toJs<types.NumberNode>(astArgs[3] ?? types.createNilNode());
        const result = DataView.prototype.setFloat64.call(context, byteOffset, value, littleEndian);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.setFloat64"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.setInt16'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 3 && astArgs.length <= 4) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2]) &&
        types.isBooleanNode(astArgs[3])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const byteOffset = types.toJs<types.AstNode>(astArgs[1]);
        const value = types.toJs<types.NumberNode>(astArgs[2]);
        const littleEndian = types.toJs<types.NumberNode>(astArgs[3] ?? types.createNilNode());
        const result = DataView.prototype.setInt16.call(context, byteOffset, value, littleEndian);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.setInt16"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.setInt32'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 3 && astArgs.length <= 4) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2]) &&
        types.isBooleanNode(astArgs[3])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const byteOffset = types.toJs<types.AstNode>(astArgs[1]);
        const value = types.toJs<types.NumberNode>(astArgs[2]);
        const littleEndian = types.toJs<types.NumberNode>(astArgs[3] ?? types.createNilNode());
        const result = DataView.prototype.setInt32.call(context, byteOffset, value, littleEndian);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.setInt32"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.setInt8'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const byteOffset = types.toJs<types.AstNode>(astArgs[1]);
        const value = types.toJs<types.NumberNode>(astArgs[2]);
        const result = DataView.prototype.setInt8.call(context, byteOffset, value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.setInt8"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.setUint16'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 3 && astArgs.length <= 4) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2]) &&
        types.isBooleanNode(astArgs[3])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const byteOffset = types.toJs<types.AstNode>(astArgs[1]);
        const value = types.toJs<types.NumberNode>(astArgs[2]);
        const littleEndian = types.toJs<types.NumberNode>(astArgs[3] ?? types.createNilNode());
        const result = DataView.prototype.setUint16.call(context, byteOffset, value, littleEndian);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.setUint16"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.setUint32'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 3 && astArgs.length <= 4) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2]) &&
        types.isBooleanNode(astArgs[3])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const byteOffset = types.toJs<types.AstNode>(astArgs[1]);
        const value = types.toJs<types.NumberNode>(astArgs[2]);
        const littleEndian = types.toJs<types.NumberNode>(astArgs[3] ?? types.createNilNode());
        const result = DataView.prototype.setUint32.call(context, byteOffset, value, littleEndian);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.setUint32"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.setUint8'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const byteOffset = types.toJs<types.AstNode>(astArgs[1]);
        const value = types.toJs<types.NumberNode>(astArgs[2]);
        const result = DataView.prototype.setUint8.call(context, byteOffset, value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.setUint8"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.buffer'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = DataView.prototype.buffer;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.buffer"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.byteLength'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = DataView.prototype.byteLength;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.byteLength"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('DataView.prototype.byteOffset'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = DataView.prototype.byteOffset;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "DataView.prototype.byteOffset"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);
