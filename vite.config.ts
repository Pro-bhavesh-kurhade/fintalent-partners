import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages serves this project from /fintalent-partners/ rather than the domain root.
  base: process.env.GITHUB_ACTIONS === 'true' ? '/fintalent-partners/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, '.'),
    },
  },
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@supabase')) return 'supabase';
          if (id.includes('node_modules/motion') || id.includes('framer-motion')) return 'motion';
          if (id.includes('node_modules/react')) return 'vendor';
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
