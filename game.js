const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

const ninjaImg = new Image();
ninjaImg.src = 'assets/ninja.png';

const fireImg = new Image();
fireImg.src = 'assets/fire.png';

const droneImg = new Image();
droneImg.src = 'assets/drone.png';

const chipImg = new Image();
chipImg.src = 'assets/chip.png';

let ninja = {
    x: 50,
    y: 320,
    width: 50,
    height: 50,
    velocityY: 0,
    jumping: false
};

let gravity = 1;
let obstacles = [];
let score = 0;
let gameOver = false;
let chipFound = false;

function drawNinja() {
    ctx.drawImage(ninjaImg, ninja.x, ninja.y, ninja.width, ninja.height);
}

function createObstacle() {
    const type = Math.random() > 0.5 ? 'fire' : 'drone';
    obstacles.push({
        type,
        x: canvas.width,
        y: type === 'fire' ? 340 : 200,
        width: 40,
        height: 40
    });
}

function drawObstacles() {
    for (let o of obstacles) {
        let img = o.type === 'fire' ? fireImg : droneImg;
        ctx.drawImage(img, o.x, o.y, o.width, o.height);
        o.x -= 5;

        if (o.x < ninja.x + ninja.width && o.x + o.width > ninja.x &&
            o.y < ninja.y + ninja.height && o.y + o.height > ninja.y) {
            gameOver = true;
        }
    }
}

function drawChip() {
    ctx.drawImage(chipImg, 700, 200, 64, 64);
    ctx.fillStyle = "#fff";
    ctx.font = "16px Arial";
    ctx.fillText("PEGUE O CHIP", 680, 190);
}

function draw() {
    if (gameOver) {
        ctx.fillStyle = '#fff';
        ctx.font = "30px Arial";
        ctx.fillText("GAME OVER", 300, 200);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawNinja();
    drawObstacles();

    if (score > 1000 && !chipFound) {
        drawChip();
        if (ninja.x > 680 && ninja.x < 740 && ninja.y < 270) {
            chipFound = true;
            window.alert("VOCÊ PEGOU O CHIP! Clique aqui para acessar a IA! 🤖");
        }
    }

    ninja.y += ninja.velocityY;
    ninja.velocityY += gravity;

    if (ninja.y > 320) {
        ninja.y = 320;
        ninja.jumping = false;
    }

    score++;
    if (score % 200 === 0 && score < 1000) createObstacle();

    requestAnimationFrame(draw);
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !ninja.jumping) {
        ninja.velocityY = -15;
        ninja.jumping = true;
    }
});

draw();
