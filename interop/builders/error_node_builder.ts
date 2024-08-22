import { SupportedJsTypes } from '../types.ts';
import { toAstBuilder } from '../utils.ts';
import { AstNodeBuilder } from './ast_node_builder.ts';

/**
 * ErrorNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class ErrorNodeBuilder extends AstNodeBuilder {
	constructor(public value: SupportedJsTypes) {
		super();
	}
	build(): string {
		return `new types.ErrorNode(${toAstBuilder(this.value).build()}`;
	}
}
