import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  // Vercel's TanStack Start framework preset scans `.output/`. On
  // @tanstack/react-start v1.168 the default output directory switched to
  // `dist/`, which left Vercel with nothing to serve (→ 404 NOT_FOUND).
  // Point both client and server builds at `.output/` so Vercel can pick
  // them up automatically — no per-project vercel.json required.
  build: {
    outDir: ".output",
  },
  environments: {
    client: {
      build: {
        outDir: ".output/client",
      },
    },
    ssr: {
      build: {
        outDir: ".output/server",
        // Vercel's preset expects the server entry to be `index.mjs`. Without
        // this override Vite names it `server.js` (matching the entry file).
        rollupOptions: {
          output: {
            entryFileNames: "index.mjs",
          },
        },
      },
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    viteReact(),
    tailwindcss(),
  ],
});
