
// Меню
function toggleMenu() {
    const navList = document.getElementById('navList');
    navList.classList.toggle('show');
}


// Кнопка додати в друзі
let isImage1Visible = true;

function toggleImage() {
  const button = document.querySelector('.image-button');

  if (isImage1Visible) {
    button.style.backgroundImage = 'url("image/done.svg")';
  } else {
    button.style.backgroundImage = 'url("image/plus.svg")';
  }

  isImage1Visible = !isImage1Visible;
}

// Блок новин
const gallery = document.querySelector('.gallery');
const blocks = document.querySelectorAll('.block');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentBlockIndex = 0;

// Функція для анімації з'явлення блоку
function animateInBlock(index) {
  blocks[index].style.transform = 'translateX(0)';
  setTimeout(() => {
    blocks[index].style.opacity = 1;
    blocks[index].classList.remove('hidden');
  }, 10);
}

// Запустити анімацію для першого блоку при завантаженні сторінки
animateInBlock(currentBlockIndex);

nextButton.addEventListener('click', () => {
  blocks[currentBlockIndex].style.transform = 'translateX(-100%)';
  blocks[currentBlockIndex].style.opacity = 0;
  setTimeout(() => {
    blocks[currentBlockIndex].classList.add('hidden');
    currentBlockIndex = (currentBlockIndex + 1) % blocks.length;
    animateInBlock(currentBlockIndex);
  }, 500);
});

prevButton.addEventListener('click', () => {
  blocks[currentBlockIndex].style.transform = 'translateX(100%)';
  blocks[currentBlockIndex].style.opacity = 0;
  setTimeout(() => {
    blocks[currentBlockIndex].classList.add('hidden');
    currentBlockIndex = (currentBlockIndex - 1 + blocks.length) % blocks.length;
    animateInBlock(currentBlockIndex);
  }, 500);
});



function hideAllPlayers() {
    const players = document.querySelectorAll(".player");
    for (let player of players) {
        player.style.display = "none";
    }
}
function showMusicPlayer() {
    setActiveButton("musicButton");
    hideAllPlayers();
    document.getElementById("musicPlayer").style.display = "block";
}

function showVideoPlayer() {
    setActiveButton("videoButton");
    hideAllPlayers();
    document.getElementById("videoPlayer").style.display = "block";
}

function showPhotoPlayer() {
    setActiveButton("photoButton");
    hideAllPlayers();
    document.getElementById("photoPlayer").style.display = "block";
}

function setActiveButton(buttonId) {
    const buttons = document.querySelectorAll("button");
    for (let button of buttons) {
        button.classList.remove("active-button");
    }
    document.getElementById(buttonId).classList.add("active-button");
}

// Виклик функції для позначення кнопки "Музика" як активної при завантаженні сторінки
setActiveButton("musicButton");
window.addEventListener("DOMContentLoaded", function() {
    showMusicPlayer();
});










// МУЗИЧНИЙ ПЛЕЄР МУЗИЧНИЙ ПЛЕЄР МУЗИЧНИЙ ПЛЕЄР


let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
 
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
 
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
 

let track_index = 0;
let isPlaying = false;
let updateTimer;
 

let curr_track = document.createElement('audio');
 

let track_list = [
  {
    name: "Africa",
    artist: "Toto",
    image: "image/toto.jpg",
    path: "image/africa.mp3"
  },
  {
    name: "The Sun",
    artist: "The Beatles",
    image: "image/road.jpg",
    path: "image/thesun.mp3"
  },
  {
    name: "Pumped Up Kicks",
    artist: "Foster The People",
    image: "image/pumped.jpg",
    path: "image/pumped.mp3",
  },
];


function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
   
    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
   
    // Update details of the track
    track_art.style.backgroundImage = 
       "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = 
       "PLAYING " + (track_index + 1) + " OF " + track_list.length;
   
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
   
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
   
    // Apply a random background color
    random_bg_color();
  }
   
  function random_bg_color() {
    // Get a random number between 64 to 256
    // (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
   
    // Construct a color with the given values
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
   
    // Set the background to the new color
    // document.body.style.background = bgColor;
  }
   
  // Function to reset all values to their default
  function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }


  function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
  }
   
  function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;
   
    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  }
   
  function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;
   
    // Replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  }
   
  function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (track_index < track_list.length - 1)
      track_index += 1;
    else track_index = 0;
   
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
  }
   
  function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    if (track_index > 0)
      track_index -= 1;
    else track_index = track_list.length - 1;
     
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
  }


  function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider 
    // and get the relative duration to the track
    seekto = curr_track.duration * (seek_slider.value / 100);
   
    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
  }
   
  function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100;
  }
   
  function seekUpdate() {
    let seekPosition = 0;
   
    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seek_slider.value = seekPosition;
   
      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
   
      // Add a zero to the single digit time values
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
   
      // Display the updated duration
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }


  loadTrack(track_index);