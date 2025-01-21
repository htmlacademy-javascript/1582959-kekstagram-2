const keyboardButtons = {
  ESCAPE: 27,
};

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createId(min, max) {
  let currentValue = min - 1;
  return function addValue() {
    if (currentValue <= max) {
      currentValue++;
    }
    return currentValue;
  };
}

const isEscapeKey = (keyCode) => keyCode === keyboardButtons.ESCAPE;

export { getRandomInteger, createId, isEscapeKey };
