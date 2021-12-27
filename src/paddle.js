export default class Paddle {
    constructor(game) {
        this.width = 150;
        this.height = 30;
        this.color = "#f00"

        this.maxSpeed = 7;
        this.speed = 0;

        this.gameWidth = game.gameWidth;

        this.pos = {
            x: game.gameWidth / 2 - this.width / 2,
            y: game.gameHeight - this.height - 10
        };
    }

// Paddle Movements
    moveLeft() {
        this.speed = -this.maxSpeed;
    }

    moveRight() {
        this.speed = this.maxSpeed;
    }

    stop() {
        this.speed = 0;
    }

// Paddle critical methods
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }

    update(deltaTime) {

        this.pos.x += this.speed;

        // Collision Detection
        // Left wall
        if (this.pos.x <= 0)                            
            this.pos.x = 0;

        // Right Wall
        if (this.pos.x + this.width >= this.gameWidth) 
            this.pos.x = this.gameWidth - this.width;

    }


}