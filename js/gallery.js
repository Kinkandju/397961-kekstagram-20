'use strict';

(function () {
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

  window.backend.load(function (picturesData) {

    showSmallPictures(picturesData);

    var allSmallPictures = document.querySelectorAll('.picture');

    var addHandler = function (element, data) {
      element.addEventListener('click', function (evt) {
        window.picturePopup.bigPictureOpen(evt, data);
      });
    };

    for (var i = 0; i < allSmallPictures.length; i++) {
      addHandler(allSmallPictures[i], picturesData[i]);
    }
  });
})();
