'use strict';

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

  document.addEventListener('keydown', onEscPress);
};

var closeSettings = function () {
  uploadImg.classList.add('hidden');
  uploadFile.value = '';

  document.removeEventListener('keydown', onEscPress);
};

uploadStart.addEventListener('change', function () {
  openSettings();
});

uploadClose.addEventListener('click', function () {
  closeSettings();
});

// ---------------------------------------------------------------------------
// Перемеенные для изменения масштаба загружаемого изображения
// var SCALE_STEP = 25;
// var MIN_SCALE = 25;
// var MAX_SCALE = 100;
//
// var scaleControlSmaller = document.querySelector('.scale__control--smaller');
// var scaleControlBigger = document.querySelector('.scale__control--bigger');
// var scaleControl = document.querySelector('.scale__control--value').value;

// ---------------------------------------------------------------------------
var effectLevel = document.querySelector('.effect-level__value').value;
var uploadPrewiew = document.querySelector('.img-upload__preview img');
var uploadEffects = document.querySelector('.img-upload__effects');

var onFilterChange = function (evt) {
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
      closeSettings();
      break;
  }

  uploadPrewiew.style.filter = effect;
};

uploadEffects.addEventListener('change', onFilterChange);

var pin = document.querySelector('.effect-level__pin');
var levelLine = document.querySelector('.effect-level__line');

pin.addEventListener('mouseup', function (evt) {
  var totalEffectValue = levelLine.clientWidth;
  var currentSliderPosition = evt.target.offsetLeft;
  var effectValue = Math.floor((currentSliderPosition / totalEffectValue) * 100);
  effectLevel = effectValue;
});

var hashtagInput = document.querySelector('.text__hashtags');
var re = /#[a-zA-Zа-яА-ЯёЁ0-9]*/i;

function parseHashtag(textHashtag) {
  return textHashtag.value.toLowerCase().split(' ');
}

function isHashtag(textHashtag) {
  return re.test(textHashtag);
}

function isOnlyLattice(textHashtag) {
  if (textHashtag.value === '#') {
    return false;
  }
  return true;
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
  for (var i = 1; i < textHashtag.length; i++) {
    for (var j = i + 1; j < textHashtag.length; j++) {
      if (textHashtag[i] === textHashtag[j]) {
        return false;
      }
    }
  }
  return true;
}

function isLongHashtag(textHashtag, longHashtag) {
  for (var i = 0; i < textHashtag.length; i++) {
    if (textHashtag[i].length < longHashtag) {
      return true;
    }
  }
  return false;
}

function isMaxHashtags(textHashtag, maxHashtags) {
  if (textHashtag.length < maxHashtags) {
    return true;
  }
  return false;
}

var validateHashtags = function () {
  var hashtags = parseHashtag(hashtagInput);

  if (!isHashtag(hashtags)) {
    hashtagInput.setCustomValidity('Хэш-тег написан неправильно.');
  } else if (isOnlyLattice(hashtags)) {
    hashtagInput.setCustomValidity('Хэш-тег не может состоять из одного символа.');
  } else if (isGapsInside(hashtags)) {
    hashtagInput.setCustomValidity('Хэш-теги разделяются пробелами.');
  } else if (isLongHashtag(hashtags, MAX_HASHTAG_LENGTH)) {
    hashtagInput.setCustomValidity('Максимальная длина хэш-тега - ' + MAX_HASHTAG_LENGTH + ' символов.');
  } else if (isHashtagsRepeat(hashtags)) {
    hashtagInput.setCustomValidity('Хэш-теги не должны повторяться.');
  } else if (isMaxHashtags(hashtags, MAX_HASHTAGS)) {
    hashtagInput.setCustomValidity('Не больше ' + MAX_HASHTAGS + ' хэш-тегов.');
  } else {
    hashtagInput.setCustomValidity = '';
  }
};

hashtagInput.addEventListener('input', validateHashtags);
