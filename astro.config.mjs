// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  // Domínio oficial do site (usado em canonical, sitemap e URLs de Open Graph).
  site: 'https://vysionis.com',
  integrations: [react(), sitemap()],
  vite: {
    // O three só é usado na /trinco: sem isto o servidor de desenvolvimento o descobre
    // na hora, refaz o pacote de dependências e o navegador recebe
    // "504 (Outdated Optimize Dep)". Pré-empacotado já na partida, isso não acontece.
    optimizeDeps: { include: ['three'] },
  },
})
