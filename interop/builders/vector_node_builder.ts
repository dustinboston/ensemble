import { SupportedJsTypes } from '../types.ts';
import { toAstBuilder } from '../utils.ts';
import { AstNodeBuilder } from './ast_node_builder.ts';

/**
 * VectorNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class VectorNodeBuilder extends AstNodeBuilder {
	constructor(public values: SupportedJsTypes[]) {
		super();
	}
	build() {
		return `new types.VectorNode([
            ${this.values.map((element) => toAstBuilder(element).build()).join(', ')}
        ])`;
	}
}
