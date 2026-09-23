// made with reference to Daniel Shiffman's coding challeng 124, Flocking Simulation,
// as well as his youtube series 18 about Web GL
// and this sketch about mouse tracking boids: https://editor.p5js.org/mtoutside/sketches/mW72X1UZV
//video footage taken from this free stock video on youtube: https://www.youtube.com/watch?v=KLezgwLA_94
//AI was used to do some debugging cases for tasks such as setting up p5.js environment, setting textures and vector calculations.

const flock = [];

let alignSlider, cohesionSlider, separationSlider;

let graphics;
let birdvid;

// size of box boids live in (box is centered on the origin in WEBGL)
const BOX_W = 1240;
const BOX_H = 800;
const BOX_D = 300;

const BOX_W_HALF = BOX_W / 2;
const BOX_H_HALF = BOX_H / 2;
const BOX_D_HALF = BOX_D / 2;

function setup() {
    createCanvas(windowWidth, windowHeight,WEBGL);

    // texture coords go 0..1 across each face instead of in pixels
    textureMode(NORMAL);

    // birdvid = createVideo(['assets/birds.mp4']);
    // browsers only autoplay muted video
    // birdvid.elt.muted = true;
    // birdvid.loop();
    // birdvid.hide();

    cam = createCapture(VIDEO);
    cam.hide();

    graphics = createGraphics(800, 600);

    //sliders for testing behavior weights
    // alignSlider = createSlider(0, 5, 1, 0.1);
    // cohesionSlider = createSlider(0, 5, 1, 0.1);
    // separationSlider = createSlider(0, 5, 1, 0.1);

    //number of boids
    for (let i = 0; i < 50; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    ambientLight(255);
    background(255);
    // Fill();
    stroke(150);
    noStroke();

    orbitControl();
    // box(BOX_W, BOX_H, BOX_D);

  

    //front face
    push();
    noFill();
    beginShape();
    vertex(-BOX_W_HALF, -BOX_H_HALF, -BOX_D_HALF, 0, 0);
    vertex(BOX_W_HALF, -BOX_H_HALF, -BOX_D_HALF, 1, 0);
    vertex(BOX_W_HALF, BOX_H_HALF, -BOX_D_HALF, 1, 1);
    vertex(-BOX_W_HALF, BOX_H_HALF, -BOX_D_HALF, 0, 1);
    endShape();
    pop();

    //back face (no fill = transparent, outline only)
    // push/pop so noFill() is undone afterwards and the next texture() call works
    push();
    noFill();
    beginShape();
    vertex(-BOX_W_HALF, -BOX_H_HALF, BOX_D_HALF, 0, 0);
    vertex(BOX_W_HALF, -BOX_H_HALF, BOX_D_HALF, 1, 0);
    vertex(BOX_W_HALF, BOX_H_HALF, BOX_D_HALF, 1, 1);
    vertex(-BOX_W_HALF, BOX_H_HALF, BOX_D_HALF, 0, 1);
    endShape();
    pop();

    //right face
    beginShape();
    texture(cam);
    vertex(-BOX_W_HALF, -BOX_H_HALF, -BOX_D_HALF, 0, 0);
    vertex(-BOX_W_HALF, BOX_H_HALF, -BOX_D_HALF, 0, 1);
    vertex(-BOX_W_HALF, BOX_H_HALF, BOX_D_HALF, 1, 1);
    vertex(-BOX_W_HALF, -BOX_H_HALF, BOX_D_HALF, 1, 0);
    endShape();

    //left face
    beginShape();
    texture(cam);
    vertex(BOX_W_HALF, -BOX_H_HALF, -BOX_D_HALF, 0, 0);
    vertex(BOX_W_HALF, BOX_H_HALF, -BOX_D_HALF, 0, 1);
    vertex(BOX_W_HALF, BOX_H_HALF, BOX_D_HALF, 1, 1);
    vertex(BOX_W_HALF, -BOX_H_HALF, BOX_D_HALF, 1, 0);
    endShape();

    //top face
    beginShape();
    texture(cam);
    vertex(-BOX_W_HALF, -BOX_H_HALF, -BOX_D_HALF, 0, 0);
    vertex(BOX_W_HALF, -BOX_H_HALF, -BOX_D_HALF, 1, 0);
    vertex(BOX_W_HALF, -BOX_H_HALF, BOX_D_HALF, 1, 1);
    vertex(-BOX_W_HALF, -BOX_H_HALF, BOX_D_HALF, 0, 1);
    endShape();

    //bottom face
    beginShape();
    texture(cam);
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
