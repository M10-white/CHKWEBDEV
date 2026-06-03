/* =================================================
   CHKWEBDEV.GAME — Chambre PS1 interactive
   Three.js r160 — module ESM
================================================= */

import * as THREE from 'three'
import { OrbitControls }      from 'three/addons/controls/OrbitControls.js'
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js'

let MODE = null

/* ── Palette boîtiers ── */
const PALETTE = [0xe63946, 0x8e35c0, 0x3a86ff, 0xfb5607, 0x06d6a0, 0xffbe0b, 0xff006e, 0x57e8c3]

/* ── Données injectées par PHP ── */
const GAMES = (window.GAMES_DATA || []).map((g, i) => ({
    title:  g.title,
    desc:   g.description,
    tags:   g.tags || [],
    src:    g.src  || null,
    link:   g.link || null,
    year:   String(g.year),
    color:  PALETTE[i % PALETTE.length],
    status: g.src ? 'playable' : 'dev',
    cover:  g.cover || null,
}))

/* ── Résolution PS1 dynamique ── */
function ps1Res() {
    const div = window.innerWidth > 1400 ? 3 : 2.5
    return {
        w: Math.round(Math.max(window.innerWidth  / div, 320)),
        h: Math.round(Math.max(window.innerHeight / div, 240))
    }
}

/* ═══════════════════════════════════════════════
   RENDERER
═══════════════════════════════════════════════ */
const canvas = document.getElementById('gcanvas')
const { w: RW0, h: RH0 } = ps1Res()

const renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
renderer.setPixelRatio(1)
renderer.setSize(RW0, RH0)
renderer.shadowMap.enabled = true
renderer.shadowMap.type    = THREE.PCFShadowMap
renderer.outputColorSpace  = THREE.SRGBColorSpace

/* ── Scène ── */
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x06080f)
scene.fog = new THREE.FogExp2(0x06080f, 0.016)

/* ── Caméra ── */
const camera = new THREE.PerspectiveCamera(68, RW0 / RH0, 0.1, 60)
camera.position.set(0, 2.4, 7.2)

/* ── Contrôles ── */
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 1.8, 0)
controls.enablePan     = false
controls.enableZoom    = false
controls.enableDamping = true
controls.dampingFactor = 0.07
controls.rotateSpeed   = 0.32
controls.minPolarAngle  = Math.PI * 0.24
controls.maxPolarAngle  = Math.PI * 0.58
controls.minAzimuthAngle = -Math.PI * 0.52
controls.maxAzimuthAngle =  Math.PI * 0.52
controls.enabled = false
controls.update()

window.addEventListener('resize', () => {
    const { w, h } = ps1Res()
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
})

/* ═══════════════════════════════════════════════
   TEXTURES PROCÉDURALES
═══════════════════════════════════════════════ */
function makeTex(fn, size = 64, repeat = 1) {
    const c = document.createElement('canvas')
    c.width = size; c.height = size
    fn(c.getContext('2d'), size)
    const t = new THREE.CanvasTexture(c)
    t.magFilter = THREE.NearestFilter
    t.minFilter = THREE.NearestFilter
    if (repeat > 1) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, repeat) }
    return t
}

const texFloor = makeTex((ctx, s) => {
    ctx.fillStyle = '#18100a'
    ctx.fillRect(0, 0, s, s)
    for (let y = 0; y < s; y += 10) {
        const l = 10 + Math.floor(Math.random() * 12)
        ctx.fillStyle = `rgb(${l},${Math.floor(l*0.65)},${Math.floor(l*0.38)})`
        ctx.fillRect(0, y, s, 9)
        ctx.fillStyle = 'rgba(0,0,0,0.38)'
        ctx.fillRect(0, y + 9, s, 1)
    }
    for (let i = 0; i < 80; i++) {
        const v = Math.floor(Math.random() * 16)
        ctx.fillStyle = `rgba(${v},${Math.floor(v*0.6)},0,0.4)`
        ctx.fillRect(Math.random() * s, Math.random() * s, 1, 1)
    }
}, 64, 6)

const texWall = makeTex((ctx, s) => {
    ctx.fillStyle = '#0d1020'
    ctx.fillRect(0, 0, s, s)
    for (let i = 0; i < 160; i++) {
        const v = Math.floor(Math.random() * 6)
        ctx.fillStyle = `rgba(${v},${v},${v+3},0.35)`
        ctx.fillRect(Math.random() * s, Math.random() * s, 2, 2)
    }
}, 64, 4)

const texWood = makeTex((ctx, s) => {
    ctx.fillStyle = '#2a1a08'
    ctx.fillRect(0, 0, s, s)
    for (let y = 0; y < s; y += 4) {
        const v = 10 + Math.floor(Math.random() * 10)
        ctx.fillStyle = `rgba(${v},${Math.floor(v*0.5)},0,0.28)`
        ctx.fillRect(0, y, s, 3)
    }
}, 32, 2)

const texCarpet = makeTex((ctx, s) => {
    ctx.fillStyle = '#1a1240'
    ctx.fillRect(0, 0, s, s)
    for (let x = 0; x < s; x += 4)
        for (let y = 0; y < s; y += 4)
            if ((x + y) % 8 === 0) {
                ctx.fillStyle = 'rgba(100,80,200,0.1)'
                ctx.fillRect(x, y, 4, 4)
            }
}, 32, 3)

/* ── Texture fenêtre (pluie animée sur le verre) ── */
const wGlassCanvas = document.createElement('canvas')
wGlassCanvas.width = wGlassCanvas.height = 128
const wGlassCtx    = wGlassCanvas.getContext('2d')
const wGlassTex    = new THREE.CanvasTexture(wGlassCanvas)
wGlassTex.magFilter = THREE.NearestFilter
wGlassTex.minFilter = THREE.NearestFilter

const glassDrops = Array.from({ length: 35 }, () => ({
    x: Math.random() * 128,
    y: Math.random() * 128,
    v: 0.35 + Math.random() * 1.1,
    l: 5 + Math.random() * 18,
    w: 1 + Math.random()
}))

function updateGlass() {
    wGlassCtx.fillStyle = 'rgba(6, 14, 40, 0.95)'
    wGlassCtx.fillRect(0, 0, 128, 128)
    wGlassCtx.fillStyle = 'rgba(15, 30, 65, 0.25)'
    wGlassCtx.fillRect(0, 0, 128, 128)

    glassDrops.forEach(d => {
        d.y += d.v
        if (d.y > 128 + d.l) { d.y = -d.l; d.x = Math.random() * 128 }
        wGlassCtx.strokeStyle = `rgba(${100 + Math.random()*30}, 155, 215, 0.55)`
        wGlassCtx.lineWidth   = d.w
        wGlassCtx.beginPath()
        wGlassCtx.moveTo(d.x, d.y)
        wGlassCtx.lineTo(d.x + 0.6, d.y + d.l)
        wGlassCtx.stroke()
    })

    wGlassTex.needsUpdate = true
}

/* ═══════════════════════════════════════════════
   MATÉRIAUX
═══════════════════════════════════════════════ */
function lm(hex, opts = {}) {
    return new THREE.MeshLambertMaterial({ color: hex, flatShading: true, ...opts })
}

const M = {
    floor:     lm(0x18100a, { map: texFloor }),
    carpet:    lm(0x1a1240, { map: texCarpet }),
    wall:      lm(0x0d1020, { map: texWall }),
    wallDark:  lm(0x080d18, { map: texWall }),
    ceiling:   lm(0x08090e),
    wood:      lm(0x2a1a08, { map: texWood }),
    woodLight: lm(0x3d2810, { map: texWood }),
    shelf:     lm(0x2a1a08, { map: texWood }),
    desk:      lm(0x1e1208, { map: texWood }),
    bed:       lm(0x1a2744),
    sheet:     lm(0x1c3568),
    pillow:    lm(0xb0a090),
    monitor:   lm(0x111318),
    screen:    lm(0x063d2a, { emissive: new THREE.Color(0x16e694), emissiveIntensity: 0.65 }),
    keyboard:  lm(0x151820),
    chair:     lm(0x0f0f14),
    chairSeat: lm(0x1a1f2e),
    lamp:      lm(0x252830),
    lampShade: lm(0xb8902a, { emissive: new THREE.Color(0xffcc44), emissiveIntensity: 0.25 }),
    led:       lm(0x16e694, { emissive: new THREE.Color(0x16e694), emissiveIntensity: 1.0 }),
    window:    lm(0x0a1830, { map: wGlassTex, transparent: true, opacity: 0.88 }),
    poster:    lm(0x0a1628),
    posterAcc: lm(0x1a0a28, { emissive: new THREE.Color(0x4a0a8a), emissiveIntensity: 0.08 }),
    console:   lm(0x0f1014),
}

/* ── Helper boîte ── */
function box(w, h, d, mat, x = 0, y = 0, z = 0, ry = 0) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
    mesh.position.set(x, y, z)
    if (ry) mesh.rotation.y = ry
    mesh.castShadow = mesh.receiveShadow = true
    scene.add(mesh)
    return mesh
}

/* ── Texture étiquette canvas (avec cover image async) ── */
function makeLabel(game) {
    const c = document.createElement('canvas')
    c.width = 128; c.height = 128
    const ctx = c.getContext('2d')
    const r = (game.color >> 16) & 0xff
    const g = (game.color >> 8)  & 0xff
    const b =  game.color        & 0xff

    function drawBase(coverImg) {
        ctx.clearRect(0, 0, 128, 128)

        if (coverImg) {
            ctx.drawImage(coverImg, 0, 0, 128, 97)
            ctx.fillStyle = 'rgba(0,0,0,0.28)'
            ctx.fillRect(0, 0, 128, 97)
        } else {
            const grad = ctx.createLinearGradient(0, 0, 128, 128)
            grad.addColorStop(0, `rgb(${Math.min(r+55,255)},${Math.min(g+55,255)},${Math.min(b+55,255)})`)
            grad.addColorStop(1, `rgb(${Math.floor(r*0.35)},${Math.floor(g*0.35)},${Math.floor(b*0.35)})`)
            ctx.fillStyle = grad
            ctx.fillRect(0, 0, 128, 128)
            ctx.fillStyle = 'rgba(255,255,255,0.07)'
            for (let i = 0; i < 128; i += 8)
                for (let j = 17; j < 80; j += 8)
                    if ((i + j) % 16 === 0) ctx.fillRect(i, j, 8, 8)
        }

        // Header bande
        ctx.fillStyle = `rgba(${r},${g},${b},0.88)`
        ctx.fillRect(0, 0, 128, 17)
        ctx.fillStyle = 'rgba(0,0,0,0.65)'
        ctx.font = 'bold 8px monospace'
        ctx.textAlign = 'left';  ctx.fillText('CHK', 4, 12)
        ctx.textAlign = 'right'; ctx.fillText('GAME', 124, 12)

        // Zone titre sombre
        ctx.fillStyle = 'rgba(0,0,0,0.72)'
        ctx.fillRect(0, 79, 128, 49)

        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 11px sans-serif'
        ctx.textAlign = 'center'
        const words = game.title.split(' ')
        let line = '', lines = []
        words.forEach(w => {
            const test = line + w + ' '
            if (ctx.measureText(test).width > 116) { lines.push(line.trim()); line = w + ' ' }
            else line = test
        })
        lines.push(line.trim())
        const ty = 93 - (lines.length - 1) * 7
        lines.forEach((l, i) => ctx.fillText(l, 64, ty + i * 14, 120))

        ctx.fillStyle = `rgba(${Math.min(r+100,255)},${Math.min(g+100,255)},${Math.min(b+100,255)},0.9)`
        ctx.font = '8px monospace'
        ctx.fillText(game.year, 64, 122)
    }

    drawBase(null)

    const tex = new THREE.CanvasTexture(c)
    tex.magFilter = THREE.NearestFilter
    tex.minFilter = THREE.NearestFilter

    if (game.cover) {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload  = () => { drawBase(img); tex.needsUpdate = true }
        img.onerror = () => {}
        img.src = game.cover
    }

    return tex
}

/* ═══════════════════════════════════════════════
   CARTOUCHE DE JEU (groupe de meshes)
═══════════════════════════════════════════════ */
function makeCartridge(game, x, y, z) {
    const col   = new THREE.Color(game.color)
    const dark  = col.clone().multiplyScalar(0.18)
    const mid   = col.clone().multiplyScalar(0.50)
    const emCol = col.clone().multiplyScalar(0.06)

    const mBody  = new THREE.MeshLambertMaterial({ color: col,       flatShading: true })
    const mTop   = new THREE.MeshLambertMaterial({ color: dark,      flatShading: true })
    const mMid   = new THREE.MeshLambertMaterial({ color: mid,       flatShading: true })
    const mLabel = new THREE.MeshLambertMaterial({ map: makeLabel(game), flatShading: true, emissive: emCol })
    const mPins  = new THREE.MeshLambertMaterial({ color: 0x080806,  flatShading: true })
    const mGold  = new THREE.MeshLambertMaterial({ color: 0x9a8840,  flatShading: true })

    const g = new THREE.Group()
    g.userData.game = game

    function pm(w, h, d, mat, mx = 0, my = 0, mz = 0) {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
        mesh.position.set(mx, my, mz)
        mesh.castShadow = mesh.receiveShadow = true
        g.add(mesh)
    }

    // Corps principal
    pm(0.88, 1.04, 0.19, mBody,  0,     0.54,  0)
    // Grip supérieur — plus large et profond
    pm(0.88, 0.24, 0.23, mTop,   0,     1.16,  0)
    // Bande de séparation
    pm(0.88, 0.05, 0.21, mMid,   0,     1.04,  0)
    // Étiquette avant (légèrement en relief)
    pm(0.72, 0.72, 0.022,mLabel, 0,     0.56,  0.107)
    // Barre de broches basse
    pm(0.70, 0.10, 0.15, mPins,  0,     0.05,  0)
    // 4 contacts dorés
    for (let i = -1.5; i <= 1.5; i++) {
        pm(0.06, 0.07, 0.17, mGold, i * 0.13, 0.05, 0)
    }
    // Encoches grip haut G + D
    pm(0.15, 0.25, 0.06, mTop, -0.29, 1.16,  0.12)
    pm(0.15, 0.25, 0.06, mTop,  0.29, 1.16,  0.12)
    // Tranche droite (spine colorée)
    pm(0.04, 1.04, 0.19, mMid, -0.46, 0.54,  0)
    // Petit logo en relief centre haut du label
    pm(0.12, 0.06, 0.02, mMid,  0,    0.88,  0.12)

    g.position.set(x, y, z)
    scene.add(g)
    return g
}

/* ═══════════════════════════════════════════════
   CHAMBRE  —  W=12  H=7  D=11
═══════════════════════════════════════════════ */
const RW = 12, RH = 7, RD = 11

// Sol
const floorMesh = new THREE.Mesh(new THREE.PlaneGeometry(RW, RD), M.floor)
floorMesh.rotation.x = -Math.PI / 2
floorMesh.receiveShadow = true
scene.add(floorMesh)

// Tapis
const carpetMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 2.2), M.carpet)
carpetMesh.rotation.x = -Math.PI / 2
carpetMesh.position.set(-3.8, 0.006, 0.8)
carpetMesh.receiveShadow = true
scene.add(carpetMesh)

// Plafond
const ceilMesh = new THREE.Mesh(new THREE.PlaneGeometry(RW, RD), M.ceiling)
ceilMesh.rotation.x = Math.PI / 2
ceilMesh.position.y = RH
scene.add(ceilMesh)

// Murs
const mkWall = (w, h, x, y, z, ry, mat) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat)
    m.position.set(x, y, z)
    m.rotation.y = ry
    m.receiveShadow = true
    scene.add(m)
}
mkWall(RW, RH, 0,      RH/2, -RD/2, 0,          M.wallDark)
mkWall(RD, RH, -RW/2, RH/2,  0,     Math.PI/2,  M.wall)
mkWall(RD, RH,  RW/2, RH/2,  0,    -Math.PI/2,  M.wall)

/* ── Lit ── */
box(3.4, 0.22, 1.95, M.wood,     -4.1, 0.11, -2.0)
box(3.4, 0.9,  0.12, M.wood,     -4.1, 0.64, -2.93)
box(3.4, 0.38, 0.12, M.wood,     -4.1, 0.33, -1.07)
box(3.2, 0.28, 1.76, M.sheet,    -4.1, 0.39, -2.0)
box(3.0, 0.08, 1.65, M.bed,      -4.1, 0.55, -2.0)
box(0.92, 0.16, 0.52, M.pillow,  -3.6, 0.64, -2.68)
box(0.92, 0.16, 0.52, M.pillow,  -4.6, 0.64, -2.68)

/* ── Table de chevet ── */
box(0.54, 0.52, 0.52, M.woodLight, -2.56, 0.26, -2.82)
box(0.50, 0.04, 0.48, M.woodLight, -2.56, 0.54, -2.82)
box(0.07, 0.38, 0.07, M.lamp,      -2.56, 0.77, -2.82)
box(0.30, 0.24, 0.30, M.lampShade, -2.56, 1.04, -2.82)

/* ── Bureau + PC ── */
box(0.08, 0.72, 0.08, M.desk,  3.15, 0.36, -3.88)
box(0.08, 0.72, 0.08, M.desk,  4.55, 0.36, -3.88)
box(0.08, 0.72, 0.08, M.desk,  3.15, 0.36, -3.06)
box(0.08, 0.72, 0.08, M.desk,  4.55, 0.36, -3.06)
box(1.58, 0.07, 1.00, M.desk,  3.85, 0.76, -3.47)
box(0.32, 0.05, 0.32, M.monitor, 3.85, 0.82, -3.60)
box(0.06, 0.18, 0.06, M.monitor, 3.85, 0.93, -3.60)
box(1.00, 0.72, 0.54, M.monitor, 3.85, 1.33, -3.70)
box(0.80, 0.56, 0.01, M.screen,  3.85, 1.37, -3.43)
box(0.76, 0.04, 0.26, M.keyboard, 3.85, 0.80, -3.14)
box(0.12, 0.04, 0.17, M.keyboard, 4.40, 0.80, -3.18)
box(0.28, 0.55, 0.48, M.monitor,  4.50, 0.27, -3.65)
box(0.04, 0.04, 0.04, M.led,      4.36, 0.38, -3.45)

/* ── Chaise gaming ── */
box(0.48, 0.05, 0.48, M.chairSeat, 3.85, 0.50, -2.55)
box(0.44, 0.62, 0.08, M.chair,     3.85, 0.88, -2.78)
for (const [ox, oz] of [[-0.18,-0.18],[0.18,-0.18],[-0.18,0.18],[0.18,0.18]])
    box(0.05, 0.48, 0.05, M.chair, 3.85+ox, 0.24, -2.55+oz)

/* ── Fenêtre ── */
const winMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 1.5), M.window)
winMesh.position.set(5.98, 3.3, -1.2)
winMesh.rotation.y = -Math.PI / 2
scene.add(winMesh)
box(0.04, 1.58, 0.04, M.wood, 5.97, 3.3,  -0.27)
box(0.04, 1.58, 0.04, M.wood, 5.97, 3.3,  -2.13)
box(0.04, 0.04, 1.90, M.wood, 5.97, 2.53, -1.2)
box(0.04, 0.04, 1.90, M.wood, 5.97, 4.07, -1.2)
box(0.04, 1.58, 0.02, M.wood, 5.97, 3.3,  -1.2)
box(0.04, 0.02, 1.90, M.wood, 5.97, 3.3,  -1.2)

/* ── Posters ── */
const p1 = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.4), M.poster)
p1.position.set(-5.98, 3.2, -0.6); p1.rotation.y = Math.PI/2; scene.add(p1)
const p2 = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.1), M.posterAcc)
p2.position.set(-5.98, 3.1, 1.2);  p2.rotation.y = Math.PI/2; scene.add(p2)

/* ═══════════════════════════════════════════════
   ÉTAGÈRE DE JEUX
═══════════════════════════════════════════════ */
box(5.8, 4.8, 0.10, M.shelf,  0, 2.7, -5.46)
box(0.08, 4.8, 0.32, M.shelf,  2.92, 2.7, -5.32)
box(0.08, 4.8, 0.32, M.shelf, -2.92, 2.7, -5.32)

const shelfYs = [0.88, 2.28, 3.68]
for (const sy of shelfYs)
    box(5.72, 0.07, 0.34, M.shelf, 0, sy, -5.32)
box(5.72, 0.07, 0.34, M.shelf, 0, 4.52, -5.32)

// LED strip
box(5.6, 0.04, 0.04, M.led, 0, 4.60, -5.26)

/* ── Cartouches ── */
const clickables = []

const ROWS = [
    { y: shelfYs[0], max: 4, startX: -2.0 },
    { y: shelfYs[1], max: 5, startX: -2.5 },
    { y: shelfYs[2], max: 4, startX: -2.0 },
]
const SPACING = 1.25
let gi = 0
for (const row of ROWS) {
    const count = Math.min(row.max, GAMES.length - gi)
    for (let i = 0; i < count; i++, gi++) {
        const cart = makeCartridge(GAMES[gi], row.startX + i * SPACING, row.y, -5.26)
        clickables.push(cart)
    }
}

// Console + manette sur tablette basse
box(0.65, 0.12, 0.38, M.console, -2.2, 0.96, -5.28)
box(0.08, 0.08, 0.08, M.console, -1.75, 0.96, -5.15)
box(0.32, 0.08, 0.22, M.console, -2.2, 0.88, -4.90)

/* ═══════════════════════════════════════════════
   ÉCLAIRAGE
═══════════════════════════════════════════════ */
scene.add(new THREE.HemisphereLight(0x3a5080, 0x1a1008, 55))

const ceilLight  = new THREE.PointLight(0x8aaade, 700, 0, 1.8)
ceilLight.position.set(0.5, RH - 0.6, -1.5)
ceilLight.castShadow = true; ceilLight.shadow.mapSize.set(512, 512)
scene.add(ceilLight)

const ceilLight2 = new THREE.PointLight(0x8aaade, 500, 0, 1.8)
ceilLight2.position.set(0, RH - 0.6, -4.0)
scene.add(ceilLight2)

const lampLight  = new THREE.PointLight(0xffcc55, 380, 0, 2.0)
lampLight.position.set(-2.56, 1.35, -2.82)
scene.add(lampLight)

const screenLight = new THREE.PointLight(0x16e694, 280, 0, 2.0)
screenLight.position.set(3.85, 1.5, -2.9)
scene.add(screenLight)

const moonLight  = new THREE.PointLight(0x3060b8, 600, 0, 1.8)
moonLight.position.set(4.5, 3.3, -1.2)
scene.add(moonLight)

const ledLight   = new THREE.PointLight(0x16e694, 320, 0, 2.0)
ledLight.position.set(0, 5.2, -5.0)
scene.add(ledLight)

const fillLight  = new THREE.PointLight(0x506080, 400, 0, 1.8)
fillLight.position.set(0, 3.0, -1.5)
scene.add(fillLight)

/* ── Lumière d'orage (éclair) ── */
const lightning = new THREE.PointLight(0xc8d8ff, 0, 0, 1.5)
lightning.position.set(9, 7, -5)
scene.add(lightning)

/* ═══════════════════════════════════════════════
   PLUIE EXTÉRIEURE (LineSegments)
═══════════════════════════════════════════════ */
const RAIN_COUNT = 700
const rainPos    = new Float32Array(RAIN_COUNT * 6)
const rainSpeeds = new Float32Array(RAIN_COUNT)
const rainLens   = new Float32Array(RAIN_COUNT)

for (let i = 0; i < RAIN_COUNT; i++) {
    const x = 6.5 + Math.random() * 14
    const y = Math.random() * 16
    const z = -6  + Math.random() * 7
    const l = 0.10 + Math.random() * 0.22
    rainPos[i*6]   = x; rainPos[i*6+1] = y;     rainPos[i*6+2] = z
    rainPos[i*6+3] = x; rainPos[i*6+4] = y - l; rainPos[i*6+5] = z
    rainSpeeds[i]  = 0.08 + Math.random() * 0.12
    rainLens[i]    = l
}

const rainGeo  = new THREE.BufferGeometry()
rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3))
const rainMat  = new THREE.LineBasicMaterial({ color: 0x6688aa, transparent: true, opacity: 0.38 })
const rainMesh = new THREE.LineSegments(rainGeo, rainMat)
scene.add(rainMesh)

function updateRain() {
    for (let i = 0; i < RAIN_COUNT; i++) {
        rainPos[i*6+1] -= rainSpeeds[i]
        rainPos[i*6+4] -= rainSpeeds[i]
        if (rainPos[i*6+4] < -2) {
            const y = 14 + Math.random() * 4
            rainPos[i*6+1] = y
            rainPos[i*6+4] = y - rainLens[i]
        }
    }
    rainGeo.attributes.position.needsUpdate = true
}

/* ═══════════════════════════════════════════════
   SYSTÈME D'ÉCLAIRS
═══════════════════════════════════════════════ */
let ltnSeq       = []
let ltnStart     = 0
let ltnCooldown  = 180 + Math.random() * 300

// Séquence flash : [délai ms, intensité]
function triggerLightning() {
    ltnSeq = [[0,5500],[85,400],[155,8000],[300,0]]
    ltnStart = performance.now()
    setTimeout(playThunder, 600 + Math.random() * 1800)
}

function updateLightning() {
    if (!ltnSeq.length) { lightning.intensity = 0; return }
    const elapsed = performance.now() - ltnStart
    while (ltnSeq.length && elapsed >= ltnSeq[0][0]) {
        lightning.intensity = ltnSeq.shift()[1]
    }
}

/* ═══════════════════════════════════════════════
   AUDIO (Web Audio API — aucun fichier externe)
═══════════════════════════════════════════════ */
let audioCtx = null

function initAudio() {
    if (audioCtx) return
    audioCtx = new AudioContext()
    startRainAudio()
    startDrones()
}

function makeNoiseBuf(sec) {
    const n   = Math.ceil(audioCtx.sampleRate * sec)
    const buf = audioCtx.createBuffer(1, n, audioCtx.sampleRate)
    const d   = buf.getChannelData(0)
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1
    return buf
}

function startRainAudio() {
    const src = audioCtx.createBufferSource()
    src.buffer = makeNoiseBuf(4)
    src.loop   = true

    // Bruit blanc → son de pluie par filtrage
    const f1 = audioCtx.createBiquadFilter()
    f1.type = 'bandpass'; f1.frequency.value = 2500; f1.Q.value = 0.55

    const f2 = audioCtx.createBiquadFilter()
    f2.type = 'lowpass'; f2.frequency.value = 7000

    const f3 = audioCtx.createBiquadFilter()
    f3.type = 'peaking'; f3.frequency.value = 350; f3.gain.value = 5

    const gain = audioCtx.createGain()
    gain.gain.setValueAtTime(0, audioCtx.currentTime)
    gain.gain.linearRampToValueAtTime(0.13, audioCtx.currentTime + 4)

    src.connect(f1); f1.connect(f2); f2.connect(f3); f3.connect(gain)
    gain.connect(audioCtx.destination)
    src.start()
}

function startDrones() {
    // Nappe sombre : A1 (55 Hz), E2 (82.4 Hz), A2 (110 Hz)
    [[55, 0.055], [82.4, 0.038], [110, 0.022]].forEach(([freq, vol], i) => {
        const o1 = audioCtx.createOscillator()
        const o2 = audioCtx.createOscillator()
        o1.type = 'sine';     o1.frequency.value = freq
        o2.type = 'triangle'; o2.frequency.value = freq * 1.006

        const gain = audioCtx.createGain()
        gain.gain.setValueAtTime(0, audioCtx.currentTime)
        gain.gain.linearRampToValueAtTime(vol, audioCtx.currentTime + 6)

        // LFO tremolo lent
        const lfo  = audioCtx.createOscillator()
        lfo.frequency.value = 0.06 + i * 0.018
        const lfoG = audioCtx.createGain()
        lfoG.gain.value = 0.004
        lfo.connect(lfoG); lfoG.connect(gain.gain)

        // Delay feedback (fausse reverb)
        const del = audioCtx.createDelay(1)
        del.delayTime.value = 0.38
        const fb  = audioCtx.createGain()
        fb.gain.value = 0.38
        del.connect(fb); fb.connect(del)

        o1.connect(gain); o2.connect(gain)
        gain.connect(del)
        del.connect(audioCtx.destination)
        gain.connect(audioCtx.destination)

        o1.start(); o2.start(); lfo.start()
    })
}

function playThunder() {
    if (!audioCtx) return
    const ct = audioCtx.currentTime

    // Grondement basse fréquence
    const osc = audioCtx.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(28 + Math.random() * 18, ct)
    osc.frequency.exponentialRampToValueAtTime(16, ct + 2.5)

    const og = audioCtx.createGain()
    og.gain.setValueAtTime(0.22, ct)
    og.gain.exponentialRampToValueAtTime(0.001, ct + 3)

    // Craquement haute fréquence
    const ns = audioCtx.createBufferSource()
    ns.buffer = makeNoiseBuf(3.5)

    const nf = audioCtx.createBiquadFilter()
    nf.type = 'bandpass'; nf.frequency.value = 130; nf.Q.value = 0.35

    const ng = audioCtx.createGain()
    ng.gain.setValueAtTime(0.28, ct)
    ng.gain.exponentialRampToValueAtTime(0.001, ct + 3.5)

    osc.connect(og); og.connect(audioCtx.destination)
    ns.connect(nf);  nf.connect(ng); ng.connect(audioCtx.destination)
    osc.start(ct); osc.stop(ct + 3)
    ns.start(ct);  ns.stop(ct + 3.5)
}

/* ═══════════════════════════════════════════════
   MODE SELECTION
═══════════════════════════════════════════════ */
const modeSelectEl = document.getElementById('mode-select')
const fpsUiEl      = document.getElementById('fps-ui')
const fpsInteractEl= document.getElementById('fps-interact')
const fpsLockHint  = document.getElementById('fps-lock-hint')
const gnavHint     = document.querySelector('.gnav-hint')

modeSelectEl.querySelectorAll('.ms-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        initAudio()
        MODE = btn.dataset.mode
        modeSelectEl.style.opacity = '0'
        modeSelectEl.style.pointerEvents = 'none'
        setTimeout(() => modeSelectEl.remove(), 600)

        if (MODE === 'free') {
            controls.enabled = true
            gnavHint.textContent = 'Glisser pour explorer · Cliquer sur un jeu'
        } else {
            initFPS()
            gnavHint.textContent = 'ZQSD · Marcher  ·  E · Interagir  ·  Échap · Déverrouiller'
        }
    })
})

/* ── État FPS ── */
let fpsControls   = null
let fpsLookTarget = null
const fpsMoveKeys  = { f: false, b: false, l: false, r: false }
const fpsCenterRay = new THREE.Raycaster()

function initFPS() {
    camera.position.set(0, 1.7, 3.5)
    camera.rotation.set(0, 0, 0)

    fpsControls = new PointerLockControls(camera, renderer.domElement)

    fpsControls.addEventListener('lock',   () => { fpsLockHint.style.display = 'none' })
    fpsControls.addEventListener('unlock', () => { fpsLockHint.style.display = 'block' })

    document.addEventListener('keydown', e => {
        if (MODE !== 'fps') return
        switch (e.code) {
            case 'KeyW': case 'KeyZ': case 'ArrowUp':    fpsMoveKeys.f = true; break
            case 'KeyS': case 'ArrowDown':                fpsMoveKeys.b = true; break
            case 'KeyA': case 'KeyQ': case 'ArrowLeft':  fpsMoveKeys.l = true; break
            case 'KeyD': case 'ArrowRight':               fpsMoveKeys.r = true; break
            case 'KeyE':
                if (fpsLookTarget) openPanel(fpsLookTarget.userData.game)
                break
        }
    })

    document.addEventListener('keyup', e => {
        if (MODE !== 'fps') return
        switch (e.code) {
            case 'KeyW': case 'KeyZ': case 'ArrowUp':    fpsMoveKeys.f = false; break
            case 'KeyS': case 'ArrowDown':                fpsMoveKeys.b = false; break
            case 'KeyA': case 'KeyQ': case 'ArrowLeft':  fpsMoveKeys.l = false; break
            case 'KeyD': case 'ArrowRight':               fpsMoveKeys.r = false; break
        }
    })

    fpsUiEl.style.display = 'block'
}

function updateFPS(delta) {
    if (!fpsControls?.isLocked) return

    const spd = 4.2 * delta
    const fwd = new THREE.Vector3()
    camera.getWorldDirection(fwd); fwd.y = 0; fwd.normalize()
    const right = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0,1,0)).normalize()

    if (fpsMoveKeys.f) camera.position.addScaledVector(fwd,   spd)
    if (fpsMoveKeys.b) camera.position.addScaledVector(fwd,  -spd)
    if (fpsMoveKeys.l) camera.position.addScaledVector(right, -spd)
    if (fpsMoveKeys.r) camera.position.addScaledVector(right,  spd)

    camera.position.x = Math.max(-5.4, Math.min(5.4, camera.position.x))
    camera.position.z = Math.max(-4.6, Math.min(4.6, camera.position.z))
    camera.position.y = 1.7

    fpsCenterRay.setFromCamera(new THREE.Vector2(0, 0), camera)
    const hits = fpsCenterRay.intersectObjects(clickables, true)
    if (hits.length > 0 && hits[0].distance < 3.2) {
        fpsLookTarget = findGame(hits[0].object)
        fpsInteractEl.style.opacity = '1'
    } else {
        fpsLookTarget = null
        fpsInteractEl.style.opacity = '0'
    }
}

/* ═══════════════════════════════════════════════
   INTERACTION — Raycaster
═══════════════════════════════════════════════ */
const raycaster = new THREE.Raycaster()
const pointer   = new THREE.Vector2()

const panelEl   = document.getElementById('gpanel')
const gpYear    = document.getElementById('gp-year')
const gpTitle   = document.getElementById('gp-title')
const gpDesc    = document.getElementById('gp-desc')
const gpTags    = document.getElementById('gp-tags')
const gpActions = document.getElementById('gp-actions')
const closeBtn  = document.getElementById('gpanel-close')

let hoveredGroup = null
let panelOpen    = false

function ptrFromEvent(e) {
    const r   = canvas.getBoundingClientRect()
    pointer.x =  ((e.clientX - r.left) / r.width)  * 2 - 1
    pointer.y = -((e.clientY - r.top)  / r.height) * 2 + 1
}

function findGame(obj) {
    let o = obj
    while (o) { if (o.userData.game) return o; o = o.parent }
    return null
}

canvas.addEventListener('mousemove', e => {
    if (MODE !== 'free') return
    if (!audioCtx) initAudio()
    ptrFromEvent(e)
    raycaster.setFromCamera(pointer, camera)
    const hits = raycaster.intersectObjects(clickables, true)
    const hit  = hits.length ? findGame(hits[0].object) : null

    if (hit !== hoveredGroup) {
        if (hoveredGroup) hoveredGroup.scale.setScalar(1)
        hoveredGroup = hit
        if (hoveredGroup) hoveredGroup.scale.setScalar(1.08)
    }
    canvas.classList.toggle('hovering', !!hoveredGroup)
})

canvas.addEventListener('click', e => {
    if (!audioCtx) initAudio()

    if (MODE === 'fps') {
        if (fpsControls && !fpsControls.isLocked) {
            fpsControls.lock()
        } else if (fpsLookTarget) {
            openPanel(fpsLookTarget.userData.game)
        }
        return
    }

    ptrFromEvent(e)
    raycaster.setFromCamera(pointer, camera)
    const hits = raycaster.intersectObjects(clickables, true)
    if (hits.length) {
        const grp = findGame(hits[0].object)
        if (grp) openPanel(grp.userData.game)
    }
})

function openPanel(g) {
    gpYear.textContent  = g.year
    gpTitle.textContent = g.title
    gpDesc.textContent  = g.desc
    gpTags.innerHTML    = g.tags.map(t => `<span class="gtag">${t}</span>`).join('')

    let actions = ''
    if (g.status === 'dev')
        actions += `<span class="gp-status">En développement</span>`
    if (g.link)
        actions += `<a href="${g.link}" target="_blank" rel="noopener" class="gbtn gbtn--code">Code source</a>`

    gpActions.innerHTML = actions
    panelEl.setAttribute('aria-hidden', 'false')
    panelEl.classList.add('open')
    panelOpen = true
}

closeBtn.addEventListener('click', () => {
    panelEl.classList.remove('open')
    panelEl.setAttribute('aria-hidden', 'true')
    panelOpen = false
})

window.addEventListener('keydown', e => { if (e.key === 'Escape' && panelOpen) closeBtn.click() })

/* ═══════════════════════════════════════════════
   BOUCLE DE RENDU
═══════════════════════════════════════════════ */
let t = 0
let prevTime = performance.now()

function animate() {
    requestAnimationFrame(animate)
    const now   = performance.now()
    const delta = Math.min((now - prevTime) / 1000, 0.1)
    prevTime = now
    t++

    // Pluie extérieure
    updateRain()

    // Pluie sur la vitre
    if (t % 2 === 0) updateGlass()

    // Scintillement moniteur
    const flicker = 0.6 + Math.sin(t * 0.11) * 0.04 + Math.sin(t * 0.31) * 0.02
    M.screen.emissiveIntensity = flicker
    screenLight.intensity      = flicker * 280

    // Respiration lampe
    lampLight.intensity = 380 + Math.sin(t * 0.05) * 28

    // LED étagère
    ledLight.intensity  = 320 * (0.88 + Math.sin(t * 0.02) * 0.12)

    // Lumière lunaire qui vacille légèrement
    moonLight.intensity = 600 + Math.sin(t * 0.03) * 40

    // Éclairs
    ltnCooldown--
    if (ltnCooldown <= 0 && !ltnSeq.length) {
        if (Math.random() < 0.006) {
            triggerLightning()
            ltnCooldown = 200 + Math.random() * 400
        } else {
            ltnCooldown = 30
        }
    }
    updateLightning()

    if (MODE === 'free') controls.update()
    else if (MODE === 'fps') updateFPS(delta)

    renderer.render(scene, camera)
}

animate()
