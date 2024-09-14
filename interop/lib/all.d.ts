// deno-lint-ignore-file no-explicit-any no-var no-shadow-restricted-names no-empty-interface ban-types
/// <reference no-default-lib="true"/>
declare var NaN: number;
declare var Infinity: number;
declare function eval(x: string): any;
declare function parseInt(string: string, radix?: number): number;
declare function parseFloat(string: string): number;
declare function isNaN(number: number): boolean;
declare function isFinite(number: number): boolean;
declare function decodeURI(encodedURI: string): string;
declare function decodeURIComponent(encodedURIComponent: string): string;
declare function encodeURI(uri: string): string;
declare function encodeURIComponent(uriComponent: string | number | boolean): string;
declare function escape(string: string): string;
declare function unescape(string: string): string;
interface Symbol {
	toString(): string;
	valueOf(): symbol;
}
declare type PropertyKey = string | number | symbol;
interface PropertyDescriptor {
	configurable?: boolean;
	enumerable?: boolean;
	value?: any;
	writable?: boolean;
	get?(): any;
	set?(v: any): void;
}
interface PropertyDescriptorMap {
	[key: PropertyKey]: PropertyDescriptor;
}
interface Object {
	constructor: Function;
	toString(): string;
	toLocaleString(): string;
	valueOf(): Object;
	hasOwnProperty(v: PropertyKey): boolean;
	isPrototypeOf(v: Object): boolean;
	propertyIsEnumerable(v: PropertyKey): boolean;
}
interface ObjectConstructor {
	new (value?: any): Object;
	(): any;
	(value: any): any;
	readonly prototype: Object;
	getPrototypeOf(o: any): any;
	getOwnPropertyDescriptor(o: any, p: PropertyKey): PropertyDescriptor | undefined;
	getOwnPropertyNames(o: any): string[];
	create(o: object | null): any;
	create(o: object | null, properties: PropertyDescriptorMap & ThisType<any>): any;
	defineProperty<T>(o: T, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>): T;
	defineProperties<T>(o: T, properties: PropertyDescriptorMap & ThisType<any>): T;
	seal<T>(o: T): T;
	freeze<T extends Function>(f: T): T;
	freeze<
		T extends { [idx: string]: U | null | undefined | object },
		U extends string | bigint | number | boolean | symbol,
	>(o: T): Readonly<T>;
	freeze<T>(o: T): Readonly<T>;
	preventExtensions<T>(o: T): T;
	isSealed(o: any): boolean;
	isFrozen(o: any): boolean;
	isExtensible(o: any): boolean;
	keys(o: object): string[];
}
declare var Object: ObjectConstructor;
interface Function {
	apply(this: Function, thisArg: any, argArray?: any): any;
	call(this: Function, thisArg: any, ...argArray: any[]): any;
	bind(this: Function, thisArg: any, ...argArray: any[]): any;
	toString(): string;
	prototype: any;
	readonly length: number;
	// Non-standard extensions
	arguments: any;
	caller: Function;
}
interface FunctionConstructor {
	new (...args: string[]): Function;
	(...args: string[]): Function;
	readonly prototype: Function;
}
declare var Function: FunctionConstructor;
type ThisParameterType<T> = T extends (this: infer U, ...args: never) => any ? U : unknown;
type OmitThisParameter<T> = unknown extends ThisParameterType<T> ? T
	: T extends (...args: infer A) => infer R ? (...args: A) => R
	: T;
interface CallableFunction extends Function {
	apply<T, R>(this: (this: T) => R, thisArg: T): R;
	apply<T, A extends any[], R>(this: (this: T, ...args: A) => R, thisArg: T, args: A): R;
	call<T, A extends any[], R>(this: (this: T, ...args: A) => R, thisArg: T, ...args: A): R;
	bind<T>(this: T, thisArg: ThisParameterType<T>): OmitThisParameter<T>;
	bind<T, A extends any[], B extends any[], R>(
		this: (this: T, ...args: [...A, ...B]) => R,
		thisArg: T,
		...args: A
	): (...args: B) => R;
}
interface NewableFunction extends Function {
	apply<T>(this: new () => T, thisArg: T): void;
	apply<T, A extends any[]>(this: new (...args: A) => T, thisArg: T, args: A): void;
	call<T, A extends any[]>(this: new (...args: A) => T, thisArg: T, ...args: A): void;
	bind<T>(this: T, thisArg: any): T;
	bind<A extends any[], B extends any[], R>(
		this: new (...args: [...A, ...B]) => R,
		thisArg: any,
		...args: A
	): new (...args: B) => R;
}
interface IArguments {
	[index: number]: any;
	length: number;
	callee: Function;
}
interface String {
	toString(): string;
	charAt(pos: number): string;
	charCodeAt(index: number): number;
	concat(...strings: string[]): string;
	indexOf(searchString: string, position?: number): number;
	lastIndexOf(searchString: string, position?: number): number;
	localeCompare(that: string): number;
	match(regexp: string | RegExp): RegExpMatchArray | null;
	replace(searchValue: string | RegExp, replaceValue: string): string;
	replace(searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
	search(regexp: string | RegExp): number;
	slice(start?: number, end?: number): string;
	split(separator: string | RegExp, limit?: number): string[];
	substring(start: number, end?: number): string;
	toLowerCase(): string;
	toLocaleLowerCase(locales?: string | string[]): string;
	toUpperCase(): string;
	toLocaleUpperCase(locales?: string | string[]): string;
	trim(): string;
	readonly length: number;
	// IE extensions
	substr(from: number, length?: number): string;
	valueOf(): string;
	readonly [index: number]: string;
}
interface StringConstructor {
	new (value?: any): String;
	(value?: any): string;
	readonly prototype: String;
	fromCharCode(...codes: number[]): string;
}
declare var String: StringConstructor;
interface Boolean {
	valueOf(): boolean;
}
interface BooleanConstructor {
	new (value?: any): Boolean;
	<T>(value?: T): boolean;
	readonly prototype: Boolean;
}
declare var Boolean: BooleanConstructor;
interface Number {
	toString(radix?: number): string;
	toFixed(fractionDigits?: number): string;
	toExponential(fractionDigits?: number): string;
	toPrecision(precision?: number): string;
	valueOf(): number;
}
interface NumberConstructor {
	new (value?: any): Number;
	(value?: any): number;
	readonly prototype: Number;
	readonly MAX_VALUE: number;
	readonly MIN_VALUE: number;
	readonly NaN: number;
	readonly NEGATIVE_INFINITY: number;
	readonly POSITIVE_INFINITY: number;
}
declare var Number: NumberConstructor;
interface TemplateStringsArray extends ReadonlyArray<string> {
	readonly raw: readonly string[];
}
interface ImportMeta {
}
interface ImportCallOptions {
	with?: ImportAttributes;
}
interface ImportAssertions {
	[key: string]: string;
}
interface ImportAttributes {
	[key: string]: string;
}
interface Math {
	readonly E: number;
	readonly LN10: number;
	readonly LN2: number;
	readonly LOG2E: number;
	readonly LOG10E: number;
	readonly PI: number;
	readonly SQRT1_2: number;
	readonly SQRT2: number;
	abs(x: number): number;
	acos(x: number): number;
	asin(x: number): number;
	atan(x: number): number;
	atan2(y: number, x: number): number;
	ceil(x: number): number;
	cos(x: number): number;
	exp(x: number): number;
	floor(x: number): number;
	log(x: number): number;
	max(...values: number[]): number;
	min(...values: number[]): number;
	pow(x: number, y: number): number;
	random(): number;
	round(x: number): number;
	sin(x: number): number;
	sqrt(x: number): number;
	tan(x: number): number;
}
declare var Math: Math;
interface Date {
	toString(): string;
	toDateString(): string;
	toTimeString(): string;
	toLocaleString(): string;
	toLocaleDateString(): string;
	toLocaleTimeString(): string;
	valueOf(): number;
	getTime(): number;
	getFullYear(): number;
	getUTCFullYear(): number;
	getMonth(): number;
	getUTCMonth(): number;
	getDate(): number;
	getUTCDate(): number;
	getDay(): number;
	getUTCDay(): number;
	getHours(): number;
	getUTCHours(): number;
	getMinutes(): number;
	getUTCMinutes(): number;
	getSeconds(): number;
	getUTCSeconds(): number;
	getMilliseconds(): number;
	getUTCMilliseconds(): number;
	getTimezoneOffset(): number;
	setTime(time: number): number;
	setMilliseconds(ms: number): number;
	setUTCMilliseconds(ms: number): number;
	setSeconds(sec: number, ms?: number): number;
	setUTCSeconds(sec: number, ms?: number): number;
	setMinutes(min: number, sec?: number, ms?: number): number;
	setUTCMinutes(min: number, sec?: number, ms?: number): number;
	setHours(hours: number, min?: number, sec?: number, ms?: number): number;
	setUTCHours(hours: number, min?: number, sec?: number, ms?: number): number;
	setDate(date: number): number;
	setUTCDate(date: number): number;
	setMonth(month: number, date?: number): number;
	setUTCMonth(month: number, date?: number): number;
	setFullYear(year: number, month?: number, date?: number): number;
	setUTCFullYear(year: number, month?: number, date?: number): number;
	toUTCString(): string;
	toISOString(): string;
	toJSON(key?: any): string;
}
interface DateConstructor {
	new (): Date;
	new (value: number | string): Date;
	new (
		year: number,
		monthIndex: number,
		date?: number,
		hours?: number,
		minutes?: number,
		seconds?: number,
		ms?: number,
	): Date;
	(): string;
	readonly prototype: Date;
	parse(s: string): number;
	UTC(
		year: number,
		monthIndex: number,
		date?: number,
		hours?: number,
		minutes?: number,
		seconds?: number,
		ms?: number,
	): number;
	now(): number;
}
declare var Date: DateConstructor;
interface RegExpMatchArray extends Array<string> {
	index?: number;
	input?: string;
	0: string;
}
interface RegExpExecArray extends Array<string> {
	index: number;
	input: string;
	0: string;
}
interface RegExp {
	exec(string: string): RegExpExecArray | null;
	test(string: string): boolean;
	readonly source: string;
	readonly global: boolean;
	readonly ignoreCase: boolean;
	readonly multiline: boolean;
	lastIndex: number;
	// Non-standard extensions
	compile(pattern: string, flags?: string): this;
}
interface RegExpConstructor {
	new (pattern: RegExp | string): RegExp;
	new (pattern: string, flags?: string): RegExp;
	(pattern: RegExp | string): RegExp;
	(pattern: string, flags?: string): RegExp;
	readonly 'prototype': RegExp;
	// Non-standard extensions
	'$1': string;
	'$2': string;
	'$3': string;
	'$4': string;
	'$5': string;
	'$6': string;
	'$7': string;
	'$8': string;
	'$9': string;
	'input': string;
	'$_': string;
	'lastMatch': string;
	'$&': string;
	'lastParen': string;
	'$+': string;
	'leftContext': string;
	'$`': string;
	'rightContext': string;
	"$'": string;
}
declare var RegExp: RegExpConstructor;
interface Error {
	name: string;
	message: string;
	stack?: string;
}
interface ErrorConstructor {
	new (message?: string): Error;
	(message?: string): Error;
	readonly prototype: Error;
}
declare var Error: ErrorConstructor;
interface EvalError extends Error {
}
interface EvalErrorConstructor extends ErrorConstructor {
	new (message?: string): EvalError;
	(message?: string): EvalError;
	readonly prototype: EvalError;
}
declare var EvalError: EvalErrorConstructor;
interface RangeError extends Error {
}
interface RangeErrorConstructor extends ErrorConstructor {
	new (message?: string): RangeError;
	(message?: string): RangeError;
	readonly prototype: RangeError;
}
declare var RangeError: RangeErrorConstructor;
interface ReferenceError extends Error {
}
interface ReferenceErrorConstructor extends ErrorConstructor {
	new (message?: string): ReferenceError;
	(message?: string): ReferenceError;
	readonly prototype: ReferenceError;
}
declare var ReferenceError: ReferenceErrorConstructor;
interface SyntaxError extends Error {
}
interface SyntaxErrorConstructor extends ErrorConstructor {
	new (message?: string): SyntaxError;
	(message?: string): SyntaxError;
	readonly prototype: SyntaxError;
}
declare var SyntaxError: SyntaxErrorConstructor;
interface TypeError extends Error {
}
interface TypeErrorConstructor extends ErrorConstructor {
	new (message?: string): TypeError;
	(message?: string): TypeError;
	readonly prototype: TypeError;
}
declare var TypeError: TypeErrorConstructor;
interface URIError extends Error {
}
interface URIErrorConstructor extends ErrorConstructor {
	new (message?: string): URIError;
	(message?: string): URIError;
	readonly prototype: URIError;
}
declare var URIError: URIErrorConstructor;
interface JSON {
	parse(text: string, reviver?: (this: any, key: string, value: any) => any): any;
	stringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
	stringify(value: any, replacer?: (number | string)[] | null, space?: string | number): string;
}
declare var JSON: JSON;
interface ReadonlyArray<T> {
	readonly length: number;
	toString(): string;
	toLocaleString(): string;
	concat(...items: ConcatArray<T>[]): T[];
	concat(...items: (T | ConcatArray<T>)[]): T[];
	join(separator?: string): string;
	slice(start?: number, end?: number): T[];
	indexOf(searchElement: T, fromIndex?: number): number;
	lastIndexOf(searchElement: T, fromIndex?: number): number;
	every<S extends T>(
		predicate: (value: T, index: number, array: readonly T[]) => value is S,
		thisArg?: any,
	): this is readonly S[];
	every(predicate: (value: T, index: number, array: readonly T[]) => unknown, thisArg?: any): boolean;
	some(predicate: (value: T, index: number, array: readonly T[]) => unknown, thisArg?: any): boolean;
	forEach(callbackfn: (value: T, index: number, array: readonly T[]) => void, thisArg?: any): void;
	map<U>(callbackfn: (value: T, index: number, array: readonly T[]) => U, thisArg?: any): U[];
	filter<S extends T>(predicate: (value: T, index: number, array: readonly T[]) => value is S, thisArg?: any): S[];
	filter(predicate: (value: T, index: number, array: readonly T[]) => unknown, thisArg?: any): T[];
	reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T): T;
	reduce(
		callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T,
		initialValue: T,
	): T;
	reduce<U>(
		callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: readonly T[]) => U,
		initialValue: U,
	): U;
	reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T): T;
	reduceRight(
		callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T,
		initialValue: T,
	): T;
	reduceRight<U>(
		callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: readonly T[]) => U,
		initialValue: U,
	): U;
	readonly [n: number]: T;
}
interface ConcatArray<T> {
	readonly length: number;
	readonly [n: number]: T;
	join(separator?: string): string;
	slice(start?: number, end?: number): T[];
}
interface Array<T> {
	length: number;
	toString(): string;
	toLocaleString(): string;
	pop(): T | undefined;
	push(...items: T[]): number;
	concat(...items: ConcatArray<T>[]): T[];
	concat(...items: (T | ConcatArray<T>)[]): T[];
	join(separator?: string): string;
	reverse(): T[];
	shift(): T | undefined;
	slice(start?: number, end?: number): T[];
	sort(compareFn?: (a: T, b: T) => number): this;
	splice(start: number, deleteCount?: number): T[];
	splice(start: number, deleteCount: number, ...items: T[]): T[];
	unshift(...items: T[]): number;
	indexOf(searchElement: T, fromIndex?: number): number;
	lastIndexOf(searchElement: T, fromIndex?: number): number;
	every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[];
	every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
	some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
	forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
	map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
	filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
	filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
	reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
	reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
	reduce<U>(
		callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U,
		initialValue: U,
	): U;
	reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
	reduceRight(
		callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T,
		initialValue: T,
	): T;
	reduceRight<U>(
		callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U,
		initialValue: U,
	): U;
	[n: number]: T;
}
interface ArrayConstructor {
	new (arrayLength?: number): any[];
	new <T>(arrayLength: number): T[];
	new <T>(...items: T[]): T[];
	(arrayLength?: number): any[];
	<T>(arrayLength: number): T[];
	<T>(...items: T[]): T[];
	isArray(arg: any): arg is any[];
	readonly prototype: any[];
}
declare var Array: ArrayConstructor;
interface TypedPropertyDescriptor<T> {
	enumerable?: boolean;
	configurable?: boolean;
	writable?: boolean;
	value?: T;
	get?: () => T;
	set?: (value: T) => void;
}
declare type PromiseConstructorLike = new <T>(
	executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void,
) => PromiseLike<T>;
interface PromiseLike<T> {
	then<TResult1 = T, TResult2 = never>(
		onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
		onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
	): PromiseLike<TResult1 | TResult2>;
}
interface Promise<T> {
	then<TResult1 = T, TResult2 = never>(
		onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
		onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
	): Promise<TResult1 | TResult2>;
	catch<TResult = never>(
		onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
	): Promise<T | TResult>;
}
type Awaited<T> = T extends null | undefined ? T
	: T extends object & { then(onfulfilled: infer F, ...args: infer _): any } ? F extends ((value: infer V, ...args: infer _) => any) ? Awaited<V> : never
	: T;
interface ArrayLike<T> {
	readonly length: number;
	readonly [n: number]: T;
}
type Partial<T> = {
	[P in keyof T]?: T[P];
};
type Required<T> = {
	[P in keyof T]-?: T[P];
};
type Readonly<T> = {
	readonly [P in keyof T]: T[P];
};
type Pick<T, K extends keyof T> = {
	[P in K]: T[P];
};
type Record<K extends keyof any, T> = {
	[P in K]: T;
};
type Exclude<T, U> = T extends U ? never : T;
type Extract<T, U> = T extends U ? T : never;
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type NonNullable<T> = T & {};
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R
	: any;
type Uppercase<S extends string> = intrinsic;
type Lowercase<S extends string> = intrinsic;
type Capitalize<S extends string> = intrinsic;
type Uncapitalize<S extends string> = intrinsic;
type NoInfer<T> = intrinsic;
interface ThisType<T> {}
interface WeakKeyTypes {
	object: object;
}
type WeakKey = WeakKeyTypes[keyof WeakKeyTypes];
interface ArrayBuffer {
	readonly byteLength: number;
	slice(begin: number, end?: number): ArrayBuffer;
}
interface ArrayBufferTypes {
	ArrayBuffer: ArrayBuffer;
}
type ArrayBufferLike = ArrayBufferTypes[keyof ArrayBufferTypes];
interface ArrayBufferConstructor {
	readonly prototype: ArrayBuffer;
	new (byteLength: number): ArrayBuffer;
	isView(arg: any): arg is ArrayBufferView;
}
declare var ArrayBuffer: ArrayBufferConstructor;
interface ArrayBufferView {
	buffer: ArrayBufferLike;
	byteLength: number;
	byteOffset: number;
}
interface DataView {
	readonly buffer: ArrayBuffer;
	readonly byteLength: number;
	readonly byteOffset: number;
	getFloat32(byteOffset: number, littleEndian?: boolean): number;
	getFloat64(byteOffset: number, littleEndian?: boolean): number;
	getInt8(byteOffset: number): number;
	getInt16(byteOffset: number, littleEndian?: boolean): number;
	getInt32(byteOffset: number, littleEndian?: boolean): number;
	getUint8(byteOffset: number): number;
	getUint16(byteOffset: number, littleEndian?: boolean): number;
	getUint32(byteOffset: number, littleEndian?: boolean): number;
	setFloat32(byteOffset: number, value: number, littleEndian?: boolean): void;
	setFloat64(byteOffset: number, value: number, littleEndian?: boolean): void;
	setInt8(byteOffset: number, value: number): void;
	setInt16(byteOffset: number, value: number, littleEndian?: boolean): void;
	setInt32(byteOffset: number, value: number, littleEndian?: boolean): void;
	setUint8(byteOffset: number, value: number): void;
	setUint16(byteOffset: number, value: number, littleEndian?: boolean): void;
	setUint32(byteOffset: number, value: number, littleEndian?: boolean): void;
}
interface DataViewConstructor {
	readonly prototype: DataView;
	new (buffer: ArrayBufferLike & { BYTES_PER_ELEMENT?: never }, byteOffset?: number, byteLength?: number): DataView;
}
declare var DataView: DataViewConstructor;
interface Int8Array {
	readonly BYTES_PER_ELEMENT: number;
	readonly buffer: ArrayBufferLike;
	readonly byteLength: number;
	readonly byteOffset: number;
	copyWithin(target: number, start: number, end?: number): this;
	every(predicate: (value: number, index: number, array: Int8Array) => unknown, thisArg?: any): boolean;
	fill(value: number, start?: number, end?: number): this;
	filter(predicate: (value: number, index: number, array: Int8Array) => any, thisArg?: any): Int8Array;
	find(predicate: (value: number, index: number, obj: Int8Array) => boolean, thisArg?: any): number | undefined;
	findIndex(predicate: (value: number, index: number, obj: Int8Array) => boolean, thisArg?: any): number;
	forEach(callbackfn: (value: number, index: number, array: Int8Array) => void, thisArg?: any): void;
	indexOf(searchElement: number, fromIndex?: number): number;
	join(separator?: string): string;
	lastIndexOf(searchElement: number, fromIndex?: number): number;
	readonly length: number;
	map(callbackfn: (value: number, index: number, array: Int8Array) => number, thisArg?: any): Int8Array;
	reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array) => number): number;
	reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array) => number, initialValue: number): number;
	reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int8Array) => U, initialValue: U): U;
	reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array) => number): number;
	reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array) => number, initialValue: number): number;
	reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int8Array) => U, initialValue: U): U;
	reverse(): Int8Array;
	set(array: ArrayLike<number>, offset?: number): void;
	slice(start?: number, end?: number): Int8Array;
	some(predicate: (value: number, index: number, array: Int8Array) => unknown, thisArg?: any): boolean;
	sort(compareFn?: (a: number, b: number) => number): this;
	subarray(begin?: number, end?: number): Int8Array;
	toLocaleString(): string;
	toString(): string;
	valueOf(): Int8Array;
	[index: number]: number;
}
interface Int8ArrayConstructor {
	readonly prototype: Int8Array;
	new (length: number): Int8Array;
	new (array: ArrayLike<number> | ArrayBufferLike): Int8Array;
	new (buffer: ArrayBufferLike, byteOffset?: number, length?: number): Int8Array;
	readonly BYTES_PER_ELEMENT: number;
	of(...items: number[]): Int8Array;
	from(arrayLike: ArrayLike<number>): Int8Array;
	from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Int8Array;
}
declare var Int8Array: Int8ArrayConstructor;
interface Uint8Array {
	readonly BYTES_PER_ELEMENT: number;
	readonly buffer: ArrayBufferLike;
	readonly byteLength: number;
	readonly byteOffset: number;
	copyWithin(target: number, start: number, end?: number): this;
	every(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
	fill(value: number, start?: number, end?: number): this;
	filter(predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;
	find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;
	findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;
	forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;
	indexOf(searchElement: number, fromIndex?: number): number;
	join(separator?: string): string;
	lastIndexOf(searchElement: number, fromIndex?: number): number;
	readonly length: number;
	map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;
	reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
	reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
	reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
	reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
	reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
	reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
	reverse(): Uint8Array;
	set(array: ArrayLike<number>, offset?: number): void;
	slice(start?: number, end?: number): Uint8Array;
	some(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
	sort(compareFn?: (a: number, b: number) => number): this;
	subarray(begin?: number, end?: number): Uint8Array;
	toLocaleString(): string;
	toString(): string;
	valueOf(): Uint8Array;
	[index: number]: number;
}
interface Uint8ArrayConstructor {
	readonly prototype: Uint8Array;
	new (length: number): Uint8Array;
	new (array: ArrayLike<number> | ArrayBufferLike): Uint8Array;
	new (buffer: ArrayBufferLike, byteOffset?: number, length?: number): Uint8Array;
	readonly BYTES_PER_ELEMENT: number;
	of(...items: number[]): Uint8Array;
	from(arrayLike: ArrayLike<number>): Uint8Array;
	from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint8Array;
}
declare var Uint8Array: Uint8ArrayConstructor;
interface Uint8ClampedArray {
	readonly BYTES_PER_ELEMENT: number;
	readonly buffer: ArrayBufferLike;
	readonly byteLength: number;
	readonly byteOffset: number;
	copyWithin(target: number, start: number, end?: number): this;
	every(predicate: (value: number, index: number, array: Uint8ClampedArray) => unknown, thisArg?: any): boolean;
	fill(value: number, start?: number, end?: number): this;
	filter(predicate: (value: number, index: number, array: Uint8ClampedArray) => any, thisArg?: any): Uint8ClampedArray;
	find(predicate: (value: number, index: number, obj: Uint8ClampedArray) => boolean, thisArg?: any): number | undefined;
	findIndex(predicate: (value: number, index: number, obj: Uint8ClampedArray) => boolean, thisArg?: any): number;
	forEach(callbackfn: (value: number, index: number, array: Uint8ClampedArray) => void, thisArg?: any): void;
	indexOf(searchElement: number, fromIndex?: number): number;
	join(separator?: string): string;
	lastIndexOf(searchElement: number, fromIndex?: number): number;
	readonly length: number;
	map(callbackfn: (value: number, index: number, array: Uint8ClampedArray) => number, thisArg?: any): Uint8ClampedArray;
	reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8ClampedArray) => number): number;
	reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8ClampedArray) => number, initialValue: number): number;
	reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8ClampedArray) => U, initialValue: U): U;
	reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8ClampedArray) => number): number;
	reduceRight(
		callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8ClampedArray) => number,
		initialValue: number,
	): number;
	reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8ClampedArray) => U, initialValue: U): U;
	reverse(): Uint8ClampedArray;
	set(array: ArrayLike<number>, offset?: number): void;
	slice(start?: number, end?: number): Uint8ClampedArray;
	some(predicate: (value: number, index: number, array: Uint8ClampedArray) => unknown, thisArg?: any): boolean;
	sort(compareFn?: (a: number, b: number) => number): this;
	subarray(begin?: number, end?: number): Uint8ClampedArray;
	toLocaleString(): string;
	toString(): string;
	valueOf(): Uint8ClampedArray;
	[index: number]: number;
}
interface Uint8ClampedArrayConstructor {
	readonly prototype: Uint8ClampedArray;
	new (length: number): Uint8ClampedArray;
	new (array: ArrayLike<number> | ArrayBufferLike): Uint8ClampedArray;
	new (buffer: ArrayBufferLike, byteOffset?: number, length?: number): Uint8ClampedArray;
	readonly BYTES_PER_ELEMENT: number;
	of(...items: number[]): Uint8ClampedArray;
	from(arrayLike: ArrayLike<number>): Uint8ClampedArray;
	from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint8ClampedArray;
}
declare var Uint8ClampedArray: Uint8ClampedArrayConstructor;
interface Int16Array {
	readonly BYTES_PER_ELEMENT: number;
	readonly buffer: ArrayBufferLike;
	readonly byteLength: number;
	readonly byteOffset: number;
	copyWithin(target: number, start: number, end?: number): this;
	every(predicate: (value: number, index: number, array: Int16Array) => unknown, thisArg?: any): boolean;
	fill(value: number, start?: number, end?: number): this;
	filter(predicate: (value: number, index: number, array: Int16Array) => any, thisArg?: any): Int16Array;
	find(predicate: (value: number, index: number, obj: Int16Array) => boolean, thisArg?: any): number | undefined;
	findIndex(predicate: (value: number, index: number, obj: Int16Array) => boolean, thisArg?: any): number;
	forEach(callbackfn: (value: number, index: number, array: Int16Array) => void, thisArg?: any): void;
	indexOf(searchElement: number, fromIndex?: number): number;
	join(separator?: string): string;
	lastIndexOf(searchElement: number, fromIndex?: number): number;
	readonly length: number;
	map(callbackfn: (value: number, index: number, array: Int16Array) => number, thisArg?: any): Int16Array;
	reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int16Array) => number): number;
	reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int16Array) => number, initialValue: number): number;
	reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int16Array) => U, initialValue: U): U;
	reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int16Array) => number): number;
	reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int16Array) => number, initialValue: number): number;
	reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int16Array) => U, initialValue: U): U;
	reverse(): Int16Array;
	set(array: ArrayLike<number>, offset?: number): void;
	slice(start?: number, end?: number): Int16Array;
	some(predicate: (value: number, index: number, array: Int16Array) => unknown, thisArg?: any): boolean;
	sort(compareFn?: (a: number, b: number) => number): this;
	subarray(begin?: number, end?: number): Int16Array;
	toLocaleString(): string;
	toString(): string;
	valueOf(): Int16Array;
	[index: number]: number;
}
interface Int16ArrayConstructor {
	readonly prototype: Int16Array;
	new (length: number): Int16Array;
	new (array: ArrayLike<number> | ArrayBufferLike): Int16Array;
	new (buffer: ArrayBufferLike, byteOffset?: number, length?: number): Int16Array;
	readonly BYTES_PER_ELEMENT: number;
	of(...items: number[]): Int16Array;
	from(arrayLike: ArrayLike<number>): Int16Array;
	from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Int16Array;
}
declare var Int16Array: Int16ArrayConstructor;
interface Uint16Array {
	readonly BYTES_PER_ELEMENT: number;
	readonly buffer: ArrayBufferLike;
	readonly byteLength: number;
	readonly byteOffset: number;
	copyWithin(target: number, start: number, end?: number): this;
	every(predicate: (value: number, index: number, array: Uint16Array) => unknown, thisArg?: any): boolean;
	fill(value: number, start?: number, end?: number): this;
	filter(predicate: (value: number, index: number, array: Uint16Array) => any, thisArg?: any): Uint16Array;
	find(predicate: (value: number, index: number, obj: Uint16Array) => boolean, thisArg?: any): number | undefined;
	findIndex(predicate: (value: number, index: number, obj: Uint16Array) => boolean, thisArg?: any): number;
	forEach(callbackfn: (value: number, index: number, array: Uint16Array) => void, thisArg?: any): void;
	indexOf(searchElement: number, fromIndex?: number): number;
	join(separator?: string): string;
	lastIndexOf(searchElement: number, fromIndex?: number): number;
	readonly length: number;
	map(callbackfn: (value: number, index: number, array: Uint16Array) => number, thisArg?: any): Uint16Array;
	reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint16Array) => number): number;
	reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint16Array) => number, initialValue: number): number;
	reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint16Array) => U, initialValue: U): U;
	reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint16Array) => number): number;
	reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint16Array) => number, initialValue: number): number;
	reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint16Array) => U, initialValue: U): U;
	reverse(): Uint16Array;
	set(array: ArrayLike<number>, offset?: number): void;
	slice(start?: number, end?: number): Uint16Array;
	some(predicate: (value: number, index: number, array: Uint16Array) => unknown, thisArg?: any): boolean;
	sort(compareFn?: (a: number, b: number) => number): this;
	subarray(begin?: number, end?: number): Uint16Array;
	toLocaleString(): string;
	toString(): string;
	valueOf(): Uint16Array;
	[index: number]: number;
}
interface Uint16ArrayConstructor {
	readonly prototype: Uint16Array;
	new (length: number): Uint16Array;
	new (array: ArrayLike<number> | ArrayBufferLike): Uint16Array;
	new (buffer: ArrayBufferLike, byteOffset?: number, length?: number): Uint16Array;
	readonly BYTES_PER_ELEMENT: number;
	of(...items: number[]): Uint16Array;
	from(arrayLike: ArrayLike<number>): Uint16Array;
	from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint16Array;
}
declare var Uint16Array: Uint16ArrayConstructor;
interface Int32Array {
	readonly BYTES_PER_ELEMENT: number;
	readonly buffer: ArrayBufferLike;
	readonly byteLength: number;
	readonly byteOffset: number;
	copyWithin(target: number, start: number, end?: number): this;
	every(predicate: (value: number, index: number, array: Int32Array) => unknown, thisArg?: any): boolean;
	fill(value: number, start?: number, end?: number): this;
	filter(predicate: (value: number, index: number, array: Int32Array) => any, thisArg?: any): Int32Array;
	find(predicate: (value: number, index: number, obj: Int32Array) => boolean, thisArg?: any): number | undefined;
	findIndex(predicate: (value: number, index: number, obj: Int32Array) => boolean, thisArg?: any): number;
	forEach(callbackfn: (value: number, index: number, array: Int32Array) => void, thisArg?: any): void;
	indexOf(searchElement: number, fromIndex?: number): number;
	join(separator?: string): string;
	lastIndexOf(searchElement: number, fromIndex?: number): number;
	readonly length: number;
	map(callbackfn: (value: number, index: number, array: Int32Array) => number, thisArg?: any): Int32Array;
	reduce(
		callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int32Array) => number,
	): number;
	reduce(
		callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int32Array) => number,
		initialValue: number,
	): number;
	reduce<U>(
		callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int32Array) => U,
		initialValue: U,
	): U;
	reduceRight(
		callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int32Array) => number,
	): number;
	reduceRight(
		callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int32Array) => number,
		initialValue: number,
	): number;
	reduceRight<U>(
		callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int32Array) => U,
		initialValue: U,
	): U;
	reverse(): Int32Array;
	set(array: ArrayLike<number>, offset?: number): void;
	slice(start?: number, end?: number): Int32Array;
	some(predicate: (value: number, index: number, array: Int32Array) => unknown, thisArg?: any): boolean;
	sort(compareFn?: (a: number, b: number) => number): this;
	subarray(begin?: number, end?: number): Int32Array;
	toLocaleString(): string;
	toString(): string;
	valueOf(): Int32Array;
	[index: number]: number;
}
interface Int32ArrayConstructor {
	readonly prototype: Int32Array;
	new (length: number): Int32Array;
	new (array: ArrayLike<number> | ArrayBufferLike): Int32Array;
	new (buffer: ArrayBufferLike, byteOffset?: number, length?: number): Int32Array;
	readonly BYTES_PER_ELEMENT: number;
	of(...items: number[]): Int32Array;
	from(arrayLike: ArrayLike<number>): Int32Array;
	from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Int32Array;
}
declare var Int32Array: Int32ArrayConstructor;
interface Uint32Array {
	readonly BYTES_PER_ELEMENT: number;
	readonly buffer: ArrayBufferLike;
	readonly byteLength: number;
	readonly byteOffset: number;
	copyWithin(target: number, start: number, end?: number): this;
	every(predicate: (value: number, index: number, array: Uint32Array) => unknown, thisArg?: any): boolean;
	fill(value: number, start?: number, end?: number): this;
	filter(predicate: (value: number, index: number, array: Uint32Array) => any, thisArg?: any): Uint32Array;
	find(predicate: (value: number, index: number, obj: Uint32Array) => boolean, thisArg?: any): number | undefined;
	findIndex(predicate: (value: number, index: number, obj: Uint32Array) => boolean, thisArg?: any): number;
	forEach(callbackfn: (value: number, index: number, array: Uint32Array) => void, thisArg?: any): void;
	indexOf(searchElement: number, fromIndex?: number): number;
	join(separator?: string): string;
	lastIndexOf(searchElement: number, fromIndex?: number): number;
	readonly length: number;
	map(callbackfn: (value: number, index: number, array: Uint32Array) => number, thisArg?: any): Uint32Array;
	reduce(
		callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint32Array) => number,
	): number;
	reduce(
		callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint32Array) => number,
		initialValue: number,
	): number;
	reduce<U>(
		callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint32Array) => U,
		initialValue: U,
	): U;
	reduceRight(
		callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint32Array) => number,
	): number;
	reduceRight(
		callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint32Array) => number,
		initialValue: number,
	): number;
	reduceRight<U>(
		callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint32Array) => U,
		initialValue: U,
	): U;
	reverse(): Uint32Array;
	set(array: ArrayLike<number>, offset?: number): void;
	slice(start?: number, end?: number): Uint32Array;
	some(predicate: (value: number, index: number, array: Uint32Array) => unknown, thisArg?: any): boolean;
	sort(compareFn?: (a: number, b: number) => number): this;
	subarray(begin?: number, end?: number): Uint32Array;
	toLocaleString(): string;
	toString(): string;
	valueOf(): Uint32Array;
	[index: number]: number;
}
interface Uint32ArrayConstructor {
	readonly prototype: Uint32Array;
	new (length: number): Uint32Array;
	new (array: ArrayLike<number> | ArrayBufferLike): Uint32Array;
	new (buffer: ArrayBufferLike, byteOffset?: number, length?: number): Uint32Array;
	readonly BYTES_PER_ELEMENT: number;
	of(...items: number[]): Uint32Array;
	from(arrayLike: ArrayLike<number>): Uint32Array;
	from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint32Array;
}
declare var Uint32Array: Uint32ArrayConstructor;
interface Float32Array {
	readonly BYTES_PER_ELEMENT: number;
	readonly buffer: ArrayBufferLike;
	readonly byteLength: number;
	readonly byteOffset: number;
	copyWithin(target: number, start: number, end?: number): this;
	every(predicate: (value: number, index: number, array: Float32Array) => unknown, thisArg?: any): boolean;
	fill(value: number, start?: number, end?: number): this;
	filter(predicate: (value: number, index: number, array: Float32Array) => any, thisArg?: any): Float32Array;
	find(predicate: (value: number, index: number, obj: Float32Array) => boolean, thisArg?: any): number | undefined;
	findIndex(predicate: (value: number, index: number, obj: Float32Array) => boolean, thisArg?: any): number;
	forEach(callbackfn: (value: number, index: number, array: Float32Array) => void, thisArg?: any): void;
	indexOf(searchElement: number, fromIndex?: number): number;
	join(separator?: string): string;
	lastIndexOf(searchElement: number, fromIndex?: number): number;
	readonly length: number;
	map(callbackfn: (value: number, index: number, array: Float32Array) => number, thisArg?: any): Float32Array;
	reduce(
		callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float32Array) => number,
	): number;
	reduce(
		callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float32Array) => number,
		initialValue: number,
	): number;
	reduce<U>(
		callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float32Array) => U,
		initialValue: U,
	): U;
	reduceRight(
		callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float32Array) => number,
	): number;
	reduceRight(
		callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float32Array) => number,
		initialValue: number,
	): number;
	reduceRight<U>(
		callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float32Array) => U,
		initialValue: U,
	): U;
	reverse(): Float32Array;
	set(array: ArrayLike<number>, offset?: number): void;
	slice(start?: number, end?: number): Float32Array;
	some(predicate: (value: number, index: number, array: Float32Array) => unknown, thisArg?: any): boolean;
	sort(compareFn?: (a: number, b: number) => number): this;
	subarray(begin?: number, end?: number): Float32Array;
	toLocaleString(): string;
	toString(): string;
	valueOf(): Float32Array;
	[index: number]: number;
}
interface Float32ArrayConstructor {
	readonly prototype: Float32Array;
	new (length: number): Float32Array;
	new (array: ArrayLike<number> | ArrayBufferLike): Float32Array;
	new (buffer: ArrayBufferLike, byteOffset?: number, length?: number): Float32Array;
	readonly BYTES_PER_ELEMENT: number;
	of(...items: number[]): Float32Array;
	from(arrayLike: ArrayLike<number>): Float32Array;
	from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Float32Array;
}
declare var Float32Array: Float32ArrayConstructor;
interface Float64Array {
	readonly BYTES_PER_ELEMENT: number;
	readonly buffer: ArrayBufferLike;
	readonly byteLength: number;
	readonly byteOffset: number;
	copyWithin(target: number, start: number, end?: number): this;
	every(predicate: (value: number, index: number, array: Float64Array) => unknown, thisArg?: any): boolean;
	fill(value: number, start?: number, end?: number): this;
	filter(predicate: (value: number, index: number, array: Float64Array) => any, thisArg?: any): Float64Array;
	find(predicate: (value: number, index: number, obj: Float64Array) => boolean, thisArg?: any): number | undefined;
	findIndex(predicate: (value: number, index: number, obj: Float64Array) => boolean, thisArg?: any): number;
	forEach(callbackfn: (value: number, index: number, array: Float64Array) => void, thisArg?: any): void;
	indexOf(searchElement: number, fromIndex?: number): number;
	join(separator?: string): string;
	lastIndexOf(searchElement: number, fromIndex?: number): number;
	readonly length: number;
	map(callbackfn: (value: number, index: number, array: Float64Array) => number, thisArg?: any): Float64Array;
	reduce(
		callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float64Array) => number,
	): number;
	reduce(
		callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float64Array) => number,
		initialValue: number,
	): number;
	reduce<U>(
		callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float64Array) => U,
		initialValue: U,
	): U;
	reduceRight(
		callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float64Array) => number,
	): number;
	reduceRight(
		callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float64Array) => number,
		initialValue: number,
	): number;
	reduceRight<U>(
		callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float64Array) => U,
		initialValue: U,
	): U;
	reverse(): Float64Array;
	set(array: ArrayLike<number>, offset?: number): void;
	slice(start?: number, end?: number): Float64Array;
	some(predicate: (value: number, index: number, array: Float64Array) => unknown, thisArg?: any): boolean;
	sort(compareFn?: (a: number, b: number) => number): this;
	subarray(begin?: number, end?: number): Float64Array;
	toLocaleString(): string;
	toString(): string;
	valueOf(): Float64Array;
	[index: number]: number;
}
interface Float64ArrayConstructor {
	readonly prototype: Float64Array;
	new (length: number): Float64Array;
	new (array: ArrayLike<number> | ArrayBufferLike): Float64Array;
	new (buffer: ArrayBufferLike, byteOffset?: number, length?: number): Float64Array;
	readonly BYTES_PER_ELEMENT: number;
	of(...items: number[]): Float64Array;
	from(arrayLike: ArrayLike<number>): Float64Array;
	from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Float64Array;
}
declare var Float64Array: Float64ArrayConstructor;
declare namespace Intl {
	interface CollatorOptions {
		usage?: 'sort' | 'search' | undefined;
		localeMatcher?: 'lookup' | 'best fit' | undefined;
		numeric?: boolean | undefined;
		caseFirst?: 'upper' | 'lower' | 'false' | undefined;
		sensitivity?: 'base' | 'accent' | 'case' | 'variant' | undefined;
		collation?:
			| 'big5han'
			| 'compat'
			| 'dict'
			| 'direct'
			| 'ducet'
			| 'emoji'
			| 'eor'
			| 'gb2312'
			| 'phonebk'
			| 'phonetic'
			| 'pinyin'
			| 'reformed'
			| 'searchjl'
			| 'stroke'
			| 'trad'
			| 'unihan'
			| 'zhuyin'
			| undefined;
		ignorePunctuation?: boolean | undefined;
	}
	interface ResolvedCollatorOptions {
		locale: string;
		usage: string;
		sensitivity: string;
		ignorePunctuation: boolean;
		collation: string;
		caseFirst: string;
		numeric: boolean;
	}
	interface Collator {
		compare(x: string, y: string): number;
		resolvedOptions(): ResolvedCollatorOptions;
	}
	interface CollatorConstructor {
		new (locales?: string | string[], options?: CollatorOptions): Collator;
		(locales?: string | string[], options?: CollatorOptions): Collator;
		supportedLocalesOf(locales: string | string[], options?: CollatorOptions): string[];
	}
	var Collator: CollatorConstructor;
	interface NumberFormatOptionsStyleRegistry {
		decimal: never;
		percent: never;
		currency: never;
	}
	type NumberFormatOptionsStyle = keyof NumberFormatOptionsStyleRegistry;
	interface NumberFormatOptionsCurrencyDisplayRegistry {
		code: never;
		symbol: never;
		name: never;
	}
	type NumberFormatOptionsCurrencyDisplay = keyof NumberFormatOptionsCurrencyDisplayRegistry;
	interface NumberFormatOptionsUseGroupingRegistry {}
	type NumberFormatOptionsUseGrouping = {} extends NumberFormatOptionsUseGroupingRegistry ? boolean
		: keyof NumberFormatOptionsUseGroupingRegistry | 'true' | 'false' | boolean;
	type ResolvedNumberFormatOptionsUseGrouping = {} extends NumberFormatOptionsUseGroupingRegistry ? boolean
		: keyof NumberFormatOptionsUseGroupingRegistry | false;
	interface NumberFormatOptions {
		localeMatcher?: 'lookup' | 'best fit' | undefined;
		style?: NumberFormatOptionsStyle | undefined;
		currency?: string | undefined;
		currencyDisplay?: NumberFormatOptionsCurrencyDisplay | undefined;
		useGrouping?: NumberFormatOptionsUseGrouping | undefined;
		minimumIntegerDigits?: number | undefined;
		minimumFractionDigits?: number | undefined;
		maximumFractionDigits?: number | undefined;
		minimumSignificantDigits?: number | undefined;
		maximumSignificantDigits?: number | undefined;
	}
	interface ResolvedNumberFormatOptions {
		locale: string;
		numberingSystem: string;
		style: NumberFormatOptionsStyle;
		currency?: string;
		currencyDisplay?: NumberFormatOptionsCurrencyDisplay;
		minimumIntegerDigits: number;
		minimumFractionDigits?: number;
		maximumFractionDigits?: number;
		minimumSignificantDigits?: number;
		maximumSignificantDigits?: number;
		useGrouping: ResolvedNumberFormatOptionsUseGrouping;
	}
	interface NumberFormat {
		format(value: number): string;
		resolvedOptions(): ResolvedNumberFormatOptions;
	}
	interface NumberFormatConstructor {
		new (locales?: string | string[], options?: NumberFormatOptions): NumberFormat;
		(locales?: string | string[], options?: NumberFormatOptions): NumberFormat;
		supportedLocalesOf(locales: string | string[], options?: NumberFormatOptions): string[];
		readonly prototype: NumberFormat;
	}
	var NumberFormat: NumberFormatConstructor;
	interface DateTimeFormatOptions {
		localeMatcher?: 'best fit' | 'lookup' | undefined;
		weekday?: 'long' | 'short' | 'narrow' | undefined;
		era?: 'long' | 'short' | 'narrow' | undefined;
		year?: 'numeric' | '2-digit' | undefined;
		month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined;
		day?: 'numeric' | '2-digit' | undefined;
		hour?: 'numeric' | '2-digit' | undefined;
		minute?: 'numeric' | '2-digit' | undefined;
		second?: 'numeric' | '2-digit' | undefined;
		timeZoneName?: 'short' | 'long' | 'shortOffset' | 'longOffset' | 'shortGeneric' | 'longGeneric' | undefined;
		formatMatcher?: 'best fit' | 'basic' | undefined;
		hour12?: boolean | undefined;
		timeZone?:
			| string
			| (typeof globalThis extends { Temporal: { TimeZoneProtocol: infer T } } ? T : undefined)
			| undefined;
	}
	interface ResolvedDateTimeFormatOptions {
		locale: string;
		calendar: string;
		numberingSystem: string;
		timeZone: string;
		hour12?: boolean;
		weekday?: string;
		era?: string;
		year?: string;
		month?: string;
		day?: string;
		hour?: string;
		minute?: string;
		second?: string;
		timeZoneName?: string;
	}
	interface DateTimeFormat {
		format(date?: Date | number): string;
		resolvedOptions(): ResolvedDateTimeFormatOptions;
	}
	interface DateTimeFormatConstructor {
		new (locales?: string | string[], options?: DateTimeFormatOptions): DateTimeFormat;
		(locales?: string | string[], options?: DateTimeFormatOptions): DateTimeFormat;
		supportedLocalesOf(locales: string | string[], options?: DateTimeFormatOptions): string[];
		readonly prototype: DateTimeFormat;
	}
	var DateTimeFormat: DateTimeFormatConstructor;
}
interface String {
	localeCompare(that: string, locales?: string | string[], options?: Intl.CollatorOptions): number;
}
interface Number {
	toLocaleString(locales?: string | string[], options?: Intl.NumberFormatOptions): string;
}
interface Date {
	toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
	toLocaleDateString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
	toLocaleTimeString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
}
interface Array<T> {
	find<S extends T>(predicate: (value: T, index: number, obj: T[]) => value is S, thisArg?: any): S | undefined;
	find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined;
	findIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): number;
	fill(value: T, start?: number, end?: number): this;
	copyWithin(target: number, start: number, end?: number): this;
	toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions & Intl.DateTimeFormatOptions): string;
}
interface ArrayConstructor {
	from<T>(arrayLike: ArrayLike<T>): T[];
	from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
	of<T>(...items: T[]): T[];
}
interface DateConstructor {
	new (value: number | string | Date): Date;
}
interface Function {
	readonly name: string;
}
interface Math {
	clz32(x: number): number;
	imul(x: number, y: number): number;
	sign(x: number): number;
	log10(x: number): number;
	log2(x: number): number;
	log1p(x: number): number;
	expm1(x: number): number;
	cosh(x: number): number;
	sinh(x: number): number;
	tanh(x: number): number;
	acosh(x: number): number;
	asinh(x: number): number;
	atanh(x: number): number;
	hypot(...values: number[]): number;
	trunc(x: number): number;
	fround(x: number): number;
	cbrt(x: number): number;
}
interface NumberConstructor {
	readonly EPSILON: number;
	isFinite(number: unknown): boolean;
	isInteger(number: unknown): boolean;
	isNaN(number: unknown): boolean;
	isSafeInteger(number: unknown): boolean;
	readonly MAX_SAFE_INTEGER: number;
	readonly MIN_SAFE_INTEGER: number;
	parseFloat(string: string): number;
	parseInt(string: string, radix?: number): number;
}
interface ObjectConstructor {
	assign<T extends {}, U>(target: T, source: U): T & U;
	assign<T extends {}, U, V>(target: T, source1: U, source2: V): T & U & V;
	assign<T extends {}, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
	assign(target: object, ...sources: any[]): any;
	getOwnPropertySymbols(o: any): symbol[];
	keys(o: {}): string[];
	is(value1: any, value2: any): boolean;
	setPrototypeOf(o: any, proto: object | null): any;
}
interface ReadonlyArray<T> {
	find<S extends T>(
		predicate: (value: T, index: number, obj: readonly T[]) => value is S,
		thisArg?: any,
	): S | undefined;
	find(predicate: (value: T, index: number, obj: readonly T[]) => unknown, thisArg?: any): T | undefined;
	findIndex(predicate: (value: T, index: number, obj: readonly T[]) => unknown, thisArg?: any): number;
	toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions & Intl.DateTimeFormatOptions): string;
}
interface RegExp {
	readonly flags: string;
	readonly sticky: boolean;
	readonly unicode: boolean;
}
interface RegExpConstructor {
	new (pattern: RegExp | string, flags?: string): RegExp;
	(pattern: RegExp | string, flags?: string): RegExp;
}
interface String {
	codePointAt(pos: number): number | undefined;
	includes(searchString: string, position?: number): boolean;
	endsWith(searchString: string, endPosition?: number): boolean;
	normalize(form: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'): string;
	normalize(form?: string): string;
	repeat(count: number): string;
	startsWith(searchString: string, position?: number): boolean;
	anchor(name: string): string;
	big(): string;
	blink(): string;
	bold(): string;
	fixed(): string;
	fontcolor(color: string): string;
	fontsize(size: number): string;
	fontsize(size: string): string;
	italics(): string;
	link(url: string): string;
	small(): string;
	strike(): string;
	sub(): string;
	sup(): string;
}
interface StringConstructor {
	fromCodePoint(...codePoints: number[]): string;
	raw(template: { raw: readonly string[] | ArrayLike<string> }, ...substitutions: any[]): string;
}
interface Int8Array {
	toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
}
interface Uint8Array {
	toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
}
interface Uint8ClampedArray {
	toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
}
interface Int16Array {
	toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
}
interface Uint16Array {
	toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
}
interface Int32Array {
	toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
}
interface Uint32Array {
	toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
}
interface Float32Array {
	toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
}
interface Float64Array {
	toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
}
interface PromiseConstructor {
	readonly prototype: Promise<any>;
	new <T>(
		executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void,
	): Promise<T>;
	all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;
	// see: lib.es2015.iterable.d.ts
	// all<T>(values: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>[]>;
	race<T extends readonly unknown[] | []>(values: T): Promise<Awaited<T[number]>>;
	// see: lib.es2015.iterable.d.ts
	// race<T>(values: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>>;
	reject<T = never>(reason?: any): Promise<T>;
	resolve(): Promise<void>;
	resolve<T>(value: T): Promise<Awaited<T>>;
	resolve<T>(value: T | PromiseLike<T>): Promise<Awaited<T>>;
}
declare var Promise: PromiseConstructor;
interface ProxyHandler<T extends object> {
	apply?(target: T, thisArg: any, argArray: any[]): any;
	construct?(target: T, argArray: any[], newTarget: Function): object;
	defineProperty?(target: T, property: string | symbol, attributes: PropertyDescriptor): boolean;
	deleteProperty?(target: T, p: string | symbol): boolean;
	get?(target: T, p: string | symbol, receiver: any): any;
	getOwnPropertyDescriptor?(target: T, p: string | symbol): PropertyDescriptor | undefined;
	getPrototypeOf?(target: T): object | null;
	has?(target: T, p: string | symbol): boolean;
	isExtensible?(target: T): boolean;
	ownKeys?(target: T): ArrayLike<string | symbol>;
	preventExtensions?(target: T): boolean;
	set?(target: T, p: string | symbol, newValue: any, receiver: any): boolean;
	setPrototypeOf?(target: T, v: object | null): boolean;
}
interface ProxyConstructor {
	revocable<T extends object>(target: T, handler: ProxyHandler<T>): { proxy: T; revoke: () => void };
	new <T extends object>(target: T, handler: ProxyHandler<T>): T;
}
declare var Proxy: ProxyConstructor;
declare namespace Reflect {
	function apply<T, A extends readonly any[], R>(
		target: (this: T, ...args: A) => R,
		thisArgument: T,
		argumentsList: Readonly<A>,
	): R;
	function apply(target: Function, thisArgument: any, argumentsList: ArrayLike<any>): any;
	function construct<A extends readonly any[], R>(
		target: new (...args: A) => R,
		argumentsList: Readonly<A>,
		newTarget?: new (...args: any) => any,
	): R;
	function construct(target: Function, argumentsList: ArrayLike<any>, newTarget?: Function): any;
	function defineProperty(
		target: object,
		propertyKey: PropertyKey,
		attributes: PropertyDescriptor & ThisType<any>,
	): boolean;
	function deleteProperty(target: object, propertyKey: PropertyKey): boolean;
	function get<T extends object, P extends PropertyKey>(
		target: T,
		propertyKey: P,
		receiver?: unknown,
	): P extends keyof T ? T[P] : any;
	function getOwnPropertyDescriptor<T extends object, P extends PropertyKey>(
		target: T,
		propertyKey: P,
	): TypedPropertyDescriptor<P extends keyof T ? T[P] : any> | undefined;
	function getPrototypeOf(target: object): object | null;
	function has(target: object, propertyKey: PropertyKey): boolean;
	function isExtensible(target: object): boolean;
	function ownKeys(target: object): (string | symbol)[];
	function preventExtensions(target: object): boolean;
	function set<T extends object, P extends PropertyKey>(
		target: T,
		propertyKey: P,
		value: P extends keyof T ? T[P] : any,
		receiver?: any,
	): boolean;
	function set(target: object, propertyKey: PropertyKey, value: any, receiver?: any): boolean;
	function setPrototypeOf(target: object, proto: object | null): boolean;
}
interface SymbolConstructor {
	readonly prototype: Symbol;
	(description?: string | number): symbol;
	for(key: string): symbol;
	keyFor(sym: symbol): string | undefined;
}
declare var Symbol: SymbolConstructor;
interface SymbolConstructor {
	readonly hasInstance: unique symbol;
	readonly isConcatSpreadable: unique symbol;
	readonly match: unique symbol;
	readonly replace: unique symbol;
	readonly search: unique symbol;
	readonly species: unique symbol;
	readonly split: unique symbol;
	readonly toPrimitive: unique symbol;
	readonly toStringTag: unique symbol;
	readonly unscopables: unique symbol;
}
interface Symbol {
	[Symbol.toPrimitive](hint: string): symbol;
	readonly [Symbol.toStringTag]: string;
}
interface Array<T> {
	readonly [Symbol.unscopables]: {
		[K in keyof any[]]?: boolean;
	};
}
interface ReadonlyArray<T> {
	readonly [Symbol.unscopables]: {
		[K in keyof readonly any[]]?: boolean;
	};
}
interface Date {
	[Symbol.toPrimitive](hint: 'default'): string;
	[Symbol.toPrimitive](hint: 'string'): string;
	[Symbol.toPrimitive](hint: 'number'): number;
	[Symbol.toPrimitive](hint: string): string | number;
}
interface Map<K, V> {
	readonly [Symbol.toStringTag]: string;
}
interface WeakMap<K extends WeakKey, V> {
	readonly [Symbol.toStringTag]: string;
}
interface Set<T> {
	readonly [Symbol.toStringTag]: string;
}
interface WeakSet<T extends WeakKey> {
	readonly [Symbol.toStringTag]: string;
}
interface JSON {
	readonly [Symbol.toStringTag]: string;
}
interface Function {
	[Symbol.hasInstance](value: any): boolean;
}
interface GeneratorFunction {
	readonly [Symbol.toStringTag]: string;
}
interface Math {
	readonly [Symbol.toStringTag]: string;
}
interface Promise<T> {
	readonly [Symbol.toStringTag]: string;
}
interface PromiseConstructor {
	readonly [Symbol.species]: PromiseConstructor;
}
interface RegExp {
	[Symbol.match](string: string): RegExpMatchArray | null;
	[Symbol.replace](string: string, replaceValue: string): string;
	[Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
	[Symbol.search](string: string): number;
	[Symbol.split](string: string, limit?: number): string[];
}
interface RegExpConstructor {
	readonly [Symbol.species]: RegExpConstructor;
}
interface String {
	match(matcher: { [Symbol.match](string: string): RegExpMatchArray | null }): RegExpMatchArray | null;
	replace(
		searchValue: { [Symbol.replace](string: string, replaceValue: string): string },
		replaceValue: string,
	): string;
	replace(
		searchValue: {
			[Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
		},
		replacer: (substring: string, ...args: any[]) => string,
	): string;
	search(searcher: { [Symbol.search](string: string): number }): number;
	split(splitter: { [Symbol.split](string: string, limit?: number): string[] }, limit?: number): string[];
}
interface ArrayBuffer {
	readonly [Symbol.toStringTag]: string;
}
interface DataView {
	readonly [Symbol.toStringTag]: string;
}
interface Int8Array {
	readonly [Symbol.toStringTag]: 'Int8Array';
}
interface Uint8Array {
	readonly [Symbol.toStringTag]: 'Uint8Array';
}
interface Uint8ClampedArray {
	readonly [Symbol.toStringTag]: 'Uint8ClampedArray';
}
interface Int16Array {
	readonly [Symbol.toStringTag]: 'Int16Array';
}
interface Uint16Array {
	readonly [Symbol.toStringTag]: 'Uint16Array';
}
interface Int32Array {
	readonly [Symbol.toStringTag]: 'Int32Array';
}
interface Uint32Array {
	readonly [Symbol.toStringTag]: 'Uint32Array';
}
interface Float32Array {
	readonly [Symbol.toStringTag]: 'Float32Array';
}
interface Float64Array {
	readonly [Symbol.toStringTag]: 'Float64Array';
}
interface ArrayConstructor {
	readonly [Symbol.species]: ArrayConstructor;
}
interface MapConstructor {
	readonly [Symbol.species]: MapConstructor;
}
interface SetConstructor {
	readonly [Symbol.species]: SetConstructor;
}
interface ArrayBufferConstructor {
	readonly [Symbol.species]: ArrayBufferConstructor;
}
interface Generator<T = unknown, TReturn = any, TNext = unknown> extends Iterator<T, TReturn, TNext> {
	// NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
	next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
	return(value: TReturn): IteratorResult<T, TReturn>;
	throw(e: any): IteratorResult<T, TReturn>;
	[Symbol.iterator](): Generator<T, TReturn, TNext>;
}
interface GeneratorFunction {
	new (...args: any[]): Generator;
	(...args: any[]): Generator;
	readonly length: number;
	readonly name: string;
	readonly prototype: Generator;
}
interface GeneratorFunctionConstructor {
	new (...args: string[]): GeneratorFunction;
	(...args: string[]): GeneratorFunction;
	readonly length: number;
	readonly name: string;
	readonly prototype: GeneratorFunction;
}
interface SymbolConstructor {
	readonly iterator: unique symbol;
}
interface IteratorYieldResult<TYield> {
	done?: false;
	value: TYield;
}
interface IteratorReturnResult<TReturn> {
	done: true;
	value: TReturn;
}
type IteratorResult<T, TReturn = any> = IteratorYieldResult<T> | IteratorReturnResult<TReturn>;
interface Iterator<T, TReturn = any, TNext = undefined> {
	// NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
	next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
	return?(value?: TReturn): IteratorResult<T, TReturn>;
	throw?(e?: any): IteratorResult<T, TReturn>;
}
interface Iterable<T> {
	[Symbol.iterator](): Iterator<T>;
}
interface IterableIterator<T> extends Iterator<T> {
	[Symbol.iterator](): IterableIterator<T>;
}
interface Array<T> {
	[Symbol.iterator](): IterableIterator<T>;
	entries(): IterableIterator<[number, T]>;
	keys(): IterableIterator<number>;
	values(): IterableIterator<T>;
}
interface ArrayConstructor {
	from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
	from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
}
interface ReadonlyArray<T> {
	[Symbol.iterator](): IterableIterator<T>;
	entries(): IterableIterator<[number, T]>;
	keys(): IterableIterator<number>;
	values(): IterableIterator<T>;
}
interface IArguments {
	[Symbol.iterator](): IterableIterator<any>;
}
interface Map<K, V> {
	[Symbol.iterator](): IterableIterator<[K, V]>;
	entries(): IterableIterator<[K, V]>;
	keys(): IterableIterator<K>;
	values(): IterableIterator<V>;
}
interface ReadonlyMap<K, V> {
	[Symbol.iterator](): IterableIterator<[K, V]>;
	entries(): IterableIterator<[K, V]>;
	keys(): IterableIterator<K>;
	values(): IterableIterator<V>;
}
interface MapConstructor {
	new (): Map<any, any>;
	new <K, V>(iterable?: Iterable<readonly [K, V]> | null): Map<K, V>;
}
interface WeakMap<K extends WeakKey, V> {}
interface WeakMapConstructor {
	new <K extends WeakKey, V>(iterable: Iterable<readonly [K, V]>): WeakMap<K, V>;
}
interface Set<T> {
	[Symbol.iterator](): IterableIterator<T>;
	entries(): IterableIterator<[T, T]>;
	keys(): IterableIterator<T>;
	values(): IterableIterator<T>;
}
interface ReadonlySet<T> {
	[Symbol.iterator](): IterableIterator<T>;
	entries(): IterableIterator<[T, T]>;
	keys(): IterableIterator<T>;
	values(): IterableIterator<T>;
}
interface SetConstructor {
	new <T>(iterable?: Iterable<T> | null): Set<T>;
}
interface WeakSet<T extends WeakKey> {}
interface WeakSetConstructor {
	new <T extends WeakKey = WeakKey>(iterable: Iterable<T>): WeakSet<T>;
}
interface Promise<T> {}
interface PromiseConstructor {
	all<T>(values: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>[]>;
	race<T>(values: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>>;
}
interface String {
	[Symbol.iterator](): IterableIterator<string>;
}
interface Int8Array {
	[Symbol.iterator](): IterableIterator<number>;
	entries(): IterableIterator<[number, number]>;
	keys(): IterableIterator<number>;
	values(): IterableIterator<number>;
}
interface Int8ArrayConstructor {
	new (elements: Iterable<number>): Int8Array;
	from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Int8Array;
}
interface Uint8Array {
	[Symbol.iterator](): IterableIterator<number>;
	entries(): IterableIterator<[number, number]>;
	keys(): IterableIterator<number>;
	values(): IterableIterator<number>;
}
interface Uint8ArrayConstructor {
	new (elements: Iterable<number>): Uint8Array;
	from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
}
interface Uint8ClampedArray {
	[Symbol.iterator](): IterableIterator<number>;
	entries(): IterableIterator<[number, number]>;
	keys(): IterableIterator<number>;
	values(): IterableIterator<number>;
}
interface Uint8ClampedArrayConstructor {
	new (elements: Iterable<number>): Uint8ClampedArray;
	from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8ClampedArray;
}
interface Int16Array {
	[Symbol.iterator](): IterableIterator<number>;
	entries(): IterableIterator<[number, number]>;
	keys(): IterableIterator<number>;
	values(): IterableIterator<number>;
}
interface Int16ArrayConstructor {
	new (elements: Iterable<number>): Int16Array;
	from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Int16Array;
}
interface Uint16Array {
	[Symbol.iterator](): IterableIterator<number>;
	entries(): IterableIterator<[number, number]>;
	keys(): IterableIterator<number>;
	values(): IterableIterator<number>;
}
interface Uint16ArrayConstructor {
	new (elements: Iterable<number>): Uint16Array;
	from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint16Array;
}
interface Int32Array {
	[Symbol.iterator](): IterableIterator<number>;
	entries(): IterableIterator<[number, number]>;
	keys(): IterableIterator<number>;
	values(): IterableIterator<number>;
}
interface Int32ArrayConstructor {
	new (elements: Iterable<number>): Int32Array;
	from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Int32Array;
}
interface Uint32Array {
	[Symbol.iterator](): IterableIterator<number>;
	entries(): IterableIterator<[number, number]>;
	keys(): IterableIterator<number>;
	values(): IterableIterator<number>;
}
interface Uint32ArrayConstructor {
	new (elements: Iterable<number>): Uint32Array;
	from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint32Array;
}
interface Float32Array {
	[Symbol.iterator](): IterableIterator<number>;
	entries(): IterableIterator<[number, number]>;
	keys(): IterableIterator<number>;
	values(): IterableIterator<number>;
}
interface Float32ArrayConstructor {
	new (elements: Iterable<number>): Float32Array;
	from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Float32Array;
}
interface Float64Array {
	[Symbol.iterator](): IterableIterator<number>;
	entries(): IterableIterator<[number, number]>;
	keys(): IterableIterator<number>;
	values(): IterableIterator<number>;
}
interface Float64ArrayConstructor {
	new (elements: Iterable<number>): Float64Array;
	from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Float64Array;
}
interface Map<K, V> {
	clear(): void;
	delete(key: K): boolean;
	forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
	get(key: K): V | undefined;
	has(key: K): boolean;
	set(key: K, value: V): this;
	readonly size: number;
}
interface MapConstructor {
	new (): Map<any, any>;
	new <K, V>(entries?: readonly (readonly [K, V])[] | null): Map<K, V>;
	readonly prototype: Map<any, any>;
}
declare var Map: MapConstructor;
interface ReadonlyMap<K, V> {
	forEach(callbackfn: (value: V, key: K, map: ReadonlyMap<K, V>) => void, thisArg?: any): void;
	get(key: K): V | undefined;
	has(key: K): boolean;
	readonly size: number;
}
interface WeakMap<K extends WeakKey, V> {
	delete(key: K): boolean;
	get(key: K): V | undefined;
	has(key: K): boolean;
	set(key: K, value: V): this;
}
interface WeakMapConstructor {
	new <K extends WeakKey = WeakKey, V = any>(entries?: readonly (readonly [K, V])[] | null): WeakMap<K, V>;
	readonly prototype: WeakMap<WeakKey, any>;
}
declare var WeakMap: WeakMapConstructor;
interface Set<T> {
	add(value: T): this;
	clear(): void;
	delete(value: T): boolean;
	forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void;
	has(value: T): boolean;
	readonly size: number;
}
interface SetConstructor {
	new <T = any>(values?: readonly T[] | null): Set<T>;
	readonly prototype: Set<any>;
}
declare var Set: SetConstructor;
interface ReadonlySet<T> {
	forEach(callbackfn: (value: T, value2: T, set: ReadonlySet<T>) => void, thisArg?: any): void;
	has(value: T): boolean;
	readonly size: number;
}
interface WeakSet<T extends WeakKey> {
	add(value: T): this;
	delete(value: T): boolean;
	has(value: T): boolean;
}
interface WeakSetConstructor {
	new <T extends WeakKey = WeakKey>(values?: readonly T[] | null): WeakSet<T>;
	readonly prototype: WeakSet<WeakKey>;
}
declare var WeakSet: WeakSetConstructor;
interface Array<T> {
	includes(searchElement: T, fromIndex?: number): boolean;
}
interface ReadonlyArray<T> {
	includes(searchElement: T, fromIndex?: number): boolean;
}
interface Int8Array {
	includes(searchElement: number, fromIndex?: number): boolean;
}
interface Uint8Array {
	includes(searchElement: number, fromIndex?: number): boolean;
}
interface Uint8ClampedArray {
	includes(searchElement: number, fromIndex?: number): boolean;
}
interface Int16Array {
	includes(searchElement: number, fromIndex?: number): boolean;
}
interface Uint16Array {
	includes(searchElement: number, fromIndex?: number): boolean;
}
interface Int32Array {
	includes(searchElement: number, fromIndex?: number): boolean;
}
interface Uint32Array {
	includes(searchElement: number, fromIndex?: number): boolean;
}
interface Float32Array {
	includes(searchElement: number, fromIndex?: number): boolean;
}
interface Float64Array {
	includes(searchElement: number, fromIndex?: number): boolean;
}
declare namespace Intl {
	function getCanonicalLocales(locale?: string | readonly string[]): string[];
}
interface ObjectConstructor {
	values<T>(o: { [s: string]: T } | ArrayLike<T>): T[];
	values(o: {}): any[];
	entries<T>(o: { [s: string]: T } | ArrayLike<T>): [string, T][];
	entries(o: {}): [string, any][];
	getOwnPropertyDescriptors<T>(
		o: T,
	): { [P in keyof T]: TypedPropertyDescriptor<T[P]> } & { [x: string]: PropertyDescriptor };
}
interface SharedArrayBuffer {
	readonly byteLength: number;
	slice(begin: number, end?: number): SharedArrayBuffer;
	readonly [Symbol.species]: SharedArrayBuffer;
	readonly [Symbol.toStringTag]: 'SharedArrayBuffer';
}
interface SharedArrayBufferConstructor {
	readonly prototype: SharedArrayBuffer;
	new (byteLength: number): SharedArrayBuffer;
}
declare var SharedArrayBuffer: SharedArrayBufferConstructor;
interface ArrayBufferTypes {
	SharedArrayBuffer: SharedArrayBuffer;
}
interface Atomics {
	add(
		typedArray: Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array,
		index: number,
		value: number,
	): number;
	and(
		typedArray: Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array,
		index: number,
		value: number,
	): number;
	compareExchange(
		typedArray: Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array,
		index: number,
		expectedValue: number,
		replacementValue: number,
	): number;
	exchange(
		typedArray: Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array,
		index: number,
		value: number,
	): number;
	isLockFree(size: number): boolean;
	load(
		typedArray: Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array,
		index: number,
	): number;
	or(
		typedArray: Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array,
		index: number,
		value: number,
	): number;
	store(
		typedArray: Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array,
		index: number,
		value: number,
	): number;
	sub(
		typedArray: Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array,
		index: number,
		value: number,
	): number;
	wait(typedArray: Int32Array, index: number, value: number, timeout?: number): 'ok' | 'not-equal' | 'timed-out';
	notify(typedArray: Int32Array, index: number, count?: number): number;
	xor(
		typedArray: Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array,
		index: number,
		value: number,
	): number;
	readonly [Symbol.toStringTag]: 'Atomics';
}
declare var Atomics: Atomics;
interface String {
	padStart(maxLength: number, fillString?: string): string;
	padEnd(maxLength: number, fillString?: string): string;
}
interface Int8ArrayConstructor {
	new (): Int8Array;
}
interface Uint8ArrayConstructor {
	new (): Uint8Array;
}
interface Uint8ClampedArrayConstructor {
	new (): Uint8ClampedArray;
}
interface Int16ArrayConstructor {
	new (): Int16Array;
}
interface Uint16ArrayConstructor {
	new (): Uint16Array;
}
interface Int32ArrayConstructor {
	new (): Int32Array;
}
interface Uint32ArrayConstructor {
	new (): Uint32Array;
}
interface Float32ArrayConstructor {
	new (): Float32Array;
}
interface Float64ArrayConstructor {
	new (): Float64Array;
}
interface DateConstructor {
	UTC(
		year: number,
		monthIndex?: number,
		date?: number,
		hours?: number,
		minutes?: number,
		seconds?: number,
		ms?: number,
	): number;
}
declare namespace Intl {
	interface DateTimeFormatPartTypesRegistry {
		day: any;
		dayPeriod: any;
		era: any;
		hour: any;
		literal: any;
		minute: any;
		month: any;
		second: any;
		timeZoneName: any;
		weekday: any;
		year: any;
	}
	type DateTimeFormatPartTypes = keyof DateTimeFormatPartTypesRegistry;
	interface DateTimeFormatPart {
		type: DateTimeFormatPartTypes;
		value: string;
	}
	interface DateTimeFormat {
		formatToParts(date?: Date | number): DateTimeFormatPart[];
	}
}
interface Promise<T> {
	finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
interface RegExpMatchArray {
	groups?: {
		[key: string]: string;
	};
}
interface RegExpExecArray {
	groups?: {
		[key: string]: string;
	};
}
interface RegExp {
	readonly dotAll: boolean;
}
interface AsyncGenerator<T = unknown, TReturn = any, TNext = unknown> extends AsyncIterator<T, TReturn, TNext> {
	// NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
	next(...args: [] | [TNext]): Promise<IteratorResult<T, TReturn>>;
	return(value: TReturn | PromiseLike<TReturn>): Promise<IteratorResult<T, TReturn>>;
	throw(e: any): Promise<IteratorResult<T, TReturn>>;
	[Symbol.asyncIterator](): AsyncGenerator<T, TReturn, TNext>;
}
interface AsyncGeneratorFunction {
	new (...args: any[]): AsyncGenerator;
	(...args: any[]): AsyncGenerator;
	readonly length: number;
	readonly name: string;
	readonly prototype: AsyncGenerator;
}
interface AsyncGeneratorFunctionConstructor {
	new (...args: string[]): AsyncGeneratorFunction;
	(...args: string[]): AsyncGeneratorFunction;
	readonly length: number;
	readonly name: string;
	readonly prototype: AsyncGeneratorFunction;
}
interface SymbolConstructor {
	readonly asyncIterator: unique symbol;
}
interface AsyncIterator<T, TReturn = any, TNext = undefined> {
	// NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
	next(...args: [] | [TNext]): Promise<IteratorResult<T, TReturn>>;
	return?(value?: TReturn | PromiseLike<TReturn>): Promise<IteratorResult<T, TReturn>>;
	throw?(e?: any): Promise<IteratorResult<T, TReturn>>;
}
interface AsyncIterable<T> {
	[Symbol.asyncIterator](): AsyncIterator<T>;
}
interface AsyncIterableIterator<T> extends AsyncIterator<T> {
	[Symbol.asyncIterator](): AsyncIterableIterator<T>;
}
declare namespace Intl {
	type LDMLPluralRule = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';
	type PluralRuleType = 'cardinal' | 'ordinal';
	interface PluralRulesOptions {
		localeMatcher?: 'lookup' | 'best fit' | undefined;
		type?: PluralRuleType | undefined;
		minimumIntegerDigits?: number | undefined;
		minimumFractionDigits?: number | undefined;
		maximumFractionDigits?: number | undefined;
		minimumSignificantDigits?: number | undefined;
		maximumSignificantDigits?: number | undefined;
	}
	interface ResolvedPluralRulesOptions {
		locale: string;
		pluralCategories: LDMLPluralRule[];
		type: PluralRuleType;
		minimumIntegerDigits: number;
		minimumFractionDigits: number;
		maximumFractionDigits: number;
		minimumSignificantDigits?: number;
		maximumSignificantDigits?: number;
	}
	interface PluralRules {
		resolvedOptions(): ResolvedPluralRulesOptions;
		select(n: number): LDMLPluralRule;
	}
	interface PluralRulesConstructor {
		new (locales?: string | readonly string[], options?: PluralRulesOptions): PluralRules;
		(locales?: string | readonly string[], options?: PluralRulesOptions): PluralRules;
		supportedLocalesOf(
			locales: string | readonly string[],
			options?: { localeMatcher?: 'lookup' | 'best fit' },
		): string[];
	}
	const PluralRules: PluralRulesConstructor;
	interface NumberFormatPartTypeRegistry {
		literal: never;
		nan: never;
		infinity: never;
		percent: never;
		integer: never;
		group: never;
		decimal: never;
		fraction: never;
		plusSign: never;
		minusSign: never;
		percentSign: never;
		currency: never;
	}
	type NumberFormatPartTypes = keyof NumberFormatPartTypeRegistry;
	interface NumberFormatPart {
		type: NumberFormatPartTypes;
		value: string;
	}
	interface NumberFormat {
		formatToParts(number?: number | bigint): NumberFormatPart[];
	}
}
type FlatArray<Arr, Depth extends number> = {
	done: Arr;
	recur: Arr extends ReadonlyArray<infer InnerArr>
		? FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
		: Arr;
}[Depth extends -1 ? 'done' : 'recur'];
interface ReadonlyArray<T> {
	flatMap<U, This = undefined>(
		callback: (this: This, value: T, index: number, array: T[]) => U | ReadonlyArray<U>,
		thisArg?: This,
	): U[];
	flat<A, D extends number = 1>(
		this: A,
		depth?: D,
	): FlatArray<A, D>[];
}
interface Array<T> {
	flatMap<U, This = undefined>(
		callback: (this: This, value: T, index: number, array: T[]) => U | ReadonlyArray<U>,
		thisArg?: This,
	): U[];
	flat<A, D extends number = 1>(
		this: A,
		depth?: D,
	): FlatArray<A, D>[];
}
declare namespace Intl {
	interface DateTimeFormatPartTypesRegistry {
		unknown: never;
	}
}
interface ObjectConstructor {
	fromEntries<T = any>(entries: Iterable<readonly [PropertyKey, T]>): { [k: string]: T };
	fromEntries(entries: Iterable<readonly any[]>): any;
}
interface String {
	trimEnd(): string;
	trimStart(): string;
	trimLeft(): string;
	trimRight(): string;
}
interface Symbol {
	readonly description: string | undefined;
}
interface BigIntToLocaleStringOptions {
	localeMatcher?: string;
	style?: string;
	numberingSystem?: string;
	unit?: string;
	unitDisplay?: string;
	currency?: string;
	currencyDisplay?: string;
	useGrouping?: boolean;
	minimumIntegerDigits?:
		| 1
		| 2
		| 3
		| 4
		| 5
		| 6
		| 7
		| 8
		| 9
		| 10
		| 11
		| 12
		| 13
		| 14
		| 15
		| 16
		| 17
		| 18
		| 19
		| 20
		| 21;
	minimumFractionDigits?:
		| 0
		| 1
		| 2
		| 3
		| 4
		| 5
		| 6
		| 7
		| 8
		| 9
		| 10
		| 11
		| 12
		| 13
		| 14
		| 15
		| 16
		| 17
		| 18
		| 19
		| 20;
	maximumFractionDigits?:
		| 0
		| 1
		| 2
		| 3
		| 4
		| 5
		| 6
		| 7
		| 8
		| 9
		| 10
		| 11
		| 12
		| 13
		| 14
		| 15
		| 16
		| 17
		| 18
		| 19
		| 20;
	minimumSignificantDigits?:
		| 1
		| 2
		| 3
		| 4
		| 5
		| 6
		| 7
		| 8
		| 9
		| 10
		| 11
		| 12
		| 13
		| 14
		| 15
		| 16
		| 17
		| 18
		| 19
		| 20
		| 21;
	maximumSignificantDigits?:
		| 1
		| 2
		| 3
		| 4
		| 5
		| 6
		| 7
		| 8
		| 9
		| 10
		| 11
		| 12
		| 13
		| 14
		| 15
		| 16
		| 17
		| 18
		| 19
		| 20
		| 21;
	notation?: string;
	compactDisplay?: string;
}
interface BigInt {
	toString(radix?: number): string;
	toLocaleString(locales?: Intl.LocalesArgument, options?: BigIntToLocaleStringOptions): string;
	valueOf(): bigint;
	readonly [Symbol.toStringTag]: 'BigInt';
}
interface BigIntConstructor {
	(value: bigint | boolean | number | string): bigint;
	readonly prototype: BigInt;
	asIntN(bits: number, int: bigint): bigint;
	asUintN(bits: number, int: bigint): bigint;
}
declare var BigInt: BigIntConstructor;
interface BigInt64Array {
	readonly BYTES_PER_ELEMENT: number;
	readonly buffer: ArrayBufferLike;
	readonly byteLength: number;
	readonly byteOffset: number;
	copyWithin(target: number, start: number, end?: number): this;
	entries(): IterableIterator<[number, bigint]>;
	every(predicate: (value: bigint, index: number, array: BigInt64Array) => boolean, thisArg?: any): boolean;
	fill(value: bigint, start?: number, end?: number): this;
	filter(predicate: (value: bigint, index: number, array: BigInt64Array) => any, thisArg?: any): BigInt64Array;
	find(predicate: (value: bigint, index: number, array: BigInt64Array) => boolean, thisArg?: any): bigint | undefined;
	findIndex(predicate: (value: bigint, index: number, array: BigInt64Array) => boolean, thisArg?: any): number;
	forEach(callbackfn: (value: bigint, index: number, array: BigInt64Array) => void, thisArg?: any): void;
	includes(searchElement: bigint, fromIndex?: number): boolean;
	indexOf(searchElement: bigint, fromIndex?: number): number;
	join(separator?: string): string;
	keys(): IterableIterator<number>;
	lastIndexOf(searchElement: bigint, fromIndex?: number): number;
	readonly length: number;
	map(callbackfn: (value: bigint, index: number, array: BigInt64Array) => bigint, thisArg?: any): BigInt64Array;
	reduce(
		callbackfn: (previousValue: bigint, currentValue: bigint, currentIndex: number, array: BigInt64Array) => bigint,
	): bigint;
	reduce<U>(
		callbackfn: (previousValue: U, currentValue: bigint, currentIndex: number, array: BigInt64Array) => U,
		initialValue: U,
	): U;
	reduceRight(
		callbackfn: (previousValue: bigint, currentValue: bigint, currentIndex: number, array: BigInt64Array) => bigint,
	): bigint;
	reduceRight<U>(
		callbackfn: (previousValue: U, currentValue: bigint, currentIndex: number, array: BigInt64Array) => U,
		initialValue: U,
	): U;
	reverse(): this;
	set(array: ArrayLike<bigint>, offset?: number): void;
	slice(start?: number, end?: number): BigInt64Array;
	some(predicate: (value: bigint, index: number, array: BigInt64Array) => boolean, thisArg?: any): boolean;
	sort(compareFn?: (a: bigint, b: bigint) => number | bigint): this;
	subarray(begin?: number, end?: number): BigInt64Array;
	toLocaleString(locales?: string | string[], options?: Intl.NumberFormatOptions): string;
	toString(): string;
	valueOf(): BigInt64Array;
	values(): IterableIterator<bigint>;
	[Symbol.iterator](): IterableIterator<bigint>;
	readonly [Symbol.toStringTag]: 'BigInt64Array';
	[index: number]: bigint;
}
interface BigInt64ArrayConstructor {
	readonly prototype: BigInt64Array;
	new (length?: number): BigInt64Array;
	new (array: Iterable<bigint>): BigInt64Array;
	new (buffer: ArrayBufferLike, byteOffset?: number, length?: number): BigInt64Array;
	readonly BYTES_PER_ELEMENT: number;
	of(...items: bigint[]): BigInt64Array;
	from(arrayLike: ArrayLike<bigint>): BigInt64Array;
	from<U>(arrayLike: ArrayLike<U>, mapfn: (v: U, k: number) => bigint, thisArg?: any): BigInt64Array;
}
declare var BigInt64Array: BigInt64ArrayConstructor;
interface BigUint64Array {
	readonly BYTES_PER_ELEMENT: number;
	readonly buffer: ArrayBufferLike;
	readonly byteLength: number;
	readonly byteOffset: number;
	copyWithin(target: number, start: number, end?: number): this;
	entries(): IterableIterator<[number, bigint]>;
	every(predicate: (value: bigint, index: number, array: BigUint64Array) => boolean, thisArg?: any): boolean;
	fill(value: bigint, start?: number, end?: number): this;
	filter(predicate: (value: bigint, index: number, array: BigUint64Array) => any, thisArg?: any): BigUint64Array;
	find(
		predicate: (value: bigint, index: number, array: BigUint64Array) => boolean,
		thisArg?: any,
	): bigint | undefined;
	findIndex(predicate: (value: bigint, index: number, array: BigUint64Array) => boolean, thisArg?: any): number;
	forEach(callbackfn: (value: bigint, index: number, array: BigUint64Array) => void, thisArg?: any): void;
	includes(searchElement: bigint, fromIndex?: number): boolean;
	indexOf(searchElement: bigint, fromIndex?: number): number;
	join(separator?: string): string;
	keys(): IterableIterator<number>;
	lastIndexOf(searchElement: bigint, fromIndex?: number): number;
	readonly length: number;
	map(callbackfn: (value: bigint, index: number, array: BigUint64Array) => bigint, thisArg?: any): BigUint64Array;
	reduce(
		callbackfn: (
			previousValue: bigint,
			currentValue: bigint,
			currentIndex: number,
			array: BigUint64Array,
		) => bigint,
	): bigint;
	reduce<U>(
		callbackfn: (previousValue: U, currentValue: bigint, currentIndex: number, array: BigUint64Array) => U,
		initialValue: U,
	): U;
	reduceRight(
		callbackfn: (
			previousValue: bigint,
			currentValue: bigint,
			currentIndex: number,
			array: BigUint64Array,
		) => bigint,
	): bigint;
	reduceRight<U>(
		callbackfn: (previousValue: U, currentValue: bigint, currentIndex: number, array: BigUint64Array) => U,
		initialValue: U,
	): U;
	reverse(): this;
	set(array: ArrayLike<bigint>, offset?: number): void;
	slice(start?: number, end?: number): BigUint64Array;
	some(predicate: (value: bigint, index: number, array: BigUint64Array) => boolean, thisArg?: any): boolean;
	sort(compareFn?: (a: bigint, b: bigint) => number | bigint): this;
	subarray(begin?: number, end?: number): BigUint64Array;
	toLocaleString(locales?: string | string[], options?: Intl.NumberFormatOptions): string;
	toString(): string;
	valueOf(): BigUint64Array;
	values(): IterableIterator<bigint>;
	[Symbol.iterator](): IterableIterator<bigint>;
	readonly [Symbol.toStringTag]: 'BigUint64Array';
	[index: number]: bigint;
}
interface BigUint64ArrayConstructor {
	readonly prototype: BigUint64Array;
	new (length?: number): BigUint64Array;
	new (array: Iterable<bigint>): BigUint64Array;
	new (buffer: ArrayBufferLike, byteOffset?: number, length?: number): BigUint64Array;
	readonly BYTES_PER_ELEMENT: number;
	of(...items: bigint[]): BigUint64Array;
	from(arrayLike: ArrayLike<bigint>): BigUint64Array;
	from<U>(arrayLike: ArrayLike<U>, mapfn: (v: U, k: number) => bigint, thisArg?: any): BigUint64Array;
}
declare var BigUint64Array: BigUint64ArrayConstructor;
interface DataView {
	getBigInt64(byteOffset: number, littleEndian?: boolean): bigint;
	getBigUint64(byteOffset: number, littleEndian?: boolean): bigint;
	setBigInt64(byteOffset: number, value: bigint, littleEndian?: boolean): void;
	setBigUint64(byteOffset: number, value: bigint, littleEndian?: boolean): void;
}
declare namespace Intl {
	interface NumberFormat {
		format(value: number | bigint): string;
	}
}
interface Date {
	toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
	toLocaleDateString(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
	toLocaleTimeString(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
}
declare namespace Intl {
	type UnicodeBCP47LocaleIdentifier = string;
	type RelativeTimeFormatUnit =
		| 'year'
		| 'years'
		| 'quarter'
		| 'quarters'
		| 'month'
		| 'months'
		| 'week'
		| 'weeks'
		| 'day'
		| 'days'
		| 'hour'
		| 'hours'
		| 'minute'
		| 'minutes'
		| 'second'
		| 'seconds';
	type RelativeTimeFormatUnitSingular =
		| 'year'
		| 'quarter'
		| 'month'
		| 'week'
		| 'day'
		| 'hour'
		| 'minute'
		| 'second';
	type RelativeTimeFormatLocaleMatcher = 'lookup' | 'best fit';
	type RelativeTimeFormatNumeric = 'always' | 'auto';
	type RelativeTimeFormatStyle = 'long' | 'short' | 'narrow';
	type LocalesArgument =
		| UnicodeBCP47LocaleIdentifier
		| Locale
		| readonly (UnicodeBCP47LocaleIdentifier | Locale)[]
		| undefined;
	interface RelativeTimeFormatOptions {
		localeMatcher?: RelativeTimeFormatLocaleMatcher;
		numeric?: RelativeTimeFormatNumeric;
		style?: RelativeTimeFormatStyle;
	}
	interface ResolvedRelativeTimeFormatOptions {
		locale: UnicodeBCP47LocaleIdentifier;
		style: RelativeTimeFormatStyle;
		numeric: RelativeTimeFormatNumeric;
		numberingSystem: string;
	}
	type RelativeTimeFormatPart =
		| {
			type: 'literal';
			value: string;
		}
		| {
			type: Exclude<NumberFormatPartTypes, 'literal'>;
			value: string;
			unit: RelativeTimeFormatUnitSingular;
		};
	interface RelativeTimeFormat {
		format(value: number, unit: RelativeTimeFormatUnit): string;
		formatToParts(value: number, unit: RelativeTimeFormatUnit): RelativeTimeFormatPart[];
		resolvedOptions(): ResolvedRelativeTimeFormatOptions;
	}
	const RelativeTimeFormat: {
		new (
			locales?: LocalesArgument,
			options?: RelativeTimeFormatOptions,
		): RelativeTimeFormat;
		supportedLocalesOf(
			locales?: LocalesArgument,
			options?: RelativeTimeFormatOptions,
		): UnicodeBCP47LocaleIdentifier[];
	};
	interface NumberFormatOptionsStyleRegistry {
		unit: never;
	}
	interface NumberFormatOptionsCurrencyDisplayRegistry {
		narrowSymbol: never;
	}
	interface NumberFormatOptionsSignDisplayRegistry {
		auto: never;
		never: never;
		always: never;
		exceptZero: never;
	}
	type NumberFormatOptionsSignDisplay = keyof NumberFormatOptionsSignDisplayRegistry;
	interface NumberFormatOptions {
		numberingSystem?: string | undefined;
		compactDisplay?: 'short' | 'long' | undefined;
		notation?: 'standard' | 'scientific' | 'engineering' | 'compact' | undefined;
		signDisplay?: NumberFormatOptionsSignDisplay | undefined;
		unit?: string | undefined;
		unitDisplay?: 'short' | 'long' | 'narrow' | undefined;
		currencySign?: 'standard' | 'accounting' | undefined;
	}
	interface ResolvedNumberFormatOptions {
		compactDisplay?: 'short' | 'long';
		notation: 'standard' | 'scientific' | 'engineering' | 'compact';
		signDisplay: NumberFormatOptionsSignDisplay;
		unit?: string;
		unitDisplay?: 'short' | 'long' | 'narrow';
		currencySign?: 'standard' | 'accounting';
	}
	interface NumberFormatPartTypeRegistry {
		compact: never;
		exponentInteger: never;
		exponentMinusSign: never;
		exponentSeparator: never;
		unit: never;
		unknown: never;
	}
	interface DateTimeFormatOptions {
		calendar?:
			| string
			| (typeof globalThis extends { Temporal: { CalendarProtocol: infer T } } ? T : undefined)
			| undefined;
		dayPeriod?: 'narrow' | 'short' | 'long' | undefined;
		numberingSystem?: string | undefined;
		dateStyle?: 'full' | 'long' | 'medium' | 'short' | undefined;
		timeStyle?: 'full' | 'long' | 'medium' | 'short' | undefined;
		hourCycle?: 'h11' | 'h12' | 'h23' | 'h24' | undefined;
	}
	type LocaleHourCycleKey = 'h12' | 'h23' | 'h11' | 'h24';
	type LocaleCollationCaseFirst = 'upper' | 'lower' | 'false';
	interface LocaleOptions {
		baseName?: string;
		calendar?: string;
		caseFirst?: LocaleCollationCaseFirst;
		collation?: string;
		hourCycle?: LocaleHourCycleKey;
		language?: string;
		numberingSystem?: string;
		numeric?: boolean;
		region?: string;
		script?: string;
	}
	interface Locale extends LocaleOptions {
		baseName: string;
		language: string;
		maximize(): Locale;
		minimize(): Locale;
		toString(): UnicodeBCP47LocaleIdentifier;
	}
	const Locale: {
		new (tag: UnicodeBCP47LocaleIdentifier | Locale, options?: LocaleOptions): Locale;
	};
	type DisplayNamesFallback =
		| 'code'
		| 'none';
	type DisplayNamesType =
		| 'language'
		| 'region'
		| 'script'
		| 'calendar'
		| 'dateTimeField'
		| 'currency';
	type DisplayNamesLanguageDisplay =
		| 'dialect'
		| 'standard';
	interface DisplayNamesOptions {
		localeMatcher?: RelativeTimeFormatLocaleMatcher;
		style?: RelativeTimeFormatStyle;
		type: DisplayNamesType;
		languageDisplay?: DisplayNamesLanguageDisplay;
		fallback?: DisplayNamesFallback;
	}
	interface ResolvedDisplayNamesOptions {
		locale: UnicodeBCP47LocaleIdentifier;
		style: RelativeTimeFormatStyle;
		type: DisplayNamesType;
		fallback: DisplayNamesFallback;
		languageDisplay?: DisplayNamesLanguageDisplay;
	}
	interface DisplayNames {
		of(code: string): string | undefined;
		resolvedOptions(): ResolvedDisplayNamesOptions;
	}
	const DisplayNames: {
		prototype: DisplayNames;
		new (locales: LocalesArgument, options: DisplayNamesOptions): DisplayNames;
		supportedLocalesOf(
			locales?: LocalesArgument,
			options?: { localeMatcher?: RelativeTimeFormatLocaleMatcher },
		): UnicodeBCP47LocaleIdentifier[];
	};
	interface CollatorConstructor {
		new (locales?: LocalesArgument, options?: CollatorOptions): Collator;
		(locales?: LocalesArgument, options?: CollatorOptions): Collator;
		supportedLocalesOf(locales: LocalesArgument, options?: CollatorOptions): string[];
	}
	interface DateTimeFormatConstructor {
		new (locales?: LocalesArgument, options?: DateTimeFormatOptions): DateTimeFormat;
		(locales?: LocalesArgument, options?: DateTimeFormatOptions): DateTimeFormat;
		supportedLocalesOf(locales: LocalesArgument, options?: DateTimeFormatOptions): string[];
	}
	interface NumberFormatConstructor {
		new (locales?: LocalesArgument, options?: NumberFormatOptions): NumberFormat;
		(locales?: LocalesArgument, options?: NumberFormatOptions): NumberFormat;
		supportedLocalesOf(locales: LocalesArgument, options?: NumberFormatOptions): string[];
	}
	interface PluralRulesConstructor {
		new (locales?: LocalesArgument, options?: PluralRulesOptions): PluralRules;
		(locales?: LocalesArgument, options?: PluralRulesOptions): PluralRules;
		supportedLocalesOf(locales: LocalesArgument, options?: { localeMatcher?: 'lookup' | 'best fit' }): string[];
	}
}
interface Number {
	toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions): string;
}
interface PromiseFulfilledResult<T> {
	status: 'fulfilled';
	value: T;
}
interface PromiseRejectedResult {
	status: 'rejected';
	reason: any;
}
type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult;
interface PromiseConstructor {
	allSettled<T extends readonly unknown[] | []>(
		values: T,
	): Promise<{ -readonly [P in keyof T]: PromiseSettledResult<Awaited<T[P]>> }>;
	allSettled<T>(values: Iterable<T | PromiseLike<T>>): Promise<PromiseSettledResult<Awaited<T>>[]>;
}
interface Atomics {
	add(typedArray: BigInt64Array | BigUint64Array, index: number, value: bigint): bigint;
	and(typedArray: BigInt64Array | BigUint64Array, index: number, value: bigint): bigint;
	compareExchange(
		typedArray: BigInt64Array | BigUint64Array,
		index: number,
		expectedValue: bigint,
		replacementValue: bigint,
	): bigint;
	exchange(typedArray: BigInt64Array | BigUint64Array, index: number, value: bigint): bigint;
	load(typedArray: BigInt64Array | BigUint64Array, index: number): bigint;
	or(typedArray: BigInt64Array | BigUint64Array, index: number, value: bigint): bigint;
	store(typedArray: BigInt64Array | BigUint64Array, index: number, value: bigint): bigint;
	sub(typedArray: BigInt64Array | BigUint64Array, index: number, value: bigint): bigint;
	wait(typedArray: BigInt64Array, index: number, value: bigint, timeout?: number): 'ok' | 'not-equal' | 'timed-out';
	notify(typedArray: BigInt64Array, index: number, count?: number): number;
	xor(typedArray: BigInt64Array | BigUint64Array, index: number, value: bigint): bigint;
}
interface String {
	matchAll(regexp: RegExp): IterableIterator<RegExpExecArray>;
	toLocaleLowerCase(locales?: Intl.LocalesArgument): string;
	toLocaleUpperCase(locales?: Intl.LocalesArgument): string;
	localeCompare(that: string, locales?: Intl.LocalesArgument, options?: Intl.CollatorOptions): number;
}
interface SymbolConstructor {
	readonly matchAll: unique symbol;
}
interface RegExp {
	[Symbol.matchAll](str: string): IterableIterator<RegExpMatchArray>;
}
interface WeakRef<T extends WeakKey> {
	readonly [Symbol.toStringTag]: 'WeakRef';
	deref(): T | undefined;
}
interface WeakRefConstructor {
	readonly prototype: WeakRef<any>;
	new <T extends WeakKey>(target: T): WeakRef<T>;
}
declare var WeakRef: WeakRefConstructor;
interface FinalizationRegistry<T> {
	readonly [Symbol.toStringTag]: 'FinalizationRegistry';
	register(target: WeakKey, heldValue: T, unregisterToken?: WeakKey): void;
	unregister(unregisterToken: WeakKey): boolean;
}
interface FinalizationRegistryConstructor {
	readonly prototype: FinalizationRegistry<any>;
	new <T>(cleanupCallback: (heldValue: T) => void): FinalizationRegistry<T>;
}
declare var FinalizationRegistry: FinalizationRegistryConstructor;
declare namespace Intl {
	interface DateTimeFormatPartTypesRegistry {
		fractionalSecond: any;
	}
	interface DateTimeFormatOptions {
		formatMatcher?: 'basic' | 'best fit' | 'best fit' | undefined;
		dateStyle?: 'full' | 'long' | 'medium' | 'short' | undefined;
		timeStyle?: 'full' | 'long' | 'medium' | 'short' | undefined;
		dayPeriod?: 'narrow' | 'short' | 'long' | undefined;
		fractionalSecondDigits?: 1 | 2 | 3 | undefined;
	}
	interface DateTimeRangeFormatPart extends DateTimeFormatPart {
		source: 'startRange' | 'endRange' | 'shared';
	}
	interface DateTimeFormat {
		formatRange(startDate: Date | number | bigint, endDate: Date | number | bigint): string;
		formatRangeToParts(
			startDate: Date | number | bigint,
			endDate: Date | number | bigint,
		): DateTimeRangeFormatPart[];
	}
	interface ResolvedDateTimeFormatOptions {
		formatMatcher?: 'basic' | 'best fit' | 'best fit';
		dateStyle?: 'full' | 'long' | 'medium' | 'short';
		timeStyle?: 'full' | 'long' | 'medium' | 'short';
		hourCycle?: 'h11' | 'h12' | 'h23' | 'h24';
		dayPeriod?: 'narrow' | 'short' | 'long';
		fractionalSecondDigits?: 1 | 2 | 3;
	}
	type ListFormatLocaleMatcher = 'lookup' | 'best fit';
	type ListFormatType = 'conjunction' | 'disjunction' | 'unit';
	type ListFormatStyle = 'long' | 'short' | 'narrow';
	interface ListFormatOptions {
		localeMatcher?: ListFormatLocaleMatcher | undefined;
		type?: ListFormatType | undefined;
		style?: ListFormatStyle | undefined;
	}
	interface ResolvedListFormatOptions {
		locale: string;
		style: ListFormatStyle;
		type: ListFormatType;
	}
	interface ListFormat {
		format(list: Iterable<string>): string;
		formatToParts(list: Iterable<string>): { type: 'element' | 'literal'; value: string }[];
		resolvedOptions(): ResolvedListFormatOptions;
	}
	const ListFormat: {
		prototype: ListFormat;
		new (locales?: LocalesArgument, options?: ListFormatOptions): ListFormat;
		supportedLocalesOf(
			locales: LocalesArgument,
			options?: Pick<ListFormatOptions, 'localeMatcher'>,
		): UnicodeBCP47LocaleIdentifier[];
	};
}
interface AggregateError extends Error {
	errors: any[];
}
interface AggregateErrorConstructor {
	new (errors: Iterable<any>, message?: string): AggregateError;
	(errors: Iterable<any>, message?: string): AggregateError;
	readonly prototype: AggregateError;
}
declare var AggregateError: AggregateErrorConstructor;
interface PromiseConstructor {
	any<T extends readonly unknown[] | []>(values: T): Promise<Awaited<T[number]>>;
	any<T>(values: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>>;
}
interface String {
	replaceAll(searchValue: string | RegExp, replaceValue: string): string;
	replaceAll(searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
}
interface ErrorOptions {
	cause?: unknown;
}
interface Error {
	cause?: unknown;
}
interface ErrorConstructor {
	new (message?: string, options?: ErrorOptions): Error;
	(message?: string, options?: ErrorOptions): Error;
}
interface EvalErrorConstructor {
	new (message?: string, options?: ErrorOptions): EvalError;
	(message?: string, options?: ErrorOptions): EvalError;
}
interface RangeErrorConstructor {
	new (message?: string, options?: ErrorOptions): RangeError;
	(message?: string, options?: ErrorOptions): RangeError;
}
interface ReferenceErrorConstructor {
	new (message?: string, options?: ErrorOptions): ReferenceError;
	(message?: string, options?: ErrorOptions): ReferenceError;
}
interface SyntaxErrorConstructor {
	new (message?: string, options?: ErrorOptions): SyntaxError;
	(message?: string, options?: ErrorOptions): SyntaxError;
}
interface TypeErrorConstructor {
	new (message?: string, options?: ErrorOptions): TypeError;
	(message?: string, options?: ErrorOptions): TypeError;
}
interface URIErrorConstructor {
	new (message?: string, options?: ErrorOptions): URIError;
	(message?: string, options?: ErrorOptions): URIError;
}
interface AggregateErrorConstructor {
	new (
		errors: Iterable<any>,
		message?: string,
		options?: ErrorOptions,
	): AggregateError;
	(
		errors: Iterable<any>,
		message?: string,
		options?: ErrorOptions,
	): AggregateError;
}
declare namespace Intl {
	interface SegmenterOptions {
		localeMatcher?: 'best fit' | 'lookup' | undefined;
		granularity?: 'grapheme' | 'word' | 'sentence' | undefined;
	}
	interface Segmenter {
		segment(input: string): Segments;
		resolvedOptions(): ResolvedSegmenterOptions;
	}
	interface ResolvedSegmenterOptions {
		locale: string;
		granularity: 'grapheme' | 'word' | 'sentence';
	}
	interface Segments {
		containing(codeUnitIndex?: number): SegmentData;
		[Symbol.iterator](): IterableIterator<SegmentData>;
	}
	interface SegmentData {
		segment: string;
		index: number;
		input: string;
		isWordLike?: boolean;
	}
	const Segmenter: {
		prototype: Segmenter;
		new (locales?: LocalesArgument, options?: SegmenterOptions): Segmenter;
		supportedLocalesOf(
			locales: LocalesArgument,
			options?: Pick<SegmenterOptions, 'localeMatcher'>,
		): UnicodeBCP47LocaleIdentifier[];
	};
	function supportedValuesOf(
		key: 'calendar' | 'collation' | 'currency' | 'numberingSystem' | 'timeZone' | 'unit',
	): string[];
}
interface ObjectConstructor {
	hasOwn(o: object, v: PropertyKey): boolean;
}
interface RegExpMatchArray {
	indices?: RegExpIndicesArray;
}
interface RegExpExecArray {
	indices?: RegExpIndicesArray;
}
interface RegExpIndicesArray extends Array<[number, number]> {
	groups?: {
		[key: string]: [number, number];
	};
}
interface RegExp {
	readonly hasIndices: boolean;
}
interface Atomics {
	waitAsync(
		typedArray: Int32Array,
		index: number,
		value: number,
		timeout?: number,
	): { async: false; value: 'not-equal' | 'timed-out' } | { async: true; value: Promise<'ok' | 'timed-out'> };
	waitAsync(
		typedArray: BigInt64Array,
		index: number,
		value: bigint,
		timeout?: number,
	): { async: false; value: 'not-equal' | 'timed-out' } | { async: true; value: Promise<'ok' | 'timed-out'> };
}
interface String {
	at(index: number): string | undefined;
}
interface Array<T> {
	at(index: number): T | undefined;
}
interface ReadonlyArray<T> {
	at(index: number): T | undefined;
}
interface Int8Array {
	at(index: number): number | undefined;
}
interface Uint8Array {
	at(index: number): number | undefined;
}
interface Uint8ClampedArray {
	at(index: number): number | undefined;
}
interface Int16Array {
	at(index: number): number | undefined;
}
interface Uint16Array {
	at(index: number): number | undefined;
}
interface Int32Array {
	at(index: number): number | undefined;
}
interface Uint32Array {
	at(index: number): number | undefined;
}
interface Float32Array {
	at(index: number): number | undefined;
}
interface Float64Array {
	at(index: number): number | undefined;
}
interface BigInt64Array {
	at(index: number): bigint | undefined;
}
interface BigUint64Array {
	at(index: number): bigint | undefined;
}
declare namespace Intl {
	interface NumberFormatOptionsUseGroupingRegistry {
		min2: never;
		auto: never;
		always: never;
	}
	interface NumberFormatOptionsSignDisplayRegistry {
		negative: never;
	}
	interface NumberFormatOptions {
		roundingPriority?: 'auto' | 'morePrecision' | 'lessPrecision' | undefined;
		roundingIncrement?:
			| 1
			| 2
			| 5
			| 10
			| 20
			| 25
			| 50
			| 100
			| 200
			| 250
			| 500
			| 1000
			| 2000
			| 2500
			| 5000
			| undefined;
		roundingMode?:
			| 'ceil'
			| 'floor'
			| 'expand'
			| 'trunc'
			| 'halfCeil'
			| 'halfFloor'
			| 'halfExpand'
			| 'halfTrunc'
			| 'halfEven'
			| undefined;
		trailingZeroDisplay?: 'auto' | 'stripIfInteger' | undefined;
	}
	interface ResolvedNumberFormatOptions {
		roundingPriority: 'auto' | 'morePrecision' | 'lessPrecision';
		roundingMode:
			| 'ceil'
			| 'floor'
			| 'expand'
			| 'trunc'
			| 'halfCeil'
			| 'halfFloor'
			| 'halfExpand'
			| 'halfTrunc'
			| 'halfEven';
		roundingIncrement: 1 | 2 | 5 | 10 | 20 | 25 | 50 | 100 | 200 | 250 | 500 | 1000 | 2000 | 2500 | 5000;
		trailingZeroDisplay: 'auto' | 'stripIfInteger';
	}
	interface NumberRangeFormatPart extends NumberFormatPart {
		source: 'startRange' | 'endRange' | 'shared';
	}
	type StringNumericLiteral = `${number}` | 'Infinity' | '-Infinity' | '+Infinity';
	interface NumberFormat {
		format(value: number | bigint | StringNumericLiteral): string;
		formatToParts(value: number | bigint | StringNumericLiteral): NumberFormatPart[];
		formatRange(start: number | bigint | StringNumericLiteral, end: number | bigint | StringNumericLiteral): string;
		formatRangeToParts(
			start: number | bigint | StringNumericLiteral,
			end: number | bigint | StringNumericLiteral,
		): NumberRangeFormatPart[];
	}
}
interface Array<T> {
	findLast<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S | undefined;
	findLast(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T | undefined;
	findLastIndex(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): number;
	toReversed(): T[];
	toSorted(compareFn?: (a: T, b: T) => number): T[];
	toSpliced(start: number, deleteCount: number, ...items: T[]): T[];
	toSpliced(start: number, deleteCount?: number): T[];
	with(index: number, value: T): T[];
}
interface ReadonlyArray<T> {
	findLast<S extends T>(
		predicate: (value: T, index: number, array: readonly T[]) => value is S,
		thisArg?: any,
	): S | undefined;
	findLast(
		predicate: (value: T, index: number, array: readonly T[]) => unknown,
		thisArg?: any,
	): T | undefined;
	findLastIndex(
		predicate: (value: T, index: number, array: readonly T[]) => unknown,
		thisArg?: any,
	): number;
	toReversed(): T[];
	toSorted(compareFn?: (a: T, b: T) => number): T[];
	toSpliced(start: number, deleteCount: number, ...items: T[]): T[];
	toSpliced(start: number, deleteCount?: number): T[];
	with(index: number, value: T): T[];
}
interface Int8Array {
	findLast<S extends number>(
		predicate: (
			value: number,
			index: number,
			array: Int8Array,
		) => value is S,
		thisArg?: any,
	): S | undefined;
	findLast(
		predicate: (value: number, index: number, array: Int8Array) => unknown,
		thisArg?: any,
	): number | undefined;
	findLastIndex(
		predicate: (value: number, index: number, array: Int8Array) => unknown,
		thisArg?: any,
	): number;
	toReversed(): Uint8Array;
	toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;
	with(index: number, value: number): Uint8Array;
}
interface Uint8Array {
	findLast<S extends number>(
		predicate: (
			value: number,
			index: number,
			array: Uint8Array,
		) => value is S,
		thisArg?: any,
	): S | undefined;
	findLast(
		predicate: (value: number, index: number, array: Uint8Array) => unknown,
		thisArg?: any,
	): number | undefined;
	findLastIndex(
		predicate: (value: number, index: number, array: Uint8Array) => unknown,
		thisArg?: any,
	): number;
	toReversed(): Uint8Array;
	toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;
	with(index: number, value: number): Uint8Array;
}
interface Uint8ClampedArray {
	findLast<S extends number>(
		predicate: (
			value: number,
			index: number,
			array: Uint8ClampedArray,
		) => value is S,
		thisArg?: any,
	): S | undefined;
	findLast(
		predicate: (
			value: number,
			index: number,
			array: Uint8ClampedArray,
		) => unknown,
		thisArg?: any,
	): number | undefined;
	findLastIndex(
		predicate: (
			value: number,
			index: number,
			array: Uint8ClampedArray,
		) => unknown,
		thisArg?: any,
	): number;
	toReversed(): Uint8ClampedArray;
	toSorted(compareFn?: (a: number, b: number) => number): Uint8ClampedArray;
	with(index: number, value: number): Uint8ClampedArray;
}
interface Int16Array {
	findLast<S extends number>(
		predicate: (
			value: number,
			index: number,
			array: Int16Array,
		) => value is S,
		thisArg?: any,
	): S | undefined;
	findLast(
		predicate: (value: number, index: number, array: Int16Array) => unknown,
		thisArg?: any,
	): number | undefined;
	findLastIndex(
		predicate: (value: number, index: number, array: Int16Array) => unknown,
		thisArg?: any,
	): number;
	toReversed(): Int16Array;
	toSorted(compareFn?: (a: number, b: number) => number): Int16Array;
	with(index: number, value: number): Int16Array;
}
interface Uint16Array {
	findLast<S extends number>(
		predicate: (
			value: number,
			index: number,
			array: Uint16Array,
		) => value is S,
		thisArg?: any,
	): S | undefined;
	findLast(
		predicate: (
			value: number,
			index: number,
			array: Uint16Array,
		) => unknown,
		thisArg?: any,
	): number | undefined;
	findLastIndex(
		predicate: (
			value: number,
			index: number,
			array: Uint16Array,
		) => unknown,
		thisArg?: any,
	): number;
	toReversed(): Uint16Array;
	toSorted(compareFn?: (a: number, b: number) => number): Uint16Array;
	with(index: number, value: number): Uint16Array;
}
interface Int32Array {
	findLast<S extends number>(
		predicate: (
			value: number,
			index: number,
			array: Int32Array,
		) => value is S,
		thisArg?: any,
	): S | undefined;
	findLast(
		predicate: (value: number, index: number, array: Int32Array) => unknown,
		thisArg?: any,
	): number | undefined;
	findLastIndex(
		predicate: (value: number, index: number, array: Int32Array) => unknown,
		thisArg?: any,
	): number;
	toReversed(): Int32Array;
	toSorted(compareFn?: (a: number, b: number) => number): Int32Array;
	with(index: number, value: number): Int32Array;
}
interface Uint32Array {
	findLast<S extends number>(
		predicate: (
			value: number,
			index: number,
			array: Uint32Array,
		) => value is S,
		thisArg?: any,
	): S | undefined;
	findLast(
		predicate: (
			value: number,
			index: number,
			array: Uint32Array,
		) => unknown,
		thisArg?: any,
	): number | undefined;
	findLastIndex(
		predicate: (
			value: number,
			index: number,
			array: Uint32Array,
		) => unknown,
		thisArg?: any,
	): number;
	toReversed(): Uint32Array;
	toSorted(compareFn?: (a: number, b: number) => number): Uint32Array;
	with(index: number, value: number): Uint32Array;
}
interface Float32Array {
	findLast<S extends number>(
		predicate: (
			value: number,
			index: number,
			array: Float32Array,
		) => value is S,
		thisArg?: any,
	): S | undefined;
	findLast(
		predicate: (
			value: number,
			index: number,
			array: Float32Array,
		) => unknown,
		thisArg?: any,
	): number | undefined;
	findLastIndex(
		predicate: (
			value: number,
			index: number,
			array: Float32Array,
		) => unknown,
		thisArg?: any,
	): number;
	toReversed(): Float32Array;
	toSorted(compareFn?: (a: number, b: number) => number): Float32Array;
	with(index: number, value: number): Float32Array;
}
interface Float64Array {
	findLast<S extends number>(
		predicate: (
			value: number,
			index: number,
			array: Float64Array,
		) => value is S,
		thisArg?: any,
	): S | undefined;
	findLast(
		predicate: (
			value: number,
			index: number,
			array: Float64Array,
		) => unknown,
		thisArg?: any,
	): number | undefined;
	findLastIndex(
		predicate: (
			value: number,
			index: number,
			array: Float64Array,
		) => unknown,
		thisArg?: any,
	): number;
	toReversed(): Float64Array;
	toSorted(compareFn?: (a: number, b: number) => number): Float64Array;
	with(index: number, value: number): Float64Array;
}
interface BigInt64Array {
	findLast<S extends bigint>(
		predicate: (
			value: bigint,
			index: number,
			array: BigInt64Array,
		) => value is S,
		thisArg?: any,
	): S | undefined;
	findLast(
		predicate: (
			value: bigint,
			index: number,
			array: BigInt64Array,
		) => unknown,
		thisArg?: any,
	): bigint | undefined;
	findLastIndex(
		predicate: (
			value: bigint,
			index: number,
			array: BigInt64Array,
		) => unknown,
		thisArg?: any,
	): number;
	toReversed(): BigInt64Array;
	toSorted(compareFn?: (a: bigint, b: bigint) => number): BigInt64Array;
	with(index: number, value: bigint): BigInt64Array;
}
interface BigUint64Array {
	findLast<S extends bigint>(
		predicate: (
			value: bigint,
			index: number,
			array: BigUint64Array,
		) => value is S,
		thisArg?: any,
	): S | undefined;
	findLast(
		predicate: (
			value: bigint,
			index: number,
			array: BigUint64Array,
		) => unknown,
		thisArg?: any,
	): bigint | undefined;
	findLastIndex(
		predicate: (
			value: bigint,
			index: number,
			array: BigUint64Array,
		) => unknown,
		thisArg?: any,
	): number;
	toReversed(): BigUint64Array;
	toSorted(compareFn?: (a: bigint, b: bigint) => number): BigUint64Array;
	with(index: number, value: bigint): BigUint64Array;
}
interface WeakKeyTypes {
	symbol: symbol;
}
declare namespace Intl {
	// Empty
}
interface ArrayConstructor {
	fromAsync<T>(
		iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>,
	): Promise<T[]>;
	fromAsync<T, U>(
		iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>,
		mapFn: (value: Awaited<T>) => U,
		thisArg?: any,
	): Promise<Awaited<U>[]>;
}
interface MapConstructor {
	groupBy<K, T>(
		items: Iterable<T>,
		keySelector: (item: T, index: number) => K,
	): Map<K, T[]>;
}
interface ReadonlySetLike<T> {
	keys(): Iterator<T>;
	has(value: T): boolean;
	readonly size: number;
}
interface Set<T> {
	union<U>(other: ReadonlySetLike<U>): Set<T | U>;
	intersection<U>(other: ReadonlySetLike<U>): Set<T & U>;
	difference<U>(other: ReadonlySetLike<U>): Set<T>;
	symmetricDifference<U>(other: ReadonlySetLike<U>): Set<T | U>;
	isSubsetOf(other: ReadonlySetLike<unknown>): boolean;
	isSupersetOf(other: ReadonlySetLike<unknown>): boolean;
	isDisjointFrom(other: ReadonlySetLike<unknown>): boolean;
}
interface ReadonlySet<T> {
	union<U>(other: ReadonlySetLike<U>): Set<T | U>;
	intersection<U>(other: ReadonlySetLike<U>): Set<T & U>;
	difference<U>(other: ReadonlySetLike<U>): Set<T>;
	symmetricDifference<U>(other: ReadonlySetLike<U>): Set<T | U>;
	isSubsetOf(other: ReadonlySetLike<unknown>): boolean;
	isSupersetOf(other: ReadonlySetLike<unknown>): boolean;
	isDisjointFrom(other: ReadonlySetLike<unknown>): boolean;
}
interface SymbolConstructor {
	readonly metadata: unique symbol;
}
interface Function {
	[Symbol.metadata]: DecoratorMetadata | null;
}
interface SymbolConstructor {
	readonly dispose: unique symbol;
	readonly asyncDispose: unique symbol;
}
interface Disposable {
	[Symbol.dispose](): void;
}
interface AsyncDisposable {
	[Symbol.asyncDispose](): PromiseLike<void>;
}
interface SuppressedError extends Error {
	error: any;
	suppressed: any;
}
interface SuppressedErrorConstructor {
	new (error: any, suppressed: any, message?: string): SuppressedError;
	(error: any, suppressed: any, message?: string): SuppressedError;
	readonly prototype: SuppressedError;
}
declare var SuppressedError: SuppressedErrorConstructor;
interface DisposableStack {
	readonly disposed: boolean;
	dispose(): void;
	use<T extends Disposable | null | undefined>(value: T): T;
	adopt<T>(value: T, onDispose: (value: T) => void): T;
	defer(onDispose: () => void): void;
	move(): DisposableStack;
	[Symbol.dispose](): void;
	readonly [Symbol.toStringTag]: string;
}
interface DisposableStackConstructor {
	new (): DisposableStack;
	readonly prototype: DisposableStack;
}
declare var DisposableStack: DisposableStackConstructor;
interface AsyncDisposableStack {
	readonly disposed: boolean;
	disposeAsync(): Promise<void>;
	use<T extends AsyncDisposable | Disposable | null | undefined>(value: T): T;
	adopt<T>(value: T, onDisposeAsync: (value: T) => PromiseLike<void> | void): T;
	defer(onDisposeAsync: () => PromiseLike<void> | void): void;
	move(): AsyncDisposableStack;
	[Symbol.asyncDispose](): Promise<void>;
	readonly [Symbol.toStringTag]: string;
}
interface AsyncDisposableStackConstructor {
	new (): AsyncDisposableStack;
	readonly prototype: AsyncDisposableStack;
}
declare var AsyncDisposableStack: AsyncDisposableStackConstructor;
interface ObjectConstructor {
	groupBy<K extends PropertyKey, T>(
		items: Iterable<T>,
		keySelector: (item: T, index: number) => K,
	): Partial<Record<K, T[]>>;
}
interface PromiseWithResolvers<T> {
	promise: Promise<T>;
	resolve: (value: T | PromiseLike<T>) => void;
	reject: (reason?: any) => void;
}
interface PromiseConstructor {
	withResolvers<T>(): PromiseWithResolvers<T>;
}
interface RegExp {
	readonly unicodeSets: boolean;
}
interface String {
	isWellFormed(): boolean;
	toWellFormed(): string;
}
