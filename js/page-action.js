'use strict';

// Активация страницы page-action.js
(function () {
  var MAIN_PIN_EXTRA_HEIGHT = 16;

  var fieldsets = window.form.adForm.querySelectorAll('fieldset');
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressField = window.form.adForm.querySelector('#address');

  var toggleDisabled = function () {
    fieldsets.forEach(function (element) {
      element.disabled = !element.disabled;
    });
  };
  toggleDisabled();

  var setAddressValue = function (element) {
    var el = element || mapPinMain;
    var mapPinMainXCenter = Math.floor(parseInt(el.style.left, 10) + el.offsetWidth / 2);
    var mapPinMainYTop = parseInt(el.style.top, 10);
    addressField.value = (window.cardRender.map.classList.contains('map--faded')) ? mapPinMainXCenter + ', ' + Math.floor(mapPinMainYTop + el.offsetHeight / 2) : mapPinMainXCenter + ', ' + Math.floor(mapPinMainYTop + el.offsetHeight + MAIN_PIN_EXTRA_HEIGHT);
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
    window.form.adForm.classList.remove('ad-form--disabled');
    window.cardRender.map.classList.remove('map--faded');
    window.backend.load(window.backendAction.successHandler, window.backendAction.errorHandler);
    setAddressValue();
    window.form.onRoomNumberSelectChange();
    window.form.onTypeSelectChange();
    mapPinMain.removeEventListener('mousedown', onMainPinMouseDown);
    mapPinMain.removeEventListener('keydown', onMainPinKeyDown);
  };

  mapPinMain.addEventListener('mousedown', onMainPinMouseDown);
  mapPinMain.addEventListener('keydown', onMainPinKeyDown);

  window.pageAction = {
    mapPinMain: mapPinMain,
    setAddressValue: setAddressValue,
    MAIN_PIN_EXTRA_HEIGHT: MAIN_PIN_EXTRA_HEIGHT,
    makePageActive: makePageActive,
    toggleDisabled: toggleDisabled,
    onMainPinMouseDown: onMainPinMouseDown,
    onMainPinKeyDown: onMainPinKeyDown
  };
})();
