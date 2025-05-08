const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 175, y: 500, width: 50, height: 100 };
let obstacles = [];
let gameOver = false;
let collidedObstacle = null;

function drawPlayer() {
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
  ctx.fillStyle = "red";
  obstacles.forEach(obs => {
    if (obs !== collidedObstacle) {
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    }
  });
}

function updateObstacles() {
  obstacles.forEach(obs => obs.y += 5);
  obstacles = obstacles.filter(obs => obs.y < canvas.height);
  if (Math.random() < 0.05) {
    let x = Math.random() < 0.5 ? 100 : 250;
    obstacles.push({ x: x, y: 0, width: 50, height: 100 });
  }
}

function checkCollision() {
  for (let obs of obstacles) {
    if (
      player.x < obs.x + obs.width &&
      player.x + player.width > obs.x &&
      player.y < obs.y + obs.height &&
      player.y + player.height > obs.y
    ) {
      gameOver = true;
      collidedObstacle = obs; // Guardamos el obstáculo que chocó
      document.getElementById("game-over").style.display = "block";
    }
  }
}

function draw() {
  if (gameOver) {
    // Detenemos el movimiento y mostramos por última vez
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawObstacles();
  updateObstacles();
  checkCollision();
  requestAnimationFrame(draw);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && player.x > 100) {
    player.x -= 150;
  } else if (e.key === "ArrowRight" && player.x < 250) {
    player.x += 150;
  }
});

function restartGame() {
  player.x = 175;
  obstacles = [];
  collidedObstacle = null;
  gameOver = false;
  document.getElementById("game-over").style.display = "none";
  draw();
}

draw();
