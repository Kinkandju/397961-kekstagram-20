'use strict';

(function () {
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
  var depthLine = document.querySelector('.effect-level__depth');

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var totalEffectValue = levelLine.clientWidth;
    var sliderPositionLimits = {
      min: 0,
      max: totalEffectValue
    };

    var startCoords = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;

      startCoords = moveEvt.clientX;

      if (startCoords > levelLine.getBoundingClientRect().right) {
        pin.style.left = sliderPositionLimits.max + 'px';
      } else if (startCoords < levelLine.getBoundingClientRect().left) {
        pin.style.left = sliderPositionLimits.min + 'px';
      } else {
        pin.style.left = pin.offsetLeft - shift + 'px';
      }

      depthLine.style.width = pin.style.left;

      var currentSliderPosition = pin.offsetLeft;
      var effectValue = Math.floor((currentSliderPosition / totalEffectValue) * 100);
      effectLevelContainer.value = effectValue;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
