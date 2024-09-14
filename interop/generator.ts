import ts from 'typescript';

import { Ast, SerializedAst } from './ast.ts';
import { Meta } from './types.ts';
import { formatId, formatName, isValidMeta } from './utils.ts';
import { AppCache } from './cache.ts';

/**
 * The `Generator` class is responsible for parsing TypeScript source files and generating an abstract syntax tree (AST) representation of the code.
 * It iterates over the statements in a source file, converts each of them into an `Ast` object, and stores the serialized AST objects in the `globals` array.
 * The class also maintains various caches and data structures to store information about the generated code, such as declarations, built-in types, and interfaces.
 */
export class Generator {
	public debug = true;

	/**
	 * An array to store the serialized AST objects for the generated global declarations.
	 */
	public globals: Record<string, Ast[]> = {};

	/**
	 * The Program contains information about the program, including the source files, compiler options, and diagnostics.
	 */
	public program: ts.Program;

	/**
	 * The cache used by the generator to store and retrieve information about the generated code.
	 */
	public cache: AppCache;

	public validVariableRegEx = new RegExp(/^[a-zA-Z_$][a-zA-Z0-9_$]*$/);

	public idCount = 999;

	/**
	 * Initializes the generator with the provided file paths. Only the entry point files are necessary as the Typescript
	 * Program will automatically load the dependencies.
	 *
	 * @param filePaths - An array of file paths to be generated.
	 */
	constructor(program: ts.Program, cache: AppCache) {
		if (!program || !cache) {
			throw new TypeError('A program and cache are required');
		}
		this.program = program;
		this.cache = cache;
	}

	/**
	 * This is the main entry point for the generator.
	 * It iterates over the statements in a source file and converts each of them into an Ast object.
	 * @returns An array of Ast objects representing the generated source file.
	 */
	public generate() {
		this.cache.initialize();

		// Then process the program, resolving declarations along the way.
		this.program.getSourceFiles().forEach((sourceFile) => {
			sourceFile.forEachChild((node) => {
				this.visitStatements(node, sourceFile, '');
			});
		});

		// console.log('// Found %s globals', Object.values(this.globals).length);
		// console.log('// Found %s declarations', this.cache.declarations.size);
		const statements = Object.values(this.globals).reduce<SerializedAst[]>((acc, asts) => {
			asts.forEach((ast) => {
				const globalName = ast.getId().split('.')[0];
				if (this.cache.declarations.has(globalName)) {
					acc.push(ast.serialize());
				}
			});
			return acc;
		}, []).sort((a, b) => (a.id ?? 'z').localeCompare(b.id ?? 'z'));
		// console.log(`// Generated ${statements.length} statements`);

		console.log(JSON.stringify(statements, null, 2));

		// 	import * as types from './src/types.ts';
		// 	export const ns = new Map<types.MapKeyNode, types.FunctionNode>();
		// `);

		// return this.globals;
	}

	/**
	 * Saves a serialized AST object to the global scope, keyed by the provided ID.
	 * If the ID does not already exist in the global scope, a new array is created for it.
	 * The serialized AST object is then pushed to the array for the given ID.
	 *
	 * @param id - The unique identifier to use as the key in the global scope.
	 * @param ast - The AST object to serialize and save to the global scope.
	 */
	public saveGlobal(ast: Ast) {
		if (!ast) return;

		const id = ast.getId();

		// Ignore ast's whose id starts with ~ (see ast.ts id)
		// if (id.startsWith('~')) {
		// 	return;
		// }

		// if (this.cache.declarations.has(id)) {
		if (!Object.hasOwn(this.globals, id)) {
			this.globals[id] = [ast];
			return;
		}
		// }

		// // Check if this ast is already part of the global
		// const newText = JSON.stringify(ast.serialize());
		// let hasMatch = false;
		// for (const obj of this.globals[id]) {
		// 	const oldText = JSON.stringify(obj.serialize());
		// 	if (newText === oldText) {
		// 		hasMatch = true;
		// 		break;
		// 	}
		// }

		// if (!hasMatch) {
		// 	this.globals[id].push(ast);
		// }
	}

	// MARK: VISIT STMTS

	/**
	 * Visits top-level declarations and signatures in the TypeScript AST and resolves them to their types.
	 *
	 * @note A switch/case is not used because the is* type-guard functions would still need to be used.
	 * @param node The TypeScript AST to generate.
	 * @param globalPrefix A value such as 'Object.prototype' or 'Object' to add to binding values.
	 */
	public visitStatements(node: ts.Node, sourceFile: ts.SourceFile, globalPrefix = ''): Ast | undefined {
		switch (node.kind) {
			case ts.SyntaxKind.FunctionDeclaration: {
				if (ts.isFunctionDeclaration(node)) {
					return this.readFunctionDeclaration(node, sourceFile, globalPrefix);
				}
				break;
			}

			// Can be ignored because type aliases will be omitted from final output
			case ts.SyntaxKind.TypeAliasDeclaration: {
				return;
				// if (ts.isTypeAliasDeclaration(node)) {
				// 	return this.readTypeAliasDeclaration(node, sourceFile, globalPrefix);
				// }
				// break;
			}

			// Variable declarations are only used for reference, handled in visitDeclarations
			case ts.SyntaxKind.VariableDeclaration: {
				if (ts.isVariableDeclaration(node)) {
					return this.readVariableDeclaration(node, sourceFile);
				}
				break;
			}

			// Collect namespace members
			case ts.SyntaxKind.ModuleDeclaration: {
				if (ts.isModuleDeclaration(node)) {
					return this.readModuleDeclaration(node, sourceFile, globalPrefix);
				}
				break;
			}

			// This is the primary means of collecting definitions
			case ts.SyntaxKind.InterfaceDeclaration: {
				if (ts.isInterfaceDeclaration(node)) {
					return this.readInterfaceDeclaration(node, sourceFile, globalPrefix);
				}
				break;
			}

			case ts.SyntaxKind.CallSignature: {
				if (ts.isCallSignatureDeclaration(node)) {
					return this.readCallSignatureDeclaration(node, sourceFile, globalPrefix);
				}
				break;
			}

			case ts.SyntaxKind.ConstructSignature: {
				// Filtering out items when there isn't a globalPrefix
				if (ts.isConstructSignatureDeclaration(node) && globalPrefix) {
					return this.readConstructSignatureDeclaration(node, sourceFile, globalPrefix);
				} else {
					return;
				}
			}

			case ts.SyntaxKind.HeritageClause: {
				if (ts.isHeritageClause(node)) {
					return this.readHeritage(node, sourceFile, globalPrefix);
				}
				break;
			}

			case ts.SyntaxKind.IndexSignature: {
				if (ts.isIndexSignatureDeclaration(node)) {
					return this.readIndexSignatureDeclaration(node, sourceFile, globalPrefix);
				}
				break;
			}

			case ts.SyntaxKind.MethodSignature: {
				if (ts.isMethodSignature(node)) {
					return this.readMethodSignature(node, sourceFile, globalPrefix);
				}
				break;
			}

			case ts.SyntaxKind.PropertySignature: {
				if (ts.isPropertySignature(node)) {
					return this.readPropertySignature(node, sourceFile, globalPrefix);
				}
				break;
			}

			case ts.SyntaxKind.VariableStatement: {
				if (ts.isVariableStatement(node)) {
					return this.readVariableStatement(node, sourceFile, globalPrefix);
				}
				break;
			}

			case ts.SyntaxKind.EndOfFileToken: {
				return;
			}
		}
		console.warn('Unhandled node type:', ts.SyntaxKind[node.kind]);
	}

	// MARK: VISIT TYPE

	/**
	 * Resolves the type of a TypeScript type node.
	 *
	 * @param typeNode - The TypeScript type node to resolve.
	 * @param parameter - The `ParameterBuilder` object to update with the resolved type information.
	 */
	public visitType(typeNode: ts.Node, sourceFile: ts.SourceFile): Ast {
		const id = this.getNextId();
		const parameter = new Ast(id, id, typeNode.kind);

		switch (typeNode.kind) {
			case ts.SyntaxKind.UnionType: {
				if (!ts.isUnionTypeNode(typeNode)) break;
				parameter.setKind(typeNode.kind);
				for (const childType of typeNode.types) {
					const childParameter = this.visitType(childType, sourceFile);
					parameter.addType(childParameter);
				}
				break;
			}

			case ts.SyntaxKind.ArrayType: {
				if (!ts.isArrayTypeNode(typeNode)) break;

				parameter.setKind(typeNode.kind);
				const childParameter = this.visitType(typeNode.elementType, sourceFile);
				parameter.addType(childParameter);
				break;
			}

			case ts.SyntaxKind.TypeReference: {
				if (!ts.isTypeReferenceNode(typeNode)) break;
				// typeName can be either Identifier or QualifiedName. getText is correct for both. So skip the is* check.
				const referenceName = typeNode.typeName.getText(sourceFile);
				parameter.setKind(typeNode.kind).setName(referenceName);

				// Get the primitive types from the type alias declaration
				if (this.cache.typeAliasDeclarations.has(referenceName)) {
					const [typeAliasFileName, typeAliasNode] = this.cache.typeAliasDeclarations.get(referenceName)!;
					const typeAliasSourceFile = this.program.getSourceFile(typeAliasFileName);
					if (typeAliasSourceFile) {
						const typeAliasAst = this.readTypeAliasDeclaration(typeAliasNode, typeAliasSourceFile);
						if (typeAliasAst) typeAliasAst.forEach((t) => parameter.addType(t));
					}
				}

				if (typeNode.typeArguments) {
					for (const childType of typeNode.typeArguments) {
						const childParameter = this.visitType(childType, sourceFile);
						parameter.addType(childParameter);
					}
				}

				break;
			}

			case ts.SyntaxKind.Identifier: {
				if (!ts.isIdentifier(typeNode)) break;
				parameter.setKind(typeNode.kind).setText(typeNode.getText(sourceFile));
				break;
			}

			case ts.SyntaxKind.LiteralType: {
				if (!ts.isLiteralTypeNode(typeNode)) break;
				parameter.setKind(typeNode.kind).setText(typeNode.getText(sourceFile));
				break;
			}

			case ts.SyntaxKind.FunctionType: {
				if (!ts.isFunctionTypeNode(typeNode)) break;
				parameter.setKind(typeNode.kind);
				if (typeNode.parameters) {
					for (const childType of typeNode.parameters) {
						const childParameter = this.getParameter(childType, sourceFile);
						parameter.addParameter(childParameter);
					}
				}
				if (typeNode.type) {
					const childParameter = this.visitType(typeNode.type, sourceFile);
					parameter.addType(childParameter);
				}
				break;
			}

			case ts.SyntaxKind.TypeLiteral: {
				if (!ts.isTypeLiteralNode(typeNode)) break;
				parameter.setKind(typeNode.kind);
				if (typeNode.members) {
					for (const childType of typeNode.members) {
						const childParameter = this.visitType(childType, sourceFile);
						parameter.addType(childParameter);
					}
				}
				break;
			}

			case ts.SyntaxKind.IntersectionType: {
				if (!ts.isIntersectionTypeNode(typeNode)) break;
				parameter.setKind(typeNode.kind);
				for (const childType of typeNode.types) {
					const childParameter = this.visitType(childType, sourceFile);
					parameter.addType(childParameter);
				}
				break;
			}

			case ts.SyntaxKind.TypeOperator: {
				if (!ts.isTypeOperatorNode(typeNode)) break;
				parameter.setKind(typeNode.kind).setText(ts.tokenToString(typeNode.operator)).addType(this.visitType(typeNode.type, sourceFile));
				break;
			}

			case ts.SyntaxKind.TupleType: {
				if (!ts.isTupleTypeNode(typeNode)) break;

				parameter.setKind(typeNode.kind);
				for (const childType of typeNode.elements) {
					parameter.addType(this.visitType(childType, sourceFile));
				}
				break;
			}

			case ts.SyntaxKind.RestType: {
				if (!ts.isRestTypeNode(typeNode)) break;
				// Skip adding a RestType Ast and return the type directly
				const restType = this.visitType(typeNode.type, sourceFile);
				restType.addMeta(ts.SyntaxKind.DotDotDotToken);
				return restType;
			}

			case ts.SyntaxKind.ParenthesizedType: {
				if (!ts.isParenthesizedTypeNode(typeNode)) break;
				parameter.setKind(typeNode.kind).addType(this.visitType(typeNode.type, sourceFile));
				break;
			}

			case ts.SyntaxKind.IndexSignature: {
				if (!ts.isIndexSignatureDeclaration(typeNode)) break;

				parameter.setKind(typeNode.kind);
				for (const childType of typeNode.parameters) {
					parameter.addParameter(this.visitType(childType, sourceFile));
				}
				parameter.addType(this.visitType(typeNode.type, sourceFile));
				break;
			}

			case ts.SyntaxKind.PropertySignature: {
				if (!ts.isPropertySignature(typeNode)) break;
				parameter.setKind(typeNode.kind).setName(typeNode.name.getText(sourceFile));

				if (typeNode.questionToken !== undefined) {
					parameter.addMeta(ts.SyntaxKind.QuestionToken);
				}

				if (typeNode.type) {
					parameter.addType(this.visitType(typeNode.type, sourceFile));
				}
				break;
			}

			case ts.SyntaxKind.MappedType: {
				if (!ts.isMappedTypeNode(typeNode)) break;
				parameter.setKind(typeNode.kind).addParameter(this.visitType(typeNode.typeParameter, sourceFile));
				if (typeNode.questionToken !== undefined) parameter.addMeta(ts.SyntaxKind.QuestionToken);
				if (typeNode.readonlyToken !== undefined) parameter.addMeta(ts.SyntaxKind.ReadonlyKeyword);
				if (typeNode.type) parameter.addType(this.visitType(typeNode.type, sourceFile));
				break;
			}

			case ts.SyntaxKind.IndexedAccessType: {
				if (!ts.isIndexedAccessTypeNode(typeNode)) break;
				parameter.setKind(typeNode.kind).addType(this.visitType(typeNode.objectType, sourceFile)).addParameter(
					this.visitType(typeNode.indexType, sourceFile),
				);
				break;
			}

			case ts.SyntaxKind.MethodSignature: {
				if (!ts.isMethodSignature(typeNode)) break;
				parameter.setKind(typeNode.kind).setName(typeNode.name.getText(sourceFile));
				if (typeNode.questionToken !== undefined) parameter.addMeta(ts.SyntaxKind.QuestionToken);
				if (typeNode.type) parameter.addType(this.visitType(typeNode.type, sourceFile));
				if (typeNode.parameters) {
					for (const childType of typeNode.parameters) {
						const childParameter = this.getParameter(childType, sourceFile);
						parameter.addParameter(childParameter);
					}
				}

				if (typeNode.typeParameters) {
					for (const childType of typeNode.typeParameters) {
						const childParameter = this.visitType(childType, sourceFile);
						parameter.addTypeParameter(childParameter);
					}
				}
				break;
			}

			case ts.SyntaxKind.ExpressionWithTypeArguments: {
				if (!ts.isExpressionWithTypeArguments(typeNode)) {
					break;
				}
				parameter.addType(this.visitType(typeNode.expression, sourceFile)).setKind(typeNode.kind);
				break;
			}

			case ts.SyntaxKind.Parameter: {
				if (!ts.isParameter(typeNode)) break;

				return this.getParameter(typeNode, sourceFile);
			}

			case ts.SyntaxKind.TypeParameter: {
				if (!ts.isTypeParameterDeclaration(typeNode)) break;

				return this.getTypeParameter(typeNode, sourceFile);
			}

			case ts.SyntaxKind.ThisType: {
				if (!ts.isThisTypeNode(typeNode)) break;

				parameter
					.setKind(typeNode.kind)
					.setText(typeNode.getText(sourceFile));
				break;
			}
			case ts.SyntaxKind.ConstructorType: {
				// Example: new () => T
				if (!ts.isConstructorTypeNode(typeNode)) break;
				const meta = this.getMetaFromModifiers(typeNode.modifiers);
				const parameters = this.getParameters(typeNode.parameters, sourceFile);
				const typeParameters = this.getTypeParameters(
					typeNode.typeParameters ?? ts.factory.createNodeArray<ts.TypeParameterDeclaration>(),
					sourceFile,
				);

				parameter.setKind(typeNode.kind)
					.setMeta(meta)
					.setTypeParameters(typeParameters)
					.setParameters(parameters)
					.addType(this.getType(typeNode.type, sourceFile));

				if (typeNode.name) {
					parameter.setName(typeNode.name.getText(sourceFile));
				}

				break;
			}

			case ts.SyntaxKind.ConstructSignature: {
				// Example: `new (...astArgs: string[]): Function;`
				parameter.setKind(typeNode.kind);
				break;
			}

			case ts.SyntaxKind.FirstTypeNode: // Same as TypePredicate
			case ts.SyntaxKind.TypePredicate: {
				if (!ts.isTypePredicateNode(typeNode)) break;
				// Example: `value is S`
				parameter.setKind(typeNode.kind)
					.setName(typeNode.parameterName.getText(sourceFile));

				if (typeNode.type) {
					parameter.addType(this.getType(typeNode.type, sourceFile));
				}

				if (typeNode.assertsModifier !== undefined) {
					parameter.addMeta(ts.SyntaxKind.AssertsKeyword);
				}

				break;
			}
			case ts.SyntaxKind.TypeQuery: {
				if (!ts.isTypeQueryNode(typeNode)) break;
				// Example: `typeof globalThis`
				parameter.setKind(typeNode.kind)
					.setName(typeNode.exprName.getText(sourceFile));
				break;
			}

			case ts.SyntaxKind.TemplateLiteralType: {
				if (!ts.isTemplateLiteralTypeNode(typeNode)) break;
				// Example: `${number}`
				parameter.setKind(typeNode.kind)
					.setText(typeNode.getText(sourceFile));

				break;
			}

			case ts.SyntaxKind.ConditionalType: {
				// Example: `T extends (this: infer U, ...astArgs: never) => any ? U : unknown;`
				parameter.setKind(typeNode.kind)
					.setText(typeNode.getText(sourceFile));

				break;
			}

			default: {
				if (ts.isToken(typeNode)) {
					const token = ts.tokenToString(typeNode.kind);
					parameter.setKind(typeNode.kind).setText(token);
					// // Keyword
					// if (typeNode.kind >= 83 && typeNode.kind <= 165) {
					// 	parameter.setKind(typeNode.kind).setText(typeNode.getText(sourceFile));
					// 	break;
					// }

					// // Token
					// if (typeNode.kind >= 18 && typeNode.kind <= 79) {
					// 	parameter.setKind(typeNode.kind).setText(typeNode.getText(sourceFile));
					// 	break;
					// }
				}

				break;
			}
		}

		if (parameter.getKind() === undefined) {
			console.error(`visitType: Unhandled kind '${ts.SyntaxKind[typeNode.kind]}'`);
		}

		return parameter;
	}

	// MARK: MOD DECL

	/**
	 * Generate a module declaration.
	 *
	 * @example
	 * ```
	 * declare namespace Intl {
	 *     // ...
	 * }
	 * ```
	 *
	 * @todo Not handling the case where node.body is a NamespaceDeclaration
	 * @param node The module declaration to generate.
	 * @returns An array of generated module declarations.
	 */
	public readModuleDeclaration(node: ts.ModuleDeclaration, sourceFile: ts.SourceFile, globalPrefix = ''): Ast {
		const name = node.name.getText(sourceFile);
		const meta = this.getMetaFromModifiers(node.modifiers);
		const ast = new Ast(formatId(name, globalPrefix), formatName(name, globalPrefix), node.kind).setMeta(meta);

		if (node.body && ts.isModuleBlock(node.body)) {
			const statementAsts: Ast[] = [];
			node.body.forEachChild((statement: ts.Node) => {
				const statementAst = this.visitStatements(statement, sourceFile, name);
				if (statementAst) statementAsts.push(statementAst);
			});
			ast.setParameters(statementAsts);
		}

		return ast;
	}

	// MARK: IDX SIG DECL

	/**
	 * Gets an index signature declaration in the TypeScript AST and returns an Ast object representing the index signature.
	 * An IndexSignatureDeclaration is a set of parameters surrounded by brackets, followed by a type, e.g. `[A: B]: C`
	 *
	 * @example
	 * ```
	 * interface MyInterface {
	 *   [key: string]: number;
	 * }
	 * ```
	 *
	 * @param node The IndexSignatureDeclaration node to generate.
	 * @returns an Ast object representing the generated IndexSignatureDeclaration.
	 */
	public readIndexSignatureDeclaration(node: ts.IndexSignatureDeclaration, sourceFile: ts.SourceFile, _globalPrefix = ''): Ast {
		const id = this.getNextId();
		const ast = new Ast(id, id, node.kind).addType(this.visitType(node.type, sourceFile));
		for (const parameter of node.parameters) {
			ast.addParameter(this.visitType(parameter, sourceFile));
		}
		return ast;
	}

	// MARK: IFACE DECL

	/**
	 * Generates an interface declaration in the TypeScript AST and returns an Ast object representing the interface.
	 *
	 * @example
	 * ```
	 * interface MyInterface {
	 *   property1: string;
	 *   property2: number;
	 *   method1(): void;
	 *   method2(param: string): void;
	 * }
	 * ```
	 *
	 * @param node - The TypeScript AST node representing the interface declaration.
	 * @returns An Ast object representing the generated interface.
	 */
	public readInterfaceDeclaration(node: ts.InterfaceDeclaration, sourceFile: ts.SourceFile, globalPrefix = ''): Ast {
		const interfaceName = node.name.getText(sourceFile);
		const meta = this.getMetaFromModifiers(node.modifiers);
		const ast = new Ast(formatId(interfaceName, ''), formatName(interfaceName, ''), node.kind).setMeta(meta);
		const memberPrefix = this.getPrefixForInterfaceMembers(node, sourceFile, '') ?? '';

		for (const member of [...node.members]) {
			const memberAst = this.visitStatements(member, sourceFile, memberPrefix);
			if (memberAst && memberAst instanceof Ast) {
				if (memberAst.getName()) {
					if (globalPrefix) memberAst.changePrefix(interfaceName, globalPrefix);
					this.saveGlobal(memberAst);
				}
				ast.addParameter(memberAst);
			}
		}

		// Done parsing interface. Begin extending Object.
		let hasObjectHeritage = interfaceName === 'Object' || interfaceName === 'ObjectConstructor';

		if (node.heritageClauses) {
			for (const heritageClause of node.heritageClauses) {
				const heritageAst = this.visitStatements(heritageClause, sourceFile, ast.getName());
				const heritageName = heritageAst?.getName();
				if (heritageName === 'Object') hasObjectHeritage = true;
				if (heritageAst) ast.addType(heritageAst);
			}
		}

		if (hasObjectHeritage === false) {
			const cachedObject = this.cache.statementsCache.get('Object');
			if (cachedObject) {
				for (const [fileName, statementNode] of cachedObject) {
					const statementSourceFile = this.program.getSourceFile(fileName);
					if (statementSourceFile) {
						const statement = this.visitStatements(statementNode, statementSourceFile, ast.getName());
						if (statement) {
							statement?.changePrefix('Object', globalPrefix);
						}
					}
				}
			}
		}

		return ast;
	}

	// MARK: HERITAGE
	/**
	 * Generates a heritage clause in a TypeScript interface or class declaration.
	 * A heritage clause specifies the interfaces or classes that the current interface or class extends or implements.
	 *
	 * @example
	 * ```
	 * interface MyInterface extends MyBaseInterface, MyOtherInterface {
	 *   // ...
	 * }
	 * ```
	 *
	 * @param node - The TypeScript AST node representing the heritage clause.
	 * @param globalPrefix - The prefix to use for the generated Ast object.
	 * @returns An Ast object representing the generated heritage clause.
	 */
	public readHeritage(node: ts.HeritageClause, sourceFile: ts.SourceFile, globalPrefix: string): Ast {
		const ast = new Ast(globalPrefix, globalPrefix, node.kind);
		const nodeTypes = [...node.types];

		for (const extendsType of nodeTypes) {
			const extendsName = extendsType.expression.getText(sourceFile);
			const extendedNodes = this.cache.statementsCache.get(extendsName) ?? [];

			for (const [fileName, extendedNode] of extendedNodes) {
				const statementSourceFile = this.program.getSourceFile(fileName);
				if (statementSourceFile) {
					const statement = this.visitStatements(extendedNode, statementSourceFile, globalPrefix);
					if (statement?.getParameters()) {
						for (const parameter of statement.getParameters()) {
							parameter.changePrefix(extendsName, globalPrefix);
							parameter.setDebug(
								`/* TODO: Fix double def, kind: "${ast.getKindName()}", memberKind: "${parameter.getKindName()}", fn: "readHeritage", id: "${parameter.getId()}", name: "${parameter.getName()}" */`,
							);
							// parameter.setCode(`(def ${parameter.getId()} ${parameter.getCode()})`);
							parameter.setCode(`
	ns.set(new types.SymbolNode('${parameter.getId()}'), new types.FunctionNode((...astArgs: types.AstNode[]) => {
		${parameter.getCode()}
	}));
`);
							this.saveGlobal(parameter);
						}
					}
				}
			}
		}

		return ast;
	}

	// MARK: CALL SIG DECL

	/**
	 * Generates a call signature declaration in the TypeScript AST and returns an Ast object representing the call signature.
	 * A call signature declaration is a function signature that can be used as a type.
	 *
	 * @example
	 * ```
	 * interface MyInterface {
	 *   method(param: string): void; // <--
	 * }
	 *
	 * @param node - The TypeScript AST node representing the call signature declaration.
	 * @param globalPrefix - The prefix to use for the generated Ast object.
	 * @returns An Ast object representing the generated call signature.
	 */
	public readCallSignatureDeclaration(node: ts.CallSignatureDeclaration, sourceFile: ts.SourceFile, globalPrefix: string): Ast | undefined {
		if (!globalPrefix) {
			return;
		}

		const parameters = this.getParameters(node.parameters, sourceFile);
		const typeParameters = this.getTypeParameters(node.typeParameters ?? ts.factory.createNodeArray<ts.TypeParameterDeclaration>(), sourceFile);
		const ast = new Ast(globalPrefix, globalPrefix, node.kind).setParameters(parameters).setTypeParameters(typeParameters);

		if (node.type) ast.addType(this.getType(node.type, sourceFile));

		// GlobalObject constructors can receive a "value" argument
		parameters.unshift(new Ast('value', 'value', ts.SyntaxKind.Identifier));
		return ast;
	}

	// MARK: CTOR SIG DECL

	/**
	 * Generates a construct signature declaration in the TypeScript AST and returns an Ast object representing the construct signature.
	 * A construct signature declaration is a special type of function signature declaration that is used to define the constructor of a class.
	 *
	 * @example The `constructor` method is a construct signature declaration
	 * ```
	 * class Foo {
	 *   constructor(a: string, b: number) {}
	 * }
	 * ```
	 *
	 * @param node - The TypeScript AST node representing the construct signature declaration.
	 * @param globalPrefix - The prefix to use for the generated Ast object.
	 * @returns An Ast object representing the generated construct signature.
	 */
	public readConstructSignatureDeclaration(node: ts.ConstructSignatureDeclaration, sourceFile: ts.SourceFile, globalPrefix: string): Ast {
		if (!globalPrefix) {
			throw new TypeError('readConstructSignatureDeclaration requires a globalPrefix');
		}

		const bindingName = `${globalPrefix}.new`;
		const parameters = this.getParameters(node.parameters, sourceFile);
		const typeParameters = this.getTypeParameters(node.typeParameters ?? ts.factory.createNodeArray<ts.TypeParameterDeclaration>(), sourceFile);
		const ast = new Ast(bindingName, bindingName, node.kind).setParameters(parameters).setTypeParameters(typeParameters);

		if (node.type) ast.addType(this.getType(node.type, sourceFile));
		return ast;
	}

	// MARK: METHOD SIG.

	/**
	 * Generates a method signature declaration in the TypeScript AST and returns an Ast object representing the method signature.
	 * A method signature declaration is a function signature that is part of an object type.
	 *
	 * @example
	 * ```
	 * interface MyInterface {
	 *   myMethod(param1: string, param2: number): void;
	 * }
	 * ```
	 *
	 * @param node - The TypeScript AST node representing the method signature declaration.
	 * @param globalPrefix - The prefix to use for the generated Ast object.
	 * @returns An Ast object representing the generated method signature, or undefined if the method name is not valid.
	 */
	public readMethodSignature(node: ts.MethodSignature, sourceFile: ts.SourceFile, globalPrefix: string): Ast | undefined {
		const methodName = node.name.getText(sourceFile);
		if (!methodName) return;

		const id = methodName;
		const bindingName = methodName;
		const parameters = this.getParameters(node.parameters, sourceFile);
		const typeParameters = this.getTypeParameters(node.typeParameters ?? ts.factory.createNodeArray<ts.TypeParameterDeclaration>(), sourceFile);
		const ast = new Ast(formatId(id, globalPrefix), formatName(bindingName, globalPrefix), node.kind).setParameters(parameters).setTypeParameters(
			typeParameters,
		);

		if (node.type) ast.addType(this.getType(node.type, sourceFile));

		const baseType = globalPrefix ? globalPrefix.split('.')[0] : `typeof ${ast.getName()}`;
		if (globalPrefix) parameters.unshift(new Ast('ctx', 'ctx', ts.SyntaxKind.Identifier).setText(baseType)); // WAS .addType(new Ast().text(baseType))

		return ast;
	}

	/**
	 * MARK: FN DECL.
	 *
	 * Generates a function declaration in the TypeScript AST and returns an Ast object representing the function.
	 * If the function is in the declarations or if it has a global prefix, it is a global and should be added to the global object.
	 *
	 * @example
	 * ```
	 * function foo(x: number, y: string): void {
	 *   // ...
	 * }
	 * ```
	 * @param node - The TypeScript AST node representing the function declaration.
	 * @param globalPrefix - The name of a global object that this function belongs to (which makes this a global)
	 * @returns An Ast object representing the generated function, or undefined if the function name is not valid.
	 */
	public readFunctionDeclaration(
		node: ts.FunctionDeclaration,
		sourceFile: ts.SourceFile,
		globalPrefix = '',
	): Ast | undefined {
		if (!node.name) return;

		const functionName = node.name.getText(sourceFile);
		const name = formatName(functionName, globalPrefix);
		const hasName = name && this.cache.variableNameToTypeMap.has(name);
		const hasPrefix = globalPrefix !== '';

		if (hasName || hasPrefix) {
			const parameters = this.getParameters(node.parameters, sourceFile);
			const typeParameters = this.getTypeParameters(node.typeParameters ?? ts.factory.createNodeArray<ts.TypeParameterDeclaration>(), sourceFile);
			const ast = new Ast(formatId(functionName, globalPrefix), name, node.kind).setParameters(parameters).setTypeParameters(typeParameters).setMeta(
				this.getMetaFromModifiers(node.modifiers),
			);
			if (node.type) ast.addType(this.getType(node.type, sourceFile));

			this.saveGlobal(ast);
			return ast;
		}
	}

	// MARK: PROP SIG.

	/**
	 * Generates a property signature from the TypeScript AST and returns an Ast object representing the property.
	 * A property signature is a property declaration that is part of an object type.
	 *
	 * @example Typescript Property Signature
	 * ```
	 * interface MyInterface {
	 *   myProperty: string; // <-- Propety Signature
	 * }
	 * ```
	 *
	 * @example Ensemble transformation
	 * ```clj
	 * (def MyInterface.myProperty () (Map.get (global MyInterface) :myProperty))
	 * ```
	 *
	 * @todo Determine whether to filter invalid characters
	 * Should allow:
	 * - Brackets: [Symbol.species],
	 * - Quoted strings: "'prototype'",
	 * - Underscores: Math.SQRT_2
	 *
	 * @param node - The TypeScript AST node representing the property signature.
	 * @param prefix - The prefix to use for the property name.
	 * @returns An Ast object representing the generated property, or undefined if the property name is not valid.
	 */
	public readPropertySignature(node: ts.PropertySignature, sourceFile: ts.SourceFile, globalPrefix: string): Ast | undefined {
		if ((node.getFullText(sourceFile)).includes('@deprecated')) return;

		const propertyName = node.name.getText(sourceFile);
		if (!this.isValidVariableName(propertyName)) return;

		const id = formatId(propertyName, globalPrefix);
		const name = formatName(propertyName, globalPrefix);
		const ast = new Ast(id, name, node.kind).setMeta(this.getMetaFromModifiers(node.modifiers));

		if (node.type) ast.addType(this.getType(node.type, sourceFile));

		return ast;
	}

	// MARK: TYPE ALIAS DECL.

	/**
	 * Generates a TypeScript type alias declaration and returns an Ast object representing it.
	 *
	 * @example
	 * ```typescript
	 * declare type PropertyKey = string | number | symbol;
	 * ```
	 *
	 * @param node - The TypeScript AST node representing the type alias declaration.
	 * @returns An Ast object representing the generated type alias.
	 */
	public readTypeAliasDeclaration(node: ts.TypeAliasDeclaration, sourceFile: ts.SourceFile): Ast[] | undefined {
		const type = this.getType(node.type, sourceFile);
		return type?.getType();
	}

	/**
	 * MARK: VAR DECL.
	 *
	 * Generates a variable declaration from the TypeScript AST and returns an Ast object representing the variable.
	 *
	 * @example `NaN: number` is variable declaration
	 * ```
	 * declare var NaN: number;
	 * ```
	 *
	 * @param node - The TypeScript AST node representing the variable declaration.
	 * @returns An Ast object representing the generated variable.
	 */
	public readVariableDeclaration(node: ts.VariableDeclaration, sourceFile: ts.SourceFile, globalPrefix = ''): Ast {
		const variableName = node.name.getText(sourceFile);

		const name = formatName(variableName, globalPrefix);
		const id = formatId(variableName, globalPrefix);
		const ast = new Ast(id, name, node.kind);

		if (node.type) ast.addType(this.getType(node.type, sourceFile));

		this.saveGlobal(ast);
		return ast;
	}

	// MARK: VAR STMT.

	/**
	 * Generates a variable statement from the TypeScript AST and processes the variable declarations within it.
	 *
	 * @example
	 * ```
	 * declare var NaN: number;
	 * ```
	 *
	 * @param node - The variable statement node to generate.
	 */
	public readVariableStatement(node: ts.VariableStatement, sourceFile: ts.SourceFile, globalPrefix = ''): Ast {
		const parameters: Ast[] = [];
		const declarationIds: string[] = [];
		node.declarationList.declarations.forEach((declaration) => {
			const declarationAst = this.readVariableDeclaration(declaration, sourceFile, globalPrefix);
			parameters.push(declarationAst);
			declarationIds.push(declarationAst.getId());
		});

		const id = this.getNextId();
		const ast = new Ast(id, id, node.kind).setMeta(this.getMetaFromModifiers(node.modifiers));
		return ast;
	}

	// MARK: HELPER FNS

	/**
	 * Extracts a set of modifiers from the provided TypeScript modifier array and converts them to an array of metadata values.
	 *
	 * @param modifiers - The array of TypeScript modifier nodes to extract metadata from.
	 * @returns An array of metadata values extracted from the provided modifiers.
	 */
	public getMetaFromModifiers(modifiers: ts.NodeArray<ts.ModifierLike> | undefined): Meta[] {
		if (!modifiers) return [];
		const meta = new Set<Meta>();
		for (const modifier of modifiers) {
			if (isValidMeta(modifier.kind)) {
				meta.add(modifier.kind);
			}
		}
		return [...meta];
	}

	/**
	 * Resolves the type parameters of a TypeScript type parameter declaration.
	 *
	 * @param typeParameters - The TypeScript type parameter declarations to resolve.
	 * @param syntaxKind - The name of the calling function (if any).
	 * @returns An array of `ParameterBuilder` objects representing the resolved type parameters.
	 */
	public getTypeParameters(
		typeParameters: ts.NodeArray<ts.TypeParameterDeclaration>,
		sourceFile: ts.SourceFile,
	): Ast[] {
		const parameters: Ast[] = [];
		if (!typeParameters) return parameters;

		for (const typeParameter of typeParameters) {
			const parameter = this.getTypeParameter(typeParameter, sourceFile);
			parameters.push(parameter);
		}
		return parameters;
	}

	/**
	 * Resolves a single TypeScript type parameter declaration.
	 *
	 * @param typeParameter - The TypeScript type parameter declaration to resolve.
	 * @param sourceFile - The source file containing the type parameter declaration.
	 * @returns A `ParameterBuilder` object representing the resolved type parameter.
	 */
	public getTypeParameter(
		typeParameter: ts.TypeParameterDeclaration,
		sourceFile: ts.SourceFile,
		globalPrefix = '',
	): Ast {
		const name = typeParameter.name.getText(sourceFile);
		const ast = new Ast(formatId(name, globalPrefix), formatName(name, globalPrefix), typeParameter.kind);

		if (typeParameter.constraint) {
			ast.addMeta(ts.SyntaxKind.ExtendsKeyword);
			const type = this.visitType(typeParameter.constraint, sourceFile);
			ast.addType(type);
		}

		return ast;
	}

	/**
	 * Resolves the type of a TypeScript type node, handling various cases such as tokens, union types, and qualified names.
	 *
	 * @param nodeParameters - The TypeScript type node to resolve.
	 * @param sourceFile - The source file containing the type node.
	 * @returns An array of strings representing the resolved type names.
	 */
	public getParameters(nodeParameters: ts.NodeArray<ts.ParameterDeclaration>, sourceFile: ts.SourceFile): Ast[] {
		if (!nodeParameters) return [];

		const parameters: Ast[] = [];
		for (const nodeParameter of nodeParameters) {
			const parameter = this.getParameter(nodeParameter, sourceFile);
			parameters.push(parameter);
		}
		return parameters;
	}

	/**
	 * Resolves the type of a TypeScript type node and returns an AST representing the resolved type.
	 *
	 * @param typeNode - The TypeScript type node to resolve.
	 * @returns A `ParameterBuilder` object representing the resolved type, or `undefined` if `nodeType` is `undefined`.
	 */
	public getType(typeNode: ts.TypeNode, sourceFile: ts.SourceFile): Ast | undefined {
		return this.visitType(typeNode, sourceFile);
	}

	/**
	 * Resolves a single TypeScript parameter declaration
	 *
	 * @param nodeParameter - The TypeScript parameter declaration to resolve.
	 * @param callee - The name of the calling function (if any).
	 * @returns A `ParameterBuilder` object representing the resolved parameter.
	 */
	public getParameter(nodeParameter: ts.ParameterDeclaration, sourceFile: ts.SourceFile) {
		const name = nodeParameter.name.getText(sourceFile);
		const parameter = new Ast(name, name, nodeParameter.kind);

		if (nodeParameter.questionToken !== undefined) {
			parameter.addMeta(ts.SyntaxKind.QuestionToken);
		}

		if (nodeParameter.dotDotDotToken !== undefined) {
			parameter.addMeta(ts.SyntaxKind.DotDotDotToken);
		}

		if (nodeParameter.type) {
			const childParameter = this.visitType(nodeParameter.type, sourceFile);
			parameter.addType(childParameter);
		}

		return parameter;
	}

	/**
	 * Gets the prefix for the members of an interface.
	 *
	 * If the interface has a constructor signature declaration, the prefix is the interface name.
	 * If the interface name is a declared variable and the variable type matches the interface name, the prefix is the interface name.
	 * Otherwise, the prefix is `{interfaceName}.prototype`.
	 *
	 * @param node - The interface declaration to get the prefix for.
	 * @param sourceFile - The source file containing the interface declaration.
	 * @param _globalPrefix - An optional global prefix (not used in this implementation).
	 * @returns The prefix for the members of the interface.
	 */
	public getPrefixForInterfaceMembers(node: ts.InterfaceDeclaration, sourceFile: ts.SourceFile, _globalPrefix = ''): string | undefined {
		const interfaceName = node.name.getText(sourceFile);

		if (!this.isValidVariableName(interfaceName)) return;

		const hasConstructSignatureDeclaration = this.cache.constructors.has(interfaceName);
		const isInterfaceNameADeclaredVariable = this.cache.variableNameToTypeMap.has(interfaceName);
		const interfaceTypeForDeclaredVariable = this.cache.variableNameToTypeMap.get(interfaceName);

		// If this is a constructor interface, get the declared interface
		if (hasConstructSignatureDeclaration) {
			return this.cache.variableTypeToNameMap.get(interfaceName) ?? '';
		} else if (isInterfaceNameADeclaredVariable && interfaceTypeForDeclaredVariable === interfaceName) {
			return interfaceName;
		} else {
			return `${interfaceName}.prototype`;
		}
	}

	/**
	 * Check if an interface has a ConstructSignatureDeclaration
	 *
	 * @param interfaceDeclaration - The interface declaration to check
	 */
	public hasConstructSignatureDeclaration(interfaceDeclaration: ts.InterfaceDeclaration) {
		return interfaceDeclaration.members.some((member) => ts.isConstructSignatureDeclaration(member));
	}

	/**
	 * Checks if the provided string is a valid variable name.
	 *
	 * A valid variable name must start with a letter, underscore, or dollar sign, and can contain only letters, digits, underscores, and dollar signs.
	 *
	 * @param name - The string to check for a valid variable name.
	 * @returns `true` if the provided name is a valid variable name, `false` otherwise.
	 */
	private isValidVariableName(name: string): boolean {
		return this.validVariableRegEx.test(name);
	}

	private getNextId() {
		this.idCount++;
		return this.idCount.toString();
	}
}
