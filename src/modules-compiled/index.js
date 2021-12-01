import formatString, { StringRowFormattingType, parseFormatType } from "./stringFormatter.js";
var stringInput = document.getElementById('inputString');
var rowFormattingType = document.getElementById('rowFormattingType');
var formattedStringInput = document.getElementById('formattedString');
stringInput.addEventListener('change', function () {
    formattedStringInput.value = formatString(stringInput.value, 10, 3, parseFormatType(rowFormattingType.value) || StringRowFormattingType.WrapByWord);
});
