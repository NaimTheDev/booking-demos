import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://naimthedev.github.io/booking-demos/ (GitHub Pages project site).
  base: '/booking-demos/',
  plugins: [react(), tailwindcss()],
})
