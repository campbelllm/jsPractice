import { colorsByLength, isDark } from "./colors";
import { handleResult } from "./handlers";


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const colorsEl = document.querySelector('.colors')

function displayColors(colors) {
    return colors.map(color => 
        `<span class ="color ${color} ${isDark(color) ?
    'dark' : ''}" style="background: ${color};">${color}</span>`
    ).join('')
}

function start() {
    //does their browser support speech recognition
    if (!window.SpeechRecognition) {
        console.log('sorry')
        return
    }
    console.log('starting')
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.intermResults = true;
    recognition.onresult = handleResult;
    recognition.start()

}
colorsEl.innerHTML = displayColors(colorsByLength);
 start()
