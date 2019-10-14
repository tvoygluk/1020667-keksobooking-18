'use strict';

// Перетаскивание главного пина
(function () {

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

      var mapPinMainXCenter = Math.floor(parseInt(window.pageAction.mapPinMain.style.left, 10) + window.pageAction.mapPinMain.offsetWidth / 2);
      var mapPinMainYTop = parseInt(window.pageAction.mapPinMain.style.top, 10);
      var mapPinMainYBottom = Math.floor(mapPinMainYTop + window.pageAction.mapPinMain.offsetHeight + window.pageAction.MAIN_PIN_EXTRA_HEIGHT);

      var isUncorrectPosX = (mapPinMainXCenter <= 0) || (mapPinMainXCenter >= window.mocks.PIN_PARENT_WIDTH);
      var isUncorrectPosY = (mapPinMainYBottom <= window.mocks.TOP_LIMIT_POSITION_PIN) || (mapPinMainYBottom >= window.mocks.BOTTOM_LIMIT_POSITION_PIN);

      if (isUncorrectPosX || isUncorrectPosY) {
        document.removeEventListener('mousemove', onMouseMove);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
