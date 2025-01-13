import * as types from '../src/types.ts';

/** Defines language features and builtins for JavaScript */
export const javascriptNamespace = new Map<types.MapKeyNode, types.FunctionNode>();

javascriptNamespace.set(
  types.createSymbolNode('Date.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = Date.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const result = Date.bind(thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const result = Function.prototype.call.apply(Date, [thisArg]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = Date[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date[Symbol.hasInstance]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Date.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Date.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Date.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Date.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Date.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Date.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Date.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Date(); // ctor
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = new Date(); // new
        return types.toAst(result);
      }
      if ((astArgs.length === 1) && (types.isStringNode(astArgs[0]) || types.isNumberNode(astArgs[0]))) {
        const value = types.toJs<types.StringNode | types.NumberNode>(astArgs[0]);
        const result = new Date(value); // new
        return types.toAst(result);
      }
      if (
        (astArgs.length >= 2 && astArgs.length <= 7) && types.isNumberNode(astArgs[0]) &&
        types.isNumberNode(astArgs[1]) && types.isNumberNode(astArgs[2]) &&
        types.isNumberNode(astArgs[3]) && types.isNumberNode(astArgs[4]) && types.isNumberNode(astArgs[5]) &&
        types.isNumberNode(astArgs[6])
      ) {
        const year = types.toJs<types.NumberNode>(astArgs[0]);
        const monthIndex = types.toJs<types.NumberNode>(astArgs[1]);
        const date = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const hours = types.toJs<types.NumberNode>(astArgs[3] ?? types.createNilNode());
        const minutes = types.toJs<types.NumberNode>(astArgs[4] ?? types.createNilNode());
        const seconds = types.toJs<types.NumberNode>(astArgs[5] ?? types.createNilNode());
        const ms = types.toJs<types.NumberNode>(astArgs[6] ?? types.createNilNode());
        const result = new Date(year, monthIndex, date, hours, minutes, seconds, ms); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.now'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Date.now();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.now"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.parse'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertStringNode(astArgs[0]);
      const dateString = types.toJs<types.StringNode>(astArgs[0]);
      const result = Date.parse(dateString);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.UTC'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 7) && types.isNumberNode(astArgs[0]) &&
        types.isNumberNode(astArgs[1]) && types.isNumberNode(astArgs[2]) &&
        types.isNumberNode(astArgs[3]) && types.isNumberNode(astArgs[4]) && types.isNumberNode(astArgs[5]) &&
        types.isNumberNode(astArgs[6])
      ) {
        const year = types.toJs<types.NumberNode>(astArgs[0]);
        const month = types.toJs<types.NumberNode>(astArgs[1]);
        const date = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const hours = types.toJs<types.NumberNode>(astArgs[3] ?? types.createNilNode());
        const minutes = types.toJs<types.NumberNode>(astArgs[4] ?? types.createNilNode());
        const seconds = types.toJs<types.NumberNode>(astArgs[5] ?? types.createNilNode());
        const ms = types.toJs<types.NumberNode>(astArgs[6] ?? types.createNilNode());
        const result = Date.UTC(year, month, date, hours, minutes, seconds, ms);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.UTC"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.getDate'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.getDate.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.getDate"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.getDay'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.getDay.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.getDay"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.getFullYear'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.getFullYear.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.getFullYear"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.getHours'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.getHours.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.getHours"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.getMilliseconds'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.getMilliseconds.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.getMilliseconds"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.getMinutes'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.getMinutes.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.getMinutes"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.getMonth'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.getMonth.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.getMonth"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.getSeconds'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.getSeconds.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.getSeconds"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.getTime'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.getTime.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.getTime"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.getTimezoneOffset'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.getTimezoneOffset.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.getTimezoneOffset"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.getUTCDate'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.getUTCDate.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.getUTCDate"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.getUTCDay'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.getUTCDay.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.getUTCDay"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.getUTCFullYear'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.getUTCFullYear.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.getUTCFullYear"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.getUTCHours'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.getUTCHours.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.getUTCHours"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.getUTCMilliseconds'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.getUTCMilliseconds.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.getUTCMilliseconds"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.getUTCMinutes'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.getUTCMinutes.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.getUTCMinutes"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.getUTCMonth'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.getUTCMonth.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.getUTCMonth"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.getUTCSeconds'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.getUTCSeconds.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.getUTCSeconds"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.setDate'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const date = types.toJs<types.AstNode>(astArgs[1]);
        const result = Date.prototype.setDate.call(context, date);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.setDate"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.setFullYear'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 4) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2]) &&
        types.isNumberNode(astArgs[3])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const year = types.toJs<types.AstNode>(astArgs[1]);
        const month = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const date = types.toJs<types.NumberNode>(astArgs[3] ?? types.createNilNode());
        const result = Date.prototype.setFullYear.call(context, year, month, date);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.setFullYear"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.setHours'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 5) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2]) &&
        types.isNumberNode(astArgs[3]) && types.isNumberNode(astArgs[4])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const hours = types.toJs<types.AstNode>(astArgs[1]);
        const min = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const sec = types.toJs<types.NumberNode>(astArgs[3] ?? types.createNilNode());
        const ms = types.toJs<types.NumberNode>(astArgs[4] ?? types.createNilNode());
        const result = Date.prototype.setHours.call(context, hours, min, sec, ms);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.setHours"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.setMilliseconds'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const ms = types.toJs<types.AstNode>(astArgs[1]);
        const result = Date.prototype.setMilliseconds.call(context, ms);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.setMilliseconds"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.setMinutes'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 4) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2]) &&
        types.isNumberNode(astArgs[3])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const min = types.toJs<types.AstNode>(astArgs[1]);
        const sec = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const ms = types.toJs<types.NumberNode>(astArgs[3] ?? types.createNilNode());
        const result = Date.prototype.setMinutes.call(context, min, sec, ms);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.setMinutes"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.setMonth'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const month = types.toJs<types.AstNode>(astArgs[1]);
        const date = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = Date.prototype.setMonth.call(context, month, date);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.setMonth"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.setSeconds'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const sec = types.toJs<types.AstNode>(astArgs[1]);
        const ms = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = Date.prototype.setSeconds.call(context, sec, ms);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.setSeconds"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.setTime'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const time = types.toJs<types.AstNode>(astArgs[1]);
        const result = Date.prototype.setTime.call(context, time);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.setTime"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.setUTCDate'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const date = types.toJs<types.AstNode>(astArgs[1]);
        const result = Date.prototype.setUTCDate.call(context, date);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.setUTCDate"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.setUTCFullYear'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 4) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2]) &&
        types.isNumberNode(astArgs[3])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const year = types.toJs<types.AstNode>(astArgs[1]);
        const month = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const date = types.toJs<types.NumberNode>(astArgs[3] ?? types.createNilNode());
        const result = Date.prototype.setUTCFullYear.call(context, year, month, date);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.setUTCFullYear"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.setUTCHours'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 5) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2]) &&
        types.isNumberNode(astArgs[3]) && types.isNumberNode(astArgs[4])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const hours = types.toJs<types.AstNode>(astArgs[1]);
        const min = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const sec = types.toJs<types.NumberNode>(astArgs[3] ?? types.createNilNode());
        const ms = types.toJs<types.NumberNode>(astArgs[4] ?? types.createNilNode());
        const result = Date.prototype.setUTCHours.call(context, hours, min, sec, ms);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.setUTCHours"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.setUTCMilliseconds'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const ms = types.toJs<types.AstNode>(astArgs[1]);
        const result = Date.prototype.setUTCMilliseconds.call(context, ms);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.setUTCMilliseconds"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.setUTCMinutes'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 4) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2]) &&
        types.isNumberNode(astArgs[3])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const min = types.toJs<types.AstNode>(astArgs[1]);
        const sec = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const ms = types.toJs<types.NumberNode>(astArgs[3] ?? types.createNilNode());
        const result = Date.prototype.setUTCMinutes.call(context, min, sec, ms);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.setUTCMinutes"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.setUTCMonth'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const month = types.toJs<types.AstNode>(astArgs[1]);
        const date = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = Date.prototype.setUTCMonth.call(context, month, date);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.setUTCMonth"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.setUTCSeconds'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const sec = types.toJs<types.AstNode>(astArgs[1]);
        const ms = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = Date.prototype.setUTCSeconds.call(context, sec, ms);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.setUTCSeconds"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.toDateString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.toDateString.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.toDateString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.toISOString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.toISOString.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.toISOString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.toJSON'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isAstNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const key = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const result = Date.prototype.toJSON.call(context, key);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.toJSON"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.toLocaleDateString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.toLocaleDateString.call(context);
        return types.toAst(result);
      }
      if (
        (astArgs.length >= 1 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) &&
        ((types.isStringNode(astArgs[1])) ||
          (types.isVectorNode(astArgs[1]) && types.isTypedVector(astArgs[1], types.StringNode))) &&
        types.isMapNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const locales = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const options = types.toJs<types.StringNode | types.VectorNode<types.StringNode>>(
          astArgs[2] ?? types.createNilNode(),
        );
        const result = Date.prototype.toLocaleDateString.call(context, locales, options);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.toLocaleDateString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) &&
        ((types.isStringNode(astArgs[1])) ||
          (types.isVectorNode(astArgs[1]) && types.isTypedVector(astArgs[1], types.StringNode))) &&
        types.isMapNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const locales = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const options = types.toJs<types.StringNode | types.VectorNode<types.StringNode>>(
          astArgs[2] ?? types.createNilNode(),
        );
        const result = Date.prototype.toLocaleString.call(context, locales, options);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.toLocaleTimeString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) &&
        ((types.isStringNode(astArgs[1])) ||
          (types.isVectorNode(astArgs[1]) && types.isTypedVector(astArgs[1], types.StringNode))) &&
        types.isMapNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const locales = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const options = types.toJs<types.StringNode | types.VectorNode<types.StringNode>>(
          astArgs[2] ?? types.createNilNode(),
        );
        const result = Date.prototype.toLocaleTimeString.call(context, locales, options);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.toLocaleTimeString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.toTimeString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.toTimeString.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.toTimeString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype.toUTCString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Date.prototype.toUTCString.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype.toUTCString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Date.prototype[Symbol.toPrimitive]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const hint = types.toJs<types.AstNode>(astArgs[1]);
        const result = Date.prototype[Symbol.toPrimitive].call(context, hint);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Date.prototype[Symbol.toPrimitive]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);
