/**
 * Generate wrapper functions for all JavaScript built-ins.
 * This file is is big so that everything can stay in one place.
 * @file
 */

import ts from 'typescript';

import { AppCache } from '../interop/cache.ts';
import { Generator } from '../interop/generator.ts';
import { libs } from '../interop/lib/mod.ts';

function main() {
  const libFiles = libs.map((file) => `./interop/lib/${file}`);
  const program = ts.createProgram(libFiles, { noLib: true });

  const cache = new AppCache(program);
  const generator = new Generator(program, cache);
  const result = generator.generate();

  console.log(JSON.stringify(result, null, 2));
}

if (import.meta.main) {
  main();
}
