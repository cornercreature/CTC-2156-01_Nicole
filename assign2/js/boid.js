class Boid {
    constructor() {
        // places position in middle of window
        this.position = createVector(random(width), random(height));
        // this.velocity = createVector();
        this.velocity = p5.Vector.random2D();
        //rndm by default increases by 1 increment, so we need to set mag limits in order to have a more natural movement
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxForce = 0.2;
        this.maxSpeed = 4;

    }

    edges() {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    align(boids) {
        let perceptionRadius = 40;
        //steering is desired is avg of vector velocities
        let steering = createVector();
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
                steering.setMag(this.maxSpeed);
                steering.sub(this.velocity);
                steering.limit(this.maxForce);
            }
        return steering;
    }

    cohesion(boids) {
        let perceptionRadius = 40;
        //steering is desired is avg of vector velocities
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(
                this.position.x, 
                this.position.y, 
                other.position.x, 
                other.position.y
            );

            if (other != this && d < perceptionRadius) {
                steering.add(other.position);
                total++;
            }
        }
        if (total > 0) {
                steering.div(total);
                steering.sub(this.position);
                steering.setMag(this.maxSpeed);
                steering.sub(this.velocity);
                steering.limit(this.maxForce);
            }
        return steering;
    }
    
    flock(boids) {
        this.acceleration.mult(0);
        let alignment = this.align (boids);
        let cohesion = this.cohesion(boids);
        this.acceleration.add(alignment);
        //force accumulation, add cohesion to acceleration for sum of movement
        this.acceleration.add(cohesion);
    }


    update() {
        //position is controlled by velocity, velocity via acceleration.
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
    }

    show() {
    strokeWeight(8);
    stroke(255);
    point(this.position.x, this.position.y);
    }

}