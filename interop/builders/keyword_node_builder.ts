import { AstNodeBuilder } from './ast_node_builder.ts';

/**
 * NumberNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class NumberNodeBuilder extends AstNodeBuilder {
	constructor(public value: number) {
		super();
	}
	build() {
		return `new types.NumberNode(${this.value})`;
	}
}
