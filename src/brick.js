import { detectCollision } from "/src/collisionDetection.js";

export default class Brick {
    constructor(game, pos) {
        this.game = game;

        this.image = document.getElementById("img_brick");
        this.pos = pos;
        this.width = 80;
        this.height = 24;

        this.setForDeletion = false;

    }

    update(deltaTime) {
        if (detectCollision(this.game.ball, this)) {
            this.game.ball.speed.y *= -1;
            this.setForDeletion = true;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height);
    }
}