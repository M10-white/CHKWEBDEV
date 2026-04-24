/* =================================================
   CHKCharacter — Mascotte Canvas interactive
   États : sleep | waking | awake
================================================= */

class CHKCharacter {

    constructor(id) {
        this.c   = document.getElementById(id)
        this.ctx = this.c.getContext('2d')

        this.t       = 0
        this.state   = 'sleep'
        this.eyeOpen = 0
        this.mouse   = { x: innerWidth / 2, y: innerHeight / 2 }
        this.lookX   = innerWidth  / 2
        this.lookY   = innerHeight / 2
        this.mouseLock = false
        this.pulses    = []
        this.onWake    = null

        this.resize()
        window.addEventListener('resize', () => this.resize())
        window.addEventListener('mousemove', e => {
            if (!this.mouseLock) {
                this.mouse.x = e.clientX
                this.mouse.y = e.clientY
            }
        })
        this.loop()
    }

    resize() {
        this.c.width  = innerWidth
        this.c.height = innerHeight
        this.cx = innerWidth  / 2
        this.cy = innerHeight / 2
        this.r  = Math.min(innerWidth, innerHeight) * 0.092
        this.initStars()
        this.initParticles()
    }

    initStars() {
        this.stars = Array.from({ length: 110 }, () => ({
            x:    Math.random() * innerWidth,
            y:    Math.random() * innerHeight,
            r:    0.35 + Math.random() * 1.2,
            base: 0.05 + Math.random() * 0.25,
            ph:   Math.random() * Math.PI * 2,
            spd:  0.007 + Math.random() * 0.012
        }))
    }

    initParticles() {
        const n = 52
        this.particles = Array.from({ length: n }, (_, i) => ({
            ang:   (i / n) * Math.PI * 2 + Math.random() * 0.4,
            orbit: this.r * (1.3 + Math.random() * 0.65),
            spd:   (0.003 + Math.random() * 0.005) * (Math.random() > 0.5 ? 1 : -1),
            sz:    1.2 + Math.random() * 2.8,
            al:    0.2 + Math.random() * 0.5
        }))
    }

    wake() {
        if (this.state !== 'sleep') return
        this.state = 'waking'

        /* Anneaux concentriques au réveil */
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                this.pulses.push({ r: this.r * 1.08, a: 0.55 - i * 0.08 })
            }, i * 110)
        }

        /* Ouverture des yeux en 3 phases — réveil endormi */
        const animate = (from, to, duration, startDelay, easeOut) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    const t0   = performance.now()
                    const tick = now => {
                        let p = Math.min((now - t0) / duration, 1)
                        if (easeOut) p = 1 - Math.pow(1 - p, 3)
                        this.eyeOpen = from + (to - from) * p
                        if (p < 1) requestAnimationFrame(tick)
                        else resolve()
                    }
                    requestAnimationFrame(tick)
                }, startDelay)
            })
        }

        ;(async () => {
            await animate(0,    0.42, 340, 0,   false)  // phase 1 : paupières qui se soulèvent lentement
            await animate(0.42, 0.22, 220, 0,   false)  // phase 2 : retombée (trop lourd encore)
            await animate(0.22, 1.0,  900, 0,   true)   // phase 3 : ouverture complète, smooth
            this.state = 'awake'
            if (this.onWake) this.onWake()
        })()
    }

    loop() {
        const { ctx } = this
        ctx.clearRect(0, 0, this.c.width, this.c.height)
        this.t++

        /* Smooth eye look */
        this.lookX += (this.mouse.x - this.lookX) * 0.06
        this.lookY += (this.mouse.y - this.lookY) * 0.06

        const floatY = this.state === 'sleep' ? Math.sin(this.t * 0.024) * 9 : 0
        const cy     = this.cy + floatY

        /* Pulse périodique quand awake */
        if (this.state === 'awake' && this.t % 200 === 0) {
            this.pulses.push({ r: this.r * 1.08, a: 0.42 })
        }

        /* Update pulses */
        this.pulses = this.pulses.filter(p => p.a > 0.004)
        this.pulses.forEach(p => { p.r += 1.9; p.a *= 0.952 })

        /* Draw order */
        this.drawStars()
        this.drawPulses(cy)
        this.drawParticles(cy)
        this.drawHalo(cy)
        this.drawCore(cy)
        this.drawEyes(cy)
        if (this.state === 'sleep') this.drawZZZ(cy)

        requestAnimationFrame(() => this.loop())
    }

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

    drawPulses(cy) {
        const { ctx, cx } = this
        this.pulses.forEach(p => {
            ctx.beginPath()
            ctx.arc(cx, cy, p.r, 0, Math.PI * 2)
            ctx.strokeStyle = `rgba(22,230,148,${p.a})`
            ctx.lineWidth = 1.5
            ctx.stroke()
        })
    }

    drawHalo(cy) {
        if (this.state === 'sleep') return
        const { ctx, cx, r } = this
        const a = Math.min(this.eyeOpen * 1.6, 1) * 0.38
        if (a < 0.01) return

        ctx.save()
        ctx.globalAlpha = a
        ctx.translate(cx, cy)
        ctx.rotate(this.t * 0.007)

        ctx.beginPath()
        ctx.ellipse(0, 0, r * 1.7, r * 0.36, 0, 0, Math.PI * 2)

        const grad = ctx.createLinearGradient(-r * 1.7, 0, r * 1.7, 0)
        grad.addColorStop(0,    'rgba(87,232,195,0)')
        grad.addColorStop(0.3,  'rgba(87,232,195,0.6)')
        grad.addColorStop(0.5,  'rgba(180,248,220,1)')
        grad.addColorStop(0.7,  'rgba(22,230,148,0.6)')
        grad.addColorStop(1,    'rgba(22,230,148,0)')
        ctx.strokeStyle = grad
        ctx.lineWidth   = 1.6
        ctx.stroke()

        ctx.rotate(-this.t * 0.014)
        ctx.beginPath()
        ctx.ellipse(0, 0, r * 1.35, r * 0.28, Math.PI * 0.15, 0, Math.PI * 2)
        const grad2 = ctx.createLinearGradient(-r * 1.35, 0, r * 1.35, 0)
        grad2.addColorStop(0,   'rgba(22,230,148,0)')
        grad2.addColorStop(0.5, 'rgba(22,230,148,0.3)')
        grad2.addColorStop(1,   'rgba(22,230,148,0)')
        ctx.strokeStyle = grad2
        ctx.lineWidth   = 1
        ctx.stroke()

        ctx.restore()
    }

    drawCore(cy) {
        const { ctx, cx, r } = this

        const gi   = this.state === 'awake' ? 0.10 : 0.038
        const glow = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r * 3.8)
        glow.addColorStop(0,    `rgba(22,230,148,${gi * 3.2})`)
        glow.addColorStop(0.38, `rgba(22,230,148,${gi})`)
        glow.addColorStop(0.7,  `rgba(87,232,195,${gi * 0.5})`)
        glow.addColorStop(1,    'rgba(22,230,148,0)')
        ctx.beginPath()
        ctx.arc(cx, cy, r * 3.8, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        const body = ctx.createRadialGradient(cx - r * 0.28, cy - r * 0.28, r * 0.04, cx, cy, r)
        body.addColorStop(0,    '#d4f5ed')
        body.addColorStop(0.24, '#16e694')
        body.addColorStop(0.6,  '#063d2a')
        body.addColorStop(1,    '#020d08')
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.fillStyle = body
        ctx.fill()

        const spec = ctx.createRadialGradient(cx - r * 0.27, cy - r * 0.31, 0.5, cx - r * 0.07, cy - r * 0.05, r * 0.76)
        spec.addColorStop(0, 'rgba(255,255,255,0.38)')
        spec.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.fillStyle = spec
        ctx.fill()

        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(22,230,148,0.22)'
        ctx.lineWidth   = 1.8
        ctx.stroke()
    }

    drawEyes(cy) {
        const { ctx, cx, r } = this
        const ey  = cy - r * 0.09
        const gap = r * 0.43
        const er  = r * 0.215

        for (const ox of [-gap, gap]) {
            const ex = cx + ox
            ctx.save()

            /* Paupière fermée */
            const closedA = Math.max(0, 1 - this.eyeOpen * 2.8)
            if (closedA > 0.01) {
                ctx.beginPath()
                ctx.moveTo(ex - er, ey)
                ctx.quadraticCurveTo(ex, ey + er * 0.3, ex + er, ey)
                ctx.strokeStyle = `rgba(248,250,252,${closedA})`
                ctx.lineWidth   = 2.8
                ctx.lineCap     = 'round'
                ctx.stroke()
            }

            /* Blanc de l'œil */
            if (this.eyeOpen > 0.04) {
                ctx.save()
                ctx.globalAlpha = Math.min(this.eyeOpen * 2.2, 1)
                ctx.beginPath()
                ctx.ellipse(ex, ey, er, er * this.eyeOpen, 0, 0, Math.PI * 2)
                ctx.fillStyle = '#f8fafc'
                ctx.fill()
                ctx.restore()

                /* Pupille avec regard smooth */
                if (this.eyeOpen > 0.22) {
                    const dx  = this.lookX - ex
                    const dy  = this.lookY - ey
                    const ang = Math.atan2(dy, dx)
                    const d   = Math.min(er * 0.32, Math.hypot(dx, dy) * 0.05)
                    const px  = ex + Math.cos(ang) * d
                    const py  = ey + Math.sin(ang) * d

                    ctx.save()
                    ctx.globalAlpha = this.eyeOpen

                    ctx.beginPath()
                    ctx.arc(px, py, er * 0.46, 0, Math.PI * 2)
                    ctx.fillStyle = '#020617'
                    ctx.fill()

                    ctx.beginPath()
                    ctx.arc(px - er * 0.1, py - er * 0.12, er * 0.1, 0, Math.PI * 2)
                    ctx.fillStyle = 'rgba(255,255,255,0.9)'
                    ctx.fill()

                    ctx.restore()
                }
            }

            ctx.restore()
        }
    }

    drawZZZ(cy) {
        const { ctx, cx, r, t } = this

        const letters = [
            { sz: r * 0.27, dx: r * 0.88, dy: -r * 0.52, phase: 0    },
            { sz: r * 0.19, dx: r * 1.12, dy: -r * 0.74, phase: 1.1  },
            { sz: r * 0.12, dx: r * 1.3,  dy: -r * 0.92, phase: 2.0  }
        ]

        letters.forEach(l => {
            const cycle = (t * 0.022 + l.phase) % (Math.PI * 2)
            const p     = (Math.sin(cycle) + 1) / 2
            const drift = Math.sin(cycle * 0.7) * r * 0.07
            const al    = 0.1 + p * 0.48

            ctx.save()
            ctx.font      = `600 ${l.sz}px Inter, sans-serif`
            ctx.fillStyle = `rgba(87,232,195,${al})`
            ctx.fillText('z', cx + l.dx, cy + l.dy + drift)
            ctx.restore()
        })
    }

    drawParticles(cy) {
        const { ctx, cx } = this
        const fast = this.state === 'sleep' ? 0.18 : (this.state === 'waking' ? 4.5 : 1)
        const as   = this.state === 'sleep' ? 0.28 : 0.85
        const ss   = this.state === 'sleep' ? 0.5  : 1

        this.particles.forEach(p => {
            p.ang += p.spd * fast
            const px = cx + Math.cos(p.ang) * p.orbit
            const py = cy + Math.sin(p.ang) * p.orbit * 0.6
            ctx.beginPath()
            ctx.arc(px, py, p.sz * ss, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(87,232,195,${p.al * as})`
            ctx.fill()
        })
    }
}
