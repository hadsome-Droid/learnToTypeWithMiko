import {chars} from '/data/gameData.js'
import {showSnowflake, hiddenSnowflake} from '/data/particlesData.js'
import {addDescription, randomChar, randomSrc, volumeHandler, useState} from './gameUtils.js';

const currentChar = document.getElementById('randomChar');
const isSoundOn = document.getElementById('isSoundOn')
const voice = document.getElementById('voice')
const letterElement = document.getElementById('letter');
const charDescription = document.getElementById('charDescription')
const gameContainer = document.getElementById('game')
const russianFlag = document.getElementById('russianFlag')
const englishFlag = document.getElementById('englishFlag')
const mikoIsWaiting = document.getElementById('mikoIsWaiting')
const mikoIsStunned = document.getElementById('mikoIsStunned')
const mikoIsHappy = document.getElementById('mikoIsHappy')


mikoIsWaiting.style.display = 'none'
mikoIsStunned.style.display = 'none'
mikoIsHappy.style.display = 'none'


let randomNumber = randomChar(chars);
currentChar.textContent = randomNumber;


let isKeyboardLocked = false;
let timeoutId;

const [onVolume, setOnVolume] = useState(false)

// блокируем клавиатуру
function lockKeyboard() {
    isKeyboardLocked = true;
    document.addEventListener('keydown', function (event) {
        event.preventDefault();
    });
}

// разблокируем клавиатуру
function unlockKeyboard() {
    isKeyboardLocked = false;
    document.removeEventListener('keydown', function (event) {
        event.preventDefault();
    });
}


// реагируем негативное событие
function negativeEvent(key) {
    let content = randomSrc(false)
    const time = onVolume() ? 1000 : 3000
    lockKeyboard()
    clearTimeout(timeoutId)
    const newLetterElement = document.createElement('div');
    if (!onVolume()) {
        const audio = new Audio(content.srcAudio);
        audio.play()
    }
    mikoIsStunned.src = content.srcImg
    gameContainer.classList.add('red');
    mikoIsWaiting.style.display = 'none'
    mikoIsStunned.style.display = 'block'
    newLetterElement.textContent = key;

    letterElement.appendChild(newLetterElement);
    timeoutId = setTimeout(() => {
        unlockKeyboard()
        gameContainer.classList.remove('red');
        mikoIsWaiting.style.display = 'block'
        mikoIsStunned.style.display = 'none'
    }, time)
}

// реагируем положительное событие
function positiveEvent(key) {
    let content = randomSrc(true)
    const time = onVolume() ? 4000 : 3000
    if (!onVolume()) {
        const audio = new Audio(content.srcAudio);
        audio.play()
    }
    lockKeyboard()
    clearTimeout(timeoutId)
    const newLetterElement = document.createElement('div');
    mikoIsHappy.src = content.srcImg
    gameContainer.classList.add('green');
    newLetterElement.textContent = key;
    mikoIsWaiting.style.display = 'none'
    mikoIsHappy.style.display = 'block'

    letterElement.appendChild(newLetterElement);
    particlesJS("particles-js", showSnowflake);

    // возврашяем дефолтное состояние и обновляем букву
    timeoutId = setTimeout(() => {
        unlockKeyboard()
        gameContainer.classList.remove('green');
        mikoIsWaiting.style.display = 'block'
        mikoIsHappy.style.display = 'none'
        randomNumber = randomChar(chars);
        currentChar.textContent = randomNumber;
        addDescription(randomNumber, charDescription, englishFlag, russianFlag, mikoIsWaiting)
        newLetterElement.textContent = ''
        particlesJS("particles-js", hiddenSnowflake);
    }, time)
}

// устанавливаем букву
addDescription(randomNumber, charDescription, englishFlag, russianFlag, mikoIsWaiting)


document.addEventListener('keyup', function (event) {
    if (!isKeyboardLocked) {
        let key = event.key.toLowerCase();

        letterElement.textContent = '';

        if (/[а-яё]/i.test(randomNumber)) {
            charDescription.textContent = 'Рус';
            // charDescription.textContent = 'Eng';
        } else if (/[a-z]/i.test(randomNumber)) {
            charDescription.textContent = 'Eng';
            // charDescription.textContent = 'Рус';
        } else {
            charDescription.textContent = 'Цифра';
        }
        if (key === randomNumber.toLowerCase()) {
            positiveEvent(key)
        } else if (/^[а-яёА-ЯЁ]$/.test(key)) {
            negativeEvent(key)
        } else if (/^[a-zA-Z]$/.test(key)) {
            negativeEvent(key)
        } else if (/^[0-9]$/.test(key)) {
            negativeEvent(key)
        }
    }
});

isSoundOn.addEventListener('click', function () {
    voice.src = volumeHandler(onVolume())
    setOnVolume(!onVolume())
})
console.log(onVolume())