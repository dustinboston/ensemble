import { AstNodeBuilder } from './ast_node_builder.ts';
import { SupportedJsTypes } from '../types.ts';
import { toAstBuilder } from '../utils.ts';

/**
 * List class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class ListNodeBuilder extends AstNodeBuilder {
	constructor(public values: SupportedJsTypes[]) {
		super();
	}
	build() {
		return `new types.ListNode([
            ${this.values.map((element) => toAstBuilder(element).build()).join(', ')}
        ])`;
	}
}
