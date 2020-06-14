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
var allPictures = window.getPhotos();

function showSmallPictures() {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < allPictures.length; i++) {
    fragment.appendChild(createPictureElement(allPictures[i]));
  }

  pictureContainer.appendChild(fragment);
}

var bigPicture = document.querySelector('.big-picture');

function showBigPicture(picture) {
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  function createCommentElement(comments) {
    var newComment = document.createElement('li');

    newComment.className = 'social__comment';
    newComment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
    newComment.querySelector('.social__picture').src = comments.avatar;
    newComment.querySelector('.social__picture').alt = comments.name;
    newComment.querySelector('.social__text').textContent = comments.message;

    return newComment;
  }

  var commentsContainer = bigPicture.querySelector('.social__comments');

  function showComments(container, comments) {
    container.innerHTML = '';

    for (var i = 0; i < comments.length; i++) {
      container.append(createCommentElement(comments[i]));
    }
  }
  showComments(commentsContainer, picture.comments);
}

showSmallPictures(allPictures);

var bigPictureClose = document.querySelector('.big-picture__cancel');

var onEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onBigPictureClose();
  }
};

var onBigPictureOpen = function () {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscPress);
};

var onBigPictureClose = function () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscPress);
};

var picturesLink = document.querySelectorAll('.picture__img');

var elc = function (element, data) {
  element.addEventListener('click', function () {
    onBigPictureOpen(showBigPicture(data));
  });
};

for (var i = 0; i < picturesLink.length; i++) {
  elc(picturesLink[i], allPictures[i]);
}

bigPictureClose.addEventListener('click', onBigPictureClose);
