import tsCompilerApi from 'npm:typescript@5.5.3';

/**
 * Currently missing:
 * - Symbol (no declare), Promise (PromiseConstructorLike is declared),
 * - Interface methods for declared variables
 *   - Object, Function, String, Boolean, Number, Math, Date, RegExp, JSON, Array, ArrayBuffer, DataView, Int8Array,
 *     Uint8ClampedArray, Int16Array, Int32Array, Uint32Array, Float32Array, Float64Array
 *   - TODO: cache interfaces by name in case we find them declared later. Then expand them.
 *   - TODO: merge interfaces with the same name
 * - Namespace declarations:
 *   - Intl
 *     - And its var elements: Collator
 *     - TODO: Look up cached interfaces (see above)
 * - Interface properties for declared variables:
 * 	 - Error - EvalError, RangeError, ReferenceError, etc. might need to return an ErrorNode isntead of AtomNode.
 */

/**
 * TODO: Continue by deciding how to process ConstructorType. Maybe I can rely on the global type instead?
 * Also... I have to implement intheritance to get the parent object's methods.
 */

type Binding = [name: string, value: string];
type ParseResult = {
	code: string;
	bindings: Binding[];
};
type MinMax = { min: number; max: number };

export function generateCodeFromDtsFile(dtsFilePath: string, dtsFileText: string): string {
	// const parseResults = parseAst();

	const sourceFile = tsCompilerApi.createSourceFile(
		dtsFilePath,
		dtsFileText,
		tsCompilerApi.ScriptTarget.Latest,
		false,
	);

	// Only parse declarations
	const statements = sourceFile.statements.filter((statement) => {
		if (statement.kind === tsCompilerApi.SyntaxKind.FunctionDeclaration) return true;
		if (tsCompilerApi.isVariableStatement(statement)) {
			return statement.modifiers?.some((modifier) => {
				return modifier.kind === tsCompilerApi.SyntaxKind.DeclareKeyword;
			});
		}

		return false;
	});

	const parseResults = statements.flatMap((statement) => parseAst(statement, ''));

	const code: string[] = [
		'// deno-lint-ignore-file no-explicit-any',
		'import * as types from "../types.ts"',
	];

	const bindings: string[] = [];
	for (const parseResult of parseResults) {
		code.push(parseResult.code);
		for (const [name, value] of parseResult.bindings) {
			bindings.push(`[new types.SymbolNode("${name}"), new types.FunctionNode(${value})]`);
		}
	}

	code.push(`export const nsInterop = new Map<types.SymbolNode, types.FunctionNode>([${bindings.join(',\n')}]);`);
	return code.join('\n');
}

// {{{ parseAst Visitor
//
// Note: First* and Last* are "Markers" that point to another token.
// @see TypeScript src/compiler/types.ts
function parseAst(node: tsCompilerApi.Node, prefix = ''): ParseResult[] {
	switch (node.kind) {
		case tsCompilerApi.SyntaxKind.AbstractKeyword: {
			return [{ code: 'abstract', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.AccessorKeyword: {
			return [{ code: '// TODO: AccessorKeyword', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.AmpersandAmpersandEqualsToken: {
			return [{ code: '&=', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.AmpersandAmpersandToken: {
			return [{ code: '&&', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.AmpersandEqualsToken: {
			return [{ code: '&=', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.AmpersandToken: {
			return [{ code: '&', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.AnyKeyword: {
			return [{ code: 'any', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ArrayBindingPattern: {
			return [{ code: '// TODO: ArrayBindingPattern', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ArrayLiteralExpression: {
			return [{ code: '// TODO: ArrayLiteralExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ArrayType: {
			if (tsCompilerApi.isArrayTypeNode(node)) {
				return parseArrayType(node, prefix);
			}
			return [];
			// return [{ code: '// TODO: ArrayType', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ArrowFunction: {
			return [{ code: '// TODO: ArrowFunction', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.AsExpression: {
			return [{ code: '// TODO: AsExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.AsKeyword: {
			return [{ code: 'as', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.AssertKeyword: {
			return [{ code: 'assert', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.AssertsKeyword: {
			return [{ code: 'asserts', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.AsteriskAsteriskEqualsToken: {
			return [{ code: '**=', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.AsteriskAsteriskToken: {
			return [{ code: '**', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.AsteriskEqualsToken: {
			return [{ code: '*=', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.AsteriskToken: {
			return [{ code: '*', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.AsyncKeyword: {
			return [{ code: 'async', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.AtToken: {
			return [{ code: '@', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.AwaitExpression: {
			return [{ code: '// TODO: AwaitExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.AwaitKeyword: {
			return [{ code: 'await', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.BacktickToken: {
			return [{ code: '`', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.BarBarEqualsToken: {
			return [{ code: '||=', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.BarBarToken: {
			return [{ code: '||', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.BarEqualsToken: {
			return [{ code: '|=', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.BarToken: {
			return [{ code: '|', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.BigIntKeyword: {
			return [{ code: 'bigint', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.BigIntLiteral: {
			return [{ code: '// TODO: BigIntLiteral', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.BinaryExpression: {
			return [{ code: '// TODO: BinaryExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.BindingElement: {
			return [{ code: '// TODO: BindingElement', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.Block: {
			return [{ code: '// TODO: Block', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.BooleanKeyword: {
			return [{ code: 'boolean', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.FirstReservedWord:
		case tsCompilerApi.SyntaxKind.FirstKeyword:
		case tsCompilerApi.SyntaxKind.BreakKeyword: {
			return [{ code: 'break', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.BreakStatement: {
			return [{ code: '// TODO: BreakStatement', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.Bundle: {
			return [{ code: '// TODO: Bundle', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.CallExpression: {
			return [{ code: '// TODO: CallExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.CallSignature: {
			return [{ code: '// TODO: CallSignature', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.LastAssignment:
		case tsCompilerApi.SyntaxKind.LastBinaryOperator:
		case tsCompilerApi.SyntaxKind.LastCompoundAssignment:
		case tsCompilerApi.SyntaxKind.LastPunctuation:
		case tsCompilerApi.SyntaxKind.CaretEqualsToken: {
			return [{ code: '// TODO: CaretEqualsToken', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.CaretToken: {
			return [{ code: '^', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.CaseBlock: {
			return [{ code: '// TODO: CaseBlock', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.CaseClause: {
			return [{ code: '// TODO: CaseClause', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.CaseKeyword: {
			return [{ code: 'case', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.CatchClause: {
			return [{ code: '// TODO: CatchClause', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.CatchKeyword: {
			return [{ code: 'catch', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ClassDeclaration: {
			return [{ code: '// TODO: ClassDeclaration', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ClassExpression: {
			return [{ code: '// TODO: ClassExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ClassKeyword: {
			return [{ code: 'class', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ClassStaticBlockDeclaration: {
			return [{ code: '// TODO: ClassStaticBlockDeclaration', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.CloseBraceToken: {
			return [{ code: '}', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.CloseBracketToken: {
			return [{ code: ']', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.CloseParenToken: {
			return [{ code: ')', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ColonToken: {
			return [{ code: ':', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.CommaListExpression: {
			return [{ code: '// TODO: CommaListExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.CommaToken: {
			return [{ code: ',', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ComputedPropertyName: {
			return [{ code: '// TODO: ComputedPropertyName', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ConditionalExpression: {
			return [{ code: '// TODO: ConditionalExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ConditionalType: {
			return [{ code: '// TODO: ConditionalType', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.LastTriviaToken:
		case tsCompilerApi.SyntaxKind.ConflictMarkerTrivia: {
			return [{ code: '// TODO: ConflictMarkerTrivia', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ConstKeyword: {
			return [{ code: 'const', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.Constructor: {
			return [{ code: '// TODO: Constructor', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ConstructorKeyword: {
			return [{ code: 'constructor', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ConstructorType: {
			if (tsCompilerApi.isConstructorTypeNode(node)) {
				return parseConstructorType(node, prefix);
			}
			return [{ code: '// TODO: ConstructorType', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ConstructSignature: {
			return [{ code: '// TODO: ConstructSignature', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ContinueKeyword: {
			return [{ code: 'continue', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ContinueStatement: {
			return [{ code: '// TODO: ContinueStatement', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.Count: {
			return [{ code: '// TODO: Count', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.DebuggerKeyword: {
			return [{ code: 'debugger', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.LastStatement:
		case tsCompilerApi.SyntaxKind.DebuggerStatement: {
			return [{ code: '// TODO: DebuggerStatement', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.DeclareKeyword: {
			return [{ code: 'declare', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.Decorator: {
			return [{ code: '// TODO: Decorator', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.DefaultClause: {
			return [{ code: '// TODO: DefaultClause', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.DefaultKeyword: {
			return [{ code: 'default', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.DeleteExpression: {
			return [{ code: '// TODO: DeleteExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.DeleteKeyword: {
			return [{ code: 'delete', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.DoKeyword: {
			return [{ code: 'do', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.DoStatement: {
			return [{ code: '// TODO: DoStatement', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.DotDotDotToken: {
			return [{ code: '...', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.DotToken: {
			return [{ code: '.', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ElementAccessExpression: {
			return [{ code: '// TODO: ElementAccessExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ElseKeyword: {
			return [{ code: 'else', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.EmptyStatement: {
			return [{ code: '// TODO: EmptyStatement', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.EndOfFileToken: {
			return [{ code: '\0', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.EnumDeclaration: {
			return [{ code: '// TODO: EnumDeclaration', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.EnumKeyword: {
			return [{ code: 'enum', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.EnumMember: {
			return [{ code: '// TODO: EnumMember', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.EqualsEqualsEqualsToken: {
			return [{ code: '===', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.EqualsEqualsToken: {
			return [{ code: '==', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.EqualsGreaterThanToken: {
			return [{ code: '=>', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.FirstAssignment:
		case tsCompilerApi.SyntaxKind.EqualsToken: {
			return [{ code: '=', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ExclamationEqualsEqualsToken: {
			return [{ code: '!==', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ExclamationEqualsToken: {
			return [{ code: '!=', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ExclamationToken: {
			return [{ code: '!', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ExportAssignment: {
			return [{ code: '// TODO: ExportAssignment', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ExportDeclaration: {
			return [{ code: '// TODO: ExportDeclaration', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ExportKeyword: {
			return [{ code: 'export', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ExportSpecifier: {
			return [{ code: '// TODO: ExportSpecifier', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ExpressionStatement: {
			return [{ code: '// TODO: ExpressionStatement', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ExpressionWithTypeArguments: {
			return [{ code: '// TODO: ExpressionWithTypeArguments', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ExtendsKeyword: {
			return [{ code: 'extends', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ExternalModuleReference: {
			return [{ code: '// TODO: ExternalModuleReference', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.FalseKeyword: {
			return [{ code: 'false', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.FinallyKeyword: {
			return [{ code: 'finally', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ForInStatement: {
			return [{ code: '// TODO: ForInStatement', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ForKeyword: {
			return [{ code: 'for', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ForOfStatement: {
			return [{ code: '// TODO: ForOfStatement', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ForStatement: {
			return [{ code: '// TODO: ForStatement', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.FromKeyword: {
			return [{ code: 'from', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.MethodSignature:
		case tsCompilerApi.SyntaxKind.FunctionDeclaration: {
			if (tsCompilerApi.isMethodSignature(node) || tsCompilerApi.isFunctionDeclaration(node)) {
				return parseFunctionDeclaration(node, prefix);
			}
			return [];
		}

		case tsCompilerApi.SyntaxKind.FunctionExpression: {
			return [{ code: '// TODO: FunctionExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.FunctionKeyword: {
			return [{ code: 'function', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.FunctionType: {
			if (tsCompilerApi.isFunctionTypeNode(node)) {
				return parseFunctionType(node, prefix);
			}
			return [];
		}

		case tsCompilerApi.SyntaxKind.GetAccessor: {
			return [{ code: '// TODO: GetAccessor', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.GetKeyword: {
			return [{ code: 'get', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.GlobalKeyword: {
			return [{ code: 'global', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.GreaterThanEqualsToken: {
			return [{ code: '>=', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.GreaterThanGreaterThanEqualsToken: {
			return [{ code: '>>=', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken: {
			return [{ code: '>>>=', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.GreaterThanGreaterThanGreaterThanToken: {
			return [{ code: '>>>', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.GreaterThanGreaterThanToken: {
			return [{ code: '>>', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.GreaterThanToken: {
			return [{ code: '>', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.HashToken: {
			return [{ code: '#', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.HeritageClause: {
			return [{ code: '// TODO: HeritageClause', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.Identifier: {
			if (tsCompilerApi.isIdentifier(node)) {
				return [{ code: prefix + node.escapedText, bindings: [] }];
			}
			return [];
		}

		case tsCompilerApi.SyntaxKind.IfKeyword: {
			return [{ code: 'if', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.IfStatement: {
			return [{ code: '// TODO: IfStatement', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.FirstFutureReservedWord:
		case tsCompilerApi.SyntaxKind.ImplementsKeyword: {
			return [{ code: 'implements', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ImportAttribute: {
			return [{ code: '// TODO: ImportAttribute', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ImportAttributes: {
			return [{ code: '// TODO: ImportAttributes', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ImportClause: {
			return [{ code: '// TODO: ImportClause', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ImportDeclaration: {
			return [{ code: '// TODO: ImportDeclaration', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ImportEqualsDeclaration: {
			return [{ code: '// TODO: ImportEqualsDeclaration', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ImportKeyword: {
			return [{ code: 'import', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ImportSpecifier: {
			return [{ code: '// TODO: ImportSpecifier', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.LastTypeNode:
		case tsCompilerApi.SyntaxKind.ImportType: {
			return [{ code: '// TODO: ImportType', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.IndexedAccessType: {
			return [{ code: '// TODO: IndexedAccessType', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.IndexSignature: {
			return [{ code: '// TODO: IndexSignature', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.InferKeyword: {
			return [{ code: 'infer', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.InferType: {
			return [{ code: '// TODO: InferType', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.InKeyword: {
			return [{ code: 'in', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.InstanceOfKeyword: {
			return [{ code: 'instanceof', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.InterfaceDeclaration: {
			if (tsCompilerApi.isInterfaceDeclaration(node)) {
				return parseInterfaceDeclaration(node, prefix);
			}
			return [];
		}

		case tsCompilerApi.SyntaxKind.InterfaceKeyword: {
			return [{ code: 'interface', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.IntersectionType: {
			return [{ code: '// TODO: IntersectionType', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.IntrinsicKeyword: {
			return [{ code: 'intrinsic', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.IsKeyword: {
			return [{ code: 'is', bindings: [] }];
		}

		// Ignore all JSDoc Kinds
		case tsCompilerApi.SyntaxKind.LastJSDocNode:
		case tsCompilerApi.SyntaxKind.LastJSDocTagNode:
		case tsCompilerApi.SyntaxKind.JSDocImportTag: {
			break;
		}

		// Ignore all JSDoc Kinds
		case tsCompilerApi.SyntaxKind.FirstToken:
		case tsCompilerApi.SyntaxKind.JSDocUnknownType: {
			break;
		}

		// Ignore all JSDoc Kinds
		case tsCompilerApi.SyntaxKind.JSDoc:
		case tsCompilerApi.SyntaxKind.JSDocAllType:
		case tsCompilerApi.SyntaxKind.JSDocAugmentsTag:
		case tsCompilerApi.SyntaxKind.JSDocAuthorTag:
		case tsCompilerApi.SyntaxKind.JSDocCallbackTag:
		case tsCompilerApi.SyntaxKind.JSDocClassTag:
		case tsCompilerApi.SyntaxKind.JSDocComment:
		case tsCompilerApi.SyntaxKind.JSDocDeprecatedTag:
		case tsCompilerApi.SyntaxKind.JSDocEnumTag:
		case tsCompilerApi.SyntaxKind.JSDocFunctionType:
		case tsCompilerApi.SyntaxKind.JSDocImplementsTag:
		case tsCompilerApi.SyntaxKind.JSDocLink:
		case tsCompilerApi.SyntaxKind.JSDocLinkCode:
		case tsCompilerApi.SyntaxKind.JSDocLinkPlain:
		case tsCompilerApi.SyntaxKind.JSDocMemberName:
		case tsCompilerApi.SyntaxKind.JSDocNamepathType:
		case tsCompilerApi.SyntaxKind.JSDocNameReference:
		case tsCompilerApi.SyntaxKind.JSDocNonNullableType:
		case tsCompilerApi.SyntaxKind.JSDocNullableType:
		case tsCompilerApi.SyntaxKind.JSDocOptionalType:
		case tsCompilerApi.SyntaxKind.JSDocOverloadTag:
		case tsCompilerApi.SyntaxKind.JSDocOverrideTag:
		case tsCompilerApi.SyntaxKind.JSDocParameterTag:
		case tsCompilerApi.SyntaxKind.JSDocPrivateTag:
		case tsCompilerApi.SyntaxKind.JSDocPropertyTag:
		case tsCompilerApi.SyntaxKind.JSDocProtectedTag:
		case tsCompilerApi.SyntaxKind.JSDocPublicTag:
		case tsCompilerApi.SyntaxKind.JSDocReadonlyTag:
		case tsCompilerApi.SyntaxKind.JSDocReturnTag:
		case tsCompilerApi.SyntaxKind.JSDocSatisfiesTag:
		case tsCompilerApi.SyntaxKind.JSDocSeeTag:
		case tsCompilerApi.SyntaxKind.JSDocSignature:
		case tsCompilerApi.SyntaxKind.FirstJSDocTagNode:
		case tsCompilerApi.SyntaxKind.JSDocTag:
		case tsCompilerApi.SyntaxKind.JSDocTemplateTag:
		case tsCompilerApi.SyntaxKind.JSDocText:
		case tsCompilerApi.SyntaxKind.JSDocThisTag:
		case tsCompilerApi.SyntaxKind.JSDocThrowsTag:
		case tsCompilerApi.SyntaxKind.FirstJSDocNode:
		case tsCompilerApi.SyntaxKind.JSDocTypedefTag:
		case tsCompilerApi.SyntaxKind.JSDocTypeExpression:
		case tsCompilerApi.SyntaxKind.JSDocTypeLiteral:
		case tsCompilerApi.SyntaxKind.JSDocTypeTag:
		case tsCompilerApi.SyntaxKind.JSDocVariadicType: {
			break;
		}

		// Ignore all Jsx Kinds
		case tsCompilerApi.SyntaxKind.JsxAttribute:
		case tsCompilerApi.SyntaxKind.JsxAttributes:
		case tsCompilerApi.SyntaxKind.JsxClosingElement:
		case tsCompilerApi.SyntaxKind.JsxClosingFragment:
		case tsCompilerApi.SyntaxKind.JsxElement:
		case tsCompilerApi.SyntaxKind.JsxExpression:
		case tsCompilerApi.SyntaxKind.JsxFragment:
		case tsCompilerApi.SyntaxKind.JsxNamespacedName:
		case tsCompilerApi.SyntaxKind.JsxOpeningElement:
		case tsCompilerApi.SyntaxKind.JsxOpeningFragment:
		case tsCompilerApi.SyntaxKind.JsxSelfClosingElement:
		case tsCompilerApi.SyntaxKind.JsxSpreadAttribute:
		case tsCompilerApi.SyntaxKind.JsxText:
		case tsCompilerApi.SyntaxKind.JsxTextAllWhiteSpaces: {
			break;
		}

		case tsCompilerApi.SyntaxKind.KeyOfKeyword: {
			return [{ code: 'keyof', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.LabeledStatement: {
			return [{ code: '// TODO: LabeledStatement', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.LessThanEqualsToken: {
			return [{ code: '<=', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.LessThanLessThanEqualsToken: {
			return [{ code: '<<=', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.LessThanLessThanToken: {
			return [{ code: '<<', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.LessThanSlashToken: {
			return [{ code: '</', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.FirstBinaryOperator:
		case tsCompilerApi.SyntaxKind.LessThanToken: {
			return [{ code: '<', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.LetKeyword: {
			return [{ code: 'let', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.LiteralType: {
			return [{ code: '// TODO: LiteralType', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.MappedType: {
			return [{ code: '// TODO: MappedType', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.MetaProperty: {
			return [{ code: '// TODO: MetaProperty', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.MethodDeclaration: {
			return [{ code: '// TODO: MethodDeclaration', bindings: [] }];
		}

		// case tsCompilerApi.SyntaxKind.MethodSignature: {
		// 	if (tsCompilerApi.isMethodSignature(node)) {
		// 		return parseMethodSignature(node, prefix);
		// 	}
		// 	return [];
		// }

		case tsCompilerApi.SyntaxKind.MinusEqualsToken: {
			return [{ code: '// TODO: MinusEqualsToken', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.MinusMinusToken: {
			return [{ code: '// TODO: MinusMinusToken', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.MinusToken: {
			return [{ code: '// TODO: MinusToken', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.MissingDeclaration: {
			return [{ code: '// TODO: MissingDeclaration', bindings: [] }];
		}

		// readonly statements: NodeArray<Statement>;
		case tsCompilerApi.SyntaxKind.ModuleBlock: {
			if (tsCompilerApi.isModuleBlock(node)) {
				return parseModuleBlock(node, prefix);
			}
			return [];
		}

		case tsCompilerApi.SyntaxKind.ModuleDeclaration: {
			if (tsCompilerApi.isModuleDeclaration(node)) {
				return wrapJsModuleDeclaration(node, prefix);
			}
			return [];
		}

		case tsCompilerApi.SyntaxKind.ModuleKeyword: {
			return [{ code: 'module', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.MultiLineCommentTrivia: {
			return [{ code: '// TODO: MultiLineCommentTrivia', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.NamedExports: {
			return [{ code: '// TODO: NamedExports', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.NamedImports: {
			return [{ code: '// TODO: NamedImports', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.NamedTupleMember: {
			return [{ code: '// TODO: NamedTupleMember', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.NamespaceExport: {
			return [{ code: '// TODO: NamespaceExport', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.NamespaceExportDeclaration: {
			return [{ code: '// TODO: NamespaceExportDeclaration', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.NamespaceImport: {
			return [{ code: '// TODO: NamespaceImport', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.NamespaceKeyword: {
			return [{ code: 'namespace', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.NeverKeyword: {
			return [{ code: 'never', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.NewExpression: {
			return [{ code: '// TODO: NewExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.NewKeyword: {
			return [{ code: 'new', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.NewLineTrivia: {
			return [{ code: '// TODO: NewLineTrivia', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.NonNullExpression: {
			return [{ code: '// TODO: NonNullExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.NonTextFileMarkerTrivia: {
			return [{ code: '// TODO: NonTextFileMarkerTrivia', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.FirstTemplateToken:
		case tsCompilerApi.SyntaxKind.LastLiteralToken:
		case tsCompilerApi.SyntaxKind.NoSubstitutionTemplateLiteral: {
			return [{ code: '// TODO: NoSubstitutionTemplateLiteral', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.NotEmittedStatement: {
			return [{ code: '// TODO: NotEmittedStatement', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.NullKeyword: {
			return [{ code: 'null', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.NumberKeyword: {
			return [{ code: 'number', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.FirstLiteralToken:
		case tsCompilerApi.SyntaxKind.NumericLiteral: {
			return [{ code: '// TODO: NumericLiteral', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ObjectBindingPattern: {
			return [{ code: '// TODO: ObjectBindingPattern', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ObjectKeyword: {
			return [{ code: 'object', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ObjectLiteralExpression: {
			return [{ code: '// TODO: ObjectLiteralExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.LastKeyword:
		case tsCompilerApi.SyntaxKind.LastToken:
		case tsCompilerApi.SyntaxKind.OfKeyword: {
			return [{ code: 'of', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.OmittedExpression: {
			return [{ code: '// TODO: OmittedExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.FirstPunctuation:
		case tsCompilerApi.SyntaxKind.OpenBraceToken: {
			return [{ code: '// TODO: OpenBraceToken', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.OpenBracketToken: {
			return [{ code: '// TODO: OpenBracketToken', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.OpenParenToken: {
			return [{ code: '// TODO: OpenParenToken', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.OptionalType: {
			return [{ code: '// TODO: OptionalType', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.OutKeyword: {
			return [{ code: 'out', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.OverrideKeyword: {
			return [{ code: 'override', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.PackageKeyword: {
			return [{ code: 'package', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.Parameter: {
			if (tsCompilerApi.isParameter(node)) {
				return parseParameter(node, prefix);
			}
			return [];
		}

		case tsCompilerApi.SyntaxKind.ParenthesizedExpression: {
			return [{ code: '// TODO: ParenthesizedExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ParenthesizedType: {
			return [{ code: '// TODO: ParenthesizedType', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.PartiallyEmittedExpression: {
			return [{ code: '// TODO: PartiallyEmittedExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.PercentEqualsToken: {
			return [{ code: '%=', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.PercentToken: {
			return [{ code: '%', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.FirstCompoundAssignment:
		case tsCompilerApi.SyntaxKind.PlusEqualsToken: {
			return [{ code: '+=', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.PlusPlusToken: {
			return [{ code: '++', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.PlusToken: {
			return [{ code: '+', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.PostfixUnaryExpression: {
			return [{ code: '// TODO: PostfixUnaryExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.PrefixUnaryExpression: {
			return [{ code: '// TODO: PrefixUnaryExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.PrivateIdentifier: {
			return [{ code: '// TODO: PrivateIdentifier', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.PrivateKeyword: {
			return [{ code: 'private', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.PropertyAccessExpression: {
			return [{ code: '// TODO: PropertyAccessExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.PropertyAssignment: {
			return [{ code: '// TODO: PropertyAssignment', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.PropertyDeclaration: {
			return [{ code: '// TODO: PropertyDeclaration', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.PropertySignature: {
			return [{ code: '// TODO: PropertySignature', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ProtectedKeyword: {
			return [{ code: 'protected', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.PublicKeyword: {
			return [{ code: 'public', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.FirstNode:
		case tsCompilerApi.SyntaxKind.QualifiedName: {
			return [{ code: '// TODO: QualifiedName', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.QuestionDotToken: {
			return [{ code: '?.', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.QuestionQuestionEqualsToken: {
			return [{ code: '??=', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.QuestionQuestionToken: {
			return [{ code: '??', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.QuestionToken: {
			return [{ code: '?', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ReadonlyKeyword: {
			return [{ code: 'readonly', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.RegularExpressionLiteral: {
			return [{ code: '// TODO: RegularExpressionLiteral', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.RequireKeyword: {
			return [{ code: 'require', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.RestType: {
			return [{ code: '// TODO: RestType', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ReturnKeyword: {
			return [{ code: 'return', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ReturnStatement: {
			return [{ code: '// TODO: ReturnStatement', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.SatisfiesExpression: {
			return [{ code: '// TODO: SatisfiesExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.SatisfiesKeyword: {
			return [{ code: 'satisfies', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.SemicolonClassElement: {
			return [{ code: '// TODO: SemicolonClassElement', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.SemicolonToken: {
			return [{ code: ';', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.SetAccessor: {
			return [{ code: '// TODO: SetAccessor', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.SetKeyword: {
			return [{ code: 'set', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ShebangTrivia: {
			return [{ code: '// TODO: ShebangTrivia', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ShorthandPropertyAssignment: {
			return [{ code: '// TODO: ShorthandPropertyAssignment', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.FirstTriviaToken:
		case tsCompilerApi.SyntaxKind.SingleLineCommentTrivia: {
			return [{ code: '// TODO: SingleLineCommentTrivia', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.SlashEqualsToken: {
			return [{ code: '/=', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.SlashToken: {
			return [{ code: '/', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.SourceFile: {
			if (tsCompilerApi.isSourceFile(node)) {
				return parseSourceFile(node, prefix);
			}
			return [];
		}

		case tsCompilerApi.SyntaxKind.SpreadAssignment: {
			return [{ code: '// TODO: SpreadAssignment', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.SpreadElement: {
			return [{ code: '// TODO: SpreadElement', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.StaticKeyword: {
			return [{ code: 'static', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.StringKeyword: {
			return [{ code: 'string', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.StringLiteral: {
			return [{ code: '// TODO: StringLiteral', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.SuperKeyword: {
			return [{ code: 'super', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.SwitchKeyword: {
			return [{ code: 'switch', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.SwitchStatement: {
			return [{ code: '// TODO: SwitchStatement', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.SymbolKeyword: {
			return [{ code: 'symbol', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.SyntaxList: {
			return [{ code: '// TODO: SyntaxList', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.SyntheticExpression: {
			return [{ code: '// TODO: SyntheticExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.SyntheticReferenceExpression: {
			return [{ code: '// TODO: SyntheticReferenceExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TaggedTemplateExpression: {
			return [{ code: '// TODO: TaggedTemplateExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TemplateExpression: {
			return [{ code: '// TODO: TemplateExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TemplateHead: {
			return [{ code: '// TODO: TemplateHead', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TemplateLiteralType: {
			return [{ code: '// TODO: TemplateLiteralType', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TemplateLiteralTypeSpan: {
			return [{ code: '// TODO: TemplateLiteralTypeSpan', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TemplateMiddle: {
			return [{ code: '// TODO: TemplateMiddle', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TemplateSpan: {
			return [{ code: '// TODO: TemplateSpan', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.LastTemplateToken:
		case tsCompilerApi.SyntaxKind.TemplateTail: {
			return [{ code: '// TODO: TemplateTail', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ThisKeyword: {
			return [{ code: 'this', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ThisType: {
			return [{ code: '// TODO: ThisType', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ThrowKeyword: {
			return [{ code: 'throw', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.ThrowStatement: {
			return [{ code: '// TODO: ThrowStatement', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TildeToken: {
			return [{ code: '~', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TrueKeyword: {
			return [{ code: 'true', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TryKeyword: {
			return [{ code: 'try', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TryStatement: {
			return [{ code: '// TODO: TryStatement', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TupleType: {
			return [{ code: '// TODO: TupleType', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TypeAliasDeclaration: {
			return [{ code: '// TODO: TypeAliasDeclaration', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TypeAssertionExpression: {
			return [{ code: '// TODO: TypeAssertionExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TypeKeyword: {
			return [{ code: 'type', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TypeLiteral: {
			return [{ code: '// TODO: TypeLiteral', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TypeOfExpression: {
			return [{ code: '// TODO: TypeOfExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TypeOfKeyword: {
			return [{ code: 'typeof', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TypeOperator: {
			return [{ code: '// TODO: TypeOperator', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TypeParameter: {
			return [{ code: '// TODO: TypeParameter', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.FirstTypeNode:
		case tsCompilerApi.SyntaxKind.TypePredicate: {
			return [{ code: '// TODO: TypePredicate', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TypeQuery: {
			return [{ code: '// TODO: TypeQuery', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.TypeReference: {
			if (tsCompilerApi.isTypeReferenceNode(node)) {
				return parseTypeReference(node, prefix);
			}
			return [];
		}

		case tsCompilerApi.SyntaxKind.UndefinedKeyword: {
			return [{ code: 'undefined', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.UnionType: {
			return (tsCompilerApi.isUnionTypeNode(node)) ? parseUnionTypeNode(node, prefix) : [];
		}

		case tsCompilerApi.SyntaxKind.UniqueKeyword: {
			return [{ code: 'unique', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.Unknown: {
			return [{ code: '// TODO: Unknown', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.UnknownKeyword: {
			return [{ code: 'unknown', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.UsingKeyword: {
			return [{ code: 'using', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.VariableDeclaration: {
			if (tsCompilerApi.isVariableDeclaration(node)) {
				const name = parseAst(node.name, prefix);
				const type = node.type
					? parseAst(node.type, prefix).reduce<string>((merged, result) => merged + result.code, '')
					: 'any';
				return [{ code: `${name}: ${type}`, bindings: [] }];
			}
			return [];
		}

		case tsCompilerApi.SyntaxKind.VariableDeclarationList: {
			return [{ code: '// TODO: VariableDeclarationList', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.FirstStatement:
		case tsCompilerApi.SyntaxKind.VariableStatement: {
			if (tsCompilerApi.isVariableStatement(node)) {
				return parseVariableStatement(node, prefix);
			}
			return [];
		}

		case tsCompilerApi.SyntaxKind.VarKeyword: {
			return [{ code: 'var', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.VoidExpression: {
			return [{ code: '// TODO: VoidExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.VoidKeyword: {
			return [{ code: 'void', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.WhileKeyword: {
			return [{ code: 'while', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.WhileStatement: {
			return [{ code: '// TODO: WhileStatement', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.WhitespaceTrivia: {
			return [{ code: '// TODO: WhitespaceTrivia', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.LastReservedWord:
		case tsCompilerApi.SyntaxKind.WithKeyword: {
			return [{ code: 'with', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.WithStatement: {
			return [{ code: '// TODO: WithStatement', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.YieldExpression: {
			return [{ code: '// TODO: YieldExpression', bindings: [] }];
		}

		case tsCompilerApi.SyntaxKind.LastFutureReservedWord:
		case tsCompilerApi.SyntaxKind.YieldKeyword: {
			return [{ code: 'yield', bindings: [] }];
		}

		default: {
			return [];
		}
	}

	return [];
}
// }}}

export function convertParseResultToString(result: ParseResult): string {
	if (result === undefined) return '';
	if (typeof result === 'string') return result;
	return result.code;
}

// todo: modifiers
export function parseVariableStatement(statement: tsCompilerApi.VariableStatement, prefix = ''): ParseResult[] {
	if (typeof prefix === 'number') {
		throw new TypeError('Numeric Prefix', prefix);
	}

	const parseResults: ParseResult[] = [];
	for (const declaration of statement.declarationList.declarations) {
		for (const result of parseAst(declaration.name, prefix)) {
			const variableName = result.code;
			const functionName = `get${alphaNumeric(capitalize(variableName))}`;
			const code = `
				/**
				 * Get an Atom that contains '${variableName}'
				 * @see SyntaxKind.VariableDeclaration
				 * @param args is empty
				 * @returns an Atom with value of '${variableName}'
				 */
				export function ${functionName}(..._args: types.AstNode[]): types.AstNode {
					return new types.AtomNode(${variableName});
				}
			`;
			const bindings: Binding[] = [[variableName, functionName]];
			parseResults.push({ code, bindings });
		}
	}

	return parseResults;
}

/**
 * @todo implement asteriskToken, body, modifiers, typeParameters
 * Also handles MethodDeclaration
 */
export function parseFunctionDeclaration(
	node: tsCompilerApi.FunctionDeclaration | tsCompilerApi.MethodSignature,
	prefix = '',
): ParseResult[] {
	if (!node.name || !node.type) {
		console.log(node.getText());
		return []; // How to handle an anonymous or typeless function?
	}

	const functionName = parseAst(node.name, '').reduce<string>((merged, result) => merged + result.code, '');
	const isAlreadyPrefixed = functionName.startsWith(prefix);
	const prefixedFunctionName = isAlreadyPrefixed ? functionName : prefix + functionName;
	const wrapperFunctionName = `call${alphaNumeric(prefix)}${capitalize(functionName)}`;
	const parameters = tsCompilerApi.isMethodSignature(node)
		? [
			tsCompilerApi.factory.createParameterDeclaration(undefined, undefined, alphaNumeric(prefix)),
			...node.parameters,
		]
		: node.parameters;
	const variableNames: string[] = [...parameters.keys()].map((i) => `a${i}`);

	let functionCall = `${prefixedFunctionName}(${variableNames.join(', ')});`;
	if (tsCompilerApi.isMethodSignature(node)) {
		// console.log('MethodSignature.parameters', parameters.length, parameters);
		functionCall = `${prefix}prototype.${functionName}.apply(${variableNames.join(', ')});`;
	}

	const returnType = parseAst(node.type, prefix).reduce<string>((merged, result) => merged + result.code, '');
	const assertions = getFunctionAssertions(node.parameters, prefix);
	const code = `
        /**
         * Apply ${prefixedFunctionName} with the given arguments.
         * @see ts.SyntaxKind.${tsCompilerApi.SyntaxKind[node.kind]}
         * @returns an AstNode representation of ${returnType}
         */
        export function ${wrapperFunctionName}(...args: types.AstNode[]): types.AstNode {
            try {
                ${assertions.join('\n')}
                const result: ${returnType} = ${functionCall}
                return types.toAst(result);
            } catch (error: unknown) {
                const message = (error instanceof Error) ? error.message : JSON.stringify(error);
                return new types.ErrorNode(new types.StringNode(message));
            }
        }
    `;

	return [{
		code,
		bindings: [[prefixedFunctionName, wrapperFunctionName]],
	}];
}

function getFunctionAssertions(
	parameters: tsCompilerApi.NodeArray<tsCompilerApi.ParameterDeclaration>,
	prefix: string,
) {
	const allowedArgs = parameters.reduce<MinMax>((counts, parameter) => {
		const isRequired = !parameter.questionToken;
		return { min: isRequired ? counts.min++ : counts.min, max: counts.max++ };
	}, { min: 0, max: 0 });

	const argumentCountAssertion = (allowedArgs.min === allowedArgs.max)
		? `types.assertArgumentCount(args.length, ${allowedArgs.min});`
		: `types.assertVariableArgumentCount(args.length, ${allowedArgs.min}, ${allowedArgs.max});`;

	const assertions: string[] = [argumentCountAssertion];
	for (let i = 0; i < parameters.length; i++) {
		const parameter = parameters[i];
		// Parameter type may be a union type. In that case we have to test for variants.
		const types = parameter.type ? parseAst(parameter.type, prefix) : [];
		if (types.length === 0) continue;

		const isOptional = Boolean(parameter.questionToken);

		if (isOptional) {
			assertions.push(getOptionalArgAssertion(types, allowedArgs.min, i));
		} else {
			assertions.push(getRequiredArgAssertion(types, i));
		}
	}

	return assertions;
}

function getRequiredArgAssertion(types: ParseResult[], i: number) {
	const variableName = `a${i}`;
	if (types.length === 1) {
		return `types.assert${jsTypeToAstNode(types[0].code)}(args[${i}]);
			const ${variableName} = args[${i}].value;`;
	}

	const validAstNodeTypes = [];
	const typeChecks = [];

	for (const type of types) {
		validAstNodeTypes.push(jsTypeToAstNode(type.code));
		typeChecks.push(`types.is${jsTypeToAstNode(type.code)}(args[${i}])`);
	}

	return `if (!(${typeChecks.join(' || ')})) {
				throw new TypeError('Argument ${i} must be one of: ${validAstNodeTypes.join(', ')}');
			}
			const ${variableName} = args[${i}].value;`;
}

function getOptionalArgAssertion(types: ParseResult[], requiredArgs: number, i: number) {
	const variableName = `a${i}`;
	if (types.length === 1) {
		const type = types[0].code;
		// TODO: Use the initializer if there is one
		return `let ${variableName}: ${type} | undefined = undefined;
			if (args.length > ${requiredArgs}) {
				types.assert${jsTypeToAstNode(type)}(args[${i}]);
				${variableName} = args[${i}].value;
			}`;
	} else {
		const validAstNodeTypes = [];
		const typeChecks = [];
		const unionTypes = [];

		for (const type of types) {
			unionTypes.push(type.code);
			validAstNodeTypes.push(jsTypeToAstNode(type.code));
			typeChecks.push(`types.is${jsTypeToAstNode(type.code)}(args[${i}])`);
		}

		// TODO: Use the initializer if there is one
		return `let ${variableName}: ${unionTypes.join(' | ')} | undefined = undefined;											
			if (args.length > ${requiredArgs}) {
				if (!(${typeChecks.join(' || ')})) {
					throw new TypeError('Argument ${i} must be one of: ${validAstNodeTypes.join(', ')}, undefined');
				}
				${variableName} = args[${i}].value;
			}`;
	}
}

export function wrapJsModuleDeclaration(node: tsCompilerApi.ModuleDeclaration, _prefix = ''): ParseResult[] {
	const moduleName = parseAst(node.name, '').reduce<string>((merged, result) => merged + result.code, '') + '.';
	const parseResults: ParseResult[] = [];
	if (node.body !== undefined && tsCompilerApi.isModuleBody(node)) {
		const results = parseAst(node.body, moduleName);
		parseResults.push(...results);
	}
	return parseResults;
}

function parseUnionTypeNode(node: tsCompilerApi.UnionTypeNode, prefix = '') {
	const parseResults: ParseResult[] = [];
	for (const type of node.types) {
		const parseResult = parseAst(type, prefix);
		parseResults.push(...parseResult);
	}
	return parseResults;
}

function parseModuleBlock(node: tsCompilerApi.ModuleBlock, prefix = ''): ParseResult[] {
	let parseResults: ParseResult[] = [];
	for (const statement of node.statements) {
		parseResults = parseResults.concat(parseAst(statement, prefix));
	}
	return parseResults;
}

function parseSourceFile(node: tsCompilerApi.SourceFile, prefix = ''): ParseResult[] {
	const parseResults: ParseResult[] = [];
	for (const statement of node.statements) {
		const parseResult = parseAst(statement, prefix);
		parseResults.push(...parseResult);
	}
	return parseResults;
}

function parseInterfaceDeclaration(node: tsCompilerApi.InterfaceDeclaration, _prefix = ''): ParseResult[] {
	const interfaceName = parseAst(node.name, '');
	const name = interfaceName.reduce<string>((merged, result) => merged + result.code, '') + '.';
	const parsedResult = node.members.flatMap((member) => parseAst(member, name));
	return parsedResult;
}

function parseTypeReference(node: tsCompilerApi.TypeReferenceNode, _prefix = ''): ParseResult[] {
	const typeName = parseAst(node.typeName, '').reduce<string>((merged, result) => merged + result.code, '');
	return [{ code: typeName, bindings: [] }];
}

function parseArrayType(node: tsCompilerApi.ArrayTypeNode, _prefix = ''): ParseResult[] {
	const elementType = parseAst(node.elementType, '').reduce<string>((merged, result) => merged + result.code, '');
	return [{ code: elementType + '[]', bindings: [] }];
}

// FunctionType = CallableFunction.prototype.bind.apply(a0, a1, a2, a3);
function parseFunctionType(node: tsCompilerApi.FunctionTypeNode, prefix = ''): ParseResult[] {
	const returnType = parseAst(node.type, '').reduce<string>((merged, result) => merged + result.code, '');
	const parsedParameters = node.parameters.flatMap((parameter) => parseAst(parameter, prefix));
	const parameters = parsedParameters.map((parameter) => parameter.code).join(', ');
	const code = `(${parameters}) => ${returnType}`;
	return [{ code, bindings: [] }];
}

function parseParameter(node: tsCompilerApi.ParameterDeclaration, _prefix = ''): ParseResult[] {
	const rest = (node.dotDotDotToken) ? '...' : '';
	const optional = node.questionToken ? '?' : '';
	const name = parseAst(node.name, '').reduce<string>((merged, result) => merged + result.code, '');
	const type = node.type
		? ': ' + parseAst(node.type, '').reduce<string>((merged, result) => merged + result.code, '')
		: '';
	const initializer = node.initializer
		? ' = ' + parseAst(node.initializer).reduce<string>((merged, result) => merged + result.code, '')
		: '';

	return [{ code: `${rest}${name}${optional}: ${type}${initializer}`, bindings: [] }];
}

function parseConstructorType(node: tsCompilerApi.ConstructorTypeNode, prefix = ''): ParseResult[] {
	return [];
	// const type = parseAst(node.type, '').reduce<string>((merged, result) => merged + result.code, '');
	// const parsedParameters = node.parameters.flatMap((parameter) => parseAst(parameter, prefix));
	// const parameters = parsedParameters.map((parameter) => parameter.code).join(', ');
	// const code = `new (${parameters}) => ${type}`;

	// return [{ code, bindings: [] }];
}

// Utilities

function jsTypeToAstNode(type: string): string {
	if (['string', 'number', 'boolean', 'function', 'symbol'].includes(type)) {
		return `${capitalize(type)}Node`;
	} else if (type === 'array') {
		return `VectorNode`;
	}
	return 'AtomNode';
}

function capitalize(text: string) {
	return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
}

function alphaNumeric(text: string) {
	return String(text).replaceAll(/[^a-zA-Z0-9]*/g, '');
}

if (import.meta.main) {
	if (!Deno.args.length) {
		console.error('No file');
		Deno.exit(1);
	}

	const file = Deno.args[0];
	const decoder = new TextDecoder();
	const data = decoder.decode(Deno.readFileSync(file));
	const code = generateCodeFromDtsFile(file, data);
	console.log(code);
}
