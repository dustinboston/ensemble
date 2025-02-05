import * as types from "../../types.js";
export const dateFunctions = [
    ['Date', newDate],
    ['Date.now', dateNow],
    ['Date.parse', dateParse],
    ['Date.UTC', dateUtc],
    ['Date.prototype.getDate', dateGetDate],
    ['Date.prototype.getDay', dateGetDay],
    ['Date.prototype.getFullYear', dateGetFullYear],
    ['Date.prototype.getHours', dateGetHours],
    ['Date.prototype.getMilliseconds', dateGetMilliseconds],
    ['Date.prototype.getMinutes', dateGetMinutes],
    ['Date.prototype.getMonth', dateGetMonth],
    ['Date.prototype.getSeconds', dateGetSeconds],
    ['Date.prototype.getTime', dateGetTime],
    ['Date.prototype.getTimezoneOffset', dateGetTimezoneOffset],
    ['Date.prototype.getUTCDate', dateGetUTCDate],
    ['Date.prototype.getUTCDay', dateGetUTCDay],
    ['Date.prototype.getUTCFullYear', dateGetUTCFullYear],
    ['Date.prototype.getUTCHours', dateGetUTCHours],
    ['Date.prototype.getUTCMilliseconds', dateGetUTCMilliseconds],
    ['Date.prototype.getUTCMinutes', dateGetUTCMinutes],
    ['Date.prototype.getUTCMonth', dateGetUTCMonth],
    ['Date.prototype.getUTCSeconds', dateGetUTCSeconds],
    ['Date.prototype.setDate', dateSetDate],
    ['Date.prototype.setFullYear', dateSetFullYear],
    ['Date.prototype.setHours', dateSetHours],
    ['Date.prototype.setMilliseconds', dateSetMilliseconds],
    ['Date.prototype.setMinutes', dateSetMinutes],
    ['Date.prototype.setMonth', dateSetMonth],
    ['Date.prototype.setSeconds', dateSetSeconds],
    ['Date.prototype.setTime', dateSetTime],
    ['Date.prototype.setUTCDate', dateSetUTCDate],
    ['Date.prototype.setUTCFullYear', dateSetUTCFullYear],
    ['Date.prototype.setUTCHours', dateSetUTCHours],
    ['Date.prototype.setUTCMilliseconds', dateSetUTCMilliseconds],
    ['Date.prototype.setUTCMinutes', dateSetUTCMinutes],
    ['Date.prototype.setUTCMonth', dateSetUTCMonth],
    ['Date.prototype.setUTCSeconds', dateSetUTCSeconds],
    ['Date.prototype.toDateString', dateToDateString],
    ['Date.prototype.toISOString', dateToISOString],
    ['Date.prototype.toJSON', dateToJSON],
    ['Date.prototype.toLocaleDateString', dateToLocaleDateString],
    ['Date.prototype.toLocaleString', dateToLocaleString],
    ['Date.prototype.toLocaleTimeString', dateToLocaleTimeString],
    ['Date.prototype.toString', dateToString],
    ['Date.prototype.toTimeString', dateToTimeString],
    ['Date.prototype.toUTCString', dateToUTCString],
];
export function newDate(...args) {
    const unwrapped = args.map(types.unwrap);
    const date = unwrapped.length > 0 ? new Date(...unwrapped) : new Date();
    return types.createNumberNode(date.getTime());
}
export function dateNow(..._args) {
    return types.createNumberNode(Date.now());
}
export function dateParse(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertStringNode(args[0]);
    const date = Date.parse(args[0].value);
    return types.createNumberNode(date);
}
export function dateUtc(...args) {
    const unwrapped = args.map(types.unwrap);
    const timestamp = Date.UTC(...unwrapped);
    if (Number.isNaN(timestamp))
        return types.createNilNode();
    return types.createNumberNode(timestamp);
}
export function dateGetDate(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createNumberNode(date.getDate());
}
export function dateGetDay(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createNumberNode(date.getDay());
}
export function dateGetFullYear(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createNumberNode(date.getFullYear());
}
export function dateGetHours(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createNumberNode(date.getHours());
}
export function dateGetMilliseconds(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createNumberNode(date.getMilliseconds());
}
export function dateGetMinutes(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createNumberNode(date.getMinutes());
}
export function dateGetMonth(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createNumberNode(date.getMonth());
}
export function dateGetSeconds(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createNumberNode(date.getSeconds());
}
export function dateGetTime(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createNumberNode(date.getTime());
}
export function dateGetTimezoneOffset(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createNumberNode(date.getTimezoneOffset());
}
export function dateGetUTCDate(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createNumberNode(date.getUTCDate());
}
export function dateGetUTCDay(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createNumberNode(date.getUTCDay());
}
export function dateGetUTCFullYear(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createNumberNode(date.getUTCFullYear());
}
export function dateGetUTCHours(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createNumberNode(date.getUTCHours());
}
export function dateGetUTCMilliseconds(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createNumberNode(date.getUTCMilliseconds());
}
export function dateGetUTCMinutes(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createNumberNode(date.getUTCMinutes());
}
export function dateGetUTCMonth(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createNumberNode(date.getUTCMonth());
}
export function dateGetUTCSeconds(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createNumberNode(date.getUTCSeconds());
}
export function dateSetDate(...args) {
    types.assertArgumentCount(args.length, 2);
    types.assertNumberNode(args[0]);
    types.assertNumberNode(args[1]);
    const date = new Date(args[0].value);
    date.setDate(args[1].value);
    return types.createNumberNode(date.getTime());
}
export function dateSetFullYear(...args) {
    types.assertArgumentCount(args.length, 2);
    types.assertNumberNode(args[0]);
    types.assertNumberNode(args[1]);
    const date = new Date(args[0].value);
    date.setFullYear(args[1].value);
    return types.createNumberNode(date.getTime());
}
export function dateSetHours(...args) {
    types.assertArgumentCount(args.length, 2);
    types.assertNumberNode(args[0]);
    types.assertNumberNode(args[1]);
    const date = new Date(args[0].value);
    date.setHours(args[1].value);
    return types.createNumberNode(date.getTime());
}
export function dateSetMilliseconds(...args) {
    types.assertArgumentCount(args.length, 2);
    types.assertNumberNode(args[0]);
    types.assertNumberNode(args[1]);
    const date = new Date(args[0].value);
    date.setMilliseconds(args[1].value);
    return types.createNumberNode(date.getTime());
}
export function dateSetMinutes(...args) {
    types.assertArgumentCount(args.length, 2);
    types.assertNumberNode(args[0]);
    types.assertNumberNode(args[1]);
    const date = new Date(args[0].value);
    date.setMinutes(args[1].value);
    return types.createNumberNode(date.getTime());
}
export function dateSetMonth(...args) {
    types.assertArgumentCount(args.length, 2);
    types.assertNumberNode(args[0]);
    types.assertNumberNode(args[1]);
    const date = new Date(args[0].value);
    date.setMonth(args[1].value);
    return types.createNumberNode(date.getTime());
}
export function dateSetSeconds(...args) {
    types.assertArgumentCount(args.length, 2);
    types.assertNumberNode(args[0]);
    types.assertNumberNode(args[1]);
    const date = new Date(args[0].value);
    date.setSeconds(args[1].value);
    return types.createNumberNode(date.getTime());
}
export function dateSetTime(...args) {
    types.assertArgumentCount(args.length, 2);
    types.assertNumberNode(args[0]);
    types.assertNumberNode(args[1]);
    const date = new Date(args[0].value);
    date.setTime(args[1].value);
    return types.createNumberNode(date.getTime());
}
export function dateSetUTCDate(...args) {
    types.assertArgumentCount(args.length, 2);
    types.assertNumberNode(args[0]);
    types.assertNumberNode(args[1]);
    const date = new Date(args[0].value);
    date.setUTCDate(args[1].value);
    return types.createNumberNode(date.getTime());
}
export function dateSetUTCFullYear(...args) {
    types.assertArgumentCount(args.length, 2);
    types.assertNumberNode(args[0]);
    types.assertNumberNode(args[1]);
    const date = new Date(args[0].value);
    date.setUTCFullYear(args[1].value);
    return types.createNumberNode(date.getTime());
}
export function dateSetUTCHours(...args) {
    types.assertArgumentCount(args.length, 2);
    types.assertNumberNode(args[0]);
    types.assertNumberNode(args[1]);
    const date = new Date(args[0].value);
    date.setUTCHours(args[1].value);
    return types.createNumberNode(date.getTime());
}
export function dateSetUTCMilliseconds(...args) {
    types.assertArgumentCount(args.length, 2);
    types.assertNumberNode(args[0]);
    types.assertNumberNode(args[1]);
    const date = new Date(args[0].value);
    date.setUTCMilliseconds(args[1].value);
    return types.createNumberNode(date.getTime());
}
export function dateSetUTCMinutes(...args) {
    types.assertArgumentCount(args.length, 2);
    types.assertNumberNode(args[0]);
    types.assertNumberNode(args[1]);
    const date = new Date(args[0].value);
    date.setUTCMinutes(args[1].value);
    return types.createNumberNode(date.getTime());
}
export function dateSetUTCMonth(...args) {
    types.assertArgumentCount(args.length, 2);
    types.assertNumberNode(args[0]);
    types.assertNumberNode(args[1]);
    const date = new Date(args[0].value);
    date.setUTCMonth(args[1].value);
    return types.createNumberNode(date.getTime());
}
export function dateSetUTCSeconds(...args) {
    types.assertArgumentCount(args.length, 2);
    types.assertNumberNode(args[0]);
    types.assertNumberNode(args[1]);
    const date = new Date(args[0].value);
    date.setUTCSeconds(args[1].value);
    return types.createNumberNode(date.getTime());
}
export function dateToDateString(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createStringNode(date.toDateString());
}
export function dateToISOString(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createStringNode(date.toISOString());
}
export function dateToJSON(...args) {
    types.assertVariableArgumentCount(args.length, 1, 2);
    types.assertNumberNode(args[0]);
    if (args[1])
        types.assertStringNode(args[1]);
    const date = new Date(args[0].value);
    return types.createStringNode(date.toJSON()); // Should return a MapNode
}
export function dateToLocaleDateString(...args) {
    types.assertVariableArgumentCount(args.length, 1, 3);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    const dateArgs = args.slice(1).map(types.unwrap);
    return types.createStringNode(date.toLocaleDateString(...dateArgs));
}
export function dateToLocaleString(...args) {
    types.assertVariableArgumentCount(args.length, 1, 3);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    const dateArgs = args.slice(1).map(types.unwrap);
    return types.createStringNode(date.toLocaleString(...dateArgs));
}
export function dateToLocaleTimeString(...args) {
    types.assertVariableArgumentCount(args.length, 1, 3);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    const dateArgs = args.slice(1).map(types.unwrap);
    return types.createStringNode(date.toLocaleTimeString(...dateArgs));
}
export function dateToString(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createStringNode(date.toString());
}
export function dateToTimeString(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createStringNode(date.toTimeString());
}
export function dateToUTCString(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertNumberNode(args[0]);
    const date = new Date(args[0].value);
    return types.createStringNode(date.toUTCString());
}
