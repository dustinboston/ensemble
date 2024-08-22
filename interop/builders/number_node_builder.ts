import { AstNodeBuilder } from './ast_node_builder.ts';

/**
 * KeywordNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class KeywordNodeBuilder extends AstNodeBuilder {
	constructor(public value: string) {
		super();
	}
	build() {
		let value = this.value;
		if (!value.startsWith(':')) value = `:${value}`;
		return `new types.KeywordNode("${value}")`;
	}
}
