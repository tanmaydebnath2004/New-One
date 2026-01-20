const images = [
  { src: "https://picsum.photos/id/1015/600/400", caption: "Mountain View" },
  { src: "https://picsum.photos/id/1016/600/400", caption: "Forest Road" },
  { src: "https://picsum.photos/id/1020/600/400", caption: "Desert Sand" },
  { src: "https://picsum.photos/id/1024/600/400", caption: "Cute Dog" }
];
console.log("Script loaded");

let index = 0;
let isPlaying = true;
let intervalTime = 3000;
let slideshowInterval;

const slide = document.getElementById("slide");
const caption = document.getElementById("caption");
const playBtn = document.getElementById("playBtn");
const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");

function showSlide() {
  slide.style.opacity = 0;
  setTimeout(() => {
    slide.src = images[index].src;
    caption.textContent = images[index].caption;
    slide.style.opacity = 1;
  }, 200);
}
console.log("Script loaded");

function next() {
  index = (index + 1) % images.length;
  showSlide();
  saveState();
}

function prev() {
  index = (index - 1 + images.length) % images.length;
  showSlide();
  saveState();
}

function togglePlay() {
  isPlaying = !isPlaying;
  playBtn.textContent = isPlaying ? "Pause" : "Play";
  saveState();
}

function startSlideshow() {
  clearInterval(slideshowInterval);
  slideshowInterval = setInterval(() => {
    if (isPlaying) next();
  }, intervalTime);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function saveState() {
  const state = {
    index,
    isPlaying,
    intervalTime
  };
  localStorage.setItem("slideshowState", JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem("slideshowState");
  if (saved) {
    const state = JSON.parse(saved);
    index = state.index || 0;
    isPlaying = state.isPlaying ?? true;
    intervalTime = state.intervalTime || 3000;

    playBtn.textContent = isPlaying ? "Pause" : "Play";
    speedSlider.value = intervalTime / 1000;
    speedValue.textContent = speedSlider.value;
  }
}

speedSlider.addEventListener("input", function () {
  speedValue.textContent = this.value;
  intervalTime = this.value * 1000;
  startSlideshow();
  saveState();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
  if (e.code === "Space") {
    e.preventDefault();
    togglePlay();
  }
  if (e.key.toLowerCase() === "f") toggleFullscreen();
});

loadState();
startSlideshow();
showSlide();
