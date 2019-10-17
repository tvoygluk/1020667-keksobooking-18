'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = '';
  var RESPONSE_OK_CODE = 200;
  var TEN_SECOND = 10000;
  var REQUEST_TYPE_GET = 'GET';
  var REQUEST_TYPE_POST = 'POST';

  var requestVers = function (requestType, url) {

    return function (onLoad, onError, data) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === RESPONSE_OK_CODE) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TEN_SECOND;

      xhr.open(requestType, url);
      xhr.send(data);
    };
  };

  var load = requestVers(REQUEST_TYPE_GET, URL_LOAD);
  var save = requestVers(REQUEST_TYPE_POST, URL_SAVE);

  window.backend = {
    REQUEST_TYPE_GET: REQUEST_TYPE_GET,
    REQUEST_TYPE_POST: REQUEST_TYPE_POST,
    URL_LOAD: URL_LOAD,
    URL_SAVE: URL_SAVE,
    load: load,
    save: save
  };
})();
