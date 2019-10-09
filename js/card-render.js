'use strict';

// Рендеринг карточек card-render.js
(function () {
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
  var ESC_KEYCODE = 27;
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

  var map = document.querySelector('.map');
  var bodyField = document.querySelector('body');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var closePopup = function () {
    var mapPinActive = map.querySelector('.map__pin--active');
    var popup = map.querySelector('.popup');
    if (popup !== null) {
      popup.remove();
      mapPinActive.classList.remove('map__pin--active');
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

  window.cardRender = {
    TYPES: TYPES,
    ESC_KEYCODE: ESC_KEYCODE,
    map: map,
    renderCard: renderCard,
    closePopup: closePopup
  };
})();

