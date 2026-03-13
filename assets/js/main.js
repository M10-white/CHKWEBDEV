/* =========================
SCENE
========================= */

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
60,
window.innerWidth / window.innerHeight,
0.1,
2000
)

/* caméra moins inclinée */

let cameraRadius = 16
let cameraAngle = 0

camera.position.set(0,-cameraRadius,6)
camera.lookAt(0,0,0)

const renderer = new THREE.WebGLRenderer({
alpha:true,
antialias:true
})

renderer.setPixelRatio(window.devicePixelRatio)

renderer.setSize(window.innerWidth,window.innerHeight)

document.getElementById("scene").appendChild(renderer.domElement)


/* =========================
LOADER
========================= */

const loader = new THREE.TextureLoader()

const projects = []

const orbitRadius = 9
const orbitTilt = 0.35


/* =========================
LOGO (SOLEIL)
========================= */

const logoTexture = loader.load("assets/img/logo.svg")

logoTexture.anisotropy = renderer.capabilities.getMaxAnisotropy()

const logoMaterial = new THREE.MeshBasicMaterial({
map:logoTexture,
transparent:true
})

const logoGeometry = new THREE.PlaneGeometry(4,2)

const logo = new THREE.Mesh(logoGeometry,logoMaterial)

scene.add(logo)


/* =========================
ORBITE VISUELLE
========================= */

const orbitGeometry = new THREE.RingGeometry(
orbitRadius - 0.02,
orbitRadius + 0.02,
256
)

const orbitMaterial = new THREE.MeshBasicMaterial({
color:0xffffff,
transparent:true,
opacity:0.2,
side:THREE.DoubleSide
})

const orbit = new THREE.Mesh(orbitGeometry,orbitMaterial)

orbit.rotation.x = Math.PI/2 - orbitTilt

scene.add(orbit)


/* =========================
CREATION DES PROJETS
========================= */

projectsData.forEach((project,i)=>{

const geometry = new THREE.PlaneGeometry(3.4,2)

const texture = loader.load(project.cover)

texture.anisotropy = renderer.capabilities.getMaxAnisotropy()

texture.minFilter = THREE.LinearMipmapLinearFilter
texture.magFilter = THREE.LinearFilter

const material = new THREE.MeshBasicMaterial({
map:texture,
transparent:true
})

const plane = new THREE.Mesh(geometry,material)

plane.userData.angle = (i/projectsData.length)*Math.PI*2
plane.userData.project = project

scene.add(plane)

projects.push(plane)

})


/* =========================
STARS
========================= */

const starsGeometry = new THREE.BufferGeometry()

const starCount = 4000
const starPositions = []

for(let i=0;i<starCount;i++){

starPositions.push(
(Math.random()-0.5)*500,
(Math.random()-0.5)*500,
(Math.random()-0.5)*500
)

}

starsGeometry.setAttribute(
"position",
new THREE.Float32BufferAttribute(starPositions,3)
)

const starsMaterial = new THREE.PointsMaterial({
color:0xffffff,
size:0.25
})

const stars = new THREE.Points(starsGeometry,starsMaterial)

scene.add(stars)


/* =========================
ZOOM
========================= */

window.addEventListener("wheel",(e)=>{

cameraRadius += e.deltaY*0.01

cameraRadius = Math.max(8,Math.min(40,cameraRadius))

})


/* =========================
DRAG CAMERA
========================= */

let dragging = false
let prevX = 0

window.addEventListener("mousedown",()=>{
dragging = true
})

window.addEventListener("mouseup",()=>{
dragging = false
})

window.addEventListener("mousemove",(e)=>{

if(!dragging) return

cameraAngle -= (e.clientX - prevX) * 0.005

prevX = e.clientX

})


/* =========================
RAYCAST
========================= */

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

let hovered = null

window.addEventListener("mousemove",(e)=>{

mouse.x = (e.clientX/window.innerWidth)*2 - 1
mouse.y = -(e.clientY/window.innerHeight)*2 + 1

})


/* =========================
FOCUS PROJET
========================= */

let focusedProject = null
let focusProgress = 0

window.addEventListener("click",()=>{

if(!hovered){

focusedProject = null
return

}

if(focusedProject === hovered){

const p = hovered.userData.project

if(p.href) window.open(p.href)
else if(p.repo) window.open(p.repo)

return

}

focusedProject = hovered
focusProgress = 0

})


/* =========================
ANIMATION
========================= */

function animate(){

requestAnimationFrame(animate)


/* caméra */

if(focusedProject){

focusProgress += 0.05

const target = focusedProject.position

camera.position.lerp(
new THREE.Vector3(
target.x * 1.2,
target.y * 1.2,
target.z + 4
),
focusProgress
)

camera.lookAt(target)

}else{

camera.position.x = Math.sin(cameraAngle) * cameraRadius
camera.position.y = -Math.cos(cameraAngle) * cameraRadius
camera.position.z = cameraRadius * 0.4

camera.lookAt(0,0,0)

}


/* rotation projets */

projects.forEach((p,i)=>{

p.userData.angle += 0.0015 + i*0.0001

const angle = p.userData.angle

const x = Math.cos(angle)*orbitRadius
const y = Math.sin(angle)*orbitRadius

p.position.x = x
p.position.y = y*Math.cos(orbitTilt)
p.position.z = y*Math.sin(orbitTilt)

p.lookAt(camera.position)

})


/* hover */

raycaster.setFromCamera(mouse,camera)

const intersects = raycaster.intersectObjects(projects)

if(intersects.length){

const obj = intersects[0].object

if(hovered !== obj){

if(hovered) hovered.scale.set(1,1,1)

hovered = obj

hovered.scale.set(1.25,1.25,1)

document.body.style.cursor = "pointer"

}

}else{

if(hovered) hovered.scale.set(1,1,1)

hovered = null

document.body.style.cursor = "default"

}


renderer.render(scene,camera)

}

animate()


/* =========================
RESIZE
========================= */

window.addEventListener("resize",()=>{

camera.aspect = window.innerWidth/window.innerHeight
camera.updateProjectionMatrix()

renderer.setSize(window.innerWidth,window.innerHeight)

})