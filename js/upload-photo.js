import { imagePreview } from './effects.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const effectsPreview = document.querySelectorAll('.effects__preview');

const uploadFile = (fileChooser) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const imageUrl = URL.createObjectURL(file);
    imagePreview.src = imageUrl;

    effectsPreview.forEach((filter) => {
      filter.style.backgroundImage = `url("${imageUrl}")`;
    });
  }
};

export { uploadFile };
