import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const basePath = process.env.VITE_BASE_PATH ?? '/'
const isSubPath = basePath !== '/'

export default defineConfig({
  base: basePath,
  resolve: { tsconfigPaths: true },
  plugins: [
    nitro(isSubPath ? {
      prerender: { routes: [basePath], crawlLinks: false },
    } : {}),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})
