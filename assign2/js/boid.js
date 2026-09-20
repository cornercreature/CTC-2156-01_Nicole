class Boid {
    constructor() {
        // places position in middle of window
        this.position = createVector(width/2, height/2);
        // this.velocity = createVector();
        this.velocity = p5.Vector.random2D();
        this.acceleration = createVector();

    }

    update() {
        //position is controlled by velocity, velocity via acceleration.
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
    }

show() {
    strokeWeight(16);
    stroke(255);
    point(this.position.x, this.position.y);
}

}