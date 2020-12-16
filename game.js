// @ts-check

/** A high level class for handling game objects (snake, food) and game logic (moving, eating, dying) */
class Game {

    // "public":

    constructor(fieldWidth, fieldHeight) {
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;

        this.setToStartState();
    }

    setToStartState() {
        this.snake = {
            cells: [],
            direction: new Point(0, 0),
            isAlive: true,
            head: function () { return this.cells[0]; },
        };
        this.snake.cells.push(this.getRandomFreePoint());

        this.foodPosition = this.getRandomFreePoint();

        this.started = false;
        this.isPaused = false;
    }

    moveSnake() {
        // First condition is needed, otherwise snake dies while it stands still before game start.
        // Pause case is just pause, it's obvious.
        if (this.snake.direction.equals(new Point(0, 0)) || this.isPaused)
            return;

        var newHead = this.calculateNewHeadPos();

        if (this.snake.cells.some(cell => cell.equals(newHead))) {
            this.snake.isAlive = false;
            return;
        }
        
        this.snake.cells.unshift(newHead); // insert to the beginning

        if (this.snake.head().equals(this.foodPosition)) {
            this.foodPosition = this.getRandomFreePoint();
        }
        else {
            this.snake.cells.pop(); // pop the tail end
        }
    }

    // "private":

    getRandomFreePoint() {
        var point = new Point();
        do {
            point.x = Math.round (Math.random() * (this.fieldWidth - 1));
            point.y = Math.round (Math.random() * (this.fieldHeight - 1));
        }
        while (this.snake.cells.some(cell => cell.equals(point)));
        return point;
    }

    calculateNewHeadPos() {
        var newPos = this.snake.head().copyWithOffset(this.snake.direction);

        // Moving around the map:
        if (newPos.x >= this.fieldWidth) {
            newPos.x -= this.fieldWidth;
        }
        else if (newPos.x < 0) {
            newPos.x += this.fieldWidth;
        }
        if (newPos.y >= this.fieldHeight) {
            newPos.y -= this.fieldHeight;
        }
        else if (newPos.y < 0) {
            newPos.y += this.fieldHeight;
        }

        return newPos;
    }
}
