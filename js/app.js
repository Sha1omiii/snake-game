const gameSection = document.getElementById('gameSection');
const context = gameSection.getContext('2d');
//getContext basically allows us to draw on our canvas (in this case a 2 dimentional object)
const scoreEl = document.getElementById('scoreTxt');
const restartBtn = document.getElementById('restart');

const gridSize = 20;
const height = gameSection.height;
const width = gameSection.width;


let score = 0;
let snake = [
    {x: 0, y: 0}
];
let direction = {x: gridSize * 3, y: 0};
let snakeBorder = 'black';
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
drawApple();
displayApple();

function startGame () {
    // call on the place food function 
    // random placement of food and render it 
    // window.addEventListener("keydown", snakeDir);
    // the game 
}

//I want it to to randomly pick a number
//in the range of the canvas section (its width and height)
function drawApple () {
    
    appleX = Math.round(Math.random() * (width / gridSize)) * gridSize;
    appleY = Math.round(Math.random() * (height / gridSize)) * gridSize;
    console.log(appleX, appleY); // test puspose
}

function displayApple () {
    context.fillStyle = 'yellow';
    context.fillRect(appleX, appleY, gridSize, gridSize);
}
