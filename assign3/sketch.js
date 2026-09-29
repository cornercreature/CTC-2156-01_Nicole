//camera originally coded on processing, 
let video;
let motion;
let previousPixels = null;

let threshold = 20;

function vidload (){
  video.loadPixels();
 // for if canvas size changes, weird differences and errors in video pixel data, if camera hasn't initialized yet
  if (
    motion === undefined ||
    motion.width !== video.width ||
    motion.height !== video.height ||
    previousPixels.length !== video.pixels.length
  ) {
    //redo img
    motion = createImage(video.width, video.height);
    //array clamped from 0 - 255 pixel to store prev pixel data in new location
    previousPixels = new Uint8ClampedArray(video.pixels);
    background(255);
    return;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  video = createCapture(VIDEO);
  video.size(640, 460);
  video.hide(); // Hide camera view

}

function draw() {
   vidload();

  motion.loadPixels();

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      const loc = 4 * (x + y * video.width);

      const r1 = video.pixels[loc];
      const g1 = video.pixels[loc + 1];
      const b1 = video.pixels[loc + 2];

      const r2 = previousPixels[loc];
      const g2 = previousPixels[loc + 1];
      const b2 = previousPixels[loc + 2];

      const d = distSq(r1, g1, b1, r2, g2, b2);

      //color change
      if (d < threshold * threshold){
       motion.pixels[loc] = r1;
       motion.pixels[loc + 1] = g1;
       motion.pixels[loc + 2] = b1;
      } else {
       const yflip = video.height - 1 - y;
       const flipLoc = 4 * ((-1 * x) + yflip * video.width);
       motion.pixels[loc] = video.pixels[flipLoc];
       motion.pixels[loc + 1] = video.pixels[flipLoc + 1];
       motion.pixels[loc + 2] = video.pixels[flipLoc + 2];
      }

      motion.pixels[loc + 3] = 255;
    }
    }

  motion.updatePixels();

  // Scale the effect to fill the canvas.
  image(motion, 0, 0, width, height);

  // Save the current pixels for the next comparison.
  previousPixels.set(video.pixels);
}

function distSq(r1, g1, b1, r2, g2, b2) {
  return (
    (r2 - r1) ** 2 +
    (g2 - g1) ** 2 +
    (b2 - b1) ** 2
  );
}