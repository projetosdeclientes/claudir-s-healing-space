import { defineConfig } from '@tanstack/start/config'
import netlify from '@netlify/plugin-tanstack-start'

export default defineConfig({
  server: {
    preset: 'netlify',
  },
  tsr: {
    appDirectory: 'src',
  },
  vite: {
    plugins: [],
  },
})