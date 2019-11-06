'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var writeFile = function (chooser, imgFile) {
    return function () {
      var file = chooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          imgFile.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    };
  };

  var topChooser = window.form.fieldsWrapper.querySelector('.ad-form-header__input');
  var avatar = window.form.fieldsWrapper.querySelector('.ad-form-header__preview img');
  var onTopChooserChange = writeFile(topChooser, avatar);
  topChooser.addEventListener('change', onTopChooserChange);

  var bottomChooser = window.form.fieldsWrapper.querySelector('.ad-form__input');

  var photoContainer = window.form.fieldsWrapper.querySelector('.ad-form__photo-container');
  var photoDiv = window.form.fieldsWrapper.querySelector('.ad-form__photo');

  var photoElImg = document.createElement('img');

  var createContainerPhoto = function () {
    var photoEl = photoDiv.cloneNode(true);
    photoContainer.appendChild(photoEl);
    photoEl.appendChild(photoElImg);
    photoElImg.src = '';
  };

  var onBottomChooserChange = function () {
    createContainerPhoto();
    writeFile(bottomChooser, photoElImg);
    bottomChooser.removeEventListener('change', onBottomChooserChange);
  };
  bottomChooser.addEventListener('change', onBottomChooserChange);




})();
