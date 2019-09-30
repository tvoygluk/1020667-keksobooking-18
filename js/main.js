'use strict';
/*
var CHECKIN_ARRAY = ['12:00', '13:00', '14:00'];
var CHECKOUT_ARRAY = ['12:00', '13:00', '14:00'];
var APARTMENT_TYPE_ARRAY = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTO_ADDRESS_ARRAY = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TOP_LIMIT_POSITION_PIN = 130;
var BOTTOM_LIMIT_POSITION_PIN = 630;
var PIN_PARENT_WIDTH = document.querySelector('.map__pin').parentNode.offsetWidth;
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var TYPES = {
  'palace': {
    ru: 'Дворец'
  },
  'flat': {
    ru: 'Квартира'
  },
  'house': {
    ru: 'Дом'
  },
  'bungalo': {
    ru: 'Бунгало'
  }
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

var makeMocks = function () {
  var MOCKS_LENGTH = 8;
  var mocksArray = [];

  for (var i = 0; i < MOCKS_LENGTH; i++) {
    var mockObj = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': 'Уютное гнездышко для молодоженов',
        'address': '600, 350',
        'price': '5200₽/ночь',
        'type': getRandomArrayElement(APARTMENT_TYPE_ARRAY),
        'rooms': '2',
        'guests': '3',
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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarListElement = map.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var pins = makeMocks();

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (pin.location.x - (PIN_WIDTH / 2)) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px;';
  pinElement.querySelector('.map__pin img').src = pin.author.avatar;
  pinElement.querySelector('.map__pin img').alt = pin.offer.title;
  pinElement.tabIndex = 0;
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

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var renserCard = function (pin) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = pin.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = pin.offer.price;
  cardElement.querySelector('.popup__type').textContent = TYPES[pin.offer.type].ru;
  cardElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;

  var features = cardElement.querySelector('.popup__features');
  features.innerHTML = '';
  for (var i = 0; i < pin.offer.features.length; i++) {
    var featuresElement = document.createElement('li');
    featuresElement.className = ('popup__feature popup__feature--' + pin.offer.features[i]);
    features.appendChild(featuresElement);
  }

  cardElement.querySelector('.popup__description').textContent = pin.offer.description;
  var popupPhotos = cardElement.querySelector('.popup__photos');
  popupPhotos.innerHTML = '';
  for (var j = 0; j < pin.offer.photos.length; j++) {
    var photoElement = document.createElement('img');
    photoElement.src = pin.offer.photos[j];
    photoElement.className = ('popup__photo');
    photoElement.width = 45;
    photoElement.height = 40;
    photoElement.alt = 'Фотография жилья';
    popupPhotos.appendChild(photoElement);
  }

  cardElement.querySelector('.popup__avatar').src = pin.author.avatar;

  return cardElement;
};

var cardListElement = document.querySelector('.map');
addFragmentToLayout(pins, cardListElement, renserCard);
*/
var adForm = document.querySelector('.ad-form');

var makeDisabled = function (element) {
  return element.setAttribute('disabled', 'disabled');
};

var adFormHeaderInput = adForm.querySelector('.ad-form-header__input');
makeDisabled(adFormHeaderInput);

var titleInput = document.getElementById('title');
makeDisabled(titleInput);

var addressInput = document.getElementById('address');
makeDisabled(addressInput);

var typeInput = document.getElementById('type');
makeDisabled(typeInput);

var priceInput = document.getElementById('price');
makeDisabled(priceInput);

var timeinInput = document.getElementById('timein');
makeDisabled(timeinInput);

var timeoutInput = document.getElementById('timeout');
makeDisabled(timeoutInput);

var roomNumberInput = document.getElementById('room_number');
makeDisabled(roomNumberInput);

var capacityInput = document.getElementById('capacity');
makeDisabled(capacityInput);

var featuresInput = adForm.querySelectorAll('input[name=features]');
for (var i = 0; i < featuresInput.length; i++) {
  makeDisabled(featuresInput[i]);
}

var descriptionInput = document.getElementById('description');
makeDisabled(descriptionInput);

var imagesInput = document.getElementById('images');
makeDisabled(imagesInput);

var adFormSubmitInput = adForm.querySelector('.ad-form__submit');
makeDisabled(adFormSubmitInput);

var makePageActive = function () {
  var allInputsAdForm = adForm.querySelectorAll('input');
  for (var k = 0; k < allInputsAdForm.length; k++) {
    allInputsAdForm[k].disabled = false;
  }

  var allSelectsAdForm = adForm.querySelectorAll('select');
  for (var j = 0; j < allSelectsAdForm.length; j++) {
    allSelectsAdForm[j].disabled = false;
  }

  descriptionInput.disabled = false;

  adFormSubmitInput.disabled = false;
};

var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('mousedown', function () {
  makePageActive();
});
