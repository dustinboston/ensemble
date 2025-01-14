/*

javascriptNamespace.set(
  types.createSymbolNode('String.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = String.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);

        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = String.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);

        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Function.prototype.call.apply(String, [thisArg, ...argArray]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = String[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String[Symbol.hasInstance]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = String.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = String.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = String.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = String.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = String.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = String.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = String.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length >= 0 && astArgs.length <= 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0] ?? types.createNilNode());
        const result = String(value); // ctor
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length >= 0 && astArgs.length <= 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0] ?? types.createNilNode());
        const result = new String(value); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.fromCharCode'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 1) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode)
      ) {

        const codeUnits = astArgs.slice(0).map((x) => types.toJs<types.VectorNode<types.NumberNode>>(x));
        const result = String.fromCharCode(...codeUnits);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.fromCharCode"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.fromCodePoint'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 1) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode)
      ) {

        const codePoints = astArgs.slice(0).map((x) => types.toJs<types.VectorNode<types.NumberNode>>(x));
        const result = String.fromCodePoint(...codePoints);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.fromCodePoint"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.at'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const index = types.toJs<types.AstNode>(astArgs[1]);
        const result = String.prototype.at.call(context, index);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.at"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.charAt'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const index = types.toJs<types.AstNode>(astArgs[1]);
        const result = String.prototype.charAt.call(context, index);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.charAt"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.charCodeAt'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const index = types.toJs<types.AstNode>(astArgs[1]);
        const result = String.prototype.charCodeAt.call(context, index);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.charCodeAt"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.codePointAt'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const index = types.toJs<types.AstNode>(astArgs[1]);
        const result = String.prototype.codePointAt.call(context, index);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.codePointAt"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.concat'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1]) &&
        types.isTypedVector(astArgs[1], types.StringNode)
      ) {

        const context = types.toJs<undefined>(astArgs[0]);

        const strings = astArgs.slice(1).map((x) => types.toJs<types.AstNode>(x));
        const result = String.prototype.concat.call(context, ...strings);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.concat"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.endsWith'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {

        const context = types.toJs<undefined>(astArgs[0]);
        const searchString = types.toJs<types.AstNode>(astArgs[1]);
        const length = types.toJs<types.StringNode>(astArgs[2] ?? types.createNilNode());
        const result = String.prototype.endsWith.call(context, searchString, length);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.endsWith"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.includes'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {

        const context = types.toJs<undefined>(astArgs[0]);
        const searchString = types.toJs<types.AstNode>(astArgs[1]);
        const position = types.toJs<types.StringNode>(astArgs[2] ?? types.createNilNode());
        const result = String.prototype.includes.call(context, searchString, position);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.includes"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.indexOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {

        const context = types.toJs<undefined>(astArgs[0]);
        const searchString = types.toJs<types.AstNode>(astArgs[1]);
        const position = types.toJs<types.StringNode>(astArgs[2] ?? types.createNilNode());
        const result = String.prototype.indexOf.call(context, searchString, position);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.indexOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.isWellFormed'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const result = String.prototype.isWellFormed.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.isWellFormed"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.lastIndexOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {

        const context = types.toJs<undefined>(astArgs[0]);
        const searchString = types.toJs<types.AstNode>(astArgs[1]);
        const position = types.toJs<types.StringNode>(astArgs[2] ?? types.createNilNode());
        const result = String.prototype.lastIndexOf.call(context, searchString, position);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.lastIndexOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const result = String.prototype.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.localeCompare'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const that = types.toJs<types.AstNode>(astArgs[1]);
        const result = String.prototype.localeCompare.call(context, that);
        return types.toAst(result);
      }
      if (
        (astArgs.length >= 3 && astArgs.length <= 4) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1]) &&
        ((types.isStringNode(astArgs[2])) ||
          (types.isVectorNode(astArgs[2]) && types.isTypedVector(astArgs[2], types.StringNode))) &&
        types.isMapNode(astArgs[3])
      ) {

        const context = types.toJs<undefined>(astArgs[0]);
        const that = types.toJs<types.AstNode>(astArgs[1]);
        const locales = types.toJs<types.StringNode>(astArgs[2] ?? types.createNilNode());
        const options = types.toJs<types.StringNode | types.VectorNode<types.StringNode>>(astArgs[3]);
        const result = String.prototype.localeCompare.call(context, that, locales, options);
        return types.toAst(result);
      }
      if (
        (astArgs.length >= 2 && astArgs.length <= 4) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1]) &&
        (types.isNilNode(astArgs[2]) || types.isStringNode(astArgs[2])) && types.isMapNode(astArgs[3])
      ) {

        const context = types.toJs<undefined>(astArgs[0]);
        const that = types.toJs<types.AstNode>(astArgs[1]);
        const locales = types.toJs<types.StringNode>(astArgs[2] ?? types.createNilNode());
        const options = types.toJs<types.NilNode | types.StringNode>(astArgs[3] ?? types.createNilNode());
        const result = String.prototype.localeCompare.call(context, that, locales, options);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.localeCompare"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.match'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const regexp = types.toJs<types.AstNode>(astArgs[1]);
        const result = String.prototype.match.call(context, regexp);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.match"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.matchAll'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const regexp = types.toJs<types.AstNode>(astArgs[1]);
        const result = String.prototype.matchAll.call(context, regexp);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.matchAll"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.normalize'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1])
      ) {

        const context = types.toJs<undefined>(astArgs[0]);
        const form = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const result = String.prototype.normalize.call(context, form);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.normalize"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.padEnd'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isStringNode(astArgs[2])
      ) {

        const context = types.toJs<undefined>(astArgs[0]);
        const maxLength = types.toJs<types.AstNode>(astArgs[1]);
        const fillString = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = String.prototype.padEnd.call(context, maxLength, fillString);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.padEnd"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.padStart'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isStringNode(astArgs[2])
      ) {

        const context = types.toJs<undefined>(astArgs[0]);
        const maxLength = types.toJs<types.AstNode>(astArgs[1]);
        const fillString = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = String.prototype.padStart.call(context, maxLength, fillString);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.padStart"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.repeat'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const count = types.toJs<types.AstNode>(astArgs[1]);
        const result = String.prototype.repeat.call(context, count);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.repeat"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.replace'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1]) &&
        types.isStringNode(astArgs[2])
      ) {

        const context = types.toJs<undefined>(astArgs[0]);
        const stringValue = types.toJs<types.AstNode>(astArgs[1]);
        const replaceValue = types.toJs<types.StringNode>(astArgs[2]);
        const result = String.prototype.replace.call(context, stringValue, replaceValue);
        return types.toAst(result);
      }
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1]) &&
        types.isFunctionNode(astArgs[2])
      ) {

        const context = types.toJs<undefined>(astArgs[0]);
        const stringValue = types.toJs<types.AstNode>(astArgs[1]);
        const replacer = types.toJs<types.StringNode>(astArgs[2]);
        const result = String.prototype.replace.call(context, stringValue, replacer);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.replace"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.replaceAll'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1]) &&
        types.isStringNode(astArgs[2])
      ) {

        const context = types.toJs<undefined>(astArgs[0]);
        const stringValue = types.toJs<types.AstNode>(astArgs[1]);
        const replaceValue = types.toJs<types.StringNode>(astArgs[2]);
        const result = String.prototype.replaceAll.call(context, stringValue, replaceValue);
        return types.toAst(result);
      }
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1]) &&
        types.isFunctionNode(astArgs[2])
      ) {

        const context = types.toJs<undefined>(astArgs[0]);
        const stringValue = types.toJs<types.AstNode>(astArgs[1]);
        const replacer = types.toJs<types.StringNode>(astArgs[2]);
        const result = String.prototype.replaceAll.call(context, stringValue, replacer);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.replaceAll"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.search'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const regexp = types.toJs<types.AstNode>(astArgs[1]);
        const result = String.prototype.search.call(context, regexp);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.search"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.slice'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {

        const context = types.toJs<undefined>(astArgs[0]);
        const start = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const end = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = String.prototype.slice.call(context, start, end);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.slice"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.split'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {

        const context = types.toJs<undefined>(astArgs[0]);
        const separator = types.toJs<types.AstNode>(astArgs[1]);
        const limit = types.toJs<types.StringNode>(astArgs[2] ?? types.createNilNode());
        const result = String.prototype.split.call(context, separator, limit);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.split"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.startsWith'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {

        const context = types.toJs<undefined>(astArgs[0]);
        const searchString = types.toJs<types.AstNode>(astArgs[1]);
        const position = types.toJs<types.StringNode>(astArgs[2] ?? types.createNilNode());
        const result = String.prototype.startsWith.call(context, searchString, position);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.startsWith"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.toLocaleLowerCase'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 2) && types.isAstNode(astArgs[0]) &&
        (types.isNilNode(astArgs[1]) || types.isStringNode(astArgs[1]))
      ) {

        const context = types.toJs<undefined>(astArgs[0]);
        const locales = types.toJs<types.AstNode>(astArgs[1]);
        const result = String.prototype.toLocaleLowerCase.call(context, locales);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.toLocaleLowerCase"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.toLocaleUpperCase'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 2) && types.isAstNode(astArgs[0]) &&
        (types.isNilNode(astArgs[1]) || types.isStringNode(astArgs[1]))
      ) {

        const context = types.toJs<undefined>(astArgs[0]);
        const locales = types.toJs<types.AstNode>(astArgs[1]);
        const result = String.prototype.toLocaleUpperCase.call(context, locales);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.toLocaleUpperCase"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.toLowerCase'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const result = String.prototype.toLowerCase.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.toLowerCase"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.toUpperCase'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const result = String.prototype.toUpperCase.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.toUpperCase"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.toWellFormed'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const result = String.prototype.toWellFormed.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.toWellFormed"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.trim'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const result = String.prototype.trim.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.trim"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.trimEnd'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const result = String.prototype.trimEnd.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.trimEnd"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype.trimStart'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const result = String.prototype.trimStart.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype.trimStart"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.prototype[Symbol.iterator]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const result = String.prototype[Symbol.iterator].call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.prototype[Symbol.iterator]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('String.raw'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isMapNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const template = types.toJs<types.MapNode>(astArgs[0]);

        const substitutions = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = String.raw(template, ...substitutions);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "String.raw"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

*/
