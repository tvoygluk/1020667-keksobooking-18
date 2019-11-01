'use strict';
(function () {
  var formFilters = document.querySelector('.map__filters');
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

  var filerRules = {
    'housing-type': function (data, filter) {
      return data.offer.type === filter.value;
    },
    'housing-price': function (data, filter) {
      return data.offer.price >= pricePerNight[filter.value].start && data.offer.price < pricePerNight[filter.value].end;
    },
    'housing-rooms': function (data, filter) {
      return filter.value === String(data.offer.rooms);
    },
    'housing-guests': function (data, filter) {
      return filter.value === String(data.offer.guests);
    },
    'housing-features': function (data, filter) {
      var filterChecked = Array.from(filter.querySelectorAll('input[type=checkbox]:checked'));
      return filterChecked.every(function (myObject) {
        return data.offer.some.features.some(function (feature) {
          return feature === myObject.value;
        });
      });
    }
  };

  
})();
