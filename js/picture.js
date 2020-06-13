'use strict';

var uploadStart = document.querySelector('.img-upload__start');
var uploadFile = document.querySelector('#upload-file');
var uploadClose = document.querySelector('#upload-cancel');
var uploadImg = document.querySelector('.img-upload__overlay');

var onEscPress = function (evt) {
  if (evt.key === 'Escape' && evt.target.tagName !== 'INPUT') {
    evt.preventDefault();
    closeSettings();
  }
};

var openSettings = function () {
  uploadImg.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscPress);
};

var closeSettings = function () {
  uploadImg.classList.add('hidden');
  uploadFile.value = '';

  document.removeEventListener('keydown', onEscPress);
};

uploadStart.addEventListener('change', function () {
  openSettings();
});

uploadClose.addEventListener('click', function () {
  closeSettings();
});

// ---------------------------------------------------------------------------

// Перемеенные для изменения масштаба загружаемого изображения
// var SCALE_STEP = 25;
// var MIN_SCALE = 25;
// var MAX_SCALE = 100;
//
// var scaleControlSmaller = document.querySelector('.scale__control--smaller');
// var scaleControlBigger = document.querySelector('.scale__control--bigger');
// var scaleControl = document.querySelector('.scale__control--value').value;

// ---------------------------------------------------------------------------

// Переменные для применения фильтров к загружаемому изображению
var sliderPin = document.querySelector('.effect-level__pin');
// var effectLevel = document.querySelector('.effect-level__value').value; // Сюда записывается уровень эффекта
// var levelLine = document.querySelector('.effect-level__line'); // Линия, по которой двигается ползунок
var uploadPrewiew = document.querySelector('.img-upload__preview img');
var uploadEffects = document.querySelector('.img-upload__effects');
// var effectRadio = document.querySelector('.effects__radio').value;

// Переключение фильтров изображения при нажатии на соответствующую радиокнопку
// В эту функцию стоит добавить функцию по позиенению насыщенности
// или они взаимодействуют отдельно друг с другом?
var onFilterChange = function (evt) {
  uploadPrewiew.setAttribute('class', 'effects__preview--' + evt.target.value);
};

uploadEffects.addEventListener('change', onFilterChange);

// 1) Когда ползунок sliderPin перемещается по горизонтали,
// то результат перемещения (уровень эффекта) записывается в effectLevel.
// Но пока ползунок не перемещается, что делать?
// Я вообще не понимаю этот момент, что там с чем взаимодействует.

// 2) Если уровень эффекта effectLevel изменился, то параллельно с ним
// изменяются стили изображения uploadPrewiew.style.filter?
// chrome --> filter: grayscale(' + effectLevel / 0.01 + ');
// sepia --> filter: sepia(' + effectLevel / 0.01 + ');
// marvin --> filter: invert(' + effectLevel + '%);
// phobos --> filter: blur(' + effectLevel * 0.03 + 'px);
// heat --> filter: brightness(' + effectLevel * 0.03 + ');
// none --> filter: '';

// Если выбрана радиокнопка effectRadio со значением "Оригинал" (value="none"),
// то надо закрыть слайдер closeSettings();
// То есть uploadPrewiew.classList('none'); (или uploadPrewiew.className('none')?) добавить в closeSettings()?


// Обработчик события, который будет изменять уровень насыщенности фильтра изображения
sliderPin.addEventListener('mouseup', function () {

});

// ---------------------------------------------------------------------------

// Валидация хэш-тегов
var MAX_HASHTAGS = 5;
var hashtagInput = document.querySelector('.text__hashtags').value;
// var re = /#[a-zA-Zа-яА-Я0-9]*\s/i;
// Стоит ли указывать здесь \s?
// В таблице написано, что он соответствует одиночному символу пустого пространства.
// А если будет введен один хэш-тег? Или надо делать отдельную проверку на пробел?


// 1) Добавляем хэш-теги в массив и проверяем чтобы их было не больше 5
// 2) Можно ли использовать метод split? И стоит ли?
// 3) Стоит ли в функции addHashtags добавлять ещё одну проверку на совпадение хэш-тегов?
// Для проверки нужно перебирать все хэш-теги и сравнивать их друг с другом?
// Или можно сделать вот такую проверку (хэш-тег1 === хэш-тег2) ? invalid : valid  ?
// Затем следует сравнивать хэш-теги с регулярными выражениями?

function addHashtags(hashtag) {
  var hashtags = [];
  for (var i = 0; i < hashtag.length; i++) {
    hashtags.push(hashtag[i].toLowerCase());

    if (hashtag.length > MAX_HASHTAGS) {
      hashtagInput.setCustomValidity('Не больше пяти хэш-тегов.');
    }
  }
  return hashtags;
}

addHashtags();

// Вроде это проверка вводимых данных с регулярным выражением
// if (re.test(hashtagInput)) {
//
// }
