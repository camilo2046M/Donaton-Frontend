import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Todas las llamadas a /api/* se redirigen al BFF en localhost:8080
      // El browser ve localhost:5173/api/... → Vite reenvía a localhost:8080/api/...
      // Esto elimina el problema de CORS en desarrollo
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});