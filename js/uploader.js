'use strict';

(function () {
  var DEFAULT_SCALE = '100';
  var uploadStart = document.querySelector('#upload-file');
  var uploadClose = document.querySelector('#upload-cancel');
  var uploadImg = document.querySelector('.img-upload__overlay');

  var scaleControl = document.querySelector('.scale__control--value');
  var picturePreview = document.querySelector('.img-upload__preview');
  var uploadPrewiew = document.querySelector('.img-upload__preview img');
  var uploadEffectLevel = document.querySelector('.img-upload__effect-level');

  var hashtagInput = document.querySelector('.text__hashtags');
  var hashtagDescription = document.querySelector('.text__description');

  var onEscPress = function (evt) {
    if (evt.key === 'Escape' && evt.target !== hashtagInput && evt.target !== hashtagDescription) {
      evt.preventDefault();

      closeSettings();
    }
  };

  // Если выйти из окна загрузки с помощью Esc, то при повторном добавлении
  // этой же фотографии окно загрузки не открывается (п.1.3).

  // Если изображение выбирается второй раз
  // подряд, то при уменьшении или увеличении масштаба происходит расчет от
  // старого значения, которое было выбрано в первый раз.
  // Например, при первом просмотре было выбрано 50%. При последующем
  // просмотре в окне показано 100%, если нажать на + , то станет 75% (п.2.1).


  var openSettings = function () {
    uploadImg.classList.remove('hidden');
    document.body.classList.add('modal-open');

    scaleControl.value = DEFAULT_SCALE + '%';
    picturePreview.style.transform = 'scale(1)';

    document.addEventListener('keydown', onEscPress);
  };

  window.uploader = {
    resetSettings: function () {
      hashtagInput.value = '';
      hashtagDescription.value = '';

      uploadEffectLevel.classList.add('hidden');
      picturePreview.className = '';
      uploadPrewiew.style.filter = 'none';
    }
  };

  var closeSettings = function () {
    uploadImg.classList.add('hidden');
    document.body.classList.remove('modal-open');

    window.uploader.resetSettings();

    document.removeEventListener('keydown', onEscPress);
  };

  uploadStart.addEventListener('change', openSettings);
  uploadClose.addEventListener('click', closeSettings);
})();
