import {mikoData, volume} from '/data/gameData.js';

export function useState(initialValue) {
    let state = initialValue;
    let setters = [];

    function getState() {
        return state;
    }

    function setState(newValue) {
        state = newValue;
        setters.forEach(setter => setter(state));
    }

    function useSetState(setter) {
        setters.push(setter);
        return () => {
            setters = setters.filter(s => s !== setter);
        };
    }

    return [getState, setState, useSetState];
}

export const volumeHandler = (isOn) => {
    return isOn ? volume.volumeUp : volume.volumeOff
}

export const randomSrc = (isImg) => {
    const isHappy = isImg ? mikoData.mikoHappy.length : mikoData.mikoInspiration.length;
    const randomIndex = Math.floor(Math.random() * isHappy);
    return isImg ? mikoData.mikoHappy[randomIndex] : mikoData.mikoInspiration[randomIndex];
}

export const randomChar = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

// добавляем вариант языка и флаг
export const addDescription = (randomNumber, charDescription, russianFlag, englishFlag, mikoIsWaiting) => {
    if (/[а-яё]/i.test(randomNumber)) {
        charDescription.textContent = 'Рус';
        // russianFlag.style.display = 'block';
        russianFlag.style.display = 'none';
        // englishFlag.style.display = 'none';
        englishFlag.style.display = 'block';
        mikoIsWaiting.style.display = 'block';
    } else if (/[a-z]/i.test(randomNumber)) {
        charDescription.textContent = 'Eng';
        // russianFlag.style.display = 'none';
        russianFlag.style.display = 'block';
        // englishFlag.style.display = 'block';
        englishFlag.style.display = 'none';
        mikoIsWaiting.style.display = 'block';
    } else {
        charDescription.textContent = 'Цифра';
        russianFlag.style.display = 'none';
        englishFlag.style.display = 'none';
        mikoIsWaiting.style.display = 'block';
    }
}
