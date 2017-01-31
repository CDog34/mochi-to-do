import svelte from 'rollup-plugin-svelte';

export default {
  entry: 'src/app.js',
  dest: 'src/bundle.js',
  format: 'es',
  plugins: [
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
    })
  ]
}