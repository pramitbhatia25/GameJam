function newImage(name, ext) {
  const new_image = new Image()
  new_image.src = "/static/" + name + "." + ext;
  return new_image;
}

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
const fly1 = newImage("players/frame-1", "png");
const fly2 = newImage("players/frame-2", "png");
const up = newImage("players/up", "png");
const down = newImage("players/down", "png");

const SPD = 7;
const canvas = document.querySelector('canvas')
canvas.width = 1024;
canvas.height = 520;
var ctx = canvas.getContext("2d");

canvas.contentEditable = true;
var gravity = 0.5;
var enemy_gravity = 0.5;

let player_speed = SPD;
let score = 0
let high_score = 0
let level = 1;


class Player {
  constructor({ x, y}) {
    this.frame = 0
    this.position = {
      x,
      y
    }
    this.width = 80;
    this.height = 50;

    this.velocity = {
      x: 0,
      y: 0,
    }
  }

  draw() {
    if (level == 2) {
      if (keys.top.pressed) {
        ctx.drawImage(up, this.position.x, this.position.y, 80, 60);
      }
      else {
        ctx.drawImage(down, this.position.x, this.position.y, 80, 60);
      }
    }
    else if (keys.top.pressed) {
      ctx.drawImage(fly1, this.position.x, this.position.y, 80, 60);
    }
    else {
      ctx.drawImage(fly2, this.position.x, this.position.y, 80, 60);
    }
  }

  update() {
    this.frame += 1;
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

class Enemy {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y
    }
    this.image = image;
    this.width = 50;
    this.height = 50;
    this.velocity = {
      x: -1,
      y: 0
    }
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) { this.velocity.y += enemy_gravity; }
    else { this.velocity.y = 0; }
    this.draw();
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

function launchFire(position) {
  return;
}

function init() {
  gravity = 0.5;
  enemy_gravity = 0.5;
  keys.right.pressed = false;
  random_m = obstacle_m_options[Math.floor(Math.random() * obstacle_m_options.length)];
  enemies = [];
  player_speed = SPD;
  level = 1;
  if (score > high_score) {
    high_score = score;
  }
  score = 0;
  p = new Player({ x: 100, y: 100});

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
    new Platform({ x: fire.width * 15 - 320, y: 400, image: grass }),
    new Platform({ x: fire.width * 16 - 350, y: 400, image: grass }),
    new Platform({ x: fire.width * 17 - 380, y: 400, image: grass }),
    new Platform({ x: fire.width * 18 - 410, y: 400, image: water }),
    new Platform({ x: fire.width * 13 - 260, y: 150, image: purple }),
    new Platform({ x: fire.width * 14 - 271, y: 200, image: purple }),
    new Platform({ x: fire.width * 16 - 350, y: 200, image: purple }),
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

let p = new Player({ x: 100, y: 100});

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
  new Platform({ x: fire.width * 15 - 320, y: 400, image: grass }),
  new Platform({ x: fire.width * 16 - 350, y: 400, image: grass }),
  new Platform({ x: fire.width * 17 - 380, y: 400, image: grass }),
  new Platform({ x: fire.width * 18 - 410, y: 400, image: water }),
  new Platform({ x: fire.width * 13 - 260, y: 150, image: purple }),
  new Platform({ x: fire.width * 14 - 271, y: 200, image: purple }),
  new Platform({ x: fire.width * 16 - 350, y: 200, image: purple }),
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

var random_m = obstacle_m_options[Math.floor(Math.random() * obstacle_m_options.length)];
let enemies = [new Enemy({ x: 500, y: 200, image: random_m }), new Enemy({ x: 700, y: 200, image: random_m })];

let won = false
let scrollOfset = 0

let keys = {
  top: {
    pressed: false,
  },
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

  enemies.forEach((e) => {
    e.update();
  })

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

  var gs = [-0.2, -0.4, 0.2, 0.4];

  if (level == 2) {
    var random_g = gs[Math.floor(Math.random() * gs.length)];
    enemy_gravity = random_g;
    gravity = 0;
  }

  platforms.forEach((pl) => {
    if (p.position.y + p.height <= pl.position.y && p.position.y + p.height + p.velocity.y >= pl.position.y && p.position.x + p.width / 2 >= pl.position.x && p.position.x + p.width / 2 <= pl.position.x + pl.width) {
      if (pl.image == water) { p.velocity.y = 0; }
      else if (pl.image == purple) { p.velocity.y = 0; }
      else if (pl.image == grass) { p.velocity.y = 0; }
      else if (pl.image == fire) { init(); }
    }
  })

  enemies.forEach((e) => {
    platforms.forEach((pl) => {
      if (e.position.y + e.height - 8 <= pl.position.y && e.position.y + e.height + e.velocity.y - 8 >= pl.position.y && e.position.x + e.width / 2 >= pl.position.x && e.position.x + e.width / 2 <= pl.position.x + pl.width) {
        e.velocity.y = 0;
      }
    })
  })

  enemies.forEach((e) => {
    if (p.position.x + p.width  > e.position.x && p.position.y + p.height > e.position.y && p.position.y < e.position.y + e.height && p.position.x < e.position.x + e.width) {
      init();
    }
  })

  obstacles.forEach((o) => {
    if (o.orientation == "up") {
      if (p.position.x + p.width - 90 > o.position.x && p.position.y > o.position.y && p.position.x < o.position.x + o.width) {
        init();
      }
    }
    else {
      if (p.position.y + 20 <= o.position.y + o.height && p.position.x + p.width - 100 >= o.position.x && p.position.x + 100 <= o.position.x + o.width) {
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
      enemies.forEach((e) => {
        e.position.x -= player_speed;
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
      enemies.forEach((e) => {
        e.position.x += player_speed;
      })
    }
  }

  if (p.position.y <= -1) {
    p.position.y = 0;
  }

  enemies.forEach((e) => {
    if (e.position.y <= -1) {
      enemy_gravity = 1;
      e.position.y = 0;
    }  
  })

  if (p.position.y + p.height >= canvas.height) {
    if (won) {
      window.location.href = '/p';
    }
    else {
      init();
    }
  }

  if (score == 850) {
    keys.right.pressed = false;
    score += 1;
    level = 2;
    player_speed = 10;
    console.log("Level 2")
    for (let i = 10; i < 65; i += 7) {
      random_m = obstacle_m_options[Math.floor(Math.random() * obstacle_m_options.length)];
      enemies.push(new Enemy({ x: i * 100, y: 5*i, image: random_m }))
    }
  }

  if (score == 1435) {
    keys.right.pressed = false;
    score += 1;
    level = 3;
    gravity = 0.5;
    enemy_gravity = 0.5;
    player_speed = 10;
    console.log("Level 3")
    document.addEventListener('keyup', ({ keyCode }) => {
      switch (keyCode) {
        case 32:
          console.log("SpACE");
          launchFire(p.position);
          break;
      }
    })
    for (let i = 9; i < 35; i += 2) {
      random_m = obstacle_m_options[Math.floor(Math.random() * obstacle_m_options.length)];
      enemies.push(new Enemy({ x: i * 200, y: 0, image: random_m }))
    }
  }

  if (score == 1950) {
    p.velocity.x = 0
    p.velocity.y = 5
    won = true;
    document.removeEventListener('keydown', ({ keyCode }) => {
      switch (keyCode) {
        default:
          keys.right.pressed = false;
          keys.left.pressed = false;
          break;
      }
    });
    document.removeEventListener('keyup', ({ keyCode }) => {
      switch (keyCode) {
        default:
          keys.right.pressed = false;
          keys.left.pressed = false;
          break;
      }
    });
  }
}

animate();

document.addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      break;
    case 83:
      if(level == 2) {
        if (won == false) p.velocity.y = +5;
      }
      break;
    case 68:
      keys.right.pressed = true;
      break
    case 87:
      keys.top.pressed = true;
      if (won == false && level == 2) p.velocity.y = -5;
      if (won == false && level != 2) p.velocity.y = -10;
      break;
  }
})

document.addEventListener('keyup', ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      keys.left.pressed = false;
      break;
    case 83:
      if(level == 2) {
        if (won == false) p.velocity.y = 0;
      }
      break;
    case 68:
      break
    case 87:
      keys.top.pressed = false;
      if (won == false) p.velocity.y = 0;
      break;
  }
})