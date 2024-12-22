const MIN_VALUE = 1;
const MAX_PHOTO_ID = 25;
const MAX_AVATAR_ID = 1000;
const MAX_AVATAR_VALUE = 6;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;

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

const DESCRIPTION = 'Посмотри, какое фото получилось!';

const PHOTO_DESCRIPTION_COUNT = 25;


const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createId(min, max) {
  let currentValue = min - 1;
  return function addValue() {
    if (currentValue <= max) {
      currentValue++;
    }
    return currentValue;
  };
}

const generatePhotoId = createId(MIN_VALUE, MAX_PHOTO_ID);
const generatePhotoUrl = createId(MIN_VALUE, MAX_PHOTO_ID);
const generateAvatarId = createId(MIN_VALUE, MAX_AVATAR_ID);

const createComments = () => ({
  id: generateAvatarId(),
  avatar: `img/avatar-${getRandomInteger(MIN_VALUE, MAX_AVATAR_VALUE)}.svg`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
});

const createPhotoDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: DESCRIPTION,
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from({ length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS) }, createComments)
});

Array.from({ length: PHOTO_DESCRIPTION_COUNT }, createPhotoDescription);
