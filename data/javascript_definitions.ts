/**
 * @file
 * This file defines various TypeScript types and enums for parameter and definition types,
 * as well as functions to inherit and define built-in properties and methods for JavaScript objects.
 */

// MARK: TYPES

/** Lists various types that can be used as parameters in function definitions */
export enum ParameterType {
  AggregateError, // = 'ErrorNode', // 'AggregateError',
  Any, // = 'AstNode', // => 'any',
  AnyArray, // = 'VectorNode<AstNode>', // => 'any[]',
  ApplyTargetFunction, // = 'FunctionNode(this: Astnode, ...args: VectorNode<AstNode>) => AstNode',
  ArrayBuffer, // = 'VectorNode<NumberNode>',
  ArrayBufferLike, // = 'VectorNode<NumberNode>',
  ArrayLikeNumberOrArrayBuffer, // = 'VectorNode<NumberNode>', // 'ArrayLike<Num> | ArrayBuffer',
  ArrayLikeNumeric, // = 'VectorNode<NumberNode>', // 'ArrayLike<Num>',
  ArrayLikeT, // = 'VectorNode<AstNode>', // 'ArrayLike<T>',
  ArrayMapCallbackFunction, // = 'FunctionNode => AstNode', // '(T, number, T[]) => U', // map
  BigInt, // = 'NumberNode', // 'bigint',
  BigInt64Array, // = 'VectorNode<NumberNode>',
  BigIntOrBooleanOrNumberOrString, // = 'NumberNode | BooleanNode | StringNode', // 'bigint | boolean | number | string' - Assuming NumberNode can handle bigint internally
  BigUint64Array, // = 'VectorNode<NumberNode>',
  Boolean, // = 'BooleanNode', // 'boolean',
  CleanupCallback, // = 'FunctionNode(heldValue: AstNode) => NilNode', // 'cleanupCallback',
  Collator, // = 'Atom<Collator>', // 'Collator',
  CollatorOptions, // = 'MapNode<StringNode, StringNode | BooleanNode | NilNode>', // interface CollatorOptions { usage?: string | undefined; localeMatcher?: string; numeric?: boolean | undefined; caseFirst?: string | undefined; sensitivity?: string | undefined; ignorePunctuation?: boolean; collation?: boolean | undefined; }
  CompareFunction, // = '(FunctionNode(a: AstNode, b: AstNode) => NumberNode) | NilNode', // (a: T, b: T) => number
  ConstructorFunction, // = 'AstNode', // Constructor Function - Function specifies that a constructor function is expected.
  ConstructTargetFunction, // = 'AtomNode(Function)', // new (...args: A) => R (constructor function to invoke)
  DataView, // = 'Atom<DataView>', // TODO: allow atom to take any native object?
  Date, // = 'NumberNode', // TODO: Does Date need to be AtomNode<Date> or is NumberNode fine?
  DateOrNumber, // = 'NumberNode', // Date | number
  DateOrNumberOrBigInt, // = 'NumberNode', // 'Date | number | bigint', - Assuming NumberNode can handle dates and bigint internally
  DateTimeFormat, // = 'Atom<DateTimeFormat>', // 'DateTimeFormat',
  DateTimeFormatOptions, // = 'MapNode<StringNode, AstNode>', // 'Intl.DateTimeFormatOptions',
  DateTimeFormatPartArray, // = 'VectorNode<MapNode<StringNode, StringNode>>', // interface DateTimeFormatPart { type: string; value: string | number; }
  DateTimeRangeFormatPartArray, // = 'VectorNode<MapNode<StringNode, StringNode>>', // interface DateTimeRangeFormatPart { type: string; value: string | number; }
  DisplayNames, // = 'Atom<DisplayNames>', // 'DisplayNames',
  DisplayNamesOptions, // = 'MapNode<StringNode, StringNode>',
  Error, // = 'ErrorNode', // 'Error',
  EvalError, // = 'ErrorNode', // 'EvalError',
  Float32Array, // = 'VectorNode<NumberNode>',
  Float64Array, // = 'VectorNode<NumberNode>',
  ForEachCallbackFunction, // = 'FunctionNode(value: AstNode, index: NumberNode, array: VectorNode<AstNode>) => NilNode', // Handles type: `(value: T, index: number, array: T[]) => void`
  FunctionBuiltin, // = 'FunctionNode', // 'Function',
  Function, // = 'AstNode', // Function represents the base of all types (not a literal function)
  FunctionAwaitedTU, // = 'FunctionNode => AstNode', // Return '(v: T) => U',
  FunctionTNumberU, // = 'FunctionNode(v: AstNode, k: NumberNode) => AstNode)', // '(v: T, k: number) => U',
  GenericReduceCallbackFunction, // = 'FunctionNode(previousValue: AstNode, currentValue: AstNode, currentIndex: NumberNode, array: VectorNode<AstNode>)=>AstNode', // Handles type: `(previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T`
  Int16Array, // = 'VectorNode<NumberNode>',
  Int32Array, // = 'VectorNode<NumberNode>',
  Int8Arr, // = 'NumberNode[]', // 'Int8Array',
  Int8Array, // = 'VectorNode<NumberNode>',
  IterableAny, // = 'VectorNode<AstNode>', // Iterable<readonly any[]>
  IterableIteratorK, // = 'VectorNode<AstNode>', // 'IterableIterator<K>',
  IterableIteratorKV, // = 'VectorNode<[AstNode, AstNode]>', // 'IterableIterator<[K, V]>',
  IterableIteratorKVOrNull, // = 'VectorNode<[AstNode, AstNode]> | NilNode',
  IterableIteratorNumber, // = 'VectorNode<AstNode>', // 'IterableIterator<number>', // basically number[]
  IterableIteratorNumberNumber, // = 'VectorNode<VectorNode<[NumberNode, NumberNode]>>', // 'IterableIterator<[number, number]>', // basically [number, number][]
  IterableIteratorNumberT, // = 'Vector<[NumberNode, AstNode]>[]', // 'IterableIterator<[number, T]>', // basically [number, T][]
  IterableIteratorString, // = 'VectorNode<StringNode>', // 'IterableIterator<string>',
  IterableIteratorT, // = 'VectorNode<AstNode>', // 'IterableIterator<T>', // basically T[]
  IterableIteratorTT, // = 'VectorNode<MapNode<AstNode, AstNode>>', // 'IterableIterator<[T, T]>',
  IterableIteratorV, // = 'VectorNode<AstNode>', // 'IterableIterator<V>',
  IterableKV, // = 'VectorNode<VectorNode<[StringNode | SymbolNode | NumberNode, AstNode]>>', // Iterable<readonly [PropertyKey, T]>)>
  IterableNumber, // = 'VectorNode<NumberNode>', // Iterable<number>
  IterableOrArrayLike, // = 'VectorNode', // AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>> - Async placeholder, use non-async equivalents until async is supported by the language.
  IterableT, // = 'VectorNode<AstNode>', // 'Iterable<T>',
  IterableTOrNull, // = 'VectorNode<AstNode> | NilNode', // Iterable<T> | null
  IterableTOrPromiseLikeT, // = 'VectorNode<AstNode>', // 'Iterable<T> | PromiseLike<T>',
  KeySelectorFunction, // = 'FunctionNode(item: AstNode, index: NumberNode) => StringNode | SymbolNode | NumberNode', // groupBy<K extends PropertyKey, T>( items: Iterable<T>, keySelector: (item: T, index: number) => K): Partial<Record<K, T[]>>;
  KeyValuePairsOrNull, // = 'VectorNode<MapNode<AstNode, AstNode>> | NilNode', // new <K, V>(entries?: readonly (readonly [K, V])[] | null): Map<K, V>;
  KeyValueTArray, // = 'VectorNode<[StringNode, AstNode]>', // [string, T][],
  ListFormat, // = 'Atom<Intl.ListFormat>', // 'ListFormat',
  ListFormatOptions, // = 'MapNode<StringNode, StringNode>',
  ListFormatPartArray, // = 'VectorNode<MapNode<StringNode, StringNode>>', // interface ListFormatPart { type: string; value: string; }
  Locale, // = 'Atom<Intl.Locale>', // 'Locale',
  LocaleOptions, // = 'MapNode<StringNode, StringNode>',
  LocalesArgument, // = 'StringNode | NilNode', // type LocalesArgument = | UnicodeBCP47LocaleIdentifier | Locale | readonly (UnicodeBCP47LocaleIdentifier | Locale)[] | undefined;
  Map, // = 'MapNode<AstNode, AstNode>',
  MapForEachCallbackFunction, // = 'FunctionNode(value: AstNode, key: AstNode, map: MapNode<AstNode, AstNode>) => NilNode', // forEach(callbackfn: (value: V, key: K, map: ReadonlyMap<K, V>) => void, thisArg?: any): void;
  NaN, // = 'NumberNode', // 'number',
  Null, // = 'NilNode', // 'null',
  NumArr, // = 'NumberNode[]', // 'number[]',
  Number, // = 'NumberNode', //'number',
  NumberArray, // = 'VectorNode<NumberNode>',
  NumberFormat, // = 'Atom<NumberFormat>', // 'NumberFormat',
  NumberFormatOptions, // = 'MapNode<StringNode, AstNode>', // NumberFormatOptions simplifies to: 'Record<string, string|object|number|undefined>',
  NumberFormatPartArray, // = 'VectorNode<MapNode<StringNode, StringNode>>', // interface NumberFormatPart { type: string; value: string; }
  NumberOrString, // = 'NumberNode | StringNode',
  NumberOrUndefined, // = 'NumberNode | NilNode', // 'number | undefined',
  NumericCompareFunction, // = 'FunctionNode(a: NumberNode, b: NumberNode) => NumberNode', // '(a: T, b: T) => number',
  NumericForEachCallbackFunction, // = 'FunctionNode(value: NumberNode, index: NumberNode, array: VectorNode<NumberNode>) => NilNode', // Handles type: `(value: T, index: number, array: T[]) => void`
  NumericFromMapFunction, // = 'FunctionNode(v: NumberNode, k: NumberNode) => NumberNode', // '(v: T, k: number) => number',
  NumericPredicateFunction, // = 'FunctionNode(value: NumberNode, number: NumberNode, array: VectorNode<NumberNode>) => AstNode', // Handles type: `(value: T, index: number, array: T[]) => unknown`
  NumericReduceCallbackFunction, // = 'FunctionNode(previousValue: NumberNode, currentValue: NumberNode, currentIndex: NumberNode, array: Vector) => AstNode', // (previousValue: U, currentValue: number, currentIndex: number, array: Int16Array) => U
  ObjBoolStr, // = 'MapNode<StringNode, BooleanNode | StringNode>', // { async: false, value: 'not-equal'}
  Object, // = 'AstNode', // 'object', // The global Object, basically 'any' in this context
  ObjectOrNull, // = 'AstNode | NilNode', // 'object | null',
  OptFunTNumNum, // = 'FunctionNode | NilNode', // 'opt?: (v: T, k: number) => number',
  OptionalAny, // = 'AstNode | NilNode', // 'opt?: any',
  OptionalAnyArray, // = 'VectorNode<AstNode> | NilNode', // 'opt?: any[]',
  OptionalBoolean, // = 'BooleanNode | NilNode', // 'opt?: boolean',
  OptionalConstructTargetFunction, // = 'newTarget?: AtomNode(Function)', // new (...args: A) => R (constructor function to invoke)
  OptionalNumber, // = 'NumberNode | NilNode', // 'opt?: number',
  OptionalNumberFormatOptions, // = 'opt?: MapNode<StringNode, StringNode | NilNode>', // 'OptionalNumberFormatOptions',
  OptionalNumberWithInitializer1, // = 'NumberNode(value = 1) | NilNode', // 'opt: number = 1',
  OptionalNumericFromMapFunction, // = 'maptfn?: FunctionNode(v: NumberNode, k: NumberNode) => NumberNode | NilNode',
  OptionalString, // = 'StringNode | NilNode', // 'opt?: string',
  OptionalT, // = 'AstNode | NilNode', // 'opt?: T',
  OptionalUnknown, // = 'AstNode | NilNode', // 'opt?: unknown',
  OptionalWeakKey, // = 'opt?: SymbolNode | AstNode', // 'opt?: WeakKey',
  OptRecStrNumBool, // = 'Map<StringNode, StringNode | NumberNode | BooleanNode> | NilNode', // 'opt?: Record<string, string | number | boolean>',
  OptThis, // = 'AstNode | NilNode', // 'opt?: this',
  PlainObject, // = 'MapNode<StringNode | SymbolNode | NumberNode, AstNode>', // { [s: string]: T },
  PlainObjectTOrArrayLikeT, // = 'MapNode<StringNode, AstNode> | VectorNode<AstNode>', // { [s: string]: T } | ArrayLike<T>),
  PlainObjectWithTArrayValues, // = 'VectorNode<VectorNode<[StringNode | SymbolNode | NumberNode, VectorNode<AstNode>]>>', // Partial<Record<K, T[]>>
  PluralRules, // = 'Atom<PluralRules>', // 'PluralRules',
  PluralRulesOptions, // = 'MapNode<StringNode, StringNode | NumberNode | NilNode>',
  PredicateFunction, // = 'FunctionNode(value: AstNode, number: NumberNode, array: VectorNode<AstNode>) => AstNode', // Handles type: `(value: T, index: number, array: T[]) => unknown`
  PromiseAwaitedT, // = 'AstNode', // 'Promise<Awaited<T>>',
  PromiseAwaitedUArray, // = 'VectorNode<AstNode>', // Promise<Awaited<U>[]> - Async placeholder, use non-async equivalents until async is supported by the language.
  PromiseExecutorFunction, // = 'FunctionNode, //(resolve: (FunctionNode(value: AstNode) =>  NilNode), reject: (FunctionNode(reason: AstNode) => NilNode) | (FunctionNode() => NilNode) => NilNode', // new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
  PromiseFinallyCallback, // = '(FunctionNode() => NilNode) | NilNode', // 'onfinally?: (() => void) | null',
  PromiseFulfilledCallback, // = 'FunctionNode(value: AstNode) =>  AstNode', // ((value: T) => TResult | PromiseLike<TResult1>) | undefined | null
  PromiseMap, // = 'MapNode<StringNode, AstNode>', // Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }
  PromiseRejectedCallback, // = 'FunctionNode(reason: AstNode) => AstNode', // ((reason: any) => TResult | PromiseLike<TResult2>) | undefined | null
  PromiseT, // = 'AstNode', // 'Promise<T>',
  PromiseTArray, // = 'Vector<AstNode>', // 'Promise<T[]>', - Async placeholder, use non-async equivalents until async is supported by the language.
  PropertyDescriptor, // = 'MapNode<StringNode, BooleanNode | AstNode | FunctionNode>',
  PropertyDescriptorMap, // = 'MapNode<StringNode | SymbolNode | NumberNode, MapNode<StringNode, BooleanNode | AstNode | FunctionNode>>', //   // interface PropertyDescriptor {configurable?: boolean; enumerable?: boolean; value?: any; writable?: boolean; get?(): any; set?(v: any): void;}
  PropertyDescriptorOrUndefined, // = 'MapNode<StringNode, BooleanNode | AstNode | FunctionNode> | NilNode',
  RangeError, // = 'ErrorNode', // 'RangeError',
  RecStrBool, // = 'MapNode<StringNode, BooleanNode>', // 'Record<string, boolean>',
  ReferenceError, // = 'ErrorNode', // 'ReferenceError',
  RegExp, // = 'AtomNode<RegExp>',
  RegExpExecArray, // = 'MapNode<string, MapNode<string, string>>', // interface RegExpExecArray { groups?: {[key: string]: string;};}
  RegExpMatchArray, // = 'MapNode<string, MapNode<string, string>>', // interface RegExpMatchArray { groups?: {[key: string]: string;};}
  RegExpMatchArrayOrNull, // = 'MapNode<string, MapNode<string, string>> | NilNode', // RegExpMatchArray | null
  RegExpString, // = 'StringNode', // 'RegExp',
  RelativeTimeFormat, // = 'Atom<RelativeTimeFormat>', // 'RelativeTimeFormat',
  RelativeTimeFormatOptions, // = 'MapNode<StringNode, StringNode>',
  RelativeTimeFormatPartArray, // = 'VectorNode<MapNode<StringNode, StringNode>>', // interface RelativeTimeFormatPart { type: string; value: string; unit: string; }
  Replacer, // = '(FunctionNode(key: StringNode, value: AstNode) => AstNode) | VectorNode<NumberNode | StringNode> | NilNode', // 'replacer?: (key: string, value: any) => any',
  ReplacerFunction, // = 'FunctionNode(substring: StringNode, ...args: VectorNode<AstNode>) => StringNode', // 'replacer?: (substring: string, ...args: any[]) => string',
  ResolvedCollatorOptions, // = 'MapNode<StringNode, StringNode | BooleanNode>', // interface ResolvedCollatorOptions { usage: string; localeMatcher: string; numeric: boolean; caseFirst: string; sensitivity: string; ignorePunctuation: boolean; collation: boolean; }
  ResolvedDateTimeFormatOptions, // = 'MapNode<StringNode, StringNode>', // interface ResolvedDateTimeFormatOptions { locale: string; calendar: string; numberingSystem: string; timeZone: string; hour12: boolean; weekday: string; era: string; year: string; month: string; day: string; hour: string; minute: string; second: string; timeZoneName: string; }
  ResolvedDisplayNamesOptions, // = 'MapNode<StringNode, StringNode>', // interface ResolvedDisplayNamesOptions { locale: string; style: string; type: string; fallback: string; languageDisplay?: string}
  ResolvedListFormatOptions, // = 'MapNode<StringNode, StringNode>', // interface ResolvedListFormatOptions { locale: string; type: string; style: string; }
  ResolvedNumberFormatOptions, // = 'MapNode<StringNode, StringNode | BooleanNode>', // interface ResolvedNumberFormatOptions { locale: string; numberingSystem: string; style: string; currency: string; currencyDisplay: string; unit: string; unitDisplay: string; currencySign: string; notation: string; compactDisplay: string; signDisplay: string; }
  ResolvedPluralRulesOptions, // = 'MapNode<StringNode, StringNode | NumberNode | VectorNode<StringNode>', // interface ResolvedPluralRulesOptions { locale: string; type: string; }
  ResolvedRelativeTimeFormatOptions, // = 'MapNode<StringNode, StringNode>', // interface ResolvedRelativeTimeFormatOptions { locale: string; style: string; numeric: string; }
  ResolvedSegmenterOptions, // = 'MapNode<StringNode, StringNode>', // interface ResolvedSegmenterOptions { locale: string; granularity: string; }
  ObjectArray, // = 'VectorNode<AstNode>', // TODO: Is this the correct way to handle rest parameters?
  ReviverFunction, // = 'opt?: FunctionNode(key: StringNode, value: AstNode) => AstNode', // 'reviver: (key: string, value: any) => any',
  RevocableProxy, // = 'MapNode<String, (FunctionNode() => NilNode)>', // { proxy: T; revoke: () => void }
  Segmenter, // = 'Atom<Segmenter>', // 'Segmenter',
  SegmenterOptions, // = 'MapNode<StringNode, StringNode | NilNode>',
  SegmentIterator, // = 'VectorNode<MapNode<StringNode, StringNode | NumberNode | BooleanNode>>', // interface SegmentIterator { segment: string; index: number; input: string; isWordLike?: boolean; }
  SetForEachCallback, // = 'FunctionNode(value1: AstNode, value2: AstNode, set: VectorNode<AstNode>) => NilNode', // (value: T, value2: T, set: Set<T>) => void
  SetT, // = 'VectorNode<AstNode>', // 'Set<T>',
  SharedArrayBuffer, // = 'AtomNode<SharedArrayBuffer>',
  String, // = 'StringNode', // 'string',
  StringArray, // = 'VectorNode<StringNode>', // 'string[]',
  StringOrNumber, // = 'StringNode | NumberNode',
  StringOrNumberOrSymbol, // = 'StringNode | NumberNode | SymbolNode', // 'string | number | symbol',
  StringOrRegExp, // = 'StringNode', // 'string | RegExp' - regular expressions will always be defined as string in Ensemble
  StringOrStringArray, // = 'StringNode | VectorNode<StringNode>', // 'string | string[]',
  StringOrSymbolArray, // = 'VectorNode<StringNode | SymbolNode>', // (string | symbol)[]
  StringOrUndefined, // = 'StringNode | NilNode', // 'string | undefined',
  StrOrStrArr, // = 'StringNode | StringNode[]', // 'string | string[]',
  Sym, // = 'SymbolNode', // 'symbol',
  Symbol, // = 'SymbolNode',
  SymbolArray, // = 'VectorNode<SymbolNode>', // 'symbol[]',
  SyntaxError, // = 'ErrorNode', // 'SyntaxError',
  T, // = 'AstNode', // 'T', // any
  TArray, // = 'VectorNode<AstNode>', //  'T[]', // any[]
  TemplateStringsArray, // = 'MapNode<StringNode("raw"), VectorNode<StringNode>> | VectorNode<StringNode>', // { raw: readonly string[] | ArrayLike<string> }
  TextInfo, // = 'MapNode<StringNode, StringNode>',
  This, // = 'AstNode', // 'this', // Returns the same type of the object
  ThisTArray, // = 'VectorNode<AstNode>', // T[] or any[]
  TNumArr, // = 'VectorNode', // 'T[]', // number[]
  TOrUndefined, // = 'AstNode | NilNode', // 'T | undefined',
  TypedNumberArray, // = 'VectorNode<NumberNode>', // BigInt64Array, BigUint64Array, Float32Array, Float64Array, Int16Array, Int32Array, Int8Array, Uint16Array, Uint32Array, Uint8Array, Uint8ClampedArray, etc.
  TypeError, // = 'ErrorNode', // 'TypeError',
  U, // = 'AstNode', // 'U', // any
  UArray, // = 'VectorNode<AstNode>', // U[] or any[]
  Uint16Array, // = 'VectorNode<NumberNode>',
  Uint32Array, // = 'VectorNode<NumberNode>',
  Uint8Array, // = 'VectorNode<NumberNode>',
  Uint8ClampedArray, // = 'VectorNode<NumberNode>',
  Undef, // = 'NilNode', // 'undefined',
  UnicodeBCP47LocaleIdentifierOrLocale, // = 'StringNode | AtomNode<Intl.Locale>', // type UnicodeBCP47LocaleIdentifier = string; type Locale = string | LocaleObject;
  UntypedMap, // = 'MapNode<AstNode, AstNode>',
  URIError, // = 'ErrorNode', // 'URIError',
  Void, // = 'NilNode', // 'void',
  WeakKey, // = 'SymbolNode | AstNode', // 'WeakKey',
  WeakKeyArrayOrNull, // = 'VectorNode<WeakKey> | NilNode', // new <T extends WeakKey = WeakKey>(values?: readonly T[] | null): WeakSet<T>;
  WeakMap, // = 'MapNode<(SymbolNode | AstNode), AstNode>',
  WeakRefT, // = 'AtomNode<WeakRef<AstNode>>',
  WeakSet, // = 'AtomNode<WeakSet>>',
  WeekInfo, // = 'MapNode<StringNode, NumberNode | VectorNode<NumberNode>',
}

/** Categorizes different types of definitions such as constructors, static methods, etc */
export enum DefinitionType {
  Constructor = 'Constructor',
  StaticMethod = 'StaticMethod',
  StaticProperty = 'StaticProperty',
  InstanceMethod = 'InstanceMethod',
  InstanceProperty = 'InstanceProperty',
}

/** Lists built-in JavaScript objects */
export enum BaseObjects {
  None = '',
  Array = 'Array',
  ArrayBuffer = 'ArrayBuffer',
  BigInt = 'BigInt',
  BigInt64Array = 'BigInt64Array',
  BigUint64Array = 'BigUint64Array',
  Boolean = 'Boolean',
  DataView = 'DataView',
  Date = 'Date',
  Error = 'Error',
  EvalError = 'EvalError',
  Float32Array = 'Float32Array',
  Float64Array = 'Float64Array',
  Function = 'Function',
  GlobalThis = 'globalThis',
  Int16Array = 'Int16Array',
  Int32Array = 'Int32Array',
  Int8Array = 'Int8Array',
  Intl = 'Intl',
  IntlCollator = 'Intl.Collator',
  IntlDateTimeFormat = 'Intl.DateTimeFormat',
  IntlDisplayNames = 'Intl.DisplayNames',
  IntlListFormat = 'Intl.ListFormat',
  IntlLocale = 'Intl.Locale',
  IntlNumberFormat = 'Intl.NumberFormat',
  IntlPluralRules = 'Intl.PluralRules',
  IntlRelativeTimeFormat = 'Intl.RelativeTimeFormat',
  IntlSegmenter = 'Intl.Segmenter',
  JSON = 'JSON',
  Map = 'Map',
  Math = 'Math',
  Number = 'Number',
  Object = 'Object',
  Promise = 'Promise',
  Proxy = 'Proxy',
  Reflect = 'Reflect',
  RangeError = 'RangeError',
  ReferenceError = 'ReferenceError',
  RegExp = 'RegExp',
  Set = 'Set',
  SharedArrayBuffer = 'SharedArrayBuffer',
  String = 'String',
  Symbol = 'Symbol',
  SyntaxError = 'SyntaxError',
  TypedArray = 'TypedArray',
  TypeError = 'TypeError',
  Uint16Array = 'Uint16Array',
  Uint32Array = 'Uint32Array',
  Uint8Array = 'Uint8Array',
  Uint8ClampedArray = 'Uint8ClampedArray',
  WeakMap = 'WeakMap',
  WeakRef = 'WeakRef',
  WeakSet = 'WeakSet',
}

/** Represents a tuple of a parameter name and its type. */
export type NamedParameter = [name: string, type: ParameterType];

/** Describes the structure of a built-in definition, including its type, parameters, return value, and inheritance. */
export type BuiltinDefinition = {
  type: DefinitionType;
  parameters: Array<NamedParameter>;
  returnValue: ParameterType;
  inheritedFrom: BaseObjects;
  baseClass?: BaseObjects;
  validations?: string[];
};

/** An array of `BuiltinDefinition` objects. */
export type OverloadedBuiltinDefinition = Array<BuiltinDefinition>;

/** A record of built-in definitions indexed by string keys. */
export type BuiltinCollection = Record<string, (BuiltinDefinition | OverloadedBuiltinDefinition)>;

// MARK: ✅ BASE FUNCTION

/**
 * An object that contains the standard methods and properties from the Function object which all builtins inherit.
 * @param name - The name of the builtin that will inherit Function.
 * @returns A BuiltinCollection object containing the Function object's methods and properties.
 */
function inheritFunction(name: string): BuiltinCollection {
  const functionBuiltin: BuiltinCollection = {
    [`${name}.apply`]: {
      type: DefinitionType.StaticMethod,
      parameters: [
        ['thisArg', ParameterType.Any],
        ['argArray?', ParameterType.AnyArray],
      ],
      returnValue: ParameterType.Any,
      inheritedFrom: BaseObjects.Function,
    },
    [`${name}.bind`]: {
      type: DefinitionType.StaticMethod,
      parameters: [
        ['thisArg', ParameterType.Any],
        ['...argArray', ParameterType.AnyArray],
      ],
      returnValue: ParameterType.Any,
      inheritedFrom: BaseObjects.Function,
    },
    [`${name}.call`]: {
      type: DefinitionType.StaticMethod,
      parameters: [
        ['thisArg', ParameterType.Any],
        ['...argArray', ParameterType.AnyArray],
      ],
      returnValue: ParameterType.Any,
      inheritedFrom: BaseObjects.Function,
    },
    [`${name}[Symbol.hasInstance]`]: {
      type: DefinitionType.StaticMethod,
      parameters: [['value', ParameterType.Any]],
      returnValue: ParameterType.Boolean,
      inheritedFrom: BaseObjects.Function,
    },
    [`${name}.toString`]: {
      type: DefinitionType.StaticMethod,
      parameters: [],
      returnValue: ParameterType.String,
      inheritedFrom: BaseObjects.Function,
    },
    [`${name}.length`]: {
      type: DefinitionType.StaticProperty,
      parameters: [],
      returnValue: ParameterType.Number,
      inheritedFrom: BaseObjects.Function,
    },
    [`${name}.name`]: {
      type: DefinitionType.StaticProperty,
      parameters: [],
      returnValue: ParameterType.String,
      inheritedFrom: BaseObjects.Function,
    },
    [`${name}.prototype`]: {
      type: DefinitionType.StaticProperty,
      parameters: [],
      returnValue: ParameterType.Any,
      inheritedFrom: BaseObjects.Function,
    },
    [`${name}.toString`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [],
      returnValue: ParameterType.String,
      inheritedFrom: BaseObjects.Function,
    },
    [`${name}.toLocaleString`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [],
      returnValue: ParameterType.String,
      inheritedFrom: BaseObjects.Function,
    },
    [`${name}.valueOf`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [],
      returnValue: ParameterType.Object,
      inheritedFrom: BaseObjects.Function,
    },
    [`${name}.length`]: {
      type: DefinitionType.InstanceProperty,
      parameters: [],
      returnValue: ParameterType.Number,
      inheritedFrom: BaseObjects.Function,
    },
    [`${name}.name`]: {
      type: DefinitionType.InstanceProperty,
      parameters: [],
      returnValue: ParameterType.String,
      inheritedFrom: BaseObjects.Function,
    },
    [`${name}.constructor`]: {
      type: DefinitionType.InstanceProperty,
      parameters: [],
      returnValue: ParameterType.FunctionBuiltin,
      inheritedFrom: BaseObjects.Function,
    },
  };

  return functionBuiltin;
}

// MARK: ✅ FUNCTION

/**
 * Defines the built-in properties and methods for the Function object.
 * This includes constructors, static methods, instance methods, and instance properties.
 */
const functionBuiltin: BuiltinCollection = {
  ...inheritFunction('Function'),

  [`Function`]: {
    type: DefinitionType.Constructor,
    parameters: [['...args', ParameterType.StringArray]],
    returnValue: ParameterType.ConstructorFunction,
    inheritedFrom: BaseObjects.None,
  },
  [`Function.new`]: {
    type: DefinitionType.Constructor,
    parameters: [['...args', ParameterType.StringArray]],
    returnValue: ParameterType.ConstructorFunction,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ ARRAY

/**
 * Defines the built-in properties and methods for the Array object.
 * This includes constructors, static methods, instance methods, and instance properties.
 */
const arrayBuiltin: BuiltinCollection = {
  ...inheritFunction('Array'),

  [`Array`]: [
    {
      type: DefinitionType.Constructor,
      parameters: [],
      returnValue: ParameterType.AnyArray,
      inheritedFrom: BaseObjects.None,
    },
    {
      type: DefinitionType.Constructor,
      parameters: [['arrayLength', ParameterType.Number]],
      returnValue: ParameterType.TArray,
      inheritedFrom: BaseObjects.None,
    },
    {
      type: DefinitionType.Constructor,
      parameters: [['...items', ParameterType.TArray]],
      returnValue: ParameterType.TArray,
      inheritedFrom: BaseObjects.None,
    },
  ],
  [`Array.new`]: [
    {
      type: DefinitionType.Constructor,
      parameters: [],
      returnValue: ParameterType.AnyArray,
      inheritedFrom: BaseObjects.None,
    },
    {
      type: DefinitionType.Constructor,
      parameters: [['arrayLength', ParameterType.Number]],
      returnValue: ParameterType.TArray,
      inheritedFrom: BaseObjects.None,
    },
    {
      type: DefinitionType.Constructor,
      parameters: [['...items', ParameterType.TArray]],
      returnValue: ParameterType.TArray,
      inheritedFrom: BaseObjects.None,
    },
  ],
  [`Array.from`]: [
    {
      type: DefinitionType.StaticMethod,
      parameters: [['arrayLike', ParameterType.ArrayLikeT]],
      returnValue: ParameterType.TArray,
      inheritedFrom: BaseObjects.None,
    },
    {
      type: DefinitionType.StaticMethod,
      parameters: [
        ['arrayLike', ParameterType.ArrayLikeT],
        ['mapfn', ParameterType.FunctionTNumberU],
        ['thisArg', ParameterType.Any],
      ],
      returnValue: ParameterType.UArray,
      inheritedFrom: BaseObjects.None,
    },
  ],
  [`Array.fromAsync`]: [
    {
      type: DefinitionType.StaticMethod,
      parameters: [['iterableOrArrayLike', ParameterType.IterableOrArrayLike]],
      returnValue: ParameterType.PromiseTArray,
      inheritedFrom: BaseObjects.None,
    },
    {
      type: DefinitionType.StaticMethod,
      parameters: [
        ['iterableOrArrayLike', ParameterType.IterableOrArrayLike],
        ['mapFn', ParameterType.FunctionAwaitedTU],
        ['thisArg?', ParameterType.Any],
      ],
      returnValue: ParameterType.PromiseAwaitedUArray,
      inheritedFrom: BaseObjects.None,
    },
  ],
  [`Array.isArray`]: {
    type: DefinitionType.StaticMethod,
    parameters: [['arg', ParameterType.Any]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.Function,
  },
  [`Array.of`]: {
    type: DefinitionType.StaticMethod,
    parameters: [['...items', ParameterType.TArray]],
    returnValue: ParameterType.TArray,
    inheritedFrom: BaseObjects.None,
  },
  // Disable Symbol.species to prevent arbitrary code execution.
  // > Warning: The existence of [Symbol.species] allows execution of arbitrary code and may create security vulnerabilities. It also makes certain
  // > optimizations much harder. Engine implementers are investigating whether to remove this feature. Avoid relying on it if possible.
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/species
  // [`Array[Symbol.species]`]: {
  //   type: DefinitionType.StaticProperty,
  //   parameters: [],
  //   returnValue: ParameterType.This, // Self
  //   inheritedFrom: BaseObjects.None,
  // },
  [`Array.prototype.at`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [['index', ParameterType.Number]],
    returnValue: ParameterType.TOrUndefined,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.concat`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [['...items', ParameterType.TArray]],
    returnValue: ParameterType.TArray,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.copyWithin`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['target', ParameterType.Number],
      ['start', ParameterType.Number],
      ['end?', ParameterType.Number],
    ],
    returnValue: ParameterType.TArray,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.entries`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.IterableIteratorNumberT,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.every`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['predicate', ParameterType.PredicateFunction],
      ['thisArg?', ParameterType.Any],
    ],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.fill`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['value', ParameterType.T],
      ['start?', ParameterType.Number],
      ['end?', ParameterType.Number],
    ],
    returnValue: ParameterType.ThisTArray,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.filter`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['predicate', ParameterType.PredicateFunction],
      ['thisArg?', ParameterType.Any],
    ],
    returnValue: ParameterType.TArray,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.find`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['predicate', ParameterType.PredicateFunction],
      ['thisArg?', ParameterType.Any],
    ],
    returnValue: ParameterType.TOrUndefined,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.findIndex`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['predicate', ParameterType.PredicateFunction],
      ['thisArg?', ParameterType.Any],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.findLast`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['predicate', ParameterType.PredicateFunction],
      ['thisArg?', ParameterType.Any],
    ],
    returnValue: ParameterType.TOrUndefined,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.findLastIndex`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['predicate', ParameterType.PredicateFunction],
      ['thisArg?', ParameterType.Any],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.flat`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [['depth?', ParameterType.OptionalNumberWithInitializer1]],
    returnValue: ParameterType.AnyArray,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.flatMap`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['callback', ParameterType.ArrayMapCallbackFunction],
      ['thisArg?', ParameterType.AnyArray],
    ],
    returnValue: ParameterType.UArray,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.forEach`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['callbackfn', ParameterType.ForEachCallbackFunction],
      ['thisArg?', ParameterType.Any],
    ],
    returnValue: ParameterType.Void,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.includes`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['searchElement', ParameterType.T],
      ['fromIndex?', ParameterType.Number],
    ],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.indexOf`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['searchElement', ParameterType.T],
      ['fromIndex?', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.join`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [['separator?', ParameterType.String]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.keys`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.IterableIteratorNumber,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.lastIndexOf`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['searchElement', ParameterType.T],
      ['fromIndex?', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.map`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['callbackfn', ParameterType.ArrayMapCallbackFunction],
      ['thisArg?', ParameterType.Any],
    ],
    returnValue: ParameterType.UArray,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.pop`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.TOrUndefined,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.push`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [['...items', ParameterType.TArray]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.reduce`]: [
    {
      // reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T, initialValue: T): T;
      type: DefinitionType.InstanceMethod,
      parameters: [
        // ['context', ParameterType.AnyArray],
        ['callbackfn', ParameterType.GenericReduceCallbackFunction],
        ['initialValue', ParameterType.T],
      ],
      returnValue: ParameterType.T,
      inheritedFrom: BaseObjects.None,
      baseClass: BaseObjects.Array,
      validations: [
        'if (!types.isVectorNode(astArgs[0])) { throw new TypeError("Array.prototype.reduce requires a vector as the first argument.")}',
        'if (!types.isFunctionNode(astArgs[1])) { throw new TypeError("Array.prototype.reduce requires a function as the second argument.")}',
        'if (!types.isAstNode(astArgs[2])) { throw new TypeError("Array.prototype.reduce requires an initializer as the third argument.")}',
        'if (!Array.isArray(astArgs[0].value)) { throw new TypeError("Array.prototype.reduce requires a vector as the first argument.")}',
        'if (typeof astArgs[1].value !== "function") { throw new TypeError("Array.prototype.reduce requires a function as the second argument.")}',
        'if (astArgs[2] === undefined) { throw new TypeError("Array.prototype.reduce requires an initializer as the third argument.")}',
      ],
    },
    {
      // reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T): T;
      type: DefinitionType.InstanceMethod,
      parameters: [['callbackfn', ParameterType.GenericReduceCallbackFunction]],
      returnValue: ParameterType.T,
      inheritedFrom: BaseObjects.None,
    },
  ],
  [`Array.prototype.reduceRight`]: [
    {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['callbackfn', ParameterType.GenericReduceCallbackFunction],
      ],
      returnValue: ParameterType.T,
      inheritedFrom: BaseObjects.None,
    },
    {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['callbackfn', ParameterType.GenericReduceCallbackFunction],
        ['initialValue', ParameterType.T],
      ],
      returnValue: ParameterType.T,
      inheritedFrom: BaseObjects.None,
    },
  ],
  [`Array.prototype.reverse`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.TArray,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.shift`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.TOrUndefined,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.slice`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['start?', ParameterType.Number],
      ['end?', ParameterType.Number],
    ],
    returnValue: ParameterType.TArray,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.some`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['predicate', ParameterType.PredicateFunction],
      ['thisArg?', ParameterType.Any],
    ],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.sort`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [['compareFn?', ParameterType.CompareFunction]],
    returnValue: ParameterType.ThisTArray,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.splice`]: [
    {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['start', ParameterType.Number],
        ['deleteCount?', ParameterType.Number],
      ],
      returnValue: ParameterType.TArray,
      inheritedFrom: BaseObjects.None,
    },
    {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['start', ParameterType.Number],
        ['deleteCount', ParameterType.Number],
        ['...items', ParameterType.TArray],
      ],
      returnValue: ParameterType.TArray,
      inheritedFrom: BaseObjects.None,
    },
  ],
  [`Array.prototype[Symbol.iterator]`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.IterableIteratorT,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.toReversed`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.TArray,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.toSorted`]: [
    {
      type: DefinitionType.InstanceMethod,
      parameters: [],
      returnValue: ParameterType.TArray,
      inheritedFrom: BaseObjects.None,
    },
    {
      type: DefinitionType.InstanceMethod,
      parameters: [['compareFunction?', ParameterType.CompareFunction]],
      returnValue: ParameterType.TArray,
      inheritedFrom: BaseObjects.None,
    },
  ],
  [`Array.prototype.toSpliced`]: [
    {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['start', ParameterType.Number],
        ['deleteCount', ParameterType.Number],
        ['...items', ParameterType.TArray],
      ],
      returnValue: ParameterType.TArray,
      inheritedFrom: BaseObjects.None,
    },
    {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['start', ParameterType.Number],
        ['deleteCount?', ParameterType.Number],
      ],
      returnValue: ParameterType.TArray,
      inheritedFrom: BaseObjects.None,
    },
  ],
  [`Array.prototype.unshift`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [['...items', ParameterType.TArray]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.values`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.IterableIteratorT,
    inheritedFrom: BaseObjects.None,
  },
  [`Array.prototype.with`]: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['index', ParameterType.Number],
      ['value', ParameterType.T],
    ],
    returnValue: ParameterType.TArray,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ TYPED ARRAY

/**
 * Defines the built-in properties and methods for the Typed Array classes such as Int16Array, Uint8Array, etc.
 * This includes constructors, static methods, instance methods, and instance properties.
 * @param typedArrayName - The name of the typed array class, e.g. "Int16Array", "Uint8Array", etc.
 * @param arrayType - The parameter type for the typed array, such as `ParameterType.Int16Array`.
 * @returns A `BuiltinCollection` object that contains the properties and methods for the specified typed array class.
 */
function inheritTypedArray(typedArrayName: string, arrayType: ParameterType): BuiltinCollection {
  const builtIn: BuiltinCollection = {
    ...inheritFunction(typedArrayName),
    [`${typedArrayName}.new`]: [
      {
        type: DefinitionType.Constructor,
        parameters: [],
        returnValue: arrayType,
        inheritedFrom: BaseObjects.TypedArray,
      },
      {
        type: DefinitionType.Constructor,
        parameters: [['length', ParameterType.Number]],
        returnValue: arrayType,
        inheritedFrom: BaseObjects.TypedArray,
      },
      {
        type: DefinitionType.Constructor,
        parameters: [['array', ParameterType.ArrayLikeNumberOrArrayBuffer]],
        returnValue: arrayType,
        inheritedFrom: BaseObjects.TypedArray,
      },
      {
        type: DefinitionType.Constructor,
        parameters: [
          ['buffer', ParameterType.ArrayBufferLike],
          ['byteOffset?', ParameterType.Number],
          ['length?', ParameterType.Number],
        ],
        returnValue: arrayType,
        inheritedFrom: BaseObjects.TypedArray,
      },
      {
        type: DefinitionType.Constructor,
        parameters: [
          ['elements', ParameterType.IterableNumber],
        ],
        returnValue: arrayType,
        inheritedFrom: BaseObjects.TypedArray,
      },
    ],
    [`${typedArrayName}.from`]: [
      {
        type: DefinitionType.StaticMethod,
        parameters: [['arrayLike', ParameterType.ArrayLikeNumeric]],
        returnValue: arrayType,
        inheritedFrom: BaseObjects.TypedArray,
      },
      {
        type: DefinitionType.StaticMethod,
        parameters: [
          ['arrayLike', ParameterType.IterableNumber],
          ['mapfn?', ParameterType.NumericFromMapFunction],
          ['baz?', ParameterType.Any],
        ],
        returnValue: arrayType,
        inheritedFrom: BaseObjects.TypedArray,
      },
      {
        type: DefinitionType.StaticMethod,
        parameters: [
          ['arrayLike', ParameterType.ArrayLikeT],
          ['mapfn', ParameterType.NumericFromMapFunction],
          ['thisArg?', ParameterType.Any],
        ],
        returnValue: arrayType,
        inheritedFrom: BaseObjects.TypedArray,
      },
    ],
    [`${typedArrayName}.BYTES_PER_ELEMENT`]: {
      type: DefinitionType.StaticProperty,
      parameters: [],
      returnValue: ParameterType.Number,
      inheritedFrom: BaseObjects.TypedArray,
    },
    // Disable Symbol.species to prevent arbitrary code execution.
    // > Warning: The existence of [Symbol.species] allows execution of arbitrary code and may create security vulnerabilities. It also makes certain
    // > optimizations much harder. Engine implementers are investigating whether to remove this feature. Avoid relying on it if possible.
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/species
    // [`${name}[Symbol.species]`]: {
    //   type: DefinitionType.StaticProperty,
    //   parameters: [],
    //   returnValue: arrayType,
    //   inheritedFrom: BaseObjects.TypedArray,
    // },
    [`${typedArrayName}.prototype.at`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [['index', ParameterType.Number]],
      returnValue: ParameterType.NumberOrUndefined,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.copyWithin`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['target', ParameterType.Number],
        ['start', ParameterType.Number],
        ['end?', ParameterType.Number],
      ],
      returnValue: arrayType,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.entries`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [],
      returnValue: ParameterType.IterableIteratorNumberNumber,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.every`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['predicate', ParameterType.PredicateFunction],
        ['thisArg?', ParameterType.Any],
      ],
      returnValue: ParameterType.Boolean,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.fill`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['value', ParameterType.T],
        ['start?', ParameterType.Number],
        ['end?', ParameterType.Number],
      ],
      returnValue: arrayType,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.filter`]: [
      {
        type: DefinitionType.InstanceMethod,
        parameters: [
          ['predicate', ParameterType.PredicateFunction],
          ['thisArg?', ParameterType.Any],
        ],
        returnValue: arrayType,
        inheritedFrom: BaseObjects.TypedArray,
      },
      {
        type: DefinitionType.InstanceMethod,
        parameters: [
          ['predicate', ParameterType.PredicateFunction],
          ['thisArg?', ParameterType.Any],
        ],
        returnValue: arrayType,
        inheritedFrom: BaseObjects.TypedArray,
      },
    ],
    [`${typedArrayName}.prototype.find`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['predicate', ParameterType.PredicateFunction],
        ['thisArg?', ParameterType.Any],
      ],
      returnValue: ParameterType.TOrUndefined,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.findIndex`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['predicate', ParameterType.PredicateFunction],
        ['thisArg?', ParameterType.Any],
      ],
      returnValue: ParameterType.Number,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.findLast`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['predicate', ParameterType.PredicateFunction],
        ['thisArg?', ParameterType.Any],
      ],
      returnValue: ParameterType.TOrUndefined,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.findLastIndex`]: [
      {
        type: DefinitionType.InstanceMethod,
        parameters: [
          ['predicate', ParameterType.PredicateFunction],
          ['thisArg?', ParameterType.Any],
        ],
        returnValue: ParameterType.Number,
        inheritedFrom: BaseObjects.TypedArray,
      },
      {
        type: DefinitionType.InstanceMethod,
        parameters: [
          ['predicate', ParameterType.PredicateFunction],
          ['thisArg?', ParameterType.Any],
        ],
        returnValue: ParameterType.Number,
        inheritedFrom: BaseObjects.TypedArray,
      },
    ],
    [`${typedArrayName}.prototype.forEach`]: [
      {
        type: DefinitionType.InstanceMethod,
        parameters: [
          ['callbackfn', ParameterType.NumericForEachCallbackFunction],
          ['thisArg?', ParameterType.Any],
        ],
        returnValue: ParameterType.Void,
        inheritedFrom: BaseObjects.TypedArray,
      },
      {
        type: DefinitionType.InstanceMethod,
        parameters: [
          ['callbackfn', ParameterType.NumericForEachCallbackFunction],
          ['thisArg?', ParameterType.Any],
        ],
        returnValue: ParameterType.Void,
        inheritedFrom: BaseObjects.TypedArray,
      },
    ],
    [`${typedArrayName}.prototype.includes`]: [
      {
        type: DefinitionType.InstanceMethod,
        parameters: [
          ['searchElement', ParameterType.T],
          ['fromIndex?', ParameterType.Number],
        ],
        returnValue: ParameterType.Boolean,
        inheritedFrom: BaseObjects.TypedArray,
      },
      {
        type: DefinitionType.InstanceMethod,
        parameters: [
          ['searchElement', ParameterType.Number],
          ['fromIndex?', ParameterType.Number],
        ],
        returnValue: ParameterType.Boolean,
        inheritedFrom: BaseObjects.TypedArray,
      },
    ],
    [`${typedArrayName}.prototype.indexOf`]: [
      {
        type: DefinitionType.InstanceMethod,
        parameters: [
          ['searchElement', ParameterType.T],
          ['fromIndex?', ParameterType.Number],
        ],
        returnValue: ParameterType.Number,
        inheritedFrom: BaseObjects.TypedArray,
      },
      {
        type: DefinitionType.InstanceMethod,
        parameters: [
          ['searchElement', ParameterType.Number],
          ['fromIndex?', ParameterType.Number],
        ],
        returnValue: ParameterType.Number,
        inheritedFrom: BaseObjects.TypedArray,
      },
    ],
    [`${typedArrayName}.prototype.join`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [['separator?', ParameterType.String]],
      returnValue: ParameterType.String,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.keys`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [],
      returnValue: ParameterType.IterableIteratorNumber,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.lastIndexOf`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['searchElement', ParameterType.Number],
        ['fromIndex?', ParameterType.Number],
      ],
      returnValue: ParameterType.Number,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.map`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['callbackfn', ParameterType.ArrayMapCallbackFunction],
        ['thisArg?', ParameterType.Any],
      ],
      returnValue: arrayType,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.reduce`]: [
      {
        type: DefinitionType.InstanceMethod,
        parameters: [['callbackfn', ParameterType.NumericReduceCallbackFunction]],
        returnValue: ParameterType.Number,
        inheritedFrom: BaseObjects.TypedArray,
      },
      {
        type: DefinitionType.InstanceMethod,
        parameters: [
          ['callbackfn', ParameterType.GenericReduceCallbackFunction],
          ['initialValue', ParameterType.U],
        ],
        returnValue: ParameterType.U,
        inheritedFrom: BaseObjects.TypedArray,
      },
    ],
    [`${typedArrayName}.prototype.reduceRight`]: [
      {
        type: DefinitionType.InstanceMethod,
        parameters: [['callbackfn', ParameterType.NumericReduceCallbackFunction]],
        returnValue: ParameterType.Number,
        inheritedFrom: BaseObjects.TypedArray,
      },
      {
        type: DefinitionType.InstanceMethod,
        parameters: [
          ['callbackfn', ParameterType.NumericReduceCallbackFunction],
          ['initialValue', ParameterType.Number],
        ],
        returnValue: ParameterType.Number,
        inheritedFrom: BaseObjects.TypedArray,
      },
      {
        type: DefinitionType.InstanceMethod,
        parameters: [
          ['callbackfn', ParameterType.GenericReduceCallbackFunction],
          ['initialValue', ParameterType.U],
        ],
        returnValue: ParameterType.U,
        inheritedFrom: BaseObjects.TypedArray,
      },
    ],
    [`${typedArrayName}.prototype.reverse`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [],
      returnValue: arrayType,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.set`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['array', ParameterType.ArrayLikeNumeric],
        ['offset?', ParameterType.Number],
      ],
      returnValue: ParameterType.Void,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.slice`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['start?', ParameterType.Number],
        ['end?', ParameterType.Number],
      ],
      returnValue: arrayType,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.some`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['predicate', ParameterType.NumericPredicateFunction],
        ['thisArg?', ParameterType.Any],
      ],
      returnValue: ParameterType.Boolean,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.sort`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['compareFn?', ParameterType.CompareFunction],
      ],
      returnValue: arrayType,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.subarray`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['begin?', ParameterType.Number],
        ['end?', ParameterType.Number],
      ],
      returnValue: arrayType,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype[Symbol.iterator]`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [],
      returnValue: ParameterType.IterableIteratorNumber,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.toLocaleString`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [],
      returnValue: ParameterType.String,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.toReversed`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [],
      returnValue: arrayType,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.toSorted`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['compareFn?', ParameterType.NumericCompareFunction],
      ],
      returnValue: arrayType,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.valueOf`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [],
      returnValue: arrayType,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.values`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [],
      returnValue: ParameterType.IterableIteratorNumber,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.with`]: {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['index', ParameterType.Number],
        ['value', ParameterType.Number],
      ],
      returnValue: arrayType,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.buffer`]: {
      type: DefinitionType.InstanceProperty,
      parameters: [],
      returnValue: ParameterType.ArrayBufferLike,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.byteLength`]: {
      type: DefinitionType.InstanceProperty,
      parameters: [],
      returnValue: ParameterType.Number,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.byteOffset`]: {
      type: DefinitionType.InstanceProperty,
      parameters: [],
      returnValue: ParameterType.Number,
      inheritedFrom: BaseObjects.TypedArray,
    },
    [`${typedArrayName}.prototype.length`]: {
      type: DefinitionType.InstanceProperty,
      parameters: [],
      returnValue: ParameterType.Number,
      inheritedFrom: BaseObjects.TypedArray,
    },
  };

  // TODO: Find out why the Deno linter doesn't allow more than one argument to bind and call for most Typed Arrays.
  // Override the inherited Function methods bind and call to resolve the issue. (BigInt64Array, BigUint64Array is an exception)
  if (typedArrayName !== 'BigInt64Array' && typedArrayName !== 'BigUint64Array') {
    builtIn[`${typedArrayName}.bind`] = {
      type: DefinitionType.StaticMethod,
      parameters: [
        ['thisArg', ParameterType.Any],
        // ['...argArray', ParameterType.AnyArray]
      ],
      returnValue: ParameterType.Any,
      inheritedFrom: BaseObjects.Function,
    };
    builtIn[`${typedArrayName}.call`] = {
      type: DefinitionType.StaticMethod,
      parameters: [
        ['thisArg', ParameterType.Any],
        // ['...argArray', ParameterType.AnyArray]
      ],
      returnValue: ParameterType.Any,
      inheritedFrom: BaseObjects.Function,
    };
  }
  return builtIn;
}

// MARK INT8 ARRAY

const int8ArrayBuiltin: BuiltinCollection = {
  ...inheritTypedArray('Int8Array', ParameterType.Int8Array),
};

// MARK: ✅ BIG INT 64 ARRAY

const bigint64ArrayBuiltin: BuiltinCollection = {
  ...inheritTypedArray('BigInt64Array', ParameterType.BigInt64Array),
};

// MARK: ✅ BIG UINT 64 ARRAY

const bigUint64ArrayBuiltin: BuiltinCollection = {
  ...inheritTypedArray('BigUint64Array', ParameterType.BigUint64Array),
};

// MARK: ✅ FLOAT 32 ARRAY

const float32ArrayBuiltin: BuiltinCollection = {
  ...inheritTypedArray('Float32Array', ParameterType.Float32Array),
};

// MARK: ✅ FLOAT 64 ARRAY

const float64ArrayBuiltin: BuiltinCollection = {
  ...inheritTypedArray('Float64Array', ParameterType.Float64Array),
};

// MARK: ✅ INT 16 ARRAY

const int16ArrayBuiltin: BuiltinCollection = {
  ...inheritTypedArray('Int16Array', ParameterType.Int16Array),
};

// MARK: ✅ INT 32 ARRAY

const int32ArrayBuiltin: BuiltinCollection = {
  ...inheritTypedArray('Int32Array', ParameterType.Int32Array),
};

// MARK: ✅ UINT 8 ARRAY

const uint8ArrayBuiltin: BuiltinCollection = {
  ...inheritTypedArray('Uint8Array', ParameterType.Uint8Array),
};

// MARK: ✅ UINT 16 ARRAY

const uint16ArrayBuiltin: BuiltinCollection = {
  ...inheritTypedArray('Uint16Array', ParameterType.Uint16Array),
};

// MARK: ✅ UINT 32 ARRAY

const uint32ArrayBuiltin: BuiltinCollection = {
  ...inheritTypedArray('Uint32Array', ParameterType.Uint32Array),
};

// MARK: ✅ UINT 8 CLAMPED ARRAY

const uint8ClampedArrayBuiltin: BuiltinCollection = {
  ...inheritTypedArray('Uint8ClampedArray', ParameterType.Uint8ClampedArray),
};

// MARK: ✅ ARRAY BUFFER

const arrayBufferBuiltin: BuiltinCollection = {
  ...inheritFunction('ArrayBuffer'),
  ['ArrayBuffer.new']: {
    type: DefinitionType.Constructor,
    parameters: [['byteLength', ParameterType.Number]],
    returnValue: ParameterType.ArrayBufferLike,
    inheritedFrom: BaseObjects.Function,
  },
  ['ArrayBuffer.isView']: {
    type: DefinitionType.StaticMethod,
    parameters: [['arg', ParameterType.Any]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.Function,
  },
  // TODO: Enable when ArrayBuffer.prototype.resize is available in Deno.
  // ['ArrayBuffer.prototype.resize']: {
  //   type: DefinitionType.InstanceMethod,
  //   parameters: [['newByteLength', ParameterType.Number]],
  //   returnValue: ParameterType.Boolean,
  //   inheritedFrom: BuiltinObject.Function,
  // },
  ['ArrayBuffer.prototype.slice']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['begin', ParameterType.Number], ['end?', ParameterType.Number]],
    returnValue: ParameterType.ArrayBufferLike,
    inheritedFrom: BaseObjects.Function,
  },
  // TODO: Enable when ArrayBuffer.prototype.transfer is available in Deno.
  // ['ArrayBuffer.prototype.transfer']: {
  //   type: DefinitionType.InstanceMethod,
  //   parameters: [['newByteLength?', ParameterType.Number]],
  //   returnValue: ParameterType.ArrayBufferLike,
  //   inheritedFrom: BuiltinObject.Function,
  // },
  // TODO: Enable when ArrayBuffer.prototype.transfer is available in Deno.
  // ['ArrayBuffer.prototype.transferToFixedLength']: {
  //   type: DefinitionType.InstanceMethod,
  //   parameters: [['newByteLength?', ParameterType.Number]],
  //   returnValue: ParameterType.ArrayBufferLike,
  //   inheritedFrom: BuiltinObject.Function,
  // },
  ['ArrayBuffer.prototype.byteLength']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.Function,
  },
  // TODO: Enable when ArrayBuffer.prototype.transfer is available in Deno.
  // ['ArrayBuffer.detached']: {
  //   type: DefinitionType.InstanceProperty,
  //   parameters: [],
  //   returnValue: ParameterType.Boolean,
  //   inheritedFrom: BuiltinObject.Function,
  // },
  // TODO: Enable when ArrayBuffer.prototype.transfer is available in Deno.
  // ['ArrayBuffer.maxByteLength']: {
  //   type: DefinitionType.InstanceProperty,
  //   parameters: [],
  //   returnValue: ParameterType.Number,
  //   inheritedFrom: BuiltinObject.Function,
  // },
  // TODO: Enable when ArrayBuffer.prototype.transfer is available in Deno.
  // ['ArrayBuffer.resizable']: {
  //   type: DefinitionType.InstanceProperty,
  //   parameters: [],
  //   returnValue: ParameterType.Boolean,
  //   inheritedFrom: BuiltinObject.Function,
  // },
};

// MARK: ✅ ATOMICS

const atomicsBuiltin: BuiltinCollection = {
  ['Atomics.add']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['typedArray', ParameterType.TypedNumberArray],
      ['index', ParameterType.Number],
      ['value', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.Function,
  },
  ['Atomics.and']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['typedArray', ParameterType.TypedNumberArray],
      ['index', ParameterType.Number],
      ['value', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.Function,
  },
  ['Atomics.compareExchange']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['typedArray', ParameterType.TypedNumberArray],
      ['index', ParameterType.Number],
      ['expectedValue', ParameterType.Number],
      ['replacementValue', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.Function,
  },
  ['Atomics.exchange']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['typedArray', ParameterType.TypedNumberArray],
      ['index', ParameterType.Number],
      ['value', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.Function,
  },
  ['Atomics.isLockFree']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['size', ParameterType.Number],
    ],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.Function,
  },
  ['Atomics.load']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['typedArray', ParameterType.TypedNumberArray],
      ['index', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.Function,
  },
  ['Atomics.notify']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['typedArray', ParameterType.TypedNumberArray],
      ['index', ParameterType.Number],
      ['count?', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.Function,
  },
  ['Atomics.or']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['typedArray', ParameterType.TypedNumberArray],
      ['index', ParameterType.Number],
      ['value', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.Function,
  },
  ['Atomics.store']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['typedArray', ParameterType.TypedNumberArray],
      ['index', ParameterType.Number],
      ['value', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.Function,
  },
  ['Atomics.sub']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['typedArray', ParameterType.TypedNumberArray],
      ['index', ParameterType.Number],
      ['value', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.Function,
  },
  ['Atomics.wait']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['typedArray', ParameterType.TypedNumberArray],
      ['index', ParameterType.Number],
      ['value', ParameterType.Number],
      ['timeout?', ParameterType.Number],
    ],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.Function,
  },
  ['Atomics.waitAsync']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['typedArray', ParameterType.TypedNumberArray],
      ['index', ParameterType.Number],
      ['value', ParameterType.Number],
      ['timeout?', ParameterType.Number],
    ],
    returnValue: ParameterType.ObjBoolStr,
    inheritedFrom: BaseObjects.Function,
  },
  ['Atomics.xor']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['typedArray', ParameterType.TypedNumberArray],
      ['index', ParameterType.Number],
      ['value', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.Function,
  },
  // ['Atomics[Symbol.toStringTag]']: {
  //   type: DefinitionType.StaticMethod,
  //   parameters: [],
  //   returnValue: ParameterType.String,
  //   inheritedFrom: BuiltinObject.None,
  // },
};

// MARK: ✅ BIGINT

const bigintBuiltin: BuiltinCollection = {
  ...inheritFunction('BigInt'),
  ['BigInt']: {
    type: DefinitionType.Constructor,
    parameters: [
      ['value', ParameterType.BigIntOrBooleanOrNumberOrString],
    ],
    returnValue: ParameterType.BigInt,
    inheritedFrom: BaseObjects.Function,
  },
  ['BigInt.asIntN']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['bits', ParameterType.Number],
      ['int', ParameterType.BigInt],
    ],
    returnValue: ParameterType.BigInt,
    inheritedFrom: BaseObjects.Function,
  },
  ['BigInt.asUintN']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['bits', ParameterType.Number],
      ['int', ParameterType.BigInt],
    ],
    returnValue: ParameterType.BigInt,
    inheritedFrom: BaseObjects.Function,
  },
};

// MARK: ✅ BOOLEAN

const booleanBuiltin: BuiltinCollection = {
  ...inheritFunction('Boolean'),
  ['Boolean']: {
    type: DefinitionType.Constructor,
    parameters: [['value?', ParameterType.T]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.Function,
  },
  ['Boolean.new']: {
    type: DefinitionType.Constructor,
    parameters: [['value?', ParameterType.Any]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.Function,
  },
};

// MARK: ✅ DATA VIEW

const dataViewBuiltin: BuiltinCollection = {
  ...inheritFunction('DataView'),

  [`DataView.new`]: {
    type: DefinitionType.Constructor,
    parameters: [
      ['buffer', ParameterType.ArrayBufferLike], // TODO: add `& { BYTES_PER_ELEMENT?: never }`
      ['byteOffset?', ParameterType.Number],
      ['byteLength?', ParameterType.Number],
    ],
    returnValue: ParameterType.DataView,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.getBigInt64']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['byteOffset', ParameterType.Number],
      ['littleEndian?', ParameterType.Boolean],
    ],
    returnValue: ParameterType.BigInt,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.getBigUint64']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['byteOffset', ParameterType.Number],
      ['littleEndian?', ParameterType.Boolean],
    ],
    returnValue: ParameterType.BigInt,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.getFloat32']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['byteOffset', ParameterType.Number],
      ['littleEndian?', ParameterType.Boolean],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.getFloat64']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['byteOffset', ParameterType.Number],
      ['littleEndian?', ParameterType.Boolean],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.getInt16']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['byteOffset', ParameterType.Number],
      ['littleEndian?', ParameterType.Boolean],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.getInt32']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['byteOffset', ParameterType.Number],
      ['littleEndian?', ParameterType.Boolean],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.getInt8']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['byteOffset', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.getUint16']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['byteOffset', ParameterType.Number],
      ['littleEndian?', ParameterType.Boolean],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.getUint32']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['byteOffset', ParameterType.Number],
      ['littleEndian?', ParameterType.Boolean],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.getUint8']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['byteOffset', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.setBigInt64']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['byteOffset', ParameterType.Number],
      ['value', ParameterType.BigInt],
      ['littleEndian?', ParameterType.Boolean],
    ],
    returnValue: ParameterType.Void,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.setBigUint64']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['byteOffset', ParameterType.Number],
      ['value', ParameterType.BigInt],
      ['littleEndian?', ParameterType.Boolean],
    ],
    returnValue: ParameterType.Void,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.setFloat32']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['byteOffset', ParameterType.Number],
      ['value', ParameterType.BigInt],
      ['littleEndian?', ParameterType.Boolean],
    ],
    returnValue: ParameterType.Void,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.setFloat64']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['byteOffset', ParameterType.Number],
      ['value', ParameterType.BigInt],
      ['littleEndian?', ParameterType.Boolean],
    ],
    returnValue: ParameterType.Void,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.setInt16']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['byteOffset', ParameterType.Number],
      ['value', ParameterType.BigInt],
      ['littleEndian?', ParameterType.Boolean],
    ],
    returnValue: ParameterType.Void,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.setInt32']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['byteOffset', ParameterType.Number],
      ['value', ParameterType.BigInt],
      ['littleEndian?', ParameterType.Boolean],
    ],
    returnValue: ParameterType.Void,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.setInt8']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['byteOffset', ParameterType.Number],
      ['value', ParameterType.BigInt],
    ],
    returnValue: ParameterType.Void,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.setUint16']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['byteOffset', ParameterType.Number],
      ['value', ParameterType.BigInt],
      ['littleEndian?', ParameterType.Boolean],
    ],
    returnValue: ParameterType.Void,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.setUint32']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['byteOffset', ParameterType.Number],
      ['value', ParameterType.BigInt],
      ['littleEndian?', ParameterType.Boolean],
    ],
    returnValue: ParameterType.Void,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.setUint8']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['byteOffset', ParameterType.Number],
      ['value', ParameterType.Number],
    ],
    returnValue: ParameterType.Void,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.buffer']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.ArrayBuffer,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.byteLength']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['DataView.prototype.byteOffset']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ DATE

const dateBuiltin: BuiltinCollection = {
  ...inheritFunction('Date'),

  [`Date`]: [
    {
      type: DefinitionType.Constructor,
      parameters: [],
      returnValue: ParameterType.Date,
      inheritedFrom: BaseObjects.None,
    },
  ],
  [`Date.new`]: [
    {
      type: DefinitionType.Constructor,
      parameters: [],
      returnValue: ParameterType.Date,
      inheritedFrom: BaseObjects.None,
    },
    {
      type: DefinitionType.Constructor,
      parameters: [['value', ParameterType.NumberOrString]],
      returnValue: ParameterType.Date,
      inheritedFrom: BaseObjects.None,
    },
    {
      type: DefinitionType.Constructor,
      parameters: [
        ['year', ParameterType.Number],
        ['monthIndex', ParameterType.Number],
        ['date?', ParameterType.Number],
        ['hours?', ParameterType.Number],
        ['minutes?', ParameterType.Number],
        ['seconds?', ParameterType.Number],
        ['ms?', ParameterType.Number],
      ],
      returnValue: ParameterType.Date,
      inheritedFrom: BaseObjects.None,
    },
  ],
  ['Date.now']: {
    type: DefinitionType.StaticMethod,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.parse']: {
    type: DefinitionType.StaticMethod,
    parameters: [['dateString', ParameterType.String]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.UTC']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['year', ParameterType.Number],
      ['month', ParameterType.Number],
      ['date?', ParameterType.Number],
      ['hours?', ParameterType.Number],
      ['minutes?', ParameterType.Number],
      ['seconds?', ParameterType.Number],
      ['ms?', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.getDate']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.getDay']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.getFullYear']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.getHours']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.getMilliseconds']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.getMinutes']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.getMonth']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.getSeconds']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.getTime']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.getTimezoneOffset']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.getUTCDate']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.getUTCDay']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.getUTCFullYear']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.getUTCHours']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.getUTCMilliseconds']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.getUTCMinutes']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.getUTCMonth']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.getUTCSeconds']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.setDate']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['date', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.setFullYear']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['year', ParameterType.Number],
      ['month?', ParameterType.Number],
      ['date?', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.setHours']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['hours', ParameterType.Number],
      ['min?', ParameterType.Number],
      ['sec?', ParameterType.Number],
      ['ms?', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.setMilliseconds']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['ms', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.setMinutes']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['min', ParameterType.Number],
      ['sec?', ParameterType.Number],
      ['ms?', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.setMonth']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['month', ParameterType.Number],
      ['date?', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.setSeconds']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['sec', ParameterType.Number],
      ['ms?', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.setTime']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['time', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.setUTCDate']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['date', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.setUTCFullYear']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['year', ParameterType.Number],
      ['month?', ParameterType.Number],
      ['date?', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.setUTCHours']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['hours', ParameterType.Number],
      ['min?', ParameterType.Number],
      ['sec?', ParameterType.Number],
      ['ms?', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.setUTCMilliseconds']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['ms', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.setUTCMinutes']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['min', ParameterType.Number],
      ['sec?', ParameterType.Number],
      ['ms?', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.setUTCMonth']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['month', ParameterType.Number],
      ['date?', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.setUTCSeconds']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['sec', ParameterType.Number],
      ['ms?', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.toDateString']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.toISOString']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.toJSON']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['key?', ParameterType.Any]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.toLocaleDateString']: [
    {
      type: DefinitionType.InstanceMethod,
      parameters: [],
      returnValue: ParameterType.String,
      inheritedFrom: BaseObjects.None,
    },
    {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['locales?', ParameterType.StringOrStringArray],
        ['options?', ParameterType.DateTimeFormatOptions],
      ],
      returnValue: ParameterType.String,
      inheritedFrom: BaseObjects.None,
    },
  ],
  ['Date.prototype.toLocaleString']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['locales?', ParameterType.StringOrStringArray],
      ['options?', ParameterType.DateTimeFormatOptions],
    ],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.toLocaleTimeString']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['locales?', ParameterType.StringOrStringArray],
      ['options?', ParameterType.DateTimeFormatOptions],
    ],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.toTimeString']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype.toUTCString']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Date.prototype[Symbol.toPrimitive]']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['hint', ParameterType.String]],
    returnValue: ParameterType.NumberOrString,
    inheritedFrom: BaseObjects.None,
  },
  // Override Function
  [`Date.bind`]: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['thisArg', ParameterType.Any],
      // ['...argArray', ParameterType.AnyArray]
    ],
    returnValue: ParameterType.Any,
    inheritedFrom: BaseObjects.Function,
  },
  [`Date.call`]: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['thisArg', ParameterType.Any],
      // ['...argArray', ParameterType.AnyArray]
    ],
    returnValue: ParameterType.Any,
    inheritedFrom: BaseObjects.Function,
  },
};

// MARK: ✅ ERROR BASE

function inheritError(name: string, arrayType: ParameterType): BuiltinCollection {
  const builtIn: BuiltinCollection = {
    ...inheritFunction(name),

    [`${name}`]: {
      type: DefinitionType.Constructor,
      parameters: [['message?', ParameterType.String]],
      returnValue: arrayType,
      inheritedFrom: BaseObjects.Error,
    },
    [`${name}.new`]: {
      type: DefinitionType.Constructor,
      parameters: [['message?', ParameterType.String]],
      returnValue: arrayType,
      inheritedFrom: BaseObjects.Error,
    },
    [`${name}.prototype.message`]: {
      type: DefinitionType.InstanceProperty,
      parameters: [],
      returnValue: ParameterType.String,
      inheritedFrom: BaseObjects.Error,
    },
    [`${name}.prototype.name`]: {
      type: DefinitionType.InstanceProperty,
      parameters: [],
      returnValue: ParameterType.String,
      inheritedFrom: BaseObjects.Error,
    },
    [`${name}.prototype.cause`]: {
      type: DefinitionType.InstanceProperty,
      parameters: [],
      returnValue: ParameterType.OptionalUnknown,
      inheritedFrom: BaseObjects.Error,
    },
    [`${name}.prototype.stack`]: {
      type: DefinitionType.InstanceProperty,
      parameters: [],
      returnValue: ParameterType.OptionalString,
      inheritedFrom: BaseObjects.Error,
    },
  };
  return builtIn;
}

// MARK: ✅ ERROR

const errorBuiltin: BuiltinCollection = {
  ...inheritError('Error', ParameterType.Error),
};

// MARK: ✅ AGGREGATE ERROR

const aggregateErrorBuiltin: BuiltinCollection = {
  ...inheritError('AggregateError', ParameterType.AggregateError),

  [`AggregateError.prototype.errors`]: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.AnyArray,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ EVAL ERROR

const evalErrorBuiltin: BuiltinCollection = {
  ...inheritError('EvalError', ParameterType.EvalError),
};

// MARK: ✅ RANGE ERROR

const rangeErrorBuiltin: BuiltinCollection = {
  ...inheritError('RangeError', ParameterType.RangeError),
};

// MARK: ✅ REFERENCE ERROR

const referenceErrorBuiltin: BuiltinCollection = {
  ...inheritError('ReferenceError', ParameterType.ReferenceError),
};

// MARK: ✅ SYNTAX ERROR

const syntaxErrorBuiltin: BuiltinCollection = {
  ...inheritError('SyntaxError', ParameterType.SyntaxError),
};

// MARK: ✅ TYPE ERROR

const typeErrorBuiltin: BuiltinCollection = {
  ...inheritError('TypeError', ParameterType.TypeError),
};

// MARK: ✅ URI ERROR

const uriErrorBuiltin: BuiltinCollection = {
  ...inheritError('URIError', ParameterType.URIError),
};

// MARK: ✅ FINALIZATION REG.

const finalizationRegistryBuiltin: BuiltinCollection = {
  ...inheritFunction('FinalizationRegistry'),

  ['FinalizationRegistry.new']: {
    type: DefinitionType.Constructor,
    parameters: [['cleanupCallback', ParameterType.CleanupCallback]],
    returnValue: ParameterType.Any,
    inheritedFrom: BaseObjects.None,
  },
  ['FinalizationRegistry.prototype.register']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['target', ParameterType.WeakKey],
      ['heldValue', ParameterType.T],
      ['unregisterToken?', ParameterType.WeakKey],
    ],
    returnValue: ParameterType.Void,
    inheritedFrom: BaseObjects.None,
  },
  ['FinalizationRegistry.prototype.unregister']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['unregisterToken', ParameterType.WeakKey]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ INTL

const intlBuiltin: BuiltinCollection = {
  ['Intl.getCanonicalLocales']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['locale?', ParameterType.StringOrStringArray]],
    returnValue: ParameterType.StringArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.supportedValuesOf']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['key', ParameterType.String]],
    returnValue: ParameterType.StringArray,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ INTL COLLATOR

const intlCollatorBuiltin: BuiltinCollection = {
  ...inheritFunction('Intl.Collator'),

  [`Intl.Collator`]: {
    type: DefinitionType.Constructor,
    parameters: [],
    returnValue: ParameterType.Collator,
    inheritedFrom: BaseObjects.None,
  },
  [`Intl.Collator.new`]: {
    type: DefinitionType.Constructor,
    parameters: [],
    returnValue: ParameterType.Collator,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Collator.prototype.compare']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['x', ParameterType.String],
      ['y', ParameterType.String],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Collator.prototype.resolvedOptions']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.ResolvedCollatorOptions,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Collator.supportedLocalesOf']: [
    {
      type: DefinitionType.StaticMethod,
      parameters: [['locales?', ParameterType.StringOrStringArray]],
      returnValue: ParameterType.StringArray,
      inheritedFrom: BaseObjects.None,
    },
    {
      type: DefinitionType.StaticMethod,
      parameters: [
        ['locales?', ParameterType.StringOrStringArray],
        ['options', ParameterType.CollatorOptions],
      ],
      returnValue: ParameterType.StringArray,
      inheritedFrom: BaseObjects.None,
    },
  ],
};

// MARK: ✅ INTL DATETIME FORMAT

const intlDateTimeFormatBuiltin: BuiltinCollection = {
  ...inheritFunction('Intl.DateTimeFormat'),

  [`Intl.DateTimeFormat`]: {
    type: DefinitionType.Constructor,
    parameters: [
      ['locales?', ParameterType.StringOrStringArray],
      ['options?', ParameterType.DateTimeFormatOptions],
    ],
    returnValue: ParameterType.DateTimeFormat,
    inheritedFrom: BaseObjects.None,
  },
  [`Intl.DateTimeFormat.new`]: {
    type: DefinitionType.Constructor,
    parameters: [
      ['locales?', ParameterType.StringOrStringArray],
      ['options?', ParameterType.DateTimeFormatOptions],
    ],
    returnValue: ParameterType.DateTimeFormat,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.DateTimeFormat.supportedLocalesOf']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['locales', ParameterType.LocalesArgument],
      ['options?', ParameterType.DateTimeFormatOptions],
    ],
    returnValue: ParameterType.StringArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.DateTimeFormat.prototype.format']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['date?', ParameterType.DateOrNumber]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.DateTimeFormat.prototype.formatRange']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['startDate', ParameterType.DateOrNumberOrBigInt],
      ['endDate', ParameterType.DateOrNumberOrBigInt],
    ],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.DateTimeFormat.prototype.formatRangeToParts']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['startDate', ParameterType.DateOrNumberOrBigInt],
      ['endDate', ParameterType.DateOrNumberOrBigInt],
    ],
    returnValue: ParameterType.DateTimeRangeFormatPartArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.DateTimeFormat.prototype.formatToParts']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['date?', ParameterType.DateOrNumber]],
    returnValue: ParameterType.DateTimeFormatPartArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.DateTimeFormat.prototype.resolvedOptions']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.ResolvedDateTimeFormatOptions,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ INTL DISPLAY NAMES

const intlDisplayNamesBuiltin: BuiltinCollection = {
  ...inheritFunction('Intl.DisplayNames'),

  [`Intl.DisplayNames.new`]: {
    type: DefinitionType.Constructor,
    parameters: [
      ['locales', ParameterType.LocalesArgument],
      ['options?', ParameterType.DisplayNamesOptions],
    ],
    returnValue: ParameterType.DisplayNames,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.DisplayNames.supportedLocalesOf']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['locales', ParameterType.LocalesArgument],
      ['options?', ParameterType.DisplayNamesOptions],
    ],
    returnValue: ParameterType.StringArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.DisplayNames.prototype.of']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['code', ParameterType.String]],
    returnValue: ParameterType.StringOrUndefined,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.DisplayNames.prototype.resolvedOptions']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.ResolvedDisplayNamesOptions,
    inheritedFrom: BaseObjects.None,
  },
  // Intl.DisplayNames.call takes 3 arguments
  [`Intl.DisplayNames.call`]: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['thisArg', ParameterType.Any],
      ['fnArg1', ParameterType.Any],
      ['fnArg2', ParameterType.Any],
    ],
    returnValue: ParameterType.Any,
    inheritedFrom: BaseObjects.Function,
  },
};

// MARK: ✅ INTL LIST FORMAT

const intlListFormatBuiltin: BuiltinCollection = {
  ...inheritFunction('Intl.ListFormat'),

  [`Intl.ListFormat.new`]: {
    type: DefinitionType.Constructor,
    parameters: [
      ['locales', ParameterType.LocalesArgument],
      ['options?', ParameterType.ListFormatOptions],
    ],
    returnValue: ParameterType.ListFormat,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.ListFormat.supportedLocalesOf']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['locales?', ParameterType.StringOrStringArray],
      ['options?', ParameterType.ListFormatOptions],
    ],
    returnValue: ParameterType.StringArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.ListFormat.prototype.format']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['list', ParameterType.StringArray]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.ListFormat.prototype.formatToParts']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['list', ParameterType.StringArray]],
    returnValue: ParameterType.ListFormatPartArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.ListFormat.prototype.resolvedOptions']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.ResolvedListFormatOptions,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ INTL LOCALE

const intlLocaleBuiltin: BuiltinCollection = {
  ...inheritFunction('Intl.Locale'),

  // new (tag: UnicodeBCP47LocaleIdentifier | Locale, options?: LocaleOptions): Locale;
  [`Intl.Locale.new`]: {
    type: DefinitionType.Constructor,
    parameters: [
      ['tag', ParameterType.UnicodeBCP47LocaleIdentifierOrLocale],
      ['options?', ParameterType.LocaleOptions],
    ],
    returnValue: ParameterType.Locale,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Locale.prototype.getCalendars']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.StringArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Locale.prototype.getCollations']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.StringArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Locale.prototype.getHourCycles']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.StringArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Locale.prototype.getNumberingSystems']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.StringArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Locale.prototype.getTextInfo']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.TextInfo,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Locale.prototype.getTimeZones']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.StringArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Locale.prototype.getWeekInfo']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.WeekInfo,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Locale.prototype.maximize']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Locale,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Locale.prototype.minimize']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Locale,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Locale.prototype.baseName']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Locale.prototype.calendar']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Locale.prototype.caseFirst']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Locale.prototype.collation']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Locale.prototype.hourCycle']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Locale.prototype.language']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Locale.prototype.numberingSystem']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Locale.prototype.numeric']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Locale.prototype.region']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Locale.prototype.script']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ INTL NUMBER FORMAT

const intlNumberFormatBuiltin: BuiltinCollection = {
  ...inheritFunction('Intl.NumberFormat'),

  [`Intl.NumberFormat`]: {
    type: DefinitionType.Constructor,
    parameters: [
      ['locales?', ParameterType.StringOrStringArray],
      ['options?', ParameterType.NumberFormatOptions],
    ],
    returnValue: ParameterType.NumberFormat,
    inheritedFrom: BaseObjects.None,
  },
  [`Intl.NumberFormat.new`]: {
    type: DefinitionType.Constructor,
    parameters: [
      ['locales?', ParameterType.StringOrStringArray],
      ['options?', ParameterType.NumberFormatOptions],
    ],
    returnValue: ParameterType.NumberFormat,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.NumberFormat.supportedLocalesOf']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['locales?', ParameterType.StringOrStringArray],
      ['options?', ParameterType.NumberFormatOptions],
    ],
    returnValue: ParameterType.StringArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.NumberFormat.prototype.format']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['number', ParameterType.Number]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.NumberFormat.prototype.formatRange']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['startRange', ParameterType.Number],
      ['endRange', ParameterType.Number],
    ],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.NumberFormat.prototype.formatRangeToParts']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['startRange', ParameterType.Number],
      ['endRange', ParameterType.Number],
    ],
    returnValue: ParameterType.DateTimeRangeFormatPartArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.NumberFormat.prototype.formatToParts']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['number', ParameterType.Number]],
    returnValue: ParameterType.NumberFormatPartArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.NumberFormat.prototype.resolvedOptions']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.ResolvedNumberFormatOptions,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ INTL PLURAL RULES

const intlPluralRulesBuiltin: BuiltinCollection = {
  ...inheritFunction('Intl.PluralRules'),

  [`Intl.PluralRules`]: {
    type: DefinitionType.Constructor,
    parameters: [
      ['locales?', ParameterType.StringOrStringArray],
      ['options?', ParameterType.PluralRulesOptions],
    ],
    returnValue: ParameterType.PluralRules,
    inheritedFrom: BaseObjects.None,
  },
  [`Intl.PluralRules.new`]: {
    type: DefinitionType.Constructor,
    parameters: [
      ['locales?', ParameterType.StringOrStringArray],
      ['options?', ParameterType.PluralRulesOptions],
    ],
    returnValue: ParameterType.PluralRules,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.PluralRules.supportedLocalesOf']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['locales?', ParameterType.StringOrStringArray],
      ['options?', ParameterType.PluralRulesOptions],
    ],
    returnValue: ParameterType.StringArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.PluralRules.prototype.resolvedOptions']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.ResolvedPluralRulesOptions,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.PluralRules.prototype.select']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['number', ParameterType.Number]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.PluralRules.prototype.selectRange']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['startRange', ParameterType.Number],
      ['endRange', ParameterType.Number],
    ],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ INTL RELATIVE TIME FORMAT

const intlRelativeTimeFormatBuiltin: BuiltinCollection = {
  ...inheritFunction('Intl.RelativeTimeFormat'),

  [`Intl.RelativeTimeFormat.new`]: {
    type: DefinitionType.Constructor,
    parameters: [
      ['locales?', ParameterType.StringOrStringArray],
      ['options?', ParameterType.RelativeTimeFormatOptions],
    ],
    returnValue: ParameterType.RelativeTimeFormat,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.RelativeTimeFormat.supportedLocalesOf']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['locales', ParameterType.LocalesArgument],
      ['options?', ParameterType.RelativeTimeFormatOptions],
    ],
    returnValue: ParameterType.StringArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.RelativeTimeFormat.prototype.format']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['value', ParameterType.Number],
      ['unit', ParameterType.String],
    ],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.RelativeTimeFormat.prototype.formatToParts']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['value', ParameterType.Number],
      ['unit', ParameterType.String],
    ],
    returnValue: ParameterType.RelativeTimeFormatPartArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.RelativeTimeFormat.prototype.resolvedOptions']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.ResolvedRelativeTimeFormatOptions,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ INTL SEGMENTER

const intlSegmenterBuiltin: BuiltinCollection = {
  ...inheritFunction('Intl.Segmenter'),

  [`Intl.Segmenter.new`]: {
    type: DefinitionType.Constructor,
    parameters: [
      ['locales?', ParameterType.StringOrStringArray],
      ['options?', ParameterType.SegmenterOptions],
    ],
    returnValue: ParameterType.Segmenter,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Segmenter.supportedLocalesOf']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['locales', ParameterType.LocalesArgument],
      ['options?', ParameterType.SegmenterOptions],
    ],
    returnValue: ParameterType.StringArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Segmenter.prototype.resolvedOptions']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.ResolvedSegmenterOptions,
    inheritedFrom: BaseObjects.None,
  },
  ['Intl.Segmenter.prototype.segment']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['input', ParameterType.String]],
    returnValue: ParameterType.SegmentIterator,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ JSON

const jsonBuiltin: BuiltinCollection = {
  ['JSON.parse']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['text', ParameterType.String],
      ['reviver?', ParameterType.ReviverFunction],
    ],
    returnValue: ParameterType.Any,
    inheritedFrom: BaseObjects.None,
  },
  ['JSON.stringify']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['value', ParameterType.Any],
      ['replacer?', ParameterType.Replacer],
      ['space?', ParameterType.StringOrNumber],
    ],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ MAP

const mapBuiltin: BuiltinCollection = {
  ...inheritFunction('Map'),

  [`Map.new`]: [
    {
      type: DefinitionType.Constructor,
      parameters: [],
      returnValue: ParameterType.UntypedMap,
      inheritedFrom: BaseObjects.None,
    },
    {
      type: DefinitionType.Constructor,
      parameters: [
        ['entries?', ParameterType.KeyValuePairsOrNull],
      ],
      returnValue: ParameterType.Map,
      inheritedFrom: BaseObjects.None,
    },
  ],
  ['Map.prototype.delete']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['key', ParameterType.Any]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['Map.prototype.entries']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.IterableIteratorKV,
    inheritedFrom: BaseObjects.None,
  },
  ['Map.prototype.forEach']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['callback', ParameterType.MapForEachCallbackFunction],
      ['thisArg?', ParameterType.Any],
    ],
    returnValue: ParameterType.Void,
    inheritedFrom: BaseObjects.None,
  },
  ['Map.prototype.get']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['key', ParameterType.Any]],
    returnValue: ParameterType.Any,
    inheritedFrom: BaseObjects.None,
  },
  ['Map.prototype.has']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['key', ParameterType.Any]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['Map.prototype.keys']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.IterableIteratorK,
    inheritedFrom: BaseObjects.None,
  },
  ['Map.prototype.set']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['key', ParameterType.Any],
      ['value', ParameterType.Any],
    ],
    returnValue: ParameterType.Map,
    inheritedFrom: BaseObjects.None,
  },
  ['Map.prototype.values']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.IterableIteratorV,
    inheritedFrom: BaseObjects.None,
  },
  ['Map.prototype[Symbol.iterator]']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.IterableIteratorKV,
    inheritedFrom: BaseObjects.None,
  },
  ['Map.prototype.size']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ MATH

const mathBuiltin: BuiltinCollection = {
  ['Math.abs']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.acos']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.acosh']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.asin']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.asinh']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.atan']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.atan2']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['y', ParameterType.Number],
      ['x', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.atanh']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.cbrt']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.ceil']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.clz32']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.cos']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.cosh']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.exp']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.expm1']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.floor']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.fround']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.hypot']: {
    type: DefinitionType.StaticMethod,
    parameters: [['...values', ParameterType.NumberArray]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.imul']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['a', ParameterType.Number],
      ['b', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.log']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.log10']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.log1p']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.log2']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.max']: {
    type: DefinitionType.StaticMethod,
    parameters: [['...values', ParameterType.NumberArray]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.min']: {
    type: DefinitionType.StaticMethod,
    parameters: [['...values', ParameterType.NumberArray]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.pow']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['base', ParameterType.Number],
      ['exponent', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.random']: {
    type: DefinitionType.StaticMethod,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.round']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.sign']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.sin']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.sinh']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.sqrt']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.tan']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.tanh']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.trunc']: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  // Map Static Properties
  ['Math.E']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.LN10']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.LN2']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.LOG10E']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.LOG2E']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.PI']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.SQRT1_2']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Math.SQRT2']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ NUMBER

const numberBuiltin: BuiltinCollection = {
  ...inheritFunction('Number'),

  [`Number`]: {
    type: DefinitionType.Constructor,
    parameters: [['value', ParameterType.Any]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  [`Number.new`]: {
    type: DefinitionType.Constructor,
    parameters: [['value', ParameterType.Any]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },

  ['Number.isFinite']: {
    type: DefinitionType.StaticMethod,
    parameters: [['value', ParameterType.Any]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['Number.isInteger']: {
    type: DefinitionType.StaticMethod,
    parameters: [['value', ParameterType.Any]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['Number.isNaN']: {
    type: DefinitionType.StaticMethod,
    parameters: [['value', ParameterType.Any]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['Number.isSafeInteger']: {
    type: DefinitionType.StaticMethod,
    parameters: [['value', ParameterType.Any]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['Number.parseFloat']: {
    type: DefinitionType.StaticMethod,
    parameters: [['string', ParameterType.String]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Number.parseInt']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['string', ParameterType.String],
      ['radix?', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  // Number Static properties
  ['Number.EPSILON']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Number.MAX_SAFE_INTEGER']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Number.MAX_VALUE']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Number.MIN_SAFE_INTEGER']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Number.MIN_VALUE']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Number.NaN']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Number.NEGATIVE_INFINITY']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['Number.POSITIVE_INFINITY']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  // Number Instance methods
  ['Number.prototype.toExponential']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['fractionDigits?', ParameterType.Number]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Number.prototype.toFixed']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['digits?', ParameterType.Number]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Number.prototype.toPrecision']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['precision?', ParameterType.Number]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ OBJECT

const objectBuiltin: BuiltinCollection = {
  [`Object`]: {
    type: DefinitionType.Constructor,
    parameters: [['value', ParameterType.Any]],
    returnValue: ParameterType.Object,
    inheritedFrom: BaseObjects.None,
  },
  [`Object.new`]: {
    type: DefinitionType.Constructor,
    parameters: [['value', ParameterType.Any]],
    returnValue: ParameterType.Object,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.assign']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['target', ParameterType.Object],
      ['...sources', ParameterType.ObjectArray],
    ],
    returnValue: ParameterType.Object,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.create']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['o', ParameterType.ObjectOrNull],
      ['properties', ParameterType.PropertyDescriptorMap],
    ],
    returnValue: ParameterType.Object,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.defineProperties']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['o', ParameterType.T],
      ['properties', ParameterType.PropertyDescriptorMap],
    ],
    returnValue: ParameterType.T,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.defineProperty']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['o', ParameterType.Object],
      ['property', ParameterType.StringOrNumberOrSymbol],
      ['descriptor', ParameterType.Object],
    ],
    returnValue: ParameterType.Object,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.entries']: {
    type: DefinitionType.StaticMethod,
    parameters: [['o', ParameterType.PlainObjectTOrArrayLikeT]],
    returnValue: ParameterType.KeyValueTArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.freeze']: {
    type: DefinitionType.StaticMethod,
    parameters: [['o', ParameterType.Object]],
    returnValue: ParameterType.Object,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.fromEntries']: [
    {
      type: DefinitionType.StaticMethod,
      parameters: [['iterable', ParameterType.IterableKV]],
      returnValue: ParameterType.Object,
      inheritedFrom: BaseObjects.None,
    },
    {
      type: DefinitionType.StaticMethod,
      parameters: [['iterable', ParameterType.IterableAny]],
      returnValue: ParameterType.PlainObject,
      inheritedFrom: BaseObjects.None,
    },
  ],
  ['Object.getOwnPropertyDescriptor']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['o', ParameterType.Object],
      ['p', ParameterType.StringOrNumberOrSymbol],
    ],
    returnValue: ParameterType.PropertyDescriptorOrUndefined,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.getOwnPropertyDescriptors']: {
    type: DefinitionType.StaticMethod,
    parameters: [['obj', ParameterType.Object]],
    returnValue: ParameterType.Object,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.getOwnPropertyNames']: {
    type: DefinitionType.StaticMethod,
    parameters: [['o', ParameterType.Any]],
    returnValue: ParameterType.StringArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.getOwnPropertySymbols']: {
    type: DefinitionType.StaticMethod,
    parameters: [['o', ParameterType.Object]],
    returnValue: ParameterType.SymbolArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.getPrototypeOf']: {
    type: DefinitionType.StaticMethod,
    parameters: [['o', ParameterType.Object]],
    returnValue: ParameterType.Object,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.groupBy']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['items', ParameterType.IterableT],
      ['keySelector', ParameterType.KeySelectorFunction],
    ],
    returnValue: ParameterType.PlainObjectWithTArrayValues,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.hasOwn']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['o', ParameterType.Object],
      ['v', ParameterType.StringOrNumberOrSymbol],
    ],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.is']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['value1', ParameterType.Any],
      ['value2', ParameterType.Any],
    ],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.isExtensible']: {
    type: DefinitionType.StaticMethod,
    parameters: [['o', ParameterType.Any]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.isFrozen']: {
    type: DefinitionType.StaticMethod,
    parameters: [['o', ParameterType.Any]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.isSealed']: {
    type: DefinitionType.StaticMethod,
    parameters: [['o', ParameterType.Any]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.keys']: {
    type: DefinitionType.StaticMethod,
    parameters: [['o', ParameterType.Object]],
    returnValue: ParameterType.StringArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.preventExtensions']: {
    type: DefinitionType.StaticMethod,
    parameters: [['o', ParameterType.T]],
    returnValue: ParameterType.T,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.seal']: {
    type: DefinitionType.StaticMethod,
    parameters: [['o', ParameterType.T]],
    returnValue: ParameterType.T,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.setPrototypeOf']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['o', ParameterType.Any],
      ['proto', ParameterType.ObjectOrNull],
    ],
    returnValue: ParameterType.Any,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.values']: {
    type: DefinitionType.StaticMethod,
    parameters: [['o', ParameterType.PlainObjectTOrArrayLikeT]],
    returnValue: ParameterType.TArray,
    inheritedFrom: BaseObjects.None,
  },
  // ['Object.prototype.hasOwnProperty']: {
  //   type: DefinitionType.InstanceMethod,
  //   parameters: [['v', ParameterType.StringOrNumberOrSymbol]],
  //   returnValue: ParameterType.Boolean,
  //   inheritedFrom: BuiltinObject.None,
  // },
  // ['Object.prototype.isPrototypeOf']: {
  //   type: DefinitionType.InstanceMethod,
  //   parameters: [['v', ParameterType.Object]],
  //   returnValue: ParameterType.Boolean,
  //   inheritedFrom: BuiltinObject.None,
  // },
  // ['Object.prototype.propertyIsEnumerable']: {
  //   type: DefinitionType.InstanceMethod,
  //   parameters: [['v', ParameterType.StringOrNumberOrSymbol]],
  //   returnValue: ParameterType.Boolean,
  //   inheritedFrom: BuiltinObject.None,
  // },
  ['Object.prototype.toLocaleString']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.prototype.toString']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.prototype.valueOf']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Object,
    inheritedFrom: BaseObjects.None,
  },
  ['Object.prototype.constructor']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.Function,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ PROMISE

const promiseBuiltin: BuiltinCollection = {
  ...inheritFunction('Promise'),

  ['Promise.new']: {
    type: DefinitionType.Constructor,
    parameters: [['executor', ParameterType.PromiseExecutorFunction]],
    returnValue: ParameterType.PromiseT,
    inheritedFrom: BaseObjects.None,
  },
  ['Promise.all']: {
    type: DefinitionType.StaticMethod,
    parameters: [['values', ParameterType.TArray]],
    returnValue: ParameterType.PromiseMap,
    inheritedFrom: BaseObjects.None,
  },
  ['Promise.allSettled']: {
    type: DefinitionType.StaticMethod,
    parameters: [['values', ParameterType.TArray]],
    returnValue: ParameterType.PromiseMap,
    inheritedFrom: BaseObjects.None,
  },
  ['Promise.any']: {
    type: DefinitionType.StaticMethod,
    parameters: [['values', ParameterType.TArray]],
    returnValue: ParameterType.PromiseAwaitedT,
    inheritedFrom: BaseObjects.None,
  },
  ['Promise.race']: {
    type: DefinitionType.StaticMethod,
    parameters: [['values', ParameterType.IterableTOrPromiseLikeT]],
    returnValue: ParameterType.PromiseAwaitedT,
    inheritedFrom: BaseObjects.None,
  },
  ['Promise.reject']: {
    type: DefinitionType.StaticMethod,
    parameters: [['reason', ParameterType.Any]],
    returnValue: ParameterType.PromiseAwaitedT,
    inheritedFrom: BaseObjects.None,
  },
  ['Promise.resolve']: {
    type: DefinitionType.StaticMethod,
    parameters: [['value', ParameterType.Any]],
    returnValue: ParameterType.PromiseT,
    inheritedFrom: BaseObjects.None,
  },
  ['Promise.prototype.catch']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['onRejected', ParameterType.PromiseRejectedCallback]],
    returnValue: ParameterType.PromiseT,
    inheritedFrom: BaseObjects.None,
  },
  ['Promise.prototype.finally']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['onFinally', ParameterType.PromiseFinallyCallback]],
    returnValue: ParameterType.PromiseT,
    inheritedFrom: BaseObjects.None,
  },
  ['Promise.prototype.then']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['onFulfilled', ParameterType.PromiseFulfilledCallback],
      ['onRejected', ParameterType.PromiseRejectedCallback],
    ],
    returnValue: ParameterType.PromiseT,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ PROXY

const proxyBuiltin: BuiltinCollection = {
  [`Proxy.new`]: {
    type: DefinitionType.Constructor,
    parameters: [
      ['target', ParameterType.Object],
      ['handler', ParameterType.PlainObject],
    ],
    returnValue: ParameterType.Object,
    inheritedFrom: BaseObjects.None,
  },
  [`Proxy.revocable`]: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['target', ParameterType.Object],
      ['handler', ParameterType.PlainObject],
    ],
    returnValue: ParameterType.RevocableProxy,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ REFLECT

const reflectBuiltin: BuiltinCollection = {
  ['Reflect.apply']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['target', ParameterType.ApplyTargetFunction],
      ['thisArgument', ParameterType.T],
      ['argumentsList', ParameterType.AnyArray],
    ],
    returnValue: ParameterType.Any,
    inheritedFrom: BaseObjects.None,
  },
  ['Reflect.construct']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['target', ParameterType.ConstructTargetFunction],
      ['argumentsList', ParameterType.AnyArray],
      ['newTarget?', ParameterType.ConstructTargetFunction],
    ],
    returnValue: ParameterType.Any,
    inheritedFrom: BaseObjects.None,
  },
  ['Reflect.defineProperty']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['o', ParameterType.Object],
      ['property', ParameterType.StringOrNumberOrSymbol],
      ['descriptor', ParameterType.Object],
    ],
    returnValue: ParameterType.Any,
    inheritedFrom: BaseObjects.None,
  },
  ['Reflect.deleteProperty']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['target', ParameterType.Object],
      ['propertyKey', ParameterType.StringOrNumberOrSymbol],
      // ['attributes', ParameterType.PropertyDescriptor],
    ],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['Reflect.get']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['target', ParameterType.Object],
      ['propertyKey', ParameterType.StringOrNumberOrSymbol],
      ['receiver?', ParameterType.Any],
    ],
    returnValue: ParameterType.Any,
    inheritedFrom: BaseObjects.None,
  },
  ['Reflect.getOwnPropertyDescriptor']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['target', ParameterType.Object],
      ['propertyKey', ParameterType.StringOrNumberOrSymbol],
    ],
    returnValue: ParameterType.PropertyDescriptorOrUndefined,
    inheritedFrom: BaseObjects.None,
  },
  ['Reflect.getPrototypeOf']: {
    type: DefinitionType.StaticMethod,
    parameters: [['target', ParameterType.Object]],
    returnValue: ParameterType.ObjectOrNull,
    inheritedFrom: BaseObjects.None,
  },
  ['Reflect.has']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['target', ParameterType.Object],
      ['propertyKey', ParameterType.StringOrNumberOrSymbol],
    ],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['Reflect.isExtensible']: {
    type: DefinitionType.StaticMethod,
    parameters: [['target', ParameterType.Object]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['Reflect.ownKeys']: {
    type: DefinitionType.StaticMethod,
    parameters: [['target', ParameterType.Object]],
    returnValue: ParameterType.StringOrSymbolArray,
    inheritedFrom: BaseObjects.None,
  },
  ['Reflect.preventExtensions']: {
    type: DefinitionType.StaticMethod,
    parameters: [['target', ParameterType.Object]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['Reflect.set']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['target', ParameterType.Object],
      ['propertyKey', ParameterType.StringOrNumberOrSymbol],
      ['value', ParameterType.Any],
      ['receiver?', ParameterType.Any],
    ],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['Reflect.setPrototypeOf']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['target', ParameterType.Object],
      ['proto', ParameterType.ObjectOrNull],
    ],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ REGEXP

const regexpBuiltin: BuiltinCollection = {
  ...inheritFunction('RegExp'),

  [`RegExp`]: {
    type: DefinitionType.Constructor,
    parameters: [
      ['pattern', ParameterType.StringOrRegExp],
      ['flags?', ParameterType.String],
    ],
    returnValue: ParameterType.RegExp,
    inheritedFrom: BaseObjects.None,
  },
  [`RegExp.new`]: {
    type: DefinitionType.Constructor,
    parameters: [
      ['pattern', ParameterType.StringOrRegExp],
      ['flags?', ParameterType.String],
    ],
    returnValue: ParameterType.RegExp,
    inheritedFrom: BaseObjects.None,
  },
  ['RegExp.prototype.exec']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['string', ParameterType.String]],
    returnValue: ParameterType.RegExpExecArray,
    inheritedFrom: BaseObjects.None,
  },
  ['RegExp.prototype[Symbol.match]']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['string', ParameterType.String]],
    returnValue: ParameterType.RegExpExecArray,
    inheritedFrom: BaseObjects.None,
  },
  ['RegExp.prototype[Symbol.matchAll]']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['string', ParameterType.String]],
    returnValue: ParameterType.RegExpMatchArray,
    inheritedFrom: BaseObjects.None,
  },
  ['RegExp.prototype[Symbol.replace]']: [
    {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['string', ParameterType.String],
        ['replaceValue', ParameterType.String],
      ],
      returnValue: ParameterType.String,
      inheritedFrom: BaseObjects.None,
    },
    {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['string', ParameterType.String],
        ['replaceValue', ParameterType.ReplacerFunction],
      ],
      returnValue: ParameterType.String,
      inheritedFrom: BaseObjects.None,
    },
  ],
  ['RegExp.prototype[Symbol.search]']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['string', ParameterType.String]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['RegExp.prototype[Symbol.split]']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['string', ParameterType.String],
      ['limit?', ParameterType.Number],
    ],
    returnValue: ParameterType.StringArray,
    inheritedFrom: BaseObjects.None,
  },
  ['RegExp.prototype.test']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['string', ParameterType.String]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['RegExp.prototype.dotAll']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['RegExp.prototype.flags']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['RegExp.prototype.global']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['RegExp.prototype.hasIndices']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['RegExp.prototype.ignoreCase']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['RegExp.prototype.lastIndex']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['RegExp.prototype.multiline']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['RegExp.prototype.source']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['RegExp.prototype.sticky']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['RegExp.prototype.unicode']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['RegExp.prototype.unicodeSets']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ SET

const setBuiltin: BuiltinCollection = {
  ...inheritFunction('Set'),

  [`Set.new`]: {
    type: DefinitionType.Constructor,
    parameters: [['iterable?', ParameterType.IterableTOrNull]],
    returnValue: ParameterType.SetT,
    inheritedFrom: BaseObjects.None,
  },
  ['Set.prototype.add']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['value', ParameterType.T]],
    returnValue: ParameterType.SetT,
    inheritedFrom: BaseObjects.None,
  },
  ['Set.prototype.clear']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Void,
    inheritedFrom: BaseObjects.None,
  },
  ['Set.prototype.delete']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['value', ParameterType.T]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['Set.prototype.entries']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.IterableIteratorTT,
    inheritedFrom: BaseObjects.None,
  },
  ['Set.prototype.forEach']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['callbackfn', ParameterType.SetForEachCallback],
      ['thisArg?', ParameterType.Any],
    ],
    returnValue: ParameterType.Void,
    inheritedFrom: BaseObjects.None,
  },
  ['Set.prototype.has']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['value', ParameterType.T]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['Set.prototype.keys']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.IterableIteratorK,
    inheritedFrom: BaseObjects.None,
  },
  ['Set.prototype.values']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.IterableIteratorV,
    inheritedFrom: BaseObjects.None,
  },
  ['Set.prototype[Symbol.iterator]']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.IterableIteratorT,
    inheritedFrom: BaseObjects.None,
  },
  ['Set.prototype.size']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ SHARED ARRAY BUFFER

const sharedArrayBufferBuiltin: BuiltinCollection = {
  ...inheritFunction('SharedArrayBuffer'),

  [`SharedArrayBuffer.new`]: {
    type: DefinitionType.Constructor,
    parameters: [['byteLength', ParameterType.Number]],
    returnValue: ParameterType.SharedArrayBuffer,
    inheritedFrom: BaseObjects.None,
  },
  ['SharedArrayBuffer.prototype.slice']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['begin', ParameterType.Number],
      ['end?', ParameterType.Number],
    ],
    returnValue: ParameterType.SharedArrayBuffer,
    inheritedFrom: BaseObjects.None,
  },
  ['SharedArrayBuffer.prototype.byteLength']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ STRING

const stringBuiltin: BuiltinCollection = {
  ...inheritFunction('String'),

  [`String`]: {
    type: DefinitionType.Constructor,
    parameters: [['value?', ParameterType.Any]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  [`String.new`]: {
    type: DefinitionType.Constructor,
    parameters: [['value?', ParameterType.Any]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['String.fromCharCode']: {
    type: DefinitionType.StaticMethod,
    parameters: [['...codeUnits', ParameterType.NumberArray]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['String.fromCodePoint']: {
    type: DefinitionType.StaticMethod,
    parameters: [['...codePoints', ParameterType.NumberArray]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.at']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['index', ParameterType.Number]],
    returnValue: ParameterType.StringOrUndefined,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.charAt']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['index', ParameterType.Number]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.charCodeAt']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['index', ParameterType.Number]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.codePointAt']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['index', ParameterType.Number]],
    returnValue: ParameterType.NumberOrUndefined,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.concat']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['...strings', ParameterType.StringArray]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.endsWith']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['searchString', ParameterType.String],
      ['length?', ParameterType.Number],
    ],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.includes']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['searchString', ParameterType.String],
      ['position?', ParameterType.Number],
    ],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.indexOf']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['searchString', ParameterType.String],
      ['position?', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.isWellFormed']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.lastIndexOf']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['searchString', ParameterType.String],
      ['position?', ParameterType.Number],
    ],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.length']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.localeCompare']: [
    {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['that', ParameterType.String],
      ],
      returnValue: ParameterType.Number,
      inheritedFrom: BaseObjects.None,
    },
    {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['that', ParameterType.String],
        ['locales?', ParameterType.StringOrStringArray],
        ['options', ParameterType.CollatorOptions],
      ],
      returnValue: ParameterType.Number,
      inheritedFrom: BaseObjects.None,
    },
    {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['that', ParameterType.String],
        ['locales?', ParameterType.LocalesArgument],
        ['options?', ParameterType.CollatorOptions],
      ],
      returnValue: ParameterType.Number,
      inheritedFrom: BaseObjects.None,
    },
  ],
  ['String.prototype.match']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['regexp', ParameterType.StringOrRegExp]],
    returnValue: ParameterType.RegExpMatchArray,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.matchAll']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['regexp', ParameterType.RegExpString]],
    returnValue: ParameterType.RegExpMatchArray,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.normalize']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['form?', ParameterType.String]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.padEnd']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['maxLength', ParameterType.Number],
      ['fillString?', ParameterType.String],
    ],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.padStart']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['maxLength', ParameterType.Number],
      ['fillString?', ParameterType.String],
    ],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.repeat']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['count', ParameterType.Number]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.replace']: [
    {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['string', ParameterType.StringOrRegExp],
        ['replaceValue', ParameterType.String],
      ],
      returnValue: ParameterType.String,
      inheritedFrom: BaseObjects.None,
    },
    {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['string', ParameterType.StringOrRegExp],
        ['replacer', ParameterType.ReplacerFunction],
      ],
      returnValue: ParameterType.String,
      inheritedFrom: BaseObjects.None,
    },
  ],
  ['String.prototype.replaceAll']: [
    {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['string', ParameterType.StringOrRegExp],
        ['replaceValue', ParameterType.String],
      ],
      returnValue: ParameterType.String,
      inheritedFrom: BaseObjects.None,
    },
    {
      type: DefinitionType.InstanceMethod,
      parameters: [
        ['string', ParameterType.StringOrRegExp],
        ['replacer', ParameterType.ReplacerFunction],
      ],
      returnValue: ParameterType.String,
      inheritedFrom: BaseObjects.None,
    },
  ],
  ['String.prototype.search']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['regexp', ParameterType.StringOrRegExp]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.slice']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['start?', ParameterType.Number],
      ['end?', ParameterType.Number],
    ],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.split']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['separator', ParameterType.StringOrRegExp],
      ['limit?', ParameterType.Number],
    ],
    returnValue: ParameterType.StringArray,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.startsWith']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['searchString', ParameterType.String],
      ['position?', ParameterType.Number],
    ],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.toLocaleLowerCase']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['locales', ParameterType.LocalesArgument]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.toLocaleUpperCase']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['locales', ParameterType.LocalesArgument]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.toLowerCase']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.toUpperCase']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.toWellFormed']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.trim']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.trimEnd']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype.trimStart']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  ['String.prototype[Symbol.iterator]']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.IterableIteratorString,
    inheritedFrom: BaseObjects.None,
  },
  ['String.raw']: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['template', ParameterType.TemplateStringsArray],
      ['...substitutions', ParameterType.AnyArray],
    ],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ SYMBOL

const symbolBuiltin: BuiltinCollection = {
  ...inheritFunction('Symbol'),

  [`Symbol`]: {
    type: DefinitionType.Constructor,
    parameters: [['description?', ParameterType.StringOrNumber]],
    returnValue: ParameterType.Symbol,
    inheritedFrom: BaseObjects.None,
  },
  ['Symbol.asyncIterator']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Symbol,
    inheritedFrom: BaseObjects.None,
  },
  ['Symbol.for']: {
    type: DefinitionType.StaticMethod,
    parameters: [['key', ParameterType.String]],
    returnValue: ParameterType.Symbol,
    inheritedFrom: BaseObjects.None,
  },
  ['Symbol.hasInstance']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Symbol,
    inheritedFrom: BaseObjects.None,
  },
  ['Symbol.isConcatSpreadable']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Symbol,
    inheritedFrom: BaseObjects.None,
  },
  ['Symbol.iterator']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Symbol,
    inheritedFrom: BaseObjects.None,
  },
  ['Symbol.keyFor']: {
    type: DefinitionType.StaticMethod,
    parameters: [['sym', ParameterType.Symbol]],
    returnValue: ParameterType.StringOrUndefined,
    inheritedFrom: BaseObjects.None,
  },
  ['Symbol.match']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Symbol,
    inheritedFrom: BaseObjects.None,
  },
  ['Symbol.matchAll']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Symbol,
    inheritedFrom: BaseObjects.None,
  },
  ['Symbol.prototype.description']: {
    type: DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: ParameterType.StringOrUndefined,
    inheritedFrom: BaseObjects.None,
  },
  ['Symbol.prototype[Symbol.toPrimitive]']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['hint', ParameterType.String]],
    returnValue: ParameterType.Any,
    inheritedFrom: BaseObjects.None,
  },
  ['Symbol.replace']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Symbol,
    inheritedFrom: BaseObjects.None,
  },
  ['Symbol.search']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Symbol,
    inheritedFrom: BaseObjects.None,
  },
  // Disable Symbol.species to prevent arbitrary code execution.
  // > Warning: The existence of [Symbol.species] allows execution of arbitrary code and may create security vulnerabilities. It also makes certain
  // > optimizations much harder. Engine implementers are investigating whether to remove this feature. Avoid relying on it if possible.
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/species
  // ['Symbol.species']: {
  //   type: DefinitionType.StaticProperty,
  //   parameters: [],
  //   returnValue: ParameterType.Symbol,
  //   inheritedFrom: BaseObjects.None,
  // },
  ['Symbol.split']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Symbol,
    inheritedFrom: BaseObjects.None,
  },
  ['Symbol.toPrimitive']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Symbol,
    inheritedFrom: BaseObjects.None,
  },
  ['Symbol.toStringTag']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Symbol,
    inheritedFrom: BaseObjects.None,
  },
  ['Symbol.unscopables']: {
    type: DefinitionType.StaticProperty,
    parameters: [],
    returnValue: ParameterType.Symbol,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ WEAK MAP

const weakMapBuiltin: BuiltinCollection = {
  ...inheritFunction('WeakMap'),

  [`WeakMap.new`]: {
    type: DefinitionType.Constructor,
    parameters: [['entries?', ParameterType.IterableIteratorKV]],
    returnValue: ParameterType.WeakMap,
    inheritedFrom: BaseObjects.None,
  },
  ['WeakMap.prototype.delete']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['key', ParameterType.WeakKey]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['WeakMap.prototype.get']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['key', ParameterType.WeakKey]],
    returnValue: ParameterType.TOrUndefined,
    inheritedFrom: BaseObjects.None,
  },
  ['WeakMap.prototype.has']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['key', ParameterType.WeakKey]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['WeakMap.prototype.set']: {
    type: DefinitionType.InstanceMethod,
    parameters: [
      ['key', ParameterType.WeakKey],
      ['value', ParameterType.Any],
    ],
    returnValue: ParameterType.WeakMap,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ WEAK REF

const weakRefBuiltin: BuiltinCollection = {
  ...inheritFunction('WeakRef'),

  [`WeakRef.new`]: {
    type: DefinitionType.Constructor,
    parameters: [['target', ParameterType.WeakKey]],
    returnValue: ParameterType.WeakRefT,
    inheritedFrom: BaseObjects.None,
  },
  ['WeakRef.prototype.deref']: {
    type: DefinitionType.InstanceMethod,
    parameters: [],
    returnValue: ParameterType.TOrUndefined,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ WEAK SET

const weakSetBuiltin: BuiltinCollection = {
  ...inheritFunction('WeakSet'),

  [`WeakSet.new`]: {
    type: DefinitionType.Constructor,
    parameters: [['values', ParameterType.WeakKeyArrayOrNull]],
    returnValue: ParameterType.WeakSet,
    inheritedFrom: BaseObjects.None,
  },
  ['WeakSet.prototype.add']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['value', ParameterType.WeakKey]],
    returnValue: ParameterType.WeakSet,
    inheritedFrom: BaseObjects.None,
  },
  ['WeakSet.prototype.delete']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['value', ParameterType.WeakKey]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  ['WeakSet.prototype.has']: {
    type: DefinitionType.InstanceMethod,
    parameters: [['value', ParameterType.WeakKey]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: ✅ GLOBAL FUNCTIONS

const builtInGlobalFunctions = {
  decodeURI: {
    type: DefinitionType.StaticMethod,
    parameters: [['encodedURI', ParameterType.String]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  decodeURIComponent: {
    type: DefinitionType.StaticMethod,
    parameters: [['encodedURIComponent', ParameterType.String]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  encodeURI: {
    type: DefinitionType.StaticMethod,
    parameters: [['uri', ParameterType.String]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  encodeURIComponent: {
    type: DefinitionType.StaticMethod,
    parameters: [['uriComponent', ParameterType.String]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  eval: {
    type: DefinitionType.StaticMethod,
    parameters: [['x', ParameterType.String]],
    returnValue: ParameterType.Any,
    inheritedFrom: BaseObjects.None,
  },
  isFinite: {
    type: DefinitionType.StaticMethod,
    parameters: [['number', ParameterType.Number]],
    returnValue: ParameterType.Boolean,
    inheritedFrom: BaseObjects.None,
  },
  isNaN: {
    type: DefinitionType.StaticMethod,
    parameters: [['number', ParameterType.String]],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
  parseFloat: {
    type: DefinitionType.StaticMethod,
    parameters: [['string', ParameterType.String]],
    returnValue: ParameterType.Number,
    inheritedFrom: BaseObjects.None,
  },
  parseInt: {
    type: DefinitionType.StaticMethod,
    parameters: [
      ['string', ParameterType.String],
      ['radix?', ParameterType.Number],
    ],
    returnValue: ParameterType.String,
    inheritedFrom: BaseObjects.None,
  },
};

// MARK: EXPORT

export const javascriptDefinitions = {
  ...builtInGlobalFunctions,
  ...aggregateErrorBuiltin,
  ...arrayBuiltin,
  ...arrayBufferBuiltin,
  ...atomicsBuiltin,
  ...bigintBuiltin,
  ...bigint64ArrayBuiltin,
  ...bigUint64ArrayBuiltin,
  ...booleanBuiltin,
  ...dataViewBuiltin,
  ...dateBuiltin,
  ...errorBuiltin,
  ...evalErrorBuiltin,
  ...finalizationRegistryBuiltin,
  ...float32ArrayBuiltin,
  ...float64ArrayBuiltin,
  ...functionBuiltin,
  ...int8ArrayBuiltin,
  ...int16ArrayBuiltin,
  ...int32ArrayBuiltin,
  ...intlBuiltin,
  ...intlCollatorBuiltin,
  ...intlDateTimeFormatBuiltin,
  ...intlDisplayNamesBuiltin,
  ...intlListFormatBuiltin,
  ...intlLocaleBuiltin,
  ...intlNumberFormatBuiltin,
  ...intlPluralRulesBuiltin,
  ...intlRelativeTimeFormatBuiltin,
  ...intlSegmenterBuiltin,
  ...jsonBuiltin,
  ...mapBuiltin,
  ...mathBuiltin,
  ...numberBuiltin,
  ...objectBuiltin,
  ...promiseBuiltin,
  ...proxyBuiltin,
  ...rangeErrorBuiltin,
  ...referenceErrorBuiltin,
  ...reflectBuiltin,
  ...regexpBuiltin,
  ...setBuiltin,
  ...sharedArrayBufferBuiltin,
  ...stringBuiltin,
  ...symbolBuiltin,
  ...syntaxErrorBuiltin,
  ...typeErrorBuiltin,
  ...uriErrorBuiltin,
  ...uint8ArrayBuiltin,
  ...uint16ArrayBuiltin,
  ...uint32ArrayBuiltin,
  ...uint8ClampedArrayBuiltin,
  ...weakMapBuiltin,
  ...weakRefBuiltin,
  ...weakSetBuiltin,
};

// if (import.meta.main) {
//   console.log(JSON.stringify(jsns, null, 2));
// }
