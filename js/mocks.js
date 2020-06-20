'use strict';

(function () {
  var TOTAL_PHOTOS = 25;
  var MIN_AVATARS_COUNT = 1;
  var MAX_AVATARS_COUNT = 6;
  var MIN_RANDOM_COMMENTS_COUNT = 3;
  var MAX_RANDOM_COMMENTS_COUNT = 8;
  var MIN_LIKES_COUNT = 15;
  var MAX_LIKES_COUNT = 200;
  var MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var DESCRIPTIONS = [
    'Кадр из телепрограммы "Загадка дыры".',
    'Момент похищения человека инопланетной тарелкой и вилкой.',
    'Кто-нибудь знает что это такое?',
    'Мне подарили ежа.',
    'Шушпанчик читает шушпанишаду.',
    'Этот человек стоял слишком близко, мне пришлось в него плюнуть (фото размыто, эффект движения).',
    'Мой дедушка-массон на традиционном пятничном ритуальном собрании.',
    'Кажется оно летит прямо на нас.'
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

  function getRandomAvatar() {
    return 'img/avatar-' + window.utils.getRandomInteger(MIN_AVATARS_COUNT, MAX_AVATARS_COUNT) + '.svg';
  }

  function getRandomMessage() {
    return window.utils.getRandomElement(MESSAGES);
  }

  function getRandomName() {
    return window.utils.getRandomElement(NAMES);
  }

  function getRandomComments() {
    var comments = [];
    var randomCommentsCount = window.utils.getRandomInteger(MIN_RANDOM_COMMENTS_COUNT, MAX_RANDOM_COMMENTS_COUNT);

    for (var i = 0; i < randomCommentsCount; i++) {
      comments.push({
        avatar: getRandomAvatar(),
        message: getRandomMessage(),
        name: getRandomName()
      });
    }
    return comments;
  }

  function createPhotoUrl(id) {
    return 'photos/' + id + '.jpg';
  }

  function getRandomDescription() {
    return window.utils.getRandomElement(DESCRIPTIONS);
  }

  function getRandomLikesCount() {
    return window.utils.getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT);
  }

  window.mocks = {
    getPhotos: function () {
      var pictures = [];

      for (var i = 1; i <= TOTAL_PHOTOS; i++) {
        pictures.push({
          url: createPhotoUrl(i),
          description: getRandomDescription(),
          likes: getRandomLikesCount(),
          comments: getRandomComments()
        });
      }

      return pictures;
    }
  };
})();
