// Минимальная и максимальная задержка в секундах
const minDelaySeconds = 100;
const maxDelaySeconds = 1000;

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
  const delay = Math.floor(Math.random() * (maxDelaySeconds - minDelaySeconds + 1)) + minDelaySeconds;

  // Запускаем switchFrequency еще раз с новой задержкой. Переводим задержку в милисекунды.
  setTimeout(switchFrequency, delay);
}

// Первый запуск функции
switchFrequency();
