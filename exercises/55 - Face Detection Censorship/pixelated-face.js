// The face detection does not work on all browsers and operating systems.
// If you are getting a `Face detection service unavailable` error or similar,
// it's possible that it won't work for you at the moment.
const video = document.querySelector('.webcam');

const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');

const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');

const faceDetector = new window.FaceDetector();
const SIZE = 10;
const SCALE = 1.4;

console.log(video, canvas, faceCanvas);

//this function will populate the users video
async function populateVideo() {
	const stream = await navigator.mediaDevices.getUserMedia({
		video: { width: 1280, height: 720 },
	});
	video.srcObject = stream;
	await video.play();
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	faceCanvas.width = video.videoWidth;
	faceCanvas.height = video.videoHeight;
}

async function detect() {
	const faces = await faceDetector.detect(video);
	//browser looks for next animation and runs detect for us
	//recursion: function calls itself inside of itself
	faces.forEach(drawFace);
	requestAnimationFrame(detect);
	faces.forEach(censor);
}

function drawFace(face) {
	const { width, height, top, left } = face.boundingBox;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = '#ffc600';
	ctx.lineWidth = 2;
	ctx.strokeRect(left, top, width, height);
}

function censor({ boundingBox: face }) {
	faceCtx.imageSmoothingEnabled = false;
	faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
	//draw the small face
	faceCtx.drawImage(
		//5 source arg;
		video, //where does the source come from
		face.x, //this is where we start the source pull
		face.y,
		face.width,
		face.height,
		//4 draw args
		face.x, // where we start drawing the x and y
		face.y,
		SIZE,
		SIZE
	);
	const width = face.width * SCALE;
	const height = face.height * SCALE;
	//take face back out and draw back at normal size
	faceCtx.drawImage(
		faceCanvas, //source
		face.x,
		face.y,
		SIZE,
		SIZE,
		//drawing orgs
		face.x - (width - face.width) / 2,
		face.y - (height - face.height) / 2,
		width,
		height
	);
}

populateVideo().then(detect);
