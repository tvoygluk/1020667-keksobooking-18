'use strict';

(function () {
  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var fieldsWrapper = document.querySelector('.ad-form');
  var roomNumberSelect = fieldsWrapper.querySelector('#room_number');
  var capacitySelect = fieldsWrapper.querySelector('#capacity');

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

  var typeSelect = fieldsWrapper.querySelector('#type');
  var priceInput = fieldsWrapper.querySelector('#price');

  var setMinPrice = function () {
    var minPrice = window.cardRender.TYPES[typeSelect.value].min;
    priceInput.min = minPrice;
    priceInput.placeholder = minPrice;
  };

  var onTypeSelectChange = function () {
    setMinPrice();
  };
  typeSelect.addEventListener('change', onTypeSelectChange);

  var timeInSelect = fieldsWrapper.querySelector('#timein');
  var timeOutSelect = fieldsWrapper.querySelector('#timeout');
  var onTimeInSelectChange = function () {
    timeOutSelect.value = timeInSelect.value;
  };
  var onTimeOutSelectChange = function () {
    timeInSelect.value = timeOutSelect.value;
  };

  timeInSelect.addEventListener('change', onTimeInSelectChange);
  timeOutSelect.addEventListener('change', onTimeOutSelectChange);
  fieldsWrapper.addEventListener('submit', window.backendAction.onFormSubmit);

  var onButtonResetClick = function () {
    window.backendAction.makePageDefault();
  };

  var buttonReset = fieldsWrapper.querySelector('.ad-form__reset');
  buttonReset.addEventListener('click', onButtonResetClick);

  window.form = {
    fieldsWrapper: fieldsWrapper,
    onRoomNumberSelectChange: onRoomNumberSelectChange,
    onTypeSelectChange: onTypeSelectChange,
    roomNumberSelect: roomNumberSelect,
    priceInput: priceInput,
    setMinPrice: setMinPrice
  };
})();
