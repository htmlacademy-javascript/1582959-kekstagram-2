import { isEscapeKey } from './util.js';
import { similarPhotos } from './miniatures';

const fullSizeImage = document.querySelector('.big-picture');
const bigPictureImage = fullSizeImage.querySelector('.big-picture__img img');
const likesCount = fullSizeImage.querySelector('.likes-count');
const socialCaption = fullSizeImage.querySelector('.social__caption');
const closeButton = fullSizeImage.querySelector('.big-picture__cancel');
const bigPictureSocial = document.querySelector('.big-picture__social');
const commentCount = document.querySelector('.social__comment-count');
const commentTotalCount = commentCount.querySelector('.social__comment-total-count');
// const commentShownCount = commentCount.querySelector('.social__comment-shown-count');
const socialComments = document.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
const commentsLoader = bigPictureSocial.querySelector('.comments-loader');

// Закрытие по esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigImage();
  }
};

// Создаёт комментарии
const renderComments = (comments) => {
  socialComments.innerHTML = '';
  comments.forEach((comment) => {
    const newComment = socialComment.cloneNode(true);
    const userAvatar = newComment.querySelector('.social__picture');

    userAvatar.src = comment.avatar;
    userAvatar.alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;

    socialComments.appendChild(newComment);
  });
};

// Открывает большое фото
const openBigImage = (id) => {
  const miniatureData = similarPhotos.find((photo) => photo.id === id);

  bigPictureImage.src = miniatureData.url;
  bigPictureImage.alt = miniatureData.description;
  likesCount.textContent = miniatureData.likes;
  socialCaption.textContent = miniatureData.description;
  commentTotalCount.textContent = miniatureData.comments.length;

  fullSizeImage.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  renderComments(miniatureData.comments);
};

// Закрывает большое фото
function closeBigImage () {
  fullSizeImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

// Клик по крестику
closeButton.addEventListener('click', closeBigImage);

export { openBigImage };
