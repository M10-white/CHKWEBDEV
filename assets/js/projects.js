/* =================================================
   Projects page — cursor + entry animations + cards
================================================= */

/* ── Curseur custom (sans GSAP) ── */

const dot  = document.getElementById('cursor')
const ring = document.getElementById('cursor-ring')

let mx = -100, my = -100
let rx = -100, ry = -100

window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY })

;(function tick() {
    rx += (mx - rx) * 0.11
    ry += (my - ry) * 0.11
    dot.style.transform  = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`
    ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`
    requestAnimationFrame(tick)
})()

/* ── Nav shadow au scroll ── */

const nav = document.getElementById('pnav')
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10)
}, { passive: true })

/* ── Entry animations (IntersectionObserver) ── */

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const card = entry.target
        const col  = parseInt(card.dataset.col ?? 0)
        setTimeout(() => card.classList.add('visible'), col * 90)
        observer.unobserve(card)
    })
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' })

document.querySelectorAll('.pcard').forEach((card, i) => {
    card.dataset.col = i % 3
    observer.observe(card)
})

/* ── Click sur les cards ── */

document.querySelectorAll('.pcard--link').forEach(card => {
    card.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'))
    card.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'))

    card.addEventListener('click', e => {
        if (e.target.closest('a')) return
        const href = card.dataset.href || card.dataset.repo
        if (href) window.open(href, '_blank', 'noopener')
    })
})
