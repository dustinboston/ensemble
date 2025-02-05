import { errorFunctions } from "../interop/js/error.js";
import { functionFunctions } from "../interop/js/function.js";
import { mapFunctions } from "../interop/js/map.js";
import { mathFunctions } from "../interop/js/math.js";
import { numberFunctions } from "../interop/js/number.js";
import { regExpFunctions } from "../interop/js/regexp.js";
import { stringFunctions } from "../interop/js/string.js";
import { symbolFunctions } from "../interop/js/symbol.js";
import * as types from "../types.js";
import { arrayFunctions } from "./js/array.js";
import { booleanFunctions } from "./js/boolean.js";
import { builtInFunctions } from "./js/builtin.js";
import { dateFunctions } from "./js/date.js";
import { operators } from "./js/operator.js";
const nsValues = [
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
export const ns = new Map();
for (const [sym, fn] of nsValues) {
    ns.set(types.createSymbolNode(sym), types.createFunctionNode(fn));
    // Add the shorthand :: as an alias to "prototype"
    if (sym.includes('.prototype.')) {
        const withPrototypeAlias = sym.replace('.prototype.', '::');
        ns.set(types.createSymbolNode(withPrototypeAlias), types.createFunctionNode(fn));
    }
    else if (sym.includes('.prototype[')) {
        const withPrototypeAlias = sym.replace('.prototype[', '::[');
        ns.set(types.createSymbolNode(withPrototypeAlias), types.createFunctionNode(fn));
    }
}
