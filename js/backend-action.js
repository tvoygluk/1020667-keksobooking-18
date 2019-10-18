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

  var makePageDefault = function () {

    var makeDefaultSelect = function (element) {
      element.value = element.querySelector('option[selected]').value;
    };
    var allFormSelect = window.form.adForm.querySelectorAll('select');
    allFormSelect.forEach(function (element) {
      makeDefaultSelect(element);
    });

    var makeDefaultInput = function (element) {
      if (element.value) {
        element.value = null;
      }
    };

    var formTitle = window.form.adForm.querySelector('#title');
    makeDefaultInput(formTitle);

    makeDefaultInput(window.form.priceInput);
    window.form.setMinPrice();

    var formDescription = window.form.adForm.querySelector('#description');
    makeDefaultInput(formDescription);

    var feature = window.form.adForm.querySelectorAll('.feature__checkbox:checked');
    feature.forEach(function (element) {
      element.checked = false;
    });

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

  var sendData = function () {
    makePageDefault();
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
