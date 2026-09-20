class Boid {
    constructor() {
        // places position in middle of window
        this.position = createVector(width/2, height/2);
        // this.velocity = createVector();
        this.velocity = p5.Vector.random2D();
        //rndm by default increases by 1 increment, so we need to set mag limits in order to have a more natural movement
        this.velocity.setMag(random(0.5, 1.5));
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