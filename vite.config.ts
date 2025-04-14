import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      Public: path.resolve(__dirname, "public"),
    },
  },
  plugins: [],
});
