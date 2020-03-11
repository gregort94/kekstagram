(function () {

	var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
	var socialCommentsList = document.querySelector('.social__comments');
	var picturesContainer = document.querySelector('.pictures');
	var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

/* ссылки на элементы блока big-picture*/
	var bigPicture = document.querySelector('.big-picture');
	var photo = document.querySelector('.big-picture__img img');
	var likesCount = document.querySelector('.likes-count');
	var commentsCount = document.querySelector('.comments-count');
	var description = document.querySelector('.social__caption');
	var bigPictureCansel =  document.querySelector('.big-picture__cancel');

/*Генерация фотографии*/
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
/*Генерация и вывод на страницу фотографий */
	var renderPictures = function (data){
		for (var i =0; i < data.length; i++){
			var pictureData = data[i];
			var picture = generatePicture(pictureData);
			picture.setAttribute('data-order', i);
			picturesContainer.appendChild(picture);
		}
	}

/*  Вызываем функцию генерации массива (запросом на сервер) и возвращаем обьект xhr  */
	var xhr = window.backend.load(renderPictures);

/*Генерация комментария (элемента) */
	var generateCommentElement = function (commentText) {
		var socialComment = commentTemplate.cloneNode(true);
		var commentAvatar = socialComment.querySelector('.social__picture');
		commentAvatar.src = 'img/avatar-' + window.data.getRandomInt(1, 7) + '.svg';
		var commentTextElem = socialComment.querySelector('.social__text');
		commentTextElem.textContent = commentText;
		return socialComment;
	}
	/*Наполняем данными открытую фотографию*/
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
	/*Открываем фотографию в полноэкранном режиме*/
	var openBigPicture = function (){
		bigPicture.classList.remove('hidden');
		bigPictureContain(xhr.response[this.getAttribute('data-order')]);
	}
	/*Закрываем фотографию в полноэкранном режиме*/
	var closeBigPicture = function (){
		bigPicture.classList.add('hidden');
	}

	/*добавляем eventListener для кнопки закрытия полноэкранного фото*/
	bigPictureCansel.addEventListener('click', closeBigPicture);
	document.addEventListener('keydown', function (evt) {
		// alert(evt.keyCode);
		if (evt.keyCode === 27) {
			closeBigPicture();
		}
	})



})();



