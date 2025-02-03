import { isEscapeKey } from './util.js';
import { resetImagePreviewScale } from './scale.js';

const COMMENT_MAXLENGTH = 140;
const HASHTAGS_MAXQUANTITY = 5;
const HASHTAG_MAXLENGTH = 20;
const VALID_HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]+$/i;

const errorHashtagMessages = {
  commentMaxLengthError: `Максимальная длина комментария ${COMMENT_MAXLENGTH} символов`,
  hashtagMaxLengthError: `Максимальная длина хэштега ${HASHTAG_MAXLENGTH} символов`,
  hashtagCountError: `Нельзя указать больше ${HASHTAGS_MAXQUANTITY} хэштегов`,
  invalidHashtagString: 'Хэштег должен начинаться с #, состоять из букв и чисел без пробелов и не может состоять только из одной решётки',
  uniquenessError: 'Хэштеги не должны повторяться'
};

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

// Валидация хештегов
const getHashtags = (value) => value.toLowerCase().split(' ').filter(Boolean);

const validateHashtagSymbols = (value) => getHashtags(value).every((hashtag) => VALID_HASHTAG_SYMBOLS.test(hashtag));

const validateHashtagCount = (value) => getHashtags(value).length <= HASHTAGS_MAXQUANTITY;

const validateHashtagLength = (value) => !value || getHashtags(value).every((hashtag) => hashtag.length <= HASHTAG_MAXLENGTH);

const validateHashtagUniqueness = (value) => {
  const tags = getHashtags(value);
  return tags.length === new Set(tags).size;
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
}, false);

pristine.addValidator(commentTextarea, validateComment, errorHashtagMessages.commentMaxLengthError);
pristine.addValidator(hashtagInput, validateHashtagLength, errorHashtagMessages.hashtagMaxLengthError);
pristine.addValidator(hashtagInput, validateHashtagSymbols, errorHashtagMessages.invalidHashtagString);
pristine.addValidator(hashtagInput, validateHashtagCount, errorHashtagMessages.hashtagCountError);
pristine.addValidator(hashtagInput, validateHashtagUniqueness, errorHashtagMessages.uniquenessError);

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

const onImageLoaderChange = () => showEditForm();

imageLoader.addEventListener('change', onImageLoaderChange);

// Закрывает форму загрузки
function closeEditForm() {
  form.reset();
  pristine.reset();
  resetImagePreviewScale();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeLoader.removeEventListener('click', onCloseLoaderClick);
}
