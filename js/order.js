'use strict';

(function () {
  var removeMapPins = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPins.forEach(function (element) {
      if (element !== null) {
        element.remove();
      }
    });
  };

  var somePins = [];

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

  var getRank = function (myObject) {
    var rank = 0;

    if (myObject.offer.type === housingTypeValue) {
      rank++;
    }
    if (String(myObject.offer.rooms) === roomsValue) {
      rank++;
    }
    if (String(myObject.offer.guests) === guestsValue) {
      rank++;
    }
    var pricePerNight = myObject.offer.price;
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
    if (myObject.offer.features.includes(wifiValue)) {
      rank++;
    }
    if (myObject.offer.features.includes(dishwasherValue)) {
      rank++;
    }
    if (myObject.offer.features.includes(parkingValue)) {
      rank++;
    }
    if (myObject.offer.features.includes(washerValue)) {
      rank++;
    }
    if (myObject.offer.features.includes(elevatorValue)) {
      rank++;
    }
    if (myObject.offer.features.includes(conditionerValue)) {
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

  var toFreshPins = function () {
    window.cardRender.closePopup();
    window.order.removeMapPins();
    updatePins();
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
    wifiValue = wifiFilter.checked ? wifiFilter.value : null;
    toFreshPins();
  });
  wifiFilter.addEventListener('change', onWifiFilterCheckedChange);

  var onDishwasherFilterCheckedChange = window.timer.debounce(function () {
    dishwasherValue = dishwasherFilter.checked ? dishwasherFilter.value : null;
    toFreshPins();
  });
  dishwasherFilter.addEventListener('change', onDishwasherFilterCheckedChange);

  var onParkingFilterCheckedChange = window.timer.debounce(function () {
    parkingValue = parkingFilter.checked ? parkingFilter.value : null;
    toFreshPins();
  });
  parkingFilter.addEventListener('change', onParkingFilterCheckedChange);

  var onWasherFilterCheckedChange = window.timer.debounce(function () {
    washerValue = washerFilter.checked ? washerFilter.value : null;
    toFreshPins();
  });
  washerFilter.addEventListener('change', onWasherFilterCheckedChange);

  var onElevatorFilterCheckedChange = window.timer.debounce(function () {
    elevatorValue = elevatorFilter.checked ? elevatorFilter.value : null;
    toFreshPins();
  });
  elevatorFilter.addEventListener('change', onElevatorFilterCheckedChange);

  var onConditionerFilterCheckedChange = window.timer.debounce(function () {
    conditionerValue = conditionerFilter.checked ? conditionerFilter.value : null;
    toFreshPins();
  });
  conditionerFilter.addEventListener('change', onConditionerFilterCheckedChange);

  window.order = {
    removeMapPins: removeMapPins,
    somePins: somePins,
    updatePins: updatePins,
    pinFilter: pinFilter
  };
})();
