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

        await typewriter(textEl, 'Brahim Chaouki', 52)

        subtextEl.textContent = 'Développeur · Créateur · Explorateur'
        gsap.fromTo(subtextEl,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        )

        await delay(520)

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

    uLeft.setAttribute('tabindex', '0')
    uRight.setAttribute('tabindex', '0')

    gsap.set([uLeft, uRight], { yPercent: -50 })

    gsap.fromTo(uLeft,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
          onComplete: () => _breathe(uLeft, 0) }
    )
    gsap.fromTo(uRight,
        { x:  50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.75, delay: 0.08, ease: 'power3.out',
          onComplete: () => _breathe(uRight, 1.1) }
    )
    gsap.fromTo(socialsEl,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, delay: 0.22, ease: 'power2.out' }
    )
}

function _breathe(el, delay = 0) {
    gsap.to(el, {
        opacity: 0.32,
        duration: 2.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay,
        overwrite: 'auto'
    })
}

/* ── Curseur hover sur les réseaux sociaux ── */

document.querySelectorAll('.soc-link').forEach(a => {
    a.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'))
    a.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'))
})

/* ── Formulaire de contact ── */

const mailBtn      = document.getElementById('soc-mail')
const contactModal = document.getElementById('contact-modal')
const contactClose = document.getElementById('contact-close')
const contactForm  = document.getElementById('contact-form')
const cfAnnounce   = document.getElementById('cf-announce')

function getFocusable(container) {
    return [...container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )]
}

let prevFocus = null

function openContact() {
    prevFocus = document.activeElement
    contactModal.classList.add('open')
    contactModal.setAttribute('aria-hidden', 'false')
    requestAnimationFrame(() => getFocusable(contactModal)[0]?.focus())
}

function closeContact() {
    contactModal.classList.remove('open')
    contactModal.setAttribute('aria-hidden', 'true')
    prevFocus?.focus()
}

contactModal.addEventListener('keydown', e => {
    if (!contactModal.classList.contains('open') || e.key !== 'Tab') return
    const focusable = getFocusable(contactModal)
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]
    if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
    } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus() }
    }
})

mailBtn.addEventListener('click', e => { e.stopPropagation(); openContact() })
contactClose.addEventListener('click', closeContact)
contactModal.addEventListener('click', e => { if (e.target === contactModal) closeContact() })
window.addEventListener('keydown', e => { if (e.key === 'Escape' && contactModal.classList.contains('open')) closeContact() })

/* ── Règles de validation ── */

const RULES = {
    'cf-name':  v => !v                                              ? 'Le nom est requis.'
                   : v.length < 2                                    ? 'Minimum 2 caractères.'
                   : v.length > 100                                  ? 'Maximum 100 caractères.'
                   : null,
    'cf-email': v => !v                                              ? "L'adresse email est requise."
                   : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)      ? 'Email invalide (ex : nom@domaine.fr).'
                   : null,
    'cf-msg':   v => !v                                              ? 'Le message est requis.'
                   : v.length < 10                                   ? 'Minimum 10 caractères.'
                   : v.length > 3000                                 ? 'Maximum 3000 caractères.'
                   : null,
}

function setFieldState(id, errMsg) {
    const input = document.getElementById(id)
    if (!input) return
    const field = input.closest('.cf-field')
    const hasVal = input.value.trim().length > 0
    field.classList.toggle('cf-invalid', !!errMsg)
    field.classList.toggle('cf-valid',   !errMsg && hasVal)
    let errEl = field.querySelector('.cf-field-error')
    if (errMsg) {
        if (!errEl) {
            errEl = document.createElement('span')
            errEl.className = 'cf-field-error'
            field.appendChild(errEl)
        }
        errEl.textContent = errMsg
    } else {
        errEl?.remove()
    }
}

function validateField(id) {
    const input = document.getElementById(id)
    if (!input) return true
    const err = RULES[id]?.(input.value.trim()) ?? null
    setFieldState(id, err)
    return err === null
}

/* Validation au blur + correction en temps réel */
;['cf-name', 'cf-email', 'cf-msg'].forEach(id => {
    const el = document.getElementById(id)
    if (!el) return
    el.addEventListener('blur',  () => validateField(id))
    el.addEventListener('input', () => {
        if (el.closest('.cf-field').classList.contains('cf-invalid')) validateField(id)
    })
})

/* Compteur de caractères sur le textarea */
;(() => {
    const ta = document.getElementById('cf-msg')
    if (!ta) return
    const counter = document.createElement('span')
    counter.className = 'cf-counter'
    counter.textContent = '0 / 3000'
    ta.closest('.cf-field').appendChild(counter)
    ta.addEventListener('input', () => {
        const n = ta.value.length
        counter.textContent = `${n} / 3000`
        counter.classList.toggle('cf-counter--warn', n > 2500 && n <= 3000)
        counter.classList.toggle('cf-counter--over', n > 3000)
    })
})()

/* ── Envoi ── */

contactForm.addEventListener('submit', async e => {
    e.preventDefault()

    /* Tout valider d'un coup et focus sur le premier champ invalide */
    const valid = ['cf-name', 'cf-email', 'cf-msg'].map(validateField).every(Boolean)
    if (!valid) {
        contactForm.querySelector('.cf-invalid input, .cf-invalid textarea')?.focus()
        return
    }

    const name    = document.getElementById('cf-name').value.trim()
    const email   = document.getElementById('cf-email').value.trim()
    const msg     = document.getElementById('cf-msg').value.trim()
    const token   = document.getElementById('cf-token')?.value   || ''
    const website = document.getElementById('cf-website')?.value || ''

    const btn = contactForm.querySelector('.cf-submit')
    btn.disabled    = true
    btn.textContent = 'Envoi en cours…'
    contactForm.querySelector('.cf-error')?.remove()

    const fd = new FormData()
    fd.append('name',    name)
    fd.append('email',   email)
    fd.append('message', msg)
    fd.append('_token',  token)
    fd.append('website', website)

    try {
        const res  = await fetch('api/contact.php', { method: 'POST', body: fd })
        const data = await res.json().catch(() => ({ ok: false, error: 'Réponse invalide.' }))

        if (data.ok) {
            cfAnnounce.textContent = 'Message envoyé avec succès.'
            contactForm.innerHTML = `
                <div class="cf-success">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    <p>Message envoyé !</p>
                    <span>Je vous répondrai dans les plus brefs délais.</span>
                </div>`
        } else {
            btn.disabled    = false
            btn.textContent = 'Envoyer →'
            const errMsg = data.error || 'Une erreur est survenue.'
            cfAnnounce.textContent = errMsg
            const err = document.createElement('p')
            err.className   = 'cf-error'
            err.textContent = errMsg
            contactForm.appendChild(err)
        }
    } catch {
        btn.disabled    = false
        btn.textContent = 'Envoyer →'
        const errMsg = 'Erreur réseau. Vérifiez votre connexion.'
        cfAnnounce.textContent = errMsg
        const err = document.createElement('p')
        err.className   = 'cf-error'
        err.textContent = errMsg
        contactForm.appendChild(err)
    }
})

;[contactClose, contactForm.querySelector('.cf-submit')].forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'))
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'))
})

/* ── Interaction : regard + magnétisme + navigation ── */

;[uLeft, uRight].forEach(uni => {

    uni.addEventListener('mouseenter', () => {
        gsap.killTweensOf(uni)
        gsap.to(uni, { opacity: 1, duration: 0.18, overwrite: true })
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
        _breathe(uni, 0.5)
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

    uni.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); uni.click() }
    })
})
