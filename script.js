
const music = new Audio('Songs/Shringar Shri Radharani.mp3');

const songs = [
    {
        id: "1",
        songName: "Bansuri Krishna ki Baajegi",
        poster: "Images/1.jpg",
        song: "songs/1.mp3",
    },
    {
        id: "2",
        songName: "Gwalon ki Bhid Jami Aaj",
        poster: "Images/2.jpg",
        song: "songs/2.mp3",
    },
    {
        id: "3",
        songName: "Hori re Rasiya",
        poster: "Images/3.jpg",
        song: "songs/3.mp3",
    },
    {
        id: "4",
        songName: "Kanha ke Adhran Dhari Bansuri",
        poster: "Images/4.jpg",
        song: "songs/4.mp3",
    },
    {
        id: "5",
        songName: "Kanhiya Rijhai Radhe",
        poster: "Images/5.jpg",
        song: "songs/5.mp3",
    },
    {
        id: "6",
        songName: "Krishn Hain Vistaar Hain",
        poster: "Images/6.jpg",
        song: "songs/6.mp3",
    },
    {
        id: "7",
        songName: "O Kanha O Krishna",
        poster: "Images/7.jpg",
        song: "songs/7.mp3",
    },
    {
        id: "8",
        songName: "Param Prem mein Radhika Golok Raas",
        poster: "Images/8.jpg",
        song: "songs/8.mp3",
    },
    {
        id: "9",
        songName: "Radha ke Sang mein Aaj Raas Rache",
        poster: "Images/9.jpg",
        song: "songs/9.mp3",
    },
    {
        id: "10",
        songName: "Samay Samjhayega",
        poster: "Images/10.jpg",
        song: "songs/10.mp3",
    },
    {
        id: "11",
        songName: "Shri Krishna Govind Hare Murari",
        poster: "Images/11.jpg",
        song: "songs/11.mp3",
    },
    {
        id: "12",
        songName: "Tum Hi Tum",
        poster: "Images/12.jpg",
        song: "songs/12.mp3",
    },
    {
        id: "13",
        songName: "Tum Prem Ho",
        poster: "Images/13.jpg",
        song: "songs/13.mp3",
    },
    {
        id: "14",
        songName: "Uttar Mere Har Prashn ka",
        poster: "Images/14.jpg",
        song: "songs/14.mp3",
    },
    {
        id: "15",
        songName: "Mera Hriday Tum",
        poster: "Images/15.jpg",
        song: "songs/15.mp3",
    },
    {
        id: "16",
        songName: "Shringar Shri Radharani",
        poster: "Images/16.jpg",
        song: "songs/16.mp3",
    },
    {
        id: "17",
        songName: "Mere Paas Tum Raho",
        poster: "Images/17.jpg",
        song: "songs/17.mp3",
    },

];


let makeAllBackgrounds = () => {
    Array.from(document.getElementsByClassName("songItem")).forEach((el) => {
        el.style.background = "";
    });
};

let makeAllPlays = () => {
    Array.from(document.getElementsByClassName("playListPlay")).forEach((el) => {
        el.classList.remove('bi-pause-fill');
        el.classList.add('bi-play-fill');
    });
};




Array.from(document.getElementsByClassName("songItem")).forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].poster;
    element.getElementsByTagName("h5")[0].innerText = songs[i].songName;
});

let masterPlay = document.getElementById("masterPlay");
let wave = document.getElementById("wave");
masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add("active1");
    }
    else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove("active1");
    }
});

let index = 0;
let poster_master_play = document.getElementById("poster_master_play");
let title = document.getElementById("title");
Array.from(document.getElementsByClassName("playListPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        index = e.target.id;
        title.innerText = songs[index - 1].songName;
        music.src = `Songs/${title.innerText}.mp3`;
        poster_master_play.src = `Images/${index}.jpg`;
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add("active1");
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName("songItem"))[index - 1].style.background = "rgba(160, 159, 159, 0.1)";
        makeAllPlays();
        e.target.classList.remove('bi-play-fill');
        e.target.classList.add('bi-pause-fill');
    });
});

let currentStart = document.getElementById("currentStart");
let currentEnd = document.getElementById("currentEnd");
let seek = document.getElementById("seek");
let bar2 = document.getElementById("bar2");
let dot = document.getElementsByClassName("dot")[0];

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur / 60);
    let sec = Math.floor(music_dur % 60);

    if (sec < 10) {
        sec = `0${sec}`;
    }

    currentEnd.innerText = `${min} : ${sec}`;

    let min1 = Math.floor(music_curr / 60);
    let sec1 = Math.floor(music_curr % 60);

    if (sec1 < 10) {
        sec = `0${sec1}`;
    }

    currentStart.innerText = `${min1} : ${sec1}`;

    let progress = parseInt((music_curr / music_dur) * 100);
    seek.value = progress;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;

    music.addEventListener('ended', () => {
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove("active1");
    });
});

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
});

let vol_icon = document.getElementById("vol_icon");
let vol = document.getElementById("vol");
let vol_bar = document.getElementsByClassName("vol_bar")[0];
let vol_dot = document.getElementsByClassName("vol_dot")[0];

vol.addEventListener('change', () => {
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.add('bi-volume-down-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.add('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
    }
    vol_bar.style.width = `${vol.value}%`;
    vol_dot.style.left = `${vol.value}%`;
    music.volume = vol.value / 100;
});

let back = document.getElementById("back");
let next = document.getElementById("next");

back.addEventListener('click', () => {
    index--;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName("songItem")).length;
    }
    title.innerText = songs[index - 1].songName;
    music.src = `Songs/${title.innerText}.mp3`;
    poster_master_play.src = `Images/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.add("active1");
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName("songItem"))[index - 1].style.background = "rgba(160, 159, 159, 0.1)";
    makeAllPlays();
    e.target.classList.remove('bi-play-fill');
    e.target.classList.add('bi-pause-fill');
});

next.addEventListener('click', () => {
    index++;
    if (index > Array.from(document.getElementsByClassName("songItem")).length) {
        index = 1;
    }
    title.innerText = songs[index - 1].songName;
    music.src = `Songs/${title.innerText}.mp3`;
    poster_master_play.src = `Images/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.add("active1");
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName("songItem"))[index - 1].style.background = "rgba(160, 159, 159, 0.1)";
    makeAllPlays();
    e.target.classList.remove('bi-play-fill');
    e.target.classList.add('bi-pause-fill');
});










let pop_song = document.querySelector(".pop_song");
let pop_song_right = document.querySelector("#pop_song_right");
let pop_song_left = document.querySelector("#pop_song_left");

pop_song_right.addEventListener('click', () => {
    pop_song.scrollLeft += 800;
});
pop_song_left.addEventListener('click', () => {
    pop_song.scrollLeft -= 800;
});

let item = document.querySelector(".item");
let pop_art_right = document.querySelector("#pop_art_right");
let pop_art_left = document.querySelector("#pop_art_left");

pop_art_right.addEventListener('click', () => {
    item.scrollLeft += 800;
});
pop_art_left.addEventListener('click', () => {
    item.scrollLeft -= 800;
});

