import ts from 'npm:typescript@5.5.3';
import type { Meta } from './types.ts';
import { isValidMeta } from './utils.ts';

export type SerializedAst = {
  kind: string;
  id: string;
  name: string;
  type: SerializedAst[]; // WAS: ?: string | SerializedAst | (string | SerializedAst)[];
  params: SerializedAst[]; // WAS: ?: SerializedAst | SerializedAst[];
  typeParams: SerializedAst[]; // WAS: ?: SerializedAst | SerializedAst[];
  text: string; // WAS: ?: string;
  meta: ('optional' | 'rest')[]; // WAS: ?: string;
};

/**
 * A builder class for constructing a serialized ast.
 */
export class Ast {
  /**
   * The id of the object. This is used to uniquely identify the object.
   * Prefixing it with an ~ lets us know not to add it to the globals (there are no global values that start with ~)
   * @todo Determin if both id and name should be used as they are often the same.
   */
  private id: string = '';

  /**
   * The kind of the object. This is used to determine the type of the object. This is a simplied version of the TypeScript API's `SyntaxKinds`
   */
  private kind: ts.SyntaxKind;

  /**
   * Meta information about the object, as boolean flags (if present it's true, absent is false) This includes
   * metadata about the object such as whether it is a declaration, extends another object, or is read-only. This is a list of the available types:
   */
  private meta: Set<Meta> = new Set();

  /**
   * The name of the objects and properties such as `String`, `ArrayConstructor`, and `encodeURI`.
   */
  private name: string;

  /**
   * @todo change name to `children` or `members`
   * An array of `Ast` objects that represent function/method parameters, OR members of an object.
   */
  private parameters: Ast[] = [];

  /**
   * Actual text of a language-defined keyword or token value, such as `string`, `await`.
   */
  private text?: string;

  /**
   * An array of `Ast` objects that represent the type(s) of an object, property, function return, etc.
   */
  private type: Ast[] = [];

  /**
   * An array of `Ast` objects that represent the type parameters of a generic type like `T`, `U`, etc.
   */
  private typeParameters: Ast[] = [];

  constructor(id: string, name: string, kind: number) {
    if (!id) throw new TypeError('Ast requires an id');
    if (!name) throw new TypeError('Ast requires a name');
    if (!kind) throw new TypeError('Ast requires a kind');

    this.id = id;
    this.name = name;
    this.kind = kind;
  }

  public serialize() {
    const obj: SerializedAst = {
      id: this.id,
      kind: this.getKindName(),
      meta: [],
      name: this.name, // WAS: if id !== name
      params: [],
      text: '',
      type: [],
      typeParams: [],
    };

    if (this.type.length) {
      const type = this.type.map((p) => {
        // NOCOMPRESS: if (!p.id && !p.type.length && !p.typeParameters.length && !p.parameters.length && p.text) return p.text;
        return p.serialize();
      });

      // NOCOMPRESS: obj.type = (type.length === 1) ? type[0] : type;
      obj.type = type;
    } else {
      obj.type = [];
    }

    if (this.parameters.length) {
      const params = this.parameters.map((p) => p.serialize());
      // NOCOMPRESS: obj.params = (params.length === 1) ? params[0] : params;
      obj.params = params;
    } else {
      obj.params = [];
    }

    if (this.typeParameters.length) {
      const typeParams = this.typeParameters.map((p) => p.serialize());
      // NOCOMPRESS: obj.typeParams = (typeParams.length === 1) ? typeParams[0] : typeParams;
      obj.typeParams = typeParams;
    } else {
      obj.typeParams = [];
    }

    if (this.meta.size) {
      const restArgs = this.meta.has(ts.SyntaxKind.DotDotDotToken);
      const optional = this.meta.has(ts.SyntaxKind.QuestionToken);
      if (restArgs || optional) {
        const meta = [];
        if (restArgs) meta.push('rest');
        if (optional) meta.push('optional');
        // obj.meta = meta.join(' ');
      } else {
        obj.meta = [];
      }
    }

    obj.text = this.text ?? '';
    return obj;
  }

  /**
   * Changes the prefix of an Ast object's name and ID.
   *
   * @param fromOldPrefix - The old prefix to replace.
   * @param toNewPrefix - The new prefix to use.
   */
  public changePrefix(fromOldPrefix: string, toNewPrefix: string): void {
    if (!fromOldPrefix || !toNewPrefix) return;

    if (this.name && this.name.startsWith(fromOldPrefix)) {
      this.name = this.name.replaceAll(fromOldPrefix, toNewPrefix);
    }

    if (this.id.startsWith(fromOldPrefix)) {
      const newId = this.id.replaceAll(fromOldPrefix, toNewPrefix);
      this.id = newId;
    }
  }

  /**
   * Sets the unique identifier for this object.
   * @param id The new identifier for this object.
   * @returns A reference to this object for method chaining.
   */
  public setId(id?: string): this {
    if (id) {
      this.id = id;
    }
    return this;
  }

  public getId(): string {
    return this.id;
  }

  /**
   * Sets the kind of the Ast instance.
   * @param kind The new kind to set for this Ast.
   * @returns A reference to this Ast instance for method chaining.
   */
  public setKind(kind: number) {
    if (typeof kind === 'number') {
      this.kind = kind;
    }
    return this;
  }

  /**
   * Gets the kind of the Ast instance.
   * @returns The kind of the Ast instance.
   */
  public getKind() {
    return this.kind;
  }

  public getKindName() {
    switch (ts.SyntaxKind[this.kind ?? 0]) {
      case 'FirstAssignment':
        return 'EqualsToken'; // 64
      case 'LastPunctuation':
      case 'LastAssignment':
      case 'LastCompoundAssignment':
      case 'LastBinaryOperator':
        return 'CaretEqualsToken'; // 79
      case 'LastToken':
      case 'LastKeyword':
      case 'FirstCompoundAssignment':
        return 'PlusEqualsToken'; // 65
      case 'FirstKeyword':
      case 'FirstReservedWord':
        return 'BreakKeyword'; // 83
      case 'LastReservedWord':
      case 'LastTemplateToken':
        return 'TemplateTail'; // 18
      case 'FirstPunctuation':
      case 'FirstFutureReservedWord':
        return 'OpenBraceToken'; // 19
      case 'FirstJSDocTagNode':
      case 'LastFutureReservedWord':
        return 'SemicolonToken'; // 27
      case 'FirstTypeNode':
        return 'FirstTypeNode'; // 82
      case 'LastTypeNode':
        return 'WhitespaceTrivia'; // 05
      case 'FirstToken':
        return 'Unknown'; // 0
      case 'FirstTriviaToken':
        return 'SingleLineCommentTrivia'; // 2
      case 'LastTriviaToken':
        return 'ConflictMarkerTrivia'; // 7
      case 'FirstJSDocNode':
      case 'FirstLiteralToken':
        return 'NumericLiteral'; // 9
      case 'LastLiteralToken':
      case 'FirstTemplateToken':
        return 'NoSubstitutionTemplateLiteral'; // 15
      case 'FirstBinaryOperator':
        return 'LessThanToken'; // 30
      case 'FirstStatement':
        return 'AsteriskAsteriskToken'; // 43
      case 'LastStatement':
        return 'ColonToken'; // 59
      case 'FirstNode':
        return 'MinusEqualsToken'; // 66
      case 'LastJSDocNode':
      case 'LastJSDocTagNode':
        return 'AmpersandToken'; // 51
      default:
        return ts.SyntaxKind[this.kind ?? 0];
    }
  }

  /**
   * Sets the meta types for this ast.
   * @param metaTypes - An array of meta types to set for this ast.
   * @returns A reference to this ast instance for method chaining.
   */
  public setMeta(metaTypes?: ts.SyntaxKind[]) {
    if (!metaTypes) return this;

    for (const meta of metaTypes) {
      if (isValidMeta(meta)) {
        this.meta.add(meta);
      }
    }

    return this;
  }

  /**
   * Adds a new meta type to the ast.
   * @param metaType - The meta type to add to the ast.
   * @returns A reference to this ast instance for method chaining.
   */
  public addMeta(metaKind: Meta | number) {
    if (isValidMeta(metaKind)) {
      this.meta.add(metaKind);
    }
    return this;
  }

  /**
   * Checks if the ast has the specified meta type.
   * @param metaType - The meta type to check for.
   * @returns `true` if the ast has the specified meta type, `false` otherwise.
   */
  public hasMeta(metaKind: Meta | number) {
    return this.meta.has(metaKind);
  }

  /**
   * Sets the name of the Ast instance.
   * @param name - The new name to set for this Ast.
   * @returns A reference to this Ast instance for method chaining.
   */
  public setName(name?: string) {
    if (name) {
      this.name = name;
    }
    return this;
  }

  /**
   * Gets the name of the Ast instance.
   * @returns The name of the Ast instance.
   */
  public getName() {
    return this.name;
  }

  /**
   * Gets an array of serialized Ast instances representing the types of this Ast.
   * @returns An array of serialized Ast instances.
   */
  public getType(): Ast[] {
    return this.type;
  }

  /**
   * Adds a new type to the Ast instance.
   * @param type - The type to add to the Ast.
   * @returns A reference to this Ast instance for method chaining.
   */
  public addType(type?: Ast) {
    if (type && type instanceof Ast) {
      this.type.push(type);
    }
    return this;
  }

  public getParameters(): Ast[] {
    return this.parameters;
  }

  /**
   * Sets the parameters for this object.
   * @param parameters - An array of ParameterBuilder instances to set as the parameters.
   * @returns A reference to this Ast instance for method chaining.
   */
  public setParameters(parameters: Ast[]) {
    if (parameters && Array.isArray(parameters)) {
      this.parameters = parameters;
    }
    return this;
  }

  /**
   * Adds a new parameter to the Ast instance.
   * @param parameter - The ParameterBuilder instance to add as a parameter.
   * @returns A reference to this Ast instance for method chaining.
   */
  public addParameter(parameter: Ast) {
    if (parameter && parameter instanceof Ast) {
      this.parameters.push(parameter);
    }
    return this;
  }

  /**
   * Sets the type parameters for this Ast instance.
   * @param typeParameters - An array of ParameterBuilder instances to set as the type parameters.
   * @returns A reference to this Ast instance for method chaining.
   */
  public setTypeParameters(typeParameters: Ast[]) {
    if (typeParameters && Array.isArray(typeParameters)) {
      this.typeParameters = typeParameters;
    }
    return this;
  }

  /**
   * Gets the type parameters for this Ast instance.
   * @returns An array of Ast instances representing the type parameters.
   */
  public getTypeParameters(): Ast[] {
    return this.typeParameters;
  }

  /**
   * Adds a new type parameter to the Ast instance.
   * @param typeParameter - The ParameterBuilder instance to add as a type parameter.
   * @returns A reference to this Ast instance for method chaining.
   */
  public addTypeParameter(typeParameter: Ast) {
    if (typeParameter && typeParameter instanceof Ast) {
      this.typeParameters.push(typeParameter);
    }
    return this;
  }

  /**
   * Sets the text property of this object.
   * @param text - The new text value to set, or undefined to clear the text.
   * @returns A reference to this Ast instance for method chaining.
   */
  public setText(text?: string) {
    if (text) {
      this.text = text;
    }
    return this;
  }
}
