import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This tells Vite to listen on all interfaces
    port: 5177,  
    cors: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 5177,
    allowedHosts: ["my-stocks-s2at.onrender.com", "*.onrender.com"],

  }
})


