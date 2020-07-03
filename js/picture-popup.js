'use strict';

(function () {
  var MAX_COMMENTS = 5;
  var bigPicture = document.querySelector('.big-picture');

  function showBigPicture(picture) {
    bigPicture.classList.remove('hidden');

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

      for (var i = 0; i < MAX_COMMENTS; i++) {
        container.append(createCommentElement(comments[i]));
      }
    }

    showComments(commentsContainer, picture.comments);

    document.body.classList.add('modal-open');
  }

  var onEscPress = function (evt) {
    window.utils.isEscEvent(evt, onBigPictureClose);
  };

  window.picturePopup = {
    bigPictureOpen: function (evt, picture) {
      evt.preventDefault();

      showBigPicture(picture);

      document.addEventListener('keydown', onEscPress);
    }
  };

  var onBigPictureClose = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');

    document.removeEventListener('keydown', onEscPress);
  };

  var bigPictureClose = document.querySelector('.big-picture__cancel');

  bigPictureClose.addEventListener('click', onBigPictureClose);
  bigPictureClose.addEventListener('keydown', onBigPictureClose);
})();
