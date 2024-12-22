const getStringLength = (string, maxLength) => string.length <= maxLength;
getStringLength();


function findPalindrom(string) {
  const normalisedString = string.toLowerCase().replaceAll(' ', '');
  let newString = '';
  for (let i = normalisedString.length - 1; i >= 0; i--) {
    newString += normalisedString[i];
  }
  return (normalisedString === newString);
}
findPalindrom();


function findNumber(string) {
  let numbers = '';
  string = string.toString();
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      numbers += string[i];
    }
  }
  return parseInt(numbers, 10);
}
findNumber();
