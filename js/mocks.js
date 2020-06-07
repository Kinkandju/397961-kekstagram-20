'use strict';

var MIN_PICTURES_COUNT = 1;
var MAX_PICTURES_COUNT = 25;
var MIN_AVATARS_COUNT = 1;
var MAX_AVATARS_COUNT = 6;
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
var MIN_LIKES_COUNT = 15;
var MAX_LIKES_COUNT = 200;

function getRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomElement(elements) {
  var randomItemIndex = getRandomInteger(0, elements.length - 1);
  return elements[randomItemIndex];
}

function getRandomAvatar() {
  return 'img/avatar' + getRandomInteger(MIN_AVATARS_COUNT, MAX_AVATARS_COUNT) + '.svg';
}

function getRandomMessage() {
  return getRandomElement(MESSAGES);
}

function getRandomName() {
  return getRandomElement(NAMES);
}

function getRandomComments() {
  var comments = [];

  for (var i = 0; i < MAX_PICTURES_COUNT; i++) {
    comments.push({
      avatar: getRandomAvatar(),
      message: getRandomMessage(),
      name: getRandomName()
    });
  }

  return getRandomInteger(0, comments.length);
}

function createPhotoUrl() {
  var photoUrls = [];

  for (var i = MIN_PICTURES_COUNT; i <= MAX_PICTURES_COUNT; i++) {
    photoUrls.push('photos/' + i + '.jpg');
  }

  return photoUrls[i];
}

function getRandomDescription() {
  return getRandomElement(DESCRIPTIONS);
}

function getRandomLikesCount() {
  return getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT);
}

window.photoDescriptions = [];

function getPhotos() {
  for (var i = 0; i < MAX_PICTURES_COUNT; i++) {
    window.photoDescriptions.push({
      url: createPhotoUrl(),
      description: getRandomDescription(),
      likes: getRandomLikesCount(),
      comments: getRandomComments()
    });
  }
}

getPhotos();
