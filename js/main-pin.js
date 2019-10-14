'use strict';

// Перетаскивание главного пина
(function () {
  var calcConditionFun = function () {
    var mapPinMainXCenter = parseInt(window.pageAction.mapPinMain.style.left, 10) + window.pageAction.mapPinMain.offsetWidth / 2;
    var mapPinMainYTop = parseInt(window.pageAction.mapPinMain.style.top, 10);
    var mapPinMainYBottom = mapPinMainYTop + window.pageAction.mapPinMain.offsetHeight + window.pageAction.MAIN_PIN_EXTRA_HEIGHT;

    var isUncorrectPosXMin = (mapPinMainXCenter < 0);
    var isUncorrectPosXMax = (mapPinMainXCenter > window.mocks.PIN_PARENT_WIDTH);
    var isUncorrectPosYMin = (mapPinMainYBottom < window.mocks.TOP_LIMIT_POSITION_PIN);
    var isUncorrectPosYMinNonAct = (mapPinMainYTop + (window.pageAction.mapPinMain.offsetHeight / 2) < window.mocks.TOP_LIMIT_POSITION_PIN);
    var isUncorrectPosYMax = (mapPinMainYBottom > window.mocks.BOTTOM_LIMIT_POSITION_PIN);
    var isUncorrectPosYMaxNonAct = (mapPinMainYTop + (window.pageAction.mapPinMain.offsetHeight / 2) > window.mocks.BOTTOM_LIMIT_POSITION_PIN);
    var isMapFadded = window.cardRender.map.classList.contains('map--faded');

    if (isUncorrectPosXMin) {
      window.pageAction.mapPinMain.style.left = (-window.pageAction.mapPinMain.offsetWidth / 2) + 'px';
      window.pageAction.makePageActive();
    } else if (isUncorrectPosXMax) {
      window.pageAction.mapPinMain.style.left = (window.mocks.PIN_PARENT_WIDTH - window.pageAction.mapPinMain.offsetWidth / 2) + 'px';
      window.pageAction.makePageActive();
    } else if (isUncorrectPosYMin && !isMapFadded) {
      window.pageAction.mapPinMain.style.top = (window.mocks.TOP_LIMIT_POSITION_PIN - window.pageAction.mapPinMain.offsetHeight - window.pageAction.MAIN_PIN_EXTRA_HEIGHT) + 'px';
    } else if (isUncorrectPosYMinNonAct && isMapFadded) {
      window.pageAction.makePageActive();
      window.pageAction.mapPinMain.style.top = (window.mocks.TOP_LIMIT_POSITION_PIN - window.pageAction.mapPinMain.offsetHeight - window.pageAction.MAIN_PIN_EXTRA_HEIGHT) + 'px';
    } else if (isUncorrectPosYMax && !isMapFadded) {
      window.pageAction.mapPinMain.style.top = (window.mocks.BOTTOM_LIMIT_POSITION_PIN - window.pageAction.mapPinMain.offsetHeight - window.pageAction.MAIN_PIN_EXTRA_HEIGHT) + 'px';
    } else if (isUncorrectPosYMaxNonAct && isMapFadded) {
      window.pageAction.makePageActive();
      window.pageAction.mapPinMain.style.top = (window.mocks.BOTTOM_LIMIT_POSITION_PIN - window.pageAction.mapPinMain.offsetHeight - window.pageAction.MAIN_PIN_EXTRA_HEIGHT) + 'px';
    }
  };

  window.pageAction.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.pageAction.mapPinMain.style.top = (window.pageAction.mapPinMain.offsetTop - shift.y) + 'px';
      window.pageAction.mapPinMain.style.left = (window.pageAction.mapPinMain.offsetLeft - shift.x) + 'px';

      window.pageAction.setAddressValue(window.pageAction.mapPinMain);

      window.mainPin.calcConditionFun();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.mainPin.calcConditionFun();
      window.pageAction.setAddressValue();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.mainPin = {
    calcConditionFun: calcConditionFun
  };
})();
