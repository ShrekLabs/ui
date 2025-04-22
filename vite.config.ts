import dts from "vite-plugin-dts";
import path from "path";
import { defineConfig } from "vite";
import packageJson from "./package.json";

const isDebug = process.env.DEBUG === "true";

export default defineConfig({
  base: "./",
  plugins: [dts({ rollupTypes: true })],
  build: {
    sourcemap: true,
    minify: isDebug ? false : "esbuild",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ShrekLabsUI",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        /^lodash(\/.*)?$/,
        ...Object.keys(packageJson.devDependencies || {}),
        ...Object.keys(packageJson.peerDependencies || {}),
      ],
    },
  },
});
