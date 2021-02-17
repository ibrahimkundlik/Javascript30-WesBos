const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
	navigator.mediaDevices
		.getUserMedia({ video: true, audio: false })
		.then((localMediaStream) => {
			// ❌ need to check below code for multiple browsers
			video.srcObject = localMediaStream;
			video.play();
		})
		.catch((err) => {
			alert(err);
		});
}

function paintToCanvas() {
	const width = video.videoWidth;
	const height = video.videoHeight;
	canvas.width = width;
	canvas.height = height;
	return setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height);
	}, 16);
}

function takePhoto() {
	snap.currenTime = 0;
	snap.play();
	const imageData = canvas.toDataURL("image/jpeg");
	const link = document.createElement("a");
	link.href = imageData;
	link.setAttribute("download", "webcam_ss");
	link.innerHTML = `<img src=${imageData} href="webcam image"/>`;
	strip.insertBefore(link, strip.firstChild);
}

getVideo();

video.addEventListener("canplay", paintToCanvas);
