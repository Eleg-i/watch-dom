const esbuild = require('esbuild')

esbuild.buildSync({
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'dist/index.min.js',
  platform: 'node',
  minify: true,
  external: ['css']
})
