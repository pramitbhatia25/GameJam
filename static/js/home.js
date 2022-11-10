function newImage(name, ext) {
    const new_image = new Image()
    new_image.src = "/static/" + name + "." + ext;
    return new_image;
  }  

  const forest = newImage("background_images/forest", "jpg");    
  const orange_logo = newImage("text/orange_logo", "png");
  const water = newImage("platforms/fire", "png");
  const fly1 = newImage("players/frame-1", "png");
  const fly2 = newImage("players/frame-2", "png");
  const flip_fly1 = newImage("players/flip_frame-1", "png");
  const flip_fly2 = newImage("players/flip_frame-2", "png");
  
  const SPD = 7;
  const player_speed = SPD;
  const canvas = document.querySelector('canvas')
  canvas.width = 1024;
  canvas.height = 520;
  var ctx = canvas.getContext("2d");
  
  canvas.contentEditable = true;
  var gravity = 0.5;
  
  
  class Player {
    constructor({ x, y }) {
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
      if (keys.top.pressed) {
        if(keys.left.pressed) {
          ctx.drawImage(flip_fly1, this.position.x, this.position.y, 80, 60);
        }
        else{
          ctx.drawImage(fly1, this.position.x, this.position.y, 80, 60);
        }
      }
      else {
        if(keys.left.pressed) {
          ctx.drawImage(flip_fly2, this.position.x, this.position.y, 80, 60);
        }
        else {
          ctx.drawImage(fly2, this.position.x, this.position.y, 80, 60);
        }
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
      ctx.drawImage(this.image, this.position.x, this.position.y,canvas.width*1.1, this.image.height);
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
      ctx.drawImage(this.image, this.position.x, this.position.y, this.image.width, this.image.height);
    }
  }
  
  
  async function post_my_win(name) {
    window.location.href = 'http://gamejam-gsu.herokuapp.com/' + name;
}
async function post_my_win_local(name) {
  window.location.href = 'http://127.0.0.1:5000/' + name;
}

  let p = new Player({ x: 100, y: 100 });
  
  let platforms = [
    new Platform({ x: -10, y: 400, image: water }),
  ]
  
  let genericObjects = [
    new GenericObject({ x: -1000, y: -1, image: forest }),
    new GenericObject({ x: -10, y: 50, image: orange_logo }),
  ];
    
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
  var reloaded = false;
  function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    genericObjects.forEach((g) => {
      g.draw();
    })
  
    platforms.forEach((pl) => {
      pl.draw();
    })
    
    ctx.fillStyle = "white";
    ctx.font = '15px serif';
    platforms.forEach((pl) => {
      if (p.position.y + p.height <= pl.position.y && p.position.y + p.height + p.velocity.y >= pl.position.y && p.position.x + p.width / 2 >= pl.position.x && p.position.x + p.width / 2 <= pl.position.x + pl.width) {
        if (pl.image == water) { p.velocity.y = 0; }
      }
    })
    if (p.position.y <= -1) {
      p.position.y = 0;
    }
    if (keys.right.pressed == true) {
        p.velocity.x = player_speed;
        console.log("S");
      } else if (keys.left.pressed == true) {
        p.velocity.x = -player_speed;
    }
    else{
        p.velocity.x = 0;
    }
    if(p.position.x > canvas.width-100) {
        p.position.x = canvas.width-100;
    }
    if(p.position.x < 0) {
        p.position.x = 0;
    }

    if(p.position.y > 400 && !reloaded) {
      reloaded = true;
      location.reload();
    }
  p.update();

}
  
  animate();


  document.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
      case 37:
        keys.left.pressed = true;
        break;
      case 83:
        break;
      case 39:
        keys.right.pressed = true;
        break
      case 32:
        keys.top.pressed = true;
        p.velocity.y = -10;
        break;
      case 38:
        keys.top.pressed = true;
        p.velocity.y = -10;
        break;
      case 13:
        if(document.getElementById("input").value.length != 0) {
          post_my_win(document.getElementById("input").value);
        } 
        break;   
      }
  })
  
  document.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
      case 37:
        keys.left.pressed = false;
        break;
      case 83:
        break;
      case 39:
        keys.right.pressed = false;
        break
      case 32:
        keys.top.pressed = false;
        p.velocity.y = 0;
        break;
      case 38:
        keys.top.pressed = false;
        p.velocity.y = 0;
        break;
      }
  })