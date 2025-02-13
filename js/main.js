// import { createPhotos } from './data.js';
import { renderMiniatures } from './miniatures.js';
import { getData } from './api.js';
import './form.js';
import { addDataErrorMessage } from './form-messages.js';

getData()
  .then((data) => renderMiniatures(data))
  .catch(() => {
    addDataErrorMessage();
  });

