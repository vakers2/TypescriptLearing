import formatString from "./stringFormatter";

const stringInput = document.getElementById('inputString') as HTMLInputElement;
const formattedStringInput = document.getElementById('formattedString') as HTMLTextAreaElement;

stringInput.addEventListener('change', () => {
  formattedStringInput.value = formatString(stringInput.value);
})


