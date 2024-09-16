// import {InteropFunctionGenerator} from '../interop/to_interop.ts';
import { SerializedAst } from '../interop/ast.ts';
import globalsJson from '../generated/interop_generated.json' with { type: 'json' };


const all = globalsJson.map(g => g.id).toSorted();
console.log(JSON.stringify(all, null, 2));

function wrap(a: string = '', b: string = '') {
	return (x: string) => a + x + b;
}

/**
 * poop out a type
 * @param a ast
 * @param l left string (prefix)
 * @param r right string (suffix)
 * @returns combined type
 */
function poop(a: SerializedAst['type'], l = '', r = ''): string {
	const w = wrap(l, r);
	if (a === undefined) return 'NIL';
	if (typeof a === 'string') return w(a);
	if (Array.isArray(a)) return w(a.map((p, j) => `${j}. ${poop(p)}`).join(', '));
	if (typeof a === 'object') {
		// text
		if ((a.kind.includes('Keyword')) && a.text) return w(a.text);
		else if (a.kind.includes('Literal') && a.text) return w(a.text);
		else if (a.kind === 'ThisType' && a.text) return w('this');
		else if (a.kind === 'Identifier' && a.text) return `${a.name} : ${w(a.text)}`;
		// type
		else if (a.kind === 'TypeReference' && !a.type) return `<${w(a.name)}>`;
		else if (a.kind === 'TypeReference' && a.type) return `<${w(a.name + poop(a.type))}>`;
		else if (a.kind === 'ArrayType' && a.type) return `${w(poop(a.type, '', '[]'))}`;
		else if (a.kind === 'ParenthesizedType' && a.type) return w(wrap('(', ')')(poop(a.type)));
		else if (a.kind === 'UnionType' && a.type && Array.isArray(a.type)) return w(a.type.map((p) => poop(p)).join(' | '));
		else if (a.kind === 'FirstTypeNode' && a.type && a.name) return w(`${a.name} is ${poop(a.type)}`);
		else return w(`Unhandled(${a.kind})`);
	}
	return w(`???`);
}

// const result = globalsJson.map((p) => poop(p.type)).join('\n');
// console.log(result);

// Function to extract assertions from the type
// function extractAssertions(ast: SerializedAst['type'], sp = '') {
//     if (!ast) return;

//     if (typeof ast === 'string') {
//         console.log(sp + `Assert: type is string: '${ast}'`);
//         return;
//     }

//     if (Array.isArray(ast)) {
//         console.log(sp + `Type is array:`);
//         ast.forEach((p, i) => {
//             extractAssertions(p, sp + '  ' + `${i}. `);
//         });
//         return;
//     }

//     if (typeof ast === 'object') {
//         if (ast.kind.includes('Keyword') && ast.text) {
//             console.log(sp + `Assert: type is keyword: '${ast.text}'`);
//             return;
//         }

//         if (ast.name && !ast.name.startsWith('~') && ast.kind === 'TypeReference') {
//             const type = ast.type ? ` with type:` : '';
//             console.log(sp + `Assert: type is reference: <${ast.name}>${type}`);
//             if (ast.type) extractAssertions(ast.type, sp + `  - `);
//             return;
//         }

//         console.log(sp + `Type is object of kind '${ast.kind}':`);
//         if (ast.name && !ast.name.startsWith('~')) {
//             console.log(sp + `  - name: '${ast.name}'`);
//         }

//         if (ast.text) {
//             console.log(sp + `  - text: '${ast.text}'`);
//         } else if (ast.type) {
//             console.log(sp + `  - nested:`);
//             extractAssertions(ast.type, sp + '  ');
//         } else {
//             // nothing?
//         }
//     }
// }

// globalsJson.forEach((p) => {
//     console.log('--------------------------------------------------------------------------------------');
//     extractAssertions(p.type);
// });
// console.log('Types', JSON.stringify(Array.from(types), null, 2));
// console.log('Result', JSON.stringify(out, null, 2));
