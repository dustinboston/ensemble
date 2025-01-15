import { arrayFunctions } from '@/interop/js/arrays.ts';
import { booleanFunctions } from '@/interop/js/booleans.ts';
import { builtInFunctions } from '@/interop/js/built_ins.ts';
import { dateFunctions } from '@/interop/js/dates.ts';
import { errorFunctions } from '@/interop/js/error.ts';
import { functionFunctions } from '@/interop/js/function.ts';
import { mapFunctions } from '@/interop/js/map.ts';
import { mathFunctions } from '@/interop/js/math.ts';
import { numberFunctions } from '@/interop/js/number.ts';
import { operators } from '@/interop/js/operators.ts';
import * as types from '@/types.ts';

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
];

export const ns = new Map<types.MapKeyNode, types.FunctionNode>();

for (const [sym, fn] of nsValues) {
  ns.set(types.createSymbolNode(sym), types.createFunctionNode(fn));
}
