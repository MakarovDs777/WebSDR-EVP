// Наборы задержек (минимум и максимум в секундах)
const delaySets = [
  { min: 100, max: 1000 },  // Первый набор задержек
  { min: 100, max: 300 },   // Второй набор задержек
  { min: 500, max: 750 }    // Третий набор задержек (добавьте сколько нужно)
];

// Интервал смены набора задержек (в секундах)
const delaySetChangeInterval = 3000; // Каждые 60 секунд

// Переменная для хранения текущего набора задержек
let currentDelaySet = getRandomDelaySet();

function getRandomDelaySet() {
  const randomIndex = Math.floor(Math.random() * delaySets.length);
  return delaySets[randomIndex];
}


function switchFrequency() {
  const frequencyInput = document.querySelector('input[name="frequency"]');
  if (!frequencyInput) {
    console.error('Frequency input element not found.');
    return;
  }

  const frequency = Math.floor(Math.random() * 30000);
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

  // Генерируем случайную задержку
  const delay = Math.floor(Math.random() * (currentDelaySet.max - currentDelaySet.min + 1)) + currentDelaySet.min;

  // Запускаем switchFrequency еще раз с новой задержкой. Переводим задержку в милисекунды.
  setTimeout(switchFrequency, delay);
}

// Функция для смены набора задержек
function changeDelaySet() {
  currentDelaySet = getRandomDelaySet();
  console.log('Delay set changed to:', currentDelaySet); // Для отладки
}

// Запускаем setInterval для смены набора задержек
setInterval(changeDelaySet, delaySetChangeInterval);

// Первый запуск функции
switchFrequency();
