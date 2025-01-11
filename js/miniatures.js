import { createPhotos } from './data.js';

const picturesContainer = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

const similarPhotos = createPhotos();
const photoFragment = document.createDocumentFragment();

similarPhotos.forEach(({ url, description, likes, comments }) => {
  const pictureClone = templatePicture.cloneNode(true);
  pictureClone.querySelector('.picture__img').src = url;
  pictureClone.querySelector('.picture__img').alt = description;
  pictureClone.querySelector('.picture__likes').textContent = likes;
  pictureClone.querySelector('.picture__comments').textContent = comments.length;
  photoFragment.append(pictureClone);
});

picturesContainer.append(photoFragment);

export { similarPhotos };
