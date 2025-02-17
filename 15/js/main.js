import { renderMiniatures } from './miniatures.js';
import { getData } from './api.js';
import './form.js';
import { addDataErrorMessage } from './form-messages.js';
import { addSorting } from './filter.js';

getData()
  .then((data) => {
    renderMiniatures(data);
    addSorting(data);
  })
  .catch(() => {
    addDataErrorMessage();
  });

