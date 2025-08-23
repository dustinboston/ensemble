/**
 * Performance utilities to replace spread operator usage
 */

/**
 * Efficiently concatenate arrays without spread operator
 */
export function performantSpread<T>(arrays: T[][]): T[] {
  const result: T[] = [];
  for (const array of arrays) {
    for (const item of array) {
      result.push(item);
    }
  }
  return result;
}

/**
 * Efficiently prepend items to array without spread operator
 */
export function performantPrepend<T>(items: T[], target: T[]): T[] {
  const result: T[] = [];
  for (const item of items) {
    result.push(item);
  }
  for (const item of target) {
    result.push(item);
  }
  return result;
}

/**
 * Efficiently append items to array without spread operator
 */
export function performantAppend<T>(target: T[], items: T[]): T[] {
  const result: T[] = [];
  for (const item of target) {
    result.push(item);
  }
  for (const item of items) {
    result.push(item);
  }
  return result;
}

/**
 * Efficiently call function with array arguments without spread operator
 */
export function performantApply<T>(fn: (...args: any[]) => T, args: any[]): T {
  return fn.apply(null, args);
}