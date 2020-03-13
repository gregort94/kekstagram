(function () {

/*............Константы.................*/
	var DEFAULT_SCALE_VALUE = 100;
	var MIN_IMG_SCALE_VALUE = 25;
	var MAX_IMG_SCALE_VALUE = 100;
/*......................................*/

	var uploadFileInput = document.querySelector('#upload-file');
	var uploadForm = document.querySelector('#upload-select-image');
	var uploadFormOverlay = document.querySelector('.img-upload__overlay');
	var uploadFormClose = uploadFormOverlay.querySelector('.img-upload__cancel');
	var previewImg = uploadFormOverlay.querySelector('.img-upload__preview img');
	var filterButtons = uploadFormOverlay.querySelectorAll ('.effects__preview');
	var errorTemplate = document.querySelector('#error').content.querySelector('.error');
	var loadingSection = document.querySelector('.img-upload__message--loading');

/* Элементы уравления размером картинки*/
	var scaleBiggerBtn = uploadFormOverlay.querySelector('.scale__control--bigger');
	var scaleSmallerBtn = uploadFormOverlay.querySelector('.scale__control--smaller');
	var scaleValue = uploadFormOverlay.querySelector('.scale__control--value');
	
/*Элементы блока регулировки уровня фильтра*/
	var effectLvlWrap= uploadFormOverlay.querySelector ('.img-upload__effect-level');
	var effectLvlLine = uploadFormOverlay.querySelector ('.effect-level__line');
	var effectLvlDepth = uploadFormOverlay.querySelector ('.effect-level__depth');
	var effectLvlPin = uploadFormOverlay.querySelector('.effect-level__pin');

/*Элементы блока описания фотографии*/
	var hashtags = document.querySelector ('.text__hashtags');
	var photoDescription = document.querySelector ('.text__description');

/*Открытие формы редактирования фото*/ 
	var openEditPhoto = function (){		
		scaleValue.value = DEFAULT_SCALE_VALUE + '%'; // Устанавливаем значение по умолчанию для scaleValue
		uploadFormOverlay.classList.remove('hidden');
	}

/*Закрытие формы редактирования фото*/ 
	var closeEditPhoto = function () {
		uploadFormOverlay.classList.add('hidden');
		uploadFileInput.files[0] = '';
		/* Задаем настроки фильтра по умолчанию*/
		currentFilterName = 'none';
		applyFilter();
		hashtags.value = '';
		photoDescription.value = '';
	}


/* ============ Управление размером картинки ============*/

/* Увеличить значение размера*/
	var increaseScaleValue = function () {
		var numValue = parseInt(scaleValue.value);
		if (numValue < MAX_IMG_SCALE_VALUE){
			numValue += 25;
		}
		scaleValue.value = numValue + '%';
	}

/* Уменьшить значение размера*/
	var decreaseScaleValue = function () {
		var numValue = parseInt(scaleValue.value);
		if (numValue > MIN_IMG_SCALE_VALUE){
			numValue -= 25;
		}
		scaleValue.value = numValue + '%';
	}

/* Задаем атрибут отвечающий за размер картинки*/
	var setImgScaleClass = function() {
		var value = scaleValue.value;
		previewImg.setAttribute('data-scale', value);
	}

/* Устанавливам слушателей клика по кнопке изменения размера картинки */

	scaleBiggerBtn.addEventListener('click', increaseScaleValue );
	scaleSmallerBtn.addEventListener('click', decreaseScaleValue );
	scaleBiggerBtn.addEventListener('click', setImgScaleClass );
	scaleSmallerBtn.addEventListener('click', setImgScaleClass );

/*..........................................................*/


/*  ============= Управление фильтром на фото ===========  */

	var currentFilterName = 'none';
	var filterPercent = 100;
	var currentFilterValue = '';

/* Определяем имя фильтра*/
	var changeImgFilterName = function(element) {
		currentFilterName = element.getAttribute('data-filterName');
	}

/* Определяем уровень фильтра в %*/
	var setPercentValue = function (){
		filterPercent = effectLvlDepth.clientWidth  / effectLvlLine.clientWidth;
	} 

/* Определяем значение фильтра*/
	var setFilterValue = function (){
		switch (currentFilterName){
			case 'grayscale':
				currentFilterValue = (filterPercent);
				break
			case 'sepia':
				currentFilterValue = (filterPercent);
				break
			case 'invert':
				currentFilterValue = (filterPercent * 100 ) + '%';
				break
			case 'blur':
				currentFilterValue = (filterPercent * 3 ) + 'px';
				break
			case 'brightness':
				currentFilterValue = (filterPercent * 3 );
				break
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

/* Задаем значение регулятора эффектов по умолчанию (100%)*/
	var setDefaultEfectLvl = function(){
		effectLvlDepth.style.width = '100%';
		effectLvlPin.style.left = '100%';
		/* Высчитывам ширину линии уровня эффектов*/
		effectLvlLineWidth = effectLvlLine.clientWidth;
	}

/* Изменение уровня фильтра (перемещение пина) */
	var effectLvlLineOffsetX; // Координаты effectLvlLine по оси Х
	var effectLvlLineWidth ;
	var movePin = function (evt){
		evt.preventDefault();
		var offsetLeft = evt.clientX - effectLvlLineOffsetX;
		if (offsetLeft < 0 || offsetLeft > effectLvlLineWidth) { return };
		effectLvlPin.style.left = offsetLeft + 'px' ;
		effectLvlDepth.style.width = offsetLeft + 'px' ;
	/* Применяем фильтр к фотографии*/
		setPercentValue();
		setFilterValue();
		applyFilter();
	}

/* Скрытие поля регулировки уровня эффектов*/
	var hideFilterLvlLine = function(){
		if (currentFilterName === 'none'){
			effectLvlWrap.classList.add('hidden');
		}else {
			effectLvlWrap.classList.remove('hidden');
		}
	}

/* Задаем cлушателей клика на кнопку фильтра*/
		for (var i = 0; i < filterButtons.length; i++) {	
			filterButtons[i].addEventListener('click', function (){
				changeImgFilterName(this);
				hideFilterLvlLine();
				setDefaultEfectLvl();
				setFilterValue();
				applyFilter();
			} );
		}

/* События при клике на пин + движение мышки*/
	effectLvlPin.addEventListener('mousedown', function(){
		effectLvlLineOffsetX = effectLvlLine.getBoundingClientRect().x;
		window.addEventListener('mousemove', movePin);
		window.addEventListener('mousemove', applyFilter);
	})
	window.addEventListener('mouseup', function(){
		window.removeEventListener('mousemove', movePin);
		window.removeEventListener('mousemove', applyFilter);
	})

/*..........................................................*/


/* ============== Валидация хэш-тэгов ==============*/

/* Проверка и формирование сообщения в случае невалидности поля*/
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
		/* Устанавливаем сформированное сообщение*/
		hashtags.setCustomValidity(message);
	}

/* Восстанавливаем значение валидности при изменении текста хэш-тэгов*/
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

/* События при изменении в поле хэш-тэг*/
	hashtags.addEventListener('change', checkHashtgsValidity );
	hashtags.addEventListener('input', setDefaultValidity );
	hashtags.addEventListener('invalid', setInvalidInput );

/*..........................................................*/


/*============ Установка обработчиков событий ============*/

/* Изменение поля загрузки файла */
	uploadFileInput.addEventListener('change', openEditPhoto);
	uploadFileInput.addEventListener('change', setImgScaleClass);
	uploadFileInput.addEventListener('change', hideFilterLvlLine);


/* Закрытие окна редактирования фото */
	uploadFormClose.addEventListener('click', closeEditPhoto);
	document.addEventListener('keydown', function (evt) {
		if (evt.keyCode === 27 && evt.target != photoDescription ) {
			closeEditPhoto();
		}
	})

/*..........................................................*/


/*================== Обработка секции с ошибкой загрузки =============*/

/* Добавлене секции об ошибке загрузки */
	var showError = function (errorText){
		closeEditPhoto();
		var errorSection = errorTemplate.cloneNode(true);
		var errorTitle = errorSection.querySelector('.error__title');
		errorTitle.textContent = errorText;
		var errorBtns = errorSection.querySelectorAll('.error__button'); 
		for (var i = 0; i < errorBtns.length; i++) {
			errorBtns[i].addEventListener('click', hideError);
		}
		document.body.appendChild(errorSection);
	}

/* Прячем сообщение об ошибке */
	var hideError = function (){
		document.querySelector('.error').remove();
	}

	uploadForm.addEventListener('submit', function(evt){
		evt.preventDefault();
		loadingSection.classList.remove('hidden');
		window.backend.upload(new FormData(uploadForm), closeEditPhoto, showError )		
	})
/*................................................................*/

})();








