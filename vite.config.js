import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Himnario EECH',
        short_name: 'Himnario',
        theme_color: '#0f1a2b',
        background_color: '#0b1220',
        icons: [{ src: '/logoEECH.png', sizes: '192x192', type: 'image/png' }]
      }
    })
  ]
})
