import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: "gabriel-takaoka-nishimura",
      project: "react-unite",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
    tsconfigPaths(),
    checker({typescript : true}),
  ],
  build: {
    sourcemap: true,
  }, assetsInclude: ['**/*.JPG']
});
