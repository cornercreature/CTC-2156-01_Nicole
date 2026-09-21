const flock = [];

let alignSlider, cohesionSlider, separationSlider;

// size of box boids live in (box is centered on the origin in WEBGL)
const BOX_W = 400;
const BOX_H = 300;
const BOX_D = 400;

function setup() {
    createCanvas(800, 600,WEBGL);
    alignSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1, 0.1);
    //number of boids
    for (let i = 0; i < 100; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    background(255,255,255);
    noFill();
    stroke(150);
    strokeWeight(1);
    orbitControl();
    box(BOX_W, BOX_H, BOX_D);

    for (let boid of flock) {
        boid.edges();
        boid.flock(flock);
        boid.update();
        boid.show();
    }
}
