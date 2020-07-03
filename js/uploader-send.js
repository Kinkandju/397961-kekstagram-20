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

    function addHandlersToSuccessButton() {
      removeElement('.success');

      successButton.removeEventListener('click', onSuccessButtonClick);
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onDocumentKeydown);
    }

    var onSuccessButtonClick = function () {
      addHandlersToSuccessButton();
    };

    var onDocumentClick = function () {
      addHandlersToSuccessButton();
    };

    var onDocumentKeydown = function (evt) {
      addHandlersToSuccessButton();

      window.utils.isEscEvent(evt, onDocumentKeydown);
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

    function addHandlersToErrorButton() {
      removeElement('.error');

      errorButton.removeEventListener('click', onErrorButtonClick);
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onDocumentKeydown);
    }

    var onErrorButtonClick = function () {
      addHandlersToErrorButton();
    };

    var onDocumentClick = function () {
      addHandlersToErrorButton();
    };

    var onDocumentKeydown = function (evt) {
      addHandlersToErrorButton();

      window.utils.isEscEvent(evt, onDocumentKeydown);
    };

    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeydown);
  }

  var successHandler = function () {
    window.uploader.closeSettings();

    createSuccessInformationPopup();

    form.reset();
  };

  var errorHandler = function (errorMessage) {
    uploadImg.classList.add('hidden');
    document.body.classList.remove('modal-open');

    createErrorInformationPopup(errorMessage);
  };

  window.uploaderSend = {
    onFormSubmit: function (evt) {
      evt.preventDefault();

      window.backend.save(new FormData(form), successHandler, errorHandler);
    }
  };
})();
