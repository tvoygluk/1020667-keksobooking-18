'use strict';

(function () {
  var MAIN_PIN_POS_Y = 375;
  var MAIN_PIN_POS_X = 570;

  var pins = [];

  var successEvent = function (data) {
    pins = data.slice();
    window.pinRender.addPinsToLayout(pins.slice(0, window.order.INITIAL_PINS));
  };

  var fillLayout = function (something) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(something);
    document.body.children[0].appendChild(fragment);
  };

  var makeSuccessMessage = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var someSuccess = successTemplate.cloneNode(true);
    var successMessage = someSuccess.querySelector('.success__message');
    fillLayout(someSuccess);

    var closeSuccess = function () {
      if (someSuccess !== null) {
        someSuccess.remove();
      }
    };

    var onSuccessClick = function (evt) {
      if (evt.target !== successMessage) {
        closeSuccess();
      }
    };

    var onEscPress = function (evt) {
      if (evt.keyCode === window.cardRender.ESC_KEYCODE) {
        closeSuccess();
        window.cardRender.bodyField.removeEventListener('keydown', onEscPress);
      }
    };
    document.addEventListener('click', onSuccessClick);
    window.cardRender.bodyField.addEventListener('keydown', onEscPress);
  };

  var errorEvent = function (message) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var someError = errorTemplate.cloneNode(true);
    var errorMessage = someError.querySelector('.error__message');
    errorMessage.textContent = message;

    fillLayout(someError);

    var closeErrorButton = function () {
      if (someError !== null) {
        someError.remove();
      }
    };

    var onErrorClick = function (evt) {
      if (evt.target !== errorMessage) {
        closeErrorButton();
      }
    };

    var onEscPress = function (evt) {
      if (evt.keyCode === window.cardRender.ESC_KEYCODE) {
        closeErrorButton();
        window.cardRender.bodyField.removeEventListener('keydown', onEscPress);
      }
    };

    someError.addEventListener('click', onErrorClick);
    window.cardRender.bodyField.addEventListener('keydown', onEscPress);
  };

  var makePageDefault = function () {
    window.form.fieldsWrapper.reset();
    window.order.pinFilter.reset();
    window.form.setMinPrice();
    window.cardRender.closePopup();
    window.order.removePins();

    window.photo.avatar.src = 'img/muffin-grey.svg';
    var photoContainers = window.photo.containerImg.querySelectorAll('.ad-form__photo');
    photoContainers.forEach(function (item, i) {
      if (i !== 0) {
        item.parentNode.removeChild(item);
      }
    });

    window.pageAction.mapPinMain.style.top = MAIN_PIN_POS_Y + 'px';
    window.pageAction.mapPinMain.style.left = MAIN_PIN_POS_X + 'px';
    window.pageAction.toggleDisabled();
    window.form.fieldsWrapper.classList.add('ad-form--disabled');
    window.cardRender.map.classList.add('map--faded');
    window.pageAction.setAddressValue(window.pageAction.mapPinMain);
    window.pageAction.mapPinMain.addEventListener('mousedown', window.pageAction.onMainPinMouseDown);
    window.pageAction.mapPinMain.addEventListener('keydown', window.pageAction.onMainPinKeyDown);
  };

  var sendData = function () {
    makePageDefault();
    makeSuccessMessage();
  };

  var onFormSubmit = function (evt) {
    window.backend.save(sendData, errorEvent, new FormData(window.form.fieldsWrapper));
    evt.preventDefault();
  };

  window.backendAction = {
    pins: function () {
      return pins;
    },
    successEvent: successEvent,
    errorEvent: errorEvent,
    onFormSubmit: onFormSubmit,
    makePageDefault: makePageDefault
  };
})();
