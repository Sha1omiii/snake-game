const gameSection = document.getElementById('gameSection');
const context = gameSection.getContext('2d');
//getContext basically allows us to draw on our canvas (in this case a 2 dimentional object)
const scoreEl = document.getElementById('scoreTxt');
const restartBtn = document.getElementById('restart');

const gridSize = 20;
const height = gameSection.height;
const width = gameSection.width;

let gameRunning = false;
let score = 0;
let snake = [
    {x: gridSize * 3, y: 0},
    {x: gridSize * 2, y: 0},
    {x: gridSize, y: 0},
    {x: 0, y: 0},
];
let direction = {x: 0, y: 0};
let snakeColor = 'green';
let appleColor = 'red';
let appleX;
let appleY;

//store how far we move on the x- and y- axis
//move gridSize on the x axis as the game goes on
//meaning we can use -ve and +ve to see if it moves left or right on the x axis
//or down or up
let distanceX = gridSize; 
let distanceY = 0;


// restartBtn.addEventListener('click', function() {
//     alert('hello');
// });
// window.addEventListener("keydown", function () {
//     this.alert('working')
// ;});
// buttons work --


startGame();

function startGame () {
    // random placement of food and render it 
    //current score 
    //the game conditional 
    gameRunning = true;
    drawApple();
    displayApple();
    onTick();
}

//I want it to to randomly pick a number
//in the range of the canvas section (its width and height)
function drawApple () {
    appleX = Math.round(Math.random() * (width / gridSize)) * gridSize;
    appleY = Math.round(Math.random() * (height / gridSize)) * gridSize;

    console.log(appleX, appleY); 
}

function displayApple () {
    context.fillStyle = appleColor;
    context.fillRect(appleX, appleY, gridSize, gridSize);
    context.strokeStyle = 'yellow';
    context.strokeRect(appleX, appleY, gridSize, gridSize);
}

function drawSnake () {
    context.fillStyle = snakeColor;
    for(let snakeUnit of snake) {
        context.fillRect(snakeUnit.x, snakeUnit.y, gridSize, gridSize);
        // context.strokeRect(snakeUnit.x, snakeUnit.y, gridSize, gridSize);
        
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
        scoreEl.textContent = score;
        //clear the previous apple and then
        clearGameSec();
        drawApple();
        displayApple();
    }
    else {
        let endPiece = snake.pop();
        context.clearRect(endPiece.x, endPiece.y, gridSize, gridSize);
    }
}


document.addEventListener('click', snakeDirection);
function snakeDirection (event) {
    const clickedArrows = event.keyCode;
    const leftArw = 37;
    const rightArw = 39;
    const upArw = 38;
    const downArw = 40;

    const isGoingUp = distanceY === -gridSize;
    const isGoingDown = distanceY === gridSize;
    const isGoingRight = distanceY === gridSize;
    const isGoingLeft = distanceY === -gridSize;

    if (clickedArrows === leftArw && !isGoingRight) {
        distanceX = -gridSize;
        distanceY = 0;
    }
    if (clickedArrows === rightArw && !isGoingLeft) {
        distanceX = gridSize;
        distanceY = 0;
    }
    if (clickedArrows === upArw && !isGoingDown) {
        distanceX = -gridSize;
        distanceY = 0;
    }
    if (clickedArrows === downArw && !isGoingUp) {
        distanceX = 0;
        distanceY = gridSize;
    }
    
}


function onTick () {
    if (gameRunning) {
        setTimeout(() => {
            
            displayApple();
            canTheSnakeMove();
            drawSnake();
            snakeDirection
            onTick();
        }, 95);
    }   
    else {
        gameOver();
    }
}

function clearGameSec () {
    context.fillStyle = 'rgba(104, 102, 143, 1)';
    context.fillRect(0, 0, width, height);
}

