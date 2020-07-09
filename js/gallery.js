'use strict';

(function () {
  var FILTER_PICTURES_COUNT = 10;

  var picturesData;

  var pictureTemplate = document.querySelector('#picture');

  function createPictureElement(picture) {
    var pictureElement = pictureTemplate.content.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  }

  function showSmallPictures(pictures) {
    var pictureContainer = document.querySelector('section.pictures.container');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(createPictureElement(pictures[i]));
    }
    pictureContainer.appendChild(fragment);
  }

  function addHandler(element, data) {
    element.addEventListener('click', function (evt) {
      window.picturePopup.bigPictureOpen(evt, data);
    });
  }

  function renderPictures(pictures) {
    showSmallPictures(pictures);

    var allSmallPictures = document.querySelectorAll('.picture');

    for (var i = 0; i < allSmallPictures.length; i++) {
      addHandler(allSmallPictures[i], pictures[i]);
    }
  }

  function removePictures() {
    var allSmallPictures = document.querySelectorAll('.picture');

    allSmallPictures.forEach(function (picture) {
      picture.parentNode.removeChild(picture);
    });
  }

  var filtersButtons = document.querySelectorAll('.img-filters__button');
  var activeClass = 'img-filters__button--active';

  function changeActiveButton(element, buttons, className) {
    buttons.forEach(function (button) {
      button.classList.remove(className);
    });
    element.classList.add(className);
  }

  function newFilteredPictures(pictures) {
    var newPictures = pictures.slice(0, FILTER_PICTURES_COUNT);

    for (var i = 0; i < FILTER_PICTURES_COUNT; i++) {
      var number = Math.floor(Math.random() * newPictures.length);
      var numberOfPictures = newPictures[number];

      newPictures[number] = newPictures[i];
      newPictures[i] = numberOfPictures;
    }

    return newPictures;
  }

  function newFilteredPicturesComments(picturesComments) {
    var newPictures = picturesComments;

    return newPictures.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
  }

  function changeFilters(evt) {
    changeActiveButton(evt.target, filtersButtons, activeClass);

    removePictures();

    switch (evt.target.id) {
      case 'filter-default':
        renderPictures(picturesData.slice());
        break;
      case 'filter-random':
        renderPictures(newFilteredPictures(picturesData.slice()));
        break;
      case 'filter-discussed':
        renderPictures(newFilteredPicturesComments(picturesData.slice()));
        break;
    }
  }

  var filters = document.querySelector('.img-filters');
  var filtersForm = document.querySelector('.img-filters__form');

  function showFilters(evt) {
    filters.classList.remove('img-filters--inactive');
    filtersForm.addEventListener('click', window.debounce(changeFilters.bind(evt)));
  }

  window.backend.load(function (pictures) {
    picturesData = pictures;

    renderPictures(picturesData);

    showFilters();
  });
})();
