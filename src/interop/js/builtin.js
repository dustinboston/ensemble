import * as types from "../../types.js";
export const builtInFunctions = [
    ['decodeURI', globalDecodeUri],
    ['decodeURIComponent', globalDecodeUriComponent],
    ['encodeURI', globalEncodeUri],
    ['encodeURIComponent', globalEncodeUriComponent],
];
export function globalDecodeUri(...astArgs) {
    types.assertArgumentCount(astArgs.length, 1);
    types.assertStringNode(astArgs[0]);
    const result = decodeURI(astArgs[0].value);
    return types.createStringNode(result);
}
export function globalDecodeUriComponent(...astArgs) {
    types.assertArgumentCount(astArgs.length, 1);
    types.assertStringNode(astArgs[0]);
    const result = decodeURIComponent(astArgs[0].value);
    return types.createStringNode(result);
}
export function globalEncodeUri(...astArgs) {
    types.assertArgumentCount(astArgs.length, 1);
    types.assertStringNode(astArgs[0]);
    const result = encodeURI(astArgs[0].value);
    return types.createStringNode(result);
}
export function globalEncodeUriComponent(...astArgs) {
    types.assertArgumentCount(astArgs.length, 1);
    types.assertStringNode(astArgs[0]);
    const result = encodeURIComponent(astArgs[0].value);
    return types.createStringNode(result);
}
