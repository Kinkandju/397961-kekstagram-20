'use strict';

(function () {
  var FILTERS_TYPES = {
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat',
    NONE: 'none'
  };

  var uploadPrewiew = document.querySelector('.img-upload__preview img');
  var uploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var effectLevelContainer = document.querySelector('.effect-level__value');
  var uploadEffects = document.querySelector('.img-upload__effects');

  var changeFilter = function (filterType) {
    if (filterType) {
      uploadPrewiew.setAttribute('data-filter-type', filterType);
    } else {
      filterType = uploadPrewiew.getAttribute('data-filter-type');
    }

    uploadPrewiew.setAttribute('class', 'effects__preview--' + filterType);

    var effectLevel = effectLevelContainer.value;

    var effect = '';

    switch (filterType) {
      case FILTERS_TYPES.CHROME:
        effect = 'grayscale(' + effectLevel * 0.01 + ')';
        break;
      case FILTERS_TYPES.SEPIA:
        effect = 'sepia(' + effectLevel * 0.01 + ')';
        break;
      case FILTERS_TYPES.MARVIN:
        effect = 'invert(' + effectLevel + '%)';
        break;
      case FILTERS_TYPES.PHOBOS:
        effect = 'blur(' + effectLevel * 0.03 + 'px)';
        break;
      case FILTERS_TYPES.HEAT:
        effect = 'brightness(' + effectLevel * 0.03 + ')';
        break;
      case FILTERS_TYPES.NONE:
        effect = 'none';
        break;
    }

    if (effect === FILTERS_TYPES.NONE) {
      uploadEffectLevel.classList.add('hidden');
    } else {
      uploadEffectLevel.classList.remove('hidden');
    }

    uploadPrewiew.style.filter = effect;
  };

  var pin = document.querySelector('.effect-level__pin');
  var levelLine = document.querySelector('.effect-level__line');
  var depthLine = document.querySelector('.effect-level__depth');

  uploadEffects.addEventListener('change', function (evt) {
    changeFilter(evt.target.value);

    uploadPrewiew.style.filter = '';

    var defaultPosition = levelLine.clientWidth + 'px';

    pin.style.left = defaultPosition;
    depthLine.style.width = defaultPosition;
    effectLevelContainer.value = levelLine.clientWidth;
  });

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

      changeFilter(moveEvt.target.value);
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
