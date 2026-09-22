class Boid {
    constructor() {

        // random spot inside the box (origin is the box's center)
        this.position = createVector(
            random(-BOX_W / 2, BOX_W / 2),
            random(-BOX_H / 2, BOX_H / 2),
            random(-BOX_D / 2, BOX_D / 2)
        );

        this.velocity = p5.Vector.random3D();
        //rndm by default increases by 1 increment, so we need to set mag limits in order to have a more natural movement
        this.velocity.setMag(random(2, 4, 0.1));
        this.acceleration = createVector();
        this.maxForce = 0.2;
        this.maxSpeed = 4;

    }

    edges() {
        // keep boids inside the box: clamp to the wall and bounce off it
        const halfW = BOX_W / 2;
        const halfH = BOX_H / 2;
        const halfD = BOX_D / 2;

        if (this.position.x > halfW || this.position.x < -halfW) {
            this.position.x = constrain(this.position.x, (-halfW + 10), (halfW - 10));
            this.velocity.x *= -1;
        }
        if (this.position.y > halfH || this.position.y < -halfH) {
            this.position.y = constrain(this.position.y, (-halfH + 10), (halfH - 10));
            this.velocity.y *= -1;
        }
        if (this.position.z > halfD || this.position.z < -halfD) {
            this.position.z = constrain(this.position.z, (-halfD + 10), (halfD - 10));
            this.velocity.z *= -1;
        }
    }


    followMouse(){
        //use mouse to create target, leave position z as this position since no mouse z
        const target = createVector(
            mouseX - width / 2,
            mouseY - height / 2,
            this.position.z
        );

        const steering = p5.Vector.sub(target, this.position);

        //calcs length of vector, mag is max velocity - current velocity, going at max force
        if(steering.mag() > 0) {
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }

        return steering;
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
                this.position.z,
                other.position.x, 
                other.position.y, 
                other.position.z
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
                this.position.z,
                other.position.x, 
                other.position.y, 
                other.position.z
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
    
    separation(boids) {
        let perceptionRadius = 60;
        //steering is desired is avg of vector velocities
        let steering = createVector();
        // let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(
                this.position.x, 
                this.position.y, 
                this.position.z,
                other.position.x, 
                other.position.y, 
                other.position.z
            );

            if (other != this && d < perceptionRadius) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d); //normalize distance so that closer boids have a stronger effect
                steering.add(diff);
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

    flock(boids) {
        this.acceleration.mult(0);

        let alignment = this.align (boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);
        let mouseForce = this.followMouse();

        // //feeds slider values into flocking weights for testing
        // separation.mult(separationSlider.value());
        // alignment.mult(alignSlider.value());
        // cohesion.mult(cohesionSlider.value());

        //adjust flocking weights manually here
        separation.mult(1.8);
        alignment.mult(2);
        cohesion.mult(1.2);
        mouseForce.mult(0.8);

        this.acceleration.add(alignment);
        //force accumulation, add cohesion to acceleration for sum of movement
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
        this.acceleration.add(mouseForce);
    }


    update() {
        //position is controlled by velocity, velocity via acceleration.
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
    }

    show() {
    
    strokeWeight(2);
    stroke(255);
    rect(this.position.x, this.position.y, 2, 2);
        }

}