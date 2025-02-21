import { renderMiniatures, clearPhotos } from './miniatures.js';
import { debounce, shuffleArray } from './util.js';

const MAX_SHUFFLED_PHOTOS = 10;
const TIMEOUT_DELAY = 500;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterBlock = document.querySelector('.img-filters');

const sortByComments = (firstImage, secondImage) => secondImage.comments.length - firstImage.comments.length;

const showFilterBlock = () => filterBlock.classList.remove('img-filters--inactive');

let currentButton = filterBlock.querySelector('#filter-default');


const getSortedData = (data) => {

  if (currentButton.id === Filter.RANDOM) {
    return shuffleArray(data.slice()).slice(0, MAX_SHUFFLED_PHOTOS);
  }
  if (currentButton.id === Filter.DISCUSSED) {
    return data.slice().sort(sortByComments);
  }
  return data;
};

const setFilterButtonClick = (cb) => {
  const onFilterBlockClick = debounce((evt) => {
    const target = evt.target.closest('.img-filters__button');
    if (!target || target === currentButton) {
      return;
    }
    if (currentButton) {
      currentButton.classList.remove('img-filters__button--active');
    }
    currentButton = target;
    currentButton.classList.add('img-filters__button--active');
    clearPhotos();
    renderMiniatures(getSortedData(cb()));
  }, TIMEOUT_DELAY);
  filterBlock.addEventListener('click', onFilterBlockClick);
};

const addSorting = (photos) => {
  showFilterBlock();
  setFilterButtonClick(() => photos);
};

export { addSorting };
