import { createPhotos } from './data.js';
import { openBigImage } from './full-size-image.js';

const picturesContainer = document.querySelector('.pictures');
// const picture = picturesContainer.querySelector('.picture');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

const similarPhotos = createPhotos();

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

    pictureImage.addEventListener('click', () => openBigImage(id));

    photoFragment.append(pictureClone);
  });
  picturesContainer.append(photoFragment);
};

export { similarPhotos, renderMiniatures, openBigImage };
