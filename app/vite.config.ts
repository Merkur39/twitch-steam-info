import { defineConfig } from 'vite'
import { resolve } from 'path'
import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import manifest from './manifest.json'

const isDevelopment = process.env.__ENV__ === 'DEVELOPMENT'
const rootDir = resolve(__dirname, 'src')
const publicDir = resolve(__dirname, 'public')
const outDir = resolve(__dirname, 'dist')

export default defineConfig({
  resolve: {
    alias: { src: rootDir },
  },
  plugins: [react(), crx({ manifest })],
  publicDir,
  build: {
    sourcemap: isDevelopment,
    emptyOutDir: !isDevelopment,
    outDir,
  },
})
