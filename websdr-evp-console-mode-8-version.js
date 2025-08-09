// **Основные настройки генерации диапазонов**
const minFrequency = 1000;      // Минимально возможная частота
const maxFrequency = 30000;     // Максимально возможная частота
const minRangeSize = 50;        // Минимальный размер диапазона
const maxRangeSize = 500;       // Максимальный размер диапазона
const rangeChangeInterval = 30000; // Как часто генерировать новые диапазоны (миллисекунды)

// **Наборы задержек** (минимум и максимум в секундах)
const delaySets = [
    { min: 1, max: 10 },    // Первый набор задержек (1-10 секунд)
    { min: 0.1, max: 0.3 },  // Второй набор задержек (0.1-0.3 секунды) - очень быстро!
    { min: 5, max: 8 }      // Третий набор задержек (5-8 секунд)
];

const delaySetChangeInterval = 60000; // Как часто менять набор задержек (миллисекунды)

// **Инициализация**
const frequencyRanges = [      // Исходные диапазоны (пусть будут, но мы их сразу заменим)
    { min: 1500, max: 1600 },
    { min: 5000, max: 5500 },
    { min: 10000, max: 10100 }
];

let currentDelaySet = getRandomDelaySet(); // Текущий набор задержек

// **Функции**

function generateRandomRange() {
    const min = Math.floor(Math.random() * (maxFrequency - minFrequency - maxRangeSize)) + minFrequency;
    const rangeSize = Math.floor(Math.random() * (maxRangeSize - minRangeSize + 1)) + minRangeSize;
    const max = min + rangeSize;
    return { min: min, max: Math.min(max, maxFrequency) }; // Убедимся, что max не превышает maxFrequency
}

function updateFrequencyRanges() {
    for (let i = 0; i < frequencyRanges.length; i++) {
        frequencyRanges[i] = generateRandomRange();
    }
    console.log("Frequency ranges updated:", frequencyRanges);
}

function getRandomDelaySet() {
    const randomIndex = Math.floor(Math.random() * delaySets.length);
    return delaySets[randomIndex];
}

function changeDelaySet() {
    currentDelaySet = getRandomDelaySet();
    console.log("Delay set changed to:", currentDelaySet);
}

function switchFrequency() {
    const frequencyInput = document.querySelector('input[name="frequency"]');
    if (!frequencyInput) {
        console.error('Frequency input element not found.');
        return;
    }

    // Случайный выбор диапазона
    const randomIndex = Math.floor(Math.random() * frequencyRanges.length);
    const selectedRange = frequencyRanges[randomIndex];

    // Генерация случайной частоты
    const frequency = Math.floor(Math.random() * (selectedRange.max - selectedRange.min + 1)) + selectedRange.min;
    frequencyInput.value = frequency;

    // Запускаем события
    frequencyInput.dispatchEvent(new Event('input', { bubbles: true }));
    frequencyInput.dispatchEvent(new Event('change', { bubbles: true }));

    // Попытка найти и отправить форму
    const form = frequencyInput.closest('form');
    if (form) {
        form.requestSubmit();
    } else {
        console.warn("No form found containing the frequency input. Cannot submit.");
    }

    // Генерируем случайную задержку (ВНИМАНИЕ: задержка в секундах, умножаем на 1000!)
    const delay = (Math.random() * (currentDelaySet.max - currentDelaySet.min) + currentDelaySet.min) * 1000; // delay в миллисекундах
    setTimeout(switchFrequency, delay);
}

// **Запуск**
updateFrequencyRanges();       // Инициализируем диапазоны сразу
changeDelaySet();            // Инициализируем набор задержек сразу
setInterval(updateFrequencyRanges, rangeChangeInterval); // Запускаем смену диапазонов
setInterval(changeDelaySet, delaySetChangeInterval);   // Запускаем смену наборов задержек

switchFrequency(); // Запускаем основной цикл
