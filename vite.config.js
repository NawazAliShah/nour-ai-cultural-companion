import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/chatWithGemini': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/chatWithGemini', '/asia-south1-NOUR_PROJECT/chatWithGemini')
      }
    }
  }
});
