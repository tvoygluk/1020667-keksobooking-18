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

    var popupTitle = cardElement.querySelector('.popup__title');
    var popupTextAdress = cardElement.querySelector('.popup__text--address');
    var popupTextPrice = cardElement.querySelector('.popup__text--price');
    var popupType = cardElement.querySelector('.popup__type');
    var popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
    var popupTextTime = cardElement.querySelector('.popup__text--time');

    var checkExist = function (elem, val) {
      if (elem) {
        elem.textContent = val;
      } else {
        elem.classList.add('hidden');
      }
    };
    checkExist(popupTitle, pin.offer.title);
    checkExist(popupTextAdress, pin.offer.address);
    checkExist(popupTextPrice, pin.offer.price);
    checkExist(popupType, TYPES[pin.offer.type].ru);

    if ((pin.offer.rooms !== 0) && (pin.offer.guests !== 0)) {
      popupTextCapacity.textContent = pin.offer.rooms + ' ' + getRightCase(pin.offer.rooms, 'комната', 'комнаты', 'комнат') + ' для ' + pin.offer.guests + ' ' + getRightCase(pin.offer.guests, 'гостя', 'гостей', 'гостей');
    } else {
      popupTextCapacity.classList.add('hidden');
    }

    checkExist(popupTextTime, 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout);

    var features = cardElement.querySelector('.popup__features');
    features.innerHTML = '';
    if (pin.offer.features.length !== 0) {
      pin.offer.features.forEach(function (element) {
        var featuresElement = document.createElement('li');
        featuresElement.className = ('popup__feature popup__feature--' + element);
        features.appendChild(featuresElement);
      });
    } else {
      features.classList.add('hidden');
    }

    var popupDescription = cardElement.querySelector('.popup__description');
    checkExist(popupDescription, pin.offer.description);


    var popupPhotos = cardElement.querySelector('.popup__photos');
    popupPhotos.innerHTML = '';
    if (pin.offer.photos.length !== 0) {
      pin.offer.photos.forEach(function (element) {
        var photoElement = document.createElement('img');
        photoElement.src = element;
        photoElement.className = ('popup__photo');
        photoElement.width = 45;
        photoElement.height = 40;
        photoElement.alt = 'Фотография жилья';
        popupPhotos.appendChild(photoElement);
      });
    } else {
      popupPhotos.classList.add('hidden');
    }

    var popupAvatar = cardElement.querySelector('.popup__avatar');
    popupAvatar.src = pin.author.avatar;

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
    closePopup: closePopup,
    bodyField: bodyField
  };
})();
