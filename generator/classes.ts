/* eslint-disable max-len */
/**
 * @file Generates Ast nodes.
 */
const { exit } = Deno;

type ClassProperties = {
	baseClass?: string;
	classGeneric?: string;
	className: string;
	extraParameters?: Array<{
		classParameter: string;
		factoryParameter?: string;
	}>;
	helperGeneric?: string;
	jsDoc?: string[];
	methods?: string[];
	parentBuilder?: ClassDefinitionBuilder;
	staticMethods?: string[];
	subClasses: ClassDefinitionBuilder[];
	supportingTypes?: string[];
	valueDefault?: string;
	valueType: string;
};

type SerializedClassProperties =
	& Omit<
		ClassProperties,
		'subClasses' | 'parentBuidler'
	>
	& {
		subClasses: SerializedClassProperties[];
	};

class GenerateAst {
	generate(baseClass: SerializedClassProperties): void {
		const ast = this.generateAst(baseClass);
		console.log(ast);
	}

	private generateAst(baseClass: SerializedClassProperties): string {
		const header = `
			import { Env } from './env.ts';

			/**
			 * NOTE: This class was automatically generated. To regenerate
			 * it, edit generate_ast.ts and run "deno run generate_ast.ts".
			 * @see https://craftinginterpreters.com/representing-code.html
			 */
			
			/**
			 * Options for the Error class
			 */
			export type ErrorOptions = {
				message?: string;
				actual?: unknown;
				expected?: unknown;
				operator?: string;
			};			

			/**
			 * Used to throw errors that occur during runtime.
			 * @param options extra detail for user-friendly, formatted messages
			 */
			export class Error extends Error {
				operator?: string;
				expected?: unknown;
				actual?: unknown;
			
				constructor(options: ErrorOptions) {
					super(options.message);
					this.operator = options?.operator;
					this.expected = options?.expected;
					this.name = 'Error';
				}
			}

			export type DictKeys = Key | Str | Sym;
			`;

		const out: string = [
			header,
			this.generateBaseClass(baseClass),
			this.generateConcreteVisitors(baseClass),
		].join('\n');

		return out;
	}

	/**
	 * Generates an abstract class that all visitors extend.
	 * @param baseClass - The class definition passed into the constructor.
	 * @returns Stringified code for an abstract class.
	 * @example this.generateBaseClass(baseClass);
	 */
	private generateBaseClass(baseClass: SerializedClassProperties): string {
		const { className, valueType, subClasses } = baseClass;
		const typeGuards = this.generateTypeGuards(className);
		const classList = [baseClass, ...subClasses]
			.map(({ className }) => className)
			.join(', ');

		return `
		    /**
			 * \`${className}\` abstract class
			 * An abstract class that enforces a common parameter, \`value\`.
			 * @virtual value the core data that a sub-class represents
			 * @description The following classes extend this class:
			 * ${classList}
			 */
			export abstract class ${className} {
				${typeGuards}

				abstract value: ${valueType};
				abstract line: number;
				abstract column: number;
			}			
    `;
	}

	/**
	 * Generates concrete visitors for each var.
	 * @param baseClass - The class definition passed into the constructor.
	 * @returns A string representation of the class (code).
	 * @example this.generateConcreateVisitors(baseClass);
	 */
	private generateConcreteVisitors(
		baseClass: SerializedClassProperties,
	): string {
		const baseName = baseClass.className;
		return baseClass.subClasses
			.map((subClass) => {
				const { className, valueType, extraParameters, jsDoc } = subClass;

				const classGeneric = subClass.classGeneric ?? '';
				const typeGuardType = subClass.helperGeneric ?? '';

				// Complete custom types that are used in type defintions for
				// the class or helper functions.
				const supportTypes = subClass.supportingTypes ? subClass.supportingTypes.join('\n') + '\n' : '';

				// Assign a default to the value parameter
				const valueDefault = subClass.valueDefault ? ` = ${subClass.valueDefault}` : '';

				// Generate parameters for the class constructor
				const classParameters = [
					`public value: ${valueType}${valueDefault}`,
					...(extraParameters ?? []).map(
						(parameter) => `public ${parameter.classParameter}`,
					),
				];

				const methods = subClass.methods?.join('\n');
				const staticMethods = subClass.staticMethods?.join('\n');

				// Generate parameters for the factory function with types
				const factoryFunctionParameters = [
					`value: ${valueType}${valueDefault}`,
					...(extraParameters ?? [])
						.filter((p) => p.classParameter)
						.map((p) => `${p.classParameter}`),
				];

				// Generate parameters for instantiation of the class w/o types
				const factoryClassParameters = [
					'value',
					...(extraParameters ?? [])
						.filter((p) => p.factoryParameter)
						.map((p) => `${p.factoryParameter}`),
				];

				const jsDocComments = [
					'/**',
					` * ${className} class`,
					' * A data class which represents a part of the AST',
				];
				if (jsDoc) {
					for (const d of jsDoc) {
						jsDocComments.push(d);
					}
				}

				jsDocComments.push(
					' * @param value The data that this class represents',
					' */',
				);

				return `${supportTypes}
				
					${jsDocComments.join('\n')}
					export class ${className}${classGeneric} extends ${baseName} {
						public line: number;
						public column: number;

						/**
						 * \`create\` factory function
						 * Instantiates a new ${className} without "new"
						 * @param value The data that the ${className} class represents
						 * @returns an instance of ${className}
						 */
						static create${classGeneric}(
							${factoryFunctionParameters.join(', ')}
						): ${className}${typeGuardType} {
							return new ${className}(${factoryClassParameters.join(', ')});
						}
						${
					this.generateTypeGuards(
						className,
						typeGuardType,
						classGeneric,
					)
				}
						${staticMethods ? '\n' + staticMethods : ''}

						constructor(${classParameters.join(', ')}) {
							super();
							this.line = 0;
							this.column = 0;
						}${methods ? '\n' + methods : ''}
												
					}			
				`;
			})
			.join('\n');
	}

	/**
	 * Generates type guard and assertion functions for the clas.
	 * @param className - The name of the class.
	 * @param typeGuardType - The TypeScript Type of for the guard.
	 * @param functionGeneric - A Generic for the function.
	 * @returns A string of code that contains the type guards and assertions.
	 * @example this.generateTypeGuards('Foo', 'Foo', 'T')
	 */
	private generateTypeGuards(
		className: string,
		typeGuardType = '',
		functionGeneric = '',
	): string {
		return `				
			/**
			 * \`isInstanceOf\` type guard
			 * Checks if value is an instance of ${className}
			 * @param value the value to check
			 * @returns a boolean check and a guaranteed type within a scope
			 */
			static isInstanceOf${functionGeneric}(
				value: unknown
			): value is ${className}${typeGuardType} {
				return value instanceof ${className};
			}
			
			/**
			 * \`assertInstanceOf\` type assertion
			 * Asserts that value is an instance of ${className}
			 * @param value the value to assert
			 * @param options error options for helpful formatted errors
			 * @returns a guaranteed type within a scope
			 * @throws Error if value is not an instance of ${className}
			 */
			static assertInstanceOf${functionGeneric}(
				value: unknown, options: ErrorOptions
			): asserts value is ${className}${typeGuardType} {
				if (!(value instanceof ${className})) {
					const defaultOptions = {
						message: 'Invalid value',
						expected: '${className}',
						actual: JSON.stringify(value),
					};
					const mergedOptions = {...defaultOptions, ...options};
					throw new Error(mergedOptions);
				}						
			}			
		`;
	}
}

class ClassDefinitionBuilder {
	protected readonly classProperties: ClassProperties;

	constructor(
		className: string,
		valueType: string,
		parentBuilder?: ClassDefinitionBuilder,
	) {
		this.classProperties = {
			baseClass: parentBuilder?.classProperties.className,
			classGeneric: undefined,
			className,
			extraParameters: [],
			jsDoc: [],
			methods: [],
			parentBuilder,
			staticMethods: [],
			subClasses: [],
			supportingTypes: [],
			valueDefault: undefined,
			valueType,
		};
	}

	setClassGeneric(classGeneric: string, helperGeneric?: string): this {
		this.classProperties.classGeneric = classGeneric;
		this.classProperties.helperGeneric = helperGeneric;
		return this;
	}

	addJsDoc(comment: string): this {
		this.classProperties.jsDoc?.push(comment);
		return this;
	}

	addMethod(method: string): this {
		this.classProperties.methods?.push(method);
		return this;
	}

	addStaticMethod(method: string): this {
		this.classProperties.staticMethods?.push(method);
		return this;
	}

	setValueDefault(valueDefault: string): this {
		this.classProperties.valueDefault = valueDefault;
		return this;
	}

	addExtraParameter(classParameter: string, factoryParameter?: string): this {
		this.classProperties.extraParameters?.push({
			classParameter,
			factoryParameter,
		});
		return this;
	}

	addSupportingType(supportType: string): this {
		this.classProperties.supportingTypes?.push(supportType);
		return this;
	}

	addSubClass(className: string, valueType: string): ClassDefinitionBuilder {
		const subClass = new ClassDefinitionBuilder(className, valueType, this);
		this.classProperties.subClasses.push(subClass);
		return subClass;
	}

	endSubClass(): ClassDefinitionBuilder {
		return this.classProperties.parentBuilder ?? this;
	}

	build(): SerializedClassProperties {
		const {
			baseClass,
			classGeneric,
			className,
			extraParameters,
			helperGeneric,
			jsDoc,
			methods,
			staticMethods,
			subClasses,
			supportingTypes,
			valueDefault,
			valueType,
		} = this.classProperties;

		return Object.freeze({
			baseClass,
			classGeneric,
			className,
			extraParameters,
			helperGeneric,
			jsDoc,
			methods,
			staticMethods,
			subClasses: subClasses.map((s) => s.build()),
			supportingTypes,
			valueDefault,
			valueType,
		});
	}
}

/**
 * The main function for the script.
 * @example main()
 */
function main(): void {
	try {
		const generator = new GenerateAst();
		const defs = new ClassDefinitionBuilder('Ast', 'unknown');

		defs.addSubClass('Sym', 'string');
		defs.addSubClass('List', 'Ast[]').addExtraParameter(
			'metadata: Ast = types.makeNil()',
			'metadata',
		);
		defs.addSubClass('Vec', 'Ast[]').addExtraParameter(
			'metadata: Ast = types.makeNil()',
			'metadata',
		);
		defs.addSubClass('Atom', 'Ast');
		defs.addSubClass('Bool', 'boolean');
		defs.addSubClass('Dict', 'Map<string, Ast>')
			.setValueDefault('new Map<string, Ast>()')
			.addExtraParameter('metadata: Ast = types.makeNil()', 'metadata')
			.addJsDoc(
				`* @description The Dict class is a wrapper around Map. It converts DictKeys
				 * to strings for storage. This means that internally Key is stored as :key,
				 * Str is stored as "str" and Sym is stored as sym. This seems unnecessary
				 * if the reader kept the quotes, but the codebase would have to be updated.`,
			);
		defs.addSubClass('Err', 'Ast');
		defs.addSubClass('Func', 'Closure')
			.addExtraParameter('closureMeta?: ClosureMeta', 'closureMeta')
			.addExtraParameter('isMacro = false', 'isMacro')
			.addExtraParameter('metadata: Ast = types.makeNil()', 'metadata')
			.addSupportingType('export type Closure = (...args: Ast[]) => Ast;')
			.addSupportingType(
				`export type ClosureMeta = {
					ast: Ast;
					env: Env;
					parameters: Sym[];
				};`,
			);
		defs.addSubClass('Key', 'string');
		defs.addSubClass('Nil', 'unknown').setValueDefault('null');
		defs.addSubClass('Num', 'number');
		defs.addSubClass('Str', 'string');

		// Web extensions
		defs.addSubClass('DomNode', 'Map<string, Ast>')
			.setValueDefault('new Map<string, Ast>()')
			.addExtraParameter('metadata: Ast = types.makeNil()', 'metadata');
		// .addExtraParameter('element: Element = null', 'element');

		generator.generate(defs.build());
	} catch (error) {
		console.log(error);
		exit(1);
	}
}

if (import.meta.main) {
	main();
}
