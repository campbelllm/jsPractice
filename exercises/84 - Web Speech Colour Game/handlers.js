import { isAValidColor } from "./colors";

function logWords(results) {
	console.log(results[results.length - 1][0].transcript);
}

export function handleResult({results}) {
    logWords(results);
    const words = results[results.length - 1][0].transcript;
    let color = words.toLowerCase()
    color = color.replace(/\s/g, '');
    if (!isAValidColor(color)) {
        return;
    }
    const colorSpan = document.querySelector(`.${color}`)
    colorSpan.classList.add('got')
    console.log('this is a valid color')
    document.body.style.backgroundColor = color
}

