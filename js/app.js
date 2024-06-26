const gameSection = document.getElementById('gameSection');
const context = gameSection.getContext('2d');
//getContext basically allows us to draw on our canvas (in this case a 2 dimentional object)
const scoreEl = document.getElementById('scoreTxt');
const restartBtn = document.getElementById('restart');

const gridSize = 20;
const height = gameSection.height;
const width = gameSection.width;

let isGameRunning = false;
let score = 0;
let snake = [
    {x: gridSize * 3, y: 0},
    {x: gridSize * 2, y: 0},
    {x: gridSize, y: 0},
    {x: 0, y: 0},
];
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



startGame();

function startGame () {
    // random placement of food and render it 
    //current score 
    //the game conditional 
    isGameRunning = true;
    randomApple();
    displayApple();
    onTick();
}

//I want it to to randomly pick a number
//in the range of the canvas section (its width and height)
function randomApple () {
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
        randomApple();
        displayApple();
    }
    else {
        let endPiece = snake.pop();
        context.clearRect(endPiece.x, endPiece.y, gridSize, gridSize);
    }
}

function changeSnakeDirection (event) {
    const clickedArrows = event.keyCode;
    const leftArw = 37;
    const rightArw = 39;
    const upArw = 38;
    const downArw = 40;

    const isGoingUp = distanceY === -gridSize;
    const isGoingDown = distanceY === gridSize;
    const isGoingRight = distanceX === gridSize;
    const isGoingLeft = distanceX === -gridSize;

    if (clickedArrows === leftArw && !isGoingRight) {
        distanceX = -gridSize;
        distanceY = 0;
    }
    else if (clickedArrows === rightArw && !isGoingLeft) {
        distanceX = gridSize;
        distanceY = 0;
    }
    else if (clickedArrows === upArw && !isGoingDown) {
        distanceX = 0;
        distanceY = -gridSize;
    }
    else if (clickedArrows === downArw && !isGoingUp) {
        distanceX = 0;
        distanceY = gridSize;
    }
    
}

function onTick () {
    if (isGameRunning) {
        setTimeout(() => {
            clearGameSec();
            displayApple();
            canTheSnakeMove();
            drawSnake();
            // changeSnakeDirection();
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

function gameOver () {
    //game is over if
    //snake is out of the canvas boundry
    let isGameOver = false;
    if (snake[0].x < 0) {
        isGameOver = true;
        console.log('left wall');//test
    }
    else if (snake[0].x >= width) {
        isGameOver = true;
        console.log('left wall');//test
    }
    if (snake[0].y < 0) {
        isGameOver = true;
        console.log('top wall');//test
    }
    if (snake[0].x >= height) {
        isGameOver = true;
        console.log('bottom wall');//test
    }

    //collision with its units
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0]) {
            isGameOver = True;
            console.log('collided with itself');
        }
    }

}

// function renderGameOver () {
//     context.fillStyle = 'white';
//     context.font = '60px cursive';
//     context.fillText('Game Over ', width/6.5, height/2);
//     isGameRunning = false;
// }

document.addEventListener('keydown', changeSnakeDirection);
// restartBtn.addEventListener('click', resetGame);