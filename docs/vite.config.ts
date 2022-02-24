import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import mdx from '@mdx-js/rollup'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mdx()],
  resolve: {
    alias: {
      lib: resolve(__dirname, 'src/lib'),
      routes: resolve(__dirname, 'src/routes'),
      '@': resolve(__dirname, 'src/'),
      // https://github.com/brillout/vite-plugin-mdx/issues/44
      'react/jsx-runtime': 'react/jsx-runtime.js',
    },
  },
})
