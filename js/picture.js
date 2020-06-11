'use strict';

var uploadStart = document.querySelector('.img-upload__start');
var uploadFile = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');
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

uploadCancel.addEventListener('click', function () {
  closeSettings();
});
