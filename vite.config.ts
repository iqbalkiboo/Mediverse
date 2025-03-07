import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import { VitePWA } from 'vite-plugin-pwa';
import svgrPlugin from 'vite-plugin-svgr';
import path from 'path';
import react from '@vitejs/plugin-react';

const vitePWA = VitePWA({
  injectRegister: 'auto',
  filename: 'firebase-messaging-sw.js',
  workbox: {
    globPatterns: [],
    globIgnores: ['*'],
  },
  registerType: 'autoUpdate',
  devOptions: {
    enabled: false,
  },
  strategies: 'injectManifest',
});

const hotUpdateHMR = () => {
  return {
    name: 'singleHMR',
    handleHotUpdate({ modules }) {
      modules.map((m) => {
        m.importedModules = new Set();
        m.importers = new Set();
      });

      return modules;
    },
  };
};

export default defineConfig({
  build: {
    outDir: 'build',
    target: 'esnext',
    rollupOptions: {
      output: {
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }

          if (/\.(ttf|otf|fnt|woff)$/.test(name ?? '')) {
            return 'assets/fonts/[name]-[hash][extname]';
          }

          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }

          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
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
  plugins: [
    react(),
    vitePWA,
    splitVendorChunkPlugin(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
    process.env.NODE_ENV !== 'production' && hotUpdateHMR(),
  ],
  optimizeDeps: {
    include: ['firebase/app', 'firebase/auth', 'firebase/messaging'],
    esbuildOptions: {
      define: {
        global: 'globalThis', // Node.js global to browser globalThis
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true, // Enable esbuild polyfill plugins process
          buffer: true, // Enable esbuild polyfill plugins buffer
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
});
