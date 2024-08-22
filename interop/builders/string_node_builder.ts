import { AstNodeBuilder } from './ast_node_builder.ts';

/**
 * StringNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class StringNodeBuilder extends AstNodeBuilder {
	constructor(public value: string) {
		super();
	}
	build() {
		// TODO: Escape
		return `new types.StringNode("${this.value}")`;
	}
}
