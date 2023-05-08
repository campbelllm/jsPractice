const canvas = document.querySelector('#etch-a-sketch');

const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const moveAmount = 10;
//destructuring, we are making to variables that are equal to same properties on our canvas
const { width, height } = canvas;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
let hue = 0;

ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = moveAmount;

ctx.beginPath(); //start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

function draw({ key }) {
	hue += 5;
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	console.log(key);
	ctx.beginPath();
	ctx.moveTo(x, y);
	switch (key) {
		case 'ArrowUp':
			y -= moveAmount;
			break;
		default:
			break;
		case 'ArrowDown':
			y += moveAmount;
			break;
		case 'ArrowRight':
			x += moveAmount;
			break;
		case 'ArrowLeft':
			x -= moveAmount;
	}
	ctx.lineTo(x, y);
	ctx.stroke();
}

function handleKey(e) {
	if (e.key.includes('Arrow')) {
		e.preventDefault();
		draw({ key: e.key });
	}
}

function clearCanvas() {
	
	canvas.classList.add('shake');
	ctx.clearRect(0, 0, width, height);
	canvas.addEventListener('animationend', function () {
		canvas.classList.remove('shake');
    }, { once: true });
}

window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);
