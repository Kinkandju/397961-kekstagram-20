'use strict';

var uploadStart = document.querySelector('.img-upload__start');
var uploadFile = document.querySelector('#upload-file');
var uploadClose = document.querySelector('#upload-cancel');
var uploadImg = document.querySelector('.img-upload__overlay');

var onEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeSettings();
  }
};

var openSettings = function () {
  uploadImg.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadPrewiew.setAttribute('class', 'none');

  document.addEventListener('keydown', onEscPress);
};

var closeSettings = function () {
  uploadImg.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value = '';

  document.removeEventListener('keydown', onEscPress);
};

uploadStart.addEventListener('change', function () {
  openSettings();
});

uploadClose.addEventListener('click', function () {
  closeSettings();
});

// var SCALE_STEP = 25;
// var MIN_SCALE = 25;
// var MAX_SCALE = 100;

// var scaleControlSmaller = document.querySelector('.scale__control--smaller');
// var scaleControlBigger = document.querySelector('.scale__control--bigger');
// var scaleControl = document.querySelector('.scale__control--value').value;

// function getPictureSize(step) {
//   var controlValue = scaleControl;
//   controlValue = parseInt(controlValue, 10) - SCALE_STEP * step;
//
//   if (controlValue > MAX_SCALE) {
//     controlValue = MAX_SCALE;
//   } else if (controlValue < MIN_SCALE) {
//     controlValue = MIN_SCALE;
//   }
//
//   controlValue += '%';
//   scaleControl = controlValue;
//   scaleControl.setAttribute('value', parseInt(controlValue, 10));
//   uploadPrewiew.style.transform = 'scale(' + (parseInt(controlValue, 10) / 100) + ')';
// }
//
// scaleControlSmaller.addEventListener('click', function () {
//   getPictureSize(1);
// });
//
// scaleControlBigger.addEventListener('click', function () {
//   getPictureSize(-1);
// });

var sliderPin = document.querySelector('.effect-level__pin');
var effectLevel = document.querySelector('.effect-level__value').value;
var levelLine = document.querySelector('.effect-level__line');
var uploadPrewiew = document.querySelector('.img-upload__preview img');
var uploadEffects = document.querySelector('.img-upload__effects');


sliderPin.addEventListener('mouseup', function () {

});


var onFilterChange = function (evt) {
  uploadPrewiew.setAttribute('class', 'effects__preview--' + evt.target.value);
};

uploadEffects.addEventListener('change', onFilterChange);
