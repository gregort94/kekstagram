(function () {

	var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
	var socialCommentsList = document.querySelector('.social__comments');
	var picturesContainer = document.querySelector('.pictures');
	var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

/* Элементы блока big-picture*/
	var bigPicture = document.querySelector('.big-picture');
	var photo = document.querySelector('.big-picture__img img');
	var likesCount = document.querySelector('.likes-count');
	var commentsCount = document.querySelector('.comments-count');
	var description = document.querySelector('.social__caption');
	var bigPictureCansel =  document.querySelector('.big-picture__cancel');

/* Элементы блока сортировки фото*/
	var sortBlock = document.querySelector('.img-filters');
	var sortButtons = sortBlock.querySelectorAll('.img-filters__button');
	var sortNew = sortBlock.querySelector('#filter-new');
	var sortPopular = sortBlock.querySelector('#filter-popular');
	var sortDiscussed = sortBlock.querySelector('#filter-discussed');


/*==================== Вывод на стрницу фотографий ==================*/


/* Генерация фотографии*/
	var generatePicture = function (data){
		var picture = pictureTemplate.cloneNode(true);
		var pictureImg = picture.querySelector('.picture__img');
		pictureImg.src = data.url;
		var likes = picture.querySelector('.picture__likes');
		likes.textContent = data.likes;
		var pictureComment = picture.querySelector('.picture__comments');
		pictureComment.textContent = data.comments.length;
		picture.addEventListener('click', openBigPicture);
		return picture;
	}

/* Вывод на страницу фотографий */
	var currentPicturesArray = [];
	var renderPictures = function (data){
	/* Очищаем временный массив с фотографиями при повторном рендере*/
		currentPicturesArray.forEach(function(item){
			item.remove();
		})
		currentPicturesArray.length = 0;
		for (var i =0; i < data.length; i++){
			var pictureData = data[i];
			var picture = generatePicture(pictureData);
			picture.setAttribute('data-order', i);
			picturesContainer.appendChild(picture);
			currentPicturesArray.push(picture);
		}
	/* Отобразить блок сортировки фотографий*/
		sortBlock.classList.remove('img-filters--inactive');
	}

/* Вызываем функцию генерации массива данных для фото (запросом на сервер).
	Выводим фотографии на страницу  */
	var xhr = window.backend.load(renderPictures);

/*........................................................................*/


/*==================== Полноэкранный режим просмотра фото ======================= */

/* Генерация комментария (элемента) */
	var generateCommentElement = function (commentText) {
		var socialComment = commentTemplate.cloneNode(true);
		var commentAvatar = socialComment.querySelector('.social__picture');
		commentAvatar.src = 'img/avatar-' + window.data.getRandomInt(1, 7) + '.svg';
		var commentTextElem = socialComment.querySelector('.social__text');
		commentTextElem.textContent = commentText;
		return socialComment;
	}

/* Наполняем данными открытую фотографию*/
	var bigPictureContain = function (dataObject){
		photo.src = dataObject.url;
		likesCount.textContent = dataObject.likes;
		commentsCount.textContent = dataObject.comments.length;
		var commentsArray = dataObject.comments;
		description.textContent = dataObject.description;
		socialCommentsList.textContent = '';
		for (var i = 0; i < commentsArray.length; i++) {
			var commentText = commentsArray[i].message;
			var comment = generateCommentElement(commentText);
			socialCommentsList.appendChild(comment);
		}
	}

/* Открываем фотографию в полноэкранном режиме*/
	var openBigPicture = function (){
		bigPicture.classList.remove('hidden');
		var positionInDataArray = this.getAttribute('data-order');
		bigPictureContain(currentPhotoArray[positionInDataArray]);	
	}

/* Закрываем фотографию в полноэкранном режиме*/
	var closeBigPicture = function (){
		bigPicture.classList.add('hidden');
	}

	bigPictureCansel.addEventListener('click', closeBigPicture);
	document.addEventListener('keydown', function (evt) {
		if (evt.keyCode === 27) {
			closeBigPicture();
		}
	})
/*...............................................................*/


/*============== Сортировка фото на странице ==============*/

/* Действия при нажатии на любую из кнопок */
	var timerID; 
	var sortBtnActiveHandler = function (photoArray, element){
		toggleSortBtnClass(element);
		clearTimeout(timerID);
		timerID = setTimeout(function(){renderPictures(photoArray)}, 500);			
	}

/* Задание класса актиной кнопке */
	var toggleSortBtnClass = function(element){
		sortButtons.forEach(function(btn){ btn.classList.remove('img-filters__button--active')});
		element.classList.add('img-filters__button--active');
	}

/* Хэндлеры для каждой из кнопок*/
	var newBtnActiveHadler = function(){
		window.currentPhotoArray = xhr.response;
		sortBtnActiveHandler(currentPhotoArray, this);			
	}

	var popularBtnActiveHadler = function(){
		window.currentPhotoArray = xhr.response.slice().sort(function(prevData, nextData){return nextData.likes - prevData.likes });
		sortBtnActiveHandler(currentPhotoArray, this);
	}

	var discussedBtnActiveHadler = function(){
		window.currentPhotoArray = xhr.response.slice().sort(function(prevData, nextData){return nextData.comments.length - prevData.comments.length });
		sortBtnActiveHandler(currentPhotoArray, this);
	}

/* Задаем кнопкам хендлеры*/
	sortPopular.addEventListener('click', popularBtnActiveHadler );
	sortNew.addEventListener('click', newBtnActiveHadler );
	sortDiscussed.addEventListener('click', discussedBtnActiveHadler );
/*........................................................................*/
})();



