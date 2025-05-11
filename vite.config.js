import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  define: {
    // Make sure env variables are properly stringified
    'import.meta.env.VITE_APP_API_URL': JSON.stringify(process.env.VITE_APP_API_URL || 'http://localhost:5000')
  }
});