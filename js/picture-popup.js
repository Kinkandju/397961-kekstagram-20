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

    function createCommentElement(comments) {
      var newComment = document.createElement('li');

      newComment.className = 'social__comment';
      newComment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
      newComment.querySelector('.social__picture').src = comments.avatar;
      newComment.querySelector('.social__picture').alt = comments.name;
      newComment.querySelector('.social__text').textContent = comments.message;

      return newComment;
    }
    // -----------------------------------------------------------------------------

    // var i = 0; // Внутри функции счетчик отказывается нормально работать.

    // function showComments(comments) {
    //   var commentsContainer = bigPicture.querySelector('.social__comments');
    //   var commentsLoader = bigPicture.querySelector('.comments-loader');

    //   if (comments.length > MAX_COMMENTS) {
    //     commentsLoader.classList.remove('hidden');
    //     commentsLoader.addEventListener('click', onCommentLoaderClick);
    //   }

    //   commentsContainer.innerHTML = '';
    //   MAX_COMMENTS += i;

    //   for (i; i < MAX_COMMENTS && i < comments.length; i++) {
    //     commentsContainer.appendChild(createCommentElement(comments[i]));
    //   }

    //   if (i === comments.length) {
    //     commentsLoader.classList.add('hidden');
    //     commentsLoader.removeEventListener('click', onCommentLoaderClick);
    //   }
    // }

    // function onCommentLoaderClick() {
    //   showComments(picture.comments);
    // }

    // showComments(picture.comments);
    // ----------------------------------------------------------------------------

    function createCommentsFragment(comments) {
      var commentsFragment = document.createDocumentFragment();
      var commentsData = comments.slice(MAX_COMMENTS, MAX_COMMENTS += MAX_COMMENTS); // Да, это ужасно.

      commentsData.forEach(function (comment) {
        commentsFragment.appendChild(createCommentElement(comment));
      });

      return commentsFragment;
    }

    function showComments(comments) {
      var commentsLoader = bigPicture.querySelector('.comments-loader');
      commentsLoader.classList.add('hidden');
      commentsLoader.removeEventListener('click', onCommentsLoaderClick);

      function onCommentsLoaderClick() {
        commentsContainer.appendChild(createCommentsFragment(comments));
      }

      var commentsContainer = bigPicture.querySelector('.social__comments');
      commentsContainer.innerHTML = '';

      for (var i = 0; i < MAX_COMMENTS && i < comments.length; i++) {
        commentsContainer.appendChild(createCommentElement(comments[i]));

        if (comments.length > MAX_COMMENTS) {
          commentsLoader.classList.remove('hidden');
          commentsLoader.addEventListener('click', onCommentsLoaderClick);
        }
      }
    }

    showComments(picture.comments);
    // ----------------------------------------------------------------------------

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
