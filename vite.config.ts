import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This tells Vite to listen on all interfaces
    port: 5173,      // You can keep your preferred port
  },
  preview: {
    host: '0.0.0.0', // Ensure preview also listens on all interfaces
    port: 5173,
  }
})