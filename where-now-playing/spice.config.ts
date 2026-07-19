import { resolve } from "path";
import { defineConfig } from "@spicemod/creator";

// Learn more: https://github.com/sanoojes/spicetify-creator
export default defineConfig({
  name: "where-now-playing",
  framework: "vanilla",
  linter: "oxlint",
  template: "extension",
  packageManager: "bun",
  esbuildOptions: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
