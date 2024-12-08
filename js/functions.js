function getStringLength (string, maxLength) {
return (string.length <= maxLength) ? 'true' : 'false';
}


function isPalindrom (string) {
  string = string.toLowerCase();
  let newString = string.replaceAll(' ', '');
  let stringNew = '';
  for (let i = newString.length - 1; i >= 0; i--) {
    stringNew += newString[i];
  }
  return (stringNew === newString) ? true : false;
  }

