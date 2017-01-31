import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'src/app.js',
  dest: 'src/bundle.js',
  format: 'umd',
  plugins: [
     nodeResolve({browser: true}),
    //  babel({
    //   include: ['./src/**/*.js'],
    // }),
     commonjs({
      include: 'node_modules/**',
      namedExports: {
        'lodash': [ 'findIndex', 'remove' ]
      }
    }),
    svelte({
      // By default, all .html and .svelte files are compiled
      extensions: [ '.html' ],

      // You can restrict which files are compiled
      // using `include` and `exclude`
      include: ['src/components/**/*.html','src/views/*.html'],

      // By default, the client-side compiler is used. You
      // can also use the server-side rendering compiler
      // generate: 'ssr',

      // If you're doing server-side rendering, you may want
      // to prevent the client-side compiler from duplicating CSS
      // css: false
    }),
     babel({
      include: ['./src/**/*.*'],
    }),
     uglify()
  ]
}