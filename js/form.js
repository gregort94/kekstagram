/*Константы*/
var DEFAULT_SCALE_VALUE = 100;
var MIN_IMG_SCALE_VALUE = 25;
var MAX_IMG_SCALE_VALUE = 100;

var uploadForm = document.querySelector('.img-upload__overlay');
var uploadFileInput = document.querySelector('#upload-file');
var uploadFormClose = uploadForm.querySelector('.img-upload__cancel');

/* Элементы уравления размером картинки*/
var scaleBiggerBtn = document.querySelector('.scale__control--bigger');
var scaleSmallerBtn = document.querySelector('.scale__control--smaller');
var scaleValue = document.querySelector('.scale__control--value');

var previewImg = document.querySelector('.img-upload__preview img');

var filterRadioBtn = document.querySelectorAll('.effects__preview');

var effectLvlPin = document.querySelector('.effect-level__pin');

var filterButtons = document.querySelectorAll ('.effects__preview');

/*Элементы блока регулировки уровня фильтра*/
var effectLvlWrap= document.querySelector ('.img-upload__effect-level');
var effectLvlLine = document.querySelector ('.effect-level__line');
var effectLvlDepth = document.querySelector ('.effect-level__depth');

/*Элементы блока описания фотографии*/
var hashtags = document.querySelector ('.text__hashtags');
var photoDescription = document.querySelector ('.text__description');

/*Открытие формы редактирования фото*/ 
var openEditPhoto = function (){	
	/* Устанавливаем значение по умолчанию для scaleValue */
	scaleValue.value = DEFAULT_SCALE_VALUE + '%';

	uploadForm.classList.remove('hidden');
}
/*Закрытие формы редактирования фото*/ 
var closeEditPhoto = function () {
	uploadForm.classList.add('hidden');
	uploadFileInput.files[0] = '';
}

/* Уменьшение / увеличение значения размера картинки*/
var increaseScaleValue = function () {
	var numValue = parseInt(scaleValue.value);
	if (numValue < MAX_IMG_SCALE_VALUE){
		numValue += 25;
	}
	scaleValue.value = numValue + '%';
}
var decreaseScaleValue = function () {
	var numValue = parseInt(scaleValue.value);
	if (numValue > MIN_IMG_SCALE_VALUE){
		numValue -= 25;
	}
	scaleValue.value = numValue + '%';
}
/* Функция задает атрибут отвечающий за размер картинки*/
var setImgScaleClass = function() {
	previewImg.removeAttribute('data-scale');
	
	if (scaleValue.value === '25%'){
		previewImg.setAttribute('data-scale', '25%');
	}else if(scaleValue.value === '50%'){
		previewImg.setAttribute('data-scale', '50%');
	}else if(scaleValue.value === '75%'){
		previewImg.setAttribute('data-scale', '75%');
	}else if(scaleValue.value === '100%'){
		previewImg.setAttribute('data-scale', '100%');
	}
}


/*  ======= Изменение значения фильтра на фото ======  */
var currentFilterName = 'none';
var filterPercent = 100;
var currentFilterValue = '';

/* Определяем имя фильтра*/
var changeImgFilterName = function() {
	currentFilterName = this.getAttribute('data-filterName');
}
/* Определяем уровень фильтра в %*/
var setPercentValue = function (){
	filterPercent = effectLvlDepth.clientWidth  / effectLvlLine.clientWidth *100;
} 
/* Определяем значение фильтра*/
var setFilterValue = function (){
	if (currentFilterName === 'grayscale' ){
		currentFilterValue = (filterPercent / 100);
	}else if (currentFilterName === 'sepia' ){
		currentFilterValue = (filterPercent / 100);
	}else if (currentFilterName === 'invert' ){
		currentFilterValue = (filterPercent * 100 / 100) + '%';
	}else if (currentFilterName === 'blur' ){
		currentFilterValue = (filterPercent * 3 / 100) + 'px';
	}else if (currentFilterName === 'brightness' ){
		currentFilterValue = (filterPercent * 3 / 100);
	}
}
/* Применение фильтра*/
var applyFilter= function (){
	previewImg.style.filter = currentFilterName + '(' + currentFilterValue +')'; 
	console.log(previewImg.style.filter); 
}
/* Скрытие поля регулировки уровня фильтра*/
var hideFilterLvlLine = function(){
	if (currentFilterName === 'none'){
		effectLvlWrap.classList.add('hidden');
	}else {
		effectLvlWrap.classList.remove('hidden');
	}
}

/* ======= Валидация хэш-тэгов =======*/
var checkHashtgsValidity = function(){
	var message = '';
	//проверяем есть ли каке либо условия невалидности хэштэгов
	var badHash = false; // хэш-тег не начинается с символа # (решётка);
	var badMinLength  = false; // длин хэш-тэга менее 2 символов;
	var badMaxLength = false; // длин хэш-тэга больше 20 символов
	var badRepeat = false; // хэштэг использован более одного раза
	var badQuantity = false; // колличество хэш-тэгов более 5;

	var hashtagsValue = hashtags.value;
	var hashtagsArray = hashtagsValue.split(' ');
	for (var i = 0; i < hashtagsArray.length; i++) {
		if (hashtagsArray[i][0] != '#') {
			badHash = true;
		}
		if (hashtagsArray[i].length < 2){
			badMinLength = true;
		}
		if (hashtagsArray[i].length > 20){
			badMaxLength = true;
		}
		for (var j = 0; j < hashtagsArray.length; j++) {
			if (j != i){
				if (hashtagsArray[i] === hashtagsArray[j]){
					badRepeat = true;
				}
			}
		}
		if (hashtagsArray.length > 5){
			badQuantity = true;
		}
	}

	/*Формируем сообщение об ошибках*/
	if (badHash) {
		message += "Хэш-тег должен начинается с символа # (решётка);  "
	}
	if (badMinLength) {
		message += "Длина хэш-тэга должна быть не менее 2 символов;  "
	}
	if (badMaxLength) {
		message += "Длина хэш-тэга должна быть не более 20 символов;  "
	}
	if (badRepeat) {
		message += " Хэш-тэг не может быть использован более одного раза;  "
	}
	if (badQuantity) {
		message += "Нельзя указать больше пяти хэш-тегов;  "
	}
	/*Устанавливаем сформированное сообщение*/
	hashtags.setCustomValidity(message);
}

/* Переключение фильтров*/
for (var i = 0; i < filterButtons.length; i++) {
	filterButtons[i].addEventListener('click', changeImgFilterName );
	filterButtons[i].addEventListener('click', setFilterValue );
	filterButtons[i].addEventListener('click', applyFilter );
	filterButtons[i].addEventListener('click', hideFilterLvlLine );
}

/* Регулятор уровня фильтра */
effectLvlPin.addEventListener('mouseup', setPercentValue);
effectLvlPin.addEventListener('mouseup', setFilterValue);
effectLvlPin.addEventListener('mouseup', applyFilter);

/* Изменение поля загрузки файла */
uploadFileInput.addEventListener('change', openEditPhoto);
uploadFileInput.addEventListener('change', setImgScaleClass);
uploadFileInput.addEventListener('change', hideFilterLvlLine);

/* Закрытие окна редактирования фото */
uploadFormClose.addEventListener('click', closeEditPhoto);

/* Элементы уравления размером картинки */
//изменение значения элемента scaleValue
scaleBiggerBtn.addEventListener('click', increaseScaleValue );
scaleSmallerBtn.addEventListener('click', decreaseScaleValue );
//изменение размера непосредственно картинки 
scaleBiggerBtn.addEventListener('click', setImgScaleClass );
scaleSmallerBtn.addEventListener('click', setImgScaleClass );

/* Валидация хэштэга*/
hashtags.addEventListener('change', checkHashtgsValidity );









