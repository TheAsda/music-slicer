import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NgmiPolyfill } from 'vite-plugin-ngmi-polyfill';

export default defineConfig({
  plugins: [react(), NgmiPolyfill()],
});
