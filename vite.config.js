// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    https: false,  // Sử dụng HTTP thay vì HTTPS trong môi trường dev
    proxy: {
      '/api': {
        target: 'http://3.25.162.185:8080/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
