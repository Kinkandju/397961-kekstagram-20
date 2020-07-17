'use strict';

(function () {
  var MAX_COMMENTS = 5;
  var part;

  var bigPicture = document.querySelector('.big-picture');

  function showBigPicture(picture) {
    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = picture.description;

    bigPicture.querySelector('.social__comment-count').classList.add('hidden');

    function createCommentElement(comments) {
      var newComment = document.createElement('li');

      newComment.className = 'social__comment';
      newComment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
      newComment.querySelector('.social__picture').src = comments.avatar;
      newComment.querySelector('.social__picture').alt = comments.name;
      newComment.querySelector('.social__text').textContent = comments.message;

      return newComment;
    }

    function createCommentsFragment(commentsData) {
      var commentsFragment = document.createDocumentFragment();

      commentsData.forEach(function (comment) {
        commentsFragment.appendChild(createCommentElement(comment));
      });

      return commentsFragment;
    }

    function showComments(comments) {
      var commentsLoader = bigPicture.querySelector('.comments-loader');
      commentsLoader.classList.remove('hidden');
      commentsLoader.addEventListener('click', onCommentsLoaderClick);

      var commentsSection = comments.slice(0, MAX_COMMENTS);

      function onCommentsLoaderClick() {
        commentsSection = comments.slice(part * MAX_COMMENTS, part * MAX_COMMENTS + MAX_COMMENTS);
        part++;
        commentsContainer.appendChild(createCommentsFragment(commentsSection));

        if (part * MAX_COMMENTS >= comments.length) {
          commentsLoader.classList.add('hidden');
          commentsLoader.removeEventListener('click', onCommentsLoaderClick);
        }
      }

      var commentsContainer = bigPicture.querySelector('.social__comments');
      commentsContainer.innerHTML = '';
      onCommentsLoaderClick();
    }

    showComments(picture.comments);

    document.body.classList.add('modal-open');
  }

  var onEscPress = function (evt) {
    window.utils.isEscEvent(evt, onBigPictureClose);
  };

  window.picturePopup = {
    bigPictureOpen: function (evt, picture) {
      evt.preventDefault();

      part = 0;
      showBigPicture(picture);

      document.addEventListener('keydown', onEscPress);
    }
  };

  var bigPictureClose = document.querySelector('.big-picture__cancel');

  var onBigPictureClose = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');

    document.removeEventListener('keydown', onEscPress);
  };

  bigPictureClose.addEventListener('click', onBigPictureClose);
  bigPictureClose.addEventListener('keydown', onBigPictureClose);
})();
