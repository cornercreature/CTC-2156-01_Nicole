const honkshoe = document.getElementById("honkshoe");
const lelele = document.getElementById("lelele");
const playButton = document.getElementById("play");
const voltxtdisp = document.getElementById("voltxtdisp");
const grid = document.querySelector('.parent');
const items = document.querySelectorAll('.parent > div');
const blblbl = document.getElementById("blblbl");

var volume = 0;

let isPlaying = false;
let volnum = 0.01;
let voltxt = "Vol: " + volnum;

let lastclick = null;

honkshoe.volume = 0.01;
lelele.volume = 0.01;

//play button functionality
playButton.addEventListener("click", () => {
    if (isPlaying) {
        honkshoe.pause();
        playButton.textContent = "hear sound";
        playButton.style.backgroundColor = "aqua";
    } else {
        honkshoe.play();
        playButton.textContent = "stop hearing";
        playButton.style.backgroundColor = "red";

        window.addEventListener('mousemove', (event) => {
  
    });
    }
    isPlaying = !isPlaying;

});

//asleep buttons functionality
document.querySelectorAll(".asleep").forEach((button) => {
    button.addEventListener("click", () => {
        honkshoe.volume = 0.01;
        lelele.volume = 0.01;

        lelele.play();
        
        voltxtdisp.textContent = "Vol: 0.01";

        //ramdomize the order of the child divs in the grid
        items.forEach(item => {
        const randomOrder = Math.floor(Math.random() * items.length);
        item.style.order = randomOrder;
        });

        
        volnum = 0.01;
        voltxt = "Vol: " + volnum;
        
        lastclick = "asleep";

    });
});

//awake buttons functionality
document.querySelectorAll(".awake").forEach((button) => {

    honkshoe.addEventListener("volumechange", () => {
            if(honkshoe.volume === 1){
                    voltxt = "Vol: Max";
                    voltxtdisp.textContent = voltxt;
                };
            });

    button.addEventListener("click", () => {
        //increase volume
        honkshoe.volume = Math.min(honkshoe.volume + 0.05,1);
        lelele.volume = Math.min(lelele.volume + 0.01,1);
        //scramble sound effect
        lelele.play(); 
    
        //ramdomize the order of the child divs in the grid
        items.forEach(item => {
        const randomOrder = Math.floor(Math.random() * items.length);
        item.style.order = randomOrder;
        });
        
        blblbl.style.display = "block";
        setTimeout(() => {
            blblbl.style.display = "none";
        }, 1000);

        voltxtdisp.textContent = voltxt;

        lastclick = "awake";

        if (lastclick === "asleep") {
            volnum = 0.01;
            volnum = Math.min(volnum + 0.05,1);
            voltxt = "Vol: " + volnum;
        } else if (lastclick === "awake") {
            volnum = Math.min(volnum + 0.05,1);
            voltxt = "Vol: " + volnum;
        };
    });
});