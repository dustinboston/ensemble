import interop from '../interop_generated.json' with { type: 'json' };

const defs = interop.map((def) => def.id).toSorted();
console.log(JSON.stringify(defs, null, 2));
