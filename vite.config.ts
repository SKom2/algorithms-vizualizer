import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/algorithms-vizualizer',
  plugins: [react()],
  resolve: {
    alias: {
      '@/components': '/src/components',
      '@/ui': '/src/ui',
      '@/assets': '/src/assets',
      '@/services': '/src/services',
      '@/data': '/src/data',
      '@/styles': '/src/assets/styles',
    },
  },
})
