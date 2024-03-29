'use strict';

(function () {
  var MAIN_PIN_EXTRA_HEIGHT = 16;

  var fieldsets = window.form.fieldsWrapper.querySelectorAll('fieldset');
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressField = window.form.fieldsWrapper.querySelector('#address');

  var toggleDisabled = function () {
    fieldsets.forEach(function (element) {
      element.disabled = !element.disabled;
    });
  };
  toggleDisabled();

  var setAddressValue = function (element) {
    var blockPin = element || mapPinMain;
    var mapPinMainXCenter = Math.floor(parseInt(blockPin.style.left, 10) + blockPin.offsetWidth / 2);
    var mapPinMainYTop = parseInt(blockPin.style.top, 10);
    addressField.value = (window.cardRender.map.classList.contains('map--faded')) ? mapPinMainXCenter + ', ' + Math.floor(mapPinMainYTop + blockPin.offsetHeight / 2) : mapPinMainXCenter + ', ' + Math.floor(mapPinMainYTop + blockPin.offsetHeight + MAIN_PIN_EXTRA_HEIGHT);
  };

  setAddressValue();

  var onMainPinMouseDown = function () {
    makePageActive();
  };

  var onMainPinKeyDown = function (evt) {
    if (evt.keyCode === window.pinRender.ENTER_KEYCODE) {
      makePageActive();
    }
  };

  var makePageActive = function () {
    toggleDisabled();
    window.form.fieldsWrapper.classList.remove('ad-form--disabled');
    window.cardRender.map.classList.remove('map--faded');

    if (window.backendAction.pins().length === 0) {
      window.backend.load(window.backendAction.successEvent, window.backendAction.errorEvent);
    } else {
      window.pinRender.addPinsToLayout(window.backendAction.pins().slice(0, window.order.INITIAL_PINS));
    }

    setAddressValue();
    window.form.onRoomNumberSelectChange();
    window.form.onTypeSelectChange();
    mapPinMain.removeEventListener('mousedown', onMainPinMouseDown);
    mapPinMain.removeEventListener('keydown', onMainPinKeyDown);
  };

  mapPinMain.addEventListener('mousedown', onMainPinMouseDown);
  mapPinMain.addEventListener('keydown', onMainPinKeyDown);

  window.pageAction = {
    MAIN_PIN_EXTRA_HEIGHT: MAIN_PIN_EXTRA_HEIGHT,
    mapPinMain: mapPinMain,
    setAddressValue: setAddressValue,
    makePageActive: makePageActive,
    toggleDisabled: toggleDisabled,
    onMainPinMouseDown: onMainPinMouseDown,
    onMainPinKeyDown: onMainPinKeyDown
  };
})();
