'use strict';

(function () {
  var formFilters = document.querySelector('.map__filters'); //мб не документ
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
      var filterChecked = Array.from(filter.querySelectorAll('input[type=checkbox]:checked'));

      return filterChecked.every(function (myObject) {
        return data.offer.features.some(function (feature) {
          return feature === myObject.value;
        });
      });
    }
  };

  var getFiltersData = function (data, elements) {
    return data.filter(function (item) {
      return elements.every(function (filter) {
        return (filter.value === 'any') ? true : filterRules[filter.id](item, filter);
      });
    });
  };

  var resetFilter = function () {
    formFilters.reset();
  };

  var onFormFiltersChange = function () {
    var filterElements = [];
    filterElements = Array.form(formFilters.children);
    window.card.remove(); //
    window.parseInt.render(getFiltersData(window.Map.getData(), filterElements)); //
  };

  formFilters.addEventListener('change', onFormFiltersChange);

  window.filter = {
    reset: resetFilter
  };
})();
