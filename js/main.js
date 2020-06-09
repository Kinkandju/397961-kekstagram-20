'use strict';

var pictureTemplate = document.querySelector('#picture');

function createPictureElement(photo) {
  var pictureElement = pictureTemplate.content.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return pictureElement;
}

var pictureContainer = document.querySelector('section.pictures.container');
var allPictures = window.getPhotos();

function showSmallPictures() {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < allPictures.length; i++) {
    fragment.appendChild(createPictureElement(allPictures[i]));
  }

  pictureContainer.appendChild(fragment);
}

var bigPicture = document.querySelector('.big-picture');

function showBigPicture(photo) {
  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
}

var commentsList = bigPicture.querySelector('.social__comments');
var allComments = window.getRandomComments();

function createCommentElement(comment) {
  var newComment = document.createElement('li');
  newComment.className = 'social__comment';
  newComment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  newComment.querySelector('.social__picture').src = window.getRandomAvatarForCommit();
  newComment.querySelector('.social__picture').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;

  return newComment;
}

function showComments(container, comments) {
  container.innerHTML = '';

  for (var i = 0; i < comments.length; i++) {
    container.append(createCommentElement(comments[i]));
  }
}

showSmallPictures(allPictures);
showBigPicture(allPictures[0]);
showComments(commentsList, allComments);
