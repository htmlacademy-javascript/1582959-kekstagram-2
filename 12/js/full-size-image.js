import { isEscapeKey } from './util.js';

const COMMENTS_COUNT_STEP = 5;
let currentComments = [];
let startIndex = 0;

const fullSizeImage = document.querySelector('.big-picture');
const bigPictureImage = fullSizeImage.querySelector('.big-picture__img img');
const likesCount = fullSizeImage.querySelector('.likes-count');
const socialCaption = fullSizeImage.querySelector('.social__caption');
const closeButton = fullSizeImage.querySelector('.big-picture__cancel');
const bigPictureSocial = fullSizeImage.querySelector('.big-picture__social');
const socialComments = bigPictureSocial.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
const commentCount = bigPictureSocial.querySelector('.social__comment-count');
// const commentTotalCount = bigPictureSocial.querySelector('.social__comment-total-count');
// const commentShownCount = commentCount.querySelector('.social__comment-shown-count');
const commentsLoader = bigPictureSocial.querySelector('.comments-loader');

const onCloseButtonClick = () => closeBigImage();

// Закрытие по esc
const onDocumentKeydown = (evt) => {
  const keyCode = evt.keyCode;
  if (isEscapeKey(keyCode)) {
    evt.preventDefault();
    closeBigImage();
  }
};

// Создаёт комментарии
const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const newComment = socialComment.cloneNode(true);
    const userAvatar = newComment.querySelector('.social__picture');

    userAvatar.src = comment.avatar;
    userAvatar.alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;

    commentsFragment.appendChild(newComment);
  });
  return commentsFragment;
};

// Отрисовывает порцию коментариев
const renderNextComments = () => {
  const endIndex = Math.min(startIndex + COMMENTS_COUNT_STEP, currentComments.length);
  commentCount.textContent = `${endIndex} из ${currentComments.length} комментариев`;

  const newComments = currentComments.slice(startIndex, endIndex);
  const commentsPortion = renderComments(newComments);
  socialComments.appendChild(commentsPortion);

  if (currentComments.length <= endIndex) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  startIndex += COMMENTS_COUNT_STEP;
};

// Клик по кнопке "загрузить ещё"
const onCommentsLoaderClick = () => renderNextComments();

const renderFullPhoto = (miniatureData) => {
  bigPictureImage.src = miniatureData.url;
  bigPictureImage.alt = miniatureData.description;
  likesCount.textContent = miniatureData.likes;
  socialCaption.textContent = miniatureData.description;
  currentComments = miniatureData.comments;
};

// Открывает большое фото
const openBigImage = (miniatureData) => {

  fullSizeImage.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  renderFullPhoto(miniatureData);

  socialComments.innerHTML = '';

  startIndex = 0;
  renderNextComments();
};

// Закрывает большое фото
function closeBigImage() {
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  commentsLoader.classList.remove('hidden');
  fullSizeImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

export { openBigImage };
