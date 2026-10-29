# Vysionis

Site institucional da Vysionis, feito com [Astro](https://astro.build) e componentes React.
O resultado é um site estático (HTML pronto para SEO). Só o header, o botão de tema,
a barra de progresso e o formulário de contato carregam JavaScript.

## Comandos

| Comando           | O que faz                                  |
| ----------------- | ------------------------------------------ |
| `npm install`     | Instala as dependências                    |
| `npm run dev`     | Servidor local em `http://localhost:4321`  |
| `npm run build`   | Gera o site estático em `dist/`            |
| `npm run preview` | Serve o `dist/` localmente                 |
| `npm run lint`    | Roda o ESLint                              |

## Estrutura

```
public/             arquivos servidos como estão (logo, og-image, robots.txt)
src/pages/          páginas (index.astro)
src/layouts/        layout global: SEO, Open Graph, dados estruturados, tema
src/components/     seções do site (React + CSS)
identidade-visual/  guia de marca: cores, tipografia, logo
```

O domínio usado no canonical, no sitemap e no Open Graph é configurado em `astro.config.mjs`.
