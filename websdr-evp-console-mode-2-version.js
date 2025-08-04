setInterval(function switchFrequency() {
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
  frequencyInput.dispatchEvent(new Event('change', { bubbles: true }));

  const form = frequencyInput.closest('form');
  if (form) {
    form.requestSubmit(); 
  } else {
    console.warn('No form found containing the frequency input.  Cannot submit.');
  }

}, 100);
