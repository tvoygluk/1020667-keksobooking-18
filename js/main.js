/*
 {
  'author': {
    'avatar': строка, адрес изображения вида img/avatars/user{{xx}}.png,
    где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
  },

  'offer': {
    'title': строка, заголовок предложения
    'address': строка, адрес предложения. Для простоты пусть пока представляет собой запись вида '{{location.x}}, {{location.y}}', например, '600, 350'
    'price': число, стоимость
    'type': строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
    'rooms': число, количество комнат
    'guests': число, количество гостей, которое можно разместить
    'checkin': строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
    'checkout': строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
    'features': массив строк случайной длины из ниже предложенных: 'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
    'description': строка с описанием,
    'photos': массив строк случайной длины, содержащий адреса фотографий 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  },

  'location': {
    'x': случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
    'y': случайное число, координата y метки на карте от 130 до 630.
  }
}
 */

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

var makeMocks = function () { // make mocks
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
        'x': String(randomInteger(100, 200)),
        'y': String(randomInteger(130, 630))
      }
    };

    mocksArray.push(mockObj);
  }

  return mocksArray;
};

// eslint-disable-next-line no-console
console.log(makeMocks());

/*
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);
*/

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarListElement = map.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var pins = makeMocks();

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('.map__pin img').src = pin.author.avatar;
  pinElement.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;';
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

// var fragment = document.createDocumentFragment();
// for (var i = 0; i < pins.length; i++) {
//   fragment.appendChild(renderPin(pins[i]));
// }

// similarListElement.appendChild(fragment);

/**

  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

  var getRandomArrayElement = function (someArray) {
    return someArray[Math.floor(Math.random() * someArray.length)];
  };

  var makeFullName = function (name, surname) {
    return name + ' ' + surname;
  };

  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');

  var similarListElement = userDialog.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');


  var makeMocks = function () {
  var MOCKS_LENGTH = 4;
  var mocksArray = [];

  for (var i = 0; i < MOCKS_LENGTH; i++) {
    var mockObj = {
      name: makeFullName(getRandomArrayElement(WIZARD_NAMES), getRandomArrayElement(WIZARD_SURNAMES)),
      coatColor: getRandomArrayElement(COAT_COLORS),
      eyesColor: getRandomArrayElement(EYES_COLOR)
    };

    mocksArray.push(mockObj);
  }

  return mocksArray;
};

var wizards = makeMocks();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

 */
