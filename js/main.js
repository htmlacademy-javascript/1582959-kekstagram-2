import { createPhotos } from './data.js';
import { renderMiniatures, openBigImage } from './miniatures.js';
renderMiniatures(createPhotos());
openBigImage();
