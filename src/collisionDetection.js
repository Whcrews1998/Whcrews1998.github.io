export function detectCollision(ball, gameObject) {
    let bottomOfBall = ball.pos.y + ball.size;
    let topOfBall = ball.pos.y;
    let leftSideOfBall = ball.pos.x;
    let rightSideOfBall = ball.pos.x + ball.size;
    
    let topOfObject = gameObject.pos.y;
    let bottomOfObject = gameObject.pos.y + gameObject.height;
    let leftSideOfObject = gameObject.pos.x;
    let rightSideOfObject = gameObject.pos.x + gameObject.width;


    // Detect Collision
    if ( topOfBall <= bottomOfObject && bottomOfBall >= topOfObject 
        && rightSideOfBall >= leftSideOfObject && 
        leftSideOfBall <= rightSideOfObject
    ) {
        return true;
    } else 
        return false;
    
    
}