// @ts-check

/** A high level class for drawing squares and text on a Canvas */
class Drawing {

    // "public":

    constructor() {
        let canvas = document.getElementById('game');
        this.canvasContext = canvas.getContext('2d');
        let canvasStyle = window.getComputedStyle(canvas);

        // Indirectly imported from css
        this.color = {
            background: canvasStyle.getPropertyValue("background-color"),
            snake: canvasStyle.getPropertyValue("--snake-color"),
            food: canvasStyle.getPropertyValue("--food-color"),
            text: canvasStyle.getPropertyValue("--text-color"),
        };
        this.font = {
            centerMessage: canvasStyle.getPropertyValue("--center-message-font"),
            controls: canvasStyle.getPropertyValue("--controls-font"),
        };
        
        // Õ¿…“» —œŒ—Œ¡ —Œ√À¿—Œ¬¿“‹ –¿«Ã≈–€ — —¿ÃŒ… »√–Œ… !!!!
        this.sizes = {
            square: 20,
            canvasWidthPx: 480,
            canvasHeightPx: 360,
            canvasWidthSquares: 24,
            canvasHeightSquares: 18,
        }
    }

    updateView(game) {
        this.clearAll();

        this.fillSquare(game.foodPosition, this.color.food);
        for (let snakeCell of game.snake.cells) {
            this.fillSquare(snakeCell, this.color.snake);
        }

        this.writeControls();
        this.writeScore(game.snake.cells.length - 1);

        if (!game.snake.isAlive) {
            this.writeCenterMessage("Your snake died. Press any key to restart");
        }
        else if (!game.started) {
            this.writeCenterMessage("Press WASD to start");
        }
        else if (game.isPaused) {
            this.writeCenterMessage("Press space to unpause game")
        }
    }

    // "private":

    fillSquare(coord, color) {
        this.canvasContext.fillStyle = color;
        this.canvasContext.fillRect(coord.x * this.sizes.square,
                                    coord.y * this.sizes.square,
                                    this.sizes.square, this.sizes.square);
    }

    clearAll() {
        this.canvasContext.clearRect(0, 0, this.sizes.canvasWidthPx,
                                        this.sizes.canvasHeightPx);
    }

    writeCenterMessage(text) {
        this.canvasContext.fillStyle = this.color.text;
        this.canvasContext.font = this.font.centerMessage;
        this.canvasContext.textAlign = "center";
        this.canvasContext.fillText(text, this.sizes.canvasWidthPx / 2,
                                          this.sizes.canvasHeightPx / 2);
    }

    writeControls() {
        this.canvasContext.fillStyle = this.color.text;
        this.canvasContext.font = "12px Verdana";
        this.canvasContext.textAlign = "left";
        this.canvasContext.fillText("WASD - move", 2, 12);
        this.canvasContext.fillText("Space - pause", 2, 27);
    }

    writeScore(score) {
        this.canvasContext.fillStyle = this.color.text;
        this.canvasContext.font = "20px Verdana";
        this.canvasContext.textAlign = "right";
        this.canvasContext.fillText("Score: " + score, this.sizes.canvasWidthPx - 26, 22);
    }
}
