const keys = document.querySelectorAll(".keys");

function playAudio(e) {
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
	if (!audio) return;
	audio.currentTime = 0;
	audio.play();
	key.classList.add("playing");
}

function removeEffect(e) {
	e.target.classList.remove("playing");
}

window.addEventListener("keydown", playAudio);
keys.forEach((each) => {
	each.addEventListener("transitionend", removeEffect);
});
