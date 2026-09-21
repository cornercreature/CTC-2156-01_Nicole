const flock = [];

let alignSlider, cohesionSlider, separationSlider;

let graphics;

// size of box boids live in (box is centered on the origin in WEBGL)
const BOX_W = 400;
const BOX_H = 300;
const BOX_D = 400;

const BOX_W_HALF = BOX_W / 2;
const BOX_H_HALF = BOX_H / 2;
const BOX_D_HALF = BOX_D / 2;

function setup() {
    createCanvas(800, 600,WEBGL);
    graphics = createGraphics(800, 600);
    alignSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1, 0.1);
    //number of boids
    for (let i = 0; i < 200; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    background(255,255,255);
    noFill();
    stroke(150);
    strokeWeight(1);
    orbitControl();
    // box(BOX_W, BOX_H, BOX_D);

    normalMaterial();

    beginShape();
    vertex(-BOX_W_HALF, -BOX_H_HALF, -BOX_D_HALF);
    vertex(BOX_W_HALF, -BOX_H_HALF, -BOX_D_HALF);
    vertex(BOX_W_HALF, BOX_H_HALF, -BOX_D_HALF);
    vertex(-BOX_W_HALF, BOX_H_HALF, -BOX_D_HALF);
    endShape();
    beginShape();
    vertex(-BOX_W_HALF, -BOX_H_HALF, BOX_D_HALF);
    vertex(BOX_W_HALF, -BOX_H_HALF, BOX_D_HALF);
    vertex(BOX_W_HALF, BOX_H_HALF, BOX_D_HALF);
    vertex(-BOX_W_HALF, BOX_H_HALF, BOX_D_HALF);
    endShape();

    for (let boid of flock) {
        boid.edges();
        boid.flock(flock);
        boid.update();
        boid.show();
    }
}
