'use strict';

var pictureTemplate = document.querySelector('#picture');

function createPictureElement(picture) {
  var pictureElement = pictureTemplate.content.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
}

var pictureContainer = document.querySelector('section.pictures.container');

function addPhotos() {
  var fragment = document.createDocumentFragment();
  var photoDescriptions = window.getPhotos();

  for (var i = 0; i < photoDescriptions.length; i++) {
    fragment.appendChild(createPictureElement(photoDescriptions[i]));
  }

  pictureContainer.appendChild(fragment);
}

addPhotos();
