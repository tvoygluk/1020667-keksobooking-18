'use strict';

(function () {
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var ENTER_KEYCODE = 13;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var similar = window.cardRender.map.querySelector('.map__pins');

  var renderPin = function (pin) {
    if (pin.offer) {
      var pinClone = pinTemplate.cloneNode(true);

      pinClone.style = 'left: ' + (pin.location.x - (PIN_WIDTH / 2)) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px;';
      pinClone.querySelector('.map__pin img').src = pin.author.avatar;
      pinClone.querySelector('.map__pin img').alt = pin.offer.title;
      pinClone.tabIndex = 0;

      var workCard = function () {
        window.cardRender.closePopup();
        window.cardRender.map.appendChild(window.cardRender.addCardToLayout(pin));
        pinClone.classList.add('map__pin--active');
      };
      var onPinClick = function () {
        workCard();
      };
      var onPinKeyDown = function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          workCard();
        }
      };
      pinClone.addEventListener('click', onPinClick);
      pinClone.addEventListener('keydown', onPinKeyDown);

    }
    return pinClone;
  };

  var addPinsToLayout = function (pins) {
    var fragment = document.createDocumentFragment();

    pins.forEach(function (item) {
      fragment.appendChild(renderPin(item));
    });

    similar.appendChild(fragment);
  };

  window.pinRender = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    addPinsToLayout: addPinsToLayout
  };
})();
