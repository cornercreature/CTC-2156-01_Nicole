const flock = [];

function setup() {
    createCanvas(800, 600);
    //number of boids
    for (let i = 0; i < 100; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    background(41);

    for (let boid of flock) {
        boid.flock(flock);
        boid.update();
        boid.show();
    }
}
