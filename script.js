const copyButton = document.getElementById('copy-button');
const copyIcon = document.getElementById('copy-icon');
const textbox = document.getElementById('textbox');

let newValue = textbox.value;

textbox.addEventListener('input', function() {
  newValue = textbox.value;
});

copyButton.addEventListener('click', function(event) {
  event.preventDefault();

  textbox.value = newValue;
  textbox.select();
  document.execCommand('copy');

  copyIcon.src = 'pictures/checkbox.png';

  // Senden des Wertes an den Server zur Speicherung
  fetch('/saveTextboxValue', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ value: newValue })
  })
    .then(response => {
      if (response.ok) {
        console.log('Textbox value saved on server.');
      } else {
        console.error('Error saving textbox value on server:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error saving textbox value on server:', error);
    });

  window.open('https://amzn.to/43yL7J4', '_blank');
});
