import { isEscapeKey } from './util.js';

const COMMENT_MAXLENGTH = 14;
const HASHTAGS_MAXQUANTITY = 5;
const HASHTAG_MAXLENGTH = 20;
const VALID_HASHTAG_SYMBOLS = /^#[a-zа-я0-9]+$/i;

const errorHashtagMessages = {
  COMMENT_MAXLENGTH_ERROR: `Максимальная длина комментария ${COMMENT_MAXLENGTH} символов`,
  HASHTAG_MAXLENGTH_ERROR: `Максимальная длина хэштега ${HASHTAG_MAXLENGTH} символов`,
  HASHTAG_COUNT_ERROR: `Нельзя указать больше ${HASHTAGS_MAXQUANTITY} хэштегов`,
  INVALID_HASHTAG_STRING: 'Хэштег должен начинаться с #, состоять из букв и чисел без пробелов и не может состоять только из одной решётки',
  UNIQUENESS_ERROR: 'Хэштеги не должны повторяться'
};

const form = document.querySelector('.img-upload__form');
const imageLoader = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const closeLoader = form.querySelector('.img-upload__cancel');
const commentTextarea = overlay.querySelector('.text__description');
const hashtagInput = overlay.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

// Валидация комментариев
function validateComment(value) {
  return value.length <= COMMENT_MAXLENGTH;
}

pristine.addValidator(commentTextarea, validateComment, errorHashtagMessages.COMMENT_MAXLENGTH_ERROR);

// Валидация хештегов
const getHashtags = (value) => value.toLowerCase().trim().split(' ');

const validateHashtagSymbols = (value) => getHashtags(value).every((hashtag) => VALID_HASHTAG_SYMBOLS.test(hashtag));

const validateHashtagCount = (value) => getHashtags(value).length <= HASHTAGS_MAXQUANTITY;

const validateHashtagLength = (value) => !value || getHashtags(value).every((hashtag) => hashtag.length <= HASHTAG_MAXLENGTH);

const validateHashtagUniqueness = (value) => {
  const tags = getHashtags(value);
  return tags.length === new Set(tags).size;
};

pristine.addValidator(hashtagInput, validateHashtagLength, errorHashtagMessages.HASHTAG_MAXLENGTH_ERROR);
pristine.addValidator(hashtagInput, validateHashtagSymbols, errorHashtagMessages.INVALID_HASHTAG_STRING);
pristine.addValidator(hashtagInput, validateHashtagCount, errorHashtagMessages.HASHTAG_COUNT_ERROR);
pristine.addValidator(hashtagInput, validateHashtagUniqueness, errorHashtagMessages.UNIQUENESS_ERROR);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
}

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

const onImageLoaderChange = () => showEditForm();

imageLoader.addEventListener('change', onImageLoaderChange);

// Закрывает форму загрузки
function closeEditForm() {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeLoader.removeEventListener('click', onCloseLoaderClick);
}

// export { showEditForm };
