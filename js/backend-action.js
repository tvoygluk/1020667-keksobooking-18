'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
  window.timer = {
    debounce: debounce
  };
})();

(function () {
  var removeMapPins = function () {
    var mapPins = document.querySelectorAll('.map__pin');
    for (var m = 1; m < mapPins.length; m++) {
      if (mapPins[m] !== null) {
        mapPins[m].remove();
      }
    }
  };

  var somePins = [];

  window.order = {
    removeMapPins: removeMapPins,
    somePins: somePins
  };

})();


(function () {
  var MAIN_PIN_POS_Y = 375;
  var MAIN_PIN_POS_X = 570;

  // var removeMapPins = function () {
  //   var mapPins = document.querySelectorAll('.map__pin');
  //   for (var m = 1; m < mapPins.length; m++) {
  //     if (mapPins[m] !== null) {
  //       mapPins[m].remove();
  //     }
  //   }
  // };

  // var somePins = [];

  var housingTypeValue;
  var roomsValue;
  var guestsValue;
  var priceValue;
  var wifiValue;
  var dishwasherValue;
  var parkingValue;
  var washerValue;
  var elevatorValue;
  var conditionerValue;

  var getRank = function (el) {
    var rank = 0;

    if (el.offer.type === housingTypeValue) {
      rank++;
    }
    if (String(el.offer.rooms) === roomsValue) {
      rank++;
    }
    if (String(el.offer.guests) === guestsValue) {
      rank++;
    }
    var pricePerNight = el.offer.price;
    if (pricePerNight >= 0 && pricePerNight < 10000) {
      pricePerNight = 'low';
    } else if (pricePerNight >= 10000 && pricePerNight <= 50000) {
      pricePerNight = 'middle';
    } else if (pricePerNight > 50000) {
      pricePerNight = 'high';
    } else if (pricePerNight > 0) {
      pricePerNight = 'any';
    }
    if (pricePerNight === priceValue) {
      rank++;
    }
    if (el.offer.features.includes(wifiValue)) {
      rank++;
    }
    if (el.offer.features.includes(dishwasherValue)) {
      rank++;
    }
    if (el.offer.features.includes(parkingValue)) {
      rank++;
    }
    if (el.offer.features.includes(washerValue)) {
      rank++;
    }
    if (el.offer.features.includes(elevatorValue)) {
      rank++;
    }
    if (el.offer.features.includes(conditionerValue)) {
      rank++;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var pinFilter = document.querySelector('.map__filters-container');

  var mapFilters = pinFilter.querySelector('.map__filters');
  var typeFilter = pinFilter.querySelector('#housing-type');
  var roomsFilter = pinFilter.querySelector('#housing-rooms');
  var guestsFilter = pinFilter.querySelector('#housing-guests');
  var priceFilter = pinFilter.querySelector('#housing-price');
  var wifiFilter = pinFilter.querySelector('#filter-wifi');
  var dishwasherFilter = pinFilter.querySelector('#filter-dishwasher');
  var parkingFilter = pinFilter.querySelector('#filter-parking');
  var washerFilter = pinFilter.querySelector('#filter-washer');
  var elevatorFilter = pinFilter.querySelector('#filter-elevator');
  var conditionerFilter = pinFilter.querySelector('#filter-conditioner');

  var toFreshPins = function () {
    window.cardRender.closePopup();
    window.order.removeMapPins();
    updatePins();
  };

  var updatePins = function () {
    var someFilterPins = window.order.somePins.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.offer.address, right.offer.address);
      }
      return rankDiff;
    });
    window.pinRender.addPinsToLayout(someFilterPins);
  };
  var onTypeFilterSelectChange = window.timer.debounce(function () {
    housingTypeValue = typeFilter.value;
    toFreshPins();
  });
  typeFilter.addEventListener('change', onTypeFilterSelectChange);

  var onRoomsFilterSelectChange = window.timer.debounce(function () {
    roomsValue = roomsFilter.value;
    toFreshPins();
  });
  roomsFilter.addEventListener('change', onRoomsFilterSelectChange);

  var onGuestsFilterSelectChange = window.timer.debounce(function () {
    guestsValue = guestsFilter.value;
    toFreshPins();
  });
  guestsFilter.addEventListener('change', onGuestsFilterSelectChange);

  var onPriceFilterSelectChange = window.timer.debounce(function () {
    priceValue = priceFilter.value;
    toFreshPins();
  });
  priceFilter.addEventListener('change', onPriceFilterSelectChange);

  var onWifiFilterCheckedChange = window.timer.debounce(function () {
    if (wifiFilter.checked) {
      wifiValue = wifiFilter.value;
    } else {
      wifiValue = null;
    }
    toFreshPins();
  });
  wifiFilter.addEventListener('change', onWifiFilterCheckedChange);

  var onDishwasherFilterCheckedChange = window.timer.debounce(function () {
    if (dishwasherFilter.checked) {
      dishwasherValue = dishwasherFilter.value;
    } else {
      dishwasherValue = null;
    }
    toFreshPins();
  });
  dishwasherFilter.addEventListener('change', onDishwasherFilterCheckedChange);

  var onParkingFilterCheckedChange = window.timer.debounce(function () {
    if (parkingFilter.checked) {
      parkingValue = parkingFilter.value;
    } else {
      parkingValue = null;
    }
    toFreshPins();
  });
  parkingFilter.addEventListener('change', onParkingFilterCheckedChange);

  var onWasherFilterCheckedChange = window.timer.debounce(function () {
    if (washerFilter.checked) {
      washerValue = washerFilter.value;
    } else {
      washerValue = null;
    }
    toFreshPins();
  });
  washerFilter.addEventListener('change', onWasherFilterCheckedChange);

  var onElevatorFilterCheckedChange = window.timer.debounce(function () {
    if (elevatorFilter.checked) {
      elevatorValue = elevatorFilter.value;
    } else {
      elevatorValue = null;
    }
    toFreshPins();
  });
  elevatorFilter.addEventListener('change', onElevatorFilterCheckedChange);

  var onConditionerFilterCheckedChange = window.timer.debounce(function () {
    if (conditionerFilter.checked) {
      conditionerValue = conditionerFilter.value;
    } else {
      conditionerValue = null;
    }
    toFreshPins();
  });
  conditionerFilter.addEventListener('change', onConditionerFilterCheckedChange);





  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  var successHandler = function (data) {
    window.order.somePins = data;
    updatePins();
  };

  var addSomethingToLayout = function (something) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(something);
    document.body.children[0].appendChild(fragment);
  };

  var makeSuccessMessage = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var someSuccess = successTemplate.cloneNode(true);
    addSomethingToLayout(someSuccess);

    var closeSuccess = function () {
      if (someSuccess !== null) {
        someSuccess.remove();
      }
    };

    var onSuccessClick = function () {
      closeSuccess();
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

  var errorHandler = function (message) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var someError = errorTemplate.cloneNode(true);
    var errorMessage = someError.querySelector('.error__message');
    errorMessage.textContent = message;

    addSomethingToLayout(someError);

    var closeErrorButton = function () {
      if (someError !== null) {
        someError.remove();
      }
    };

    var onErrorClick = function () {
      closeErrorButton();
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
    window.form.adForm.reset();
    mapFilters.reset();
    window.form.setMinPrice();

    window.cardRender.closePopup();
    window.order.removeMapPins();

    window.pageAction.mapPinMain.style.top = MAIN_PIN_POS_Y + 'px';
    window.pageAction.mapPinMain.style.left = MAIN_PIN_POS_X + 'px';
    window.pageAction.toggleDisabled();
    window.form.adForm.classList.add('ad-form--disabled');
    window.cardRender.map.classList.add('map--faded');
    window.pageAction.setAddressValue(window.pageAction.mapPinMain);
    window.pageAction.mapPinMain.addEventListener('mousedown', window.pageAction.onMainPinMouseDown);
    window.pageAction.mapPinMain.addEventListener('keydown', window.pageAction.onMainPinKeyDown);
  };

  var sendData = function () {
    makePageDefault();
    makeSuccessMessage();
  };

  var onSubmitForm = function (evt) {
    window.backend.save(sendData, errorHandler, new FormData(window.form.adForm));
    evt.preventDefault();
  };

  window.backendAction = {
    successHandler: successHandler,
    errorHandler: errorHandler,
    onSubmitForm: onSubmitForm,
    makePageDefault: makePageDefault
  };
})();
