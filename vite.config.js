import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },

  plugins: [vue()],

  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib/main.js"),
      name: "encase",
      fileName: "encase"
    },
    rollupOptions: {
      external: ["vue", "three"],
      output: {
        globals: {
          vue: "Vue",
          three: "Three"
        }
      }
    }
  }
});
