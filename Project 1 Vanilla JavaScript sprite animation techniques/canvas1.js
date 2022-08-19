const elCanvas = document.querySelector('.canvas1')
const ctx = elCanvas.getContext('2d')
const CANVAS_WIDTH = (elCanvas.width = 600)
const CANVAS_HEIGHT = (elCanvas.height = 600)

const playerImg = new Image()
playerImg.src = '/imgs/shadow_dog.png'
const spriteWidth = 575
const spriteHeight = 523
let gameFrame = 0
const straggerFrames = 1
let playerState = 'idle'

const spriteAnimations = []
const animationStates = [
  { name: 'idle', frames: 7 },
  { name: 'jump', frames: 7 },
  { name: 'fall', frames: 7 },
  { name: 'run', frames: 9 },
  { name: 'dizzy', frames: 11 },
  { name: 'sit', frames: 5 },
  { name: 'roll', frames: 7 },
  { name: 'bite', frames: 7 },
  { name: 'ko', frames: 12 },
  { name: 'getHit', frames: 4 },
]
animationStates.forEach((state,idx)=> {
  let frames = {
    loc:[]
  }
  for (let i = 0; i < state.frames; i++) {
    let posX = i * spriteWidth    
    let posY = idx * spriteHeight  
    frames.loc.push({x:posX,y:posY})  
  }
  spriteAnimations[state.name] = frames
})

function onSelectAnimation(selectedVal){
  playerState = selectedVal
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  let position = Math.floor(gameFrame / straggerFrames) % spriteAnimations[playerState].loc.length
  let frameX = spriteWidth * position
  let frameY = spriteAnimations[playerState].loc[position].y
  ctx.drawImage(playerImg, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)
  gameFrame++
  requestAnimationFrame(animate)
}
animate()

