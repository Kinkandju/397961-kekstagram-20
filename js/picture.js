'use strict';

var SCALE_STEP = 25;
var BASE_SCALE = 100;
var MAX_SCALE = 100;
var MAX_HASHTAGS = 5;
var MAX_HASHTAG_LENGTH = 20;

// var uploadFile = document.querySelector('#upload-file');
var uploadClose = document.querySelector('#upload-cancel');
var uploadImg = document.querySelector('.img-upload__overlay');
// var uploadForm = document.querySelector('.img-upload__form');
var uploadStart = document.querySelector('.img-upload__start');

var hashtagInput = document.querySelector('.text__hashtags');
var hashtagDescription = document.querySelector('.text__description');

var onEscPress = function (evt) {
  if (evt.key === 'Escape' && evt.target !== hashtagInput && evt.target !== hashtagDescription) {
    // Если при фокус находится в поле ввода хэш-тега или в поле ввода
    // комментария, при нажатии Esc появляется ещё одна вертикальная
    // полоса прокрутки, у элемента body удаляется класс modal-open.
    evt.preventDefault();

    closeSettings();
  }
};


// Если изображение выбирается второй раз
// подряд, то при уменьшении или увеличении масштаба происходит расчет от
// старого значения, которое было выбрано в первый раз.
// Например, при первом просмотре было выбрано 50%. При последующем
// просмотре в окне показано 100%, если нажать на + , то станет 75%.


var openSettings = function () {
  uploadImg.classList.remove('hidden');
  document.body.classList.add('modal-open');

  uploadEffectLevel.classList.add('hidden');
  scaleControl.value = '100%';
  picturePreview.style.transform = 'scale(1)';
  picturePreview.className = '';
  uploadPrewiew.style.filter = 'none';

  document.addEventListener('keydown', onEscPress);
};

var closeSettings = function () {
  uploadImg.classList.add('hidden');
  document.body.classList.remove('modal-open');

  hashtagInput = '';
  hashtagDescription = '';

  document.removeEventListener('keydown', onEscPress);
};

uploadStart.addEventListener('change', openSettings);
uploadClose.addEventListener('click', closeSettings);

// ---------------------------------------------------------------------------
// Модуль изменения масштаба загружаемого изображения
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControl = document.querySelector('.scale__control--value');
var picturePreview = document.querySelector('.img-upload__preview');

var baseScale = BASE_SCALE;

function resizePicture() {
  scaleControl.value = baseScale + '%';
  picturePreview.style.transform = 'scale(' + baseScale * 0.01 + ')';
}

var onControlSmallerClick = function () {
  if (baseScale > SCALE_STEP) {
    baseScale -= SCALE_STEP;
  }
  resizePicture();
};

var onControlBiggerClick = function () {
  if (baseScale < MAX_SCALE) {
    baseScale += SCALE_STEP;
  }
  resizePicture();
};

scaleControlSmaller.addEventListener('click', onControlSmallerClick);
scaleControlBigger.addEventListener('click', onControlBiggerClick);

// ---------------------------------------------------------------------------
// Модуль изменения фильтра загружаемого изображения
var uploadPrewiew = document.querySelector('.img-upload__preview img');
var uploadEffectLevel = document.querySelector('.img-upload__effect-level');
var effectLevelContainer = document.querySelector('.effect-level__value');
var effectLevel = effectLevelContainer.value;

var onFilterChange = function (evt) {
  uploadEffectLevel.classList.remove('hidden');
  uploadPrewiew.setAttribute('class', 'effects__preview--' + evt.target.value);

  var effect = '';

  switch (evt.target.value) {
    case 'chrome':
      effect = 'grayscale(' + effectLevel * 0.01 + ')';
      break;
    case 'sepia':
      effect = 'sepia(' + effectLevel * 0.01 + ')';
      break;
    case 'marvin':
      effect = 'invert(' + effectLevel + '%)';
      break;
    case 'phobos':
      effect = 'blur(' + effectLevel * 0.03 + 'px)';
      break;
    case 'heat':
      effect = 'brightness(' + effectLevel * 0.03 + ')';
      break;
    case 'none':
      uploadEffectLevel.classList.add('hidden');
      break;
  }

  uploadPrewiew.style.filter = effect;
};

var uploadEffects = document.querySelector('.img-upload__effects');
uploadEffects.addEventListener('change', onFilterChange);

var pin = document.querySelector('.effect-level__pin');
var levelLine = document.querySelector('.effect-level__line');

pin.addEventListener('mouseup', function (evt) {
  var totalEffectValue = levelLine.clientWidth;
  var currentSliderPosition = evt.target.offsetLeft;
  var effectValue = Math.floor((currentSliderPosition / totalEffectValue) * 100);
  effectLevelContainer.value = effectValue;
});

// ---------------------------------------------------------------------------
// Модуль валидации
var re = /^#[a-zA-Zа-яА-ЯёЁ0-9]*/i;

function parseHashtag(textHashtags) {
  return textHashtags.toLowerCase().split(' ');
}

function isHashtag(textHashtags) {
  for (var i = 0; i < textHashtags.length; i++) {
    if (!re.test(textHashtags[i])) {
      return false;
    }
  }
  return true;
}

function isOnlyLattice(textHashtags) {
  for (var i = 0; i < textHashtags.length; i++) {
    if (textHashtags[i].charAt(0) !== '#' || textHashtags[i].length === 1) {
      return true;
    }
  }
  return false;
}

function isGapsInside(textHashtags) {
  for (var i = 0; i < textHashtags.length; i++) {
    if (textHashtags[i].indexOf('#', 1) !== -1 || textHashtags[i] === '') {
      return true;
    }
  }
  return false;
}

function isHashtagsRepeat(textHashtags) {
  var valuesSoFar = Object.create(null);
  for (var i = 0; i < textHashtags.length; i++) {
    var value = textHashtags[i];
    if (value in valuesSoFar) {
      return true;
    }
    valuesSoFar[value] = true;
  }
  return false;
}

function maxHashtagLength(textHashtags, longHashtag) {
  for (var i = 0; i < textHashtags.length; i++) {
    if (textHashtags[i].length > longHashtag) {
      return true;
    }
  }
  return false;
}

function isMaxHashtags(textHashtags, maxHashtags) {
  return textHashtags.length > maxHashtags;
}

var validateHashtags = function () {
  var hashtags = parseHashtag(hashtagInput.value);

  if (!isHashtag(hashtags)) {
    hashtagInput.setCustomValidity('Хэш-тег написан неверно.');
  } else if (isOnlyLattice(hashtags)) {
    hashtagInput.setCustomValidity('Хэш-тег не может состоять из одного символа.');
  } else if (isGapsInside(hashtags)) {
    hashtagInput.setCustomValidity('Хэш-теги разделяются пробелами.');
  } else if (isHashtagsRepeat(hashtags)) {
    hashtagInput.setCustomValidity('Хэш-теги не должны повторяться.');
  } else if (maxHashtagLength(hashtags, MAX_HASHTAG_LENGTH)) {
    hashtagInput.setCustomValidity('Максимальная длина хэш-тега - ' + MAX_HASHTAG_LENGTH + ' символов.');
  } else if (isMaxHashtags(hashtags, MAX_HASHTAGS)) {
    hashtagInput.setCustomValidity('Не больше ' + MAX_HASHTAGS + ' хэш-тегов.');
  } else {
    hashtagInput.setCustomValidity('');
  }
};

hashtagInput.addEventListener('input', validateHashtags);
