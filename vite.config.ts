import path from 'path'

import { defineConfig, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import copy from 'rollup-plugin-copy'

// https://vite.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  return {
    base: './',
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
      copy({
        targets: [{ src: './project-zzz/dist/*', dest: './dist/project-zzz/dist' }],
        verbose: true,
        hook: 'writeBundle',
      }),
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
        external: [/project-zzz/],
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
          async customResolver(source, importer) {
            let resolvedPath = ''
            const isAdditionalData = ['@/assets/styles/mixins.scss', '@/assets/styles/colors.scss', '@/assets/styles/variables.scss'].includes(source)
            /** Modify Alias based on Nested Module */
            if (importer?.includes('/project-zzz')) {
              if (!isAdditionalData) resolvedPath = path.resolve(source.replace('@/', './project-zzz/src/'))
            } else resolvedPath = path.resolve(source.replace('@/', './src/'))
            /** Return using Vite/RollupOptions resolve handler
             * https://rollupjs.org/plugin-development/#this-resolve
             */
            return (await this.resolve(resolvedPath))?.id
          },
        },
        {
          find: /^@zzz\//,
          replacement: '@zzz/',
          async customResolver(source) {
            const target = mode === 'production' ? '/project-zzz/dist/src/' : '/project-zzz/src/'
            const resolvedPath = path.resolve(source.replace('@zzz/', target))
            return (await this.resolve(resolvedPath))?.id
          },
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
    assetsInclude: ['**/assets/**/*.[svg|webp]', '**/project-zzz/assets/**/*.[svg|webp]', '**/project-zzz/dist/**/*'],
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
