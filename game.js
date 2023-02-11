const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let inGame = false;

/* ====================== User click buttons ==================== */

$("div[type=button]").on("click", function () {
  if (!inGame) return;
  const userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer();
});

/* =============================================================== */

/* ====================== Key detect ==================== */

$("body").on("keyup", function (e) {
  e.preventDefault();
  if (level == 0 && !inGame) {
    changeTitle("Level " + level);
    nextSequence();
    inGame = true;
  }
});

/* ===================================================== */

function nextSequence() {
  const randomNumber = getRandomInt(0, 3);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
}

function checkAnswer() {
  if (!(userClickedPattern[userClickedPattern.length - 1] == gamePattern[userClickedPattern.length - 1]))
    return gameOver();
  if (userClickedPattern.length == gamePattern.length) return nextLevel();
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  inGame = false;
}

async function nextLevel() {
  level++;
  changeTitle(`Level ${level}`);
  await sleep(1000);
  userClickedPattern = [];
  nextSequence();
}

async function gameOver() {
  changeTitle("Game Over, Press Any Key to Restart!");
  playSound("wrong");
  $("body").addClass("game-over");
  await sleep(200);
  $("body").removeClass("game-over");
  startOver();
}

function changeTitle(text) {
  $("h1#level-title").text(text);
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  new Audio(`./sounds/${name}.mp3`).play();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
