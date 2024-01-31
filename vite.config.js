import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@containers": path.resolve(__dirname, "./src/containers"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
});
