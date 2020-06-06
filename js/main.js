'use strict';

var OBJECT_COUNT = 25;
var AVATAR_COUNT = 6;
var MIN_VALUE = 1;
var MAX_VALUE = 2;
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTIONS = [
  'Где взять описание фотографии?',
  'Момент похищения человека инопланетной тарелкой и вилкой.',
  'Кто-нибудь знает что это такое?',
  'Мне подарили ежа.',
  'А это пень.',
  'Этот человек стоял слишком близко, мне пришлось в него плюнуть (фото размыто, эффект движения).',
  'Мой дедушка-массон на традиционном пятничном ритуальном собрании.',
  'Я всё ещё не поняла где взять описание.'
];
var NAMES = [
  'Никодим',
  'Агапия',
  'Харитон',
  'Платонида',
  'Гвидо',
  'Фекла',
  'Бернард',
  'Авдотья'
];
var LIKES = {
  min: 15,
  max: 200
};

function getRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomElement(elements) {
  var randomItemIndex = getRandomInteger(0, elements.length - 1);
  return elements[randomItemIndex];
}
// Функция генерации случайных данный должна быть одна? Я использовала по отдельности обе вышенаписанные функции, это ошибка?

function getRandomMessage(array) {
  var messagesArray = [];

  var messageLength = getRandomInteger(MIN_VALUE, MAX_VALUE);

  for (var i = 0; i < messageLength; i++) {
    messagesArray[i] = getRandomElement(array);
    // В массиве может оказаться два одинаковых случайных числа. Необходимо сравнивать случайные чмсла через условие?
  }
  return messagesArray;
}

var commentsArray = [];
var descriptionPhotoArray = [];

for (var i = 0; i < OBJECT_COUNT; i++) {
  commentsArray.push({
    avatar: 'img/avatar' + getRandomInteger(MIN_VALUE, AVATAR_COUNT) + '.svg',
    message: getRandomMessage(MESSAGES),
    name: getRandomElement(NAMES)
  });

  descriptionPhotoArray.push({
    url: 'photos/' + (i + MIN_VALUE) + '.jpg',
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomInteger(LIKES.min, LIKES.max),
    comments: getRandomElement(commentsArray)
  });
}

var similarPictureTemplate = document.querySelector('#picture')
.content
.querySelector('.picture');

function createPictureElement(picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length; // Как сделать так, чтобы показывалась длина, то есть число?

  return pictureElement;
}

var similarPhotos = document.querySelector('.pictures');

function addPhotos() {
  var fragment = document.createDocumentFragment();

  for (var photoIndex = 0; photoIndex < descriptionPhotoArray.length; photoIndex++) {
    fragment.appendChild(createPictureElement(descriptionPhotoArray[photoIndex]));
  }

  similarPhotos.appendChild(fragment);
}

addPhotos();
