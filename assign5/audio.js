const honkshoe = document.getElementById("honkshoe");
const lelele = document.getElementById("lelele");
const playButton = document.getElementById("play");
const progBar = document.getElementById("progbar");

var volume = 0;

let isPlaying = false;

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

document.getElementById("asleep").addEventListener("click", () => {
        honkshoe.volume = 0.1;
        lelele.volume = 0.1;

        lelele.play();  
});

document.getElementById("awake").addEventListener("click", () => {
        honkshoe.volume += 0.05;
        lelele.volume += 0.2;

        lelele.play();  
});