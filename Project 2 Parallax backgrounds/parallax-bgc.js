const elCanvas = document.querySelector('.canvas1')
const ctx = elCanvas.getContext('2d')
const CANVAS_WIDTH = (elCanvas.width = 800)
const CANVAS_HEIGHT = (elCanvas.height = 700)

function init(){
    animate()
}

let gameSpeed = 20
const backgroundLayer1 = new Image()
backgroundLayer1.src = '/img/layer-1.png'
const backgroundLayer2 = new Image()
backgroundLayer2.src = '/img/layer-2.png'
const backgroundLayer3 = new Image()
backgroundLayer3.src = '/img/layer-3.png'
const backgroundLayer4 = new Image()
backgroundLayer4.src = '/img/layer-4.png'
const backgroundLayer5 = new Image()
backgroundLayer5.src = '/img/layer-5.png'

function onSelectSped(target) {
    gameSpeed = target.value;
    document.querySelector('.game-speed-value').innerText = gameSpeed
}

class Layer {
  constructor(img, speedMod) {
    this.x = 0
    this.y = 0
    this.width = 2400
    this.height = 700
    this.img = img
    this.speedMod = speedMod
    this.speed = gameSpeed * this.speedMod
  }
  update() {
    this.speed = gameSpeed * this.speedMod
    if(this.x <= -this.width) this.x = 0
    this.x = this.x - this.speed
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height)
  }
}

const layer1 = new Layer(backgroundLayer1, 0.2)
const layer2 = new Layer(backgroundLayer2, 0.4)
const layer3 = new Layer(backgroundLayer3, 0.6)
const layer4 = new Layer(backgroundLayer4, 0.8)
const layer5 = new Layer(backgroundLayer5, 1)

const gameObj = [layer1, layer2, layer3, layer4, layer5]

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  gameObj.forEach(obj =>{
    obj.update()
    obj.draw()
  })
  requestAnimationFrame(animate)
}
