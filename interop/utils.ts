export function capitalize(text: string) {
	return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
}

export function formatFunctionName(text: string) {
	return text.split(/\.|\[/).map((t) => capitalize(t).replace(/[^\w]/g, '')).join('');
}

/**
 * Translate JavaScript primative values into Ast's.
 * @param jsValue - A JavaScript primative to convert into an Ast.
 * @returns The JavaScript primative converted to an Ast or Err.
 * @example toAst('foobar') //=> Str { value: 'foobar' }
 */
export function toAstBuilder(input: unknown): AstNodeBuilder {
	switch (typeof input) {
		case 'undefined': {
			return new NilNodeBuilder();
		}

		case 'number': {
			return new NumberNodeBuilder(input);
		}

		case 'string': {
			if (input.startsWith('"')) {
				return new StringNodeBuilder(input);
			}

			if (input.startsWith(':')) {
				return new KeywordNodeBuilder(input);
			}

			return new SymbolNodeBuilder(input);
		}

		case 'boolean': {
			return new BooleanNodeBuilder(input);
		}

		case 'symbol': {
			return new StringNodeBuilder(JSON.stringify(input));
		}

		case 'function': {
			return new StringNodeBuilder('TODO');
			// (...args: AstNode[]): AstNode => {
			//     try {
			//         return toAst(input(...args.map((x) => x.value)));
			//     } catch (error: unknown) {
			//         if (error instanceof Error) {
			//             return new ErrorNode(
			//                 new StringNode(error.message),
			//             );
			//         }

			//         return new ErrorNode(
			//             new StringNode(JSON.stringify(error)),
			//         );
			//     }
			// },
		}

		case 'object': {
			if (input instanceof Error) {
				return new ErrorNodeBuilder(input.message);
			}

			if (input === null) {
				return new NilNodeBuilder();
			}

			if (Array.isArray(input)) {
				return new ListNodeBuilder(input);
			}

			if (input instanceof Map) {
				const map: Array<[string, AstNodeBuilder]> = [];
				for (const [maybeString, unknownValue] of input.entries()) {
					const key = String(maybeString);
					const value = toAstBuilder(unknownValue);
					map.push([key, value]);
				}

				return new MapNodeBuilder(map);
			}

			const inputObject = input as Record<string, unknown>;
			const map: Array<[string, AstNodeBuilder]> = [];
			for (const [maybeString, unknownValue] of Object.entries(inputObject)) {
				const key = String(maybeString);
				const value = toAstBuilder(unknownValue);
				map.push([key, value]);
			}

			return new MapNodeBuilder(map);
		}

		default: {
			const coercedUnknown = String(input);
			return new ErrorNodeBuilder(coercedUnknown);
		}
	}
}
