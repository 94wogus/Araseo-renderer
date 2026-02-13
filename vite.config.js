import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { jsonHMRPlugin } from './plugins/json-hmr.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    jsonHMRPlugin(), // Enable HMR for JSON files in public/examples
  ],
  server: {
    // Enable HMR
    hmr: true,
  },
  // Ensure public directory is served
  publicDir: 'public',
})
