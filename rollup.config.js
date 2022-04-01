import html from '@web/rollup-plugin-html';
import {copy} from '@web/rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';

export default {
  plugins: [
    html({
      input: 'dev/index.html',
    }),
    resolve(),
    minifyHTML(),
    terser({
      ecma: 2017,
      module: true,
      warnings: true,
    }),
    summary(),
    // Optional: copy any static assets to build directory
    copy({
      patterns: 'images/**/*.{svg,png,jpg,gif,webp}',
      rootDir: './dev',
    }),
  ],
  output: {
    dir: 'docs',
  },
  preserveEntrySignatures: 'strict',
};
