/** @type {HTMLCanvasElement} */

const elCanvas = document.querySelector('.canvas1')
const ctx = elCanvas.getContext('2d')
elCanvas.width = 500
elCanvas.height = 700
const canvasPos = elCanvas.getBoundingClientRect()
console.log(canvasPos);
const explosions = []

class Explosion {
  constructor(x, y) {
    this.spriteWidth = 200
    this.spriteHeight = 179
    this.width = this.spriteWidth * 0.7
    this.height = this.spriteHeight * 0.7
    this.x = x
    this.y = y
    this.img = new Image()
    this.img.src = '/img/boom.png'
    this.frame = 0
    this.timer = 0
    this.angle = Math.random() * 6.2
    this.sound = new Audio()
    this.sound.src = '/sound/boom1.wav'
  }
  update() {
    this.timer++
    if(this.frame === 0) this.sound.play()
    if (this.timer % 10 === 0) this.frame++
  }
  draw() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.drawImage(
      this.img,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width/2,
      0 - this.height/2,
      this.width,
      this.height
    )
    ctx.restore()
  }
}

window.addEventListener('click', (e) => {
  createAnimation(e)
})



function createAnimation(e) {
  let posX = e.x - canvasPos.left
  let posY = e.y - canvasPos.top
  explosions.push(new Explosion(posX , posY))
}

function animate() {
  ctx.clearRect(0, 0, elCanvas.width, elCanvas.height)
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update()
    explosions[i].draw()
    if (explosions[i].frame > 5) {
        explosions.splice(i, 1)
        i--
    }
  }
  requestAnimationFrame(animate)
}
animate()
