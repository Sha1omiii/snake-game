const gameSection = document.getElementById('gameSection');
const context = gameSection.getContext('2d');
const scoreEl = document.getElementById('scoreTxt');
const highScoreEl = document.getElementById('highScore');
const restartBtn = document.getElementById('restart');


const gridSize = 20;
const height = gameSection.height;
const width = gameSection.width;

let isChangingDir = false;
let isGameRunning = false;
let score = 0;
let highScore = 0;
let wholeSnake = [
    {x: gridSize * 3, y: 0},
    {x: gridSize * 2, y: 0},
    {x: gridSize, y: 0},
    {x: 0, y: 0},
];
let backgroundColor = 'rgba(254, 192, 170, 1)';
let snakeColor = 'rgba(132, 115, 43, 1)';
let snakeBorderColor = 'rgba(28, 58, 19, 1)';
let eggColor = 'rgba(28, 58, 19, 1)';
let eggX;
let eggY;
let distanceX = gridSize; 
let distanceY = 0;

startGame();

function startGame () {
    isGameRunning = true;
    generateEgg();
    displayEgg();
    tick();
}

function generateEgg () {
    function random (low, high) {
        let randEgg = Math.round(Math.random() * (((high - low) + low)) / gridSize) * gridSize; 
        return randEgg;
    }
    eggX = random(0, width - gridSize);
    eggY = random(0, height - gridSize);
}

function displayEgg () {
    let radius = 10;
    context.beginPath()
    context.fillStyle = eggColor;
    context.arc(eggX + radius, eggY + radius , radius, 0, 2 * Math.PI);
    context.fill();
}

function drawSnake () {
    context.fillStyle = snakeColor;
    context.strokeStyle = snakeBorderColor;
    for(let snakeUnit of wholeSnake) {
        context.beginPath();
        context.arc(snakeUnit.x + gridSize / 2, snakeUnit.y + gridSize / 2, gridSize / 2, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
    } 
}

function snakeMovement () {
    const snakeHead = {x: wholeSnake[0].x + distanceX, y: wholeSnake[0].y + distanceY};
    wholeSnake.unshift(snakeHead);

    if (wholeSnake[0].x === eggX && wholeSnake[0].y === eggY) {
        score+= 1;
        scoreEl.textContent = `Current score ${score}`;
        clearGameSec();
        generateEgg();    
    }
    else {
        let endPiece = wholeSnake.pop();
    }
}

function changeSnakeDirection (event) {
    
    if (isChangingDir) return;
    isChangingDir = true;

    const key = event.keyCode;
    const isGoingUp = distanceY === -gridSize;
    const isGoingDown = distanceY === gridSize;
    const isGoingRight = distanceX === gridSize;
    const isGoingLeft = distanceX === -gridSize;
    
    if (key === 37 && !isGoingRight) { //if left key pressed
        distanceX = -gridSize;
        distanceY = 0;
    } 
    else if (key === 39 && !isGoingLeft) { //if right key pressed
        distanceX = gridSize;
        distanceY = 0;
    }
    else if (key === 38 && !isGoingDown) { //if up key pressed
        distanceX = 0;
        distanceY = -gridSize;
    }
    else if (key === 40 && !isGoingUp) { //if down key pressed
        distanceX = 0;
        distanceY = gridSize;
    }  
}

function tick () {
    if (isGameRunning) {
        setTimeout(() => {
            isChangingDir = false;
            clearGameSec();
            displayEgg();
            snakeMovement();
            drawSnake();
            gameOver()
            tick();
        }, 100);
    }   
    else {
        gameOverText();
    }
}

function clearGameSec () {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, width, height);
}

function gameOver () {
    wallCollision();
    bodyCollision();
    if (score > highScore) {
        highScore = score;
        highScoreEl.textContent = `Highest score: ${highScore}`;
    }
}

function wallCollision () {
    if (wholeSnake[0].x < 0) {
        isGameRunning = false;
    }
    else if (wholeSnake[0].x >= width) {
        isGameRunning = false;
    }
    else if (wholeSnake[0].y < 0) {
        isGameRunning = false;
    }
    else if (wholeSnake[0].y >= height) {
        isGameRunning = false;
    }
}

function bodyCollision () {
    for (let i = 1; i < wholeSnake.length; i+=1) {
        if(wholeSnake[i].x === wholeSnake[0].x && wholeSnake[i].y === wholeSnake[0].y) {
            isGameRunning = false;
        }
    }
}

function gameOverText () {
    if (!isGameRunning) {
        context.fillStyle = 'rgba(236, 78, 32, 1)';
        context.font = '100px Tiny5';
        context.fillText('GAME OVER ', width / 12, height / 2);
        isGameRunning = false;
    }    
    
}

function restartGame () {
    score = 0;
    scoreEl.textContent = `Current Score: ${score}`;
    wholeSnake = [
        {x: gridSize * 3, y: 0},
        {x: gridSize * 2, y: 0},
        {x: gridSize, y: 0},
        {x: 0, y: 0},
    ];
    distanceX = gridSize;
    distanceY = 0;
    startGame();
}

window.addEventListener('keydown', changeSnakeDirection);
restartBtn.addEventListener('click', restartGame);