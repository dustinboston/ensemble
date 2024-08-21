/**
 * Generates symbols with references to global objects.
 *
 * @description
 * A note on static methods/properties and instance methods/properties.
 * Given this abbreviated String definition from lib.es5.d.ts:
 *
 * ```typescript
 * interface String {
 *     toString(): string;
 *     charAt(pos: number): string;
 *     readonly length: number;
 * }
 *
 * interface StringConstructor {
 *     new (value?: any): String;
 *     (value?: any): string;
 *     readonly prototype: String;
 *     fromCharCode(...codes: number[]): string;
 * }
 *
 * declare var String: StringConstructor;
 * ```
 *
 * In the declaration for `String`, the `String` interface defines **instance** methods and properties accesed
 * through the prototype, e.g. `String.protototype.toString`. The `StringConstructor` contains **static** methods
 * accessed directly from the object, e.g. `String.fromCharCode(...)`.
 *
 * More generically speaking, if the name of an interface is the same as the name of a variable declaration, the
 * interface defines **instance** methods and properties. If the interface contains a `prototype` with a type that
 * matches the variable declaration name, the interface defines **static** methods and properties.
 *
 * There is one exception: If the interface, declaration name, and declaration type have the same, the methods and
 * properties defined in the interface name interface are static.
 *
 * The code uses a shorthand for this:
 * - The variable declaration **name** defines an instance and its members.
 * - The variable declaration **type** defines the object's static members.
 * - If var name, type name, and interface name are equal the interface defines static members.
 *
 * @example
 * In this example `abs` is static (Math.abs) because the interface, var, and type have the same name.
 *
 * ```
 * interface Math {
 *     abs(x: number): number;
 * }
 * declare var Math: Math;
 * ```
 *
 * @example
 * In this example, `setMonth` is an instance method (Date.prototype.setMonth) because the interface and var have the
 * same name, but the type is different.
 *
 * ```
 * interface Math {
 *     abs(x: number): number;
 * }
 * declare var Math: Math;
 * ```
 *
 * @example
 * In this example `isArray` is static because it is defined in an interface with a different name than the var.
 *
 * ```
 * interface ArrayConstructor {
 *     isArray(arg: any): arg is any[];
 * }
 * declare var Array: ArrayConstructor
 * ```
 *
 * @file
 */
import ts from 'npm:typescript@5.5.3';
import { esnextFiles } from '../data/dts/mod.ts';

const DEBUG: boolean = false;

/** Map of built-in objects to their types */
const globalBindings = new Map<string, string>();
/** List of interfaces to process. */
const stagedInterfaces = new Map<string, ts.Node[]>();
/** All interfaces stored for future retrieval. */
const interfaceCache = new Map<string, ts.Node[]>();
/** Map of declaration variable/types, e.g. declare var VaribleName: TypeName */
const declarations = new Map<string, string>();
/** Regular expression to filter out names with invalid characters */
const badCharsRE = new RegExp(/[^a-zA-Z0-9"[\]]/g);
/** Running log of activities for debugging */
const trace: string[] = [];
/** Actual result of parsing */
const finalResults: string[] = [];

/**
 * Value to add to the trace
 * @param message Value to add to the trace
 */
function debug(message: string) {
    if (DEBUG) trace.push(message);
}

/**
 * Value to add to the final results
 * @param message Value to save to the results
 */
function save(message: string) {
    debug(message);
    finalResults.push(message);
}

export function convert(file: string, data: string) {
    const sourceFile = ts.createSourceFile(file, data, ts.ScriptTarget.Latest, false);
    sourceFile.forEachChild(visit);
    return;

    /**
     * Save a built-in name into a map of variables to their types.
     * @param key The built-in name
     * @param value The built-in type
     */
    function addToGlobals(key: string, value: string) {
        if (!globalBindings.has(key)) {
            globalBindings.set(key, value);
            // TODO: Return value instead of pushing to global
            save(`interop.set("${key}", ${value})`);
        }
    }

    /**
     * Stage a node for processing and add it to the the global cache so that it can be retrieved later.
     * @todo return value instead of using a side-effect
     * @param objectName The name to associate with the node to be cached
     * @param node The node to cache and process
     */
    function cacheInterface(objectName: string, node: ts.Node) {
        debug(`// Staging interface '${objectName}'`);
        const unprocessedNodes = stagedInterfaces.get(objectName) ?? [];
        stagedInterfaces.set(objectName, [...unprocessedNodes, node]);

        debug(`// Caching interface '${objectName}'`);
        const interfaceNodes = interfaceCache.get(objectName) ?? [];
        interfaceCache.set(objectName, [...interfaceNodes, node]);
    }

    /**
     * Process staged interfaces.
     * @param objectName Name of the staged interface to process
     */
    function parseCachedInterface(objectName: string) {
        debug(`// Parsing cached interface for '${objectName}'`);

        const unprocessedNodes = stagedInterfaces.get(objectName) ?? [];
        for (const node of unprocessedNodes) {
            if (!ts.isInterfaceDeclaration(node)) continue;

            const prefix = getPrefix(node);
            if (prefix === undefined) continue;

            parseHeritage(node, objectName);
            node.forEachChild((child) => visit(child, prefix));
        }
        stagedInterfaces.delete(objectName); // Clear processed
    }

    /**
     * Extract a prefix from an interface
     * @param node Interface from which to extract a prefix
     * @returns A prefix
     */
    function getPrefix(node: ts.InterfaceDeclaration): string | undefined {
        const interfaceName = node.name.getText(sourceFile);
        if (!interfaceName) {
            debug(`// ERROR: Undefined interface name.`);
            return undefined;
        }

        if (badCharsRE.test(interfaceName)) {
            debug(`// ERROR: Non-alphanumeric interface name.`);
            return undefined;
        }

        const declaredObject = declarations.get(interfaceName);
        const builtInName = globalBindings.get(interfaceName);

        let prefix = '';
        if (declaredObject && builtInName === interfaceName && interfaceName === declaredObject) {
            // e.g. interface String {}; declare var String: String;
            prefix = `${interfaceName}`;
        } else if (declaredObject && !builtInName && interfaceName !== declaredObject) {
            // e.g. interface StringConstructor {}; declare var String: StringConstructor;
            prefix = `${declaredObject}`;
        } else {
            // e.g. interface Foo {}; declare var Foo: FooConstructor;
            prefix = `${interfaceName}.prototype`;
        }

        return prefix;
    }

    function parseHeritage(node: ts.InterfaceDeclaration, objectName: string) {
        if (!node.heritageClauses) {
            return;
        }

        for (const heritageClause of node.heritageClauses) {
            debug(`// Processing heritage for '${objectName}'`);
            if (heritageClause.token !== ts.SyntaxKind.ExtendsKeyword) {
                continue;
            }
            for (const expressionWithTypeArgs of heritageClause.types) {
                const expression = expressionWithTypeArgs.expression;
                const parentInterfaceName = expression.getText(sourceFile);
                const parentInterfaceType = globalBindings.get(parentInterfaceName);
                const declaredVariableType = declarations.get(parentInterfaceName);

                debug(
                    `// Parent Name: '${parentInterfaceName}', Declaration Type: '${declaredVariableType}', Built-in Name: '${parentInterfaceType}'`,
                );

                let builtInName = '';
                if (!parentInterfaceType && parentInterfaceName !== declaredVariableType && declaredVariableType) {
                    builtInName = declaredVariableType;
                } else if (parentInterfaceType === parentInterfaceName) {
                    builtInName = parentInterfaceType;
                } else {
                    continue;
                }

                const sourceInterfaces = interfaceCache.get(builtInName) ?? [];
                if (!sourceInterfaces) continue;

                for (const sourceInterface of sourceInterfaces) {
                    if (!ts.isInterfaceDeclaration(sourceInterface)) continue;

                    const sourceName = sourceInterface.name.getText(sourceFile);
                    const prefix = (sourceName !== parentInterfaceName) ? `${objectName}` : `${objectName}.prototype`;
                    for (const member of sourceInterface.members) {
                        visit(member, prefix);
                    }
                }
            }
        }
    }

    /**
     * Visits significant nodes in the TypeScript AST, extracting relevant data to build the interop bindings.
     * @note The if conditions are not broken out into functions intentionally so that they are easier to work with.
     * @note A switch/case is not used because the is* type-guard functions would still need to be used.
     * @todo Currently relies on side-effects, instead, aggregate results and traces, and return them.
     * @param node The TypeScript AST to parse.
     * @param prefix A value such as 'Object.prototype' or 'Object' to add to binding values.
     */
    function visit(node: ts.Node, prefix = ''): void {
        debug(`// Visiting node '${ts.SyntaxKind[node.kind]}' with prefix '${prefix}'`);

        if (ts.isInterfaceDeclaration(node)) {
            const objectName = node.name.getText(sourceFile);
            // TODO: cache interface into a variable in the visit params
            cacheInterface(objectName, node);
            if (globalBindings.has(objectName)) {
                // TODO: Aggregate results and return them
                parseCachedInterface(objectName);
            }
            return;
        }

        if (ts.isVariableStatement(node)) {
            // TODO: Aggregate results and return them
            node.declarationList.forEachChild(visit);
            return;
        }

        if (ts.isVariableDeclaration(node)) {
            const objectName = node.name.getText(sourceFile);

            // Don't process if the interface has already been declared.
            if (declarations.get(objectName)) {
                return;
            }

            // TODO: Aggregate results and return them
            addToGlobals(objectName, objectName);
            declarations.set(objectName, objectName); // Initial value maps to self.

            if (!node.type) {
                return;
            }

            // Process constructor and static methods, overwrite initial value with constructor interface.
            const constructorInterfaceName = node.type.getText(sourceFile);
            // TODO: Add declarations to a value in the visit params
            declarations.set(objectName, constructorInterfaceName);
            declarations.set(constructorInterfaceName, objectName);

            // TODO: Aggregate results and return them
            parseCachedInterface(constructorInterfaceName); // , objectName
            parseCachedInterface(objectName); // , `${objectName}.prototype`
            return;
        }

        if (ts.isFunctionDeclaration(node)) {
            if (!node.name) return;
            const functionName = node.name.getText(sourceFile);
            // TODO: Aggregate results and return them
            addToGlobals(functionName, functionName);
            return;
        }

        if (ts.isMethodSignature(node) && prefix && globalBindings.has(prefix)) {
            const methodName = node.name.getText(sourceFile);
            if (!methodName) return;

            const delimiter = (ts.isComputedPropertyName(node.name)) ? '' : '.';
            const bindingName = `${prefix.split('.')[0]}${delimiter}${methodName}`;
            const fullMethodName = `${prefix}${delimiter}${methodName}`;
            // TODO: Aggregate results and return them
            addToGlobals(bindingName, fullMethodName);
            return;
        }

        // TODO: Get bindings from a value sent in the visit parameters
        if (ts.isPropertySignature(node) && prefix && globalBindings.has(prefix)) {
            if ((node.getFullText(sourceFile)).includes('@deprecated')) return;
            const propertyName = node.name.getText(sourceFile).replace(/"/g, '');
            if (badCharsRE.test(propertyName)) {
                debug(`// ERROR: Non-alphanumeric property signature name.`);
                return;
            }
            const objectName = prefix.split('.')[0];
            const delimiter = (ts.isComputedPropertyName(node.name) || !propertyName) ? '' : '.';
            const bindingName = `${objectName}${delimiter}${propertyName}`;
            const propertyValue = `${prefix}${delimiter}${propertyName}`;

            // TODO: Aggregate results and return them
            addToGlobals(bindingName, propertyValue);
            return;
        }

        if (ts.isConstructSignatureDeclaration(node) && prefix) {
            // TODO: Aggregate results and return them
            addToGlobals(`${prefix}.new`, `(...args: unknown[]) => Reflect.construct(${prefix}, args)`);
            return;
        }

        if (ts.isCallSignatureDeclaration(node) && prefix) {
            // TODO: Aggregate results and return them
            addToGlobals(`${prefix}`, `(...args: unknown[]) => Reflect.apply(${prefix}, undefined, args)`);
            return;
        }
    }
}

function main() {
    const decoder = new TextDecoder();

    const fileCount = esnextFiles.length;
    for (let i = 0; i < fileCount; i++) {
        const file = esnextFiles[i];
        const path = `./data/dts/${file}`;
        const data = decoder.decode(Deno.readFileSync(path));
        debug(`// File ${i + 1}/${fileCount}: ${path}`);
        convert(file, data);
    }

    const outputValues = DEBUG ? trace : finalResults;
    finalResults.sort();
    console.log('const interop = new Map<string, any>();');
    for (const line of outputValues) {
        console.log(line);
    }
}

if (import.meta.main) {
    main();
}
