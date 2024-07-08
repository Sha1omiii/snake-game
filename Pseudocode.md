# Snake Game Planning
## User Stories

* As a user, I want to land on a snake game page, so I know I am playing the right game.
* As a user, I want to use my arrow keys, so I can move the snake and consume the eggs
* As a user, I want my snake to get longer after it eats the eggs, so the game is harder
* As a user, I want to see the game to end, when the snake collides with itself or the wall, so i can see how well i did in the game.
* As a user, I want to see my score, so that I know what my score is compared to my previous game
* As a user, I want the option to play again, so that I can play again and try to beat my score

## Pseudocode for the overall gameplay:
### HTML
> The main importan part of the html is going to be definig a canvas with a width and height.
### Javascript
Define cache reference variables
for game section, score, restart, and highscore elements
``` Js
const gameSection = document.getElementById('gameSection');
const context = gameSection.getContext('2d');
const scoreEl = document.getElementById('scoreTxt');
const highScoreEl = document.getElementById('highScore');
const restartBtn = document.getElementById('restart');
```

Also I need to store the `gamesection.width` and `gamesection.height` values in `width` and `height` variables.

Divide my canvas into grids and store the value of one grid into a variable called `gridSize`
> This way, it is easier for me to understand how to work with snake movement and food collisions

I also need to define the snake as an array of objects with x and y coordinates
>> it can be something like `wholeSnake = [{x, 0}]
with x and y coordinates so we can easily manipulate the snake's size
Define `eggX` and `eggY` for our egg to apear in our canvas. 
> I will write a function that will use `Math.random` to make the egg apear randomly in the range of our `width` and `height`

* Start function
   * Which will just call some functions that need to happen when the game is initiating
   ``` Js
    function startGame () {
        isGameRunning = true;
        generateEgg();
        displayEgg();
        tick();
    }
    ```

* GameOver function
    * this function would call the `bodyCollision` function and `wallCollision` function
    * bodyCollision function 
        * would run a loop to check if the location of the head of the `wholeSnake` which would be wholeSnake[0] at x and y coordinates is the same as any part of the `wholeSnake` at x and y coordinates.
* drawSnake function
    * will use `fill` and `stoke` to draw my snake
    * also will need to write a for loop to draw each part of the snake.
    ```Js
    for(let snakeUnit of wholeSnake) {
        context.beginPath();
        context.arc(snakeUnit.x + gridSize / 2, snakeUnit.y + gridSize / 2, gridSize / 2, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
    }
    ``` 
* snakeMovement function 
    * so, everytime I want to move the snake, I have to add a new head at `index[0]` and also remove the tail using `pop()` method.
    * I will also check if the head of the snake is colliding with the food:
        * if so, I want to add a new head without using `pop()` method, and increment my score my 1
            * call our food function to randomly generate an `eggX` and `eggY` coordinates and render the egg on the canvas 
        * otherwise, it should remove the last time using `pop()`
* changeSnakeDirection function
    * this will take the event parameter 
    * a variable to store the keys
    * going UP/Down/Left/Right variables 
    ```Js
    if (isChangingDir) return;
    isChangingDir = true;

    const key = event.keyCode;
    const isGoingUp = distanceY === -gridSize;
    const isGoingDown = distanceY === gridSize;
    const isGoingRight = distanceX === gridSize;
    const isGoingLeft = distanceX === -gridSize;
    ```
* food function
    * I have to render the egg at the random `eggX` and `eggY` coordinates I get after I ran generate them. (will use fill and stroke)
    * this will use that math.random method to randomly place food at random locations on our defined game section `width` and `height`:
    ```Js 
    function random (low, high) {
        let randEgg = Math.round(Math.random() * (((high - low) + low)) / gridSize) * gridSize; 
        return randEgg;
    }
    eggX = random(0, width - gridSize);
    eggY = random(0, height - gridSize);
```

* restart function
    * this function will call on the startGame function 
    * resets the score to 0 wholeSnake array resets to its original form 