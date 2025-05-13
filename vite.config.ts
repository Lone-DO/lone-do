import path from 'path'

import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  return {
    esbuild: {
      // Remove debugger statements in production
      drop: mode === 'production' ? ['debugger'] : [],
    },
    server: {
      port: 8080,
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            // treat all tags with a dash as custom elements
            isCustomElement: (tag) => tag.includes('project-'),
          },
        },
      }),
      vueDevTools(),
    ],
    build: {
      emptyOutDir: true,
      minify: false,
      sourcemap: true,
      rollupOptions: {
        input: {
          app: './index.html',
          portfolio: './src/main.ts',
        },
        external: [/ZZZ/],
        output: {
          name: 'portfolio',
          entryFileNames: (chunk) => `${[chunk.name]}.js`,
        },
      },
    },
    resolve: {
      alias: [
        {
          find: /^@\//,
          replacement: '@/',
          async customResolver(source) {
            let resolvedPath = ''
            /** Modify Alias based on Nested Module */
            resolvedPath = path.resolve(source.replace('@/', './src/'))
            /** Return using Vite/RollupOptions resolve handler
             * https://rollupjs.org/plugin-development/#this-resolve
             */
            return (await this.resolve(resolvedPath))?.id
          },
        },
        {
          find: /^@zzz/,
          replacement: '/ZZZ/dist',
        },
        {
          find: /^@assets\//,
          replacement: '@/assets',
        },
        {
          find: /^@components\//,
          replacement: '@/components',
        },
      ],
    },
    assetsInclude: ['**/assets/**/*.[svg|webp]', '**/ZZZ/assets/**/*.[svg|webp]'],
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/assets/styles/_mixins.scss" as *;
          @use "@/assets/styles/_colors.scss" as *;
          @use "@/assets/styles/_variables.scss" as *;
        `,
          api: 'modern-compiler', // or "modern"
        },
      },
    },
  }
})
