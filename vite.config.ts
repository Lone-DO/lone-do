import path from 'path'

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
  server: {
    port: 8080
  },
  build: {
    minify: false,
    sourcemap: true,
    // rest of build configuration
    rollupOptions: {
      input: {
        app: './index.html',
        portfolio: './src/main.js',
        'project-zzz': './ZZZ/src/main.ts'
      },
      external: [
        // /node_modules/
      ]
    }
  },
  resolve: {
    alias: [
      {
        find: /^@\//,
        replacement: '@/',
        async customResolver(source, importer) {
          let resolvedPath = ''
          const isAdditionalData = [
            '@/assets/styles/mixins.scss',
            '@/assets/styles/colors.scss',
            '@/assets/styles/variables.scss'
          ].includes(source)
          /** Modify Alias based on Nested Module */
          if (importer?.includes('/ZZZ') && !isAdditionalData) {
            resolvedPath = path.resolve(source.replace('@/', './ZZZ/src/'))
          } else resolvedPath = path.resolve(source.replace('@/', './src/'))
          /** Return using Vite/RollupOptions resolve handler
           * https://rollupjs.org/plugin-development/#this-resolve
           */
          return (await this.resolve(resolvedPath))?.id
        }
      },
      {
        find: /^@zzz/,
        replacement: '/ZZZ'
      },
      {
        find: /^@assets\//,
        replacement: '@/assets',
        async customResolver(source, importer) {
          let resolvedPath = ''
          /** Modify Alias based on Nested Module */
          if (importer?.includes('/ZZZ'))
            resolvedPath = path.resolve(source.replace('@assets/', './ZZZ/src/assets'))
          else resolvedPath = path.resolve(source.replace('@assets/', './src/assets'))
          return (await this.resolve(resolvedPath))?.id
        }
      },
      {
        find: /^@components\//,
        replacement: '@/components',
        async customResolver(source, importer) {
          let resolvedPath = ''
          /** Modify Alias based on Nested Module */
          if (importer?.includes('/ZZZ'))
            resolvedPath = path.resolve(source.replace('@components/', './ZZZ/src/components'))
          else resolvedPath = path.resolve(source.replace('@components/', './src/components'))
          return (await this.resolve(resolvedPath))?.id
        }
      }
    ]
  },
  // assetsInclude: ['**/assets/**/*.[svg|webp]'],
  css: {
    devSourcemap: true,
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
