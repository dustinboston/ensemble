import { toAstBuilder } from '../utils.ts';
import { AstNodeBuilder } from './ast_node_builder.ts';

/**
 * MapNode class
 * A data class which represents a part of the AST.
 * @description The Map value stores MapKeys as strings.
 * - A KeywordNode is stored as ':key'
 * - A StringNode is stored as '"str"'
 * - And a SymbolNode is stored as 'sym'.
 * @param value - The data that this class represents.
 */
export class MapNodeBuilder extends AstNodeBuilder {
	constructor(public value: Array<[string, AstNodeBuilder]> = []) {
		super();
	}
	build(): string {
		return `new types.MapNode(Map<string, types.AstNode> = new Map<string, types.AstNode>([
            ${
			this.value.map(([key, value]) => {
				return `["${key}", ${toAstBuilder(value).build()}]`;
			}).join(', ')
		}
        ]))`;
	}
}
