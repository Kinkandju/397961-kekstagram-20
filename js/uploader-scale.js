'use strict';

(function () {
  var SCALE_STEP = 25;
  var MAX_SCALE = 100;
  var MIN_SCALE = 25;

  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControl = document.querySelector('.scale__control--value');
  var picturePreview = document.querySelector('.img-upload__preview');

  function resizePicture(baseScale) {
    scaleControl.value = baseScale + '%';
    picturePreview.style.transform = 'scale(' + baseScale * 0.01 + ')';
  }

  var onScaleControlClick = function (evt) {
    var currentValue = parseInt(scaleControl.value, 10);

    switch (evt.target) {
      case scaleControlBigger:
        currentValue += SCALE_STEP;
        break;
      case scaleControlSmaller:
        currentValue -= SCALE_STEP;
        break;
    }

    if (currentValue >= MIN_SCALE && currentValue <= MAX_SCALE) {
      resizePicture(currentValue);
    }
  };

  scaleControlSmaller.addEventListener('click', onScaleControlClick);
  scaleControlBigger.addEventListener('click', onScaleControlClick);
})();
