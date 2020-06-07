'use strict';

var pictureTemplate = document.querySelector('#picture');

function createPictureElement(picture) {
  var pictureElement = pictureTemplate.content.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments;

  return pictureElement;
}

var pictureContainer = document.querySelector('section.pictures.container');

function addPhotos() {
  var fragment = document.createDocumentFragment();

  for (var photoIndex = 0; photoIndex < window.photoDescriptions.length; photoIndex++) {
    fragment.appendChild(createPictureElement(window.photoDescriptions[photoIndex]));
  }

  pictureContainer.appendChild(fragment);
}

addPhotos();
