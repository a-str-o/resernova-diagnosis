import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// Vercel's TanStack Start deployment requires Nitro to wrap the SSR bundle as
// a Vercel serverless function and emit the proper `.vercel/output/` structure.
// Without this plugin, the build only writes a raw fetch-handler module that
// Vercel can't discover, producing 404 NOT_FOUND on every request.
import { nitro } from "nitro/vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro(),
    viteReact(),
    tailwindcss(),
  ],
});
