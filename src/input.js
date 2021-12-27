export default class InputHandler {
    constructor(paddle, game) {
        document.addEventListener("keydown", event => {
            switch(event.keyCode) {
                case 37: // LEFT Arrow
                    paddle.moveLeft();
                    break;
                case 39: // RIGHT Arrow
                    paddle.moveRight();
                    break;

                case 27: // ESCAPE Key
                    game.togglePause();
                    break;

                case 32: // SPACEBAR
                    game.start();
            }
        });

        document.addEventListener("keyup", event => {
            switch(event.keyCode) {
                case 37:
                    if (paddle.speed < 0)
                        paddle.stop();
                    break;
                case 39:
                    if (paddle.speed > 0)
                        paddle.stop();
                    break;
            }
        });
    }
}