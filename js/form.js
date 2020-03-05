/*Константы*/
var DEFAULT_SCALE_VALUE = 100;
var MIN_IMG_SCALE_VALUE = 25;
var MAX_IMG_SCALE_VALUE = 100;

var uploadFormOverlay = document.querySelector('.img-upload__overlay');
var uploadFileInput = document.querySelector('#upload-file');
var uploadFormClose = uploadFormOverlay.querySelector('.img-upload__cancel');
var uploadForm = uploadFormOverlay.querySelector('#upload-select-image');

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
	uploadFormOverlay.classList.remove('hidden');
	console.dir(effectLvlLine.getBoundingClientRect());
}
/*Закрытие формы редактирования фото*/ 
var closeEditPhoto = function () {
	uploadFormOverlay.classList.add('hidden');
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
/* Задаем атрибут отвечающий за размер картинки*/
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
var changeImgFilterName = function(evt) {
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
	if (currentFilterName === 'none'){
		previewImg.style.filter = '';
	}else {
		previewImg.style.filter = currentFilterName + '(' + currentFilterValue +')';
	}
}
/* Скрытие поля регулировки уровня эффектов*/
var hideFilterLvlLine = function(){
	if (currentFilterName === 'none'){
		effectLvlWrap.classList.add('hidden');
	}else {
		effectLvlWrap.classList.remove('hidden');
	}
}
/* Задаем базовую ширину регулятора эффектов*/
var setDefaultEfectLvl = function(){
	effectLvlDepth.style.width = '100%';
	effectLvlPin.style.left = '100%';
	effectLvlLineWidth = effectLvlLine.clientWidth;
}

/* Изменение уровня фильтра (перемещение пина) */
var effectLvlLineWidth ;
var movePin = function (evt){
	var offsetLeft = evt.clientX - effectLvlLineOffsetX;
	if (offsetLeft < 0) { return };
	if (offsetLeft > effectLvlLineWidth) { return };
	effectLvlPin.style.left = offsetLeft + 'px' ;
	effectLvlDepth.style.width = offsetLeft + 'px' ;
	// if (effectLvlPin.getBoundingClientRect().x < effectLvlLine.getBoundingClientRect().x){
	// 	window.removeEventListener('mousemove', movePin)
	// }
	/* Регулятор уровня фильтра */
	setPercentValue();
	setFilterValue();
	applyFilter();
}

var effectLvlLineOffsetX; // Координаты effectLvlLine по оси Х

effectLvlPin.addEventListener('mousedown', function(){
	effectLvlLineOffsetX = effectLvlLine.getBoundingClientRect().x;
	window.addEventListener('mousemove', movePin);
	window.addEventListener('mousemove', applyFilter);
})
window.addEventListener('mouseup', function(){
	window.removeEventListener('mousemove', movePin);
	window.removeEventListener('mousemove', applyFilter);
})


/* ======= Валидация хэш-тэгов =======*/
var checkHashtgsValidity = function(){
	var message = '';
	//проверяем есть ли каке либо условия невалидности хэштэгов
	var hashtagsValue = hashtags.value;
	var hashtagsArray = hashtagsValue.split(' ');

	for (var i = 0; i < hashtagsArray.length; i++) {
		if (hashtagsArray[i][0] != '#') {
			message = "Хэш-тег должен начинается с символа # (решётка)";
			break
		}else if (hashtagsArray[i].length < 2){
			message = "Длина хэш-тэга должна быть не менее 2 символов";
			break
		}else if (hashtagsArray[i].length > 20){
			message = "Длина хэш-тэга должна быть не более 20 символов";
			break
		}else if (hashtagsArray.length > 5){
			message = "Нельзя указать больше пяти хэш-тегов";
			break
		}else{
			for (var j = 0; j < hashtagsArray.length; j++) {
				if (j != i){
					if (hashtagsArray[i] === hashtagsArray[j]){
						message = " Хэш-тэг не может быть использован более одного раза";
						break
					}
				}
			}
		} 
	}
	/*Устанавливаем сформированное сообщение*/
	hashtags.setCustomValidity(message);
}
/* Восстанавливаем значение валидности при изменении тектса хэш-тэгов*/
var setDefaultValidity = function(){
	hashtags.setCustomValidity('');
	hashtags.validity.valid = true;
	hashtags.classList.remove('invalid');
}
/* Задаем класс невалидного инпута*/
var setInvalidInput = function (){
	if (!hashtags.validity.valid){
		hashtags.classList.add('invalid');
	}
}

/* Изменение поля загрузки файла */
uploadFileInput.addEventListener('change', openEditPhoto);
uploadFileInput.addEventListener('change', setImgScaleClass);
uploadFileInput.addEventListener('change', hideFilterLvlLine);
uploadFileInput.addEventListener('change', hideFilterLvlLine);

/* Переключение фильтров*/
for (var i = 0; i < filterButtons.length; i++) {	
	filterButtons[i].addEventListener('click', changeImgFilterName );
	filterButtons[i].addEventListener('click', hideFilterLvlLine );
	filterButtons[i].addEventListener('click', setDefaultEfectLvl );
	filterButtons[i].addEventListener('click', setFilterValue );
	filterButtons[i].addEventListener('click', applyFilter );
}


/* Закрытие окна редактирования фото */
uploadFormClose.addEventListener('click', closeEditPhoto);
uploadFormClose.addEventListener('click', function(){
	currentFilterName = 'none';
	applyFilter();
});

/* Элементы уравления размером картинки */
//изменение значения элемента scaleValue
scaleBiggerBtn.addEventListener('click', increaseScaleValue );
scaleSmallerBtn.addEventListener('click', decreaseScaleValue );
//изменение размера непосредственно картинки 
scaleBiggerBtn.addEventListener('click', setImgScaleClass );
scaleSmallerBtn.addEventListener('click', setImgScaleClass );

/* Валидация хэштэга*/
hashtags.addEventListener('change', checkHashtgsValidity );
hashtags.addEventListener('input', setDefaultValidity );
hashtags.addEventListener('invalid', setInvalidInput );

/*Добавлене секции об ошибке загрузки*/
var errorTemplate = document.querySelector('#error').content.querySelector('.error');
var errorSection = errorTemplate.cloneNode(true);
errorSection.classList.add('hidden');
document.body.appendChild(errorSection);









