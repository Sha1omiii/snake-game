const gameSection = document.getElementById('gameSection');
const context = gameSection.getContext('2d');
//getContext basically allows us to draw on our canvas (in this case a 2 dimentional object)
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
let snake = [
    {x: gridSize * 3, y: 0},
    {x: gridSize * 2, y: 0},
    {x: gridSize, y: 0},
    {x: 0, y: 0},
];
let backgroundColor = 'rgba(104, 102, 143, 1)';
let snakeColor = 'rgba(0, 0, 0, 1)';
let snakeBorderColor = 'rgba(102, 153, 102, 1)';
let appleColor = 'red';
let appleX;
let appleY;

//store how far we move on the x- and y- axis
//move gridSize on the x axis as the game goes on
//meaning we can use -ve and +ve to see if it moves left or right on the x axis
//or down or up
let distanceX = gridSize; 
let distanceY = 0;



startGame();

function startGame () {
    isGameRunning = true;
    generateApple();
    displayApple();
    onTick();
}

//I want it to to randomly pick a number
//in the range of the canvas section (its width and height)
function generateApple () {
    function random (low, high) {
        let randAppl = Math.round(Math.random() * (((high - low) + low)) / gridSize) * gridSize; 
        return randAppl;
    }
    appleX = random(0, width - gridSize);
    appleY = random(0, height - gridSize);

    console.log(appleX, appleY); //test
}

function displayApple () {
    let radius = 10;
    context.beginPath()
    context.fillStyle = appleColor;
    context.arc(appleX + radius, appleY + radius , radius, 0, 2 * Math.PI);
    
    context.fill();
    // context.fillStyle = appleColor;
    // context.fillRect(appleX, appleY, gridSize, gridSize);
    // context.strokeStyle = 'yellow';
    // context.strokeRect(appleX, appleY, gridSize, gridSize);
}

function drawSnake () {
    // context.fillStyle = snakeColor;
    // context.strokeStyle = snakeBorderColor;
    // for(let snakeUnit of snake) {
    //     context.fillRect(snakeUnit.x, snakeUnit.y, gridSize, gridSize);
    //     context.strokeRect(snakeUnit.x, snakeUnit.y, gridSize, gridSize);
    // } 

    context.fillStyle = snakeColor;
    for(let snakeUnit of snake) {
        context.beginPath();
        context.arc(snakeUnit.x + gridSize / 2, snakeUnit.y + gridSize / 2, gridSize / 2, 0, 2 * Math.PI);
        context.fill();
    } 
}

function canTheSnakeMove () {
//okay I have a snake array thats holding 4 snake units
//if i want to move it to the righ one grid, 
//I have to add a unit using unshift method to the index of snake[0]
//but then its just going to get longer??
//so how do i just keep it to its size // cutting its tail 
//the head of snake would be at index of 0
    const snakeHead = {x: snake[0].x + distanceX, y: snake[0].y + distanceY};
    snake.unshift(snakeHead);
  
    //only pop when the apple and snake are not overlapping 
    if (snake[0].x === appleX && snake[0].y === appleY) {
        score+= 1;
        scoreEl.textContent = `Current score ${score}`;
        //clear the previous apple and then
        clearGameSec();
        generateApple();
        // displayApple();
        
    }
    else {
        let endPiece = snake.pop();
        context.clearRect(endPiece.x, endPiece.y, gridSize, gridSize);
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

function onTick () {
    if (isGameRunning) {
        setTimeout(() => {
            isChangingDir = false;
            clearGameSec();
            displayApple();
            canTheSnakeMove();
            drawSnake();
            gameOver()
            onTick();
        }, 95);
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
    //game is over if
    //snake is out of the canvas boundry
    wallCollision();
    //collision with its units
    bodyCollision();
    if (score > highScore) {
        highScore = score;
        highScoreEl.textContent = `highest score: ${highScore}`;
    }
}

function wallCollision () {
    if (snake[0].x < 0) {
        isGameRunning = false;
        console.log('left wall');//test
    }
    else if (snake[0].x >= width) {
        isGameRunning = false;
        console.log('right wall');//test
    }
    else if (snake[0].y < 0) {
        isGameRunning = false;
        console.log('top wall');//test
    }
    else if (snake[0].y >= height) {
        isGameRunning = false;
        console.log('bottom wall');//test
    }
}
function bodyCollision () {
    for (let i = 1; i < snake.length; i+=1) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            isGameRunning = false;
            console.log('collided with itself');
            
        }
    }
}



function gameOverText () {
    if (!isGameRunning) {
        context.fillStyle = 'white';
        context.font = '60px Tiny5';
        context.fillText('Game Over ', width /5, height / 2);
        isGameRunning = false;
    }    
    
}

function restartGame () {
    score = 0;
    scoreEl.textContent = `Current Score: ${score}`;
    snake = [
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