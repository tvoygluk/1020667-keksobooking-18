'use strict';

(function () {
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var ENTER_KEYCODE = 13;
  var PINS_LENGTH = 5;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var similarListElement = window.cardRender.map.querySelector('.map__pins');

  var renderPin = function (pin) {
    if (pin.offer) {
      var pinElement = pinTemplate.cloneNode(true);

      pinElement.style = 'left: ' + (pin.location.x - (PIN_WIDTH / 2)) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px;';
      pinElement.querySelector('.map__pin img').src = pin.author.avatar;
      pinElement.querySelector('.map__pin img').alt = pin.offer.title;
      pinElement.tabIndex = 0;

      var workCard = function () {
        window.cardRender.closePopup();
        window.cardRender.map.appendChild(window.cardRender.renderCard(pin));
        pinElement.classList.add('map__pin--active');
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

    }
    return pinElement;
  };

  var addPinsToLayout = function (pins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < PINS_LENGTH; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }

    similarListElement.appendChild(fragment);
  };

  window.pinRender = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    addPinsToLayout: addPinsToLayout
  };
})();
