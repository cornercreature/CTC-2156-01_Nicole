let videoElement;
let encoder;
let decoder;
let isWebCodecsReady = false;

let speed = 2;
let useKeyFrame = false;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    cam = createCapture(VIDEO);
    cam.size = (windowWidth, windowHeight);
    cam.hide();

    // each time mouse pressed is a key frame
    mousePressed(() => {
        useKeyFrame = true;
    });

    //sets up webcodecs api
    startWebcam().then(() => setupWebCodecs(ctx));
}

function draw() {

    if (isWebCodecsReady) {
    const frame = new VideoFrame(videoElement.elt);
    encoder.encode(frame, { keyFrame: useKeyFrame });
    useKeyFrame = false;
    frame.close();
  }

  async function startWebcam() {
  return new Promise((resolve) => {
    videoElement.elt.onloadeddata = () => {
      resolve();
    };
    });
    }

    function setupWebCodecs(ctx) {
        encoder = new VideoEncoder({
        output: handleEncodedChunk,
        error: (err) => console.error("Encoder error:", err),
    });

    encoder.configure({
    codec: "vp9",
    width: windowWidth,
    height: windowHeight,
    });

    decoder = new VideoDecoder({
    output: (frame) => handleDecodedFrame(frame, ctx),
    error: (err) => console.error("Decoder error:", err),
    });

    decoder.configure({
    codec: "vp9",
    });

    isWebCodecsReady = true;
    }

    // speed controls rate at which delta frame is being decoded for every keyframe (1-1 is no moshing, higher = more moshing)
    function handleEncodedChunk(chunk) {
    if (chunk.type === "key") {
    decoder.decode(chunk);
    } else {
    for (let i = 0; i < speed; i++) {
      decoder.decode(chunk);
    }
    }
    }

    function handleDecodedFrame(frame, ctx) {
    ctx.clearRect(0, 0, windowWidth, windowHeight);
    ctx.save();
    ctx.translate(windowWidth, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(frame, 0, 0, windowWidth, windowHeight);
    ctx.restore();
    frame.close();
    }

    image (cam,-windowWidth/2, -windowHeight/2, windowWidth, windowHeight);

    videoElement.size(windowWidth, windowHeight);

}
