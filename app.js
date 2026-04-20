
const audio = document.getElementById("audio");

const musicName = document.querySelector(".music_name");
const artistName = document.querySelector(".artist_name");
const disk = document.querySelector(".disk");

const seekBar = document.querySelector(".seek_bar");
const currentTime = document.querySelector(".current_time");
const songDuration = document.querySelector(".song_duration");

const playBtn = document.querySelector(".play_btn");
const nextBtn = document.querySelector(".forward-btn");

const prevBtn = document.querySelector(".backward-btn");

let songIndex = 0;
let isPlaying = false;

/* load song */
function loadSong(index) {
    audio.src = songs[index].path;
    musicName.innerText = songs[index].name;
    artistName.innerText = songs[index].artist;
    disk.style.backgroundImage = `url('${songs[index].cover}')`;

    audio.load();
}

loadSong(songIndex);

/* play / pause */
playBtn.addEventListener("click", () => {
    if (!isPlaying) {
        audio.play();
        playBtn.classList.add("pause");
        disk.classList.add("play");
        isPlaying = true;
    } else {
        audio.pause();
        playBtn.classList.remove("pause");
        disk.classList.remove("play");
        isPlaying = false;
    }
});

/* next song */
nextBtn.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    audio.play();

    playBtn.classList.add("pause");
    disk.classList.add("play");
    isPlaying = true;
});

/* previous song */
prevBtn.addEventListener("click", () => {
    songIndex = songIndex - 1 < 0 ? songs.length - 1 : songIndex - 1;
    loadSong(songIndex);
    audio.play();
    playBtn.classList.add("pause");
    disk.classList.add("play");
    isPlaying = true;
});

/* update seek bar */
audio.addEventListener("timeupdate", () => {
    seekBar.value = (audio.currentTime / audio.duration) * 100 || 0;


    let curMin = Math.floor(audio.currentTime / 60);
    let curSec = Math.floor(audio.currentTime % 60);
    if (curSec < 10) curSec = `0${curSec}`;
    currentTime.innerText = `${curMin}:${curSec}`;

    let durMin = Math.floor(audio.duration / 60) || 0;
    let durSec = Math.floor(audio.duration % 60) || 0;
    if (durSec < 10) durSec = `0${durSec}`;
    songDuration.innerText = `${durMin}:${durSec}`;
});

/* seek manually */
seekBar.addEventListener("input", () => {
    audio.currentTime = (seekBar.value * 

audio.duration) / 100;
});

/* auto next when finished */
audio.addEventListener("ended", () => {
    nextBtn.click();
});
