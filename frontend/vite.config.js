import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Essentiel pour que Vite soit accessible depuis l'extérieur du conteneur
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://backend:5000', // Utiliser le nom du service Docker au lieu de localhost
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://backend:5000', // Ajouter un proxy pour les uploads
        changeOrigin: true,
      }
    },
  },
  preview: {
    host: '0.0.0.0', // Également nécessaire pour le mode preview
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://backend:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://backend:5000',
        changeOrigin: true,
      }
    },
  },
})