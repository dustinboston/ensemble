import * as core from '@/core.ts';
import * as types from '@/types.ts';

export const stringFunctions: Array<[string, types.Closure]> = [
  ['String', core.printUnescapedString],
  ['String.fromCharCode', stringFromCharCode],
  ['String.fromCodePoint', stringFromCodePoint],
  ['String.prototype.at', stringPrototypeAt],
  ['String.prototype.charAt', stringPrototypeCharAt],
  ['String.prototype.charCodeAt', stringPrototypeCharCodeAt],
  ['String.prototype.codePointAt', stringPrototypeCodePointAt],
  ['String.prototype.concat', stringPrototypeConcat],
  ['String.prototype.endsWith', stringPrototypeEndsWith],
  ['String.prototype.includes', stringPrototypeIncludes],
  ['String.prototype.indexOf', stringPrototypeIndexOf],
  ['String.prototype.isWellFormed', stringPrototypeIsWellFormed],
  ['String.prototype.lastIndexOf', stringPrototypeLastIndexOf],
  ['String.prototype.length', stringPrototypeLength],
  ['String.prototype.localeCompare', stringPrototypeLocaleCompare],
  ['String.prototype.match', stringPrototypeMatch],
  ['String.prototype.matchAll', stringPrototypeMatchAll],
  ['String.prototype.normalize', stringPrototypeNormalize],
  ['String.prototype.padEnd', stringPrototypePadEnd],
  ['String.prototype.padStart', stringPrototypePadStart],
  ['String.prototype.repeat', stringPrototypeRepeat],
  ['String.prototype.replace', stringPrototypeReplace],
  ['String.prototype.replaceAll', stringPrototypeReplaceAll],
  ['String.prototype.search', stringPrototypeSearch],
  ['String.prototype.slice', stringPrototypeSlice],
  ['String.prototype.split', stringPrototypeSplit],
  ['String.prototype.startsWith', stringPrototypeStartsWith],
  ['String.prototype.toLocaleLowerCase', stringPrototypeToLocaleLowerCase],
  ['String.prototype.toLocaleUpperCase', stringPrototypeToLocaleUpperCase],
  ['String.prototype.toLowerCase', stringPrototypeToLowerCase],
  ['String.prototype.toUpperCase', stringPrototypeToUpperCase],
  ['String.prototype.toWellFormed', stringPrototypeToWellFormed],
  ['String.prototype.trim', stringPrototypeTrim],
  ['String.prototype.trimEnd', stringPrototypeTrimEnd],
  ['String.prototype.trimStart', stringPrototypeTrimStart],
  ['String.raw', stringRaw],
];

export function stringFromCharCode(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertVectorNode(astArgs[0]);
  types.assertSequentialValues<types.NumberNode>(astArgs[1].value, types.NumberNode);

  const codeUnits = astArgs[1].value.map<number>(types.unwrapNumberNode);
  const result = String.fromCharCode(...codeUnits);
  return types.createStringNode(result);
}

export function stringFromCodePoint(...astArgs: types.AstNode[]): types.AstNode {
  types.assertSequentialValues<types.NumberNode>(astArgs, types.NumberNode);

  const codePoints = astArgs.map<number>(types.unwrapNumberNode);
  const result = String.fromCodePoint(...codePoints);
  return types.createStringNode(result);
}

export function stringPrototypeAt(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertAstNode(astArgs[0]);
  types.assertNumberNode(astArgs[1]);

  const result = String.prototype.at.call(astArgs[0], astArgs[1].value);
  return types.toAst(result);
}

export function stringPrototypeCharAt(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertAstNode(astArgs[0]);
  types.assertNumberNode(astArgs[1]);

  const result = String.prototype.charAt.call(astArgs[0], astArgs[1].value);
  return types.toAst(result);
}

export function stringPrototypeCharCodeAt(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertAstNode(astArgs[0]);
  types.assertNumberNode(astArgs[1]);

  const result = String.prototype.charCodeAt.call(astArgs[0], astArgs[1].value);
  return types.toAst(result);
}

export function stringPrototypeCodePointAt(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertAstNode(astArgs[0]);
  types.assertNumberNode(astArgs[1]);

  const result = String.prototype.codePointAt.call(astArgs[0], astArgs[1].value);
  return types.toAst(result);
}

export function stringPrototypeConcat(...astArgs: types.AstNode[]): types.AstNode {
  types.assertMinimumArgumentCount(astArgs.length, 2);
  types.assertSequentialValues<types.StringNode>(astArgs, types.StringNode);

  const context = astArgs[0].value;
  const strings = astArgs.slice(1).map(types.unwrapStringNode);
  const result = String.prototype.concat.call(context, ...strings);

  return types.toAst(result);
}

export function stringPrototypeEndsWith(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 2, 3);
  types.assertAstNode(astArgs[0]);
  types.assertStringNode(astArgs[1]);

  if (astArgs.length === 3) {
    types.assertNumberNode(astArgs[2]);
  }

  const context = astArgs[0].value;
  const searchString = astArgs[1].value;
  const length = astArgs.length === 3 ? astArgs[2].value : undefined;
  const result = String.prototype.endsWith.call(context, searchString, length);

  return types.toAst(result);
}

export function stringPrototypeIncludes(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 2, 3);
  types.assertAstNode(astArgs[0]);
  types.assertStringNode(astArgs[1]);
  if (astArgs.length === 3) {
    types.assertNumberNode(astArgs[2]);
  }

  const context = astArgs[0].value;
  const searchString = astArgs[1].value;
  const position = astArgs.length === 3 ? astArgs[2].value : undefined;
  const result = String.prototype.includes.call(context, searchString, position);
  return types.toAst(result);
}

export function stringPrototypeIndexOf(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 2, 3);
  types.assertAstNode(astArgs[0]);
  types.assertStringNode(astArgs[1]);
  if (astArgs.length === 3) {
    types.assertNumberNode(astArgs[2]);
  }

  const context = astArgs[0].value;
  const searchString = astArgs[1].value;
  const position = astArgs.length === 3 ? astArgs[2].value : undefined;
  const result = String.prototype.indexOf.call(context, searchString, position);
  return types.toAst(result);
}

export function stringPrototypeIsWellFormed(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);

  const context = astArgs[0].value;
  const result = String.prototype.isWellFormed.call(context);
  return types.toAst(result);
}

export function stringPrototypeLastIndexOf(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 2, 3);
  types.assertAstNode(astArgs[0]);
  types.assertStringNode(astArgs[1]);
  if (astArgs.length === 3) {
    types.assertNumberNode(astArgs[2]);
  }

  const context = astArgs[0].value;
  const searchString = astArgs[1].value;
  const position = astArgs.length === 3 ? astArgs[2].value : undefined;
  const result = String.prototype.lastIndexOf.call(context, searchString, position);
  return types.toAst(result);
}

export function stringPrototypeLength(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);

  const context = astArgs[0].value;
  const result = context.length;
  return types.toAst(result);
}

export function stringPrototypeLocaleCompare(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 2, 4);
  types.assertStringNode(astArgs[0]);
  types.assertStringNode(astArgs[1]);

  const context = astArgs[0].value;
  const that = astArgs[1].value;

  let locales: string | string[] | undefined = undefined;
  let options: Record<string, unknown> | undefined = undefined;

  if (astArgs.length > 2) {
    const localesArg = astArgs[2];
    if (types.isStringNode(localesArg)) {
      locales = localesArg.value;
    } else if (types.isVectorNode(localesArg)) {
      types.assertSequentialValues<types.StringNode>(localesArg.value, types.StringNode);
      locales = localesArg.value.map<string>(types.unwrapStringNode);
    } else {
      types.assertNilNode(localesArg);
      locales = undefined;
    }
  }

  if (astArgs.length > 3) {
    const optionsArg = astArgs[3];
    types.assertMapNode(optionsArg);
    options = types.unwrapMapNode(optionsArg);
  }

  const result = String.prototype.localeCompare.call(context, that, locales, options);
  return types.toAst(result);
}

export function stringPrototypeMatch(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertStringNode(astArgs[0]);
  types.assertAtomNode(astArgs[1]);
  types.assertRegExp(astArgs[1].value);

  const context = astArgs[0].value;
  const regexp = astArgs[1].value;
  const result = String.prototype.match.call(context, regexp);
  return types.toAst(result);
}

export function stringPrototypeMatchAll(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertStringNode(astArgs[0]);
  types.assertAtomNode(astArgs[1]);
  types.assertRegExp(astArgs[1].value);

  const context = astArgs[0].value;
  const regexp = astArgs[1].value;
  const result = String.prototype.matchAll.call(context, regexp);
  return types.toAst(result);
}

export function stringPrototypeNormalize(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 1, 2);
  types.assertAstNode(astArgs[0]);
  if (astArgs.length === 2) {
    types.assertStringNode(astArgs[1]);
  }

  const context = astArgs[0].value;
  const form = astArgs.length === 2 ? astArgs[1].value : undefined;
  const result = String.prototype.normalize.call(context, form);
  return types.toAst(result);
}

export function stringPrototypePadEnd(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 2, 3);
  types.assertAstNode(astArgs[0]);
  types.assertNumberNode(astArgs[1]);
  if (astArgs.length === 3) {
    types.assertStringNode(astArgs[2]);
  }

  const context = astArgs[0].value;
  const maxLength = astArgs[1].value;
  const fillString = astArgs.length === 3 ? astArgs[2].value : undefined;
  const result = String.prototype.padEnd.call(context, maxLength, fillString);
  return types.toAst(result);
}

export function stringPrototypePadStart(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 2, 3);
  types.assertAstNode(astArgs[0]);
  types.assertNumberNode(astArgs[1]);
  if (astArgs.length === 3) {
    types.assertStringNode(astArgs[2]);
  }

  const context = astArgs[0].value;
  const maxLength = astArgs[1].value;
  const fillString = astArgs.length === 3 ? astArgs[2].value : undefined;
  const result = String.prototype.padStart.call(context, maxLength, fillString);
  return types.toAst(result);
}

export function stringPrototypeRepeat(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertStringNode(astArgs[0]);
  types.assertNumberNode(astArgs[1]);

  const context = astArgs[0].value;
  const count = astArgs[1].value;
  const result = String.prototype.repeat.call(context, count);
  return types.toAst(result);
}

export function stringPrototypeReplace(
  ...astArgs: types.AstNode[]
): types.AstNode {
  types.assertArgumentCount(astArgs.length, 3);
  types.assertStringNode(astArgs[0]);

  let pattern: string | RegExp = '';
  if (types.isStringNode(astArgs[1])) {
    pattern = astArgs[1].value;
  } else {
    types.assertAtomNode(astArgs[1]);
    types.assertRegExp(astArgs[1].value);
    pattern = astArgs[1].value;
  }

  let replacer: string | types.Closure;
  if (types.isStringNode(astArgs[2])) {
    replacer = astArgs[2].value;
  } else {
    throw new Error('Function replacers are not implemented for String.prototype.replace');
  }

  const context = astArgs[0].value;
  const result = context.replace(pattern, replacer);

  return types.toAst(result);
}

export function stringPrototypeReplaceAll(
  ...astArgs: types.AstNode[]
): types.AstNode {
  types.assertArgumentCount(astArgs.length, 3);
  types.assertStringNode(astArgs[0]);

  let pattern: string | RegExp = '';
  if (types.isStringNode(astArgs[1])) {
    pattern = astArgs[1].value;
  } else {
    types.assertAtomNode(astArgs[1]);
    types.assertRegExp(astArgs[1].value);
    pattern = astArgs[1].value;
  }

  let replacer: string | types.Closure;
  if (types.isStringNode(astArgs[2])) {
    replacer = astArgs[2].value;
  } else {
    throw new Error('Function replacers are not implemented for String.prototype.replaceAll');
  }

  const context = astArgs[0].value;
  const result = context.replaceAll(pattern, replacer);

  return types.toAst(result);
}

export function stringPrototypeSearch(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertStringNode(astArgs[0]);
  types.assertAtomNode(astArgs[1]);
  types.assertRegExp(astArgs[1].value);

  const context = astArgs[0].value;
  const regexp = astArgs[1].value;
  const result = String.prototype.search.call(context, regexp);
  return types.toAst(result);
}

export function stringPrototypeSlice(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 1, 3);
  types.assertAstNode(astArgs[0]);
  if (astArgs.length > 1) {
    types.assertNumberNode(astArgs[1]);
  }
  if (astArgs.length > 2) {
    types.assertNumberNode(astArgs[2]);
  }

  const context = astArgs[0].value;
  const start = astArgs.length > 1 ? astArgs[1].value : undefined;
  const end = astArgs.length > 2 ? astArgs[2].value : undefined;
  const result = String.prototype.slice.call(context, start, end);
  return types.toAst(result);
}

export function stringPrototypeSplit(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 2, 3);
  types.assertStringNode(astArgs[0]);
  types.assertStringNode(astArgs[1]);

  if (astArgs.length === 3) {
    types.assertNumberNode(astArgs[2]);
  }

  const context = astArgs[0].value;
  const separator = astArgs[1].value;
  const limit = astArgs.length === 3 ? astArgs[2].value : undefined;
  const result = context.split(separator, limit);

  return types.toAst(result);
}

export function stringPrototypeStartsWith(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 2, 3);
  types.assertAstNode(astArgs[0]);
  types.assertStringNode(astArgs[1]);

  if (astArgs.length === 3) {
    types.assertNumberNode(astArgs[2]);
  }

  const context = astArgs[0].value;
  const searchString = astArgs[1].value;
  const position = astArgs.length > 2 ? astArgs[2].value : undefined;
  const result = String.prototype.startsWith.call(context, searchString, position);
  return types.toAst(result);
}

export function stringPrototypeToLocaleLowerCase(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 1, 2); // Corrected argument count
  types.assertAstNode(astArgs[0]);
  if (astArgs.length === 2) {
    // locales is optional, so allow nil or StringNode
    if (!types.isNilNode(astArgs[1])) {
      types.assertStringNode(astArgs[1]);
    }
  }

  const context = astArgs[0].value;
  const locales = astArgs.length === 2 && !types.isNilNode(astArgs[1]) ? astArgs[1].value : undefined;
  const result = String.prototype.toLocaleLowerCase.call(context, locales);
  return types.toAst(result);
}

export function stringPrototypeToLocaleUpperCase(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 1, 2); // Corrected argument count
  types.assertAstNode(astArgs[0]);

  if (astArgs.length === 2) {
    if (!types.isNilNode(astArgs[1])) {
      types.assertStringNode(astArgs[1]);
    }
  }

  const context = astArgs[0].value;
  const locales = astArgs.length === 2 && !types.isNilNode(astArgs[1]) ? astArgs[1].value : undefined;
  const result = String.prototype.toLocaleUpperCase.call(context, locales);
  return types.toAst(result);
}

export function stringPrototypeToLowerCase(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);

  const context = astArgs[0].value;
  const result = String.prototype.toLowerCase.call(context);
  return types.toAst(result);
}

export function stringPrototypeToUpperCase(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);

  const context = astArgs[0].value;
  const result = String.prototype.toUpperCase.call(context);
  return types.toAst(result);
}

export function stringPrototypeToWellFormed(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);

  const context = astArgs[0].value;
  const result = String.prototype.toWellFormed.call(context);
  return types.toAst(result);
}

export function stringPrototypeTrim(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);

  const context = astArgs[0].value;
  const result = String.prototype.trim.call(context);
  return types.toAst(result);
}

export function stringPrototypeTrimEnd(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);

  const context = astArgs[0].value;
  const result = String.prototype.trimEnd.call(context);
  return types.toAst(result);
}

export function stringPrototypeTrimStart(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);

  const context = astArgs[0].value;
  const result = String.prototype.trimStart.call(context);
  return types.toAst(result);
}

export function stringRaw(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertMapNode(astArgs[0]);
  types.assertVectorNode(astArgs[1]);

  const strings = types.unwrapMapNode(astArgs[0]) as { raw: string[] };
  const substitutions = astArgs[1].value;
  const result = String.raw(strings, ...substitutions);
  return types.toAst(result);
}
