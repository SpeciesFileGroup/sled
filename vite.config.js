import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  plugins: [vue()],

  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/main.js'),
      name: 'sled',
      fileName: 'sled'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
