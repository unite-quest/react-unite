import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_SECRET': JSON.stringify(env.REACT_APP_SECRET),
    },
    plugins: [
      react(),
      sentryVitePlugin({
        org: 'gabriel-takaoka-nishimura',
        project: 'react-unite',
        authToken: process.env.SENTRY_AUTH_TOKEN,
      }),
      tsconfigPaths(),
      checker({ typescript: true }),
    ],
    build: {
      sourcemap: true,
    },
    assetsInclude: ['**/*.JPG'],
    esbuild: {
      legalComments: 'none',
    },
  };
});
