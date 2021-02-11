import { terser } from "rollup-plugin-terser"
import resolve from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/_scripts/app.js',
  output: {
    file: 'src/js/main.min.js',
    format: "umd",
    sourcemap: true,
  },
  plugins: [
    resolve({
      mainFields: ['jsnext:main']
    }),
    babel({
      comments: false,
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'vanilla-masker' :['VMasker']
      },
    }),
    terser(),
  ]
};