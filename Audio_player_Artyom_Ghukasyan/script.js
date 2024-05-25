let data = {
    title: [
        "MTG OTIMOS VIDEOGAMES",
        "Denzel Curry Ultimate",
        "Minecraft-Theme",
        "Baile do Coqueiro 5",
        "THE AUTOTREM",

    ],
    song: [
        "music/mtg - otimos videogames - laq1zen (sped up + reverb).mp3",
        "music/Denzel Curry Ultimate.mp3",
        "music/Minecraft-Theme.mp3",
        "music/DJ Vilão DS - Baile do Coqueiro 5.mp3",
        "music/DJ RICK 013, MC GW - THE AUTOTREM 1.0 (Slowed + Reverb).mp3"
    ],
    poster: [
        "https://source.boomplaymusic.com/group10/M00/10/13/e8300dac9fc84ba6a98e7a51c09e1ca4_320_320.jpg",
        "https://d-hn-ca-231.dideo.ir/image/a2NjY2JjTFBBSk5rZnYyT1dMWURJZjNocU5EU2xva3paOC9rL2hVd2hoVVJjUTBxRzErUzNJdFB1RTA2TS8wT3k1TmtWMHFEWXVMR08rM25Za0YvVDRiL1BBRVBzd1d1aXFvN3ZxVmtjZGxIUmZqQkd4ZnQ4b05rVjh4UGllcTNTMGgzQmtDWVdpbjNWV29INGxrYWs0OThRWHJWM2RPUmt2RjFnOEd0MHdIRGxTMThNUGw4VmlFUkhDMmxFaFNISGRMYmhJRFYwNTI3R2JlcHFpR21rSENCcFhVeHdweTl2djQyT2hUNnczdE1WN3NIWEJMQTVyVSsyWTN3RE82MjJiSUwwSDlqTXNXWkI2MXhrdVRYak5nK2hUWDZjenViYnM4dEF4TEdyeDhMWTdnZjdid01qcWNVcWpMRXZzZGhKVTZwZW04elVUVVlWNzNnTDJDcEVybFIwYmpGc3k5dEhEYUM0R3BXMXYwPQ==",
        "https://i.ytimg.com/vi/cjQQ9JYGgTM/maxresdefault.jpg",
        "https://m.media-amazon.com/images/I/51ALSRurLSL._UXNaN_FMjpg_QL85_.jpg",
        "https://m.media-amazon.com/images/I/41eJKUJ9uGL._UXNaN_FMjpg_QL85_.jpg"
    ],
}

let song = new Audio

window.onload = function () {
    playSong()
}

let currentsong = 0
function playSong() {
    song.src = data.song[currentsong]
    let songTitle = document.getElementById("songTitle")
    songTitle.textContent = data.title[currentsong]
    let img = document.getElementsByClassName("row1")
    img[0].style.backgroundImage = "url(" + data.poster[currentsong] + ")"
    let main = document.getElementsByClassName("main")
    main[0].style.backgroundImage = "url(" + data.poster[currentsong] + ")"
    song.play()

   

}

function playOrPauseSong() {
    let play = document.getElementById("play")

    if (song.paused) {
        song.play()
        play.src = "images/pause.png"
    } else {
        song.pause()
        play.src = "images/play-button-arrowhead.png"
    }
}

song.addEventListener("timeupdate", function () {
    let fill = document.getElementsByClassName("fill")
    let position = song.currentTime / song.duration

    fill[0].style.marginLeft = position * 99 + "%"

    convertTime(song.currentTime) // cur. time

    if (song.ended) {
        if(repeatMode!=0) {
            song.currentTime = 0;
            song.play();
        } else  {
        next()
        }
    }

})



// Function to repeat the song
function repeatSong() {
    // Restart the song
    song.currentTime = 0;
    song.play();
}


let currentTime = document.getElementsByClassName("currentTime")
function convertTime(seconds) {
    let min = Math.floor(seconds / 60)
    let sec = Math.floor(seconds % 60)
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    currentTime[0].textContent = min + ":" + sec

    totalTime(Math.round(song.duration))

    console.log(seconds);
    console.log(min);
};

function totalTime(seconds) {
    var min = Math.floor(seconds / 60)
    var sec = Math.floor(seconds % 60)
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    currentTime[0].textContent += " / " + min + ":" + sec


};


function prev() {
    if (currentsong <= 0) {
        currentsong = data.song.length - 1;
    } 
    if(repeatMode!=0) {
        song.currentTime = 0;
            song.play();
    } else if (shuffleMode!=0) {
        let min = 0
        let max = 4
        currentsong = Math.floor(Math.random() * (max - min + 1)) + min;
        playSong();
        play.src = "images/pause.png"
    }else {
        currentsong--
        playSong();
    play.src = "images/pause.png"
    }
}

function mute() {
    let mute = document.getElementById("mute")

    if (song.muted) {
        mute.src = "images/volume.png"
        song.muted = false
    } else {
        mute.src = "images/volume-mute.png"
        song.muted = true
    }
}

function decrease() {
    song.volume -= 0.2
}

function increase() {
    song.volume += 0.2
}

function setFillOnClick(e) {
    const seekBar = document.querySelector('.seek-bar');
    const fill = document.querySelector('.fill');
    const handle = document.querySelector('.handle');

    const seekBarRect = seekBar.getBoundingClientRect();
    const offsetX = e.clientX - seekBarRect.left;
    const barWidth = seekBar.offsetWidth;

    const newPosition = offsetX / barWidth;

    // Set the fill position based on the click
    fill.style.left = newPosition * 0.1 + "%";

    const newTime = newPosition * song.duration;
    song.currentTime = newTime;
}


// Add event listener to the seek bar for mouse clicks to set the fill position
const handle = document.querySelector('.handle');
handle.addEventListener('click', setFillOnClick);

let repeatMode = 0; // 0: no repeat, 1: repeat one, 2: repeat all

function toggleRepeat() {
    const repeatButton = document.getElementById("repeat");
    
    repeatMode = (repeatMode + 1) % 2; // Cycle through repeat modes
    
    switch(repeatMode) {
        case 0:
            repeatButton.src = "images/repeat-off-1.png"; // Change button image for no repeat
            break;
        case 1:
            repeatButton.src = "images/repeat-one.png"; // Change button image for repeat one
            break;
    }
}

// Add event listener to the repeat button to toggle repeat modes
const repeatButton = document.getElementById("repeat");
repeatButton.addEventListener("click", toggleRepeat);


let shuffleMode = false; // Initialize shuffle mode as false

// Function to toggle shuffle mode
function toggleShuffle() {
    const shuffleButton = document.getElementById("shuffle");
    shuffleMode = !shuffleMode; // Toggle shuffle mode

    // Update button image based on shuffle mode
    shuffleButton.src = shuffleMode ? "images/shuffle-on.png" : "images/shuffle-off.png";

    // Shuffle songs if shuffle mode is on
    if (shuffleMode) {
        shuffleSongs();
    } else {
        // If shuffle mode is off, reset to original order
        initializeData(); // You need to define this function to reset the data
    }
}

// Add event listener to the shuffle button
const shuffleButton = document.getElementById("shuffle");
shuffleButton.addEventListener("click", toggleShuffle);

function next() {
    if (currentsong >= data.song.length-1) {
        currentsong = -1
    }
    if(repeatMode!=0) {
        song.currentTime = 0;
            song.play();
    } else if (shuffleMode!=0) {
        let min = 0
        let max = 4
        currentsong = Math.floor(Math.random() * (max - min + 1)) + min;
        playSong();
        play.src = "images/pause.png"
    }else {
        currentsong++
        playSong();
    play.src = "images/pause.png"
    }
    
}