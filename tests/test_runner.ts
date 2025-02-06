export function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (error) {
    console.log(`❌ ${name}`);
    console.log(error);
  }
}

export function ignoreTest(name: string, fn: () => void) {
  console.log(`🟡 ${name}`);
}

export function assert(value: unknown, message?: string) {
  if (!value) {
    throw new Error(`Assertion failed: ${value}`);
  }
}

export function assertEquals(a: unknown, b: unknown) {
  if (a === b) return;

  if (!isDeepEqual(a, b)) {
    throw new Error(`Expected ${a} to equal ${b}`);
  }
}

export const assertStrictEquals = assertEquals;

export function assertThrows(fn: () => void, type?: unknown, message?: string) {
  try {
    fn();
    throw new Error("Expected an error");
  } catch (error) {
    if (type && message) {
      const actualMessage = (error instanceof Error) ? error.message : JSON.stringify(error);
      if (!actualMessage.includes(message)) {
        throw new Error(`Expected the error message to include: ${message}`);
      }
    }
  }
}

export function assertInstanceOf(object: any, class_: any): asserts object is typeof class_ {
  if (!(object instanceof class_)) {
    throw new Error(`Expected object to be instance of ${class_}`);
  }
}

export function assertExists<T>(object: T | null | undefined): asserts object is T {
  if (object == null) {
    throw new Error(`Expected value to be defined, got ${object}`);
  }
}


export function spy(object: any, method: string) {
  if (!object || typeof object[method] !== 'function') {
    throw new Error(`Cannot spy on ${method} of ${object}`);
  }

  const originalMethod = object[method];
  const calls: any[] = [];

  object[method] = function (...args: any[]) {
    calls.push(args);
  };

  return {
    calls,
    restore: () => {
      object[method] = originalMethod;
    },
  };
}

export function assertSpyCall(spy: any, callIndex: number, options: { args?: any[], returned?: any }) {
  if (!spy || !spy.calls || !Array.isArray(spy.calls)) {
    throw new Error(`Invalid spy object`);
  }

  const call = spy.calls[callIndex];
  if (!isDeepEqual(call, options['args'])) {
    throw new Error(`Spy call ${callIndex} did not match expected args`);
  }
}

export function assertSpyCalls(spy: any, calls: number) {
  if (!spy || !spy.calls || !Array.isArray(spy.calls)) {
    throw new Error(`Invalid spy object`);
  }

  assertEquals(spy.calls.length, calls);
}

export function returnsNext<T>(values: T[]): () => T | undefined {
  let index = 0;
  return function(): T | undefined {
    if (index < values.length) {
      return values[index++];
    }
    return undefined;
  };
}

export function stub<T extends object, K extends keyof T>(
  object: T,
  method: K,
  implementation: (...args: any[]) => any
) {
  if (!object || typeof object[method] !== 'function') {
    throw new Error(`Cannot stub ${String(method)} of ${object}`);
  }

  const originalMethod = object[method] as unknown as (...args: any[]) => any;
  const calls: { args: any[]; returned: any }[] = [];

  (object[method] as unknown as (...args: any[]) => any) = function (...args: any[]) {
    const result = implementation(...args);
    calls.push({ args, returned: result });
    return result;
  };

  return {
    calls,
    restore: () => {
      (object[method] as unknown as (...args: any[]) => any) = originalMethod;
    },
  };
}


// https://medium.com/syncfusion/5-different-ways-to-deep-compare-javascript-objects-6708a0da9f05
export function isDeepEqual(object1: any, object2: any) {

  const objKeys1 = Object.keys(object1);
  const objKeys2 = Object.keys(object2);

  if (objKeys1.length !== objKeys2.length) return false;

  for (var key of objKeys1) {
    const value1 = object1[key];
    const value2 = object2[key];

    const isObjects = isObject(value1) && isObject(value2);

    if ((isObjects && !isDeepEqual(value1, value2)) ||
      (!isObjects && value1 !== value2)
    ) {
      return false;
    }
  }
  return true;
};

export function isObject(object: any) {
  return object != null && typeof object === "object";
};
