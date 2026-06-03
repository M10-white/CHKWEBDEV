/* =================================================
   CHKCharacter — "Navi" — esprit lumineux flottant
   Palette : cyan #4dd9f0 + lime #a8e63d (logo CHK)
   États : sleep | waking | awake
================================================= */

class CHKCharacter {

    constructor(id) {
        this.c   = document.getElementById(id)
        this.ctx = this.c.getContext('2d')

        this.t          = 0
        this.state      = 'sleep'
        this.eyeOpen    = 0
        this.colorPhase = 0      // 0 = lime (sleep) → 1 = cyan (awake)
        this.mouse      = { x: innerWidth / 2, y: innerHeight / 2 }
        this.lookX      = innerWidth  / 2
        this.lookY      = innerHeight / 2
        this.mouseLock  = false
        this.pulses     = []
        this.onWake     = null

        this.floatPhase = Math.random() * Math.PI * 2
        this.flapPhase  = 0
        this.glowPulse  = 0

        this.blinkVal     = 1
        this.blinkTimer   = 0
        this.blinkNext    = 150 + Math.random() * 220

        this.scaleX = 1
        this.scaleY = 1

        this.resize()
        window.addEventListener('resize', () => this.resize())
        window.addEventListener('mousemove', e => {
            if (!this.mouseLock) { this.mouse.x = e.clientX; this.mouse.y = e.clientY }
        })
        this.loop()
    }

    resize() {
        this.c.width  = innerWidth
        this.c.height = innerHeight
        this.cx = innerWidth  / 2
        this.cy = innerHeight / 2
        this.r  = Math.min(innerWidth, innerHeight) * 0.100
        this.initStars()
        this.initSparkles()
    }

    /* ── Interpolation couleur lime ↔ cyan ── */
    _col(p) {
        const r = Math.round(168 + (77  - 168) * p)
        const g = Math.round(230 + (217 - 230) * p)
        const b = Math.round(61  + (240 - 61 ) * p)
        return `${r},${g},${b}`
    }

    initStars() {
        this.stars = Array.from({ length: 130 }, () => ({
            x: Math.random() * innerWidth,
            y: Math.random() * innerHeight,
            r: 0.3 + Math.random() * 1.4,
            base: 0.03 + Math.random() * 0.20,
            ph: Math.random() * Math.PI * 2,
            spd: 0.005 + Math.random() * 0.012
        }))
    }

    initSparkles() {
        this.sparkles = Array.from({ length: 55 }, (_, i) => ({
            ang:   (i / 55) * Math.PI * 2,
            orbit: this.r * (1.2 + Math.random() * 0.9),
            spd:   (0.004 + Math.random() * 0.006) * (Math.random() > 0.5 ? 1 : -1),
            sz:    0.8 + Math.random() * 2.2,
            al:    0.10 + Math.random() * 0.45,
            ph:    Math.random() * Math.PI * 2,
            lime:  Math.random() > 0.5   // cyan ou lime
        }))
    }

    /* ── Réveil ── */

    wake() {
        if (this.state !== 'sleep') return
        this.state = 'waking'

        for (let i = 0; i < 6; i++) {
            setTimeout(() => this.pulses.push({ r: this.r * 0.42, a: 0.7 - i * 0.09 }), i * 85)
        }

        const easeOut  = p => 1 - Math.pow(1 - p, 3)
        const backOut  = p => 1 + 2.70158 * Math.pow(p - 1, 3) + 1.70158 * Math.pow(p - 1, 2)

        const tween = (fn, from, to, dur, delay, ease) => new Promise(res => {
            setTimeout(() => {
                const t0 = performance.now()
                const tick = now => {
                    const p = Math.min((now - t0) / dur, 1)
                    fn(from + (to - from) * ease(p))
                    if (p < 1) requestAnimationFrame(tick); else res()
                }
                requestAnimationFrame(tick)
            }, delay)
        })

        ;(async () => {
            // Couleur lime → cyan
            tween(v => this.colorPhase = v, 0, 1, 900, 200, easeOut)

            // Squash léger puis étirement
            tween(v => { this.scaleX = v; this.scaleY = 2 - v }, 1, 0.86, 150, 0, easeOut)
            await tween(v => { this.scaleX = v; this.scaleY = 2 - v }, 0.86, 1.06, 220, 150, easeOut)
            tween(v => { this.scaleX = v; this.scaleY = 2 - v }, 1.06, 1, 380, 370, easeOut)

            // Ouverture des yeux — flutter réaliste
            await tween(v => this.eyeOpen = v, 0,    0.42, 270,  0,   easeOut)
            await tween(v => this.eyeOpen = v, 0.42, 0.16, 190,  0,   easeOut)
            await tween(v => this.eyeOpen = v, 0.16, 1.0,  700, 70, backOut)

            this.state = 'awake'
            if (this.onWake) this.onWake()
        })()
    }

    /* ── Boucle principale ── */

    loop() {
        const { ctx } = this
        ctx.clearRect(0, 0, this.c.width, this.c.height)
        this.t++

        this.lookX += (this.mouse.x - this.lookX) * 0.055
        this.lookY += (this.mouse.y - this.lookY) * 0.055

        this.floatPhase += this.state === 'sleep' ? 0.013 : 0.020
        this.flapPhase  += this.state === 'sleep' ? 0.055 : 0.160
        this.glowPulse  += 0.038

        const floatY = Math.sin(this.floatPhase) * (this.state === 'sleep' ? 11 : 6)
        const cy     = this.cy + floatY

        // Respiration orbe
        if (this.state !== 'waking') {
            const b = Math.sin(this.floatPhase * 1.3)
            this.scaleX = 1 + b * (this.state === 'sleep' ? 0.018 : 0.010)
            this.scaleY = 1 / this.scaleX
        }

        // Clignement
        if (this.state === 'awake') {
            this.blinkTimer++
            if (this.blinkTimer >= this.blinkNext) {
                this.blinkTimer = 0
                this.blinkNext  = 160 + Math.random() * 240
                this._blink()
            }
        }

        // Pulses
        if (this.state === 'awake' && this.t % 200 === 0) {
            this.pulses.push({ r: this.r * 0.44, a: 0.40 })
        }
        this.pulses = this.pulses.filter(p => p.a > 0.003)
        this.pulses.forEach(p => { p.r += 2.0; p.a *= 0.945 })

        this.drawStars()
        this.drawAura(cy)
        this.drawPulses(cy)
        this.drawSparkles(cy)
        this.drawWings(cy)
        this.drawOrb(cy)
        this.drawFace(cy)
        if (this.state === 'sleep') this.drawZZZ(cy)

        requestAnimationFrame(() => this.loop())
    }

    _blink() {
        const t0 = performance.now(), dur = 165
        const tick = now => {
            const p = Math.min((now - t0) / dur, 1)
            this.blinkVal = p < 0.38 ? 1 - p / 0.38 : (p - 0.38) / 0.62
            if (p < 1) requestAnimationFrame(tick); else this.blinkVal = 1
        }
        requestAnimationFrame(tick)
    }

    /* ── Étoiles ── */

    drawStars() {
        const { ctx, t } = this
        this.stars.forEach(s => {
            const al = s.base + Math.sin(t * s.spd + s.ph) * 0.07
            ctx.beginPath()
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255,255,255,${al})`
            ctx.fill()
        })
    }

    /* ── Aura diffuse ── */

    drawAura(cy) {
        const { ctx, cx, r } = this
        const col = this._col(this.colorPhase)
        const gi  = this.state === 'awake'
            ? 0.08 + Math.sin(this.glowPulse) * 0.022
            : 0.025 + Math.sin(this.glowPulse) * 0.008

        const g = ctx.createRadialGradient(cx, cy, r * 0.3, cx, cy, r * 3.8)
        g.addColorStop(0,    `rgba(${col},${gi * 3.2})`)
        g.addColorStop(0.30, `rgba(${col},${gi})`)
        g.addColorStop(0.65, `rgba(${col},${gi * 0.38})`)
        g.addColorStop(1,    `rgba(${col},0)`)
        ctx.beginPath()
        ctx.arc(cx, cy, r * 3.8, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
    }

    /* ── Pulses ── */

    drawPulses(cy) {
        const { ctx, cx } = this
        const col = this._col(this.colorPhase)
        this.pulses.forEach(p => {
            ctx.beginPath()
            ctx.arc(cx, cy, p.r, 0, Math.PI * 2)
            ctx.strokeStyle = `rgba(${col},${p.a})`
            ctx.lineWidth = 1.5
            ctx.stroke()
        })
    }

    /* ── Sparkles (poussière de fée) ── */

    drawSparkles(cy) {
        const { ctx, cx, t } = this
        const fast = this.state === 'sleep' ? 0.15 : this.state === 'waking' ? 5 : 1
        const vis  = this.state === 'sleep' ? 0.22 : 0.90

        this.sparkles.forEach(s => {
            s.ang += s.spd * fast
            const px = cx + Math.cos(s.ang) * s.orbit
            const py = cy + Math.sin(s.ang) * s.orbit * 0.50
            const al = s.al * vis * (0.6 + Math.sin(t * 0.06 + s.ph) * 0.4)
            const col = s.lime ? '168,230,61' : '77,217,240'

            ctx.beginPath()
            ctx.arc(px, py, s.sz, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${col},${al})`
            ctx.fill()

            // Petite croix scintillante sur les grosses particules
            if (s.sz > 1.8 && al > 0.35) {
                const len = s.sz * 1.8
                ctx.strokeStyle = `rgba(${col},${al * 0.6})`
                ctx.lineWidth = 0.7
                ctx.beginPath()
                ctx.moveTo(px - len, py); ctx.lineTo(px + len, py)
                ctx.moveTo(px, py - len); ctx.lineTo(px, py + len)
                ctx.stroke()
            }
        })
    }

    /* ── Aile unique ── */

    _wing(cx, cy, rx, ry, rot, flipX, flapOffset) {
        const { ctx } = this
        const flapAmp = this.state === 'awake' ? 0.22 : 0.06
        const flap    = Math.sin(this.flapPhase + flapOffset) * flapAmp

        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(rot)
        ctx.scale(flipX * (1 + flap * 0.12), 1 - Math.abs(flap) * 0.08)

        ctx.beginPath()
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)

        // Dégradé nacré — reflet du logo
        const wg = ctx.createLinearGradient(-rx, -ry, rx, ry)
        wg.addColorStop(0,    'rgba(210,245,255,0.04)')
        wg.addColorStop(0.25, 'rgba(180,240,255,0.24)')
        wg.addColorStop(0.50, 'rgba(220,255,245,0.30)')
        wg.addColorStop(0.75, 'rgba(200,255,200,0.18)')
        wg.addColorStop(1,    'rgba(210,245,200,0.04)')
        ctx.fillStyle = wg
        ctx.fill()

        // Contour
        ctx.strokeStyle = 'rgba(220,248,255,0.55)'
        ctx.lineWidth   = 0.85
        ctx.stroke()

        // Nervures
        ctx.strokeStyle = 'rgba(235,252,255,0.18)'
        ctx.lineWidth   = 0.45
        const steps = 5
        for (let i = 1; i < steps; i++) {
            const vx = -rx + (rx * 2 / steps) * i
            const vyMax = ry * Math.sqrt(1 - Math.pow(vx / rx, 2))
            ctx.beginPath()
            ctx.moveTo(vx, -vyMax)
            ctx.lineTo(vx,  vyMax)
            ctx.stroke()
        }
        ctx.beginPath()
        ctx.moveTo(-rx * 0.9, 0); ctx.lineTo(rx * 0.9, 0)
        ctx.strokeStyle = 'rgba(235,252,255,0.25)'
        ctx.lineWidth   = 0.5
        ctx.stroke()

        ctx.restore()
    }

    /* ── 4 ailes de fée ── */

    drawWings(cy) {
        const { cx, r } = this
        const orbR = r * 0.42
        // Ailes hautes (grandes)
        this._wing(cx + orbR * 0.28, cy - orbR * 0.25, r * 0.58, r * 0.22, -0.60,  1, 0)
        this._wing(cx - orbR * 0.28, cy - orbR * 0.25, r * 0.58, r * 0.22,  0.60, -1, Math.PI)
        // Ailes basses (petites)
        this._wing(cx + orbR * 0.30, cy + orbR * 0.18, r * 0.40, r * 0.15,  0.85,  1, 1.1)
        this._wing(cx - orbR * 0.30, cy + orbR * 0.18, r * 0.40, r * 0.15, -0.85, -1, 1.1 + Math.PI)
    }

    /* ── Orbe lumineux ── */

    drawOrb(cy) {
        const { ctx, cx, r } = this
        const orbR = r * 0.42

        ctx.save()
        ctx.translate(cx, cy)
        ctx.scale(this.scaleX, this.scaleY)

        const col     = this._col(this.colorPhase)
        const bright  = this.state === 'awake'
            ? 0.88 + Math.sin(this.glowPulse) * 0.08
            : 0.28 + Math.sin(this.glowPulse) * 0.06

        // Halo extérieur doux
        const halo = ctx.createRadialGradient(0, 0, orbR * 0.55, 0, 0, orbR * 2.4)
        halo.addColorStop(0,   `rgba(${col},${bright * 0.45})`)
        halo.addColorStop(0.5, `rgba(${col},${bright * 0.14})`)
        halo.addColorStop(1,   `rgba(${col},0)`)
        ctx.beginPath()
        ctx.arc(0, 0, orbR * 2.4, 0, Math.PI * 2)
        ctx.fillStyle = halo
        ctx.fill()

        // Corps de l'orbe
        const og = ctx.createRadialGradient(-orbR * 0.22, -orbR * 0.25, 0, 0, 0, orbR)
        og.addColorStop(0,    `rgba(240,252,255,${bright})`)
        og.addColorStop(0.25, `rgba(${col},${bright * 0.95})`)
        og.addColorStop(0.65, `rgba(${col},${bright * 0.55})`)
        og.addColorStop(1,    `rgba(10,20,30,0.85)`)
        ctx.beginPath()
        ctx.arc(0, 0, orbR, 0, Math.PI * 2)
        ctx.fillStyle = og
        ctx.fill()

        // Reflet spéculaire principal (grand, blanc)
        const sg = ctx.createRadialGradient(-orbR * 0.30, -orbR * 0.35, 0, -orbR * 0.30, -orbR * 0.35, orbR * 0.52)
        sg.addColorStop(0, `rgba(255,255,255,${bright * 0.75})`)
        sg.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.beginPath()
        ctx.arc(0, 0, orbR, 0, Math.PI * 2)
        ctx.fillStyle = sg
        ctx.fill()

        // Micro reflet secondaire
        ctx.beginPath()
        ctx.arc(orbR * 0.28, orbR * 0.26, orbR * 0.12, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${bright * 0.20})`
        ctx.fill()

        // Anneau de bord lumineux
        ctx.beginPath()
        ctx.arc(0, 0, orbR, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${col},${bright * 0.85})`
        ctx.lineWidth   = 1.6
        ctx.stroke()

        ctx.restore()
    }

    /* ── Visage ── */

    drawFace(cy) {
        const { ctx, cx, r } = this
        const orbR = r * 0.42
        const open = Math.max(0, this.eyeOpen * (this.blinkVal ?? 1))

        const eyeGap  = orbR * 0.40
        const eyeR    = orbR * 0.19
        const eyeY    = cy - orbR * 0.12 * this.scaleY
        const col     = this._col(this.colorPhase)

        for (const sx of [-1, 1]) {
            const ex = cx + sx * eyeGap

            if (open < 0.05) {
                // Yeux fermés — petit arc
                ctx.beginPath()
                const cw = eyeR * 0.82
                ctx.moveTo(ex - cw, eyeY)
                ctx.quadraticCurveTo(ex, eyeY + eyeR * 0.30, ex + cw, eyeY)
                ctx.strokeStyle = 'rgba(255,255,255,0.65)'
                ctx.lineWidth   = 1.8
                ctx.lineCap     = 'round'
                ctx.stroke()
                continue
            }

            const eh = eyeR * open

            ctx.save()
            ctx.beginPath()
            ctx.ellipse(ex, eyeY, eyeR, eh, 0, 0, Math.PI * 2)
            ctx.clip()

            // Sclérotique blanche pure
            ctx.fillStyle = `rgba(248,254,255,${open * 0.97})`
            ctx.fillRect(ex - eyeR, eyeY - eh, eyeR * 2, eh * 2)

            if (open > 0.20) {
                // Direction du regard (course réduite, naturelle)
                const dx  = this.lookX - ex
                const dy  = this.lookY - eyeY
                const ang = Math.atan2(dy, dx)
                const d   = Math.min(eyeR * 0.24, Math.hypot(dx, dy) * 0.042)
                const px  = ex + Math.cos(ang) * d
                const py  = eyeY + Math.sin(ang) * d * 0.42

                // Iris coloré (cyan ou lime selon colorPhase)
                const iris = ctx.createRadialGradient(px, py, 0, px, py, eyeR * 0.65)
                iris.addColorStop(0,    `rgba(${col},${open * 0.90})`)
                iris.addColorStop(0.45, `rgba(${col},${open * 0.60})`)
                iris.addColorStop(1,    `rgba(${col},0)`)
                ctx.fillStyle = iris
                ctx.fillRect(ex - eyeR, eyeY - eh, eyeR * 2, eh * 2)

                // Pupille
                const pR = eyeR * 0.28 * open
                ctx.beginPath()
                ctx.arc(px, py, pR, 0, Math.PI * 2)
                ctx.fillStyle = '#040c10'
                ctx.fill()

                // Reflet
                ctx.beginPath()
                ctx.arc(px - pR * 0.42, py - pR * 0.44, pR * 0.36, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255,255,255,${open * 0.92})`
                ctx.fill()

                ctx.beginPath()
                ctx.arc(px + pR * 0.28, py + pR * 0.26, pR * 0.14, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255,255,255,${open * 0.45})`
                ctx.fill()
            }

            ctx.restore()

            // Contour œil
            ctx.beginPath()
            ctx.ellipse(ex, eyeY, eyeR, eh, 0, 0, Math.PI * 2)
            ctx.strokeStyle = `rgba(${col},${open * 0.55})`
            ctx.lineWidth   = 1.2
            ctx.stroke()
        }

        // Petite bouche
        if (this.state === 'awake' && open > 0.5) {
            const mouthAl = (open - 0.5) * 1.8 * 0.55
            const mouthY  = cy + orbR * 0.35 * this.scaleY
            const mw      = orbR * 0.24
            ctx.beginPath()
            ctx.moveTo(cx - mw, mouthY)
            ctx.quadraticCurveTo(cx, mouthY + orbR * 0.12, cx + mw, mouthY)
            ctx.strokeStyle = `rgba(255,255,255,${mouthAl})`
            ctx.lineWidth   = 1.5
            ctx.lineCap     = 'round'
            ctx.stroke()
        }
    }

    /* ── ZZZ ── */

    drawZZZ(cy) {
        const { ctx, cx, r, t } = this
        const zs = [
            { sz: r * 0.22, dx: r * 0.72, dy: -r * 0.50, ph: 0   },
            { sz: r * 0.15, dx: r * 0.90, dy: -r * 0.70, ph: 1.1 },
            { sz: r * 0.10, dx: r * 1.05, dy: -r * 0.88, ph: 2.0 }
        ]
        zs.forEach(l => {
            const cycle = (t * 0.022 + l.ph) % (Math.PI * 2)
            const p     = (Math.sin(cycle) + 1) / 2
            const drift = Math.sin(cycle * 0.7) * r * 0.06
            ctx.save()
            ctx.font          = `600 ${l.sz}px Inter, sans-serif`
            ctx.fillStyle     = `rgba(168,230,61,${0.08 + p * 0.40})`
            ctx.textAlign     = 'left'
            ctx.textBaseline  = 'alphabetic'
            ctx.fillText('z', cx + l.dx, cy + l.dy + drift)
            ctx.restore()
        })
    }
}
