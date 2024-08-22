import { assertEquals } from '../tests/deps.ts';
import { convert } from './generate.ts';

Deno.test('Should parse static methods', () => {
	const data = `interface String {}
    interface StringConstructor {
        fromCharCode(...codes: number[]): string;
    }
    declare var String: StringConstructor;`;

	const globals = convert('foo', data);
	const actual = [...globals.entries()].sort();

	assertEquals(actual, [
		['String', 'String'],
		['String.fromCharCode', 'String.fromCharCode'],
	]);
});

Deno.test('Should parse instance methods', () => {
	const data = `
    interface String { 
        charAt(pos: number): string; 
    }

    interface StringConstructor {
        readonly prototype: String;
    }

    declare var String: StringConstructor;`;

	const globals = convert('foo', data);
	const actual = [...globals.entries()].sort();
	console.log('actual', actual);

	assertEquals(actual, [
		['String', 'String'],
		['String.charAt', 'String.prototype.charAt'],
		['String.prototype', 'String["prototype"]'],
	]);
});

Deno.test('Should convert a node into symbols', () => {
	const data = getTestCode();
	const globals = convert('foo', data);
	const actual = [...globals.entries()].sort();

	const expected = [
		['String.charAt', 'String.prototype.charAt'],
		['String.charCodeAt', 'String.prototype.charCodeAt'],
		['String.concat', 'String.prototype.concat'],
		['String.fromCharCode', 'String.fromCharCode'],
		['String.indexOf', 'String.prototype.indexOf'],
		['String.lastIndexOf', 'String.prototype.lastIndexOf'],
		['String.length', 'String.prototype.length'],
		['String.localeCompare', 'String.prototype.localeCompare'],
		['String.match', 'String.prototype.match'],
		['String.new', '(...args: unknown[]) => Reflect.construct(String, args)'],
		['String.prototype', 'String["prototype"]'],
		['String.replace', 'String.prototype.replace'],
		['String.search', 'String.prototype.search'],
		['String.slice', 'String.prototype.slice'],
		['String.split', 'String.prototype.split'],
		['String.substr', 'String.prototype.substr'],
		['String.substring', 'String.prototype.substring'],
		['String.toLocaleLowerCase', 'String.prototype.toLocaleLowerCase'],
		['String.toLocaleUpperCase', 'String.prototype.toLocaleUpperCase'],
		['String.toLowerCase', 'String.prototype.toLowerCase'],
		['String.toString', 'String.prototype.toString'],
		['String.toUpperCase', 'String.prototype.toUpperCase'],
		['String.trim', 'String.prototype.trim'],
		['String.valueOf', 'String.prototype.valueOf'],
		['String', 'String'],
	];

	assertEquals(actual.length, expected.length);
});

function getTestCode() {
	return `
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
    `;
}
