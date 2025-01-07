import _globals from '../data/globals.json' with { type: 'json' };

type GlobalObject = Record<string, {
  "kind": string,
  "name": string,
  "members": Array<{ kind: string, name: string, isStatic: boolean }>
}>;

const globals = _globals as unknown as GlobalObject;

const members: Set<string> = new Set();
for (const [name, object] of Object.entries(globals)) {  
  if (object.members && Array.isArray(object.members)) {
    if (Array.isArray(object.members)) {
      for (const [, member] of object.members.entries()) {
        if (member.isStatic) {
          members.add(`"${name}.${member.name}",`);  
        } else {
          members.add(`"${name}.prototype.${member.name}",`);
        }
      }
    }
  }
}

console.log(`const builtins = [`);
for (const member of members) {
  console.log(`  ${member}`);
}
console.log(`];`);
