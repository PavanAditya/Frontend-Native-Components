let play = function() {
    document.getElementById('video').play();
}

let pause = function() {
    document.getElementById('video').pause();
}

let mute = function() {
    document.getElementById('video').muted = true;
}

let unmute = function() {
    document.getElementById('video').muted = false;
}

let changeHeight = function() {
    document.getElementById('video').style.height = document.getElementById('video-height').value;
}

let changeWidth = function() {
    document.getElementById('video').style.width = document.getElementById('video-width').value;
}

let playAudio = function() {
    document.getElementById('audio').play();
}

let pauseAudio = function() {
    document.getElementById('audio').pause();
}

let muteAudio = function() {
    document.getElementById('audio').muted = true;
}

let unmuteAudio = function() {
    document.getElementById('audio').muted = false;
}