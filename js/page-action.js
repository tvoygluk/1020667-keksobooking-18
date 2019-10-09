'use strict';

// Активация страницы page-action.js
(function () {
  var MAIN_PIN_EXTRA_HEIGHT = 15;

  var fieldsets = window.form.adForm.querySelectorAll('fieldset');
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressField = window.form.adForm.querySelector('#address');

  var toggleDisabled = function () {
    for (var m = 0; m < fieldsets.length; m++) {
      fieldsets[m].disabled = !fieldsets[m].disabled;
    }
  };
  toggleDisabled();

  var setAddressValue = function () {
    addressField.value = (window.cardRender.map.classList.contains('map--faded')) ? Math.floor(parseInt(mapPinMain.style.left, 10) + mapPinMain.offsetWidth / 2) + ', ' + Math.floor(parseInt(mapPinMain.style.top, 10) + mapPinMain.offsetHeight / 2) : Math.floor(parseInt(mapPinMain.style.left, 10) + mapPinMain.offsetWidth / 2) + ', ' + Math.floor(parseInt(mapPinMain.style.top, 10) + mapPinMain.offsetHeight + MAIN_PIN_EXTRA_HEIGHT);
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
    window.pinRender.addPinsToLayout();
    setAddressValue();
    window.form.onRoomNumberSelectChange();
    window.form.onTypeSelectChange();
    mapPinMain.removeEventListener('mousedown', onMainPinMouseDown);
    mapPinMain.removeEventListener('keydown', onMainPinKeyDown);
  };

  mapPinMain.addEventListener('mousedown', onMainPinMouseDown);
  mapPinMain.addEventListener('keydown', onMainPinKeyDown);
})();