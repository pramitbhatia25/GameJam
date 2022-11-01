function newImage(name, ext) {
  const new_image = new Image()
  new_image.src = "/static/" + name + "." + ext;
  return new_image;
}

const plat = newImage("platform", "png");
const hills = newImage("hills", "png");
const background = newImage("background", "png");
const fire = newImage("platforms/fire", "png");
const purple = newImage("platforms/purple", "png");
const water = newImage("platforms/water", "png");
const grass = newImage("platforms/grass", "png");
const m1 = newImage("monsters/m1", "png");
const m2 = newImage("monsters/m2", "png");
const m3 = newImage("monsters/m3", "png");
const m4 = newImage("monsters/m4", "png");
const m5 = newImage("monsters/m5", "png");
const m1r = newImage("monsters/m1r", "png");
const m2r = newImage("monsters/m2r", "png");
const m3r = newImage("monsters/m3r", "png");
const m4r = newImage("monsters/m4r", "png");
const m5r = newImage("monsters/m5r", "png");
const bat = newImage("giphy", "gif");
const rules_one = newImage("/game_rules/rules_one", "jpeg");

const canvas = document.querySelector('canvas')
let player_speed = 7;

let score = 0
let high_score = 0
let level = 1;

canvas.width = 1024;
canvas.height = 520;
var ctx = canvas.getContext("2d");
const gravity = .5;
canvas.contentEditable = true;

class Player {
  constructor({ x, y, image }) {
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
  constructor({ x, y, image }) {
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
  constructor({ x, y, image }) {
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
  constructor({ x, y, image, orientation }) {
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
  player_speed = 7;
  level = 1;
  if (score > high_score) {
    high_score = score;
  }
  score = 0;
  p = new Player({ x: 100, y: 100, image: bat });

  platforms = [
    new Platform({ x: 0, y: 400, image: water }),
    new Platform({ x: water.width - 5, y: 400, image: fire }),
    new Platform({ x: fire.width * 2 - 30, y: 400, image: fire }),
    new Platform({ x: fire.width * 3 - 50, y: 400, image: fire }),
    new Platform({ x: fire.width * 4 - 70, y: 400, image: fire }),
    new Platform({ x: fire.width * 5 - 90, y: 400, image: fire }),
    new Platform({ x: fire.width * 6 - 110, y: 400, image: water }),
    new Platform({ x: fire.width * 7 - 130, y: 400, image: purple }),
    new Platform({ x: fire.width * 8 - 150, y: 400, image: purple }),
    new Platform({ x: fire.width * 9 - 170, y: 400, image: purple }),
    new Platform({ x: fire.width * 10 - 190, y: 400, image: purple }),
    new Platform({ x: fire.width * 11 - 210, y: 400, image: purple }),
    new Platform({ x: fire.width * 12 - 230, y: 400, image: water }),
    new Platform({ x: fire.width * 13 - 260, y: 400, image: grass }),
    new Platform({ x: fire.width * 14 - 290, y: 400, image: grass }),
    new Platform({ x: fire.width * 15 - 320, y: 400, image: grass }),
    new Platform({ x: fire.width * 16 - 350, y: 400, image: grass }),
    new Platform({ x: fire.width * 17 - 380, y: 400, image: grass }),
    new Platform({ x: fire.width * 18 - 410, y: 400, image: water }),
  ]

  obstacles = []
  obstacle_x_options.forEach((x) => {
    var random_o = obstacle_orientation_options[Math.floor(Math.random() * obstacle_orientation_options.length)];
    if (random_o == "up") {
      var random_m = obstacle_m_options[Math.floor(Math.random() * obstacle_m_options.length)];
    }
    else {
      var random_m = obstacle_mr_options[Math.floor(Math.random() * obstacle_mr_options.length)];
    }

    obstacles.push(new Obstacle({ x: x, y: random_o == "up" ? 250 : -150, image: random_m, orientation: random_o }))
  })


  genericObjects = [
    new GenericObject({ x: -1, y: -1, image: background }),
    new GenericObject({ x: -1, y: -1, image: hills }),
    new GenericObject({ x: 650, y: 0, image: rules_one }),
    new GenericObject({ x: 4500, y: 0, image: rules_one }),
    new GenericObject({ x: 8350, y: 0, image: rules_one })
  ];

  scrollOfset = 0
}

let p = new Player({ x: 100, y: 100, image: bat });

let platforms = [
  new Platform({ x: 0, y: 400, image: water }),
  new Platform({ x: water.width - 5, y: 400, image: fire }),
  new Platform({ x: fire.width * 2 - 30, y: 400, image: fire }),
  new Platform({ x: fire.width * 3 - 50, y: 400, image: fire }),
  new Platform({ x: fire.width * 4 - 70, y: 400, image: fire }),
  new Platform({ x: fire.width * 5 - 90, y: 400, image: fire }),
  new Platform({ x: fire.width * 6 - 110, y: 400, image: water }),
  new Platform({ x: fire.width * 7 - 130, y: 400, image: purple }),
  new Platform({ x: fire.width * 8 - 150, y: 400, image: purple }),
  new Platform({ x: fire.width * 9 - 170, y: 400, image: purple }),
  new Platform({ x: fire.width * 10 - 190, y: 400, image: purple }),
  new Platform({ x: fire.width * 11 - 210, y: 400, image: purple }),
  new Platform({ x: fire.width * 12 - 230, y: 400, image: water }),
  new Platform({ x: fire.width * 13 - 260, y: 400, image: grass }),
  new Platform({ x: fire.width * 14 - 290, y: 400, image: grass }),
  new Platform({ x: fire.width * 15 - 320, y: 400, image: grass }),
  new Platform({ x: fire.width * 16 - 350, y: 400, image: grass }),
  new Platform({ x: fire.width * 17 - 380, y: 400, image: grass }),
  new Platform({ x: fire.width * 18 - 410, y: 400, image: water }),
]

let obstacles = []
let obstacle_x_options = [1200, 1800, 2400, 3000, 3600, 4200, 4800, 5400]
let obstacle_orientation_options = ["up", "down"]
let obstacle_m_options = [m1, m2, m3, m4, m5]
let obstacle_mr_options = [m1r, m2r, m3r, m4r, m5r]


obstacle_x_options.forEach((x) => {
  var random_o = obstacle_orientation_options[Math.floor(Math.random() * obstacle_orientation_options.length)];
  if (random_o == "up") {
    var random_m = obstacle_m_options[Math.floor(Math.random() * obstacle_m_options.length)];
  }
  else {
    var random_m = obstacle_mr_options[Math.floor(Math.random() * obstacle_mr_options.length)];
  }

  obstacles.push(new Obstacle({ x: x, y: random_o == "up" ? 250 : -150, image: random_m, orientation: random_o }))
})

let genericObjects = [
  new GenericObject({ x: -1, y: -1, image: background }),
  new GenericObject({ x: -1, y: -1, image: hills }),
  new GenericObject({ x: 650, y: 0, image: rules_one }),
  new GenericObject({ x: 4500, y: 0, image: rules_one }),
  new GenericObject({ x: 8350, y: 0, image: rules_one })

];

let won = false
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
  ctx.fillText("Score: " + score, 50, 50);
  ctx.fillText("High Score: " + high_score, 50, 100);
  ctx.fillText("Level: " + level, 50, 150);
  // ctx.fillText("Controls:", 700, 100);
  // ctx.fillText("W - Jump", 700, 130);
  // ctx.fillText("D - Move Right", 700, 160);
  // ctx.fillText("A - Move Left", 700, 190);
  // ctx.fillText("Rules:", 700, 240);
  // ctx.fillText("Dont Touch The Monsters,", 700, 270);
  // ctx.fillText("Dont Touch The Lava.", 700, 300);

  platforms.forEach((pl) => {
    if (p.position.y + p.height <= pl.position.y && p.position.y + p.height + p.velocity.y >= pl.position.y && p.position.x + p.width / 2 >= pl.position.x && p.position.x + p.width / 2 <= pl.position.x + pl.width) {
      if (pl.image == water) { p.velocity.y = 0; }
      else if(pl.image == purple) { p.velocity.y = 0; }
      else if(pl.image == grass) { p.velocity.y -= 20; }
      else if(pl.image == fire) { init(); }
    }
  })

  obstacles.forEach((o) => {
    if (o.orientation == "up") {
      if (p.position.y + p.height - 20 <= o.position.y && p.position.y + p.height + p.velocity.y >= o.position.y && p.position.x + p.width / 2 >= o.position.x && p.position.x + p.width / 2 <= o.position.x + o.width) {
        init();
      }
      if (p.position.x + p.width - 20 > o.position.x && p.position.y > o.position.y && p.position.x < o.position.x + o.width) {
        init();
      }
    }
    else {
      if (p.position.y + 20 <= o.position.y + o.height && p.position.x + p.width - 20 >= o.position.x && p.position.x + 20 <= o.position.x + o.width) {
        init();
      }
    }
  })

  if (keys.right.pressed == true && p.position.x < 500 && won == false) {
    p.velocity.x = player_speed;
  } else if ((keys.left.pressed == true && p.position.x > 300) || (keys.left.pressed && scrollOfset == 0 && p.position.x > 0) && won == false) {
    p.velocity.x = -player_speed;
  }
  else {
    p.velocity.x = 0;
    if (keys.right.pressed && won == false) {
      score += 1;
      scrollOfset += player_speed;
      platforms.forEach((pl) => {
        pl.position.x -= player_speed;
      })
      genericObjects.forEach((g) => {
        g.position.x -= player_speed * 0.66;
      })
      obstacles.forEach((o) => {
        o.position.x -= player_speed;
      })
    }
    else if (keys.left.pressed && scrollOfset > 0 && won == false) {
      score -= 1;
      scrollOfset -= player_speed;
      platforms.forEach((pl) => {
        pl.position.x += player_speed;
      })
      genericObjects.forEach((g) => {
        g.position.x += player_speed * 0.66;
      })
      obstacles.forEach((o) => {
        o.position.x += player_speed;
      })
    }
  }

  if (p.position.y + p.height >= canvas.height) {
    p.velocity.y = 0;
  }

  if (score == 850) {
    level = 2
    player_speed = 12
    console.log("Level 2")
  }
  if (score == 1330) {
    level = 3
    player_speed = 17
    console.log("Level 3")
  }
  if (score == 1700) {
    // p.velocity.x = 0
    // p.velocity.y = 0
    // document.removeEventListener('keydown', ({keyCode}) => {
    //   switch (keyCode) {
    //     default:
    //       keys.right.pressed = false;
    //       keys.left.pressed = false;
    //             break;
    //   }    
    // });
    // document.removeEventListener('keyup', ({keyCode}) => {
    //   switch (keyCode) {
    //     default:
    //       keys.right.pressed = false;
    //       keys.left.pressed = false;
    //             break;
    //   }    
    // });
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
      if (won == false) p.velocity.y = -10;
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
      if (won == false) p.velocity.y = 0;
      break;
  }
})