'use strict';

(function () {
  var Url = {
    DOWNLOAD: 'https://javascript.pages.academy/kekstagram/data',
    UPLOAD: 'https://javascript.pages.academy/kekstagram'
  };

  var STATUS = 200;
  var TIMEOUT = 500;

  function getDataFromServer(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.timeout = TIMEOUT;

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  }

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = getDataFromServer(onLoad, onError);

      xhr.open('GET', Url.DOWNLOAD);
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = getDataFromServer(onLoad, onError);

      xhr.open('POST', Url.UPLOAD);
      xhr.send(data);
    }
  };
})();
