'use strict';
(function () {
  var MAIN_PIN_POS_Y = 375;
  var MAIN_PIN_POS_X = 570;

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

  var sendData = function () {
    // window.form.roomNumberSelect.value = '1';
    // for (var i = 0; i < window.form.roomNumberSelect.children.length; i++) {
    // if (window.form.roomNumberSelect.document.querySelector('option[selected]')) {
      console.log(window.form.roomNumberSelect.querySelector('option[selected]').value);
      // window.form.roomNumberSelect.value = window.form.roomNumberSelect.document.querySelector('option[selected]').value;
    // }
    // }
    console.log(window.form.roomNumberSelect.children);
    window.form.roomNumberSelect.addEventListener('change', window.form.onRoomNumberSelectChange);

    window.cardRender.closePopup();
    var mapPins = document.querySelectorAll('.map__pin');
    for (var m = 1; m < mapPins.length; m++) {
      if (mapPins[m] !== null) {
        mapPins[m].remove();
      }
    }
    window.pageAction.mapPinMain.style.top = MAIN_PIN_POS_Y + 'px';
    window.pageAction.mapPinMain.style.left = MAIN_PIN_POS_X + 'px';
    window.pageAction.setAddressValue(window.pageAction.mapPinMain);
    window.pageAction.toggleDisabled();
    window.form.adForm.classList.add('ad-form--disabled');
    window.cardRender.map.classList.add('map--faded');
    window.pageAction.mapPinMain.addEventListener('mousedown', window.pageAction.onMainPinMouseDown);
    window.pageAction.mapPinMain.addEventListener('keydown', window.pageAction.onMainPinKeyDown);
  };

  var onSubmitForm = function (evt) {
    window.backend.save(sendData, errorHandler, new FormData(window.form.adForm));
    evt.preventDefault();
  };

  window.backendAction = {
    successHandler: successHandler,
    errorHandler: errorHandler,
    onSubmitForm: onSubmitForm
  };
})();
