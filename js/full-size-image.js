import { isEscapeKey } from './util.js';
import { picturesContainer, similarPhotos } from './miniatures';

const fullSizeImage = document.querySelector('.big-picture');
const bigPictureImage = fullSizeImage.querySelector('.big-picture__img img');
const likesCount = fullSizeImage.querySelector('.likes-count');
const socislCaption = fullSizeImage.querySelector('.social__caption');
const buttonCancelBigImage = fullSizeImage.querySelector('.big-picture__cancel');
const bigPictureSocial = document.querySelector('.big-picture__social');
const commentCount = document.querySelector('.social__comment-count');
const commentTotalCount = commentCount.querySelector('.social__comment-total-count');
// const commentShownCount = commentCount.querySelector('.social__comment-shown-count');
const socialComments = document.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');

// Закрытие по esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigImage();
  }
};


// Создаёт комментарии
const renderComments = (comments) => {
  comments.forEach(({ avatar, name, message }) => {
    const newComment = socialComment.cloneNode(true);
    const userAvatar = newComment.querySelector('.social__picture');

    userAvatar.src = avatar;
    userAvatar.alt = name;
    newComment.querySelector('.social__text').textContent = message;

    socialComments.appendChild(newComment);
  });
};

// Данные фотографий
const addPhotoData = ({ url, description, likes, comments}) => {
  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  likesCount.textContent = likes;
  socislCaption.textContent = description;
  commentTotalCount.textContent = comments.length;
  renderComments(comments);
};

// Открывает большое фото
function openBigImage() {
  socialComments.innerHTML = '';

  fullSizeImage.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  commentCount.classList.add('hidden');
  bigPictureSocial.querySelector('.comments-loader').classList.add('hidden');
  addPhotoData(similarPhotos);
}

// Закрывает большое фото
function closeBigImage() {
  fullSizeImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

// Клик по миниатюре
picturesContainer.addEventListener('click', openBigImage);

// Клик по крестику
buttonCancelBigImage.addEventListener('click', closeBigImage);

export { openBigImage };
