// Buttons
const encryptButton = document.getElementById("encrypt-it");
const resetButton = document.getElementById("reset");

// Inputs
const inputTextArea = document.getElementById("input-text");
const shiftAmountInput = document.getElementById("shift-amount");
const allCapsCheckbox = document.getElementById("all-caps");

// Options
const cipherTypeSelect = document.getElementById("cipher-type");
const fontSizeRadioButtons = document.querySelectorAll(
  'input[name="text-size"]'
);

// Result
const resultParagraph = document.getElementById("result");

// Encryption function
function encrypt() {
  let result = inputTextArea.value;
  const shiftAmount = parseInt(shiftAmountInput.value);

  if (cipherTypeSelect.value === "shift") {
    result = shiftCipher(result, shiftAmount);
  } else {
    result = randomCipher(result);
  }

  if (allCapsCheckbox.checked) {
    result = result.toUpperCase();
  }

  let fontSize;
  for (let i = 0; i < fontSizeRadioButtons.length; i++) {
    if (fontSizeRadioButtons[i].checked) {
      fontSize = fontSizeRadioButtons[i].value;
      break;
    }
  }
  resultParagraph.style.fontSize = fontSize;
  resultParagraph.textContent = result;
}

// Reset function
function reset() {
  inputTextArea.value = "";
  shiftAmountInput.value = 0;
  allCapsCheckbox.checked = false;
  fontSizeRadioButtons[0].checked = true;
  resultParagraph.style.fontSize = "12pt";
  resultParagraph.textContent = "";
}

// Shift Cipher encryption function
function shiftCipher(text, shiftAmount) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    if (charCode >= 97 && charCode <= 122) {
      charCode = ((charCode - 97 + shiftAmount) % 26) + 97;
    } else if (charCode >= 65 && charCode <= 90) {
      charCode = ((charCode - 65 + shiftAmount) % 26) + 65;
    }
    result += String.fromCharCode(charCode);
  }
  return result;
}

// Random Cipher encryption function
function randomCipher(message) {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let cipher = "";
  for (let i = 0; i < message.length; i++) {
    const char = message[i];
    const index = alphabet.indexOf(char);
    if (index !== -1) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      const randomChar = alphabet[randomIndex];
      cipher += randomChar;
    } else {
      cipher += char;
    }
  }
  return cipher;
}

// Click events for buttons
encryptButton.addEventListener("click", encrypt);
resetButton.addEventListener("click", reset);
