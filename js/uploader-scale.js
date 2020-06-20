'use strict';

(function () {
  var SCALE_STEP = 25;
  var BASE_SCALE = 100;
  var MAX_SCALE = 100;

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
})();
