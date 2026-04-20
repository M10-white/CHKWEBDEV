const character = document.getElementById("character")
const text = document.getElementById("text")
const choices = document.getElementById("choices")

const dev = document.getElementById("choice-dev")
const game = document.getElementById("choice-game")

let awakened = false

/* =========================
   TEXTE ANIMÉ
========================= */

function showText(content){
    text.classList.remove("show")

    setTimeout(()=>{
        text.innerHTML = content
        text.classList.add("show")
    },200)
}

/* =========================
   ETAT INITIAL
========================= */

showText("...")

/* =========================
   CLICK → REVEIL
========================= */

window.addEventListener("click",()=>{

if(awakened) return

awakened = true

character.classList.remove("sleep")
character.classList.add("awake")

/* animation bounce */

character.style.transform = "translate(-50%,-55%) scale(1.1)"

setTimeout(()=>{
    character.style.transform = "translate(-50%,-50%) scale(1)"
},300)

/* texte */

showText("Salut 👋 Choisis ton univers")

/* afficher choix */

setTimeout(()=>{
    choices.classList.add("show")
},600)

})

document.addEventListener("mousemove", (e) => {

    const pupils = document.querySelectorAll(".pupil")

    pupils.forEach(pupil => {

        const rect = pupil.parentElement.getBoundingClientRect()

        const x = e.clientX - (rect.left + rect.width/2)
        const y = e.clientY - (rect.top + rect.height/2)

        const angle = Math.atan2(y, x)
        const distance = Math.min(6, Math.hypot(x,y)/10)

        const moveX = Math.cos(angle) * distance
        const moveY = Math.sin(angle) * distance

        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`
    })
})


/* =========================
   CHOIX
========================= */

dev.addEventListener("click",()=>{
    window.location.href = "/projects"
})

game.addEventListener("click",()=>{
    window.location.href = "/games"
})