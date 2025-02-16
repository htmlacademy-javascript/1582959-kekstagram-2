import { isEscapeKey } from './util.js';

const TIME_DATA_ERROR_MESSAGE = 5000;
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

let newSuccessMessage = '';
let newErrorMessage = '';

// Закрытие по esc
const onFormMessageKeydown = (evt) => {
  const keyCode = evt.keyCode;
  if (isEscapeKey(keyCode)) {
    evt.preventDefault();
    closeFormMessage();
  }
};

// Закрытие по клику на произвольную область экрана за пределами блока с сообщением
const onFormMessageClick = (evt) => {
  if (evt.target === newSuccessMessage || evt.target === newErrorMessage) {
    evt.preventDefault();
    closeFormMessage();
  }
};

// Скрыть сообщение
function closeFormMessage() {
  if (newSuccessMessage) {
    newSuccessMessage.remove();
  } else if (newErrorMessage) {
    newErrorMessage.remove();
  }

  document.removeEventListener('keydown', onFormMessageKeydown);
  document.removeEventListener('click', onFormMessageClick);
}

const onSuccessButtonClick = () => closeFormMessage();
const onErrorButtonClick = () => closeFormMessage();

// Добавить сообщение об успешной загрузке
const addSuccessMessage = () => {
  newSuccessMessage = successMessage.cloneNode(true);
  const successButton = newSuccessMessage.querySelector('.success__button');
  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onFormMessageKeydown);
  document.addEventListener('click', onFormMessageClick);
  document.body.append(newSuccessMessage);
};

// Добавить сообщение об ошибке загрузки
const addErrorMessage = () => {
  newErrorMessage = errorMessage.cloneNode(true);
  const errorButton = newErrorMessage.querySelector('.error__button');
  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onFormMessageKeydown);
  document.addEventListener('click', onFormMessageClick);
  document.body.append(newErrorMessage);
};

const addDataErrorMessage = () => {
  const dataErrorMessage = document.querySelector('#data-error').content.querySelector('.data-error');
  const newDataErrorMessage = dataErrorMessage.cloneNode(true);
  document.body.append(newDataErrorMessage);

  setTimeout(() => {
    newDataErrorMessage.remove();
  }, TIME_DATA_ERROR_MESSAGE);
};

export { addErrorMessage, addSuccessMessage, addDataErrorMessage };
