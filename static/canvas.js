const plat = new Image()
plat.src = "/static/platform.png";

const hills = new Image()
hills.src = "/static/hills.png";

const background = new Image()
background.src = "/static/background.png";

const bat = new Image()
bat.src = "/static/giphy.gif";

const fire = new Image()
fire.src = "/static/fire.png";

const title = new Image()
title.src = "/static/title.jpeg";

const pipe = new Image()
pipe.src = "/static/pipe.png";

const dpipe = new Image()
dpipe.src = "/static/dpipe.png";

const canvas = document.querySelector('canvas')
console.log(canvas);

let score = 0
let high_score = 0

canvas.width = 1024;
canvas.height = 520;
var ctx = canvas.getContext("2d");
const gravity = .5;
canvas.contentEditable = true;

class Player {
  constructor({x, y, image}) {
    this.position = {
      x,
      y
    }
    this.width = image.width;
    this.height = image.height;
    this.image = image;

    this.velocity = {
      x: 0,
      y: 0,
    }
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
    // ctx.fillStyle = 'red';
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) { this.velocity.y += gravity; }
    else { this.velocity.y = 0; }
    this.draw();
  }
}

class Platform {
  constructor({x, y, image}) {
    this.position = {
      x,
      y
    }
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}

class GenericObject {
  constructor({x, y, image}) {
    this.position = {
      x,
      y
    }
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}


class Obstacle {
  constructor({x, y, image, orientation}) {
    this.orientation = orientation
    this.position = {
      x,
      y
    }
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}


function init() {
  if(score > high_score) {
    high_score = score;
  }
  score = 0;
  p = new Player({x:100, y:100, image:bat});

  platforms = [
    new Platform({ x:0, y: 400, image: plat }),
    new Platform({ x:plat.width-155, y: 400, image: plat }),  
    new Platform({ x: fire.width, y: 400, image: fire }),
    new Platform({ x: fire.width*2 - 30, y: 400, image: fire }), 
    new Platform({ x: fire.width*3 - 50, y: 400, image: fire }), 
    new Platform({ x: fire.width*4 - 70, y: 400, image: fire }),
    new Platform({ x: fire.width*5 - 90, y: 400, image: fire })
  ]
    
  // obstacles = [
  //   new Obstacle({ x:900, y: -400 , image: dpipe, orientation:"down" }), 
  //   new Obstacle({ x:1200, y: -400, image: dpipe, orientation:"down" }), 
  //   new Obstacle({ x:1800, y: 300, image: pipe, orientation:"up"  }),  
  //   new Obstacle({ x:2400, y: 300, image: pipe, orientation:"up"  }),  
  //   new Obstacle({ x:3000, y: 300, image: pipe, orientation:"up"  }),  
  //   new Obstacle({ x:3600, y: 300, image: pipe, orientation:"up"  }),  
  //   new Obstacle({ x:4200, y: 300, image: pipe, orientation:"up"  }),  
  //   new Obstacle({ x:4800, y: 300, image: pipe, orientation:"up"  })]  
  obstacles = []
  for(let i = 0; i < 10; i++) {
    var random_x = obstacle_x_options[Math.floor(Math.random()*obstacle_x_options.length)];
    var random_orientation = obstacle_orientation_options[Math.floor(Math.random()*obstacle_orientation_options.length)];
    if(random_orientation == "up") {
      obstacles.push(new Obstacle({ x:random_x, y: 300, image: pipe, orientation:"up"  }))
    }
    else{
      obstacles.push(new Obstacle({ x:random_x, y: -400, image: dpipe, orientation:"down"  }))
    }
  }
  

  genericObjects = [
    new GenericObject({x:-1, y:-1, image:background}), 
    new GenericObject({x:-1, y:-1, image:hills}), 
    new GenericObject({x:100, y:10, image:title})];  

  scrollOfset = 0
}

let p = new Player({x:100, y:100, image:bat});

let obstacle_x_options = [1200, 1800, 2400, 3000, 3600, 4200, 4800, 5400]
let obstacle_orientation_options = ["up", "down"]

let platforms = [
  new Platform({ x:0, y: 400, image: plat }),
  new Platform({ x:plat.width-155, y: 400, image: plat }),  
  new Platform({ x: fire.width, y: 400, image: fire }),
  new Platform({ x: fire.width*2 - 30, y: 400, image: fire }), 
  new Platform({ x: fire.width*3 - 50, y: 400, image: fire }), 
  new Platform({ x: fire.width*4 - 70, y: 400, image: fire }),
  new Platform({ x: fire.width*5 - 90, y: 400, image: fire })
]

let obstacles = []
// let obstacles = [
//   new Obstacle({ x:900, y: -400 , image: dpipe, orientation:"down" }), 
//   new Obstacle({ x:1200, y: -400, image: dpipe, orientation:"down" }), 
//   new Obstacle({ x:1800, y: 300, image: pipe, orientation:"up"  }),  
//   new Obstacle({ x:2400, y: 300, image: pipe, orientation:"up"  }),  
//   new Obstacle({ x:3000, y: 300, image: pipe, orientation:"up"  }),  
//   new Obstacle({ x:3600, y: 300, image: pipe, orientation:"up"  }),  
//   new Obstacle({ x:4200, y: 300, image: pipe, orientation:"up"  }),  
//   new Obstacle({ x:4800, y: 300, image: pipe, orientation:"up"  })]  

for(let i = 0; i < 10; i++) {
  var random_x = obstacle_x_options[Math.floor(Math.random()*obstacle_x_options.length)];
  var random_orientation = obstacle_orientation_options[Math.floor(Math.random()*obstacle_orientation_options.length)];
  if(random_orientation == "up") {
    obstacles.push(new Obstacle({ x:random_x, y: 300, image: pipe, orientation:"up"  }))
  }
  else{
    obstacles.push(new Obstacle({ x:random_x, y: -400, image: dpipe, orientation:"down"  }))
  }
}

let genericObjects = [
  new GenericObject({x:-1, y:-1, image:background}), 
  new GenericObject({x:-1, y:-1, image:hills}), 
  new GenericObject({x:100, y:10, image:title})];  

let scrollOfset = 0

let keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  genericObjects.forEach((g) => {
    g.draw();
  })

  obstacles.forEach((o) => {
    o.draw();
  })

  platforms.forEach((pl) => {
    pl.draw();
  })
  
  p.update();

  ctx.fillStyle = "white";
  ctx.font = '24px serif';
  ctx.fillText("Score: " + score, 100, 100);
  ctx.fillText("High Score: " + high_score, 300, 100);
  
  platforms.forEach((pl) => {
    if (p.position.y + p.height <= pl.position.y && p.position.y + p.height + p.velocity.y >= pl.position.y && p.position.x + p.width/2 >= pl.position.x && p.position.x  + p.width/2<= pl.position.x + pl.width) {
      p.velocity.y = 0;
    }
  })

  obstacles.forEach((o) => {
    if(o.orientation == "up") {
      if (p.position.y + p.height -20<= o.position.y && p.position.y + p.height + p.velocity.y >= o.position.y && p.position.x + p.width/2 >= o.position.x && p.position.x + p.width/2<= o.position.x + o.width) {
        init();
      }
      if(p.position.x + p.width - 20 > o.position.x && p.position.y > o.position.y && p.position.x < o.position.x + o.width) {
        init();
      }  
    }
    else {
      if (p.position.y+20<= o.position.y + o.height && p.position.x + p.width-20 >= o.position.x && p.position.x+20<= o.position.x + o.width) {
        init();
      }
    }
  })

  if (keys.right.pressed && p.position.x < 500) {
    p.velocity.x = 5;
  } else if ((keys.left.pressed && p.position.x > 300) || (keys.left.pressed && scrollOfset == 0 && p.position.x > 0)) {
    console.log(p.position.x);
    p.velocity.x = -5;
  }
  else {
    p.velocity.x = 0;
    if (keys.right.pressed) {
      score += 1;
      scrollOfset += 5;
      platforms.forEach((pl) => {
        pl.position.x -= 5;
      })
      genericObjects.forEach((g) => {
        g.position.x -= 5;
      })
      obstacles.forEach((o) => {
        o.position.x -= 5;
      })
        }
    else if (keys.left.pressed && scrollOfset > 0) {
      scrollOfset -= 5;
      console.log(scrollOfset);
      platforms.forEach((pl) => {
        pl.position.x += 5;
      })
      genericObjects.forEach((g) => {
        g.position.x += 5;
      })
      obstacles.forEach((o) => {
        o.position.x += 5;
      })
    }
  }
    if(scrollOfset > fire.width*5 + 90) {
      console.log("WIN!")
    }

    if(p.position.y + p.height >= canvas.height){
      init();
    }
}

animate();

document.addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      keys.left.pressed = true;
      break;
    case 83:
      break;
    case 68:
      keys.right.pressed = true;
      break
    case 87:
      p.velocity.y = -10;
      break;
  }
  console.log(keys.right.pressed);
})

document.addEventListener('keyup', ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      keys.left.pressed = false;
      break;
    case 83:
      break;
    case 68:
      keys.right.pressed = false;
      break
    case 87:
      p.velocity.y = 0;
      break;
  }
})