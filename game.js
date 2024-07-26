const currentChar = document.getElementById('randomChar');
const letterElement = document.getElementById('letter');
const charDescription = document.getElementById('charDescription')
const gameContainer = document.getElementById('game')
const russianFlag = document.getElementById('russianFlag')
const englishFlag = document.getElementById('englishFlag')
const mikoIsWaiting = document.getElementById('mikoIsWaiting')
const mikoIsStunned = document.getElementById('mikoIsStunned')
const mikoIsHappy = document.getElementById('mikoIsHappy')

import HappyImg1 from '/assets/image/miko/happy/happy1.png'
import HappyImg2 from '/assets/image/miko/happy/happy2.png'
import HappyImg3 from '/assets/image/miko/happy/happy3.png'
import InspirationImg1 from '/assets/image/miko/inspiration/inspiration1.png'
import InspirationImg2 from '/assets/image/miko/inspiration/inspiration2.png'
import InspirationImg3 from '/assets/image/miko/inspiration/inspiration3.png'

import HappyAudio1 from 'assets/audio/happy/happy1.mp3'
import HappyAudio2 from 'assets/audio/happy/happy2.mp3'
import HappyAudio3 from 'assets/audio/happy/happy3.mp3'
import InspirationAudio1 from 'assets/audio/inspiration/inspiration1.mp3'
import InspirationAudio2 from 'assets/audio/inspiration/inspiration2.mp3'
import InspirationAudio3 from 'assets/audio/inspiration/inspiration3.mp3'


//программа для дочи
const chars = [
    // Русские буквы
    'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я',
    'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я',

    // Английские буквы
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',

    // Цифры
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];

const mikoData = {
    mikoHappy: [
        {id: 1, img: HappyImg1, audio: HappyAudio1},
        {id: 2, img: HappyImg2, audio: HappyAudio2},
        {id: 3, img: HappyImg3, audio: HappyAudio3},
    ],
    mikoInspiration: [
        {id:1, img: InspirationImg1, audio: InspirationAudio1},
        {id:2, img: InspirationImg2, audio: InspirationAudio2},
        {id:3, img: InspirationImg3, audio: InspirationAudio3},
    ],
    mikoWaiting: ''
}

mikoIsWaiting.style.display = 'none'
mikoIsStunned.style.display = 'none'
mikoIsHappy.style.display = 'none'

const randomChar = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}


let randomNumber = randomChar(chars);
currentChar.textContent = randomNumber;


let isKeyboardLocked = false;
let timeoutId;

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

// добавляем вариант языка и флаг
function addDescription() {
    if (/[а-яё]/i.test(randomNumber)) {
        charDescription.textContent = 'Рус';
        russianFlag.style.display = 'block';
        englishFlag.style.display = 'none';
        mikoIsWaiting.style.display = 'block'
    } else if (/[a-z]/i.test(randomNumber)) {
        charDescription.textContent = 'Eng';
        russianFlag.style.display = 'none';
        englishFlag.style.display = 'block';
        mikoIsWaiting.style.display = 'block'
    } else {
        charDescription.textContent = 'Цифра';
        russianFlag.style.display = 'none';
        englishFlag.style.display = 'none';
        mikoIsWaiting.style.display = 'block'
    }
}

// реагируем негативное событие
function negativeEvent(key) {
    lockKeyboard()
    clearTimeout(timeoutId)
    const newLetterElement = document.createElement('div');
    gameContainer.classList.add('red');
    mikoIsWaiting.style.display = 'none'
    mikoIsStunned.style.display = 'block'
    newLetterElement.textContent = key;

    letterElement.appendChild(newLetterElement);
    timeoutId = setTimeout(() => {
        unlockKeyboard()
        console.log('negative1')
        gameContainer.classList.remove('red');
        mikoIsWaiting.style.display = 'block'
        mikoIsStunned.style.display = 'none'
    }, 1000)
}

// реагируем положительное событие
function positiveEvent(key) {
    lockKeyboard()
    clearTimeout(timeoutId)
    const newLetterElement = document.createElement('div');
    gameContainer.classList.add('green');
    newLetterElement.textContent = key;
    mikoIsWaiting.style.display = 'none'
    mikoIsHappy.style.display = 'block'

    letterElement.appendChild(newLetterElement);
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 400,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#faae2b'
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#ffffff"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 4,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 20,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 500,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 2
            },
            "move": {
                "enable": true,
                "speed": 3,
                "direction": "bottom",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": true,
                    "mode": "repulse"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 4,
                    "duration": 0.3,
                    "opacity": 1,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    timeoutId = setTimeout(() => {
        unlockKeyboard()
        gameContainer.classList.remove('green');
        mikoIsWaiting.style.display = 'block'
        mikoIsHappy.style.display = 'none'
        randomNumber = randomChar(chars);
        currentChar.textContent = randomNumber;
        addDescription()
        newLetterElement.textContent = ''
        particlesJS("particles-js", {
            particles: {
                number: {
                    value: 400,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ''
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#ffffff"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 4,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 20,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": false,
                    "distance": 500,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 2
                },
                "move": {
                    "enable": true,
                    "speed": 0,
                    "direction": "bottom",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 4,
                        "duration": 0.3,
                        "opacity": 1,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }, 5000)
}

addDescription()

document.addEventListener('keyup', function (event) {
    if (!isKeyboardLocked) {
        let key = event.key.toLowerCase();

        letterElement.textContent = '';

        if (/[а-яё]/i.test(randomNumber)) {
            charDescription.textContent = 'Рус';
        } else if (/[a-z]/i.test(randomNumber)) {
            charDescription.textContent = 'Eng';
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
