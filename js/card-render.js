'use strict';

(function () {
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
    var card = cardTemplate.cloneNode(true);

    var popupTitle = card.querySelector('.popup__title');
    var popupTextAdress = card.querySelector('.popup__text--address');
    var popupTextPrice = card.querySelector('.popup__text--price');
    var popupType = card.querySelector('.popup__type');
    var popupTextCapacity = card.querySelector('.popup__text--capacity');
    var popupTextTime = card.querySelector('.popup__text--time');

    var checkExist = function (element, value) {
      if (element) {
        element.textContent = value;
      } else {
        element.classList.add('hidden');
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

    var popupFeatures = card.querySelector('.popup__features');
    popupFeatures.innerHTML = '';
    if (pin.offer.features.length !== 0) {
      pin.offer.features.forEach(function (element) {
        var cardFeatures = document.createElement('li');
        cardFeatures.className = ('popup__feature popup__feature--' + element);
        popupFeatures.appendChild(cardFeatures);
      });
    } else {
      popupFeatures.classList.add('hidden');
    }

    var popupDescription = card.querySelector('.popup__description');
    checkExist(popupDescription, pin.offer.description);


    var popupPhotos = card.querySelector('.popup__photos');
    popupPhotos.innerHTML = '';
    if (pin.offer.photos.length !== 0) {
      pin.offer.photos.forEach(function (element) {
        var cardPhoto = document.createElement('img');
        cardPhoto.src = element;
        cardPhoto.className = ('popup__photo');
        cardPhoto.width = 45;
        cardPhoto.height = 40;
        cardPhoto.alt = 'Фотография жилья';
        popupPhotos.appendChild(cardPhoto);
      });
    } else {
      popupPhotos.classList.add('hidden');
    }

    var popupAvatar = card.querySelector('.popup__avatar');
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
    var closeCard = card.querySelector('.popup__close');
    closeCard.addEventListener('click', onClosePopupClick);
    bodyField.addEventListener('keydown', onPopupEscPress);

    return card;
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
