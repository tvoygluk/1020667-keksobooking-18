'use strict';

(function () {
  var INITIAL_PINS = 5;

  var removePins = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPins.forEach(function (item) {
      if (item !== null) {
        item.remove();
      }
    });
  };

  var pricePerNight = {
    'low': {
      start: 0,
      end: 10000
    },
    'middle': {
      start: 10000,
      end: 50000
    },
    'high': {
      start: 50000,
      end: Infinity
    }
  };

  var filterRules = {
    'housing-type': function (data, filter) {
      return data.offer.type === filter.value;
    },
    'housing-price': function (data, filter) {
      return data.offer.price >= pricePerNight[filter.value].start && data.offer.price < pricePerNight[filter.value].end;
    },
    'housing-rooms': function (data, filter) {
      return String(data.offer.rooms) === filter.value;
    },
    'housing-guests': function (data, filter) {
      return String(data.offer.guests) === filter.value;
    },
    'housing-features': function (data, filter) {
      var filtersChecked = Array.from(filter.querySelectorAll('input[type=checkbox]:checked'));

      return filtersChecked.every(function (inputChecked) {
        return data.offer.features.some(function (feature) {
          return feature === inputChecked.value;
        });
      });
    }
  };

  var pinFilter = window.cardRender.map.querySelector('.map__filters');

  var getFilterData = function (data, elements) {
    return data.filter(function (item) {
      return elements.every(function (filter) {
        return (filter.value === 'any') ? true : filterRules[filter.id](item, filter);
      });
    });
  };

  var updatePins = function () {
    var filterElements = Array.from(window.cardRender.map.querySelector('.map__filters').children);

    var filteredData = getFilterData(window.backendAction.pins().slice(), filterElements).slice(0, INITIAL_PINS);

    window.pinRender.addPinsToLayout(filteredData);
  };

  var refreshPins = function () {
    window.cardRender.closePopup();
    removePins();
    updatePins();
  };

  var onPinFilterChange = window.timer.debounce(function () {
    refreshPins();
  });

  pinFilter.addEventListener('change', onPinFilterChange);

  window.order = {
    INITIAL_PINS: INITIAL_PINS,
    removePins: removePins,
    updatePins: updatePins,
    pinFilter: pinFilter
  };
})();
