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

  pin.addEventListener('mouseup', function (evt) {
    var totalEffectValue = levelLine.clientWidth;
    var currentSliderPosition = evt.target.offsetLeft;
    var effectValue = Math.floor((currentSliderPosition / totalEffectValue) * 100);
    effectLevelContainer.value = effectValue;
  });
})();
