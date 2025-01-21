import { createPhotos } from './data.js';
import { openBigImage } from './full-size-image.js';

const picturesContainer = document.querySelector('.pictures');
const picture = picturesContainer.querySelector('.picture');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

const similarPhotos = createPhotos();

const onPictureImageClick = (evt) => {
  const id = evt.target.dataset.id;
  const miniatureData = similarPhotos.find((photo) => photo.id.toString() === id);
  if (miniatureData) {
    if (evt.target.closest('.picture')) {
      evt.preventDefault();
      openBigImage(miniatureData);
    }
  }
};

const renderMiniatures = () => {
  const photoFragment = document.createDocumentFragment();

  similarPhotos.forEach(({ url, description, likes, comments, id }) => {
    const pictureClone = templatePicture.cloneNode(true);
    const pictureImage = pictureClone.querySelector('.picture__img');
    pictureImage.src = url;
    pictureImage.alt = description;
    pictureImage.dataset.id = id;
    pictureClone.querySelector('.picture__likes').textContent = likes;
    pictureClone.querySelector('.picture__comments').textContent = comments.length;

    picturesContainer.addEventListener('click', onPictureImageClick);

    photoFragment.append(pictureClone);
  });
  picturesContainer.append(photoFragment);
};

export { renderMiniatures };
