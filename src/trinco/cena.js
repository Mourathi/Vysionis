/* Trinco — "um dia na portaria", numa cena 3D.

   Um condomínio low-poly: prédio, guarita com o logo, cancela, portão de pedestres,
   estacionamento, salão de festas com churrasqueira e piscina. A rolagem anda o relógio
   (6h → 23h) e leva a câmera pelos capítulos da página (seções com data-cap):
   o carro do morador entra pela cancela, as encomendas chegam e o aviso voa até o
   apartamento, a visita passa pelo portão, os balões aparecem no salão, os porteiros
   trocam de turno por dentro do condomínio, as janelas acendem e, de noite, um cofre de luz sobe do muro.
   As telas dos cartões mudam no mesmo instante em que a cena acontece (ROTEIRO).

   Tudo é geometria simples com sombreado chapado (sem arquivos de modelo).
   Sem WebGL, o céu em CSS (.tr-ceu) acompanha o relógio e a página funciona igual.
   Com movimento reduzido, a câmera fica parada e só a luz do dia muda. */

import {
  BackSide,
  BoxGeometry,
  BufferGeometry,
  CanvasTexture,
  CapsuleGeometry,
  CatmullRomCurve3,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  Float32BufferAttribute,
  Fog,
  Group,
  HemisphereLight,
  IcosahedronGeometry,
  InstancedMesh,
  Line,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  Object3D,
  PCFShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  QuadraticBezierCurve3,
  RingGeometry,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three'

const html = document.documentElement
const $ = (s) => document.querySelector(s)
const $$ = (s) => [...document.querySelectorAll(s)]
const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches
const telaPequena = matchMedia('(max-width: 760px)')

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const lerp = (a, b, t) => a + (b - a) * t
const suave = (a, b, x) => {
  const t = clamp((x - a) / (b - a))
  return t * t * (3 - 2 * t)
}
/** 0 → 1 entre a e b, volta a 0 entre c e d */
const janela = (x, a, b, c, d) => suave(a, b, x) * (1 - suave(c, d, x))

/** Aleatório com semente: a cena sai igual em toda visita */
function semente(s) {
  return () => {
    s |= 0
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* ---------- Câmera de cada capítulo (id da seção → quadro) ----------
   pos/alvo em metros; o prédio fica em x 0, z -8..0; a rua passa em z 16. */
const QUADROS = {
  inicio: { pos: [36, 20, 46], alvo: [0, 12, -2] },
  // Pela esquerda: o carro entra pela cancela sem passar "atrás" da guarita
  entradas: { pos: [-5, 6, 27], alvo: [6, 1.8, 10] },
  // Guarita e janela do Apto 32 no mesmo quadro: o aviso voa inteiro na tela
  encomendas: { pos: [23, 7.5, 23], alvo: [6.5, 4.8, 6.5] },
  visitas: { pos: [-11, 6.5, 16], alvo: [0.8, 1.2, 4.8] },
  areas: { pos: [-27, 8.5, 19], alvo: [-12, 2, 2] },
  // Por dentro do condomínio: a câmera passa por cima do muro, acompanha o porteiro da
  // noite do portão de pedestres até a guarita (via + segue) e para atrás dela, de frente
  // para a porta do fundo. Caminho conferido contra árvores, balões, carros e muro.
  livro: {
    via: { pos: [-0.4, 4.35, 4.95], alvo: [3.1, 4.4, 11.7] },
    segue: { quem: 'noite', forca: 0.74, janela: [0.2, 0.42, 0.78, 0.97] },
    pos: [15, 4.9, 2.5],
    alvo: [4.5, -1.5, 12.9],
  },
  // Sai do lote subindo por cima da árvore do canto, sem olhar para o chão, ainda vendo o
  // porteiro da tarde ir embora pelo portão; o prédio entra no quadro no caminho
  perfis: {
    via: { pos: [13.2, 16, 15.1], alvo: [3.9, 11.8, -3.1] },
    segue: { quem: 'tarde', forca: 0.42, janela: [0, 0.12, 0.3, 0.5] },
    pos: [-18, 16, 26],
    alvo: [0, 13, -4],
  },
  seguranca: { pos: [44, 44, 50], alvo: [0, 12, -2] },
  planos: { pos: [-40, 24, 46], alvo: [0, 14, -2] },
}

/* ---------- Roteiro: em que ponto da rolagem cada coisa acontece ----------
   p é o capítulo contínuo (1 = Entradas, 2 = Encomendas, 2,5 = no meio do caminho).
   As telas dos cartões (data-evento) mudam nesses mesmos pontos e mostram a hora
   que o relógio marcava naquele instante, então cena, cartão e relógio sempre batem. */
const ROTEIRO = {
  entrega: 1.42, // entregador passa a caixa pela janela da guarita
  visitaPortao: 2.72, // a visita passa pelo portão de pedestres
  reserva: 3.85, // o síndico aprova a reserva do salão e os balões aparecem
  turno: 4.9, // o porteiro da noite chega e assume o turno
}
const EVENTOS = {
  encomenda: ROTEIRO.entrega,
  visita: ROTEIRO.visitaPortao,
  reserva: ROTEIRO.reserva,
  turno: ROTEIRO.turno,
}

/** Distância (no chão) do ponto até o caminho da câmera: nada alto pode ficar colado nela */
const TRILHA = Object.values(QUADROS).flatMap((q) => (q.via ? [q.via.pos, q.pos] : [q.pos]))

/** Curva que sai de a, passa por m na metade (t = 0,5) e chega em b */
function pelaVia(saida, a, m, b, t) {
  const u = 1 - t
  for (let k = 0; k < 3; k++) {
    const c = 2 * m[k] - (a[k] + b[k]) / 2
    saida.setComponent(k, u * u * a[k] + 2 * u * t * c + t * t * b[k])
  }
  return saida
}
function distanciaDaTrilha(x, z) {
  let menor = Infinity
  for (let i = 0; i < TRILHA.length; i++) {
    const [ax, , az] = TRILHA[i]
    const [bx, , bz] = TRILHA[(i + 1) % TRILHA.length]
    const dx = bx - ax
    const dz = bz - az
    const t = clamp(((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz || 1))
    menor = Math.min(menor, Math.hypot(x - (ax + dx * t), z - (az + dz * t)))
  }
  return menor
}

/* ---------- Céu: cor do alto e do horizonte conforme a hora ---------- */
const CEU = [
  [5, '#2a3a78', '#e6a08a'],
  [6, '#7e9fe0', '#fbd3b5'],
  [8, '#5d93ea', '#cfe3fa'],
  [12, '#3f82ee', '#d6e8fc'],
  [16, '#4f86e0', '#e9e1d2'],
  [17.6, '#4a6bc8', '#f7c49a'],
  [18.6, '#2f3f8e', '#f08f73'],
  [19.5, '#1a2560', '#5b4f8a'],
  [21, '#0a1238', '#1c2552'],
  [24, '#050a22', '#0d1638'],
].map(([h, topo, base]) => ({ h, topo: new Color(topo), base: new Color(base) }))

function corDoCeu(h, topo, base) {
  let i = 0
  while (i < CEU.length - 2 && h > CEU[i + 1].h) i++
  const a = CEU[i]
  const b = CEU[i + 1]
  const t = clamp((h - a.h) / (b.h - a.h))
  topo.lerpColors(a.topo, b.topo, t)
  base.lerpColors(a.base, b.base, t)
}

/* =====================================================================
   Rolagem → capítulo e hora (vale com ou sem 3D)
   ===================================================================== */

const secoes = $$('[data-cap]')
const ids = secoes.map((s) => s.dataset.cap)
const horas = secoes.map((s) => parseFloat(s.dataset.hora))
const lados = secoes.map((s) => s.dataset.lado)
const leitura = $('.tr-leitura')
let marcos = []
let topos = []
let inicioLeitura = Infinity

/** Rolagem em que o cartão de cada capítulo fica na altura certa da tela */
function medir() {
  topos = secoes.map((s) => s.getBoundingClientRect().top + scrollY)
  const alvoY = telaPequena.matches ? 0.58 : 0.5
  marcos = secoes.map((s, i) => {
    if (i === 0) return 0
    const el = s.firstElementChild
    const r = el.getBoundingClientRect()
    return r.top + scrollY + r.height / 2 - innerHeight * alvoY
  })
  // Garante ordem crescente (evita divisão por zero em telas muito altas)
  for (let i = 1; i < marcos.length; i++) marcos[i] = Math.max(marcos[i], marcos[i - 1] + 1)
  inicioLeitura = leitura ? leitura.getBoundingClientRect().top + scrollY : Infinity
}

/** Posição contínua na história: 2.5 = no meio entre o capítulo 2 e o 3 */
function progresso(y) {
  const n = marcos.length
  if (y <= marcos[0]) return 0
  for (let i = 0; i < n - 1; i++) {
    if (y < marcos[i + 1]) return i + (y - marcos[i]) / (marcos[i + 1] - marcos[i])
  }
  return n - 1
}

/** Hora do relógio num ponto p da história */
function horaNoP(p) {
  const i = Math.min(Math.floor(p), horas.length - 1)
  const f = p - i
  return i < horas.length - 1 ? lerp(horas[i], horas[i + 1], f) : horas[i]
}

function horaEm(p, y) {
  // Depois dos planos, o relógio ainda anda até 23h30 enquanto a leitura sobe
  const extra = clamp((y - marcos[marcos.length - 1]) / (innerHeight * 1.5))
  return horaNoP(p) + extra * (23.5 - horas[horas.length - 1])
}

const formatarHora = (h) => {
  const minutos = Math.floor(clamp(h, 0, 23.99) * 60)
  return `${String(Math.floor(minutos / 60)).padStart(2, '0')}:${String(minutos % 60).padStart(2, '0')}`
}

/* ---------- Telas dos cartões que reagem à cena ----------
   Cada [data-evento] ganha .e-aconteceu quando a história passa do ponto dele, e os
   [data-evento-hora] de dentro mostram a hora do relógio naquele instante. Voltando a
   rolagem, a tela volta ao estado anterior. */
const eventos = $$('[data-evento]')
  .filter((el) => EVENTOS[el.dataset.evento] !== undefined)
  .map((el) => {
    const p = EVENTOS[el.dataset.evento]
    el.querySelectorAll('[data-evento-hora]').forEach((s) => (s.textContent = formatarHora(horaNoP(p))))
    return { el, p, feito: null }
  })

function atualizarEventos(p) {
  for (const ev of eventos) {
    const feito = p >= ev.p
    if (feito !== ev.feito) {
      ev.el.classList.toggle('e-aconteceu', feito)
      ev.feito = feito
    }
  }
}

/* ---------- HUD ---------- */
const hud = {
  hora: $('[data-hud-hora]'),
  cap: $('[data-hud-cap]'),
  icone: $('[data-hud-icone]'),
  preenche: $('[data-hud-preenche]'),
  dica: $('[data-hud-dica]'),
  marcos: $$('[data-hud-marco]'),
}
const nomes = hud.marcos.map((m) => m.title)
let hudAnterior = { texto: '', cap: -1, noite: null, lendo: null, dica: null }

function atualizarHud(p, h, y) {
  const texto = formatarHora(h)
  if (texto !== hudAnterior.texto) {
    hud.hora.textContent = texto
    hudAnterior.texto = texto
  }
  // Capítulo atual = a seção que está no meio da tela (bate com o título que se vê)
  const meio = y + innerHeight * 0.5
  let atual = 0
  for (let i = 0; i < topos.length; i++) if (meio >= topos[i]) atual = i
  if (atual !== hudAnterior.cap) {
    hud.cap.textContent = nomes[atual] ?? ''
    hud.marcos.forEach((m, i) => {
      m.classList.toggle('e-atual', i === atual)
      m.classList.toggle('e-passou', i < atual)
    })
    hudAnterior.cap = atual
  }
  hud.preenche.style.transform = `scaleX(${(p / (hud.marcos.length - 1)).toFixed(4)})`
  const noite = h >= 18.6 || h < 5.8
  if (noite !== hudAnterior.noite) {
    hud.icone.classList.toggle('e-noite', noite)
    hudAnterior.noite = noite
  }
  const lendo = y + innerHeight * 0.55 > inicioLeitura
  if (lendo !== hudAnterior.lendo) {
    html.classList.toggle('tr-lendo', lendo)
    hudAnterior.lendo = lendo
  }
  const dica = y > 40
  if (dica !== hudAnterior.dica) {
    hud.dica.classList.toggle('e-some', dica)
    hudAnterior.dica = dica
  }
}

/* ---------- Cartões aparecem ao entrar na tela ---------- */
function revelar() {
  const alvos = $$('.cap-cartao, .passos')
  if (reduzido || !('IntersectionObserver' in window)) {
    alvos.forEach((el) => el.classList.add('e-visivel'))
    return
  }
  const io = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (e.isIntersecting) {
          e.target.classList.add('e-visivel')
          io.unobserve(e.target)
        }
      }
    },
    { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
  )
  alvos.forEach((el) => io.observe(el))
}

/* ---------- Abertura: o T destrava e a pupila abre para a cena ----------
   Espera a sequência do logo (olho abre, olha, lingueta destrava) e a cena estar
   desenhada; o que vier por último libera. Nunca prende a página por mais de 5,5 s. */
let instantePronto = null
function abrir(cenaPronta) {
  const liberar = () => {
    if (instantePronto !== null) return
    instantePronto = performance.now()
    html.classList.add('tr-pronto')
  }
  if (reduzido) {
    liberar()
    return
  }
  const sequenciaDoLogo = new Promise((r) => setTimeout(r, 1650))
  Promise.all([sequenciaDoLogo, cenaPronta]).then(liberar)
  setTimeout(liberar, 5500)
}

/* =====================================================================
   A cena 3D
   ===================================================================== */

function desenharLogo() {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const g = c.getContext('2d')
  const azul = '#004BEA'
  g.scale(2, 2)
  g.fillStyle = azul
  g.beginPath()
  if (g.roundRect) g.roundRect(0, 0, 128, 128, 15)
  else g.rect(0, 0, 128, 128)
  g.fill()
  g.translate(22, 20.6)
  g.scale(0.84, 0.84)
  g.fillStyle = '#fff'
  g.fill(new Path2D('M34.4 9.7V4.8A4.8 4.8 0 0 1 39.2 0H60.8A4.8 4.8 0 0 1 65.6 4.8V9.7Z'))
  g.fill(new Path2D('M5 13.2H95A5 5 0 0 1 100 18.2V40.6A5 5 0 0 1 95 45.6H63V100A5.5 5.5 0 0 1 57.5 105.5H42.5A5.5 5.5 0 0 1 37 100V45.6H5A5 5 0 0 1 0 40.6V18.2A5 5 0 0 1 5 13.2Z'))
  g.fillStyle = azul
  g.fill(new Path2D('M24.2 29.5C31 21.4 40 16.3 50 16.3S69 21.4 75.8 29.5C69 37.6 60 42.8 50 42.8S31 37.6 24.2 29.5Z'))
  const circulo = (x, y, r, cor) => {
    g.fillStyle = cor
    g.beginPath()
    g.arc(x, y, r, 0, Math.PI * 2)
    g.fill()
  }
  circulo(50, 29.6, 10.7, '#fff')
  circulo(53.9, 24.8, 4.4, azul)
  circulo(50, 78.7, 6.3, azul)
  g.fill(new Path2D('M46.7 83H53.3L55.1 96.6H44.9Z'))
  const tex = new CanvasTexture(c)
  tex.colorSpace = SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

/** Janelas acesas dos prédios vizinhos (textura de emissão) */
function desenharJanelasVizinhas(rnd) {
  const c = document.createElement('canvas')
  c.width = 64
  c.height = 128
  const g = c.getContext('2d')
  g.fillStyle = '#000'
  g.fillRect(0, 0, 64, 128)
  for (let y = 4; y < 128; y += 10) {
    for (let x = 4; x < 64; x += 10) {
      if (rnd() < 0.42) {
        g.fillStyle = rnd() < 0.8 ? '#ffd27a' : '#bfd6ff'
        g.fillRect(x, y, 5, 6)
      }
    }
  }
  const tex = new CanvasTexture(c)
  tex.colorSpace = SRGBColorSpace
  return tex
}

/** Anda por uma linha de pontos [x, z]; devolve posição e direção */
function caminho(pontos) {
  const seg = []
  let total = 0
  for (let i = 0; i < pontos.length - 1; i++) {
    const [ax, az] = pontos[i]
    const [bx, bz] = pontos[i + 1]
    const L = Math.hypot(bx - ax, bz - az)
    seg.push({ ax, az, bx, bz, L, ini: total })
    total += L
  }
  return (t) => {
    const d = clamp(t) * total
    let s = seg[seg.length - 1]
    for (const k of seg) {
      if (d <= k.ini + k.L) {
        s = k
        break
      }
    }
    const f = s.L ? (d - s.ini) / s.L : 0
    return { x: lerp(s.ax, s.bx, f), z: lerp(s.az, s.bz, f), ang: Math.atan2(s.bx - s.ax, s.bz - s.az) }
  }
}

function montarCena(canvas) {
  let renderer
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' })
  } catch {
    return null
  }
  if (!renderer.getContext()) return null

  const pequeno = telaPequena.matches
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, pequeno ? 1.5 : 1.75))
  renderer.shadowMap.enabled = !pequeno
  renderer.shadowMap.type = PCFShadowMap

  const cena = new Scene()
  const camera = new PerspectiveCamera(38, 1, 0.5, 900)
  const rnd = semente(20261105)

  const CAIXA = new BoxGeometry(1, 1, 1)
  const mats = new Map()
  const mat = (cor) => {
    if (!mats.has(cor)) mats.set(cor, new MeshLambertMaterial({ color: cor }))
    return mats.get(cor)
  }
  /** Caixa com a base em y (não o centro) */
  const caixa = (w, h, d, cor, x, y, z, pai = cena) => {
    const m = new Mesh(CAIXA, typeof cor === 'string' ? mat(cor) : cor)
    m.scale.set(w, h, d)
    m.position.set(x, y + h / 2, z)
    pai.add(m)
    return m
  }
  const vidro = new MeshLambertMaterial({ color: '#bcd7f2', transparent: true, opacity: 0.32, depthWrite: false })

  /* ---------- Céu, estrelas e neblina ---------- */
  const ceuMat = new ShaderMaterial({
    uniforms: {
      topo: { value: new Color() },
      base: { value: new Color() },
      dirSol: { value: new Vector3(0, 1, 0) },
      brilhoSol: { value: 0 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 topo;
      uniform vec3 base;
      uniform vec3 dirSol;
      uniform float brilhoSol;
      varying vec3 vDir;
      void main() {
        vec3 d = normalize(vDir);
        float h = clamp(d.y * 1.6 + 0.06, 0.0, 1.0);
        vec3 c = mix(base, topo, pow(h, 0.75));
        float s = max(dot(d, normalize(dirSol)), 0.0);
        c += vec3(1.0, 0.85, 0.62) * (pow(s, 400.0) * 1.4 + pow(s, 14.0) * 0.16) * brilhoSol;
        gl_FragColor = vec4(c, 1.0);
        #include <colorspace_fragment>
      }`,
    side: BackSide,
    depthWrite: false,
    fog: false,
  })
  const ceu = new Mesh(new SphereGeometry(600, 32, 16), ceuMat)
  ceu.renderOrder = -1
  cena.add(ceu)

  const posEstrelas = []
  for (let i = 0; i < 700; i++) {
    const u = rnd() * Math.PI * 2
    const y = 0.1 + rnd() * 0.88
    const k = Math.sqrt(1 - y * y)
    posEstrelas.push(Math.cos(u) * k * 550, y * 550, Math.sin(u) * k * 550)
  }
  const geoEstrelas = new BufferGeometry()
  geoEstrelas.setAttribute('position', new Float32BufferAttribute(posEstrelas, 3))
  const matEstrelas = new PointsMaterial({
    color: '#ffffff',
    size: pequeno ? 1.4 : 1.8,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0,
    fog: false,
    depthWrite: false,
  })
  const estrelas = new Points(geoEstrelas, matEstrelas)
  cena.add(estrelas)

  cena.fog = new Fog('#ffffff', 95, 340)

  /* ---------- Luzes ---------- */
  const hemi = new HemisphereLight('#ffffff', '#5d6b4c', 1.2)
  cena.add(hemi)
  const sol = new DirectionalLight('#ffffff', 2.5)
  sol.castShadow = true
  sol.shadow.mapSize.set(2048, 2048)
  Object.assign(sol.shadow.camera, { left: -50, right: 50, top: 50, bottom: -50, near: 1, far: 300 })
  sol.shadow.bias = -0.0004
  sol.shadow.normalBias = 0.03
  cena.add(sol, sol.target)
  const lua = new DirectionalLight('#9db0ff', 0)
  lua.position.set(-60, 80, -30)
  cena.add(lua)

  /* ---------- Chão, rua e lote ---------- */
  const chao = new Mesh(new PlaneGeometry(1600, 1600), mat('#93c07c'))
  chao.rotation.x = -Math.PI / 2
  cena.add(chao)

  caixa(1600, 0.06, 8, '#3d4454', 0, 0, 16)
  const faixas = new InstancedMesh(CAIXA, mat('#f4f1e6'), 140)
  const d0 = new Object3D()
  for (let i = 0; i < 140; i++) {
    d0.position.set(-420 + i * 6, 0.07, 16)
    d0.scale.set(2.6, 0.02, 0.22)
    d0.updateMatrix()
    faixas.setMatrixAt(i, d0.matrix)
  }
  cena.add(faixas)
  caixa(1600, 0.22, 1.7, '#d9d5cc', 0, 0, 11.35)
  caixa(1600, 0.22, 1.9, '#d9d5cc', 0, 0, 20.95)

  // Lote: piso, jardins, entrada de carros e estacionamento
  caixa(36, 0.12, 24.5, '#e4dfd3', 0, 0, -1.75)
  caixa(9, 0.18, 6, '#7fb36c', -12.5, 0, -10)
  caixa(7, 0.18, 5.5, '#7fb36c', 13, 0, -10.2)
  caixa(5, 0.18, 4, '#7fb36c', -4.5, 0, 6.5)
  caixa(4.4, 0.15, 8, '#cdc8bc', 6, 0, 6.5)
  caixa(9.5, 0.15, 6, '#cdc8bc', 10, 0, 1)
  for (const x of [6, 8.6, 11.2, 13.8]) caixa(0.12, 0.16, 4.2, '#ffffff', x, 0, 1)
  // Caminho de pedestres: do portão até a porta do prédio (x 0, z -0,3)
  caixa(1.6, 0.16, 9.4, '#efe9dd', 1.6, 0, 5.7)
  caixa(3.4, 0.16, 1.6, '#efe9dd', 0.7, 0, 0.6)

  /* ---------- Muro, portão e cancela ---------- */
  const MURO_Z = 10.5
  const muro = (x1, x2) => {
    caixa(x2 - x1, 1.7, 0.3, '#d3cdc1', (x1 + x2) / 2, 0, MURO_Z)
    caixa(x2 - x1 + 0.06, 0.12, 0.42, '#b9b2a4', (x1 + x2) / 2, 1.7, MURO_Z)
  }
  muro(-18, 0.8)
  muro(2.4, 3.8)
  muro(12, 18)
  caixa(0.3, 1.7, 24.5, '#d3cdc1', -18, 0, -1.75)
  caixa(0.3, 1.7, 24.5, '#d3cdc1', 18, 0, -1.75)
  caixa(36.3, 1.7, 0.3, '#d3cdc1', 0, 0, -14)

  const portao = new Group()
  portao.position.set(0.8, 0, MURO_Z)
  caixa(1.6, 1.9, 0.07, '#59606e', 0.8, 0, 0, portao)
  cena.add(portao)

  // Cancela: o braço (3,5 m) termina num descanso amarelo, bem antes da guarita (x 8,4)
  caixa(0.4, 1.15, 0.4, '#f2c230', 3.9, 0, MURO_Z)
  caixa(0.16, 0.92, 0.16, '#f2c230', 7.8, 0, MURO_Z)
  caixa(0.34, 0.08, 0.16, '#f2c230', 7.8, 0.92, MURO_Z)
  const cancela = new Group()
  cancela.position.set(3.9, 1.0, MURO_Z)
  for (let i = 0; i < 5; i++) {
    caixa(0.7, 0.13, 0.1, i % 2 ? '#ffffff' : '#e23b3b', 0.2 + i * 0.7 + 0.35, -0.065, 0, cancela)
  }
  cena.add(cancela)

  /* ---------- Guarita ----------
     Oca: mureta até 0,95 m, vidro em volta e, dentro, balcão com monitor, cadeira e
     prateleira das encomendas. A frente (balcão e vidro) dá para a rua; a porta fica no
     fundo, à esquerda, e abre para dentro do condomínio. Ninguém sai da guarita para a rua. */
  const G = { x: 10.2, z: 9.7 }
  const guarita = new Group()
  guarita.position.set(G.x, 0, G.z)
  cena.add(guarita)
  const PAREDE = '#f4f5f8'
  caixa(3.5, 0.1, 2.9, '#d9dde5', 0, 0, 0, guarita)
  caixa(3.6, 0.95, 0.12, PAREDE, 0, 0, 1.44, guarita) // frente, para a rua
  caixa(0.12, 0.95, 3.0, PAREDE, -1.74, 0, 0, guarita)
  caixa(0.12, 0.95, 3.0, PAREDE, 1.74, 0, 0, guarita)
  // Fundo: vão da porta de x -1,5 a -0,6 (atrás da cadeira)
  caixa(0.3, 0.95, 0.12, PAREDE, -1.65, 0, -1.44, guarita)
  caixa(2.4, 0.95, 0.12, PAREDE, 0.6, 0, -1.44, guarita)
  // Vidro em volta, aberto só no vão da porta
  caixa(3.56, 1.4, 0.04, vidro, 0, 0.95, 1.46, guarita)
  caixa(0.04, 1.4, 2.96, vidro, -1.76, 0.95, 0, guarita)
  caixa(0.04, 1.4, 2.96, vidro, 1.76, 0.95, 0, guarita)
  caixa(0.26, 1.4, 0.04, vidro, -1.65, 0.95, -1.46, guarita)
  caixa(2.36, 1.4, 0.04, vidro, 0.6, 0.95, -1.46, guarita)
  for (const x of [-1.5, -0.6]) caixa(0.08, 2.35, 0.14, PAREDE, x, 0, -1.44, guarita)
  caixa(0.98, 0.1, 0.14, PAREDE, -1.05, 2.25, -1.44, guarita)
  for (const [x, z] of [[-1.73, -1.43], [1.73, -1.43], [-1.73, 1.43], [1.73, 1.43]]) {
    caixa(0.14, 1.4, 0.14, PAREDE, x, 0.95, z, guarita)
  }
  caixa(3.6, 0.5, 3.0, PAREDE, 0, 2.35, 0, guarita)
  caixa(4.2, 0.22, 3.6, '#004bea', 0, 2.85, 0, guarita)
  const matPainel = new MeshBasicMaterial({ color: '#dfe5ef' })
  caixa(3.3, 0.03, 2.7, matPainel, 0, 2.32, 0, guarita)
  const matBrilho = new MeshBasicMaterial({ color: '#ffd98f', transparent: true, opacity: 0, depthWrite: false })
  caixa(3.3, 1.35, 2.7, matBrilho, 0, 0.97, 0, guarita)
  // Balcão de frente para a rua, com o monitor em cima
  caixa(2.0, 0.85, 0.55, '#e3e7ef', -0.6, 0.1, 1.07, guarita)
  caixa(2.1, 0.06, 0.62, '#c9ced9', -0.6, 0.95, 1.05, guarita)
  caixa(0.12, 0.12, 0.12, '#1d2433', -0.6, 1.01, 1.12, guarita)
  caixa(0.62, 0.42, 0.05, '#1d2433', -0.6, 1.13, 1.12, guarita)
  caixa(0.54, 0.34, 0.02, new MeshBasicMaterial({ color: '#5d8dff' }), -0.6, 1.17, 1.085, guarita)
  // Cadeira do porteiro
  const assento = new Mesh(new CylinderGeometry(0.24, 0.24, 0.08, 14), mat('#2a3142'))
  assento.position.set(-0.6, 0.55, 0.3)
  guarita.add(assento)
  caixa(0.06, 0.45, 0.06, '#59606e', -0.6, 0.1, 0.3, guarita)
  caixa(0.44, 0.5, 0.06, '#2a3142', -0.6, 0.62, 0.04, guarita)
  // Prateleira das encomendas (fundo, à direita)
  caixa(1.1, 0.85, 0.5, '#e3e7ef', 1.05, 0.1, -1.1, guarita)
  caixa(1.16, 0.05, 0.56, '#c9ced9', 1.05, 0.95, -1.1, guarita)
  // Porta do fundo: dobradiça do lado direito, abre para fora (para o lote)
  const portaGuarita = new Group()
  portaGuarita.position.set(-0.6, 0, -1.53)
  caixa(0.9, 2.2, 0.07, '#004bea', -0.45, 0.05, 0, portaGuarita)
  guarita.add(portaGuarita)
  const PORTA_GUARITA = { x: G.x - 1.05, z: G.z - 1.5 }
  // Calçadinha da porta e faixa de pedestres cruzando a entrada de carros até o caminho do portão
  const FAIXA = 7.6
  caixa(1.6, 0.16, 1.1, '#efe9dd', PORTA_GUARITA.x - 0.15, 0, 7.7)
  caixa(1.4, 0.16, 0.8, '#efe9dd', 3.1, 0, FAIXA)
  for (let x = 4.15; x < 8.2; x += 0.6) caixa(0.3, 0.165, 0.8, '#ffffff', x, 0, FAIXA)
  // Placa com o logo em cima da guarita (sempre "acesa")
  caixa(0.1, 0.8, 0.1, '#59606e', -1.1, 3.07, 1.2, guarita)
  const placa = new Mesh(new PlaneGeometry(1.15, 1.15), new MeshBasicMaterial({ map: desenharLogo() }))
  placa.position.set(-1.1, 4.35, 1.26)
  guarita.add(placa)
  const placaVerso = caixa(1.15, 1.15, 0.06, '#e8ebf2', -1.1, 3.775, 1.2, guarita)
  placaVerso.castShadow = true

  /* ---------- Prédio ---------- */
  const predio = new Group()
  cena.add(predio)
  const TERREO = 3.2
  const ANDAR = 3
  const ANDARES = 10
  // Térreo: hall envidraçado, com caixilhos e a porta de entrada no centro da fachada
  const matLobby = new MeshLambertMaterial({ color: '#8fa9cc', emissive: '#ffcf7a', emissiveIntensity: 0 })
  caixa(9.4, TERREO, 7.4, matLobby, 0, 0, -4, predio)
  for (const x of [-4.8, 4.8]) caixa(0.4, TERREO, 0.4, '#eef1f6', x, 0, -0.2, predio)
  for (const x of [-3.9, -2.6, 2.6, 3.9]) caixa(0.1, TERREO, 0.1, '#eef1f6', x, 0, -0.27, predio)
  caixa(9.4, 0.12, 0.1, '#eef1f6', 0, 2.62, -0.27, predio)
  // Porta: vão escuro (de noite, aceso por dentro) com duas folhas de vidro que correm
  const matVao = new MeshLambertMaterial({ color: '#2a3346', emissive: '#ffcf7a', emissiveIntensity: 0 })
  caixa(2.5, 2.55, 0.16, matVao, 0, 0.08, -0.25, predio)
  caixa(2.7, 0.14, 0.2, '#eef1f6', 0, 2.62, -0.2, predio)
  for (const x of [-1.32, 1.32]) caixa(0.12, 2.62, 0.2, '#eef1f6', x, 0.08, -0.2, predio)
  const matFolha = new MeshLambertMaterial({ color: '#cfe3f7', transparent: true, opacity: 0.55, depthWrite: false })
  const folhas = [-1, 1].map((lado) => {
    const f = caixa(1.2, 2.45, 0.05, matFolha, lado * 0.6, 0.08, -0.13, predio)
    f.userData.lado = lado
    return f
  })
  caixa(2.8, 0.06, 1.1, '#9a8f7d', 0, 0.16, 0.45, predio) // capacho
  const PORTA_PREDIO = { x: 0, z: 0.1 }
  caixa(10, ANDAR * ANDARES, 8, '#eef1f6', 0, TERREO, -4, predio)
  for (let f = 0; f <= ANDARES; f++) caixa(10.25, 0.22, 8.25, '#d5dae4', 0, TERREO + f * ANDAR - 0.11, -4, predio)
  caixa(1.1, ANDAR * ANDARES, 0.24, '#004bea', 0, TERREO, 0.0, predio)
  const topoY = TERREO + ANDAR * ANDARES
  caixa(10.4, 1.0, 8.4, '#e2e6ee', 0, topoY, -4, predio)
  caixa(4, 2.4, 3.2, '#d9dee8', -1.5, topoY + 1, -5, predio)
  const caixaDagua = new Mesh(new CylinderGeometry(1.1, 1.1, 2, 14), mat('#c9cfdb'))
  caixaDagua.position.set(2.6, topoY + 2, -5.2)
  predio.add(caixaDagua)
  // Marquise azul logo acima da porta
  caixa(3.4, 0.16, 1.7, '#004bea', 0, 2.78, 0.55, predio)
  for (let f = 0; f < ANDARES; f++) {
    const y = TERREO + f * ANDAR
    for (const x of [-2.6, 2.6]) {
      caixa(3.8, 0.16, 1.0, '#e2e6ee', x, y, 0.5, predio)
      caixa(3.8, 0.9, 0.05, vidro, x, y + 0.16, 1.0, predio)
    }
  }

  // Janelas: instâncias que acendem à noite (cada uma com seu limiar)
  const janelasPos = []
  for (let f = 0; f < ANDARES; f++) {
    const y = TERREO + f * ANDAR + 1.55
    for (const x of [-3.5, -1.6, 1.6, 3.5]) {
      janelasPos.push({ x, y, z: 0.02, r: 0 })
      janelasPos.push({ x, y, z: -8.02, r: Math.PI })
    }
    for (const z of [-1.6, -4, -6.4]) {
      janelasPos.push({ x: 5.02, y, z, r: Math.PI / 2 })
      janelasPos.push({ x: -5.02, y, z, r: -Math.PI / 2 })
    }
  }
  const janelas = new InstancedMesh(new PlaneGeometry(1.3, 1.7), new MeshBasicMaterial({ color: '#ffffff' }), janelasPos.length)
  const limiares = janelasPos.map(() => rnd())
  janelasPos.forEach((j, i) => {
    d0.position.set(j.x, j.y, j.z)
    d0.rotation.set(0, j.r, 0)
    d0.scale.set(1, 1, 1)
    d0.updateMatrix()
    janelas.setMatrixAt(i, d0.matrix)
    janelas.setColorAt(i, new Color('#b9cde8'))
  })
  predio.add(janelas)
  // A janela do Apto 32 (3º andar, frente): recebe os avisos
  const JANELA_32 = new Vector3(-1.6, TERREO + 2 * ANDAR + 1.55, 0.3)

  /* ---------- Salão de festas, churrasqueira e piscina ---------- */
  const salao = new Group()
  salao.position.set(-12, 0, 1)
  cena.add(salao)
  caixa(9, 0.3, 7, '#ece6da', 0, 0, 0, salao)
  for (const [x, z] of [[-4.2, -3.2], [4.2, -3.2], [-4.2, 3.2], [4.2, 3.2]]) caixa(0.32, 3.0, 0.32, '#ffffff', x, 0.3, z, salao)
  caixa(9.6, 0.3, 7.6, '#fbfbfd', 0, 3.3, 0, salao)
  caixa(9.7, 0.14, 7.7, '#e3e7f0', 0, 3.22, 0, salao)
  caixa(9, 3.0, 0.25, '#e3d7c6', 0, 0.3, -3.4, salao)
  caixa(2.2, 1.0, 0.9, '#b65a3c', -2.5, 0.3, -2.8, salao)
  caixa(1.6, 1.0, 0.8, '#b65a3c', -2.5, 1.8, -2.85, salao)
  caixa(0.7, 1.4, 0.6, '#a14d33', -2.5, 2.8, -2.85, salao)
  for (const [x, z] of [[-1, 0.4], [2, 1.6], [1.6, -1.3]]) {
    const pe = new Mesh(new CylinderGeometry(0.07, 0.07, 0.75, 8), mat('#c9ced9'))
    pe.position.set(x, 0.3 + 0.375, z)
    salao.add(pe)
    const tampo = new Mesh(new CylinderGeometry(0.65, 0.65, 0.07, 18), mat('#ffffff'))
    tampo.position.set(x, 1.08, z)
    salao.add(tampo)
    for (let k = 0; k < 3; k++) {
      const a = (k / 3) * Math.PI * 2 + 0.4
      const banco = new Mesh(new CylinderGeometry(0.2, 0.2, 0.45, 10), mat('#a77b56'))
      banco.position.set(x + Math.cos(a) * 1.0, 0.3 + 0.225, z + Math.sin(a) * 1.0)
      salao.add(banco)
    }
  }
  // Varal de luzes na frente do salão
  const matLuzes = new MeshBasicMaterial({ color: '#d9d4c7' })
  const geoLampada = new SphereGeometry(0.09, 8, 6)
  for (let k = 0; k < 15; k++) {
    const t = k / 14
    const l = new Mesh(geoLampada, matLuzes)
    l.position.set(lerp(-4.2, 4.2, t), 3.05 - Math.sin(Math.PI * t) * 0.45, 3.35)
    salao.add(l)
  }
  // Balões da festa reservada
  const baloes = []
  const coresBalao = ['#004bea', '#8b3fd9', '#ffffff', '#3d7bff', '#8b3fd9']
  const posLinhas = []
  coresBalao.forEach((cor, k) => {
    const b = new Mesh(new SphereGeometry(0.34, 14, 10), new MeshLambertMaterial({ color: cor }))
    const bx = 4.6 + (k - 2) * 0.32
    const by = 4.5 + (k % 2) * 0.45 + Math.abs(k - 2) * 0.1
    const bz = 3.6 + (k % 3) * 0.18
    b.position.set(bx, by, bz)
    b.scale.y = 1.15
    b.userData = { y: by, fase: k * 1.7 }
    salao.add(b)
    baloes.push(b)
    posLinhas.push(4.2, 3.3, 3.2, bx, by - 0.38, bz)
  })
  const geoFios = new BufferGeometry()
  geoFios.setAttribute('position', new Float32BufferAttribute(posLinhas, 3))
  const matFios = new LineBasicMaterial({ color: '#59606e', transparent: true, opacity: 0 })
  salao.add(new LineSegments(geoFios, matFios))

  caixa(8.4, 0.14, 4.4, '#f1ede4', -11.5, 0, 7.6)
  const matAgua = new MeshLambertMaterial({ color: '#47b4e6', emissive: '#0b6fb0', emissiveIntensity: 0 })
  caixa(7.6, 0.17, 3.6, matAgua, -11.5, 0, 7.6)
  for (const x of [-14, -12.6]) caixa(0.7, 0.3, 1.7, '#ffffff', x, 0.14, 5.0)

  /* ---------- Carros ---------- */
  function carro(cor) {
    const g = new Group()
    caixa(1.8, 0.62, 4.0, cor, 0, 0.3, 0, g)
    caixa(1.62, 0.55, 2.1, '#273246', 0, 0.92, -0.2, g)
    caixa(1.64, 0.08, 1.9, cor, 0, 1.46, -0.25, g)
    const roda = new CylinderGeometry(0.34, 0.34, 0.26, 12)
    roda.rotateZ(Math.PI / 2)
    for (const [x, z] of [[-0.86, 1.3], [0.86, 1.3], [-0.86, -1.3], [0.86, -1.3]]) {
      const r = new Mesh(roda, mat('#1d2027'))
      r.position.set(x, 0.34, z)
      g.add(r)
    }
    const farol = new MeshBasicMaterial({ color: '#fff6d5' })
    const lanterna = new MeshBasicMaterial({ color: '#ff4a4a' })
    for (const x of [-0.6, 0.6]) {
      caixa(0.36, 0.14, 0.04, farol, x, 0.62, 2.01, g)
      caixa(0.36, 0.12, 0.04, lanterna, x, 0.64, -2.01, g)
    }
    cena.add(g)
    return g
  }
  const carroMorador = carro('#2a2f3a')
  const rotaCarro = new CatmullRomCurve3(
    [
      [70, 14], [14, 14], [8.6, 13.6], [6.3, 12.4], [6, 10.5], [6.3, 6], [7.3, 3.6], [7.3, 0.6],
    ].map(([x, z]) => new Vector3(x, 0, z)),
    false,
    'centripetal'
  )
  // Ponto da rota em que o carro para na frente da cancela
  let paradaCancela = 0.8
  for (let k = 0; k <= 1; k += 0.001) {
    const q = rotaCarro.getPointAt(k)
    if (q.x < 8 && q.z < 13.1) {
      paradaCancela = k
      break
    }
  }
  const parados = [carro('#e9eef5'), carro('#d64545')]
  parados[0].position.set(9.9, 0, 1)
  parados[0].rotation.y = Math.PI
  parados[1].position.set(12.5, 0, 1.2)
  parados[1].rotation.y = Math.PI
  const transito = [carro('#f2b134'), carro('#7aa2d8')]

  /* ---------- Pessoas ---------- */
  const geoCorpo = new CapsuleGeometry(0.24, 0.72, 4, 10)
  const geoCabeca = new SphereGeometry(0.2, 12, 10)
  const geoBone = new CylinderGeometry(0.21, 0.22, 0.09, 12)
  function pessoa(cor, porteiro = false) {
    const g = new Group()
    const corpo = new Mesh(geoCorpo, mat(cor))
    corpo.position.y = 0.62
    g.add(corpo)
    const cabeca = new Mesh(geoCabeca, mat('#c99a76'))
    cabeca.position.y = 1.45
    g.add(cabeca)
    if (porteiro) {
      const bone = new Mesh(geoBone, mat('#0b1f66'))
      bone.position.y = 1.6
      g.add(bone)
    }
    cena.add(g)
    return g
  }
  const porteiroTarde = pessoa('#004bea', true)
  const porteiroNoite = pessoa('#1e3a8a', true)
  const visitante = pessoa('#f2a33a')
  const morador = pessoa('#8b3fd9')
  const entregador = pessoa('#d64545')
  // Quem a câmera pode acompanhar numa passagem (QUADROS[...].segue)
  const seguidos = { noite: porteiroNoite, tarde: porteiroTarde }
  const caixaNaMao = caixa(0.5, 0.36, 0.4, '#c8955a', 0, 0.78, 0.34, entregador)

  // Sentar: o corpo sobe para o assento da cadeira (sem pernas, a cápsula "senta")
  const SENTADO = 0.38
  const CADEIRA = [G.x - 0.6, G.z + 0.3]
  const CALCADA = 11.6 // linha por onde se anda na calçada
  // A visita vai da calçada até o portão (A) e do portão até a porta do prédio (B)
  const rotaVisitaA = caminho([[-4, 11.3], [1.6, 11.3], [1.6, 10.5]])
  const rotaVisitaB = caminho([[1.6, 10.5], [1.6, 1.6], [0, 0.9], [0, -1.0]])
  const rotaMorador = caminho([[6.2, 1.0], [5.3, 1.6], [2.2, 1.4], [0, 0.9], [0, -1.0]])
  // Troca de turno, por dentro do condomínio: o da noite vem pela calçada, entra pelo portão
  // de pedestres, cruza a faixa e entra na guarita pela porta do fundo (A até o portão, B
  // depois dele). O da tarde levanta, sai pelo fundo e faz o caminho de volta.
  const PORTAO = [1.6, MURO_Z]
  const DENTRO = [PORTA_GUARITA.x, G.z - 0.8] // logo depois da porta, já dentro da guarita
  const ESPERA = [G.x - 0.05, G.z - 0.3] // em pé, ao lado da cadeira
  const LEVANTA = [G.x - 1.2, G.z + 0.3] // sai da cadeira pelo lado, sem atravessar o encosto
  const rotaEntraA = caminho([[-30, CALCADA], [PORTAO[0], CALCADA], PORTAO])
  const rotaEntraB = caminho([PORTAO, [PORTAO[0], FAIXA], [PORTA_GUARITA.x, FAIXA], DENTRO, ESPERA])
  const rotaSenta = caminho([ESPERA, [G.x - 0.05, G.z + 0.3], CADEIRA])
  const rotaSai = caminho([
    CADEIRA, LEVANTA, DENTRO, [PORTA_GUARITA.x, FAIXA], [PORTAO[0], FAIXA], PORTAO, [PORTAO[0], CALCADA], [-30, CALCADA],
  ])
  // Entregador: desce do furgão, entrega na janela da guarita e volta
  const rotaEntrega = caminho([[15.5, 12.7], [15.5, CALCADA + 0.15], [G.x - 0.3, CALCADA + 0.15]])

  /* ---------- Furgão de entregas ---------- */
  const furgao = new Group()
  caixa(2.0, 1.75, 3.3, '#f4f4f6', 0, 0.35, -0.55, furgao)
  caixa(2.02, 0.22, 3.32, '#f2a33a', 0, 1.15, -0.55, furgao)
  caixa(1.9, 1.25, 1.3, '#f4f4f6', 0, 0.35, 1.7, furgao)
  caixa(1.8, 0.5, 0.05, '#273246', 0, 1.0, 2.36, furgao)
  {
    const roda = new CylinderGeometry(0.36, 0.36, 0.26, 12)
    roda.rotateZ(Math.PI / 2)
    for (const [x, z] of [[-0.92, 1.5], [0.92, 1.5], [-0.92, -1.45], [0.92, -1.45]]) {
      const r = new Mesh(roda, mat('#1d2027'))
      r.position.set(x, 0.36, z)
      furgao.add(r)
    }
    for (const x of [-0.65, 0.65]) caixa(0.32, 0.14, 0.04, new MeshBasicMaterial({ color: '#fff6d5' }), x, 0.6, 2.36, furgao)
  }
  furgao.rotation.y = -Math.PI / 2 // anda para -x, na faixa da calçada
  cena.add(furgao)

  /* ---------- Encomendas: vão para a prateleira dentro da guarita ---------- */
  const pacotes = [
    [0.5, 0.32, 0.4, -0.23, 0, 0],
    [0.42, 0.28, 0.36, 0.25, 0, 0.02],
    [0.36, 0.24, 0.32, -0.15, 0.32, 0],
  ].map(([w, h, d, x, y, z], k) => {
    const g = new Group()
    g.position.set(1.05 + x, 1.0 + y, -1.1 + z)
    g.rotation.y = k * 0.3 - 0.2
    caixa(w, h, d, '#c8955a', 0, 0, 0, g)
    caixa(w + 0.01, 0.05, d * 0.3, '#ead3a6', 0, h - 0.03, 0, g)
    guarita.add(g)
    return g
  })

  /* ---------- Aviso que voa da guarita até o apartamento ---------- */
  const rotaAviso = new QuadraticBezierCurve3(new Vector3(G.x, 3.4, G.z), new Vector3(5, 15, 8), JANELA_32)
  const matAviso = new MeshBasicMaterial({ color: '#3d7bff', transparent: true, fog: false })
  const pontoAviso = new Mesh(new SphereGeometry(0.34, 16, 12), matAviso)
  cena.add(pontoAviso)
  const geoRastro = new BufferGeometry().setFromPoints(rotaAviso.getPoints(60))
  const matRastro = new LineBasicMaterial({ color: '#7aa6ff', transparent: true, opacity: 0, fog: false })
  const rastro = new Line(geoRastro, matRastro)
  cena.add(rastro)
  const matAnel = new MeshBasicMaterial({ color: '#3d7bff', transparent: true, opacity: 0, side: DoubleSide, fog: false, depthWrite: false })
  const anel = new Mesh(new RingGeometry(0.75, 0.95, 40), matAnel)
  anel.position.copy(JANELA_32)
  cena.add(anel)
  // Encomenda (capítulo 2) e visita (capítulo 3): logo depois de cada acontecimento
  const AVISOS = [
    { ini: ROTEIRO.entrega + 0.03, fim: ROTEIRO.entrega + 0.38 },
    { ini: ROTEIRO.visitaPortao + 0.02, fim: ROTEIRO.visitaPortao + 0.3 },
  ]

  /* ---------- Árvores, postes e vizinhança ---------- */
  const geoTronco = new CylinderGeometry(0.14, 0.2, 1, 6)
  const geoCopa = new IcosahedronGeometry(1, 0)
  const geoPinheiro = new ConeGeometry(1, 2.4, 7)
  const matsCopa = ['#5aa05a', '#4d9152', '#6bb06a', '#3f8550'].map(
    (c) => new MeshLambertMaterial({ color: c, flatShading: true })
  )
  function arvore(x, z, s) {
    const tronco = new Mesh(geoTronco, mat('#8a6a4a'))
    tronco.scale.set(s, 1.5 * s, s)
    tronco.position.set(x, 0.75 * s, z)
    cena.add(tronco)
    const pinheiro = rnd() < 0.3
    const copa = new Mesh(pinheiro ? geoPinheiro : geoCopa, matsCopa[Math.floor(rnd() * matsCopa.length)])
    const k = s * (pinheiro ? 1.1 : 1.45)
    copa.scale.set(k, k * (pinheiro ? 1.2 : 0.95), k)
    copa.position.set(x, 1.5 * s + k * (pinheiro ? 1.1 : 0.7), z)
    copa.rotation.y = rnd() * Math.PI
    cena.add(copa)
  }
  for (const [x, z] of [[-16, -11.2], [-7, -11.8], [7, -11.2], [15.6, -11.4], [16.2, -5], [16, 8.4], [-16.6, 9.2], [-8.2, 4.6], [-16.4, -3.5]]) {
    arvore(x, z, 0.9 + rnd() * 0.45)
  }
  // Calçada do outro lado da rua: sem árvores em frente ao condomínio (a câmera filma dali)
  for (let x = -60; x <= 60; x += 11 + rnd() * 5) {
    const z = 22.6 + rnd() * 0.6
    const s = 0.9 + rnd() * 0.4
    if (Math.abs(x) > 26 && distanciaDaTrilha(x, z) > 4) arvore(x, z, s)
  }
  for (let i = 0; i < 90; i++) {
    const a = rnd() * Math.PI * 2
    const r = 32 + rnd() * 150
    const x = Math.cos(a) * r
    const z = Math.sin(a) * r
    if (Math.abs(z - 16) < 10 || distanciaDaTrilha(x, z) < 14) continue
    arvore(x, z, 0.9 + rnd() * 0.9)
  }

  const matLampada = new MeshBasicMaterial({ color: '#c8ccd4' })
  const geoPoste = new CylinderGeometry(0.07, 0.09, 4.4, 6)
  const geoLuz = new SphereGeometry(0.24, 10, 8)
  for (const [x, z] of [[-34, 12.05], [-20, 12.05], [20, 12.05], [32, 12.05], [-3, 2.4], [15, -3], [-8, -7]]) {
    const poste = new Mesh(geoPoste, mat('#59606e'))
    poste.position.set(x, 2.2, z)
    cena.add(poste)
    const luz = new Mesh(geoLuz, matLampada)
    luz.position.set(x, 4.5, z)
    cena.add(luz)
  }

  const texVizinhas = desenharJanelasVizinhas(semente(42))
  const matsVizinhos = ['#cdd5e3', '#d9d2c6', '#c4cfdf'].map((c) => {
    const lado = new MeshLambertMaterial({ color: c, emissive: '#ffd27a', emissiveMap: texVizinhas, emissiveIntensity: 0 })
    const topo = mat(c)
    return [lado, lado, topo, topo, lado, lado]
  })
  for (let i = 0; i < 26; i++) {
    const a = rnd() * Math.PI * 2
    const r = 48 + rnd() * 120
    const x = Math.cos(a) * r
    const z = Math.sin(a) * r - 10
    if (Math.abs(z - 16) < 14 || distanciaDaTrilha(x, z) < 34) continue
    const w = 8 + rnd() * 10
    const h = 8 + rnd() * 34
    const m = new Mesh(CAIXA, matsVizinhos[i % 3])
    m.scale.set(w, h, 8 + rnd() * 8)
    m.position.set(x, h / 2, z)
    cena.add(m)
  }

  /* ---------- Nuvens ---------- */
  const matNuvem = new MeshLambertMaterial({ color: '#ffffff', flatShading: true, transparent: true, opacity: 0.92 })
  const nuvens = []
  for (let i = 0; i < 10; i++) {
    const g = new Group()
    const partes = 3 + Math.floor(rnd() * 3)
    for (let k = 0; k < partes; k++) {
      const m = new Mesh(geoCopa, matNuvem)
      const s = 3 + rnd() * 4
      m.scale.set(s * 1.3, s * 0.55, s)
      m.position.set(k * 4 - partes * 2 + rnd() * 2, rnd() * 1.5, rnd() * 3)
      g.add(m)
    }
    g.position.set(-200 + rnd() * 400, 48 + rnd() * 26, -170 + rnd() * 220)
    cena.add(g)
    nuvens.push(g)
  }

  /* ---------- Cofre de luz (capítulo de segurança) ----------
     Sobe do muro, no contorno exato do terreno, e passa do topo do prédio (36,6 m):
     nada do condomínio fica de fora, e nada de fora (rua, vizinhos) fica dentro. */
  const COFRE = { x0: -18.3, x1: 18.3, z0: -14.3, z1: 10.75, h: 40 }
  const posCofre = []
  const segmento = (a, b) => posCofre.push(...a, ...b)
  const cantos = [[COFRE.x0, COFRE.z0], [COFRE.x1, COFRE.z0], [COFRE.x1, COFRE.z1], [COFRE.x0, COFRE.z1]]
  for (let k = 0; k <= 5; k++) {
    const y = (k / 5) * COFRE.h
    for (let i = 0; i < 4; i++) {
      const [ax, az] = cantos[i]
      const [bx, bz] = cantos[(i + 1) % 4]
      segmento([ax, y, az], [bx, y, bz])
    }
  }
  for (let i = 0; i < 4; i++) {
    const [ax, az] = cantos[i]
    const [bx, bz] = cantos[(i + 1) % 4]
    const n = Math.round(Math.hypot(bx - ax, bz - az) / 3)
    for (let k = 0; k < n; k++) {
      const x = lerp(ax, bx, k / n)
      const z = lerp(az, bz, k / n)
      segmento([x, 0, z], [x, COFRE.h, z])
    }
  }
  for (let k = 1; k < 6; k++) {
    const x = lerp(COFRE.x0, COFRE.x1, k / 6)
    segmento([x, COFRE.h, COFRE.z0], [x, COFRE.h, COFRE.z1])
  }
  for (let k = 1; k < 4; k++) {
    const z = lerp(COFRE.z0, COFRE.z1, k / 4)
    segmento([COFRE.x0, COFRE.h, z], [COFRE.x1, COFRE.h, z])
  }
  const cofre = new Group()
  cena.add(cofre)
  const geoCofre = new BufferGeometry()
  geoCofre.setAttribute('position', new Float32BufferAttribute(posCofre, 3))
  const matCofre = new LineBasicMaterial({ color: '#6ea0ff', transparent: true, opacity: 0, depthWrite: false, fog: false })
  cofre.add(new LineSegments(geoCofre, matCofre))
  const matVeu = new MeshBasicMaterial({ color: '#3d7bff', transparent: true, opacity: 0, side: DoubleSide, depthWrite: false, fog: false })
  const veu = new Mesh(CAIXA, matVeu)
  veu.scale.set(COFRE.x1 - COFRE.x0, COFRE.h, COFRE.z1 - COFRE.z0)
  veu.position.set((COFRE.x0 + COFRE.x1) / 2, COFRE.h / 2, (COFRE.z0 + COFRE.z1) / 2)
  cofre.add(veu)
  // Faixa de varredura: um contorno que sobe pelas paredes do cofre
  const posVarredura = []
  for (const [x, z] of [...cantos, cantos[0]]) posVarredura.push(x, 0, z)
  const geoVarredura = new BufferGeometry()
  geoVarredura.setAttribute('position', new Float32BufferAttribute(posVarredura, 3))
  const matVarredura = new LineBasicMaterial({ color: '#bcd2ff', transparent: true, opacity: 0, fog: false })
  const varredura = new Line(geoVarredura, matVarredura)
  cofre.add(varredura)

  /* ---------- Sombras: tudo projeta, o chão recebe ---------- */
  if (renderer.shadowMap.enabled) {
    cena.traverse((o) => {
      if (!o.isMesh || o === ceu || o.material.transparent || o.material.isMeshBasicMaterial) return
      o.castShadow = true
      o.receiveShadow = true
    })
    chao.castShadow = false
    chao.receiveShadow = true
  }

  /* ---------- Por quadro ---------- */
  const corTopo = new Color()
  const corBase = new Color()
  const corTmp = new Color()
  const C = (h) => new Color(h)
  const JANELA_APAGADA_DIA = C('#b9cde8')
  const JANELA_APAGADA_NOITE = C('#1c2645')
  const JANELA_ACESA = C('#ffd27a')
  const LAMPADA_APAGADA = C('#c8ccd4')
  const LAMPADA_ACESA = C('#ffe2a0')
  const SOL_BAIXO = C('#ffa66b')
  const SOL_ALTO = C('#fff3e2')
  const CHAO_DIA = C('#5d6b4c')
  const CHAO_NOITE = C('#1a2030')
  const PAINEL_DIA = C('#dfe5ef')
  const PAINEL_NOITE = C('#fff1c4')
  const dirSol = new Vector3()
  const vPos = new Vector3()
  const vAlvo = new Vector3()
  const vA = new Vector3()
  const vB = new Vector3()
  let ultimaLuz = -1

  function luzDoDia(h) {
    corDoCeu(h, corTopo, corBase)
    ceuMat.uniforms.topo.value.copy(corTopo)
    ceuMat.uniforms.base.value.copy(corBase)
    cena.fog.color.copy(corBase)

    const a = ((h - 5.8) / (19.0 - 5.8)) * Math.PI
    dirSol.set(Math.cos(a) * 0.85, Math.sin(a), 0.55).normalize()
    const e = dirSol.y
    sol.position.copy(dirSol).multiplyScalar(140)
    sol.intensity = 2.6 * suave(-0.02, 0.22, e)
    sol.color.lerpColors(SOL_BAIXO, SOL_ALTO, suave(0.05, 0.5, e))
    ceuMat.uniforms.dirSol.value.copy(dirSol)
    ceuMat.uniforms.brilhoSol.value = suave(-0.06, 0.08, e)

    const noite = suave(18.0, 20.0, h)
    const madrugada = 1 - suave(6.0, 7.2, h)
    const acesas = Math.max(noite * 0.82, madrugada * 0.35, suave(17.5, 19, h) * 0.4)
    const lampadas = Math.max(suave(17.8, 18.8, h), 1 - suave(6.2, 6.9, h))

    hemi.intensity = lerp(1.25, 0.32, Math.max(noite, madrugada * 0.5))
    hemi.color.copy(corTopo).lerp(SOL_ALTO, 0.5)
    hemi.groundColor.lerpColors(CHAO_DIA, CHAO_NOITE, noite)
    lua.intensity = 0.6 * noite
    matEstrelas.opacity = noite * 0.95
    matNuvem.opacity = 0.92 * (1 - noite * 0.85)

    matLampada.color.lerpColors(LAMPADA_APAGADA, LAMPADA_ACESA, lampadas)
    matLuzes.color.lerpColors(LAMPADA_APAGADA, LAMPADA_ACESA, lampadas)
    matPainel.color.lerpColors(PAINEL_DIA, PAINEL_NOITE, lampadas)
    matBrilho.opacity = lampadas * 0.32
    matLobby.emissiveIntensity = lampadas * 0.55
    matVao.emissiveIntensity = lampadas * 0.75
    matAgua.emissiveIntensity = lampadas * 0.75
    for (const m of matsVizinhos) m[0].emissiveIntensity = acesas * 1.1

    // Janelas: só recalcula quando a luz muda de verdade
    const chave = Math.round(h * 40)
    if (chave !== ultimaLuz) {
      ultimaLuz = chave
      const apagada = corTmp.lerpColors(JANELA_APAGADA_DIA, JANELA_APAGADA_NOITE, Math.max(noite, madrugada * 0.6)).clone()
      for (let i = 0; i < limiares.length; i++) {
        const acesa = clamp((acesas - limiares[i]) * 10)
        corTmp.copy(apagada).lerp(JANELA_ACESA, acesa)
        janelas.setColorAt(i, corTmp)
      }
      janelas.instanceColor.needsUpdate = true
    }
  }

  /** Balanço do passo enquanto anda (zero parado) */
  const passo = (k, ritmo) => (k > 0 && k < 1 && !reduzido ? Math.abs(Math.sin(k * ritmo)) * 0.05 : 0)

  function historia(p, t) {
    // 01 · O carro do morador chega, espera a cancela e estaciona
    const c = paradaCancela * suave(0.25, 0.85, p) + (1 - paradaCancela) * suave(1.0, 1.55, p)
    rotaCarro.getPointAt(c, vA)
    rotaCarro.getTangentAt(c, vB)
    carroMorador.position.copy(vA)
    carroMorador.rotation.y = Math.atan2(vB.x, vB.z)
    cancela.rotation.z = janela(p, 0.85, 1.0, 1.6, 1.8) * 1.38

    // O morador desce do carro e entra pela porta do prédio
    const m = suave(1.55, 1.95, p)
    morador.visible = m > 0 && m < 1
    const pm = rotaMorador(m)
    morador.position.set(pm.x, passo(m, 40), pm.z)
    morador.rotation.y = pm.ang

    // Trânsito na rua (contínuo)
    transito.forEach((car, k) => {
      const x = reduzido ? -30 + k * 60 : (((t * 8 + k * 120) % 240) + 240) % 240 - 120
      car.position.set(x, 0, 18)
      car.rotation.y = Math.PI / 2
    })

    // 02 · O furgão para em frente à guarita; o entregador leva a caixa até a janela
    const chega = suave(1.02, 1.3, p)
    const parte = suave(1.6, 1.9, p)
    furgao.visible = p > 1.02 && parte < 1
    furgao.position.set(parte > 0 ? lerp(16.5, -70, parte) : lerp(70, 16.5, chega), 0, 14)
    const ida = suave(1.3, ROTEIRO.entrega - 0.02, p)
    const volta = suave(ROTEIRO.entrega + 0.04, 1.56, p)
    const pr = rotaEntrega(ida * (1 - volta))
    entregador.visible = p > 1.3 && volta < 1
    entregador.position.set(pr.x, passo(ida, 30) + passo(volta, 30), pr.z)
    entregador.rotation.y = volta > 0 ? pr.ang + Math.PI : ida >= 1 ? Math.PI : pr.ang
    caixaNaMao.visible = p < ROTEIRO.entrega
    // ...e as caixas aparecem na prateleira, dentro da guarita
    pacotes.forEach((g, k) => {
      const s = suave(ROTEIRO.entrega + k * 0.03, ROTEIRO.entrega + 0.05 + k * 0.03, p)
      g.visible = s > 0.001
      g.scale.setScalar(Math.max(s, 0.001) * (1 + Math.sin(s * Math.PI) * 0.2))
    })

    // Avisos voando até o Apto 32
    let ponto = 0
    let anelForca = 0
    let rastroForca = 0
    for (const av of AVISOS) {
      const k = (p - av.ini) / (av.fim - av.ini)
      if (k > 0 && k < 1) ponto = k
      rastroForca = Math.max(rastroForca, janela(p, av.ini - 0.05, av.ini + 0.05, av.fim, av.fim + 0.35))
      anelForca = Math.max(anelForca, janela(p, av.fim - 0.03, av.fim + 0.02, av.fim + 0.45, av.fim + 0.65))
    }
    pontoAviso.visible = ponto > 0
    if (ponto > 0) {
      rotaAviso.getPoint(suave(0, 1, ponto), vA)
      pontoAviso.position.copy(vA)
      pontoAviso.scale.setScalar(1 + Math.sin(t * 12) * 0.12)
    }
    matRastro.opacity = rastroForca * 0.55
    rastro.visible = rastroForca > 0.01
    anel.visible = anelForca > 0.01
    if (anel.visible) {
      const pulso = (t * 1.4) % 1
      anel.scale.setScalar(1 + pulso * 1.8)
      matAnel.opacity = anelForca * (1 - pulso)
      anel.lookAt(camera.position)
    }

    // 03 · A visita vai até o portão (que abre quando ela chega) e entra no prédio
    const va = suave(2.35, ROTEIRO.visitaPortao, p)
    const vb = suave(ROTEIRO.visitaPortao, 3.3, p)
    const pv = vb > 0 ? rotaVisitaB(vb) : rotaVisitaA(va)
    visitante.visible = p > 2.2 && vb < 1
    visitante.position.set(pv.x, passo(va, 30) + passo(vb, 30), pv.z)
    visitante.rotation.y = pv.ang

    // Porta automática do prédio: as folhas correm quando alguém chega perto
    let abrePredio = 0
    for (const q of [morador, visitante]) {
      if (!q.visible) continue
      const d = Math.hypot(q.position.x - PORTA_PREDIO.x, q.position.z - PORTA_PREDIO.z)
      abrePredio = Math.max(abrePredio, 1 - suave(1.2, 3.2, d))
    }
    for (const f of folhas) f.position.x = f.userData.lado * (0.6 + abrePredio * 1.1)

    // 04 · O síndico aprova a reserva: balões aparecem no salão
    baloes.forEach((b, k) => {
      const s = suave(ROTEIRO.reserva + k * 0.04, ROTEIRO.reserva + 0.12 + k * 0.04, p)
      b.visible = s > 0.001
      b.scale.set(s, s * 1.15, s)
      b.position.y = b.userData.y + (reduzido ? 0 : Math.sin(t * 1.6 + b.userData.fase) * 0.08)
    })
    matFios.opacity = suave(ROTEIRO.reserva, ROTEIRO.reserva + 0.15, p) * 0.8

    // 05 · Troca de turno, por dentro: o da noite chega pelo portão de pedestres (na metade
    //      da passagem da câmera) e espera na guarita; o da tarde levanta e sai pelo fundo,
    //      e o da noite senta no lugar dele assim que a cadeira fica livre
    const entraA = suave(4.05, 4.5, p)
    const entraB = suave(4.5, ROTEIRO.turno - 0.05, p)
    const levanta = suave(ROTEIRO.turno, ROTEIRO.turno + 0.05, p)
    const sai = suave(ROTEIRO.turno + 0.05, 5.5, p)
    const senta = suave(5.05, 5.2, p)
    if (sai > 0) {
      const ps = rotaSai(sai)
      porteiroTarde.position.set(ps.x, passo(sai, 50), ps.z)
      porteiroTarde.rotation.y = ps.ang
    } else {
      porteiroTarde.position.set(CADEIRA[0], SENTADO * (1 - levanta), CADEIRA[1])
      porteiroTarde.rotation.y = 0
    }
    porteiroTarde.visible = sai < 1
    if (senta > 0) {
      const pS = rotaSenta(senta)
      porteiroNoite.position.set(pS.x, SENTADO * suave(0.6, 1, senta), pS.z)
      porteiroNoite.rotation.y = senta < 1 ? pS.ang : 0
    } else {
      const pe = entraB > 0 ? rotaEntraB(entraB) : rotaEntraA(entraA)
      porteiroNoite.position.set(pe.x, passo(entraA, 70) + passo(entraB, 30), pe.z)
      porteiroNoite.rotation.y = pe.ang
    }
    porteiroNoite.visible = entraA > 0
    // Porta do fundo da guarita abre (para o lote) quando um porteiro passa por ela
    let abreGuarita = 0
    for (const q of [porteiroTarde, porteiroNoite]) {
      if (!q.visible) continue
      const d = Math.hypot(q.position.x - PORTA_GUARITA.x, q.position.z - PORTA_GUARITA.z)
      abreGuarita = Math.max(abreGuarita, 1 - suave(0.6, 1.6, d))
    }
    portaGuarita.rotation.y = -abreGuarita * 1.45

    // Portão de pedestres abre para quem chega perto: a visita e os dois porteiros
    let abrePortao = 0
    for (const q of [visitante, porteiroNoite, porteiroTarde]) {
      if (!q.visible) continue
      const d = Math.hypot(q.position.x - PORTAO[0], q.position.z - PORTAO[1])
      abrePortao = Math.max(abrePortao, 1 - suave(0.9, 2.4, d))
    }
    portao.rotation.y = abrePortao * 1.35

    // 07 · O cofre de luz sobe do muro à noite
    const cup = suave(6.3, 6.9, p)
    cofre.visible = cup > 0.001
    cofre.scale.y = Math.max(cup, 0.001)
    matCofre.opacity = cup * 0.6
    matVeu.opacity = cup * 0.06
    const ciclo = reduzido ? 0.5 : (t * 0.22) % 1
    varredura.position.y = ciclo * COFRE.h
    matVarredura.opacity = cup * (1 - ciclo) * 0.9

    // Nuvens andam devagar
    if (!reduzido) for (const n of nuvens) n.position.x = ((n.position.x + 200 + 0.02) % 400) - 200
  }

  /* ---------- Câmera ---------- */
  let largura = 1
  let altura = 1
  function redimensionar() {
    largura = innerWidth
    altura = innerHeight
    renderer.setSize(largura, altura, false)
    camera.aspect = largura / altura
    // Em tela em pé, abre o campo de visão para o prédio caber de lado a lado
    const fovH = 46
    const fovV = (2 * Math.atan(Math.tan((fovH * Math.PI) / 360) / camera.aspect) * 180) / Math.PI
    camera.fov = clamp(fovV, 36, 72)
    camera.updateProjectionMatrix()
  }
  redimensionar()

  const deslocamento = (i) => {
    if (telaPequena.matches) return [0, ids[i] === 'inicio' ? -0.2 : 0.16]
    return [lados[i] === 'esq' ? -0.17 : lados[i] === 'dir' ? 0.17 : 0, 0]
  }

  let mouseX = 0
  let mouseY = 0
  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return
    mouseX = (e.clientX / innerWidth) * 2 - 1
    mouseY = (e.clientY / innerHeight) * 2 - 1
  }, { passive: true })
  let mx = 0
  let my = 0

  function posicionarCamera(p, extra, t, intro) {
    if (reduzido) {
      const q = QUADROS.inicio
      camera.position.set(...q.pos)
      camera.lookAt(...q.alvo)
      camera.setViewOffset(largura, altura, 0, 0, largura, altura)
      return
    }
    const i = Math.min(Math.floor(p), ids.length - 1)
    const j = Math.min(i + 1, ids.length - 1)
    const a = QUADROS[ids[i]]
    const b = QUADROS[ids[j]]
    const u = p - i
    let f
    if (b.via && i !== j) {
      // Passagem por dentro do condomínio: sem arco de drone, e a câmera desacelera no
      // ponto do meio (sem parar) para acompanhar quem passa por ali
      f = 0.6 * (u < 0.5 ? 0.5 * suave(0, 0.5, u) : 0.5 + 0.5 * suave(0.5, 1, u)) + 0.4 * suave(0, 1, u)
      pelaVia(vPos, a.pos, b.via.pos, b.pos, f)
      pelaVia(vAlvo, a.alvo, b.via.alvo, b.alvo, f)
      // O olhar puxa para quem está andando ali (só no miolo da passagem, sem trancos)
      const s = b.segue
      const q = s && seguidos[s.quem]
      const w = s ? s.forca * janela(u, ...s.janela) : 0
      if (q && q.visible && w > 0) vAlvo.lerp(vB.set(q.position.x, 1.1, q.position.z), w)
    } else {
      f = suave(0, 1, u)
      vPos.set(...a.pos).lerp(vB.set(...b.pos), f)
      vAlvo.set(...a.alvo).lerp(vB.set(...b.alvo), f)
      // Arco: entre capítulos a câmera sobe um pouco, como um drone
      const dist = vA.set(...a.pos).distanceTo(vB.set(...b.pos))
      vPos.y += Math.sin(Math.PI * f) * Math.min(12, dist * 0.2)
    }
    // Final: sobe enquanto a leitura cobre a cena
    vPos.y += extra * 10
    vPos.z += extra * 8
    // Respiro na abertura e parallax do mouse
    const respiro = 1 - suave(0, 0.6, p)
    vPos.x += Math.sin(t * 0.25) * 2.2 * respiro
    vPos.y += Math.sin(t * 0.33) * 0.8 * respiro
    mx = lerp(mx, mouseX, 0.05)
    my = lerp(my, mouseY, 0.05)
    vPos.x += mx * 1.6
    vPos.y -= my * 0.9
    // Saída da abertura: a câmera "atravessa o olho" — nasce perto do prédio e recua
    if (intro < 1) {
      const k = 1 - intro
      vPos.lerp(vAlvo, k * 0.62)
      vPos.y += k * 4
    }
    // Nunca rente ao chão (quadros só de piso e sombra)
    vPos.y = Math.max(vPos.y, 2.4)
    camera.position.copy(vPos)
    camera.lookAt(vAlvo)

    const [ax, ay] = deslocamento(i)
    const [bx, by] = deslocamento(j)
    camera.setViewOffset(largura, altura, lerp(ax, bx, f) * largura, lerp(ay, by, f) * altura, largura, altura)
  }

  return {
    redimensionar,
    /** Compila os shaders sem travar a página (o primeiro desenho fica leve) */
    preparar() {
      luzDoDia(6.5)
      return renderer.compileAsync ? renderer.compileAsync(cena, camera) : Promise.resolve()
    },
    desenhar(p, h, extra, t, intro) {
      luzDoDia(h)
      historia(p, t)
      posicionarCamera(p, extra, t, intro)
      ceu.position.copy(camera.position)
      estrelas.position.copy(camera.position)
      renderer.render(cena, camera)
    },
  }
}

/* =====================================================================
   Ligando tudo
   ===================================================================== */

function iniciar() {
  revelar()
  medir()

  const canvas = $('.tr-cena')
  const ceuCss = $('.tr-ceu')
  let palco = null
  let montada = false

  let pSuave = progresso(scrollY)
  let medirDepois = true
  const topoCss = new Color()
  const baseCss = new Color()
  let chaveCss = -1
  let primeiro = true
  let avisarPronta
  const cenaPronta = new Promise((r) => (avisarPronta = r))

  const aoRedimensionar = () => {
    medirDepois = true
    palco?.redimensionar()
  }
  addEventListener('resize', aoRedimensionar, { passive: true })
  if ('ResizeObserver' in window) new ResizeObserver(() => (medirDepois = true)).observe($('.tr-capitulos'))
  document.fonts?.ready.then(() => (medirDepois = true))

  const t0 = performance.now()
  function quadro(agora) {
    requestAnimationFrame(quadro)
    if (medirDepois) {
      medir()
      medirDepois = false
    }
    const y = scrollY
    const alvo = progresso(y)
    pSuave = reduzido ? alvo : lerp(pSuave, alvo, 0.12)
    if (Math.abs(pSuave - alvo) < 0.0005) pSuave = alvo
    const h = horaEm(pSuave, y)
    atualizarHud(pSuave, h, y)
    atualizarEventos(pSuave)
    if (!montada) return

    // Leitura cobrindo a tela inteira: não precisa desenhar a cena
    const coberto = y > inicioLeitura + 40
    if (coberto && !primeiro) return
    const extra = clamp((y - marcos[marcos.length - 1]) / innerHeight)

    if (palco) {
      // 0 durante a abertura; vai a 1 em 2,6 s depois que a pupila abre
      const intro = instantePronto === null ? 0 : suave(0, 2600, agora - instantePronto)
      palco.desenhar(pSuave, h, extra, (agora - t0) / 1000, intro)
      if (primeiro) {
        primeiro = false
        html.classList.add('tr-cena-ok')
        avisarPronta()
      }
    } else {
      // Sem WebGL: o céu em CSS acompanha a hora
      const chave = Math.round(h * 20)
      if (chave !== chaveCss) {
        chaveCss = chave
        corDoCeu(h, topoCss, baseCss)
        ceuCss.style.background = `linear-gradient(180deg, #${topoCss.getHexString()} 0%, #${baseCss.getHexString()} 100%)`
      }
      if (primeiro) {
        primeiro = false
        avisarPronta()
      }
    }
  }
  requestAnimationFrame(quadro)
  abrir(cenaPronta)

  // Monta a cena só depois que o T terminou de abrir o olho e destravar: montar trava a
  // página por alguns instantes, e no meio da animação o olho "pularia" para aberto.
  // Enquanto monta, o T só pisca esperando.
  const DEPOIS_DO_LOGO = reduzido ? 0 : 1600
  requestAnimationFrame(() =>
    setTimeout(() => {
      try {
        palco = montarCena(canvas)
      } catch (erro) {
        console.warn('[trinco] cena 3D indisponível:', erro)
        palco = null
      }
      if (!palco) {
        html.classList.add('tr-sem-3d')
        montada = true
        return
      }
      palco
        .preparar()
        .catch(() => {})
        .finally(() => (montada = true))
    }, DEPOIS_DO_LOGO)
  )
}

iniciar()
