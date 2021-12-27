import Paddle from "/src/paddle.js";
import InputHandler from "/src/input.js";
import Ball from "/src/ball.js";
import { buildLevel, level1, level2 } from "/src/level.js";

const GAME_STATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAME_OVER: 3,
    NEW_LEVEL: 4
};

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameState = GAME_STATE.MENU;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.paddle = new Paddle(this);
        this.ball = new Ball(this);

        this.gameObjects = [];
        this.bricks = [];

        this.lives = 3;
        this.levels = [level1, level2];
        this.currentLevel = 0;

        new InputHandler(this.paddle, this);
    }

    start() {
        // Only the Menu state can start game.
        if (
            this.gameState !== GAME_STATE.MENU &&
            this.gameState !== GAME_STATE.NEW_LEVEL
        ) return;

        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();
        this.gameObjects = [this.paddle, this.ball];
        this.gameState = GAME_STATE.RUNNING;
    }

    update(deltaTime) {
        if (this.lives == 0) 
            this.gameState = GAME_STATE.GAME_OVER;

        if (
            this.gameState === GAME_STATE.PAUSED || 
            this.gameState === GAME_STATE.MENU ||
            this.gameState === GAME_STATE.GAME_OVER
        ) 
            return;

        if (this.bricks.length === 0) {
            this.currentLevel++;
            this.gameState = GAME_STATE.NEW_LEVEL;
            this.start();
        }
        
        // Update position of paddle/ball and mark necessary bricks for deletion
        [...this.gameObjects, ...this.bricks].forEach((object) => object.update(deltaTime));
        
        // Update to only draw bricks that have not been hit
        this.bricks = this.bricks.filter(brick => !brick.setForDeletion);
    }

    draw(ctx) {
        [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));

        // If Game is in Paused State
        if (this.gameState == GAME_STATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        }

        // If Game is in Menu State
        if (this.gameState == GAME_STATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACEBAR To Start", this.gameWidth / 2, this.gameHeight / 2);
        }

        // If GAME_OVER
        if (this.gameState == GAME_STATE.GAME_OVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
        }
    }

    togglePause() {
        if (this.gameState == GAME_STATE.PAUSED){
            this.gameState = GAME_STATE.RUNNING;
        } else {
            this.gameState = GAME_STATE.PAUSED;
        }
    }
}