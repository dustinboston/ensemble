import { arrayFunctions } from '@/interop/js/arrays.ts';
import { booleanFunctions } from '@/interop/js/booleans.ts';
import { dateFunctions } from '@/interop/js/dates.ts';
import { operators } from '@/interop/js/operators.ts';
import * as types from '@/types.ts';

const nsValues: Array<[string, types.Closure]> = [
  ...arrayFunctions,
  ...booleanFunctions,
  ...operators,
  ...dateFunctions,
];

export const ns = new Map<types.MapKeyNode, types.FunctionNode>();

for (const [sym, fn] of nsValues) {
  ns.set(types.createSymbolNode(sym), types.createFunctionNode(fn));
}
