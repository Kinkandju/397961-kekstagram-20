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

  var pictureContainer = document.querySelector('section.pictures.container');
  var allPictures = window.mocks.getPhotos();

  function showSmallPictures() {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < allPictures.length; i++) {
      fragment.appendChild(createPictureElement(allPictures[i]));
    }

    pictureContainer.appendChild(fragment);
  }

  showSmallPictures(allPictures);
})();
