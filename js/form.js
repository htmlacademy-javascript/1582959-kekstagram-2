import { isEscapeKey } from './util.js';
import { resetImagePreviewScale } from './scale.js';
import { addEffects, resetEffects } from './effects.js';

const COMMENT_MAXLENGTH = 140;
const HASHTAGS_MAXQUANTITY = 5;
const VALID_HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const errorHashtagMessages = {
  commentMaxLengthError: `Длина комментария больше ${COMMENT_MAXLENGTH} символов`,
  hashtagCountError: 'Превышено количество хэштегов',
  invalidHashtagString: 'Введён невалидный хэштег',
  uniquenessError: 'Хэштеги повторяются'
};

let pristine = '';

const form = document.querySelector('.img-upload__form');
const imageLoader = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const closeLoader = form.querySelector('.img-upload__cancel');
const commentTextarea = overlay.querySelector('.text__description');
const hashtagInput = overlay.querySelector('.text__hashtags');

// Валидация комментариев
function validateComment(value) {
  return value.length <= COMMENT_MAXLENGTH;
}

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

  pristine.addValidator(commentTextarea, validateComment, errorHashtagMessages.commentMaxLengthError);
  pristine.addValidator(hashtagInput, validateHashtagSymbols, errorHashtagMessages.invalidHashtagString);
  pristine.addValidator(hashtagInput, validateHashtagCount, errorHashtagMessages.hashtagCountError);
  pristine.addValidator(hashtagInput, validateHashtagUniqueness, errorHashtagMessages.uniquenessError);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

form.addEventListener('submit', onFormSubmit);

// Закрытие по esc
const onDocumentKeydown = (evt) => {
  const keyCode = evt.keyCode;
  if (isEscapeKey(keyCode)) {
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
  addValidators();
  showEditForm();
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
