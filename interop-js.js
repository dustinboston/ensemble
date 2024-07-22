/** 
 * Well-known global constructors and functions to explore
 * @type {Set<string>} 
 */
const JS_GLOBALS = new Set([
    "AggregateError",
    "Array",
    "ArrayBuffer",
    "AsyncFunction",
    "AsyncGenerator",
    "AsyncGeneratorFunction",
    "AsyncIterator",
    "Atomics",
    "BigInt",
    "BigInt64Array",
    "BigUint64Array",
    "Boolean",
    "DataView",
    "Date",
    "Error",
    "EvalError",
    "FinalizationRegistry",
    "Float16Array",
    "Float32Array",
    "Float64Array",
    "Function",
    "Generator",
    "GeneratorFunction",
    "Int16Array",
    "Int32Array",
    "Int8Array",
    "Intl",
    "Iterator",
    "JSON",
    "Map",
    "Math",
    "Number",
    "Object",
    "Promise",
    "Proxy",
    "RangeError",
    "ReferenceError",
    "Reflect",
    "RegExp",
    "Set",
    "SharedArrayBuffer",
    "String",
    "Symbol",
    "SyntaxError",
    "TypeError",
    "Uint16Array",
    "Uint32Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "URIError",
    "WeakMap",
    "WeakRef",
    "WeakSet",
    "WebAssembly",
]);


/**
 * Functions for JavaScript symbols that don't have a functional equivalent,
 * e.g. +, <= instanceof, typeof, etc.
 * @file
 */

/**
 * Wraps typeof
 * @param {*} object 
 * @param {string} typeString 
 * @returns {boolean}
 */
export function typeOf(object, typeString) {
    return typeof object === typeString;
}


/**
 * Wraps instanceof
 * @param {*} object 
 * @param {*} instance 
 * @returns {boolean}
 */
export function instanceOf(object, instance) {
    return object instanceof instance;
}


/**
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 * @throws {Error}
 */
export function lessThan(a, b) {
    if (typeof a === "number" && typeof b === "number") {
        return a < b;
    }

    throw new TypeError("not a number");
}

/**
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 * @throws {Error}
 */
export function lessThanOrEqual(a, b) {
    if (typeof a === "number" && typeof b === "number") {
        return a <= b;
    }

    throw new TypeError("not a number");
}

/**
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 * @throws {Error}
 */
export function greaterThan(a, b) {
    if (typeof a === "number" && typeof b === "number") {
        return a > b;
    }

    throw new TypeError("not a number");
}

/**
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 * @throws {Error}
 */
export function greaterThanOrEqual(a, b) {
    if (typeof a === "number" && typeof b === "number") {
        return a >= b;
    }

    throw new TypeError("not a number");
}

/**
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 */
export function equals(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
        return (
            a.length === b.length
            && a.every((/** @type {*} */ v, /** @type {number} */ i) =>
                equals(v, b[i]),
            )
        );
    }

    return a === b;
}

/**
 * Implements the nullish coesce operator (??)
 * @param {*} a Object to check if a is null or undefined
 * @param {*} b Result if a is null or undefined
 * @returns {*}
 */
export function nullishCoalesce(a, b) {
    return a ?? b;
}

// MARK: MATH

/**
 * @private
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @throws {TypeError}
 */
export function add(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new TypeError("not a number");
    }

    return a + b;
}

/**
 * @private
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @throws {TypeError}
 */
export function subtract(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new TypeError("not a number");
    }

    return a - b;
}

/**
 * @private
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @throws {TypeError}
 */
export function multiply(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new TypeError("not a number");
    }

    return a * b;
}

/**
 * @private
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @throws {TypeError}
 */
export function divide(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new TypeError("not a number");
    }

    return a / b;
}

/**
 * @param {number} base
 * @param {number} exponent
 * @returns {number}
 * @throws {TypeError}
 */
export function power(base, exponent) {
    if (typeof base !== "number" || typeof exponent !== "number") {
        throw new TypeError("not a number");
    }

    return base ** exponent;
}

/**
 * AKA modulo
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @throws {TypeError}
 */
export function remainder(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new TypeError("not a number");
    }

    return ((a % b) + b) % b;
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @throws {TypeError}
 */
export function bitwiseAnd(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new TypeError("not a number");
    }

    return a & b; // eslint-disable-line no-bitwise
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @throws {TypeError}
 */
export function bitwiseOr(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new TypeError("not a number");
    }

    return a | b; // eslint-disable-line no-bitwise
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @throws {TypeError}
 */
export function bitwiseXor(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new TypeError("not a number");
    }

    return a ^ b; // eslint-disable-line no-bitwise
}

/**
 * @param {number} a - The number.
 * @returns {number} The result of the bitwise NOT operation.
 * @throws {TypeError} If the argument is not a number.
 */
export function bitwiseNot(a) {
    if (typeof a !== "number") {
        throw new TypeError("not a number");
    }

    return ~a; // eslint-disable-line no-bitwise
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @throws {TypeError}
 */
export function leftShift(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new TypeError("not a number");
    }

    return a << b; // eslint-disable-line no-bitwise
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @throws {TypeError}
 */
export function rightShift(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new TypeError("not a number");
    }

    return a >> b; // eslint-disable-line no-bitwise
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @throws {TypeError}
 */
export function unsignedRightShift(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new TypeError("not a number");
    }

    return a >>> b; // eslint-disable-line no-bitwise
}

/**
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 */
export function and(a, b) {
    return a && b;
}

/**
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 */
export function or(a, b) {
    return a || b;
}

/**
 * @param {*} a
 * @returns {boolean}
 */
export function not(a) {
    return !a;
}

/**
 * @param {number} a
 * @param {string} affix - "prefix" or "postfix"
 * @returns {number}
 * @throws {TypeError}
 */
export function increment(a, affix = "postfix") {
    if (typeof a !== "number") {
        throw new TypeError("not a number");
    }

    if (affix === "prefix") {
        return a++;
    }

    if (affix === "postfix") {
        return ++a;
    }

    throw new TypeError("affix must be 'prefix' or 'postfix'");
}

/**
 * @param {number} a
 * @param {string} affix - "prefix" or "postfix"
 * @returns {number}
 * @throws {TypeError}
 */
export function decrement(a, affix = "postfix") {
    if (typeof a !== "number") {
        throw new TypeError("not a number");
    }

    if (affix === "prefix") {
        return a--;
    }

    if (affix === "postfix") {
        return --a;
    }

    throw new TypeError("affix must be 'prefix' or 'postfix'");
}

/**
 * Gets a list of 
 * @returns {[string , Object|Function][]}
 */
export function getJsFunctionMap() {
    /**
     * @type {[string, Object|Function][]}
     */
    return [
        ["typeOf", typeOf],
        ["instanceOf", instanceOf],

        ["===", equals],
        ["<", lessThan],
        ["<=", lessThanOrEqual],
        [">", greaterThan],
        [">=", greaterThanOrEqual],
        ["??", nullishCoalesce],

        ["equals", equals],
        ["lessThan", lessThan],
        ["lessThanOrEqual", lessThanOrEqual],
        ["greaterThan", greaterThan],
        ["greaterThanOrEqual", greaterThanOrEqual],
        ["nullish", nullishCoalesce],

        ["+", add],
        ["-", subtract],
        ["*", multiply],
        ["/", divide],
        ["**", power],
        ["%", remainder],
        [">>", rightShift],
        ["<<", leftShift],
        [">>>", unsignedRightShift],
        ["&", bitwiseAnd],
        ["|", bitwiseOr],
        ["^", bitwiseXor],
        ["~", bitwiseNot],

        ["add", add],
        ["subtract", subtract],
        ["multiply", multiply],
        ["divide", divide],
        ["power", power],
        ["remainder", remainder],
        ["rightShift", rightShift],
        ["leftShift", leftShift],
        ["unsignedRightShift", unsignedRightShift],
        ["bitwiseAnd", bitwiseAnd],
        ["bitwiseOr", bitwiseOr],
        ["bitwiseXor", bitwiseXor],
        ["bitwiseNot", bitwiseNot],

        ["&&", and],
        ["||", or],
        ["!", not],
        ["++", increment],
        ["--", decrement],

        ["and", and],
        ["or", or],
        ["not", not],
        ["increment", increment],
        ["decrement", decrement],

        ...Object.entries(collectGlobalFunctions())
    ];
}



/**
 * Collects function keys of specified global objects, excluding special functions starting with '__'.
 * Additionally, collects functions directly on the global object.
 * Creates an object literal of keys that map to their functions or objects.
 * Creates a Map that maps symbols to keys.
 */
function collectGlobalFunctions() {
    /** @type {*} */
    const globalObject = globalThis;

    /**
     * Object literal to hold the paths and function references
     * @type {Record<string, Function|Object>}
     */
    const functionObject = {};

    /**
     * Recursively collect function keys of objects
     * @param {*} obj - The object to collect function keys from
     * @param {string} path - The current path of the object
     * @param {Set<string>} visited - Set of visited objects to avoid circular references
     */
    function collectFunctionKeys(obj, path = '', visited = new Set()) {
        if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function') || visited.has(obj)) {
            return;
        }

        visited.add(obj);

        const keys = Object.getOwnPropertyNames(obj);
        for (const key of keys) {
            // Skip special functions starting with '__'
            if (key.startsWith('__')) {
                continue;
            }

            const currentPath = path ? `${path}.${key}` : key;

            try {
                const value = obj[key];
                if (typeof value === 'function') {
                    functionObject[currentPath] = value;
                } else if (typeof value === 'object' && value !== null) {
                    functionObject[currentPath] = value;
                    collectFunctionKeys(value, currentPath, visited);
                }
            } catch (e) {
                // console.log(`Error accessing ${currentPath}: ${e}`);
            }
        }

        visited.delete(obj); // Allow revisiting this object in different paths
    }

    // Collect function keys of explicitly listed global objects
    JS_GLOBALS.forEach(name => {
        try {
            const obj = globalObject[name];
            if (obj) {
                collectFunctionKeys(obj, name);
            }
        } catch (e) {
            // console.log(`Error accessing ${name}: ${e}`);
        }
    });

    // Additionally, collect functions directly on the global object that are not in the wellKnownGlobals list
    const globalKeys = Object.getOwnPropertyNames(globalObject);
    for (const key of globalKeys) {
        if (key.startsWith('__') || JS_GLOBALS.has(key)) {
            continue;
        }

        try {
            const value = globalObject[key];
            if (typeof value === 'function') {
                functionObject[key] = value;
            }
        } catch (e) {
            // console.log(`Error accessing ${key}: ${e}`);
        }
    }

    return functionObject;
}


// // MARK: CORE NS
// /**
//  * @type {[string, (() => *) | ((a: *) => *) | ((a: *, b: *) => *)][]}
//  */
// const coreFunctions = [
// 	["throw", throwError],
// 	["isArray", isArray],
// 	["isNumber", isNumber],
// 	["isString", isString],
// 	["isSymbol", isSymbol],
// 	["isFunction", isFunction],
// 	["isObject", isObject],
// 	["isUndefined", isUndefined],
// 	["isNull", isNull],
// 	["debug", debug],
// 	["toString", toString],
// 	["toEscaped", toEscaped],
// 	["logString", logString],
// 	["logEscaped", logEscaped],
// 	["array", array],
// 	["isEmpty", isEmpty],
// 	["length", length],
// 	["at", at],
// 	["getIn", getIn],
// 	["lessThan", lessThan],
// 	["lessThanOrEqual", lessThanOrEqual],
// 	["greaterThan", greaterThan],
// 	["greaterThanOrEqual", greaterThanOrEqual],
// 	["equals", equals],
// 	["add", add],
// 	["subtract", subtract],
// 	["multiply", multiply],
// 	["divide", divide],
// 	["power", power],
// 	["remainder", remainder],
// 	["rightShift", rightShift],
// 	["leftShift", leftShift],
// 	["unsignedRightShift", unsignedRightShift],
// 	["bitwiseAnd", bitwiseAnd],
// 	["bitwiseOr", bitwiseOr],
// 	["bitwiseXor", bitwiseXor],
// 	["bitwiseNot", bitwiseNot],
// 	["now", now],
// 	["and", and],
// 	["or", or],
// 	["not", not],
// 	["increment", increment],
// 	["decrement", decrement],
// 	["stylesheet", stylesheet],
// ];

// for (const [key, coreFunction] of coreFunctions) {
// 	$[key] = Symbol(key);
// 	ns.set($[key], coreFunction);
// 	keyBySymbol.set($[key], key);
// }

// for (const [key, coreFunction] of coreFunctions) {
//     $[key] = Symbol(key);
//     ns.set($[key], coreFunction);
//     keyBySymbol.set($[key], key);
// }

// MARK: FACTORIES

// /**
//  * @deprecated
//  * @param {Function} f
//  * @returns {Function}
//  */
// export function lambda(f) {
//     if (isFunction(f)) {
//         return (/** @type {*[]} */ ...parameters) => f(...parameters);
//     }

//     throw new TypeError("not a function");
// }

// /**
//  * Create a symbol
//  * @param {string} key
//  * @returns {symbol}
//  */
// export const symbol = Symbol.for;

// /**
//  * @param {...*} a
//  * @returns {*[]}
//  */
// export function array(...a) {
//     return a;
// }

// // MARK: LISTS

// /**
//  * @param {*[]|string} a
//  * @returns {boolean}
//  */
// export function isEmpty(a) {
//     return (isArray(a) || isString(a)) && a.length === 0;
// }

// /**
//  * @param {*[]|string} a
//  * @returns {number}
//  */
// export function length(a) {
//     return (isArray(a) || isString(a) ? a.length : 0);
// }

// /**
//  * @param {*[]} a - The array to check for element n.
//  * @param {number} n - The nth item to get in the array (zero based)
//  * @returns {*}
//  */
// export function at(a, n) {
//     if (!isArray(a)) {
//         throw new TypeError("at requires an array");
//     }

//     return a.at(n);
// }

// // MARK: OBJECTS

// /**
//  * @param {Object} o
//  * @param {string} k
//  * @returns {boolean}
//  */
// export function hasOwn(o, k) {
//     if (isObject(o)) {
//         return Object.hasOwn(o, k);
//     }

//     throw new TypeError("not an object");
// }

// /**
//  * @param {Object} o
//  * @returns {*[]}
//  * @throws {Error}
//  */
// export function entries(o) {
//     if (isObject(o)) {
//         return Object.entries(o);
//     }

//     throw new TypeError("not an object");
// }

// /**
//  * Return a unix timestamp.
//  * @returns A high-resolution timestamp.
//  */
// export function now() {
//     return performance.timeOrigin + performance.now();
// }

// MARK: NON-ESSENTIAL

// /**
//  * Could be used with JSON.stringify to format output.
//  * @param {*} ast
//  * @param {boolean} showEscapes - Currently prints escapes always, could repurpose as prettyPrint
//  * @returns {string}
//  */
// export function stringify(ast, showEscapes = false) {
//     if (ast === null) {
//         return "null";
//     }

//     if (ast === undefined) {
//         return "undefined";
//     }

//     if (typeof ast === "string") {
//         return showEscapes ? slash(`"${ast}"`) : ast;
//         // Pretty: return prettyPrint ? JSON.stringify(ast, null, "\t") : `"${ast}"`;
//     }

//     if (typeof ast === "boolean" || typeof ast === "number") {
//         return String(ast);
//     }

//     if (typeof ast === "symbol") {
//         let key = Symbol.keyFor(ast);
//         if (key === undefined) {
//             // TODO: if stringify is used
//             // if (keyBySymbol.has(ast)) {
//             //     key = keyBySymbol.get(ast);
//             // } else {
//             //     throw new Error(`Missing key for symbol ${String(ast)}`);
//             // }
//         }

//         return `Symbol.for("${key}")`;
//     }

//     if (typeof ast === "function") {
//         return ast.name ?? String(ast);
//     }

//     if (Array.isArray(ast)) {
//         return `[${ast.map(x => stringify(x)).join(", ")}]`;
//     }

//     if (typeof ast === "object" && ast.constructor === Object) {
//         const entries = [];
//         for (const [k, v] of Object.entries(ast)) {
//             entries.push(`${k}: ${stringify(v)}`);
//         }

//         return `{${entries.join(", ")}}`;
//     }

//     throw new Error(`unmatched ast ${JSON.stringify(ast)}`);
// }

// /**
//  * Adds escapes to \, ", and \n.
//  * @param {string} string
//  * @returns string
//  */
// export function slash(string) {
//     return string
//         .replaceAll("\\", "\\\\") // Replace backslashes with double backslashes.
//         .replaceAll("\"", "\"") // Prefix quotes with a backslash.
//         .replaceAll("\n", "\\n"); // Replace newlines with backslash + 'n'.
// }

// /**
//  * Equivalent to `str` with `showEscapes = false`
//  * @param {...*[]} values
//  * @returns string
//  */
// export function toString(...values) {
//     return values.map(value => stringify(value, false)).join("");
// }

// /**
//  * Equivalent to `pr-str`
//  * @param {...*[]} values
//  * @returns string
//  */
// export function toEscaped(...values) {
//     return values.map(value => stringify(value, true)).join(", ");
// }

// /**
//  * Equivalent to `prn`
//  * @param {...*[]} values
//  * @returns null
//  */
// export function logEscaped(...values) {
//     const result = values.map(value => stringify(value, true)).join(", ");
//     console.log(result);
//     return null;
// }

// /**
//  * Equivalent to `println`
//  * @param {...*[]} values
//  * @returns string
//  */
// export function logString(...values) {
//     const result = values.map(value => stringify(value, false)).join(" "); // Was ", "
//     console.log(result);
//     return null;
// }

// /**
//  * Default console.log
//  * @param  {...any[]} parameters
//  */
// export function debug(...parameters) {
//     console.log(...parameters);
//     return parameters;
// }

// // MARK: ERRORS

// /**
//  * @param {string} [m]
//  * @returns {never}
//  * @throws {Error}
//  */
// export function throwError(m) {
//     throw new Error(isString(m) ? m : undefined);
// }

// MARK: TYPES

// /**
//  * @param {*} a
//  * @returns {a is *[]}
//  */
// export function isArray(a) {
//     return Array.isArray(a);
// }


// /**
//  * @param {*} a
//  * @returns {a is number}
//  */
// export function isNumber(a) {
//     return typeof a === "number";
// }

// /**
//  * @param {*} a
//  * @returns {a is string}
//  */
// export function isString(a) {
//     return typeof a === "string";
// }

// /**
//  * @param {*} a
//  * @returns {a is symbol}
//  */
// export function isSymbol(a) {
//     return typeof a === "symbol";
// }

// /**
//  * @param {*} a
//  * @returns {a is Function}
//  */
// export function isFunction(a) {
//     return typeof a === "function";
// }

// /**
//  * @param {*} a
//  * @returns {a is Object}
//  */
// export function isObject(a) {
//     return a !== null && typeof a === "object" && a.constructor === Object;
// }

// /**
//  * @param {*} a
//  * @returns {a is undefined}
//  */
// export function isUndefined(a) {
//     return a === undefined;
// }

// /**
//  * @param {*} a
//  * @returns {a is null}
//  */
// export function isNull(a) {
//     return a === null;
// }

// /**
//  * @param {*} a
//  * @returns {a is boolean}
//  */
// export function isBoolean(a) {
//     return typeof a === "boolean";
// }

// /**
//  * @param {*} a
//  * @returns {a is true}
//  */
// export function isTrue(a) {
//     return a === true;
// }

// /**
//  * @param {*} a
//  * @returns {a is false}
//  */
// export function isFalse(a) {
//     return a === false;
// }

// MARK: EQUALITY


// ["throw", throwError],
// ["isArray", isArray],
// ["isNumber", isNumber],
// ["isString", isString],
// ["isSymbol", isSymbol],
// ["isFunction", isFunction],
// ["isObject", isObject],
// ["isUndefined", isUndefined],
// ["isNull", isNull],
// ["debug", debug],
// ["toString", toString],
// ["toEscaped", toEscaped],
// ["logString", logString],
// ["logEscaped", logEscaped],
// ["array", array],
// ["isEmpty", isEmpty],
// ["length", length],
// ["at", at],
// ["getIn", getIn],
// ["now", now],
// ["stylesheet", stylesheet],