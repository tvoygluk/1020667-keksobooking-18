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
var ESC_KEYCODE = 27;
var TYPES = {
  'palace': {
    ru: 'Дворец',
    min: '10000'
  },
  'flat': {
    ru: 'Квартира',
    min: '1000'
  },
  'house': {
    ru: 'Дом',
    min: '5000'
  },
  'bungalo': {
    ru: 'Бунгало',
    min: '0'
  }
};
var ROOMS_CAPACITY = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

var getRightCase = function (inputNumber, firstCase, secondCase, thirdCase) {

  if (inputNumber > 10 && (Math.round((inputNumber % 100) / 10) === 1)) {
    return thirdCase;
  } else {
    switch (inputNumber % 10) {
      case 1: return firstCase;
      case 2:
      case 3:
      case 4: return secondCase;
    }
  }
  return thirdCase;
};

// Создание моковых данных для карточек
var map = document.querySelector('.map');
var bodyField = document.querySelector('body');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var closePopup = function () {
  var popup = map.querySelector('.popup');
  if (popup !== null) {
    popup.remove();
  }
};

var renderCard = function (pin) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = pin.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = pin.offer.price;
  cardElement.querySelector('.popup__type').textContent = TYPES[pin.offer.type].ru;
  cardElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' ' + getRightCase(pin.offer.rooms, 'комната', 'комнаты', 'комнат') + ' для ' + pin.offer.guests + ' ' + getRightCase(pin.offer.guests, 'гостя', 'гостей', 'гостей');
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

  var onClosePopupClick = function () {
    closePopup();
  };
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
      bodyField.removeEventListener('keydown', onPopupEscPress);
    }
  };
  var closePopupElement = cardElement.querySelector('.popup__close');
  closePopupElement.addEventListener('click', onClosePopupClick);
  bodyField.addEventListener('keydown', onPopupEscPress);

  return cardElement;
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

var similarListElement = map.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Отрисовка моковых данных (пинов)
var pins = makeMocks();

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (pin.location.x - (PIN_WIDTH / 2)) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px;';
  pinElement.querySelector('.map__pin img').src = pin.author.avatar;
  pinElement.querySelector('.map__pin img').alt = pin.offer.title;
  pinElement.tabIndex = 0;

  var workCard = function () {
    closePopup();
    map.appendChild(renderCard(pin));
  };
  var onPinClick = function () {
    workCard();
  };
  var onPinKeyDown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      workCard();
    }
  };
  pinElement.addEventListener('click', onPinClick);
  pinElement.addEventListener('keydown', onPinKeyDown);

  return pinElement;
};

var addPinsToLayout = function () {
  var fragment = document.createDocumentFragment();

  for (var l = 0; l < pins.length; l++) {
    fragment.appendChild(renderPin(pins[l]));
  }
  similarListElement.appendChild(fragment);
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
      item.disabled = !(ROOMS_CAPACITY[roomNumberSelect.value].indexOf(item.value) >= 0);
    });
  }
};
roomNumberSelect.addEventListener('change', onRoomNumberSelectChange);

var typeSelect = adForm.querySelector('#type');
var priceInput = adForm.querySelector('#price');
var onTypeSelectChange = function () {
  var minPrice = TYPES[typeSelect.value].min;
  priceInput.min = minPrice;
  priceInput.placeholder = minPrice;
};
typeSelect.addEventListener('change', onTypeSelectChange);

var timeInSelect = adForm.querySelector('#timein');
var timeOutSelect = adForm.querySelector('#timeout');
var setTimeInEqualTimeOut = function () {
  timeOutSelect.value = timeInSelect.value;
};
var setTimeOutEqualTimeIn = function () {
  timeInSelect.value = timeOutSelect.value;
};
timeInSelect.addEventListener('change', setTimeInEqualTimeOut);
timeOutSelect.addEventListener('change', setTimeOutEqualTimeIn);

// Активация страницы
var fieldsets = adForm.querySelectorAll('fieldset');
var mapPinMain = document.querySelector('.map__pin--main');
var addressField = adForm.querySelector('#address');

var toggleDisabled = function () {
  for (var m = 0; m < fieldsets.length; m++) {
    fieldsets[m].disabled = !fieldsets[m].disabled;
  }
};
toggleDisabled();

var setAddressValue = function () {
  addressField.value = (map.classList.contains('map--faded')) ? Math.floor(parseInt(mapPinMain.style.left, 10) + mapPinMain.offsetWidth / 2) + ', ' + Math.floor(parseInt(mapPinMain.style.top, 10) + mapPinMain.offsetHeight / 2) : Math.floor(parseInt(mapPinMain.style.left, 10) + mapPinMain.offsetWidth / 2) + ', ' + Math.floor(parseInt(mapPinMain.style.top, 10) + mapPinMain.offsetHeight + MAIN_PIN_EXTRA_HEIGHT);
};

setAddressValue();

var onMainPinMouseDown = function () {
  makePageActive();
};

var onMainPinKeyDown = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    makePageActive();
  }
};

var makePageActive = function () {
  toggleDisabled();
  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  addPinsToLayout();
  setAddressValue();
  onRoomNumberSelectChange();
  mapPinMain.removeEventListener('mousedown', onMainPinMouseDown);
  mapPinMain.removeEventListener('keydown', onMainPinKeyDown);
};

mapPinMain.addEventListener('mousedown', onMainPinMouseDown);
mapPinMain.addEventListener('keydown', onMainPinKeyDown);
