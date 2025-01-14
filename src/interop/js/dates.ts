import * as types from '@/types.ts';

export const dateFunctions: Array<[string, types.Closure]> = [
  ['Date', newDate],
  ['Date.now', now],
  ['Date.parse', parse],
  ['Date.UTC', utc],
  ['Date.prototype.getDate', getDate],
  ['Date.prototype.getDay', getDay],
  ['Date.prototype.getFullYear', getFullYear],
  ['Date.prototype.getHours', getHours],
  ['Date.prototype.getMilliseconds', getMilliseconds],
  ['Date.prototype.getMinutes', getMinutes],
  ['Date.prototype.getMonth', getMonth],
  ['Date.prototype.getSeconds', getSeconds],
  ['Date.prototype.getTime', getTime],
  ['Date.prototype.getTimezoneOffset', getTimezoneOffset],
  ['Date.prototype.getUTCDate', getUTCDate],
  ['Date.prototype.getUTCDay', getUTCDay],
  ['Date.prototype.getUTCFullYear', getUTCFullYear],
  ['Date.prototype.getUTCHours', getUTCHours],
  ['Date.prototype.getUTCMilliseconds', getUTCMilliseconds],
  ['Date.prototype.getUTCMinutes', getUTCMinutes],
  ['Date.prototype.getUTCMonth', getUTCMonth],
  ['Date.prototype.getUTCSeconds', getUTCSeconds],
  ['Date.prototype.setDate', setDate],
  ['Date.prototype.setFullYear', setFullYear],
  ['Date.prototype.setHours', setHours],
  ['Date.prototype.setMilliseconds', setMilliseconds],
  ['Date.prototype.setMinutes', setMinutes],
  ['Date.prototype.setMonth', setMonth],
  ['Date.prototype.setSeconds', setSeconds],
  ['Date.prototype.setTime', setTime],
  ['Date.prototype.setUTCDate', setUTCDate],
  ['Date.prototype.setUTCFullYear', setUTCFullYear],
  ['Date.prototype.setUTCHours', setUTCHours],
  ['Date.prototype.setUTCMilliseconds', setUTCMilliseconds],
  ['Date.prototype.setUTCMinutes', setUTCMinutes],
  ['Date.prototype.setUTCMonth', setUTCMonth],
  ['Date.prototype.setUTCSeconds', setUTCSeconds],
  ['Date.prototype.toDateString', toDateString],
  ['Date.prototype.toISOString', toISOString],
  ['Date.prototype.toJSON', toJSON],
  ['Date.prototype.toLocaleDateString', toLocaleDateString],
  ['Date.prototype.toLocaleString', toLocaleString],
  ['Date.prototype.toLocaleTimeString', toLocaleTimeString],
  ['Date.prototype.toString', toString],
  ['Date.prototype.toTimeString', toTimeString],
  ['Date.prototype.toUTCString', toUTCString],
];

type DateType = [
  year: number,
  monthIndex: number,
  date?: number,
  hours?: number,
  minutes?: number,
  seconds?: number,
  ms?: number,
];

export function newDate(...args: types.AstNode[]): types.AstNode {
  const unwrapped = args.map(types.unwrap);
  const date = unwrapped.length > 0 ? new Date(...unwrapped as DateType) : new Date();
  return types.createNumberNode(date.getTime());
}

export function now(...args: types.AstNode[]): types.AstNode {
  return types.createNumberNode(Date.now());
}

export function parse(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertStringNode(args[0]);
  const date = Date.parse(args[0].value);
  return types.createNumberNode(date);
}

type UtcType = [
  year: number,
  monthIndex?: number,
  date?: number,
  hours?: number,
  minutes?: number,
  seconds?: number,
  ms?: number,
];

export function utc(...args: types.AstNode[]): types.AstNode {
  const unwrapped = args.map(types.unwrap);
  const timestamp = Date.UTC(...unwrapped as UtcType);
  return types.createNumberNode(timestamp);
}

export function getDate(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createNumberNode(date.getDate());
}

export function getDay(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createNumberNode(date.getDay());
}

export function getFullYear(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createNumberNode(date.getFullYear());
}

export function getHours(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createNumberNode(date.getHours());
}

export function getMilliseconds(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createNumberNode(date.getMilliseconds());
}

export function getMinutes(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createNumberNode(date.getMinutes());
}

export function getMonth(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createNumberNode(date.getMonth());
}

export function getSeconds(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createNumberNode(date.getSeconds());
}

export function getTime(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createNumberNode(date.getTime());
}

export function getTimezoneOffset(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createNumberNode(date.getTimezoneOffset());
}

export function getUTCDate(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createNumberNode(date.getUTCDate());
}

export function getUTCDay(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createNumberNode(date.getUTCDay());
}

export function getUTCFullYear(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createNumberNode(date.getUTCFullYear());
}

export function getUTCHours(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createNumberNode(date.getUTCHours());
}

export function getUTCMilliseconds(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createNumberNode(date.getUTCMilliseconds());
}

export function getUTCMinutes(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createNumberNode(date.getUTCMinutes());
}

export function getUTCMonth(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createNumberNode(date.getUTCMonth());
}

export function getUTCSeconds(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createNumberNode(date.getUTCSeconds());
}

export function setDate(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertNumberNode(args[0]);
  types.assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setDate(args[1].value);
  return types.createNumberNode(date.getTime());
}

export function setFullYear(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertNumberNode(args[0]);
  types.assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setFullYear(args[1].value);
  return types.createNumberNode(date.getTime());
}

export function setHours(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertNumberNode(args[0]);
  types.assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setHours(args[1].value);
  return types.createNumberNode(date.getTime());
}

export function setMilliseconds(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertNumberNode(args[0]);
  types.assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setMilliseconds(args[1].value);
  return types.createNumberNode(date.getTime());
}

export function setMinutes(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertNumberNode(args[0]);
  types.assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setMinutes(args[1].value);
  return types.createNumberNode(date.getTime());
}

export function setMonth(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertNumberNode(args[0]);
  types.assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setMonth(args[1].value);
  return types.createNumberNode(date.getTime());
}

export function setSeconds(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertNumberNode(args[0]);
  types.assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setSeconds(args[1].value);
  return types.createNumberNode(date.getTime());
}

export function setTime(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertNumberNode(args[0]);
  types.assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setTime(args[1].value);
  return types.createNumberNode(date.getTime());
}

export function setUTCDate(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertNumberNode(args[0]);
  types.assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setUTCDate(args[1].value);
  return types.createNumberNode(date.getTime());
}

export function setUTCFullYear(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertNumberNode(args[0]);
  types.assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setUTCFullYear(args[1].value);
  return types.createNumberNode(date.getTime());
}

export function setUTCHours(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertNumberNode(args[0]);
  types.assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setUTCHours(args[1].value);
  return types.createNumberNode(date.getTime());
}

export function setUTCMilliseconds(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertNumberNode(args[0]);
  types.assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setUTCMilliseconds(args[1].value);
  return types.createNumberNode(date.getTime());
}

export function setUTCMinutes(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertNumberNode(args[0]);
  types.assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setUTCMinutes(args[1].value);
  return types.createNumberNode(date.getTime());
}

export function setUTCMonth(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertNumberNode(args[0]);
  types.assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setUTCMonth(args[1].value);
  return types.createNumberNode(date.getTime());
}

export function setUTCSeconds(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertNumberNode(args[0]);
  types.assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setUTCSeconds(args[1].value);
  return types.createNumberNode(date.getTime());
}

export function toDateString(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createStringNode(date.toDateString());
}

export function toISOString(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createStringNode(date.toISOString());
}

export function toJSON(...args: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(args.length, 1, 2);
  types.assertNumberNode(args[0]);
  if (args[1]) types.assertStringNode(args[1]);
  const date = new Date(args[0].value);
  return types.toAst(date.toJSON()); // Should return a MapNode
}

type LocaleDateString = [
  locales?: Intl.LocalesArgument | string | string[],
  options?: Intl.DateTimeFormatOptions,
];

export function toLocaleDateString(...args: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(args.length, 1, 3);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  const dateArgs = args.slice(1).map(types.unwrap) as LocaleDateString;
  return types.createStringNode(date.toLocaleDateString(...dateArgs as LocaleDateString));
}

export function toLocaleString(...args: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(args.length, 1, 3);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  const dateArgs = args.slice(1).map(types.unwrap) as LocaleDateString;
  return types.createStringNode(date.toLocaleString(...dateArgs as LocaleDateString));
}

export function toLocaleTimeString(...args: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(args.length, 1, 3);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  const dateArgs = args.slice(1).map(types.unwrap) as LocaleDateString;
  return types.createStringNode(date.toLocaleTimeString(...dateArgs as LocaleDateString));
}

export function toString(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createStringNode(date.toString());
}

export function toTimeString(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createStringNode(date.toTimeString());
}

export function toUTCString(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return types.createStringNode(date.toUTCString());
}
