/* =================================================
   Orchestration — GSAP + CHKCharacter
================================================= */

const char        = new CHKCharacter('chr')
const textEl      = document.getElementById('text')
const subtextEl   = document.getElementById('subtext')
const speechTextEl= document.getElementById('speech-text')
const hintEl      = document.querySelector('#hint span')
const overlay     = document.getElementById('overlay')
const cursorDot   = document.getElementById('cursor')
const cursorRing  = document.getElementById('cursor-ring')
const uLeft       = document.getElementById('u-dev')
const uRight      = document.getElementById('u-game')

let awakened = false

/* ── Curseur custom ── */

const mouse = { x: -100, y: -100 }
const ring  = { x: -100, y: -100 }

gsap.set([cursorDot, cursorRing], { xPercent: -50, yPercent: -50 })

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX
    mouse.y = e.clientY
})

gsap.ticker.add(() => {
    ring.x += (mouse.x - ring.x) * 0.11
    ring.y += (mouse.y - ring.y) * 0.11
    gsap.set(cursorDot,  { x: mouse.x, y: mouse.y })
    gsap.set(cursorRing, { x: ring.x,  y: ring.y  })
})

/* ── Utils ── */

const delay = ms => new Promise(res => setTimeout(res, ms))

function typewriter(el, text, speed = 50) {
    return new Promise(resolve => {
        el.textContent = ''
        gsap.set(el, { opacity: 1 })
        let i = 0
        const tick = () => {
            el.textContent += text[i++]
            if (i < text.length) setTimeout(tick, speed)
            else resolve()
        }
        setTimeout(tick, speed)
    })
}

/* ── État initial : "..." en subtext ── */

subtextEl.textContent = '...'
gsap.fromTo(subtextEl,
    { opacity: 0, y: 8 },
    { opacity: 0.32, y: 0, duration: 1, delay: 1.1, ease: 'power2.out' }
)

/* ── Réveil au premier clic ── */

window.addEventListener('click', async () => {
    if (awakened) return
    awakened = true

    hintEl.style.animation = 'none'
    gsap.to([hintEl, subtextEl], { opacity: 0, duration: 0.22 })

    char.onWake = async () => {

        /* Titre en haut + speech sous le perso — en parallèle */
        const titleDone = typewriter(textEl, 'Brahim Chaouki', 52)

        await delay(160)

        gsap.set(speechTextEl, { opacity: 1, y: 0 })
        const speechDone = typewriter(speechTextEl, 'Bienvenue ! Explore mon univers.', 42)

        await Promise.all([titleDone, speechDone])

        /* Sous-titre */
        subtextEl.textContent = 'Développeur · Créateur · Explorateur'
        gsap.fromTo(subtextEl,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        )

        await delay(480)

        await gsap.to(speechTextEl, { opacity: 0, y: -8, duration: 0.35, ease: 'power2.in' })

        showUniverses()
    }

    char.wake()

}, { once: true })

/* ── Apparition des univers + réseaux ── */

function showUniverses() {
    const socialsEl = document.getElementById('socials')

    uLeft.classList.add('live')
    uRight.classList.add('live')
    socialsEl.classList.add('live')

    gsap.set([uLeft, uRight], { yPercent: -50 })

    gsap.fromTo(uLeft,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.75, ease: 'power3.out' }
    )
    gsap.fromTo(uRight,
        { x:  50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.75, delay: 0.08, ease: 'power3.out' }
    )
    gsap.fromTo(socialsEl,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, delay: 0.22, ease: 'power2.out' }
    )
}

/* ── Curseur hover sur les réseaux sociaux ── */

document.querySelectorAll('.soc-link').forEach(a => {
    a.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'))
    a.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'))
})

/* ── Interaction : regard + magnétisme + navigation ── */

;[uLeft, uRight].forEach(uni => {

    uni.addEventListener('mouseenter', () => {
        const rect = uni.getBoundingClientRect()
        char.mouse.x = rect.left + rect.width  / 2
        char.mouse.y = rect.top  + rect.height / 2
        char.mouseLock = true
        document.body.classList.add('cursor-hover')
    })

    uni.addEventListener('mousemove', e => {
        const rect = uni.getBoundingClientRect()
        const dx = e.clientX - (rect.left + rect.width  / 2)
        const dy = e.clientY - (rect.top  + rect.height / 2)
        gsap.to(uni, { x: dx * 0.065, y: dy * 0.05, duration: 0.4, ease: 'power2.out' })
    })

    uni.addEventListener('mouseleave', () => {
        char.mouseLock = false
        document.body.classList.remove('cursor-hover')
        gsap.to(uni, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.45)' })
    })

    uni.addEventListener('click', e => {
        e.stopPropagation()
        const isGame = uni.id === 'u-game'
        const color  = isGame ? '#3d0a36' : '#031a10'
        overlay.style.pointerEvents = 'all'
        gsap.set(overlay, { background: color })
        gsap.to(overlay, {
            opacity: 1,
            duration: 0.55,
            ease: 'power2.inOut',
            onComplete: () => { window.location.href = uni.dataset.href }
        })
    })
})
