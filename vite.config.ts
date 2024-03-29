import { defineConfig } from "vite"
import eslint from "vite-plugin-eslint"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslint(),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
})
