import ts from 'npm:typescript@5.5.3';

export const metaValues = [
	ts.SyntaxKind.DotDotDotToken,
	ts.SyntaxKind.QuestionToken,
	ts.SyntaxKind.AbstractKeyword,
	ts.SyntaxKind.AccessorKeyword,
	ts.SyntaxKind.AssertsKeyword,
	ts.SyntaxKind.AsyncKeyword,
	ts.SyntaxKind.ConstKeyword,
	ts.SyntaxKind.DeclareKeyword,
	ts.SyntaxKind.DefaultKeyword,
	ts.SyntaxKind.ExportKeyword,
	ts.SyntaxKind.ExtendsKeyword,
	ts.SyntaxKind.InKeyword,
	ts.SyntaxKind.OutKeyword,
	ts.SyntaxKind.OverrideKeyword,
	ts.SyntaxKind.PrivateKeyword,
	ts.SyntaxKind.ProtectedKeyword,
	ts.SyntaxKind.PublicKeyword,
	ts.SyntaxKind.ReadonlyKeyword,
	ts.SyntaxKind.StaticKeyword,
] as const;

export type Meta = typeof metaValues[number];
export type DeclarationWithName = ts.InterfaceDeclaration | ts.VariableDeclaration | (ts.FunctionDeclaration & { name: ts.Identifier }) | ts.ModuleDeclaration;
export type DeclarationWithType = (ts.VariableDeclaration | ts.FunctionDeclaration) & { type: ts.TypeReferenceType | ts.Token<ts.SyntaxKind> };
export type DeclarationWithConstructor = ts.InterfaceDeclaration & { members: ts.NodeArray<ts.ConstructSignatureDeclaration> };
export type ContainerDeclaration = ts.InterfaceDeclaration | ts.ModuleDeclaration;
