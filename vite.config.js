import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Chorus Soranus App',
        short_name: 'Chorus Soranus',
        description: 'Applikation til Chorus Soranus',
        icons: [
          {
            src: '/cs_512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'  
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
