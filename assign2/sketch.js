const flock = [];

function setup() {
    createCanvas(800, 600);
    flock.push(new Boid());
}

function draw() {
    background(41);

    for (let boid of flock) {
        boid.update();
        boid.show();
    }
}
