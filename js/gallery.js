'use strict';

(function () {
  var TOTAL_PHOTOS = 25;

  var pictureTemplate = document.querySelector('#picture');

  function createPictureElement(picture) {
    var pictureElement = pictureTemplate.content.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    // pictureElement.addEventListener('click', function (evt) {
    //   window.picturePopup.bigPictureOpen(evt, picture);
    // });

    return pictureElement;
  }

  var pictureContainer = document.querySelector('section.pictures.container');

  function showSmallPictures(pictures) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < TOTAL_PHOTOS; i++) {
      fragment.appendChild(createPictureElement(pictures[i]));
    }

    pictureContainer.appendChild(fragment);
  }

  window.backend.load(function (picturesData) {
    showSmallPictures(picturesData);
  });

})();
