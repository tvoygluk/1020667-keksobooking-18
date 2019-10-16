'use strict';

// Моки mocks.js
(function () {
  var MOCKS_LENGTH = 8;
  var CHECKIN_ARRAY = ['12:00', '13:00', '14:00'];
  var CHECKOUT_ARRAY = ['12:00', '13:00', '14:00'];
  var APARTMENT_TYPE_ARRAY = ['palace', 'flat', 'house', 'bungalo'];
  var FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTO_ADDRESS_ARRAY = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var TOP_LIMIT_POSITION_PIN = 130;
  var BOTTOM_LIMIT_POSITION_PIN = 630;
  var PIN_PARENT_WIDTH = document.querySelector('.map__pin').parentNode.offsetWidth;

  var getRandomArrayElement = function (someArray) {
    return someArray[Math.floor(Math.random() * someArray.length)];
  };

  var shuffleArray = function (array) {
    var newLength = array.length;
    var buffer;
    var currentRandomLength;

    while (newLength) {
      currentRandomLength = Math.floor(Math.random() * newLength--);
      buffer = array[newLength];
      array[newLength] = array[currentRandomLength];
      array[currentRandomLength] = buffer;
    }

    return array;
  };

  var makeArrayRandomShorterSize = function (str) {
    return str.slice(0, randomInteger(0, str.length) + 1);
  };

  var makeNewShorterShuffleArray = function (array) {
    return makeArrayRandomShorterSize(shuffleArray(array));
  };

  var randomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);

    return Math.floor(rand);
  };

  var makeMocks = function () {
    var mocksArray = [];

    for (var k = 0; k < MOCKS_LENGTH; k++) {
      var mockObj = {
        'author': {
          'avatar': 'img/avatars/user0' + (k + 1) + '.png'
        },

        'offer': {
          'title': 'Уютное гнездышко для молодоженов',
          'address': '600, 350',
          'price': '5200₽/ночь',
          'type': getRandomArrayElement(APARTMENT_TYPE_ARRAY),
          'rooms': '3',
          'guests': '1',
          'checkin': getRandomArrayElement(CHECKIN_ARRAY),
          'checkout': getRandomArrayElement(CHECKOUT_ARRAY),
          'features': makeNewShorterShuffleArray(FEATURES_ARRAY),
          'description': 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
          'photos': makeNewShorterShuffleArray(PHOTO_ADDRESS_ARRAY)

        },

        'location': {
          'x': randomInteger(1, PIN_PARENT_WIDTH),
          'y': randomInteger(TOP_LIMIT_POSITION_PIN, BOTTOM_LIMIT_POSITION_PIN)
        }
      };

      mocksArray.push(mockObj);
    }

    return mocksArray;
  };

  window.mocks = {
    makeMocks: makeMocks,
    TOP_LIMIT_POSITION_PIN: TOP_LIMIT_POSITION_PIN,
    BOTTOM_LIMIT_POSITION_PIN: BOTTOM_LIMIT_POSITION_PIN,
    PIN_PARENT_WIDTH: PIN_PARENT_WIDTH
  };
})();
