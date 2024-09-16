import { SerializedAst } from '../interop/ast.ts';

export class InteropFunctionGenerator {
	constructor(private globalsJson: SerializedAst[]) {
		if (!globalsJson) {
			throw new TypeError('Globals JSON is required.');
		}
	}

	public generate(): string {
		const defs = this.globalsJson.reduce<string[]>((acc, def) => {
			switch (def.kind) {
				case 'CallSignature':
				case 'FunctionDeclaration':
				case 'MethodSignature': {
					acc.push(this.buildFunction(def));
					break;
				}
				case 'ConstructSignature': {
					acc.push(this.buildConstructor(def));
					break;
				}
				case 'PropertySignature':
				case 'VariableDeclaration': {
					acc.push(this.buildProperty(def));
					break;
				}
			}
			return acc;
		}, []);

		return this.buildDocument(defs);
	}

	private buildFunction(parameter: SerializedAst): string {
		const assertions = this.buildAssertions(parameter.params).map((a) => `        ${a}`);
		return [
			`ns.set(`,
			`    new types.SymbolNode("${parameter.id}"), `,
			`    new types.FunctionNode((..._astNodes: types.AstNode[]): types.AstNode => {`,
			...assertions,
			`    })`,
			`);`,
		].join('\n');
	}

	private buildConstructor(parameter: SerializedAst): string {
		const assertions = this.buildAssertions(parameter.params).map((a) => `        ${a}`);
		return [
			`ns.set(`,
			`    new types.SymbolNode("${parameter.id}"), `,
			`    new types.FunctionNode((..._astNodes: types.AstNode[]): types.AstNode => {`,
			...assertions,
			`        return new types.JsNode(${parameter.id});`,
			`    })`,
			`);`,
		].join('\n');
	}

	// Global variables are wrapped in a JsNode to control access.
	// TODO: Create a function for comparing against a global variable.
	private buildProperty(parameter: SerializedAst): string {
		return [
			`ns.set(`,
			`    new types.SymbolNode("${parameter.id}"), `,
			`    new types.FunctionNode((..._astNodes: types.AstNode[]): types.AstNode => {`,
			`        return new types.JsNode(${parameter.id});`,
			`    })`,
			`);`,
		].join('\n');
	}

	private buildDocument(parameters: string[]) {
		return [
			"import * as types from './src/core.ts';",
			'export const ns = new Map<types.SymbolNode, types.FunctionNode>();',
			...parameters,
		].join('\n');
	}

	/**
	 * Get assertions for a given node
	 * @param node Nodes that have a parameters and types property (bonus if there is a questionToken property)
	 * @returns The assertions rendered as a string
	 */
	private buildAssertions(parameters: SerializedAst | SerializedAst[] | undefined) {
		if (parameters === undefined) {
			return [];
		}

		if (!Array.isArray(parameters)) {
			parameters = [parameters];
		}

		const assertions: string[] = [];
		const { minArgs, maxArgs } = this.getMinMaxArgumentCounts(parameters);
		const hasRestArgument = this.hasRestArgument(parameters);

		if (parameters.length) {
			assertions.push(this.buildArgumentAssertion(hasRestArgument, minArgs, maxArgs));
		}

		for (let i = 0; i < parameters.length; i++) {
			const parameter = parameters[i];

			if (this.isRestParameter(parameter)) {
				assertions.push(this.buildRestArgAssertion(i, parameter));
				break; // No need to process further parameters, rest is always last
			}

			if (this.isOptionalParameter(parameter)) {
				assertions.push(this.buildOptionalArgAssertion(i, parameter, minArgs));
				continue;
			}

			assertions.push(this.buildRequiredArgAssertion(i, parameter));
		}
		return assertions;
	}

	private buildArgumentAssertion(hasRestArgument: boolean, minimumArgumentCount: number, maximumArgumentCount: number) {
		if (hasRestArgument) return `types.assertMinimumArgumentCount(astArgs.length, ${minimumArgumentCount});`;
		if (minimumArgumentCount === maximumArgumentCount) return `types.assertArgumentCount(astArgs.length, ${minimumArgumentCount});`;
		return `types.assertVariableArgumentCount(astArgs.length, ${minimumArgumentCount}, ${maximumArgumentCount});`;
	}

	/**
	 * Gets the function arguments as a comma-separated string.
	 * @returns A string representing the function arguments.
	 */
	private getFunctionArgs(parameters: SerializedAst[]) {
		return (parameters ?? []).map((parameter, index) => {
			const rest = this.isRestParameter(parameter) ? '...' : '';
			return `${rest}arg${index}`;
		}).join(', ');
	}

	/**
	 * Builds an assertion for a rest function argument.
	 * @param argumentIndex - The index of the rest argument in the function's parameter list.
	 * @param parameter - The parameter object containing the expected types.
	 * @returns A string representing the assertion for the rest argument.
	 */
	private buildRestArgAssertion(argumentIndex: number, parameter: SerializedAst): string {
		const nodes: string[] = [];
		const primitives: string[] = [];

		return `
			const ${parameter.name}: (${primitives.join(' | ')})[] = [];
            for (let i = ${argumentIndex}; i < args.length; i++) {
                types.assertIsOneOf<${nodes.join(' | ')}>(args[i], [${nodes.join(', ')}]);
                ${parameter.name}.push(args[i].toJs());
            }`;
	}

	private getType(parameterType: SerializedAst['type']): [string, string] {
		if (parameterType === undefined) {
			return ['', ''];
		}

		// This is the actual type (not a type name)
		if (typeof parameterType === 'string') {
			return ['', parameterType];
		}

		if (!Array.isArray(parameterType)) {
			const result: [string, string] = ['', ''];

			if (!parameterType.name.startsWith('~')) {
				result[0] = parameterType.name;
			}

			if (parameterType.text) {
				result[1] = parameterType.text;
			} else if (parameterType.type) {
				const [n, v] = this.getType(parameterType.type) ?? [];
				result[0] += n;
				result[1] = v;
			}

			return result;
		}

		if (Array.isArray(parameterType)) {
			const result: [string, string] = ['', ''];

			for (const type of parameterType) {
				const [n, v] = this.getType(type);
				result[0] += n;
				result[1] += v;
			}

			return result;
		}

		return ['', ''];
	}

	/**
	 * Builds an assertion for a required function argument.
	 * @param argNumber - The index of the argument.
	 * @param parameter - The parameter object containing the expected types.
	 * @returns A string representing the assertion for the required argument.
	 */
	private buildRequiredArgAssertion(argNumber: number, parameter: SerializedAst): string {
		const argName = `arg${argNumber}`;
		const typesArray = parameter.getTypesArray();
		const astNodes = this.convertTypesToAstNodes(typesArray);
		return `types.assertIsOneOf<${astNodes.join(' | ')}>(args[${argNumber}], [${astNodes.join(', ')}]);
				const ${argName}: ${typesArray.join(' | ')} = args[${argNumber}].toJs();`;
	}

	/**
	 * Builds an assertion for an optional function argument.
	 * @todo if the variable has an initializer, use it instead of undefined
	 * @param argIndex - The index of the argument.
	 * @param parameter - The parameter object containing the expected types.
	 * @param minArgs - The minimum number of arguments required.
	 * @returns A string representing the assertion for the optional argument.
	 */
	private buildOptionalArgAssertion(argIndex: number, parameter: SerializedAst, minArgs: number): string {
		const argName = `arg${argIndex}`;
		const typesArray = parameter.getTypesArray();
		const astNodes = this.convertTypesToAstNodes(typesArray);

		return `let ${argName}: ${typesArray.join(' | ')} | undefined = undefined;
				if (args.length > ${minArgs}) {
					types.assertIsOneOf<${astNodes.join(' | ')}>(args[${argIndex}], [${astNodes.join(', ')}]);
					${argName} = args[${argIndex}].toJs();
				}`;
	}

	/**
	 * Calculates the minimum and maximum number of arguments required for the function.
	 * @note The result of this method could be cached to improve performance
	 * @returns An object with the `minArgs` and `maxArgs` properties, representing the minimum and maximum number of arguments, respectively.
	 */
	private getMinMaxArgumentCounts(parameters: SerializedAst[]) {
		let minArgs = 0;
		let maxArgs: number | typeof Infinity = 0;

		for (const parameter of parameters) {
			if (this.isRestParameter(parameter)) {
				// Rest parameter allows indefinite arguments
				maxArgs = Infinity;
				break; // No need to check further, since rest must be last
			} else if (this.isOptionalParameter(parameter)) {
				maxArgs++;
			} else {
				minArgs++;
				maxArgs++;
			}
		}

		// If the only parameter is a rest parameter, ensure minArgs is set to 0
		if (parameters.length === 1 && this.isRestParameter(parameters[0])) {
			minArgs = 0;
		}

		return { minArgs, maxArgs };
	}

	private isRestParameter(parameter: SerializedAst) {
		return parameter.meta?.includes('rest');
	}

	private isOptionalParameter(parameter: SerializedAst) {
		return parameter.meta?.includes('optional');
	}

	private hasRestArgument(parameters: SerializedAst[]) {
		return parameters.some((p) => this.isRestParameter(p));
	}
}
