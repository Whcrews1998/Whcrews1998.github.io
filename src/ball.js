import { detectCollision } from "/src/collisionDetection.js";

export default class Ball {
    constructor(game) {
        this.image = document.getElementById("img_ball");

        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.size = 16;
        this.pos = {
            x: 20,
            y: 150
        };
        this.speed = {
            x: 4,
            y: 4
        };
    }
    reset() {
        this.pos = {
            x: 20,
            y: 150
        };
        this.speed = {
            x: 4,
            y: 4
        };
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.pos.x, this.pos.y, this.size, this.size);
    }
    
    update(deltaTime) {
        this.pos.x += this.speed.x;
        this.pos.y += this.speed.y;

        // -- Collision Detection -- //
        if (this.pos.x <= 0 || this.pos.x + this.size > this.gameWidth ) {
            this.speed.x *= -1; // (Ball and Walls) Reverses Speed
        } 
        if (this.pos.y <= 0)
            this.speed.y *= -1; // (Ball and Walls) Reverses Speed
        
        // Collision with bottom wall
        if (this.pos.y + this.size >= this.gameHeight){
            this.game.lives--;
            this.reset();
        }

        
        // let bottomOfBall = this.pos.y + this.size;
        // let topOfPaddle = this.game.paddle.pos.y;
        // let leftSideOfPaddle = this.game.paddle.pos.x;
        // let rightSideOfPaddle = this.game.paddle.pos.x + this.game.paddle.width;

        // Collision with paddle
        if (detectCollision(this, this.game.paddle)){
            this.speed.y *= -1;
            this.pos.y = this.game.paddle.pos.y - this.size;
        }
            
            
    }
}