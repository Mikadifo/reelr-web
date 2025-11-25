import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), svgr()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
});
