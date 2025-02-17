import { imagePreview } from './effects.js';

const SCALE_CONTROL_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

// Функция для установки нового значения масштаба
function setScale(newValue) {
  if (newValue >= MIN_SCALE && newValue <= MAX_SCALE) {
    scaleControlValue.value = `${newValue}%`;
    imagePreview.style.transform = `scale(${newValue / 100})`;
  }
}

const onScaleControlSmallerClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  setScale(currentValue - SCALE_CONTROL_STEP);
};

const onScaleControlBiggerClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  setScale(currentValue + SCALE_CONTROL_STEP);
};

const initScale = () => {
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
};

const resetImagePreviewScale = () => {
  setScale(MAX_SCALE);
};

export { initScale, resetImagePreviewScale };
