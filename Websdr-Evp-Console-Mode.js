function switchFrequency() { const frequencyInput = document.querySelector('input[name="frequency"]'); if (!frequencyInput) { console.error('Frequency input element not found.'); return; } const frequency = Math.floor(Math.random() * 30000); frequencyInput.value = frequency; frequencyInput.dispatchEvent(new Event('input', { bubbles: true })); frequencyInput.dispatchEvent(new Event('keydown', { bubbles: true, key: 'Enter', keyCode: 13 })); } setInterval(switchFrequency, 1000);