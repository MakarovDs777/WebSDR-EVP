// **Основные настройки**
const frequencyRanges = [  // Исходные диапазоны
    { min: 1500, max: 1600 },
    { min: 5000, max: 5500 },
    { min: 10000, max: 10100 }
];

const rangeChangeInterval = 30000; // Как часто генерировать новые диапазоны (миллисекунды)

// **Настройки генерации новых диапазонов**
const minFrequency = 1000;  // Минимально возможная частота
const maxFrequency = 30000; // Максимально возможная частота
const minRangeSize = 50;    // Минимальный размер диапазона
const maxRangeSize = 500;   // Максимальный размер диапазона


function generateRandomRange() {
    const min = Math.floor(Math.random() * (maxFrequency - minFrequency - maxRangeSize)) + minFrequency;
    const rangeSize = Math.floor(Math.random() * (maxRangeSize - minRangeSize + 1)) + minRangeSize;
    const max = min + rangeSize;

    // Убедимся что max не выходит за границы maxFrequency
    return { min: min, max: Math.min(max, maxFrequency) };
}


function updateFrequencyRanges() {
    for (let i = 0; i < frequencyRanges.length; i++) {
        frequencyRanges[i] = generateRandomRange();
    }
    console.log("Frequency ranges updated:", frequencyRanges);  // Для отладки
}

// Обновляем диапазоны через заданный интервал
setInterval(updateFrequencyRanges, rangeChangeInterval);


function switchFrequency() {
    const frequencyInput = document.querySelector('input[name="frequency"]');
    if (!frequencyInput) {
        console.error('Frequency input element not found.');
        return;
    }

    // Случайный выбор диапазона из массива
    const randomIndex = Math.floor(Math.random() * frequencyRanges.length);
    const selectedRange = frequencyRanges[randomIndex];

    // Генерация случайной частоты внутри выбранного диапазона
    const frequency = Math.floor(Math.random() * (selectedRange.max - selectedRange.min + 1)) + selectedRange.min;

    frequencyInput.value = frequency;

    // Запускаем события 'input' и 'change', чтобы обновить значения в системе
    frequencyInput.dispatchEvent(new Event('input', { bubbles: true }));
    frequencyInput.dispatchEvent(new Event('change', { bubbles: true }));

    // Попытка найти и отправить форму
    const form = frequencyInput.closest('form'); // Находим ближайшую форму
    if (form) {
        form.requestSubmit(); // Используем modern API если доступен
        // Альтернатива, если requestSubmit не работает:
        // form.submit();
    } else {
        console.warn('No form found containing the frequency input.  Cannot submit.');
    }
}


// Запускаем основной цикл переключения частот (сделаем его более медленным, чтобы дать время на смену диапазонов)
setInterval(switchFrequency, 1000);  // Переключаемся каждую секунду, например

// Инициализируем диапазоны при запуске
updateFrequencyRanges();
