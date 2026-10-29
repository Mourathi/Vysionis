// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  // Domínio oficial do site (usado em canonical, sitemap e URLs de Open Graph).
  site: 'https://www.vysionis.com.br',
  integrations: [react(), sitemap()],
})
