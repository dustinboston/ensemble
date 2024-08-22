// export type Closure = (...args: AstNodeBuilder[]) => AstNodeBuilder;
// export type ClosureMetadata = {
//     ast: AstNodeBuilder;
//     env: Env;
//     parameters: SymbolNode[];
// };

import { AstNodeBuilder } from './ast_node_builder.ts';

export type Parameter = {
	types: string[]; // Should already be resolved
	isOptional?: boolean;
	isRest?: boolean;
	name?: string;
};

const typeSubstitutions = new Map<string, string>([
	['boolean', 'types.BooleanNode'],
	['function', 'types.FunctionNode'],
	['null', 'types.NilNode'],
	['number', 'types.NumberNode'],
	['string', 'types.StringNode'],
	['undefined', 'types.NilNode'],
]);

/**
 * FunctionNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 * @param closureMeta - A POJO that contains an AstNodeBuilder, Env, and parameters
 * which are all used as the context for the function when it is evaluated.
 * @param isMacro - Whether the function is a macro.
 * @param metadata - Additional data to associate with this node.
 */
export class FunctionNodeBuilder extends AstNodeBuilder {
	body: string = '';
	assertions: string[] = [];
	parameters: Parameter[] = [];

	build() {
		return `
            new types.FunctionNode((...args: types.AstNode[]): types.AstNode => {
                ${this.assertions.join('\n')}
                return types.toAst(${this.body});
            })
        `;
	}

	withParameters(parameters: Parameter[]) {
		this.parameters = parameters;
		return this;
	}

	withConstructor(objectName: string) {
		const args = this.parameters.map((_, i) => `a[${i}]`).join(', ');
		this.body = `Reflect.construct(${objectName}, [${args}])`;
		return this;
	}

	withFunctionCall(functionName: string) {
		const args = this.parameters.map((_, i) => `a[${i}]`).join(', ');
		this.body = `Reflect.apply(${functionName}, undefined, [${args}])`;
		return this;
	}

	withProperty(property: string) {
		this.body = `${property}`;
		return this;
	}

	/**
	 * Get assertions for a given node
	 * @param node Nodes that have a parameters and types property (bonus if there is a questionToken property)
	 * @returns The assertions rendered as a string
	 */
	withArgumentAssertions() {
		// WAS: node: ts.CallSignatureDeclaration | ts.FunctionDeclaration, sourceFile: ts.SourceFile
		// WAS: const parameters = node.parameters;

		const assertions: string[] = [];

		for (let i = 0; i < this.parameters.length; i++) {
			const parameter = this.parameters[i];

			// const types = this.resolveTypeNode(parameter.type, sourceFile);
			const joinedTypes = parameter.types.join(' | ');
			const { minArgs } = this.getMinMaxArgumentCounts();

			let indent = '';
			if (parameter.isOptional) {
				indent = '    ';
				assertions.push(
					// TODO: if the variable has an initializer, use it instead of undefined
					`let a${i}: ${joinedTypes} | undefined = undefined;`,
					`if (args.length > ${minArgs}) {`,
				);
			}

			const astNodes: string[] = parameter.types.map((t) => typeSubstitutions.get(t) ?? `types.AtomNode`);
			assertions.push(`types.assertIsOneOf<${astNodes.join(' | ')}>(args[${i}], [${astNodes.join(', ')}])`);

			// TODO: if the variable has an initializer, use it instead of undefined
			if (!parameter.isOptional) {
				assertions.push(`const a${i}: ${parameter.types.join(' | ')} = args[${i}].value;`);
			} else {
				assertions.push(
					`${indent}a${i} = args[${i}].value;`,
					'}',
				);
			}
		}

		this.assertions.push(...assertions);
		return this;
	}

	withArgumentCountAssertion() {
		const { minArgs, maxArgs } = this.getMinMaxArgumentCounts();
		this.assertions.push(`types.assertVariableArgumentCount(args.length, ${minArgs}, ${maxArgs});`);
		return this;
	}

	// Could cache values to increase perf
	private getMinMaxArgumentCounts() {
		let minArgs = 0;
		let maxArgs = 0;
		for (const parameter of this.parameters) {
			if (parameter.isOptional) {
				maxArgs++;
			} else {
				minArgs++;
				maxArgs++;
			}
		}
		return { minArgs, maxArgs };
	}
}
