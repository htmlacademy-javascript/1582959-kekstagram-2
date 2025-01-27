import { isEscapeKey } from './util.js';

const fullSizeImage = document.querySelector('.big-picture');
const bigPictureImage = fullSizeImage.querySelector('.big-picture__img img');
const likesCount = fullSizeImage.querySelector('.likes-count');
const socialCaption = fullSizeImage.querySelector('.social__caption');
const closeButton = fullSizeImage.querySelector('.big-picture__cancel');
const bigPictureSocial = fullSizeImage.querySelector('.big-picture__social');
const socialComments = bigPictureSocial.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
const commentCount = bigPictureSocial.querySelector('.social__comment-count');
const commentTotalCount = bigPictureSocial.querySelector('.social__comment-total-count');
const commentShownCount = commentCount.querySelector('.social__comment-shown-count');
const commentsLoader = bigPictureSocial.querySelector('.comments-loader');

const COUNT_STEP = 5;
let currentCount = 0;

const onCloseButtonClick = () => closeBigImage();

// Закрытие по esc
const onDocumentKeydown = (evt) => {
  const keyCode = evt.keyCode;
  if (isEscapeKey(keyCode)) {
    evt.preventDefault();
    closeBigImage();
  }
};

// Клик по кнопке загрузить ещё
const onCommentsLoaderClick = () => renderNextComments();

// Создаёт комментарии
const renderComments = (comments) => {
  socialComments.innerHTML = '';
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP);

  renderedComments.forEach((comment) => {
    const newComment = socialComment.cloneNode(true);
    const userAvatar = newComment.querySelector('.social__picture');

    userAvatar.src = comment.avatar;
    userAvatar.alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;

    socialComments.appendChild(newComment);
  });
  renderNextComments();
};

function renderNextComments() {
  const nextComments = currentCount + COUNT_STEP;
  commentShownCount.textContent = `${nextComments}`;

  if (commentTotalCount.textContent < 5 || nextComments > commentTotalCount.textContent) {
    commentShownCount.textContent = commentTotalCount.textContent;
  }

  if (nextComments >= commentTotalCount.textContent) {
    commentsLoader.classList.add('hidden');
  }
  currentCount += COUNT_STEP;
}

// Открывает большое фото
const openBigImage = (miniatureData) => {
  bigPictureImage.src = miniatureData.url;
  bigPictureImage.alt = miniatureData.description;
  likesCount.textContent = miniatureData.likes;
  socialCaption.textContent = miniatureData.description;
  commentTotalCount.textContent = miniatureData.comments.length;

  fullSizeImage.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  renderComments(miniatureData.comments);
};

// Закрывает большое фото
function closeBigImage() {
  currentCount = 0;
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  fullSizeImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

export { openBigImage };
