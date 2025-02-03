import * as types from '../src/types.ts';

/** Defines language features and builtins for JavaScript */
export const javascriptNamespace = new Map<types.MapKeyNode, types.FunctionNode>();

javascriptNamespace.set(
  types.createSymbolNode('Intl.getCanonicalLocales'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 0 && astArgs.length <= 1) && ((types.isStringNode(astArgs[0])) ||
          (types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.StringNode)))
      ) {
        const locale = types.toJs<types.StringNode | types.VectorNode<types.StringNode>>(
          astArgs[0] ?? types.createNilNode(),
        );
        const result = Intl.getCanonicalLocales(locale);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.getCanonicalLocales"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.supportedValuesOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertStringNode(astArgs[0]);
      const key = types.toJs<types.StringNode>(astArgs[0]);
      const result = Intl.supportedValuesOf(key);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Collator.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = Intl.Collator.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Collator.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Collator.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Intl.Collator.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Collator.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Collator.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Function.prototype.call.apply(Intl.Collator, [thisArg, ...argArray]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Collator.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Collator[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = Intl.Collator[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Collator[Symbol.hasInstance]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Collator.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Collator.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Collator.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Collator.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Collator.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Collator.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Collator.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Collator.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Collator.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Collator.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Collator.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Collator.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Collator.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Collator.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Collator.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Collator.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Collator.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Collator.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Collator.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Collator.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Collator.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Collator'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Collator(); // ctor
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Collator"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Collator.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = new Intl.Collator(); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Collator.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Collator.prototype.compare'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1]) &&
        types.isStringNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const x = types.toJs<types.AstNode>(astArgs[1]);
        const y = types.toJs<types.StringNode>(astArgs[2]);
        const result = Intl.Collator.prototype.compare.call(context, x, y);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Collator.prototype.compare"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Collator.prototype.resolvedOptions'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.Collator.prototype.resolvedOptions.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.Collator.prototype.resolvedOptions"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Collator.supportedLocalesOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 0 && astArgs.length <= 1) && ((types.isStringNode(astArgs[0])) ||
          (types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.StringNode)))
      ) {
        const locales = types.toJs<types.StringNode | types.VectorNode<types.StringNode>>(
          astArgs[0] ?? types.createNilNode(),
        );
        const result = Intl.Collator.supportedLocalesOf(locales);
        return types.toAst(result);
      }
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && ((types.isStringNode(astArgs[0])) ||
          (types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.StringNode))) &&
        types.isMapNode(astArgs[1])
      ) {
        const locales = types.toJs<types.StringNode | types.VectorNode<types.StringNode>>(
          astArgs[0] ?? types.createNilNode(),
        );
        const options = types.toJs<types.MapNode>(astArgs[1]);
        const result = Intl.Collator.supportedLocalesOf(locales, options);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Collator.supportedLocalesOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DateTimeFormat.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = Intl.DateTimeFormat.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DateTimeFormat.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DateTimeFormat.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Intl.DateTimeFormat.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DateTimeFormat.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DateTimeFormat.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Function.prototype.call.apply(Intl.DateTimeFormat, [thisArg, ...argArray]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DateTimeFormat.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DateTimeFormat[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = Intl.DateTimeFormat[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.DateTimeFormat[Symbol.hasInstance]"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DateTimeFormat.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.DateTimeFormat.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DateTimeFormat.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DateTimeFormat.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.DateTimeFormat.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DateTimeFormat.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DateTimeFormat.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.DateTimeFormat.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DateTimeFormat.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DateTimeFormat.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.DateTimeFormat.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DateTimeFormat.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DateTimeFormat.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.DateTimeFormat.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DateTimeFormat.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DateTimeFormat.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.DateTimeFormat.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DateTimeFormat.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DateTimeFormat.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.DateTimeFormat.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DateTimeFormat.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DateTimeFormat'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 0 && astArgs.length <= 2) && ((types.isStringNode(astArgs[0])) ||
          (types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.StringNode))) &&
        types.isMapNode(astArgs[1])
      ) {
        const locales = types.toJs<types.StringNode | types.VectorNode<types.StringNode>>(
          astArgs[0] ?? types.createNilNode(),
        );
        const options = types.toJs<types.MapNode>(astArgs[1] ?? types.createNilNode());
        const result = Intl.DateTimeFormat(locales, options); // ctor
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DateTimeFormat"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DateTimeFormat.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 0 && astArgs.length <= 2) && ((types.isStringNode(astArgs[0])) ||
          (types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.StringNode))) &&
        types.isMapNode(astArgs[1])
      ) {
        const locales = types.toJs<types.StringNode | types.VectorNode<types.StringNode>>(
          astArgs[0] ?? types.createNilNode(),
        );
        const options = types.toJs<types.MapNode>(astArgs[1] ?? types.createNilNode());
        const result = new Intl.DateTimeFormat(locales, options); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DateTimeFormat.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DateTimeFormat.supportedLocalesOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) &&
        (types.isNilNode(astArgs[0]) || types.isStringNode(astArgs[0])) && types.isMapNode(astArgs[1])
      ) {
        const locales = types.toJs<types.NilNode | types.StringNode>(astArgs[0]);
        const options = types.toJs<types.MapNode>(astArgs[1] ?? types.createNilNode());
        const result = Intl.DateTimeFormat.supportedLocalesOf(locales, options);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.DateTimeFormat.supportedLocalesOf"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DateTimeFormat.prototype.format'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const date = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const result = Intl.DateTimeFormat.prototype.format.call(context, date);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.DateTimeFormat.prototype.format"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DateTimeFormat.prototype.formatRange'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const startDate = types.toJs<types.AstNode>(astArgs[1]);
        const endDate = types.toJs<types.NumberNode>(astArgs[2]);
        const result = Intl.DateTimeFormat.prototype.formatRange.call(context, startDate, endDate);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.DateTimeFormat.prototype.formatRange"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DateTimeFormat.prototype.formatRangeToParts'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const startDate = types.toJs<types.AstNode>(astArgs[1]);
        const endDate = types.toJs<types.NumberNode>(astArgs[2]);
        const result = Intl.DateTimeFormat.prototype.formatRangeToParts.call(context, startDate, endDate);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.DateTimeFormat.prototype.formatRangeToParts"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DateTimeFormat.prototype.formatToParts'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const date = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const result = Intl.DateTimeFormat.prototype.formatToParts.call(context, date);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.DateTimeFormat.prototype.formatToParts"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DateTimeFormat.prototype.resolvedOptions'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.DateTimeFormat.prototype.resolvedOptions.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.DateTimeFormat.prototype.resolvedOptions"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DisplayNames.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = Intl.DisplayNames.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DisplayNames.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DisplayNames.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Intl.DisplayNames.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DisplayNames.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DisplayNames.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isAstNode(astArgs[1]) &&
        types.isAstNode(astArgs[2])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const fnArg1 = types.toJs<types.AstNode>(astArgs[1]);
        const fnArg2 = types.toJs<types.AstNode>(astArgs[2]);
        const result = Function.prototype.call.apply(Intl.DisplayNames, [thisArg, fnArg1, fnArg2]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DisplayNames.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DisplayNames[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = Intl.DisplayNames[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.DisplayNames[Symbol.hasInstance]"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DisplayNames.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.DisplayNames.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DisplayNames.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DisplayNames.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.DisplayNames.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DisplayNames.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DisplayNames.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.DisplayNames.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DisplayNames.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DisplayNames.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.DisplayNames.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DisplayNames.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DisplayNames.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.DisplayNames.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DisplayNames.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DisplayNames.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.DisplayNames.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DisplayNames.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DisplayNames.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.DisplayNames.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DisplayNames.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DisplayNames.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) &&
        (types.isNilNode(astArgs[0]) || types.isStringNode(astArgs[0])) && types.isMapNode(astArgs[1])
      ) {
        const locales = types.toJs<types.NilNode | types.StringNode>(astArgs[0]);
        const options = types.toJs<types.MapNode>(astArgs[1] ?? types.createNilNode());
        const result = new Intl.DisplayNames(locales, options); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DisplayNames.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DisplayNames.supportedLocalesOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) &&
        (types.isNilNode(astArgs[0]) || types.isStringNode(astArgs[0])) && types.isMapNode(astArgs[1])
      ) {
        const locales = types.toJs<types.NilNode | types.StringNode>(astArgs[0]);
        const options = types.toJs<types.MapNode>(astArgs[1] ?? types.createNilNode());
        const result = Intl.DisplayNames.supportedLocalesOf(locales, options);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.DisplayNames.supportedLocalesOf"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DisplayNames.prototype.of'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const code = types.toJs<types.AstNode>(astArgs[1]);
        const result = Intl.DisplayNames.prototype.of.call(context, code);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.DisplayNames.prototype.of"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.DisplayNames.prototype.resolvedOptions'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.DisplayNames.prototype.resolvedOptions.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.DisplayNames.prototype.resolvedOptions"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.ListFormat.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = Intl.ListFormat.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.ListFormat.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.ListFormat.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Intl.ListFormat.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.ListFormat.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.ListFormat.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Function.prototype.call.apply(Intl.ListFormat, [thisArg, ...argArray]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.ListFormat.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.ListFormat[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = Intl.ListFormat[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.ListFormat[Symbol.hasInstance]"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.ListFormat.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.ListFormat.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.ListFormat.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.ListFormat.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.ListFormat.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.ListFormat.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.ListFormat.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.ListFormat.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.ListFormat.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.ListFormat.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.ListFormat.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.ListFormat.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.ListFormat.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.ListFormat.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.ListFormat.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.ListFormat.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.ListFormat.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.ListFormat.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.ListFormat.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.ListFormat.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.ListFormat.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.ListFormat.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) &&
        (types.isNilNode(astArgs[0]) || types.isStringNode(astArgs[0])) && types.isMapNode(astArgs[1])
      ) {
        const locales = types.toJs<types.NilNode | types.StringNode>(astArgs[0]);
        const options = types.toJs<types.MapNode>(astArgs[1] ?? types.createNilNode());
        const result = new Intl.ListFormat(locales, options); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.ListFormat.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.ListFormat.supportedLocalesOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 0 && astArgs.length <= 2) && ((types.isStringNode(astArgs[0])) ||
          (types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.StringNode))) &&
        types.isMapNode(astArgs[1])
      ) {
        const locales = types.toJs<types.StringNode | types.VectorNode<types.StringNode>>(
          astArgs[0] ?? types.createNilNode(),
        );
        const options = types.toJs<types.MapNode>(astArgs[1] ?? types.createNilNode());
        const result = Intl.ListFormat.supportedLocalesOf(locales, options);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.ListFormat.supportedLocalesOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.ListFormat.prototype.format'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1]) &&
        types.isTypedVector(astArgs[1], types.StringNode)
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const list = types.toJs<types.AstNode>(astArgs[1]);
        const result = Intl.ListFormat.prototype.format.call(context, list);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.ListFormat.prototype.format"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.ListFormat.prototype.formatToParts'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1]) &&
        types.isTypedVector(astArgs[1], types.StringNode)
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const list = types.toJs<types.AstNode>(astArgs[1]);
        const result = Intl.ListFormat.prototype.formatToParts.call(context, list);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.ListFormat.prototype.formatToParts"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.ListFormat.prototype.resolvedOptions'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.ListFormat.prototype.resolvedOptions.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.ListFormat.prototype.resolvedOptions"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = Intl.Locale.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Intl.Locale.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Function.prototype.call.apply(Intl.Locale, [thisArg, ...argArray]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = Intl.Locale[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale[Symbol.hasInstance]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Locale.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Locale.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Locale.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Locale.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Locale.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Locale.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Locale.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isStringNode(astArgs[0]) && types.isMapNode(astArgs[1])
      ) {
        const tag = types.toJs<types.StringNode>(astArgs[0]);
        const options = types.toJs<types.MapNode>(astArgs[1] ?? types.createNilNode());
        const result = new Intl.Locale(tag, options); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.prototype.getCalendars'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.Locale.prototype.getCalendars.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.prototype.getCalendars"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.prototype.getCollations'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.Locale.prototype.getCollations.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.Locale.prototype.getCollations"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.prototype.getHourCycles'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.Locale.prototype.getHourCycles.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.Locale.prototype.getHourCycles"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.prototype.getNumberingSystems'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.Locale.prototype.getNumberingSystems.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.Locale.prototype.getNumberingSystems"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.prototype.getTextInfo'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.Locale.prototype.getTextInfo.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.prototype.getTextInfo"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.prototype.getTimeZones'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.Locale.prototype.getTimeZones.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.prototype.getTimeZones"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.prototype.getWeekInfo'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.Locale.prototype.getWeekInfo.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.prototype.getWeekInfo"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.prototype.maximize'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.Locale.prototype.maximize.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.prototype.maximize"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.prototype.minimize'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.Locale.prototype.minimize.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.prototype.minimize"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.prototype.baseName'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.Locale.prototype.baseName;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.prototype.baseName"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.prototype.calendar'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.Locale.prototype.calendar;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.prototype.calendar"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.prototype.caseFirst'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.Locale.prototype.caseFirst;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.prototype.caseFirst"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.prototype.collation'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.Locale.prototype.collation;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.prototype.collation"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.prototype.hourCycle'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.Locale.prototype.hourCycle;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.prototype.hourCycle"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.prototype.language'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.Locale.prototype.language;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.prototype.language"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.prototype.numberingSystem'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.Locale.prototype.numberingSystem;
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.Locale.prototype.numberingSystem"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.prototype.numeric'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.Locale.prototype.numeric;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.prototype.numeric"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.prototype.region'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.Locale.prototype.region;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.prototype.region"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Locale.prototype.script'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.Locale.prototype.script;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Locale.prototype.script"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.NumberFormat.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = Intl.NumberFormat.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.NumberFormat.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.NumberFormat.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Intl.NumberFormat.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.NumberFormat.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.NumberFormat.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Function.prototype.call.apply(Intl.NumberFormat, [thisArg, ...argArray]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.NumberFormat.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.NumberFormat[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = Intl.NumberFormat[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.NumberFormat[Symbol.hasInstance]"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.NumberFormat.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.NumberFormat.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.NumberFormat.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.NumberFormat.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.NumberFormat.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.NumberFormat.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.NumberFormat.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.NumberFormat.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.NumberFormat.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.NumberFormat.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.NumberFormat.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.NumberFormat.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.NumberFormat.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.NumberFormat.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.NumberFormat.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.NumberFormat.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.NumberFormat.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.NumberFormat.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.NumberFormat.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.NumberFormat.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.NumberFormat.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.NumberFormat'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 0 && astArgs.length <= 2) && ((types.isStringNode(astArgs[0])) ||
          (types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.StringNode))) &&
        types.isMapNode(astArgs[1])
      ) {
        const locales = types.toJs<types.StringNode | types.VectorNode<types.StringNode>>(
          astArgs[0] ?? types.createNilNode(),
        );
        const options = types.toJs<types.MapNode>(astArgs[1] ?? types.createNilNode());
        const result = Intl.NumberFormat(locales, options); // ctor
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.NumberFormat"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.NumberFormat.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 0 && astArgs.length <= 2) && ((types.isStringNode(astArgs[0])) ||
          (types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.StringNode))) &&
        types.isMapNode(astArgs[1])
      ) {
        const locales = types.toJs<types.StringNode | types.VectorNode<types.StringNode>>(
          astArgs[0] ?? types.createNilNode(),
        );
        const options = types.toJs<types.MapNode>(astArgs[1] ?? types.createNilNode());
        const result = new Intl.NumberFormat(locales, options); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.NumberFormat.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.NumberFormat.supportedLocalesOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 0 && astArgs.length <= 2) && ((types.isStringNode(astArgs[0])) ||
          (types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.StringNode))) &&
        types.isMapNode(astArgs[1])
      ) {
        const locales = types.toJs<types.StringNode | types.VectorNode<types.StringNode>>(
          astArgs[0] ?? types.createNilNode(),
        );
        const options = types.toJs<types.MapNode>(astArgs[1] ?? types.createNilNode());
        const result = Intl.NumberFormat.supportedLocalesOf(locales, options);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.NumberFormat.supportedLocalesOf"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.NumberFormat.prototype.format'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const numberValue = types.toJs<types.AstNode>(astArgs[1]);
        const result = Intl.NumberFormat.prototype.format.call(context, numberValue);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.NumberFormat.prototype.format"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.NumberFormat.prototype.formatRange'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const startRange = types.toJs<types.AstNode>(astArgs[1]);
        const endRange = types.toJs<types.NumberNode>(astArgs[2]);
        const result = Intl.NumberFormat.prototype.formatRange.call(context, startRange, endRange);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.NumberFormat.prototype.formatRange"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.NumberFormat.prototype.formatRangeToParts'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const startRange = types.toJs<types.AstNode>(astArgs[1]);
        const endRange = types.toJs<types.NumberNode>(astArgs[2]);
        const result = Intl.NumberFormat.prototype.formatRangeToParts.call(context, startRange, endRange);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.NumberFormat.prototype.formatRangeToParts"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.NumberFormat.prototype.formatToParts'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const numberValue = types.toJs<types.AstNode>(astArgs[1]);
        const result = Intl.NumberFormat.prototype.formatToParts.call(context, numberValue);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.NumberFormat.prototype.formatToParts"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.NumberFormat.prototype.resolvedOptions'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.NumberFormat.prototype.resolvedOptions.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.NumberFormat.prototype.resolvedOptions"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.PluralRules.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = Intl.PluralRules.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.PluralRules.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.PluralRules.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Intl.PluralRules.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.PluralRules.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.PluralRules.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Function.prototype.call.apply(Intl.PluralRules, [thisArg, ...argArray]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.PluralRules.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.PluralRules[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = Intl.PluralRules[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.PluralRules[Symbol.hasInstance]"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.PluralRules.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.PluralRules.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.PluralRules.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.PluralRules.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.PluralRules.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.PluralRules.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.PluralRules.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.PluralRules.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.PluralRules.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.PluralRules.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.PluralRules.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.PluralRules.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.PluralRules.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.PluralRules.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.PluralRules.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.PluralRules.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.PluralRules.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.PluralRules.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.PluralRules.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.PluralRules.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.PluralRules.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.PluralRules'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 0 && astArgs.length <= 2) && ((types.isStringNode(astArgs[0])) ||
          (types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.StringNode))) &&
        types.isMapNode(astArgs[1])
      ) {
        const locales = types.toJs<types.StringNode | types.VectorNode<types.StringNode>>(
          astArgs[0] ?? types.createNilNode(),
        );
        const options = types.toJs<types.MapNode>(astArgs[1] ?? types.createNilNode());
        const result = Intl.PluralRules(locales, options); // ctor
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.PluralRules"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.PluralRules.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 0 && astArgs.length <= 2) && ((types.isStringNode(astArgs[0])) ||
          (types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.StringNode))) &&
        types.isMapNode(astArgs[1])
      ) {
        const locales = types.toJs<types.StringNode | types.VectorNode<types.StringNode>>(
          astArgs[0] ?? types.createNilNode(),
        );
        const options = types.toJs<types.MapNode>(astArgs[1] ?? types.createNilNode());
        const result = new Intl.PluralRules(locales, options); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.PluralRules.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.PluralRules.supportedLocalesOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 0 && astArgs.length <= 2) && ((types.isStringNode(astArgs[0])) ||
          (types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.StringNode))) &&
        types.isMapNode(astArgs[1])
      ) {
        const locales = types.toJs<types.StringNode | types.VectorNode<types.StringNode>>(
          astArgs[0] ?? types.createNilNode(),
        );
        const options = types.toJs<types.MapNode>(astArgs[1] ?? types.createNilNode());
        const result = Intl.PluralRules.supportedLocalesOf(locales, options);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.PluralRules.supportedLocalesOf"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.PluralRules.prototype.resolvedOptions'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.PluralRules.prototype.resolvedOptions.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.PluralRules.prototype.resolvedOptions"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.PluralRules.prototype.select'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const numberValue = types.toJs<types.AstNode>(astArgs[1]);
        const result = Intl.PluralRules.prototype.select.call(context, numberValue);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.PluralRules.prototype.select"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.PluralRules.prototype.selectRange'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const startRange = types.toJs<types.AstNode>(astArgs[1]);
        const endRange = types.toJs<types.NumberNode>(astArgs[2]);
        const result = Intl.PluralRules.prototype.selectRange.call(context, startRange, endRange);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.PluralRules.prototype.selectRange"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.RelativeTimeFormat.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = Intl.RelativeTimeFormat.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.RelativeTimeFormat.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.RelativeTimeFormat.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Intl.RelativeTimeFormat.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.RelativeTimeFormat.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.RelativeTimeFormat.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Function.prototype.call.apply(Intl.RelativeTimeFormat, [thisArg, ...argArray]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.RelativeTimeFormat.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.RelativeTimeFormat[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = Intl.RelativeTimeFormat[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.RelativeTimeFormat[Symbol.hasInstance]"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.RelativeTimeFormat.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.RelativeTimeFormat.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.RelativeTimeFormat.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.RelativeTimeFormat.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.RelativeTimeFormat.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.RelativeTimeFormat.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.RelativeTimeFormat.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.RelativeTimeFormat.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.RelativeTimeFormat.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.RelativeTimeFormat.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.RelativeTimeFormat.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.RelativeTimeFormat.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.RelativeTimeFormat.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.RelativeTimeFormat.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.RelativeTimeFormat.toLocaleString"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.RelativeTimeFormat.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.RelativeTimeFormat.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.RelativeTimeFormat.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.RelativeTimeFormat.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.RelativeTimeFormat.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.RelativeTimeFormat.constructor"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.RelativeTimeFormat.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 0 && astArgs.length <= 2) && ((types.isStringNode(astArgs[0])) ||
          (types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.StringNode))) &&
        types.isMapNode(astArgs[1])
      ) {
        const locales = types.toJs<types.StringNode | types.VectorNode<types.StringNode>>(
          astArgs[0] ?? types.createNilNode(),
        );
        const options = types.toJs<types.MapNode>(astArgs[1] ?? types.createNilNode());
        const result = new Intl.RelativeTimeFormat(locales, options); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.RelativeTimeFormat.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.RelativeTimeFormat.supportedLocalesOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) &&
        (types.isNilNode(astArgs[0]) || types.isStringNode(astArgs[0])) && types.isMapNode(astArgs[1])
      ) {
        const locales = types.toJs<types.NilNode | types.StringNode>(astArgs[0]);
        const options = types.toJs<types.MapNode>(astArgs[1] ?? types.createNilNode());
        const result = Intl.RelativeTimeFormat.supportedLocalesOf(locales, options);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.RelativeTimeFormat.supportedLocalesOf"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.RelativeTimeFormat.prototype.format'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isStringNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const value = types.toJs<types.AstNode>(astArgs[1]);
        const unit = types.toJs<types.NumberNode>(astArgs[2]);
        const result = Intl.RelativeTimeFormat.prototype.format.call(context, value, unit);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.RelativeTimeFormat.prototype.format"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.RelativeTimeFormat.prototype.formatToParts'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isStringNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const value = types.toJs<types.AstNode>(astArgs[1]);
        const unit = types.toJs<types.NumberNode>(astArgs[2]);
        const result = Intl.RelativeTimeFormat.prototype.formatToParts.call(context, value, unit);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.RelativeTimeFormat.prototype.formatToParts"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.RelativeTimeFormat.prototype.resolvedOptions'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.RelativeTimeFormat.prototype.resolvedOptions.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.RelativeTimeFormat.prototype.resolvedOptions"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Segmenter.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = Intl.Segmenter.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Segmenter.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Segmenter.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Intl.Segmenter.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Segmenter.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Segmenter.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Function.prototype.call.apply(Intl.Segmenter, [thisArg, ...argArray]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Segmenter.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Segmenter[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = Intl.Segmenter[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Segmenter[Symbol.hasInstance]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Segmenter.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Segmenter.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Segmenter.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Segmenter.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Segmenter.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Segmenter.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Segmenter.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Segmenter.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Segmenter.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Segmenter.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Segmenter.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Segmenter.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Segmenter.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Segmenter.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Segmenter.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Segmenter.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Segmenter.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Segmenter.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Segmenter.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Intl.Segmenter.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Segmenter.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Segmenter.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 0 && astArgs.length <= 2) && ((types.isStringNode(astArgs[0])) ||
          (types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.StringNode))) &&
        types.isMapNode(astArgs[1])
      ) {
        const locales = types.toJs<types.StringNode | types.VectorNode<types.StringNode>>(
          astArgs[0] ?? types.createNilNode(),
        );
        const options = types.toJs<types.MapNode>(astArgs[1] ?? types.createNilNode());
        const result = new Intl.Segmenter(locales, options); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Segmenter.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Segmenter.supportedLocalesOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) &&
        (types.isNilNode(astArgs[0]) || types.isStringNode(astArgs[0])) && types.isMapNode(astArgs[1])
      ) {
        const locales = types.toJs<types.NilNode | types.StringNode>(astArgs[0]);
        const options = types.toJs<types.MapNode>(astArgs[1] ?? types.createNilNode());
        const result = Intl.Segmenter.supportedLocalesOf(locales, options);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Segmenter.supportedLocalesOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Segmenter.prototype.resolvedOptions'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Intl.Segmenter.prototype.resolvedOptions.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Intl.Segmenter.prototype.resolvedOptions"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Intl.Segmenter.prototype.segment'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const input = types.toJs<types.AstNode>(astArgs[1]);
        const result = Intl.Segmenter.prototype.segment.call(context, input);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Intl.Segmenter.prototype.segment"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);
