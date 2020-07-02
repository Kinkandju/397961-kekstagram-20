'use strict';

(function () {
  var form = document.querySelector('.img-upload__form');
  var main = document.querySelector('main');
  var uploadImg = document.querySelector('.img-upload__overlay');

  function removeElement(elementSelector) {
    var element = document.querySelector(elementSelector);

    element.remove();
  }

  function createSuccessInformationPopup() {
    var successTemplate = document.querySelector('#success');
    var successElement = successTemplate.content.cloneNode(true);

    main.appendChild(successElement);

    var successButton = document.querySelector('.success__button');

    var onSuccessButtonClick = function () {
      removeElement('.success');
      successButton.removeEventListener('click', onSuccessButtonClick);
      document.removeEventListener('click', onDocumentClick);
    };

    var onDocumentClick = function () {
      removeElement('.success');
      document.removeEventListener('click', onDocumentClick);
    };

    var onDocumentKeydown = function (evt) {
      removeElement('.success');

      if (evt.key === 'Escape') {
        evt.preventDefault();

        document.removeEventListener('keydown', onDocumentKeydown);
      }
    };

    successButton.addEventListener('click', onSuccessButtonClick);
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeydown);
  }

  function createErrorInformationPopup(errorMessage) {
    var errorTemplate = document.querySelector('#error');
    var errorElement = errorTemplate.content.cloneNode(true);

    errorElement.querySelector('.error__title').textContent = errorMessage;
    errorElement.querySelector('.error__title').style.lineHeight = '1';

    main.appendChild(errorElement);

    var errorButton = document.querySelector('.error__button');

    var onErrorButtonClick = function () {
      removeElement('.error');
      errorButton.removeEventListener('click', onErrorButtonClick);
      document.removeEventListener('click', onDocumentClick);
    };

    var onDocumentClick = function () {
      removeElement('.error');
      document.removeEventListener('click', onDocumentClick);
    };

    var onDocumentKeydown = function (evt) {
      removeElement('.error');

      if (evt.key === 'Escape') {
        evt.preventDefault();

        document.removeEventListener('keydown', onDocumentKeydown);
      }
    };

    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeydown);
  }

  var successHandler = function () {
    uploadImg.classList.add('hidden');
    document.body.classList.remove('modal-open');

    createSuccessInformationPopup();

    window.uploader.resetSettings();

    form.removeEventListener('submit', onFormSubmit);
    form.reset();
  };

  var errorHandler = function (errorMessage) {
    uploadImg.classList.add('hidden');
    document.body.classList.remove('modal-open');

    createErrorInformationPopup(errorMessage);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(form), successHandler, errorHandler);
  };

  form.addEventListener('submit', onFormSubmit);
})();
