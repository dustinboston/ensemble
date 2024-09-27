import ts from 'npm:typescript@5.5.3';
import { Ast, SerializedAst } from '../interop/ast.ts';
import jsInteropJson from '../generated/js_interop.json' with { type: 'json' };
import { curryWrap, getSyntaxKindForPrimitiveType, isPrototype, renameVariable, toAstNodeString } from '../interop/utils.ts';

/**
 * Convert the globals AST to an assertion
 * @param paramName - The name of the parameter to be asserted
 * @param paramIndex - The index of the parameter in the AST
 * @param ast - The serialized AST node to be converted to an assertion
 * @param prefix - An optional prefix to wrap the assertion with
 * @param suffix - An optional suffix to wrap the assertion with
 * @returns The generated assertion code
 */
function toAssertion(paramName: string, paramIndex: number, ast: SerializedAst, prefix = '', suffix = ''): string {
  const wrap = curryWrap(prefix, suffix);
  if (ast === undefined) {
    return '';
  }

  const assertion: string[] = [
    `// ${ast.kind}`,
  ];

  switch (ast.kind) {
    case 'Identifier': {
      if (ast.text) {
        const nodeType = toAstNodeString(ast.text);
        assertion.push(
          `\t\ttypes.assert${nodeType}(astNodes[${paramIndex}]);`,
          `\t\tconst ${paramName} = astNodes[${paramIndex}].value;`,
        );
      } else {
        assertion.push(`const ${paramName} = astNodes[${paramIndex}].value;`);
      }
      break;
    }

    case 'TypeReference': {
      const nodeType = toAstNodeString(ast.text);
      if (ast.type.length === 0) {
        assertion.push(
          `\t\ttypes.assert${nodeType}(astNodes[${paramIndex}]);`,
          `\t\tconst ${paramName} = astNodes[${paramIndex}].value;`,
        );
      } else {
        const astNodeType = toAstNodeString(ast.type);
        assertion.push(`\t\ttypes.assert${astNodeType}(astNodes[${paramIndex}]);`);
      }
      assertion.push(`\t\tconst ${paramName} = astNodes[${paramIndex}].value;`);
      break;
    }

    case 'ArrayType': {
      assertion.push(
        `\t\ttypes.assertVectorNode(astNodes[${paramIndex}]);`,
        `\t\tconst ${paramName} = astNodes[${paramIndex}].value;`,
      );
      break;
    }

    case 'UnionType':
    case 'IntersectionType': {
      const delimiter = ast.kind === 'IntersectionType' ? ' & ' : ' | ';
      const types = ast.type.map((element) => toType(paramIndex, paramName, element));
      const params = types.map((t) => `types.${toAstNodeString(t)}`);
      assertion.push(
        `\t\ttypes.assertOneOf<${types.join(delimiter)}>(astNodes[${paramIndex}], [${params.join(', ')}]);`,
        `\t\tconst ${paramName} = astNodes[${paramIndex}].value;`,
      );
      break;
    }

    case 'ConditionalType': {
      if (ast.type.length === 4) {
        const [checkType, extendsType, trueType, falseType] = ast.type;
        assertion.push([
          toType(paramIndex, paramName, checkType),
          'extends',
          toType(paramIndex, paramName, extendsType),
          '?',
          toType(paramIndex, paramName, trueType),
          ':',
          toType(paramIndex, paramName, falseType),
        ].join(' '));
      }
      break;
    }

    // TODO: Get the correct type
    case 'Parameter': {
      const paramType = toType(paramIndex, paramName, ast.type);
      const typeAstNode = toAstNodeString(paramType);
      assertion.push(
        `\t\ttypes.assert${typeAstNode}(astNodes[${paramIndex}]);`,
        `\t\tconst ${paramName} = astNodes[${paramIndex}].value;`,
      );
      break;
    }

    default: {
      assertion.push(`// Default case`);
      if ((ast.kind.includes('Keyword')) && ast.text) {
        const nodeType = toAstNodeString(ast.text);
        assertion.push(
          `\t\ttypes.assert${nodeType}(astNodes[${paramIndex}]);`,
          `\t\tconst ${paramName} = astNodes[${paramIndex}].value; // ${ast.text}`,
        );
      } else if ((ast.kind === 'NumericLiteral') && ast.text) {
        assertion.push(wrap(ast.text));
      } else if (ast.kind === 'LiteralType' && ast.type) {
        assertion.push(wrap(toType(paramIndex, paramName, ast.type)));
      } else if (ast.kind.includes('Literal') && ast.text) {
        assertion.push(wrap(ast.text));
      } else if (ast.kind === 'ThisType' && ast.text) {
        assertion.push(wrap('this'));
      } else if (ast.kind === 'ParenthesizedType' && ast.type) {
        assertion.push(wrap(curryWrap('(', ')')(toType(paramIndex, paramName, ast.type))));
      } else if (ast.kind === 'FirstTypeNode' && ast.type && ast.name) {
        assertion.push(wrap(toType(paramIndex, paramName, ast.type)));
      } else if (ast.kind === 'TypeOperator' && ast.type) {
        assertion.push(wrap(toType(paramIndex, paramName, ast.type)));
      } else {
        assertion.push(wrap(`/* Unhandled, Data: ${JSON.stringify(ast)} */`));
      }
    }
  }

  return assertion.join('\n');
}

/**
 * Convert the globals AST to a type
 * @param ast ast
 * @param prefix
 * @param suffix
 * @returns combined type
 */
function toType(index: number, paramName: string | undefined, ast: SerializedAst | SerializedAst[], prefix = '', suffix = ''): string {
  const wrap = curryWrap(prefix, suffix);
  if (Array.isArray(ast)) {
    return wrap(ast.map((element, _index) => `${toType(index, paramName, element)}`).join(', '));
  }

  if ((ast.kind.includes('Keyword')) && ast.text) {
    return wrap(ast.text);
  }

  if ((ast.kind === 'NumericLiteral') && ast.text) {
    return wrap(ast.text);
  }

  if (ast.kind === 'LiteralType' && ast.type) {
    return wrap(toType(index, paramName, ast.type));
  }

  if (ast.kind.includes('Literal') && ast.text) {
    return wrap(ast.text);
  }

  if (ast.kind === 'ThisType' && ast.text) {
    return wrap('this');
  }

  if (ast.kind === 'Identifier' && ast.text) {
    return `${wrap(ast.text)} /* ${paramName} */`;
  }

  // type

  if (ast.kind === 'TypeReference' && !ast.type) {
    return paramName ? wrap(paramName) : 'NIL';
  }

  if (ast.kind === 'TypeReference' && ast.type) {
    return `unknown /* <${wrap(paramName + toType(index, paramName, ast.type))}> */`;
  }

  if (ast.kind === 'ArrayType' && ast.type) {
    return `${wrap(toType(index, paramName, ast.type, '', '[]'))}`;
  }

  if (ast.kind === 'ParenthesizedType' && ast.type) {
    return wrap(curryWrap('(', ')')(toType(index, paramName, ast.type)));
  }

  if (ast.kind === 'UnionType' && ast.type && Array.isArray(ast.type)) {
    return wrap(ast.type.map((element) => toType(index, paramName, element)).join(' | '));
  }

  if (ast.kind === 'FirstTypeNode' && ast.type && ast.name) {
    return wrap(`${ast.name} is ${toType(index, paramName, ast.type)}`);
  }

  if (ast.kind === 'ConditionalType' && Array.isArray(ast.type) && ast.type.length === 4) {
    const [checkType, extendsType, trueType, falseType] = ast.type;
    return [
      toType(index, paramName, checkType),
      'extends',
      toType(index, paramName, extendsType),
      '?',
      toType(index, paramName, trueType),
      ':',
      toType(index, paramName, falseType),
    ].join(' ');
  }

  if (ast.kind === 'Parameter') {
    return wrap(`${toType(index, paramName, ast.type)}`);
  }

  if (ast.kind === 'TypeOperator' && ast.type) {
    return wrap(toType(index, paramName, ast.type));
  }

  return wrap(`/* Unhandled(${ast.kind}) */`);
}

// TODO: Figure out why the "thisObject" parameter is not showing up for prototypes
function makeFunction(ast: SerializedAst): string {
  const isProperty = ast.kind === 'PropertySignature' || ast.kind === 'VariableDeclaration';
  const builtinType = toType(0, ast.name, ast.type);
  const builtinName = renameVariable(ast.name);

  let functionBody = '';
  if (ast.kind === 'FunctionDeclaration' || ast.kind === 'MethodSignature' || ast.kind === 'ConstructSignature' || ast.kind === 'CallSignature') {
    const params: SerializedAst[] = ast.params;
    if (isPrototype(builtinName)) {
      const thisName = 'thisObject';
      const thisType = '~thisObjectType';
      const thisTypeKind = getSyntaxKindForPrimitiveType(builtinType);
      const thisObject = new Ast(thisName, thisName, ts.SyntaxKind.Parameter)
        .addType(new Ast(thisType, thisType, thisTypeKind).setText(builtinType))
        .serialize();
      params.unshift(thisObject);
    }

    // WAS:
    // if (Array.isArray(ast.params)) {
    // 	params = ast.params ?? [];
    // } else if (ast.params !== null && typeof ast.params === 'object') {
    // 	params = [ast.params];
    // }

    let minArgs = 0;
    let maxArgs = 0;
    params.forEach((p) => {
      if (!p.meta.includes('optional')) minArgs += 1;
      maxArgs += 1;
    });
    if (minArgs > maxArgs) {
      maxArgs = Infinity;
    }

    const assertions: string = params.map((p, index) => toAssertion(renameVariable(p.name), index, p)).join('\n');
    const args = params.map((p) => {
      const name = renameVariable(p.name); // ?? `astNodes[${i}]`;
      return p.meta.includes('rest') ? `...${name}` : name;
    }).join(', ');

    let assertion = '';
    if (minArgs === maxArgs) {
      assertion = `types.assertArgumentCount(astNodes.length, ${minArgs});`;
    } else if (maxArgs === Infinity) {
      assertion = `types.assertMinimumArgumentCount(astNodes.length, ${minArgs});`;
    } else {
      assertion = `types.assertVariableArgumentCount(astNodes.length, ${minArgs}, ${maxArgs});`;
    }

    let functionCall = '';
    // if (g.kind === 'FunctionDeclaration' || g.kind === 'MethodSignature') {
    if (ast.kind === 'ConstructSignature') {
      functionCall = `const result = new ${builtinName}(${args}); // ${builtinType}`;
    } else if (isPrototype(builtinName)) {
      functionCall = `const result = ${builtinName}.call(${args}); // ${builtinType}`;
    } else {
      functionCall = `const result = ${builtinName}(${args}); // ${builtinType}`;
    }

    functionBody = `${assertion}
		${assertions}
		${functionCall}
		return types.toAst(result);
`;
  } else if (isProperty) {
    const name = renameVariable(ast.name);
    functionBody = `const result = ${name}; // ${builtinType}
		return types.toAst(result);
`;
  }

  const fn = `// ${ast.kind}
ns.set(
	new types.SymbolNode('${ast.id}'), 
	new types.FunctionNode((...astNodes: types.AstNode[]): types.AstNode => {
		${functionBody}
	})
);
`;

  return fn;
}

if (import.meta.main) {
  const globals = jsInteropJson as unknown as SerializedAst[];
  const interopBuiltins = globals.map(makeFunction);

  console.log(`import * as types from './src/types.ts';`);
  console.log(`export const ns = new Map<types.MapKeyNode, types.FunctionNode>();`);
  console.log(interopBuiltins.join('\n'));
}
