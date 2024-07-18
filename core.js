/* eslint-disable unicorn/no-array-reduce */

/**
 * @type {Record<string, symbol>}
 */
export const $ = {};

/**
 * @type {Map<symbol, (() => *) | ((a: *) => *) | ((a: *, b: *) => *)>}
 */
export const ns = new Map();

/**
 * @type {Map<symbol, string>}
 */
const keyBySymbol = new Map();

// MARK: PRINT

/**
 * Could be used with JSON.stringify to format output.
 * @param {*} ast
 * @param {boolean} showEscapes - Currently prints escapes always, could repurpose as prettyPrint
 * @returns {string}
 */
export function stringify(ast, showEscapes = false) {
	if (ast === null) {
		return "null";
	}

	if (ast === undefined) {
		return "undefined";
	}

	if (typeof ast === "string") {
		return showEscapes ? slash(`"${ast}"`) : ast;
		// Pretty: return prettyPrint ? JSON.stringify(ast, null, "\t") : `"${ast}"`;
	}

	if (typeof ast === "boolean" || typeof ast === "number") {
		return String(ast);
	}

	if (typeof ast === "symbol") {
		let key = Symbol.keyFor(ast);
		if (key === undefined) {
			if (keyBySymbol.has(ast)) {
				key = keyBySymbol.get(ast);
			} else {
				throw new Error(`Missing key for symbol ${String(ast)}`);
			}
		}

		return `Symbol.for("${key}")`;
	}

	if (typeof ast === "function") {
		return ast.name ?? String(ast);
	}

	if (Array.isArray(ast)) {
		return `[${ast.map(x => stringify(x)).join(", ")}]`;
	}

	if (typeof ast === "object" && ast.constructor === Object) {
		const entries = [];
		for (const [k, v] of Object.entries(ast)) {
			entries.push(`${k}: ${stringify(v)}`);
		}

		return `{${entries.join(", ")}}`;
	}

	throw new Error(`unmatched ast ${JSON.stringify(ast)}`);
}

/**
 * Adds escapes to \, ", and \n.
 * @param {string} string
 * @returns string
 */
export function slash(string) {
	return string
		.replaceAll("\\", "\\\\") // Replace backslashes with double backslashes.
		.replaceAll("\"", "\"") // Prefix quotes with a backslash.
		.replaceAll("\n", "\\n"); // Replace newlines with backslash + 'n'.
}

/**
 * Equivalent to `str` with `showEscapes = false`
 * @param {...*[]} values
 * @returns string
 */
export function toString(...values) {
	return values.map(value => stringify(value, false)).join("");
}

/**
 * Equivalent to `pr-str`
 * @param {...*[]} values
 * @returns string
 */
export function toEscaped(...values) {
	return values.map(value => stringify(value, true)).join(", ");
}

/**
 * Equivalent to `prn`
 * @param {...*[]} values
 * @returns null
 */
export function logEscaped(...values) {
	const result = values.map(value => stringify(value, true)).join(", ");
	console.log(result);
	return null;
}

/**
 * Equivalent to `println`
 * @param {...*[]} values
 * @returns string
 */
export function logString(...values) {
	const result = values.map(value => stringify(value, false)).join(" "); // Was ", "
	console.log(result);
	return null;
}

/**
 * Default console.log
 * @param  {...any[]} parameters
 */
export function debug(...parameters) {
	console.log(...parameters);
	return parameters;
}

// MARK: ERRORS

/**
 * @param {string} [m]
 * @returns {never}
 * @throws {Error}
 */
export function throwError(m) {
	throw new Error(isString(m) ? m : undefined);
}

// MARK: TYPES

/**
 * @param {*} a
 * @returns {a is *[]}
 */
export function isArray(a) {
	return Array.isArray(a);
}

/**
 * @param {*} a
 * @returns {a is number}
 */
export function isNumber(a) {
	return typeof a === "number";
}

/**
 * @param {*} a
 * @returns {a is string}
 */
export function isString(a) {
	return typeof a === "string";
}

/**
 * @param {*} a
 * @returns {a is symbol}
 */
export function isSymbol(a) {
	return typeof a === "symbol";
}

/**
 * @param {*} a
 * @returns {a is Function}
 */
export function isFunction(a) {
	return typeof a === "function";
}

/**
 * @param {*} a
 * @returns {a is Object}
 */
export function isObject(a) {
	return a !== null && typeof a === "object" && a.constructor === Object;
}

/**
 * @param {*} a
 * @returns {a is undefined}
 */
export function isUndefined(a) {
	return a === undefined;
}

/**
 * @param {*} a
 * @returns {a is null}
 */
export function isNull(a) {
	return a === null;
}

/**
 * @param {*} a
 * @returns {a is boolean}
 */
export function isBoolean(a) {
	return typeof a === "boolean";
}

/**
 * @param {*} a
 * @returns {a is true}
 */
export function isTrue(a) {
	return a === true;
}

/**
 * @param {*} a
 * @returns {a is false}
 */
export function isFalse(a) {
	return a === false;
}

// MARK: EQUALITY

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
 * @returns {number}
 * @throws {TypeError}
 */
export function increment(a) {
	if (typeof a !== "number") {
		throw new TypeError("not a number");
	}

	return a + 1;
}

/**
 * @param {number} a
 * @returns {number}
 * @throws {TypeError}
 */
export function decrement(a) {
	if (typeof a !== "number") {
		throw new TypeError("not a number");
	}

	return a - 1;
}

// MARK: FACTORIES

/**
 * @deprecated
 * @param {Function} f
 * @returns {Function}
 */
export function lambda(f) {
	if (isFunction(f)) {
		return (/** @type {*[]} */ ...parameters) => f(...parameters);
	}

	throw new TypeError("not a function");
}

/**
 * Create a symbol
 * @param {string} key
 * @returns {symbol}
 */
export const symbol = Symbol.for;

/**
 * @param {...*} a
 * @returns {*[]}
 */
export function array(...a) {
	return a;
}

// MARK: LISTS

/**
 * @param {*[]|string} a
 * @returns {boolean}
 */
export function isEmpty(a) {
	return (isArray(a) || isString(a)) && a.length === 0;
}

/**
 * @param {*[]|string} a
 * @returns {number}
 */
export function length(a) {
	return (isArray(a) || isString(a) ? a.length : 0);
}

/**
 * @param {*[]} a - The array to check for element n.
 * @param {number} n - The nth item to get in the array (zero based)
 * @returns {*}
 */
export function at(a, n) {
	if (!isArray(a)) {
		throw new TypeError("at requires an array");
	}

	return a.at(n);
}

// MARK: OBJECTS

/**
 * @param {Object} o
 * @param {string} k
 * @returns {boolean}
 */
export function hasOwn(o, k) {
	if (isObject(o)) {
		return Object.hasOwn(o, k);
	}

	throw new TypeError("not an object");
}

/**
 * @param {Object} o
 * @returns {*[]}
 * @throws {Error}
 */
export function entries(o) {
	if (isObject(o)) {
		return Object.entries(o);
	}

	throw new TypeError("not an object");
}

/**
 * Return a unix timestamp.
 * @returns A high-resolution timestamp.
 */
export function now() {
	return performance.timeOrigin + performance.now();
}

/**
 * Get deeply nested properties
 *
 * @example
 * ```js
 * const nestedObj = {value: {value: {value: {value: "foo"}}}};
 * const nestedVal = getIn(nestedObj, "value", "value", "value", "value");
 * ```
 * @param {*} object
 * @param  {...any} keys
 * @returns {*|undefined}
 */
export function getIn(object, ...keys) {
	return keys.reduce((nestedValue, key) => {
		if (nestedValue && typeof nestedValue === "object" && key in nestedValue) {
			return nestedValue[key];
		}

		return undefined;
	}, object);
}

/**
 * @param {string} tag
 * @returns {(...args: *[]) => string}
 */
export function htmlTag(tag) {
	return (...element) => {
		let attributes = "";
		let children = "";

		if (element) {
			if (Array.isArray(element[0])) {
				children = element[0].join("");
			} else if (typeof element[0] === "string") {
				children = element[0];
			} else if (typeof element[0] === "object" && element[0] !== null) {
				for (const [key, value] of Object.entries(element[0])) {
					attributes += ` ${key}="${value}"`;
				}

				if (Array.isArray(element[1])) {
					children = element[1].join("");
				} else if (typeof element[1] === "string") {
					children = element[1];
				}
			}
		}

		// Self-closing tags
		const selfClosingTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
		if (selfClosingTags.has(tag)) {
			return `<${tag}${attributes} />`;
		}

		// Return the complete HTML string
		return `<${tag}${attributes}>${children}</${tag}>`;
	};
}

/**
 * @param {...*[]} _rules
 * @returns *
 */
export function stylesheet(_rules) {
	return "";
}

/**
 *
 * @param {string} _property
 * @returns {(value: *) => *}
 */
export function cssProperty(_property) {
	return _value => "";
}

// MARK: FORM SYMBOLS
const appSymbols = [
	"global",
	"let",
	"const",
	"do",
	"if",
	"function",
];

for (const form of appSymbols) {
	$[form] = Symbol(form);
	keyBySymbol.set($[form], form);
}

// MARK: CORE NS
/**
 * @type {[string, (() => *) | ((a: *) => *) | ((a: *, b: *) => *)][]}
 */
const coreFunctions = [
	["throw", throwError],
	["isArray", isArray],
	["isNumber", isNumber],
	["isString", isString],
	["isSymbol", isSymbol],
	["isFunction", isFunction],
	["isObject", isObject],
	["isUndefined", isUndefined],
	["isNull", isNull],
	["debug", debug],
	["toString", toString],
	["toEscaped", toEscaped],
	["logString", logString],
	["logEscaped", logEscaped],
	["array", array],
	["isEmpty", isEmpty],
	["length", length],
	["at", at],
	["getIn", getIn],
	["lessThan", lessThan],
	["lessThanOrEqual", lessThanOrEqual],
	["greaterThan", greaterThan],
	["greaterThanOrEqual", greaterThanOrEqual],
	["equals", equals],
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
	["now", now],
	["and", and],
	["or", or],
	["not", not],
	["increment", increment],
	["decrement", decrement],
	["stylesheet", stylesheet],
];

for (const [key, coreFunction] of coreFunctions) {
	$[key] = Symbol(key);
	ns.set($[key], coreFunction);
	keyBySymbol.set($[key], key);
}

// MARK: HTML NS

const htmlTags = [
	// =========================================================================
	// MARK: HTML NAMESPACE
	"a",
	"abbr",
	"address",
	"area",
	"article",
	"aside",
	"audio",
	"b",
	"base",
	"bdi",
	"bdo",
	"blockquote",
	"body",
	"br",
	"button",
	"canvas",
	"caption",
	"cite",
	"code",
	"col",
	"colgroup",
	"data",
	"datalist",
	"dd",
	"del",
	"details",
	"dfn",
	"dialog",
	"div",
	"dl",
	"doctype",
	"dt",
	"em",
	"embed",
	"fieldset",
	"figcaption",
	"figure",
	"footer",
	"form",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"head",
	"header",
	"hgroup",
	"hr",
	"html",
	"i",
	"iframe",
	"img",
	"imgMap",
	"input",
	"kbd",
	"label",
	"legend",
	"li",
	"link",
	"main",
	"mark",
	"menu",
	"meter",
	"meta",
	"nav",
	"noscript",
	"object",
	"ol",
	"optgroup",
	"option",
	"output",
	"p",
	"picture",
	"pre",
	"portal",
	"progress",
	"q",
	"rp",
	"rt",
	"ruby",
	"s",
	"samp",
	"script",
	"search",
	"section",
	"select",
	"slot",
	"small",
	"source",
	"span",
	"strong",
	"style",
	"sub",
	"summary",
	"sup",
	"table",
	"tbody",
	"td",
	"template",
	"textarea",
	"tfoot",
	"th",
	"thead",
	"time",
	"title",
	"tr",
	"track",
	"u",
	"ul",
	"var",
	"video",
	"wbr",
];

for (const tag of htmlTags) {
	$[tag] = Symbol(tag);
	ns.set($[tag], htmlTag(tag));
	keyBySymbol.set($[tag], tag);
}

// MARK: CSS NS

const cssProperties = [
	// =========================================================================
	// MARK: CSS NAMESPACE
	"accentColor",
	"alignContent",
	"alignItems",
	"alignSelf",
	"all",
	"anchorName",
	"animation",
	"animationComposition",
	"animationDelay",
	"animationDirection",
	"animationDuration",
	"animationFillMode",
	"animationIterationCount",
	"animationName",
	"animationPlayState",
	"animationTimingFunction",
	"appearance",
	"aspectRatio",
	"backdropFilter",
	"backfaceVisibility",
	"background",
	"backgroundAttachment",
	"backgroundBlendMode",
	"backgroundClip",
	"backgroundColor",
	"backgroundImage",
	"backgroundOrigin",
	"backgroundPosition",
	"backgroundPositionX",
	"backgroundPositionY",
	"backgroundRepeat",
	"backgroundSize",
	"blockSize",
	"baselineShift",
	"blockStep",
	"blockStepAlign",
	"blockStepInsert",
	"blockStepRound",
	"blockStepSize",
	"bookmarkLabel",
	"bookmarkLevel",
	"bookmarkState",
	"border",
	"borderBlock",
	"borderBlockColor",
	"borderBlockEnd",
	"borderBlockEndColor",
	"borderBlockEndStyle",
	"borderBlockEndWidth",
	"borderBlockStart",
	"borderBlockStartColor",
	"borderBlockStartStyle",
	"borderBlockStartWidth",
	"borderBlockStyle",
	"borderBlockWidth",
	"borderBottom",
	"borderBottomColor",
	"borderBottomLeftRadius",
	"borderBottomRightRadius",
	"borderBottomStyle",
	"borderBottomWidth",
	"borderBoundary",
	"borderCollapse",
	"borderColor",
	"borderImage",
	"borderImageOutset",
	"borderImageRepeat",
	"borderImageSlice",
	"borderImageSource",
	"borderImageWidth",
	"borderInline",
	"borderInlineColor",
	"borderInlineEnd",
	"borderInlineEndColor",
	"borderInlineEndStyle",
	"borderInlineEndWidth",
	"borderInlineStart",
	"borderInlineStartColor",
	"borderInlineStartStyle",
	"borderInlineStartWidth",
	"borderInlineStyle",
	"borderInlineWidth",
	"borderLeft",
	"borderLeftColor",
	"borderLeftStyle",
	"borderLeftWidth",
	"borderRadius",
	"borderRight",
	"borderRightColor",
	"borderRightStyle",
	"borderRightWidth",
	"borderSpacing",
	"borderStartEndRadius",
	"borderStartStartRadius",
	"borderStyle",
	"borderTop",
	"borderTopColor",
	"borderTopLeftRadius",
	"borderTopRightRadius",
	"borderTopStyle",
	"borderTopWidth",
	"borderWidth",
	"bottom",
	"boxDecorationBreak",
	"boxShadow",
	"boxSizing",
	"boxSnap",
	"breakAfter",
	"breakBefore",
	"breakInside",
	"captionSide",
	"caret",
	"caretAnimation",
	"caretColor",
	"caretShape",
	"chains",
	"clear",
	"clipPath",
	"clipRule",
	"color",
	"colorAdjust",
	"colorInterpolation",
	"colorInterpolationFilters",
	"colorScheme",
	"columnCount",
	"columnFill",
	"columnGap",
	"columnRule",
	"columnRuleColor",
	"columnRuleStyle",
	"columnRuleWidth",
	"columnSpan",
	"columnWidth",
	"columns",
	"contain",
	"containIntrinsicBlockSize",
	"containIntrinsicHeight",
	"containIntrinsicInlineSize",
	"containIntrinsicSize",
	"containIntrinsicWidth",
	"container",
	"containerName",
	"containerType",
	"content",
	"contentVisibility",
	"counterIncrement",
	"counterReset",
	"counterSet",
	"cue",
	"cueAfter",
	"cueBefore",
	"cursor",
	"direction",
	"display",
	"dominantBaseline",
	"elevation",
	"emptyCells",
	"filter",
	"flex",
	"flexBasis",
	"flexDirection",
	"flexFlow",
	"flexGrow",
	"flexShrink",
	"flexWrap",
	"float",
	"floatDefer",
	"floatOffset",
	"floatReference",
	"floodColor",
	"floodOpacity",
	"flow",
	"flowFrom",
	"flowInto",
	"font",
	"fontFamily",
	"fontFeatureSettings",
	"fontKerning",
	"fontLanguageOverride",
	"fontOpticalSizing",
	"fontPalette",
	"fontSize",
	"fontSizeAdjust",
	"fontStretch",
	"fontStyle",
	"fontSynthesis",
	"fontSynthesisSmallCaps",
	"fontSynthesisStyle",
	"fontSynthesisWeight",
	"fontVariant",
	"fontVariantAlternates",
	"fontVariantCaps",
	"fontVariantEastAsian",
	"fontVariantLigatures",
	"fontVariantNumeric",
	"fontVariantPosition",
	"fontVariationSettings",
	"fontWeight",
	"forcedColorAdjust",
	"footnoteDisplay",
	"footnotePolicy",
	"glyphOrientationVertical",
	"gap",
	"grid",
	"gridArea",
	"gridAutoColumns",
	"gridAutoFlow",
	"gridAutoRows",
	"gridColumn",
	"gridColumnEnd",
	"gridColumnGap",
	"gridColumnStart",
	"gridGap",
	"gridRow",
	"gridRowEnd",
	"gridRowGap",
	"gridRowStart",
	"gridTemplate",
	"gridTemplateAreas",
	"gridTemplateColumns",
	"gridTemplateRows",
	"hangingPunctuation",
	"height",
	"hyphenateCharacter",
	"hyphenateLimitChars",
	"hyphenateLimitLast",
	"hyphenateLimitLines",
	"hyphenateLimitZone",
	"hyphens",
	"imageOrientation",
	"imageRendering",
	"imageResolution",
	"initialLetter",
	"initialLetterAlign",
	"initialLetterWrap",
	"inlineSize",
	"inset",
	"insetBlock",
	"insetBlockEnd",
	"insetBlockStart",
	"insetInline",
	"insetInlineEnd",
	"insetInlineStart",
	"isolation",
	"justifyContent",
	"justifyItems",
	"justifySelf",
	"left",
	"letterSpacing",
	"lightingColor",
	"lineBreak",
	"lineGrid",
	"lineHeight",
	"lineHeightStep",
	"lineSnap",
	"listStyle",
	"listStyleImage",
	"listStylePosition",
	"listStyleType",
	"margin",
	"marginBlock",
	"marginBlockEnd",
	"marginBlockStart",
	"marginBottom",
	"marginInline",
	"marginInlineEnd",
	"marginInlineStart",
	"marginLeft",
	"marginRight",
	"marginTop",
	"marker",
	"markerEnd",
	"markerKnockoutLeft",
	"markerKnockoutRight",
	"markerMid",
	"markerPattern",
	"markerSegment",
	"markerSide",
	"markerStart",
	"marqueeDirection",
	"marqueeLoop",
	"marqueeSpeed",
	"marqueeStyle",
	"mask",
	"maskBorder",
	"maskBorderMode",
	"maskBorderOutset",
	"maskBorderRepeat",
	"maskBorderSlice",
	"maskBorderSource",
	"maskBorderWidth",
	"maskClip",
	"maskComposite",
	"maskImage",
	"maskMode",
	"maskOrigin",
	"maskPosition",
	"maskRepeat",
	"maskSize",
	"maskType",
	"mathDepth",
	"mathStyle",
	"maxBlockSize",
	"maxHeight",
	"maxLines",
	"maxWidth",
	"minBlockSize",
	"minHeight",
	"minInlineSize",
	"minWidth",
	"mixBlendMode",
	"motion",
	"motionOffset",
	"motionPath",
	"motionRotation",
	"navDown",
	"navLeft",
	"navRight",
	"navUp",
	"objectFit",
	"objectPosition",
	"offset",
	"offsetAfter",
	"offsetAnchor",
	"offsetBefore",
	"offsetDistance",
	"offsetEnd",
	"offsetPath",
	"offsetPosition",
	"offsetRotate",
	"offsetStart",
	"opacity",
	"order",
	"orphans",
	"outline",
	"outlineColor",
	"outlineOffset",
	"outlineStyle",
	"outlineWidth",
	"overflow",
	"overflowAnchor",
	"overflowClipMargin",
	"overflowStyle",
	"overflowWrap",
	"overflowX",
	"overflowY",
	"overscroll",
	"overscrollBehaviorBlock",
	"overscrollBehaviorInline",
	"overscrollBehaviorX",
	"overscrollBehaviorY",
	"padding",
	"paddingBlock",
	"paddingBlockEnd",
	"paddingBlockStart",
	"paddingBottom",
	"paddingInline",
	"paddingInlineEnd",
	"paddingInlineStart",
	"paddingLeft",
	"paddingRight",
	"paddingTop",
	"page",
	"pageBreakAfter",
	"pageBreakBefore",
	"pageBreakInside",
	"pause",
	"pauseAfter",
	"pauseBefore",
	"paintOrder",
	"perspective",
	"perspectiveOrigin",
	"pitch",
	"pitchRange",
	"placeContent",
	"placeItems",
	"placeSelf",
	"pointerEvents",
	"playDuring",
	"position",
	"presentationLevel",
	"quotes",
	"regionFragment",
	"resize",
	"rest",
	"restAfter",
	"restBefore",
	"richness",
	"right",
	"rotate",
	"rotationPoint",
	"rowGap",
	"rubyAlign",
	"rubyMerge",
	"rubyPosition",
	"running",
	"scale",
	"scrollBehavior",
	"scrollMargin",
	"scrollMarginBlock",
	"scrollMarginBlockEnd",
	"scrollMarginBlockStart",
	"scrollMarginBottom",
	"scrollMarginInline",
	"scrollMarginInlineEnd",
	"scrollMarginInlineStart",
	"scrollMarginLeft",
	"scrollMarginRight",
	"scrollMarginTop",
	"scrollPadding",
	"scrollPaddingBlock",
	"scrollPaddingBlockEnd",
	"scrollPaddingBlockStart",
	"scrollPaddingBottom",
	"scrollPaddingInline",
	"scrollPaddingInlineEnd",
	"scrollPaddingInlineStart",
	"scrollPaddingLeft",
	"scrollPaddingRight",
	"scrollPaddingTop",
	"scrollSnapAlign",
	"scrollSnapStop",
	"scrollSnapType",
	"scrollbarColor",
	"scrollbarGutter",
	"scrollbarWidth",
	"shapeImageThreshold",
	"shapeInside",
	"shapeMargin",
	"shapeOutside",
	"size",
	"speak",
	"speakAs",
	"speakHeader",
	"speakNumeral",
	"speakPunctuation",
	"speechRate",
	"stress",
	"stringSet",
	"stroke",
	"strokeAlignment",
	"strokeDashadjust",
	"strokeDasharray",
	"strokeDashcorner",
	"strokeDashoffset",
	"strokeLinecap",
	"strokeLinejoin",
	"strokeMiterlimit",
	"strokeOpacity",
	"strokeWidth",
	"tabSize",
	"tableLayout",
	"textAlign",
	"textAlignAll",
	"textAlignLast",
	"textCombineUpright",
	"textDecoration",
	"textDecorationColor",
	"textDecorationLine",
	"textDecorationSkip",
	"textDecorationStyle",
	"textDecorationThickness",
	"textEmphasis",
	"textEmphasisColor",
	"textEmphasisPosition",
	"textEmphasisStyle",
	"textIndent",
	"textJustify",
	"textOrientation",
	"textOverflow",
	"textRendering",
	"textShadow",
	"textSpaceCollapse",
	"textSpaceTrim",
	"textSpacing",
	"textTransform",
	"textUnderlineOffset",
	"textUnderlinePosition",
	"textWrap",
	"top",
	"touchAction",
	"transform",
	"transformBox",
	"transformOrigin",
	"transformStyle",
	"transition",
	"transitionBehavior",
	"transitionDelay",
	"transitionDuration",
	"transitionProperty",
	"transitionTimingFunction",
	"translate",
	"unicodeBidi",
	"userSelect",
	"verticalAlign",
	"visibility",
	"voiceBalance",
	"voiceDuration",
	"voiceFamily",
	"voicePitch",
	"voiceRange",
	"voiceRate",
	"voiceStress",
	"voiceVolume",
	"volume",
	"whiteSpace",
	"whiteSpaceCollapse",
	"widows",
	"width",
	"willChange",
	"wordBreak",
	"wordSpacing",
	"wordWrap",
	"wrapAfter",
	"wrapBefore",
	"wrapFlow",
	"wrapInside",
	"wrapThrough",
	"writingMode",
	"zIndex",
	"zoom",
];

for (const property of cssProperties) {
	$[property] = Symbol(property);
	ns.set($[property], cssProperty(property));
	keyBySymbol.set($[property], property);
}
