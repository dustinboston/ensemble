export function test(name, fn) {
    try {
        fn();
        console.log(`✅ ${name}`);
    }
    catch (error) {
        console.log(`❌ ${name}`);
        console.log(error);
    }
}
export function assert(value, message) {
    if (!value) {
        throw new Error(`Assertion failed: ${value}`);
    }
}
export function assertEquals(a, b) {
    if (a === b)
        return;
    if (!isDeepEqual(a, b)) {
        throw new Error(`Expected ${a} to equal ${b}`);
    }
}
export const assertStrictEquals = assertEquals;
export function assertThrows(fn, type, message) {
    try {
        fn();
        throw new Error("Expected an error");
    }
    catch (error) {
        if (type && message) {
            const actualMessage = (error instanceof Error) ? error.message : JSON.stringify(error);
            if (!actualMessage.includes(message)) {
                throw new Error(`Expected the error message to include: ${message}`);
            }
        }
    }
}
export function assertInstanceOf(object, class_) {
    if (!(object instanceof class_)) {
        throw new Error(`Expected object to be instance of ${class_}`);
    }
}
export function assertExists(object) {
    if (object == null) {
        throw new Error(`Expected value to be defined, got ${object}`);
    }
}
export function spy(object, method) {
    if (!object || typeof object[method] !== 'function') {
        throw new Error(`Cannot spy on ${method} of ${object}`);
    }
    const originalMethod = object[method];
    const calls = [];
    object[method] = function (...args) {
        calls.push(args);
    };
    return {
        calls,
        restore: () => {
            object[method] = originalMethod;
        },
    };
}
export function assertSpyCall(spy, callIndex, options) {
    if (!spy || !spy.calls || !Array.isArray(spy.calls)) {
        throw new Error(`Invalid spy object`);
    }
    const call = spy.calls[callIndex];
    if (!isDeepEqual(call, options['args'])) {
        throw new Error(`Spy call ${callIndex} did not match expected args`);
    }
}
export function assertSpyCalls(spy, calls) {
    if (!spy || !spy.calls || !Array.isArray(spy.calls)) {
        throw new Error(`Invalid spy object`);
    }
    assertEquals(spy.calls.length, calls);
}
export function returnsNext(values) {
    let index = 0;
    return function () {
        if (index < values.length) {
            return values[index++];
        }
        return undefined;
    };
}
export function stub(object, method, implementation) {
    if (!object || typeof object[method] !== 'function') {
        throw new Error(`Cannot stub ${String(method)} of ${object}`);
    }
    const originalMethod = object[method];
    const calls = [];
    object[method] = function (...args) {
        const result = implementation(...args);
        calls.push({ args, returned: result });
        return result;
    };
    return {
        calls,
        restore: () => {
            object[method] = originalMethod;
        },
    };
}
// https://medium.com/syncfusion/5-different-ways-to-deep-compare-javascript-objects-6708a0da9f05
export function isDeepEqual(object1, object2) {
    const objKeys1 = Object.keys(object1);
    const objKeys2 = Object.keys(object2);
    if (objKeys1.length !== objKeys2.length)
        return false;
    for (var key of objKeys1) {
        const value1 = object1[key];
        const value2 = object2[key];
        const isObjects = isObject(value1) && isObject(value2);
        if ((isObjects && !isDeepEqual(value1, value2)) ||
            (!isObjects && value1 !== value2)) {
            return false;
        }
    }
    return true;
}
;
export function isObject(object) {
    return object != null && typeof object === "object";
}
;
