'use strict';

(function () {
  var DEFAULT_SCALE = '100';

  var form = document.querySelector('.img-upload__form');

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
    if (evt.target !== hashtagInput && evt.target !== hashtagDescription) {

      window.utils.isEscEvent(evt, window.uploader.closeSettings);
    }
  };

  var openSettings = function () {
    uploadImg.classList.remove('hidden');
    document.body.classList.add('modal-open');

    scaleControl.value = DEFAULT_SCALE + '%';

    uploadEffectLevel.classList.add('hidden');

    document.addEventListener('keydown', onEscPress);
    form.addEventListener('submit', window.uploaderSend.onFormSubmit);
  };

  var resetSettings = function () {
    uploadStart.value = '';
    hashtagInput.value = '';
    hashtagDescription.value = '';
    picturePreview.style.transform = 'scale(1)';
    picturePreview.className = '';
    uploadPrewiew.style.filter = 'none';
  };

  window.uploader = {
    closeSettings: function () {
      uploadImg.classList.add('hidden');
      document.body.classList.remove('modal-open');

      resetSettings();

      document.removeEventListener('keydown', onEscPress);
      form.removeEventListener('submit', window.uploaderSend.onFormSubmit);
    }
  };

  uploadStart.addEventListener('change', openSettings);
  uploadClose.addEventListener('click', window.uploader.closeSettings);
})();
