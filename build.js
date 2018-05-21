const rollup = require('rollup').rollup
const babel = require('rollup-plugin-babel')
const external = require('rollup-plugin-auto-external')
const resolve = require('rollup-plugin-node-resolve')

rollup({
  input: 'src/index.js',
  plugins: [
    resolve({
      module: true,
      jsnext: true,
      main: true,
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
    external(),
  ],
}).then(bundle => Promise.all([
  bundle.write({
    name: 'VueFirebase',
    exports: 'named',
    file: 'dist/vue.firebase.js',
    format: 'umd',
    sourceMap: 'inline',
    globals: {vue: 'Vue'},
  }),
  bundle.write({
    name: 'VueFirebase',
    exports: 'named',
    file: 'dist/vue.firebase.iife.js',
    format: 'iife',
    sourceMap: 'inline',
    globals: {vue: 'Vue'},
  }),
  bundle.write({
    file: 'dist/vue.firebase.esm.js',
    format: 'es',
    sourceMap: 'inline',
  })
])).catch(error => console.log(error))
