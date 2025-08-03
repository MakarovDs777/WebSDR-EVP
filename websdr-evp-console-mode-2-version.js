setInterval(function() {
    const frequencyInput = document.querySelector('input[name="frequency"]');
    if (!frequencyInput) {
        console.error('Frequency input element not found.');
        return;
    }

    const min = 2000;
    const max = 15000;
    const frequency = Math.floor(Math.random() * (max - min + 1)) + min;

    frequencyInput.value = frequency;
    frequencyInput.dispatchEvent(new Event('input', { bubbles: true }));

    // Можно оставить или убрать, в зависимости от необходимости
    frequencyInput.dispatchEvent(new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        which: 13
    }));
}, 100);
