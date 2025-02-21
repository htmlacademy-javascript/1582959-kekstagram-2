import { isEscapeKey } from './util.js';
import { initScale, resetImagePreviewScale } from './scale.js';
import { addEffects, resetEffects } from './effects.js';
import { addErrorMessage, addSuccessMessage } from './form-messages.js';
import { sendData } from './api.js';
import { uploadFile } from './upload-photo.js';

const COMMENT_MAXLENGTH = 140;
const HASHTAGS_MAXQUANTITY = 5;
const VALID_HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorHashtagMessages = {
  commentMaxLengthError: `Длина комментария больше ${COMMENT_MAXLENGTH} символов`,
  hashtagCountError: 'Превышено количество хэштегов',
  invalidHashtagString: 'Введён невалидный хэштег',
  uniquenessError: 'Хэштеги повторяются'
};

const SubmitButtonText = {
  DEFAULT: 'Опубликовать',
  SENDING: 'Публикую...'
};

let pristine = '';

const form = document.querySelector('.img-upload__form');
const imageLoader = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const closeLoader = form.querySelector('.img-upload__cancel');
const commentTextarea = overlay.querySelector('.text__description');
const hashtagInput = overlay.querySelector('.text__hashtags');
const submitButton = overlay.querySelector('.img-upload__submit');

// Валидация комментариев
const validateComment = (value) => value.length <= COMMENT_MAXLENGTH;

// Валидация хэштегов
const getHashtags = (value) => value.toLowerCase().split(' ').filter(Boolean);

const validateHashtagSymbols = (value) => getHashtags(value).every((hashtag) => VALID_HASHTAG_SYMBOLS.test(hashtag));

const validateHashtagCount = (value) => getHashtags(value).length <= HASHTAGS_MAXQUANTITY;

const validateHashtagUniqueness = (value) => {
  const tags = getHashtags(value);
  return tags.length === new Set(tags).size;
};

const addValidators = () => {

  pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error'
  }, false);

  pristine.addValidator(commentTextarea, validateComment, ErrorHashtagMessages.commentMaxLengthError);
  pristine.addValidator(hashtagInput, validateHashtagSymbols, ErrorHashtagMessages.invalidHashtagString);
  pristine.addValidator(hashtagInput, validateHashtagCount, ErrorHashtagMessages.hashtagCountError);
  pristine.addValidator(hashtagInput, validateHashtagUniqueness, ErrorHashtagMessages.uniquenessError);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.DEFAULT;
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(form);
  if (pristine.validate()) {
    blockSubmitButton();
    sendData(formData)
      .then(() => {
        addSuccessMessage();
        closeEditForm();
      })
      .catch(() => {
        addErrorMessage();
      })
      .finally(unblockSubmitButton);
  }
};

form.addEventListener('submit', onFormSubmit);

// Закрытие по esc
const onDocumentKeydown = (evt) => {
  const keyCode = evt.keyCode;
  const errorMessage = document.querySelector('.error');
  if (isEscapeKey(keyCode) && !errorMessage) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === commentTextarea) {
      evt.stopPropagation();
    } else {
      closeEditForm();
    }
  }
};

const onCloseLoaderClick = () => closeEditForm();

// Открывает форму загрузки
const showEditForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeLoader.addEventListener('click', onCloseLoaderClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const onImageLoaderChange = () => {
  addEffects();
  initScale();
  addValidators();
  showEditForm();
  uploadFile(imageLoader);
};

imageLoader.addEventListener('change', onImageLoaderChange);

// Закрывает форму загрузки
function closeEditForm() {
  form.reset();
  pristine.reset();
  resetImagePreviewScale();
  resetEffects();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeLoader.removeEventListener('click', onCloseLoaderClick);
}
