'use strict';

(function () {
  window.utils = {
    getRandomInteger: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    getRandomElement: function (elements) {
      var randomItemIndex = this.getRandomInteger(0, elements.length - 1);
      return elements[randomItemIndex];
    },

    isEscEvent: function (evt, action) {
      if (evt.key === 'Escape') {
        evt.preventDefault();

        action();
      }
    },

    parseHashtag: function (textHashtags) {
      return textHashtags.toLowerCase().split(' ');
    },

    isOnlyLattice: function (textHashtags) {
      for (var i = 0; i < textHashtags.length; i++) {
        if (textHashtags[i].charAt(0) !== '#' || textHashtags[i].length === 1) {
          return true;
        }
      }
      return false;
    },

    isGapsInside: function (textHashtags) {
      for (var i = 0; i < textHashtags.length; i++) {
        if (textHashtags[i].indexOf('#', 1) !== -1 || textHashtags[i] === '') {
          return true;
        }
      }
      return false;
    },

    isHashtagsRepeat: function (textHashtags) {
      var valuesSoFar = Object.create(null);
      for (var i = 0; i < textHashtags.length; i++) {
        var value = textHashtags[i];
        if (value in valuesSoFar) {
          return true;
        }
        valuesSoFar[value] = true;
      }
      return false;
    },

    maxHashtagLength: function (textHashtags, longHashtag) {
      for (var i = 0; i < textHashtags.length; i++) {
        if (textHashtags[i].length > longHashtag) {
          return true;
        }
      }
      return false;
    },

    isMaxHashtags: function (textHashtags, maxHashtags) {
      return textHashtags.length > maxHashtags;
    }
  };
})();
