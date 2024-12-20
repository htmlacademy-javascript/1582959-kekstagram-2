const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Иван Петров',
  'Хуан Себастьян',
  'Мария Шарапова',
  'Кристина Агилера',
  'Виктор Иванов',
  'Юлия Грибова',
  'Люпита Люпита',
  'Джордж Вашингтон',
  'Игорь Сергеевич',
  'Марина Игнатова',
  'Мигель',
  'Анна Антонова'
];

const PHOTO_DESCRIPTION_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createRandomId(min, max) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatePhotoId = createRandomId(1, 25);
const generateAvatarId = createRandomId(1, 1000);

const createPhotoDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${getRandomInteger(1, 25)}.jpg`,
  description: 'Посмотри, какое фото получилось!',
  likes: getRandomInteger(15, 200),
  comments:
  {
    id: generateAvatarId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
    name: NAMES[getRandomInteger(0, NAMES.length - 1)]
  }
});

const photoDescription = Array.from({ length: PHOTO_DESCRIPTION_COUNT }, createPhotoDescription);

console.log(photoDescription);
