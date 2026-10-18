const honkshoe = document.getElementById("honkshoe");
const lelele = document.getElementById("lelele");
const playButton = document.getElementById("play");
const progBar = document.getElementById("progbar");
const voltxtdisp = document.getElementById("voltxtdisp");

var volume = 0;

let isPlaying = false;
let volnum = 0.01;
let voltxt = "Vol: " + volnum;

honkshoe.volume = 0.01;
lelele.volume = 0.01;

playButton.addEventListener("click", () => {
    if (isPlaying) {
        honkshoe.pause();
        playButton.textContent = "hear sound";
    } else {
        honkshoe.play();
        playButton.textContent = "stop hearing";
    }
    isPlaying = !isPlaying;

});

document.querySelectorAll(".asleep").forEach((button) => {
    button.addEventListener("click", () => {
        honkshoe.volume = 0.01;
        lelele.volume = 0.01;

        lelele.play();
        
        voltxtdisp.textContent = "Vol: 0.01";
    });
});

document.querySelectorAll(".awake").forEach((button) => {
    button.addEventListener("click", () => {
        honkshoe.volume += 0.01;
        lelele.volume += 0.01;

        lelele.play(); 
        
        volnum += 0.01;
        voltxt = "Vol: " + volnum;

        voltxtdisp.textContent = voltxt;
    });
});