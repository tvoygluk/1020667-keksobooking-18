'use strict';

var CHECKIN_ARRAY = ['12:00', '13:00', '14:00'];
var CHECKOUT_ARRAY = ['12:00', '13:00', '14:00'];
var APARTMENT_TYPE_ARRAY = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTO_ADDRESS_ARRAY = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var addZeroBeforeNum = function (num, size) {
  var string = String(num);
  while (string.length < size) {
    string = '0' + string;
  }
  return string;
};

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
  var array = str.split(', ');
  array = str.split(', ', Math.floor(Math.random() * array.length));

  return array;
};

var makeNewShorterShuffleArray = function (array) {
  return makeArrayRandomShorterSize(shuffleArray(array).join(', '));
};

var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
};

var TOP_LIMIT_POSITION_PIN = 130;
var BOTTOM_LIMIT_POSITION_PIN = 630;
var PIN_HEIGHT = document.querySelector('.map__pin').offsetHeight;

var realRandomElementVerticalPosition = function (topBorder, bottomBorder, sizeElement) {
  var realYPosition = randomInteger(topBorder, bottomBorder) - sizeElement;

  return realYPosition > 0 ? realYPosition : sizeElement;
};

var PIN_PARENT_WIDTH = document.querySelector('.map__pin').parentNode.offsetWidth;
var PIN_WIDTH = 50;

var realRandomElementHorisontalPosition = function (widthParent, widthChild) {
  var halfWidthChild = widthChild / 2;
  var realXPosition = randomInteger(halfWidthChild, widthParent - halfWidthChild) - halfWidthChild;

  return realXPosition;
};

var makeMocks = function () {
  var MOCKS_LENGTH = 8;
  var mocksArray = [];

  for (var i = 0; i < MOCKS_LENGTH; i++) {
    var mockObj = {
      'author': {
        'avatar': 'img/avatars/user' + addZeroBeforeNum(i + 1, 2) + '.png'
      },

      'offer': {
        'title': '',
        'address': '{{location.x}}, {{location.y}}',
        'price': 0,
        'type': getRandomArrayElement(APARTMENT_TYPE_ARRAY),
        'rooms': 0,
        'guests': 0,
        'checkin': getRandomArrayElement(CHECKIN_ARRAY),
        'checkout': getRandomArrayElement(CHECKOUT_ARRAY),
        'features': makeNewShorterShuffleArray(FEATURES_ARRAY),
        'description': '',
        'photos': makeNewShorterShuffleArray(PHOTO_ADDRESS_ARRAY)

      },

      'location': {
        'x': String(realRandomElementHorisontalPosition(PIN_PARENT_WIDTH, PIN_WIDTH)),
        'y': String(realRandomElementVerticalPosition(TOP_LIMIT_POSITION_PIN, BOTTOM_LIMIT_POSITION_PIN, PIN_HEIGHT))
      }
    };

    mocksArray.push(mockObj);
  }

  return mocksArray;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarListElement = map.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var pins = makeMocks();

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;';
  pinElement.querySelector('.map__pin img').src = pin.author.avatar;
  pinElement.querySelector('.map__pin img').alt = '{{заголовок объявления}}';
  return pinElement;
};

var addFragmentToLayout = function (mocks, addedBlock, renderFun) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < mocks.length; i++) {
    fragment.appendChild(renderFun(mocks[i]));
  }
  addedBlock.appendChild(fragment);
};

addFragmentToLayout(pins, similarListElement, renderPin);
