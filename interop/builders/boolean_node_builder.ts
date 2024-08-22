import { AstNodeBuilder } from './ast_node_builder.ts';

/**
 * BooleanNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class BooleanNodeBuilder extends AstNodeBuilder {
	constructor(public value: boolean) {
		super();
	}
	build() {
		return `new types.BooleanNode(${this.value})`;
	}
}
