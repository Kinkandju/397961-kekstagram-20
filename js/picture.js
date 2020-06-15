'use strict';

var SCALE_STEP = 25;
var BASE_SCALE = 100;
var MAX_SCALE = 100;
var MAX_HASHTAGS = 5;
var MAX_HASHTAG_LENGTH = 20;

var uploadStart = document.querySelector('.img-upload__start');
var uploadFile = document.querySelector('#upload-file');
var uploadClose = document.querySelector('#upload-cancel');
var uploadImg = document.querySelector('.img-upload__overlay');

var onEscPress = function (evt) {
  if (evt.key === 'Escape' && evt.target.class === 'text__hashtags') {
    evt.preventDefault();
    closeSettings();
  }
};

var openSettings = function () {
  uploadImg.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadEffectLevel.classList.add('hidden');
  resizePicture();

  document.addEventListener('keydown', onEscPress);
};

var closeSettings = function () {
  uploadImg.classList.add('hidden');
  uploadFile.value = '';
  scaleControl.value = BASE_SCALE;

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
var effectLevel = document.querySelector('.effect-level__value').value;
var uploadPrewiew = document.querySelector('.img-upload__preview img');
var uploadEffectLevel = document.querySelector('.img-upload__effect-level');

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
  document.querySelector('.effect-level__value').value = effectValue;
});

// ---------------------------------------------------------------------------
// Модуль валидации
var hashtagInput = document.querySelector('.text__hashtags');
var re = /^#[a-zA-Zа-яА-ЯёЁ0-9]*/i;

function parseHashtag(textHashtag) {
  return textHashtag.value.toLowerCase().split(' ');
}

function isHashtag(textHashtag) {
  return re.test(textHashtag);
}

function isOnlyLattice(textHashtag) {
  for (var i = 0; i < textHashtag.length; i++) {
    if (textHashtag[i].charAt(0) !== '#' || textHashtag[i].length === 1) {
      return true;
    }
  }
  return false;
}

function isGapsInside(textHashtag) {
  for (var i = 0; i < textHashtag.length; i++) {
    if (textHashtag[i].indexOf('#', 1) !== -1 || textHashtag[i] === '') {
      return true;
    }
  }
  return false;
}

function isHashtagsRepeat(textHashtag) {
  var valuesSoFar = Object.create(null);
  for (var i = 0; i < textHashtag.length; i++) {
    var value = textHashtag[i];
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

function isMaxHashtags(textHashtag, maxHashtags) {
  return textHashtag.length > maxHashtags;
}

var validateHashtags = function () {
  var hashtags = parseHashtag(hashtagInput);

  if (!isHashtag(hashtags)) {
    hashtagInput.setCustomValidity('Хэш-тег написан неправильно.');
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
