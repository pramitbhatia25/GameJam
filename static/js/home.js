function newImage(name, ext) {
    const new_image = new Image()
    new_image.src = "/static/" + name + "." + ext;
    return new_image;
}
const bangersFont = new FontFace('Bangers Regular', 'url(/static/fonts/Heartless.ttf)');
var started = false;
var start_time;
var end_time;
var ended = false;


bangersFont.load().then(function (loadedFont) {
    document.fonts.add(loadedFont)
    ctx.font = loadedFont;
}).catch(function (error) {
    console.log('Failed to load font: ' + error)
})

const orange_logo = newImage("text/orange_logo", "png");
const forest = newImage("background_images/forest", "jpg");
const fire = newImage("platforms/fire", "png");
const water = newImage("platforms/water", "png");
const fly1 = newImage("players/frame-1", "png");
const fly2 = newImage("players/frame-2", "png");

const canvas = document.querySelector('canvas')
canvas.width = 1024;
canvas.height = 520;
var ctx = canvas.getContext("2d");

canvas.contentEditable = true;
var gravity = 0.5;

class Player {
    constructor({ x, y }) {
        this.position = {
            x,
            y
        }
        this.width = 80;
        this.height = 50;

        this.velocity = {
            y: 0,
        }
    }

    draw() {
        if (keys.top.pressed) {
            ctx.drawImage(fly1, this.position.x, this.position.y, 80, 60);
        }
        else {
            ctx.drawImage(fly2, this.position.x, this.position.y, 80, 60);
        }
    }

    update() {
        this.frame += 1;
        this.position.y += this.velocity.y;
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
        ctx.drawImage(this.image, this.position.x, this.position.y, canvas.width+10, this.image.height);
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
    window.location.href = 'http://http://gamejam-gsu.herokuapp.com/' + name;
}

let p = new Player({ x: 100, y: 100 });

let platforms = [
    new Platform({ x: -5, y: 400, image: fire }),
]

let genericObjects = [
    new GenericObject({ x: -1000, y: -1, image: forest }),
    new GenericObject({ x: -10, y: 50, image: orange_logo }),
];

let enemies = []

let keys = {
    top: {
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

    platforms.forEach((pl) => {
        pl.draw();
    })

    p.update();

    enemies.forEach((e) => {
        e.update();
    })

    ctx.fillStyle = "white";
    ctx.font = '15px serif';

    platforms.forEach((pl) => {
        if (p.position.y + p.height <= pl.position.y && p.position.y + p.height + p.velocity.y >= pl.position.y && p.position.x + p.width / 2 >= pl.position.x && p.position.x + p.width / 2 <= pl.position.x + pl.width) {
            p.velocity.y = 0;
        }
    })


    if (p.position.y <= -1) {
        post_my_win("Your Name");
        p.position.y = 0;
    }
}

animate();

document.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            break;
        case 83:
            break;
        case 68:
            break
        case 87:
            keys.top.pressed = true;
            p.velocity.y = -10;
            break;
    }
})

document.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            break;
        case 83:
            break;
        case 68:
            break
        case 87:
            keys.top.pressed = false;
            break;
    }
})