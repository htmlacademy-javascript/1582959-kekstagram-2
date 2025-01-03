import { createPhotos } from './data.js';

const picturesContainer = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

const similarPhotos = createPhotos();
const photoFragment = document.createDocumentFragment();

similarPhotos.forEach((photo) => {
  const pictureClone = templatePicture.cloneNode(true);
  const image = pictureClone.querySelector('.picture__img');
  image.src = photo.url;
  image.alt = photo.description;
  pictureClone.querySelector('.picture__likes').textContent = photo.likes;
  pictureClone.querySelector('.picture__comments').textContent = photo.comments.length;
  photoFragment.append(pictureClone);
});

picturesContainer.append(photoFragment);
