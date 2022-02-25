import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'
import { resolve } from 'path'
import { defineConfig } from 'vite'

const commitHash = execSync('git rev-parse --short HEAD').toString()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    COMMIT_HASH: JSON.stringify(commitHash),
  },
  resolve: {
    alias: {
      lib: resolve(__dirname, 'src/lib'),
      routes: resolve(__dirname, 'src/routes'),
      '@': resolve(__dirname, 'src/'),
    },
  },
})
