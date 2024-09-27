import ts from 'typescript';
const { factory } = ts;

import { libs } from './lib/mod.ts';

function main() {
  const libFiles = libs.map((file) => `./interop/lib/${file}`);
  const program = ts.createProgram(libFiles, { noLib: true });

  const interopStatements: ts.Statement[] = [
    buildImports(),
    buildNs(),
  ];
  program.getSourceFiles().forEach((sourceFile) => {
    sourceFile.forEachChild((node) => {
      const statements = visitStatements(node, sourceFile);
      interopStatements.push(...statements);
    });
  });

  const interopFile = factory.createSourceFile(interopStatements, factory.createToken(ts.SyntaxKind.EndOfFileToken), ts.NodeFlags.None);
  const printer = ts.createPrinter();
  const interopCode = printer.printFile(interopFile);

  Deno.writeTextFileSync('./generated/interop.ts', interopCode);
}

// TODO: Handle other types of nodes.
function visitStatements(node: ts.Node, sourceFile: ts.SourceFile): ts.Statement[] {
  const result: ts.Statement[] = [];
  if (ts.isFunctionDeclaration(node)) {
    result.push(visitFunctionDeclaration(node, sourceFile));
  } else if (ts.isInterfaceDeclaration(node)) {
    result.push(visitInterfaceDeclaration(node, sourceFile));
  } else if (ts.isModuleDeclaration(node)) {
    result.push(visitModuleDeclaration(node, sourceFile));
  } else if (ts.isTypeAliasDeclaration(node)) {
    result.push(visitTypeAliasDeclaration(node, sourceFile));
  } else if (ts.isVariableDeclaration(node)) {
    result.push(visitVariableDeclaration(node, sourceFile));
  }

  // Will traverse children of this node even if we don't do anything with this node.
  // node.forEachChild((child) => {
  //   result.push(...visitStatements(child, sourceFile));
  // });

  return result;
}

function getParameterCounts(parameters: ts.NodeArray<ts.ParameterDeclaration>): { min: number; max: number } {
  return parameters.reduce<{ min: number; max: number }>((acc, parameter) => ({
    min: parameter.questionToken !== undefined ? acc.min : acc.min + 1,
    max: acc.max + 1,
  }), { min: 0, max: 0 });
}

function visitFunctionDeclaration(node: ts.FunctionDeclaration, sourceFile: ts.SourceFile): ts.Statement {
  if (!node.name) return factory.createNotEmittedStatement(node);

  const name = node.name.getText(sourceFile);
  const { min, max } = getParameterCounts(node.parameters);

  const functionBody: ts.Statement[] = [
    buildParameterCountAssertion(min, max),
    ...node.parameters.flatMap((parameter, index) => {
      return parameter.questionToken
        ? buildOptionalArgumentAssertion(parameter, index, sourceFile)
        : buildRequiredArgumentAssertion(parameter, index, sourceFile);
    }),
    factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [factory.createVariableDeclaration(
          factory.createIdentifier('result'),
          undefined,
          undefined,
          factory.createCallExpression(
            factory.createIdentifier(name),
            // TODO: Handle property access:
            // factory.createPropertyAccessExpression(
            //   factory.createIdentifier('Number'),
            //   factory.createIdentifier('parseInt'),
            // ),
            undefined,
            node.parameters.map((parameter) => factory.createIdentifier(parameter.name.getText(sourceFile))),
          ),
        )],
        ts.NodeFlags.Const,
      ),
    ),
    factory.createReturnStatement(factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier('types'),
        factory.createIdentifier('toAst'),
      ),
      undefined,
      [factory.createIdentifier('result')],
    )),
  ];

  return buildNsFunction(name, functionBody);
}

function visitInterfaceDeclaration(node: ts.InterfaceDeclaration, _sourceFile: ts.SourceFile): ts.Statement {
  return factory.createNotEmittedStatement(node);
}

function visitModuleDeclaration(node: ts.ModuleDeclaration, _sourceFile: ts.SourceFile): ts.Statement {
  return factory.createNotEmittedStatement(node);
}

function visitTypeAliasDeclaration(node: ts.TypeAliasDeclaration, _sourceFile: ts.SourceFile): ts.Statement {
  return factory.createNotEmittedStatement(node);
}

function visitVariableDeclaration(node: ts.VariableDeclaration, _sourceFile: ts.SourceFile): ts.Statement {
  return factory.createNotEmittedStatement(node);
}

function buildImports() {
  return factory.createImportDeclaration(
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamespaceImport(factory.createIdentifier('types')),
    ),
    factory.createStringLiteral('@/types.ts'),
    undefined,
  );
}

function buildNs() {
  return factory.createVariableStatement(
    [factory.createToken(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [factory.createVariableDeclaration(
        factory.createIdentifier('ns'),
        undefined,
        undefined,
        factory.createNewExpression(
          factory.createIdentifier('Map'),
          [
            factory.createTypeReferenceNode(
              factory.createQualifiedName(
                factory.createIdentifier('types'),
                factory.createIdentifier('MapKeyNode'),
              ),
              undefined,
            ),
            factory.createTypeReferenceNode(
              factory.createQualifiedName(
                factory.createIdentifier('types'),
                factory.createIdentifier('FunctionNode'),
              ),
              undefined,
            ),
          ],
          [],
        ),
      )],
      ts.NodeFlags.Const,
    ),
  );
}

function buildNsFunction(symbolName: string, functionBody: ts.Statement[]) {
  return factory.createExpressionStatement(factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier('ns'),
      factory.createIdentifier('set'),
    ),
    undefined,
    [
      factory.createNewExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier('types'),
          factory.createIdentifier('SymbolNode'),
        ),
        undefined,
        [factory.createStringLiteral(symbolName)],
      ),
      factory.createNewExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier('types'),
          factory.createIdentifier('FunctionNode'),
        ),
        undefined,
        [factory.createArrowFunction(
          undefined,
          undefined,
          [factory.createParameterDeclaration(
            undefined,
            factory.createToken(ts.SyntaxKind.DotDotDotToken),
            factory.createIdentifier('astNodes'),
            undefined,
            factory.createArrayTypeNode(factory.createTypeReferenceNode(
              factory.createQualifiedName(
                factory.createIdentifier('types'),
                factory.createIdentifier('AstNode'),
              ),
              undefined,
            )),
            undefined,
          )],
          factory.createTypeReferenceNode(
            factory.createQualifiedName(
              factory.createIdentifier('types'),
              factory.createIdentifier('AstNode'),
            ),
            undefined,
          ),
          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          factory.createBlock(functionBody, true),
        )],
      ),
    ],
  ));
}

function buildParameterCountAssertion(minParameters: number, maxParameters?: number) {
  if (maxParameters === undefined) {
    return factory.createExpressionStatement(factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier('types'),
        factory.createIdentifier('assertMinimumArgumentCount'),
      ),
      undefined,
      [
        factory.createPropertyAccessExpression(
          factory.createIdentifier('astNodes'),
          factory.createIdentifier('length'),
        ),
        factory.createNumericLiteral(minParameters),
      ],
    ));
  }

  if (minParameters === maxParameters) {
    return factory.createExpressionStatement(factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier('types'),
        factory.createIdentifier('assertArgumentCount'),
      ),
      undefined,
      [
        factory.createPropertyAccessExpression(
          factory.createIdentifier('astNodes'),
          factory.createIdentifier('length'),
        ),
        factory.createNumericLiteral(minParameters),
      ],
    ));
  }

  if (minParameters < maxParameters) {
    return factory.createExpressionStatement(factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier('types'),
        factory.createIdentifier('assertVariableArgumentCount'),
      ),
      undefined,
      [
        factory.createPropertyAccessExpression(
          factory.createIdentifier('astNodes'),
          factory.createIdentifier('length'),
        ),
        factory.createNumericLiteral(minParameters),
        factory.createNumericLiteral(maxParameters),
      ],
    ));
  }

  return factory.createNotEmittedStatement(factory.createEmptyStatement());
}

function buildRequiredArgumentAssertion(parameter: ts.ParameterDeclaration, index: number, sourceFile: ts.SourceFile): ts.Statement[] {
  const name = parameter.name.getText(sourceFile);
  const type = parameter.type?.getText(sourceFile) ?? 'undefined';
  const astNode = getAstNodeFromTypeString(type);

  return [
    factory.createExpressionStatement(factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier('types'),
        factory.createIdentifier(`assert${astNode}`),
      ),
      undefined,
      [factory.createElementAccessExpression(
        factory.createIdentifier('astNodes'),
        factory.createNumericLiteral(index),
      )],
    )),
    factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [factory.createVariableDeclaration(
          factory.createIdentifier(name),
          undefined,
          undefined,
          factory.createPropertyAccessExpression(
            factory.createElementAccessExpression(
              factory.createIdentifier('astNodes'),
              factory.createNumericLiteral(index),
            ),
            factory.createIdentifier('value'),
          ),
        )],
        ts.NodeFlags.Const,
      ),
    ),
  ];
}

function buildOptionalArgumentAssertion(parameter: ts.ParameterDeclaration, index: number, sourceFile: ts.SourceFile): ts.Statement[] {
  const safeName = getSafeName(parameter.name.getText(sourceFile));
  const type = parameter.type ?? factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword);
  const astNode = getAstNodeFromTypeNode(type);

  return [
    factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [factory.createVariableDeclaration(
          factory.createIdentifier(safeName),
          undefined,
          factory.createUnionTypeNode([
            type,
            factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword),
          ]),
          parameter.initializer,
        )],
        ts.NodeFlags.Let,
      ),
    ),
    factory.createIfStatement(
      factory.createBinaryExpression(
        factory.createElementAccessExpression(
          factory.createIdentifier('astNodes'),
          factory.createNumericLiteral(index),
        ),
        factory.createToken(ts.SyntaxKind.ExclamationEqualsEqualsToken),
        factory.createIdentifier('undefined'),
      ),
      factory.createBlock(
        [
          factory.createExpressionStatement(factory.createCallExpression(
            factory.createPropertyAccessExpression(
              factory.createIdentifier('types'),
              factory.createIdentifier(`assert${astNode}`),
            ),
            undefined,
            [factory.createElementAccessExpression(
              factory.createIdentifier('astNodes'),
              factory.createNumericLiteral(index),
            )],
          )),
          factory.createExpressionStatement(factory.createBinaryExpression(
            factory.createIdentifier(safeName),
            factory.createToken(ts.SyntaxKind.EqualsToken),
            factory.createPropertyAccessExpression(
              factory.createElementAccessExpression(
                factory.createIdentifier('astNodes'),
                factory.createNumericLiteral(index),
              ),
              factory.createIdentifier('value'),
            ),
          )),
        ],
        true,
      ),
      undefined,
    ),
  ];
}

function getAstNodeFromTypeNode(type: ts.TypeNode) {
  switch (type.kind) {
    case ts.SyntaxKind.StringKeyword:
      return 'StringNode';
    case ts.SyntaxKind.NumberKeyword:
      return 'NumberNode';
    case ts.SyntaxKind.BooleanKeyword:
      return 'BooleanNode';
    case ts.SyntaxKind.UndefinedKeyword:
      return 'NilNode';
    case ts.SyntaxKind.NullKeyword:
      return 'NilNode';
    case ts.SyntaxKind.SymbolKeyword:
      return 'SymbolNode';
    case ts.SyntaxKind.FunctionKeyword:
      return 'FunctionNode';
    case ts.SyntaxKind.ArrayType:
      return 'VectorNode';
    case ts.SyntaxKind.TypeLiteral:
      return 'MapNode';
    case ts.SyntaxKind.SetKeyword:
      return 'VectorNode';
    case ts.SyntaxKind.ObjectKeyword:
      return 'MapNode';
    default:
      return 'AstNode';
  }
}

function getAstNodeFromTypeString(type: string) {
  switch (type) {
    case 'string':
      return 'StringNode';
    case 'number':
      return 'NumberNode';
    case 'boolean':
      return 'BooleanNode';
    case 'undefined':
      return 'NilNode';
    case 'null':
      return 'NilNode';
    case 'symbol':
      return 'SymbolNode';
    case 'function':
      return 'FunctionNode';
    case 'array':
      return 'VectorNode';
    case 'map':
      return 'MapNode';
    case 'set':
      return 'VectorNode';
    case 'object':
      return 'MapNode';
    default:
      return 'AstNode';
  }
}

function getSafeName(name: string) {
  if (name === 'this') return 'self';
  return name;
}

// Example
import * as types from '@/types.ts';
export const ns = new Map<types.MapKeyNode, types.FunctionNode>();
ns.set(
  new types.SymbolNode('Object.hasOwnProperty'),
  new types.FunctionNode((...astNodes: types.AstNode[]): types.AstNode => {
    types.assertArgumentCount(astNodes.length, 2);
    types.assertMapNode(astNodes[0]);
    const paramName = astNodes[0].value;
    let radix: number | undefined;
    if (astNodes[1] !== undefined) {
      types.assertNumberNode(astNodes[1]);
      radix = astNodes[1].value;
    }
    const result: number = Number.parseInt(string, radix);
    return types.toAst(result);
  }),
);

if (import.meta.main) {
  main();
}
