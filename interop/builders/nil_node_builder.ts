import { AstNodeBuilder } from './ast_node_builder.ts';

/**
 * NilNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class NilNodeBuilder extends AstNodeBuilder {
	constructor(public value: unknown = null) {
		super();
	}
	build(): string {
		return `new types.NilNode()`;
	}
}
