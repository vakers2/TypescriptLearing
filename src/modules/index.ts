import formatString, { parseFormatType } from "./stringFormatter.js";

const stringInput = document.getElementById('inputString') as HTMLInputElement;
const rowFormattingType = document.getElementById('rowFormattingType') as HTMLSelectElement;
const formattedStringInput = document.getElementById('formattedString') as HTMLTextAreaElement;

stringInput.addEventListener('change', () => {
  formattedStringInput.value = formatString(stringInput.value, 10, 3, parseFormatType(rowFormattingType.value));
})


