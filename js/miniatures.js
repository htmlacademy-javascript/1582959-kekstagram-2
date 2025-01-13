import { createPhotos } from './data.js';

const picturesContainer = document.querySelector('.pictures');
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
    photoFragment.append(pictureClone);
  });
  picturesContainer.append(photoFragment);
};

export { renderMiniatures };
