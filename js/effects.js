const EFFECTS_DATA = {
  chrome:
  {
    filter: 'grayscale',
    values: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1,
    },
    unit: ''
  },

  sepia:
  {
    filter: 'sepia',
    values: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1,
    },
    unit: ''
  },

  marvin:
  {
    filter: 'invert',
    values: {
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1,
    },
    unit: '%'
  },

  phobos:
  {
    filter: 'blur',
    values: {
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1,
    },
    unit: 'px'
  },

  heat:
  {
    filter: 'brightness',
    values: {
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1,
    },
    unit: ''
  },

  none:
  {
    filter: '',
    values: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1,
    },
    unit: ''
  },
  default:
  {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    format: {
      to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
      from: (value) => parseFloat(value)
    },
    connect: 'lower'
  }
};

const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = effectLevel.querySelector('.effect-level__value');
const slider = effectLevel.querySelector('.effect-level__slider');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsContainer = document.querySelector('.effects__list');

const INITIAL_EFFECT = EFFECTS_DATA.none;

noUiSlider.create(slider, EFFECTS_DATA.default);

const hideSlider = () => {
  effectLevel.classList.add('hidden');
};

hideSlider();

const useDefaultEffect = () => {
  imagePreview.className = '';
  imagePreview.style = '';
  effectLevelValue.value = '';
  hideSlider();
};


const updateSlider = (filterName) => {
  slider.noUiSlider.on('update', () => {
    const filter = EFFECTS_DATA[filterName].filter;
    const unit = EFFECTS_DATA[filterName].unit;
    imagePreview.style.filter = '';

    if (filterName !== INITIAL_EFFECT) {
      const value = slider.noUiSlider.get();
      imagePreview.style.filter = `${filter}(${value}${unit})`;
      effectLevelValue.value = value;
    }
  });
};

const onEffectsContainerChange = (evt) => {
  const targetElement = evt.target.value;
  useDefaultEffect();
  if (targetElement !== INITIAL_EFFECT) {
    effectLevel.classList.remove('hidden');
    imagePreview.classList.add(`effects__preview--${targetElement}`);
    slider.noUiSlider.updateOptions(EFFECTS_DATA[targetElement].values);
    updateSlider(targetElement);
  }
};

const resetEffects = () => {
  effectsContainer.removeEventListener('change', onEffectsContainerChange);
  useDefaultEffect();
};

const addEffects = () => {
  effectsContainer.addEventListener('change', onEffectsContainerChange);
};

export { addEffects, resetEffects };
