class Boid {
    constructor() {
        // places position in middle of window
        this.position = createVector(random(width), random(height));
        // this.velocity = createVector();
        this.velocity = p5.Vector.random2D();
        //rndm by default increases by 1 increment, so we need to set mag limits in order to have a more natural movement
        this.velocity.setMag(random(0.5, 1.5));
        this.acceleration = createVector();

    }

    align(boids) {
        let perceptionRadius = 100;
        //steering is desired is avg of vector velocities
        let desired = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(
                this.position.x, 
                this.position.y, 
                other.position.x, 
                other.position.y
            );

            if (other != this && d < perceptionRadius) {
                steering.add(other.velocity);
                total++;
            }
        }
        if (total > 0) {
                steering.div(total);
                steering.sub(this.velocity);
                return steering;
            }
        return steering;
    }

    flock(boids) {
        let alignment = this.align (boids);
        this.acceleration = alignment;
    }


    update() {
        //position is controlled by velocity, velocity via acceleration.
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
    }

    show() {
    strokeWeight(8);
    stroke(255);
    point(this.position.x, this.position.y);
    }

}