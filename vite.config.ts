import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000, // Change to any port that is not 5000 or in use by other processes
  },
  plugins: [react()],
  base: '/tru/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
