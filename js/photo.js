'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var writeFile = function (chooser, imgFile) {
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

  var topChooser = window.form.fieldsWrapper.querySelector('.ad-form-header__input');
  var avatar = window.form.fieldsWrapper.querySelector('.ad-form-header__preview img');
  var onTopChooserChange = function () {
    writeFile(topChooser, avatar);
  };
  topChooser.addEventListener('change', onTopChooserChange);

  var bottomChooser = window.form.fieldsWrapper.querySelector('.ad-form__input');

  var containerImg = window.form.fieldsWrapper.querySelector('.ad-form__photo-container');

  var photoDiv = window.form.fieldsWrapper.querySelector('.ad-form__photo');

  var photoImg = document.createElement('img');

  var onBottomChooserChange = function () {
    photoImg.src = '';
    photoImg.style = 'width: 100%; height: auto;';
    photoImg.alt = 'Фото жилья';
    photoDiv.appendChild(photoImg);
    var photoClone = photoDiv.cloneNode(true);
    containerImg.appendChild(photoClone);
    var containers = containerImg.querySelectorAll('.ad-form__photo img');
    writeFile(bottomChooser, containers[containers.length - 1]);
    containers[0].parentNode.removeChild(containers[0]);
  };

  bottomChooser.addEventListener('change', onBottomChooserChange);

  window.photo = {
    avatar: avatar,
    containerImg: containerImg
  };
})();
