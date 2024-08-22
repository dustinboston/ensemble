import { AstNodeBuilder } from './ast_node_builder.ts';

/**
 * SymbolNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class SymbolNodeBuilder extends AstNodeBuilder {
	constructor(public value: string) {
		super();
	}
	build() {
		return `new types.SymbolNode("${this.value}")`;
	}
}
