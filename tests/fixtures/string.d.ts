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
