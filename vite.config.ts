import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    }),
    vueDevTools()
  ],
  assetsInclude: ['**/assets/*.svg'],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@zzz': fileURLToPath(new URL('./ZZZ/src', import.meta.url))
    }
  },
  build: {
    // rest of build configuration
    rollupOptions: {
      input: {
        app: './index.html',
        'project-zzz': './ZZZ/src/main.ts'
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/styles/_mixins.scss" as *;
          @use "@/assets/styles/_colors.scss" as *;
          @use "@/assets/styles/_variables.scss" as *;
        `,
        api: 'modern-compiler' // or "modern"
      }
    }
  }
})
