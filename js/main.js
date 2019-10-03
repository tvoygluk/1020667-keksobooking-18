'use strict';

var MOCKS_LENGTH = 8;
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
var MAIN_PIN_EXTRA_HEIGHT = 15;
var ENTER_KEYCODE = 13;
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
var ROOMS_CAPACITY = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

// Создание моковых данных для пинов
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

var similarListElement = map.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Отрисовка моковых данных
var pins = makeMocks();

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (pin.location.x - (PIN_WIDTH / 2)) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px;';
  pinElement.querySelector('.map__pin img').src = pin.author.avatar;
  pinElement.querySelector('.map__pin img').alt = pin.offer.title;
  pinElement.tabIndex = 0;
  return pinElement;
};

var addFragmentToLayout = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  similarListElement.appendChild(fragment);
};

// Создание моковых данных для карточек
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var renderCard = function (pin) {
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

// Валидация формы
var adForm = document.querySelector('.ad-form');
var roomNumberSelect = adForm.querySelector('#room_number');
var capacitySelect = adForm.querySelector('#capacity');

var onRoomNumberSelectChange = function () {
  if (capacitySelect.options.length > 0) {
    [].forEach.call(capacitySelect.options, function (item) {
      item.classList.remove('visually-hidden');
      item.selected = (ROOMS_CAPACITY[roomNumberSelect.value][0] === item.value);
      item.hidden = !(ROOMS_CAPACITY[roomNumberSelect.value].indexOf(item.value) >= 0);
    });
  }
};

roomNumberSelect.addEventListener('change', onRoomNumberSelectChange);


// Активация страницы
var fieldsets = adForm.querySelectorAll('fieldset');
var mapPinMain = document.querySelector('.map__pin--main');
var addressField = adForm.querySelector('#address');

var toggleDisabled = function () {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = !fieldsets[i].disabled;
  }
};
toggleDisabled();

var setAddressValue = function () {
  addressField.value = (map.classList.contains('map--faded')) ? Math.floor(parseInt(mapPinMain.style.left, 10) + mapPinMain.offsetWidth / 2) + ', ' + Math.floor(parseInt(mapPinMain.style.top, 10) + mapPinMain.offsetHeight / 2) : Math.floor(parseInt(mapPinMain.style.left, 10) + mapPinMain.offsetWidth / 2) + ', ' + Math.floor(parseInt(mapPinMain.style.top, 10) + mapPinMain.offsetHeight + MAIN_PIN_EXTRA_HEIGHT);
};

setAddressValue();

var makePageActive = function () {
  toggleDisabled();
  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  addFragmentToLayout();
  map.appendChild(renderCard(pins[0]));
  setAddressValue();
  onRoomNumberSelectChange();
};

var onMainPinMouseDown = function () {
  makePageActive();
};

var onMainPinKeyDown = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    makePageActive();
  }
};
mapPinMain.addEventListener('mousedown', onMainPinMouseDown);
mapPinMain.addEventListener('keydown', onMainPinKeyDown);

