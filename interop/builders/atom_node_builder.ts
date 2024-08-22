import { SupportedJsTypes } from '../types.ts';
import { toAstBuilder } from '../utils.ts';
import { AstNodeBuilder } from './ast_node_builder.ts';

/**
 * AtomNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class AtomNodeBuilder extends AstNodeBuilder {
	constructor(public value: SupportedJsTypes) {
		super();
	}
	build() {
		return `new types.AtomNode(${toAstBuilder(this.value).build()})`;
	}
}
