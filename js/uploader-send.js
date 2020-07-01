'use strict';

(function () {
  var successTemplate = document.querySelector('#success');
  // var successButton = document.querySelector('.success__button');

  var errorTemplate = document.querySelector('#error');
  // var errorButton = document.querySelector('.error__button');

  var form = document.querySelector('.img-upload__form');
  var uploadPicture = document.querySelector('.img-upload');

  function createSuccessElement() {
    var successElement = successTemplate.content.cloneNode(true);

    document.main.appendChild(successElement);
  }

  function createErrorElement(errorMessage) {
    var errorElement = errorTemplate.content.cloneNode(true);

    errorElement.querySelector('.error__title').textContent = errorMessage;

    document.main.insertAdjacentElement('afterbegin', errorElement);
  }

  var successHandler = function (evt) {
    evt.preventDefault();

    uploadPicture.classList.add('hidden');

    createSuccessElement();

    form.reset();
  };

  var errorHandler = function (errorMessage) {
    createErrorElement(errorMessage);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(form), successHandler, errorHandler);
  };

  form.addEventListener('submit', onFormSubmit);
})();
