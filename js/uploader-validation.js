'use strict';

(function () {
  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG_LENGTH = 20;

  var hashtagInput = document.querySelector('.text__hashtags');
  var re = /^#[a-zA-Zа-яА-ЯёЁ0-9]*/i;

  function isHashtag(textHashtags) {
    for (var i = 0; i < textHashtags.length; i++) {
      if (!re.test(textHashtags[i])) {
        return false;
      }
    }
    return true;
  }

  var validateHashtags = function () {
    var hashtags = window.utils.parseHashtag(hashtagInput.value);

    if (!isHashtag(hashtags)) {
      hashtagInput.setCustomValidity('Хэш-тег написан неверно.');
    } else if (window.utils.isOnlyLattice(hashtags)) {
      hashtagInput.setCustomValidity('Хэш-тег не может состоять из одного символа.');
    } else if (window.utils.isGapsInside(hashtags)) {
      hashtagInput.setCustomValidity('Хэш-теги разделяются пробелами.');
    } else if (window.utils.isHashtagsRepeat(hashtags)) {
      hashtagInput.setCustomValidity('Хэш-теги не должны повторяться.');
    } else if (window.utils.maxHashtagLength(hashtags, MAX_HASHTAG_LENGTH)) {
      hashtagInput.setCustomValidity('Максимальная длина хэш-тега - ' + MAX_HASHTAG_LENGTH + ' символов.');
    } else if (window.utils.isMaxHashtags(hashtags, MAX_HASHTAGS)) {
      hashtagInput.setCustomValidity('Не больше ' + MAX_HASHTAGS + ' хэш-тегов.');
    } else {
      hashtagInput.setCustomValidity('');
    }
  };

  hashtagInput.addEventListener('input', validateHashtags);
})();
