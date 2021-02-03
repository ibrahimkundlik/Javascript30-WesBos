//variables
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const toggle = player.querySelector(".toggle");
const skipBtns = player.querySelectorAll("[data-skip]");
const controlBtns = player.querySelectorAll(".player__slider");
const progressBar = player.querySelector(".progress__filled");
const progress = player.querySelector(".progress");
const fullscreen = player.querySelector(".fullscreen");

//functions
const videoControl = () => {
	if (video.paused) video.play();
	else video.pause();
};

const updateBtn = () => {
	toggle.innerText = video.paused ? "►" : "▌▌";
};

const skip = (e) => {
	video.currentTime += parseFloat(e.target.dataset.skip);
};

const updateControl = (e) => {
	video[e.target.name] = e.target.value;
};

const updateProgBar = () => {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = percent + "%";
};

const handleProgBar = (e) => {
	const newTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = newTime;
	updateProgBar();
};

//event listeners
video.addEventListener("click", videoControl);
video.addEventListener("play", updateBtn);
video.addEventListener("pause", updateBtn);
video.addEventListener("timeupdate", updateProgBar);

toggle.addEventListener("click", videoControl);

skipBtns.forEach((btn) => {
	btn.addEventListener("click", skip);
});
controlBtns.forEach((range) => {
	range.addEventListener("change", updateControl);
	range.addEventListener("mousemove", updateControl);
});

let mouseDown = false;
progress.addEventListener("click", handleProgBar);
progress.addEventListener("mousemove", (e) => {
	if (mouseDown) handleProgBar(e);
});
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));

fullscreen.addEventListener("click", () => {
	player.requestFullscreen();
});
