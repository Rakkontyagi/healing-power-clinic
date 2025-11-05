import { defineConfig } from 'vite'
import path from 'path'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  base: '/',
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2015',
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        blog: resolve(__dirname, 'blog.html'),
        contact: resolve(__dirname, 'contact.html'),
        physiotherapy: resolve(__dirname, 'physiotherapy-clinic-sonipat.html'),
        panchakarma: resolve(__dirname, 'panchakarma-therapy-clinic-sonipat.html'),
        acupressure: resolve(__dirname, 'acupressure-clinic-sonipat.html'),
        ayurvedic: resolve(__dirname, 'ayurvedic-treatment-sonipat.html'),
        sciatica: resolve(__dirname, 'conditions/sciatica-treatment-sonipat.html'),
        slipDisc: resolve(__dirname, 'conditions/slip-disc-treatment-sonipat.html'),
        kneePain: resolve(__dirname, 'conditions/knee-pain-arthritis-treatment-sonipat.html'),
        cervical: resolve(__dirname, 'conditions/cervical-spondylosis-treatment-sonipat.html'),
        lumbar: resolve(__dirname, 'conditions/lumbar-spondylosis-treatment-sonipat.html'),
        frozenShoulder: resolve(__dirname, 'conditions/frozen-shoulder-treatment-sonipat.html'),
        headache: resolve(__dirname, 'conditions/headache-migraine-treatment-sonipat.html'),
        stroke: resolve(__dirname, 'conditions/stroke-rehabilitation-sonipat.html'),
        facialPalsy: resolve(__dirname, 'conditions/facial-palsy-bells-palsy-treatment-sonipat.html'),
        stress: resolve(__dirname, 'conditions/stress-anxiety-management-sonipat.html'),
        weightLoss: resolve(__dirname, 'conditions/weight-loss-therapy-sonipat.html'),
        sportsInjury: resolve(__dirname, 'conditions/sports-injury-rehabilitation-sonipat.html'),
      },
      external: ['assets/js/main.js'],
      output: {
        assetFileNames: (assetInfo) => {
          // Keep the original structure for assets
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/css/[name][extname]';
          }
          if (assetInfo.name?.endsWith('.js')) {
            return 'assets/js/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
      },
    },
    copyPublicDir: false,
  },
  publicDir: 'assets',
  server: {
    port: 8080,
    host: true,
  },
})