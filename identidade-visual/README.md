# Identidade Visual — Vysionis

Este documento descreve a identidade visual do sistema Vysionis para manter consistência em todas as interfaces e materiais.

---

## Índice

1. [Cores](#cores)
2. [Tipografia](#tipografia)
3. [Logo](#logo)
4. [Espaçamento e Layout](#espaçamento-e-layout)
5. [Componentes](#componentes)

---

## Cores

### Paleta Principal

| Nome | Hex | Uso |
|------|-----|-----|
| Purple | `#8B3FD9` | Cor primária, destaques, botões, bordas |
| Blue | `#2563EB` | Cor secundária, gradiente |
| Dark BG | `#0a0a0f` | Fundo principal |
| Card BG | `#131318` | Fundo de cards e superfícies |
| Text Gray | `#9ca3af` | Texto secundário |

### Gradiente Principal

```
linear-gradient(135deg, #8B3FD9 0%, #2563EB 100%)
```

Usado em: títulos, botões primários, logo, links de destaque.

### Variáveis CSS

```css
--purple: #8B3FD9;
--blue: #2563EB;
--dark-bg: #0a0a0f;
--card-bg: #131318;
--text-gray: #9ca3af;
--gradient: linear-gradient(135deg, #8B3FD9 0%, #2563EB 100%);
```

---

## Tipografia

### Família de Fontes

- **Principal:** Inter, system-ui, Avenir, Helvetica, Arial, sans-serif

### Pesos Utilizados

| Peso | Valor | Uso |
|------|-------|-----|
| Regular | 400 | Corpo de texto |
| Medium | 500 | Links de navegação |
| Semi-bold | 600 | Botões |
| Bold | 700 | Subtítulos |
| Extra-bold | 800 | Títulos principais |

### Tamanhos de Referência

- Título Hero: 4rem (mobile: 2.5rem)
- Título de seção: 3rem (mobile: 2rem)
- Subtítulo: 1.2rem
- Texto corpo: 1rem
- Logo no header: 1.5rem

---

## Logo

### Conceito

O logo representa um "V" com 24 linhas radiantes que formam um padrão de visão/visão. O gradiente roxo-azul transmite tecnologia e inovação.

### Uso

- **Logo completa:** Logo + texto "VYSIONIS"
- **Logo isolado:** Apenas o símbolo (SVG) para favicon e ícones
- **Espaço mínimo:** Manter área respiração ao redor do logo

### Arquivos

- `logo/logo.svg` — Logo completo em SVG
- `logo/logo-favicon.svg` — Versão para favicon (mesmo arquivo)

---

## Espaçamento e Layout

### Container

- `max-width: 1200px`
- `padding: 0 2rem`

### Seções

- `padding: 6rem 0` (mobile: 4rem 0)

### Border Radius

- Botões e cards: `0.5rem`
- Bordas: `2px`

---

## Componentes

### Botões

- **Primário:** Gradiente, hover com sombra
- **Outline:** Borda roxa, fundo transparente, hover preenche

### Cards

- Fundo: `#131318`
- Bordas sutis com `rgba(139, 63, 217, 0.2)`

### Links

- Cor: `#9ca3af`
- Hover: Branco
- Sublinhado: Gradiente animado

---

## Efeitos e Transições

- `transition: all 0.3s ease` — padrão para interações
- `drop-shadow` roxo no logo para hover
