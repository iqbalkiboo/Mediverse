/// <reference types="vitest" />
/// <reference types="vite/client" />

import {defineConfig} from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@/src': path.resolve(__dirname, 'src'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
      '@/home': path.resolve(__dirname, 'src/pages/Home'),
      '@/store': path.resolve(__dirname, 'src/store'),
      '@/types': path.resolve(__dirname, 'src/types'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/commons': path.resolve(__dirname, 'src/commons'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/client': path.resolve(__dirname, 'src/client'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/configs': path.resolve(__dirname, 'src/configs'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './__test__/setup.ts',
    coverage: {
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        '__test__',
      ],
    },
  },
});
