/** @type {HTMLCanvasElement} */
const elCanvas = document.querySelector('.canvas1')
const ctx = elCanvas.getContext('2d')
const CANVAS_WIDTH = (elCanvas.width = 500)
const CANVAS_HEIGHT = (elCanvas.height = 1000)
const numOfEnemies = 20
const enemies = []

let gameFrame = 0

class Enemy {
  constructor() {
    this.enemyImg = new Image()
    this.enemyImg.src = '/img/enemy4.png'
    this.speed = Math.random() * 4 + 1
    this.spriteWidth = 213
    this.spriteHeight = 213
    this.width = this.spriteWidth / 4
    this.height = this.spriteHeight / 1.5
    this.x = Math.random() * (elCanvas.width - this.width)
    this.y = Math.random() * (elCanvas.height - this.height)
    this.newX = Math.random() * elCanvas.width
    this.newY = Math.random() * elCanvas.height
    this.frame = 0
    this.flapSpeed = Math.floor(Math.random() * 3 + 1)
    this.interval = Math.floor(Math.random() * 200 + 50)
  }
  update() {
    if (gameFrame % this.interval === 0) {
      this.newX = Math.random() * (elCanvas.width - this.width)
      this.newY = Math.random() * (elCanvas.height - this.height)
    }
    let dx = this.x - this.newX
    let dy = this.y - this.newY
    this.x -= dx / 80
    this.y -= dy / 80
    if (this.x + this.width < 0) this.x = elCanvas.width
    if (gameFrame % this.flapSpeed === 0) this.frame > 4 ? (this.frame = 0) : this.frame++
  }
  draw() {
    ctx.drawImage(
      this.enemyImg,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

for (let i = 0; i < numOfEnemies; i++) {
  enemies.push(new Enemy())
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  enemies.forEach((enemy) => {
    enemy.update()
    enemy.draw()
  })
  gameFrame++
  requestAnimationFrame(animate)
}
animate()
