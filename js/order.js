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

  var somePins = [];

  var pinFilter = window.cardRender.map.querySelector('.map__filters');

  var getFilterData = function (data, elements) {
    return data.filter(function (item) {
      return elements.every(function (filter) {
        return (filter.value === 'any') ? true : filterRules[filter.id](item, filter);
      });
    });
  };

  var filterElements = [];

  var updatePins = function () {
    var originalData = window.order.somePins;
    window.order.filterElements = Array.from(window.order.pinFilter.children);
    var subtotalData = getFilterData(window.order.somePins, window.order.filterElements).concat(originalData);
    var filteredData = subtotalData.filter(function (item, i) {
      return subtotalData.indexOf(item) === i;
    });
    window.pinRender.addPinsToLayout(filteredData);
  };

  var refreshPins = function () {
    window.cardRender.closePopup();
    window.order.removeMapPins();
    updatePins();
  };

  var onPinFilterChange = window.timer.debounce(function () {
    refreshPins();
  });

  pinFilter.addEventListener('change', onPinFilterChange);

  window.order = {
    removeMapPins: removeMapPins,
    somePins: somePins,
    updatePins: updatePins,
    pinFilter: pinFilter,
    filterElements: filterElements
  };
})();
