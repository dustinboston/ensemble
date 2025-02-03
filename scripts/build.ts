import * as esbuild from 'npm:esbuild';

await esbuild.build({
  entryPoints: ['./src/ensemble.ts'],
  bundle: true,
  outfile: 'out.js',
});
