let player = document.getElementById("player");
let ball = document.getElementById("ball");
let scoreElement = document.getElementById("score");
let gameOverElement = document.getElementById("game-over");

let score = 0;
let ballSpeed = 2;
let ballInterval;
let gameInterval;

function startGame() {
  ball.style.top = "0px";
  ball.style.left = `${Math.random() * (window.innerWidth - 20)}px`;
  gameInterval = setInterval(moveBall, 10);

  window.addEventListener("mousemove", (e) => {
    let playerWidth = player.offsetWidth;
    let gameWidth = document.getElementById("game-area").offsetWidth;

    let newLeft = e.clientX - playerWidth / 2;
    if (newLeft < 0) newLeft = 0;
    if (newLeft > gameWidth - playerWidth) newLeft = gameWidth - playerWidth;

    player.style.left = newLeft + "px";
  });
}

function moveBall() {
  let ballTop = parseInt(ball.style.top);
  ball.style.top = ballTop + ballSpeed + "px";

  if (ballTop >= 480) {
    checkCollision();
  }
}

function checkCollision() {
  let playerLeft = player.offsetLeft;
  let playerRight = playerLeft + player.offsetWidth;
  let ballLeft = ball.offsetLeft;
  let ballRight = ballLeft + ball.offsetWidth;

  if (ballRight >= playerLeft && ballLeft <= playerRight) {
    score++;
    scoreElement.innerText = score;

    if (score % 10 === 0) {
      ballSpeed++;
    }

    resetBall();
  } else {
    endGame();
  }
}

function resetBall() {
  ball.style.top = "0px";
  ball.style.left = `${Math.random() * (window.innerWidth - 20)}px`;
}

function endGame() {
  clearInterval(gameInterval);
  gameOverElement.style.display = "block";
}

function restartGame() {
  score = 0;
  ballSpeed = 2;
  scoreElement.innerText = score;
  gameOverElement.style.display = "none";
  startGame();
}

startGame();

// Kontrol tombol kiri dan kanan
document.getElementById("left-button").addEventListener("click", () => {
  movePlayer(-20);
});

document.getElementById("right-button").addEventListener("click", () => {
  movePlayer(20);
});

// Fungsi untuk menggerakkan pemain
function movePlayer(offset) {
  let playerLeft = player.offsetLeft;
  let gameWidth = document.getElementById("game-area").offsetWidth;
  let newLeft = playerLeft + offset;

  if (newLeft < 0) newLeft = 0;
  if (newLeft > gameWidth - player.offsetWidth) newLeft = gameWidth - player.offsetWidth;

  player.style.left = newLeft + "px";
}

