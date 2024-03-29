'use strict';

(function () {
  var TOP_LIMIT_POSITION_PIN = 130;
  var BOTTOM_LIMIT_POSITION_PIN = 630;
  var PIN_PARENT_WIDTH = document.querySelector('.map__pin').parentNode.offsetWidth;
  var MAIN_PIN_PARAM = {
    height: window.pageAction.mapPinMain.offsetHeight + window.pageAction.MAIN_PIN_EXTRA_HEIGHT,
    halfWidth: window.pageAction.mapPinMain.offsetWidth / 2
  };

  var calcCondition = function () {
    var mapPinMainXCenter = parseInt(window.pageAction.mapPinMain.style.left, 10) + window.pageAction.mapPinMain.offsetWidth / 2;
    var mapPinMainYTop = parseInt(window.pageAction.mapPinMain.style.top, 10);
    var mapPinMainYBottom = mapPinMainYTop + window.pageAction.mapPinMain.offsetHeight + window.pageAction.MAIN_PIN_EXTRA_HEIGHT;

    var isUncorrectPosXMin = (mapPinMainXCenter <= 1);
    var isUncorrectPosXMax = (mapPinMainXCenter >= PIN_PARENT_WIDTH);
    var isUncorrectPosYMin = (mapPinMainYBottom <= TOP_LIMIT_POSITION_PIN);
    var isUncorrectPosYMax = (mapPinMainYBottom >= BOTTOM_LIMIT_POSITION_PIN);

    if (isUncorrectPosXMin) {
      window.pageAction.mapPinMain.style.left = (-MAIN_PIN_PARAM.halfWidth + 1) + 'px';
    } else if (isUncorrectPosXMax) {
      window.pageAction.mapPinMain.style.left = (PIN_PARENT_WIDTH - MAIN_PIN_PARAM.halfWidth) + 'px';
    } else if (isUncorrectPosYMin) {
      window.pageAction.mapPinMain.style.top = (TOP_LIMIT_POSITION_PIN - MAIN_PIN_PARAM.height) + 'px';
    } else if (isUncorrectPosYMax) {
      window.pageAction.mapPinMain.style.top = (BOTTOM_LIMIT_POSITION_PIN - MAIN_PIN_PARAM.height) + 'px';
    }
  };

  window.pageAction.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var Coordinate = function (x, y) {
      this.x = x;
      this.y = y;
    };

    Coordinate.prototype.setX = function (x) {
      this.x = x;
    };

    Coordinate.prototype.setY = function (y) {
      this.y = y;
    };

    var startX = evt.clientX;
    var startY = evt.clientY;

    var startCoords = new Coordinate(startX, startY);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var moveX = startCoords.x - moveEvt.clientX;
      var moveY = startCoords.y - moveEvt.clientY;
      var shift = new Coordinate(moveX, moveY);

      startCoords.setX(moveEvt.clientX);
      startCoords.setY(moveEvt.clientY);

      window.pageAction.mapPinMain.style.top = (window.pageAction.mapPinMain.offsetTop - shift.y) + 'px';
      window.pageAction.mapPinMain.style.left = (window.pageAction.mapPinMain.offsetLeft - shift.x) + 'px';

      window.pageAction.setAddressValue(window.pageAction.mapPinMain);
      calcCondition();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      calcCondition();
      window.pageAction.setAddressValue();
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
