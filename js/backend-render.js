'use strict';
(function () {

  var successHandler = window.pinRender.addPinsToLayout;

  var errorHandler = function (errorMessage) {
    var errTemplate = document.querySelector('#error').content.querySelector('.error');
    var someErr = errTemplate.cloneNode(true);
    var errMess = someErr.querySelector('.error__message');
    errMess.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', someErr);

    var errBut = someErr.querySelector('.error__button');

    var closeErrBut = function () {
      if (someErr !== null) {
        someErr.remove();
      }
    };

    var onErrButClick = function () {
      closeErrBut();
    };

    var onErrButEscPress = function (evt) {
      if (evt.keyCode === window.cardRender.ESC_KEYCODE) {
        closeErrBut();
        window.cardRender.bodyField.removeEventListener('keydown', onErrButEscPress);
      }
    };

    errBut.addEventListener('click', onErrButClick);
    window.cardRender.bodyField.addEventListener('keydown', onErrButEscPress);
  };

  window.backendRender = {
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
