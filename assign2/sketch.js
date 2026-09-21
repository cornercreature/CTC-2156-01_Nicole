const flock = [];

let alignSlider, cohesionSlider, separationSlider;

let graphics;
let cam;

// size of box boids live in (box is centered on the origin in WEBGL)
const BOX_W = 400;
const BOX_H = 300;
const BOX_D = 400;

const BOX_W_HALF = BOX_W / 2;
const BOX_H_HALF = BOX_H / 2;
const BOX_D_HALF = BOX_D / 2;

function setup() {
    createCanvas(800, 600,WEBGL);

    // texture coords go 0..1 across each face instead of in pixels
    textureMode(NORMAL);
    birdvid = createVideo(['assets/birds.mp4']);

    graphics = createGraphics(800, 600);

    cam = createCapture(VIDEO);
    cam.size(800, 600);
    // hide the extra <video> element p5 adds under the canvas
    cam.hide();

    alignSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1, 0.1);
    //number of boids
    for (let i = 0; i < 200; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    ambientLight(255);
    background(0,0,0);
    // Fill();
    stroke(150);
    strokeWeight(1);
    orbitControl();
    // box(BOX_W, BOX_H, BOX_D);

    //front face
    beginShape();
    vertex(-BOX_W_HALF, -BOX_H_HALF, -BOX_D_HALF, 0, 0);
    vertex(BOX_W_HALF, -BOX_H_HALF, -BOX_D_HALF, 1, 0);
    vertex(BOX_W_HALF, BOX_H_HALF, -BOX_D_HALF, 1, 1);
    vertex(-BOX_W_HALF, BOX_H_HALF, -BOX_D_HALF, 0, 1);
    endShape();

    //back face 
    beginShape();
    noFill();
    vertex(-BOX_W_HALF, -BOX_H_HALF, BOX_D_HALF, 0, 0);
    vertex(BOX_W_HALF, -BOX_H_HALF, BOX_D_HALF, 1, 0);
    vertex(BOX_W_HALF, BOX_H_HALF, BOX_D_HALF, 1, 1);
    vertex(-BOX_W_HALF, BOX_H_HALF, BOX_D_HALF, 0, 1);
    endShape();

    //right face
    beginShape();
    vertex(-BOX_W_HALF, -BOX_H_HALF, -BOX_D_HALF, 0, 0);
    vertex(-BOX_W_HALF, BOX_H_HALF, -BOX_D_HALF, 0, 1);
    vertex(-BOX_W_HALF, BOX_H_HALF, BOX_D_HALF, 1, 1);
    vertex(-BOX_W_HALF, -BOX_H_HALF, BOX_D_HALF, 1, 0);
    endShape();

    //left face
    beginShape();

    vertex(BOX_W_HALF, -BOX_H_HALF, -BOX_D_HALF, 0, 0);
    vertex(BOX_W_HALF, BOX_H_HALF, -BOX_D_HALF, 0, 1);
    vertex(BOX_W_HALF, BOX_H_HALF, BOX_D_HALF, 1, 1);
    vertex(BOX_W_HALF, -BOX_H_HALF, BOX_D_HALF, 1, 0);
    endShape();

    //top face
    beginShape();
    vertex(-BOX_W_HALF, -BOX_H_HALF, -BOX_D_HALF, 0, 0);
    vertex(BOX_W_HALF, -BOX_H_HALF, -BOX_D_HALF, 1, 0);
    vertex(BOX_W_HALF, -BOX_H_HALF, BOX_D_HALF, 1, 1);
    vertex(-BOX_W_HALF, -BOX_H_HALF, BOX_D_HALF, 0, 1);
    endShape();

    //bottom face
    beginShape();
    vertex(-BOX_W_HALF, BOX_H_HALF, -BOX_D_HALF, 0, 0);
    vertex(BOX_W_HALF, BOX_H_HALF, -BOX_D_HALF, 1, 0);
    vertex(BOX_W_HALF, BOX_H_HALF, BOX_D_HALF, 1, 1);
    vertex(-BOX_W_HALF, BOX_H_HALF, BOX_D_HALF, 0, 1);
    endShape();

    for (let boid of flock) {
        boid.edges();
        boid.flock(flock);
        boid.update();
        boid.show();
    }
}
