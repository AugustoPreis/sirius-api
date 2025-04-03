import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './dist',
    emptyOutDir: true,
  },
  server: {
    port: 4000,
    proxy: {
      '^/v1': {
        target: 'localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});