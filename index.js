import formatString from "./stringFormatter";
var stringInput = document.getElementById('inputString');
var formattedStringInput = document.getElementById('formattedString');
stringInput.addEventListener('change', function () {
    formattedStringInput.value = formatString(stringInput.value);
});
