import * as types from '../types';
import { arrayFunctions } from './js/array';
import { booleanFunctions } from './js/boolean';
import { builtInFunctions } from './js/builtin';
import { dateFunctions } from './js/date';
import { errorFunctions } from './js/error';
import { functionFunctions } from './js/function';
import { mapFunctions } from './js/map';
import { mathFunctions } from './js/math';
import { numberFunctions } from './js/number';
import { operators } from './js/operator';
import { regExpFunctions } from './js/regexp';
import { stringFunctions } from './js/string';
import { symbolFunctions } from './js/symbol';

const nsValues: Array<[string, types.Closure]> = [
  ...arrayFunctions,
  ...booleanFunctions,
  ...builtInFunctions,
  ...operators,
  ...dateFunctions,
  ...errorFunctions,
  ...functionFunctions,
  ...mapFunctions,
  ...mathFunctions,
  ...numberFunctions,
  ...regExpFunctions,
  ...stringFunctions,
  ...symbolFunctions,
];

export const ns = new Map<types.MapKeyNode, types.FunctionNode>();

for (const [sym, fn] of nsValues) {
  ns.set(types.createSymbolNode(sym), types.createFunctionNode(fn));

  // Add the shorthand :: as an alias to "prototype"
  if (sym.includes('.prototype.')) {
    const withPrototypeAlias = sym.replace('.prototype.', '::');
    ns.set(types.createSymbolNode(withPrototypeAlias), types.createFunctionNode(fn));
  } else if (sym.includes('.prototype[')) {
    const withPrototypeAlias = sym.replace('.prototype[', '::[');
    ns.set(types.createSymbolNode(withPrototypeAlias), types.createFunctionNode(fn));
  }
}
