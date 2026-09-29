let video;
let motion;
let previousPixels = null;

let threshold = 40;

function setup() {
  createCanvas(640, 460);
  pixelDensity(1);

  video = createCapture(VIDEO);
  video.size(640, 460);
  video.hide(); // Hide the separate HTML camera preview.
}

function draw() {
  video.loadPixels();

  // Wait until camera pixels are available.
  if (video.pixels.length === 0) return;

  // Initialize images when the camera is ready,
  // or reset them if its dimensions change.
  if (
    motion === undefined ||
    motion.width !== video.width ||
    motion.height !== video.height ||
    previousPixels.length !== video.pixels.length
  ) {
    motion = createImage(video.width, video.height);
    previousPixels = new Uint8ClampedArray(video.pixels);
    background(255);
    return;
  }

  motion.loadPixels();

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      // Each pixel occupies four entries: red, green, blue, alpha.
      const loc = 4 * (x + y * video.width);

      const r1 = video.pixels[loc];
      const g1 = video.pixels[loc + 1];
      const b1 = video.pixels[loc + 2];

      const r2 = previousPixels[loc];
      const g2 = previousPixels[loc + 1];
      const b2 = previousPixels[loc + 2];

      const d = distSq(r1, g1, b1, r2, g2, b2);

      // Small change = white; large change = black.
      const shade = d < threshold * threshold ? 255 : 0;

      motion.pixels[loc] = shade;
      motion.pixels[loc + 1] = shade;
      motion.pixels[loc + 2] = shade;
      motion.pixels[loc + 3] = 255; // Fully opaque.
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