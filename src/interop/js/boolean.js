import * as types from "../../types.js";
export const booleanFunctions = [
    ['Boolean', toBoolean],
];
export function toBoolean(...astArgs) {
    types.assertArgumentCount(astArgs.length, 1);
    types.assertAstNode(astArgs[0]);
    return types.createBooleanNode(Boolean(astArgs[0].value));
}
