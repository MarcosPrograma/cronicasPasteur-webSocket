import { defineConfig } from 'vite';
import path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
      assetsDir: 'assets'
    }
  },
  plugins: [
    createHtmlPlugin()
  ]
});
