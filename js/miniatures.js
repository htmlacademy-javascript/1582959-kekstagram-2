import { createPhotos } from './data.js';
import { openBigImage } from './full-size-image.js';

const picturesContainer = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

const similarPhotos = createPhotos();

const onPictureClick = (evt) => {
  evt.preventDefault();
  const id = evt.currentTarget.dataset.id;
  const miniatureData = similarPhotos.find((photo) => photo.id.toString() === id);
  if (miniatureData) {
    openBigImage(miniatureData);
  }
};

const renderMiniatures = () => {
  const photoFragment = document.createDocumentFragment();

  similarPhotos.forEach(({ url, description, likes, comments, id }) => {
    const picture = templatePicture.cloneNode(true);
    const pictureImage = picture.querySelector('.picture__img');
    pictureImage.src = url;
    pictureImage.alt = description;
    picture.dataset.id = id;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.addEventListener('click', onPictureClick);
    photoFragment.append(picture);
  });
  picturesContainer.append(photoFragment);
};

export { renderMiniatures };
