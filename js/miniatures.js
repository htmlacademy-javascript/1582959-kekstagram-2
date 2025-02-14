import { openBigImage } from './full-size-image.js';

const picturesContainer = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

const renderMiniatures = (similarPhotos) => {
  const photoFragment = document.createDocumentFragment();

  similarPhotos.forEach(({ url, description, likes, comments, id }) => {
    const onPictureClick = (evt) => {
      evt.preventDefault();
      const miniatureData = similarPhotos.find((photo) => photo.id.toString() === evt.currentTarget.dataset.id);
      if (miniatureData) {
        openBigImage(miniatureData);
      }
    };
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
