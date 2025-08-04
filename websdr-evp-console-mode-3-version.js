setInterval(function switchFrequency() {
  const frequencyInput = document.querySelector('input[name="frequency"]');
  if (!frequencyInput) {
    console.error('Frequency input element not found.');
    return;
  }

  // **Ваш набор радиочастот**
  const frequencies = [1500, 2000, 2300, 2750, 3100, 3500, 3850, 4200, 4550, 4900]; // Добавьте ваши значения

  // Случайный выбор радиочастоты из массива
  const randomIndex = Math.floor(Math.random() * frequencies.length);
  const frequency = frequencies[randomIndex];

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

}, 1000);
