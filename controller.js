// @ts-check


// This file is essintially a controller that ties everything together.
// The main loop is also set up here.


// Input handling: ---------------------------------------------------

// BOM codes of all keys used in the game
const KEY = {
    MOVE: {
        UP: "KeyW",
        DOWN: "KeyS",
        LEFT: "KeyA",
        RIGHT: "KeyD",
    },
    PAUSE: "Space",
}

// Get meaningful direction from WASD keys
function keyToDirection(keyCode) {
    switch (keyCode) {
        case KEY.MOVE.UP:    return new Point (0, -1);
        case KEY.MOVE.DOWN:  return new Point  (0, 1);
        case KEY.MOVE.LEFT:  return new Point (-1, 0);
        case KEY.MOVE.RIGHT: return new Point  (1, 0);
    }
}

// Stores the last selected WASD direction, or (0, 0) before the game start
var enteredDirection = new Point(0, 0);

function onAnyKeyPressed(event) {
    var pressedKey = event.code;
    // If need to restart finished game
    if (!game.snake.isAlive) {
        game.setToStartState();
        enteredDirection = new Point (0, 0);
        return;
    }
    // If need to pause/unpause
    else if (pressedKey === KEY.PAUSE && game.started) {
        game.isPaused = !game.isPaused;
    }
    // If starting new game or just moving with WASD
    else if (Object.values(KEY.MOVE).includes(pressedKey) && !game.isPaused) {
        game.started = true;
        enteredDirection = keyToDirection(pressedKey);
    }
}

window.addEventListener("keydown", onAnyKeyPressed);
window.addEventListener("visibilitychange", () => { game.isPaused = true; });

// End of input handling ----------------------------------------------------


// Objects setup:

const drawing = new Drawing();
var game = new Game(24, 18);
game.setToStartState();


// Main game loop:

function updateFrame() {
    // Change snake direction if needed
    if (!enteredDirection.equals(new Point(0, 0)) &&
        !enteredDirection.isOpposite(game.snake.direction))
    {
        game.snake.direction = enteredDirection;
    }

    game.moveSnake();
    drawing.updateView(game);
}


// Start the loop and here we go:

var frameRate = 200; // in milliseconds
setInterval(updateFrame, frameRate);
