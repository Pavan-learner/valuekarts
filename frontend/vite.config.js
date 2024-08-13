import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          return 'main';
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Adjust the chunk size warning limit to 1000 kB
  }
});
