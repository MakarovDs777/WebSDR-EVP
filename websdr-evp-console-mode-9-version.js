// **Основные настройки**
const minFrequency = 1000;        // Минимально возможная частота
const maxFrequency = 30000;       // Максимально возможная частота
const minRangeSize = 50;          // Минимальный размер диапазона
const maxRangeSize = 500;         // Максимальный размер диапазона
const rangeChangeInterval = 3000; // Как часто генерировать новые диапазоны (миллисекунды)

// **Настройки генерации наборов задержек**
const minDelaySeconds = 0.1;    // Минимально возможная задержка (секунды)
const maxDelaySeconds = 10;      // Максимально возможная задержка (секунды)
const minSetsCount = 2;         // Минимальное количество наборов задержек
const maxSetsCount = 5;         // Максимальное количество наборов задержек
const delaySetChangeInterval = 6000; // Как часто менять наборы задержек (миллисекунды)

// **Инициализация**
let delaySets = generateRandomDelaySets(); // Первичная генерация наборов задержек
const frequencyRanges = [      // Исходные диапазоны
    { min: 1500, max: 1600 },
    { min: 5000, max: 5500 },
    { min: 10000, max: 10100 }
];
let currentDelaySet = getRandomDelaySet();    // Текущий набор задержек

// **Функции**

function generateRandomRange() {
    const min = Math.floor(Math.random() * (maxFrequency - minFrequency - maxRangeSize)) + minFrequency;
    const rangeSize = Math.floor(Math.random() * (maxRangeSize - minRangeSize + 1)) + minRangeSize;
    const max = min + rangeSize;
    return { min: min, max: Math.min(max, maxFrequency) };
}

function updateFrequencyRanges() {
    for (let i = 0; i < frequencyRanges.length; i++) {
        frequencyRanges[i] = generateRandomRange();
    }
    console.log("Frequency ranges updated:", frequencyRanges);
}

function generateRandomDelaySet() {
    const min = Math.random() * maxDelaySeconds; // min может быть от 0 до maxDelaySeconds
    const max = min + Math.random() * (maxDelaySeconds - min);  // max должен быть больше min, но не больше maxDelaySeconds
    return { min: minDelaySeconds, max: maxDelaySeconds };
}

function generateRandomDelaySets() {
    const setsCount = Math.floor(Math.random() * (maxSetsCount - minSetsCount + 1)) + minSetsCount;
    const sets = [];
    for (let i = 0; i < setsCount; i++) {
        sets.push(generateRandomDelaySet());
    }
    return sets;
}

function updateDelaySets() {
    delaySets = generateRandomDelaySets();
    console.log("Delay sets updated:", delaySets);
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

    // Генерируем случайную задержку
    const delay = (Math.random() * (currentDelaySet.max - currentDelaySet.min) + currentDelaySet.min) * 1000;
    setTimeout(switchFrequency, delay);
}

// **Запуск**
updateFrequencyRanges();   // Инициализируем диапазоны
updateDelaySets();       // Инициализируем наборы задержек
changeDelaySet();        // Инициализируем текущий набор задержек

setInterval(updateFrequencyRanges, rangeChangeInterval); // Запускаем смену диапазонов
setInterval(updateDelaySets, delaySetChangeInterval); // Запускаем смену наборов задержек

switchFrequency(); // Запускаем основной цикл
