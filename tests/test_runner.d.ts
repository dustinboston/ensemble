export declare function test(name: string, fn: () => void): void;
export declare function ignoreTest(name: string, fn: () => void): void;
export declare function assert(value: unknown, message?: string): void;
export declare function assertEquals(a: unknown, b: unknown): void;
export declare const assertStrictEquals: typeof assertEquals;
export declare function assertThrows(fn: () => void, type?: unknown, message?: string): void;
export declare function assertInstanceOf(object: any, class_: any): asserts object is typeof class_;
export declare function assertExists<T>(object: T | null | undefined): asserts object is T;
export declare function spy(object: any, method: string): {
    calls: any[];
    restore: () => void;
};
export declare function assertSpyCall(spy: any, callIndex: number, options: {
    args: any[];
    returned: any;
}): void;
export declare function assertSpyCalls(spy: any, calls: number): void;
export declare function returnsNext<T>(values: T[]): () => T | undefined;
export declare function stub<T extends object, K extends keyof T>(object: T, method: K, implementation: (...args: any[]) => any): {
    calls: {
        args: any[];
        returned: any;
    }[];
    restore: () => void;
};
export declare function isDeepEqual(object1: any, object2: any): boolean;
export declare function isObject(object: any): boolean;
