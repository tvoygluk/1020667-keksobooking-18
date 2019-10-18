'use strict';

// Валидация формы form.js
(function () {
  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var adForm = document.querySelector('.ad-form');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');

  var onRoomNumberSelectChange = function () {
    if (capacitySelect.options.length > 0) {
      [].forEach.call(capacitySelect.options, function (item) {
        item.classList.remove('visually-hidden');
        item.selected = (ROOMS_CAPACITY[roomNumberSelect.value][0] === item.value);
        item.disabled = !(ROOMS_CAPACITY[roomNumberSelect.value].indexOf(item.value) >= 0);
      });
    }
  };
  roomNumberSelect.addEventListener('change', onRoomNumberSelectChange);

  var typeSelect = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');

  var setMinPrice = function () {
    var minPrice = window.cardRender.TYPES[typeSelect.value].min;
    priceInput.min = minPrice;
    priceInput.placeholder = minPrice;
  };

  var onTypeSelectChange = function () {
    setMinPrice();
  };
  typeSelect.addEventListener('change', onTypeSelectChange);

  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var setTimeInEqualTimeOut = function () {
    timeOutSelect.value = timeInSelect.value;
  };
  var setTimeOutEqualTimeIn = function () {
    timeInSelect.value = timeOutSelect.value;
  };

  timeInSelect.addEventListener('change', setTimeInEqualTimeOut);
  timeOutSelect.addEventListener('change', setTimeOutEqualTimeIn);
  adForm.addEventListener('submit', window.backendAction.onSubmitForm);

  var onClickButtonReset = function () {
    window.backendAction.makePageDefault();
  };

  var buttonReset = adForm.querySelector('.ad-form__reset');
  buttonReset.addEventListener('click', onClickButtonReset);

  window.form = {
    adForm: adForm,
    onRoomNumberSelectChange: onRoomNumberSelectChange,
    onTypeSelectChange: onTypeSelectChange,
    roomNumberSelect: roomNumberSelect,
    priceInput: priceInput,
    setMinPrice: setMinPrice
  };
})();
