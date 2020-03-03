/*Генерация массива данных для фотографий*/
var generateDataArray = function (objectNumber){
	var dataArray =[];
	var commentsArray = [
		'Всё отлично!',
		'В целом всё неплохо. Но не всё.',
		'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
		'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
		'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
		'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
	]
	var descriptionArray = [
		'Тестим новую камеру!',
		'Затусили с друзьями на море',
		'Как же круто тут кормят',
		'Отдыхаем...',
		'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
		'Вот это тачка!'
	]
/*Генерация обьекта с данными для фотографии*/
	var generateObject = function (){
		var likesVal = getRandomInt(15, 200);
		var randomCommentsQuantity  = getRandomInt(1	, 5);
		var randomComments = [];
		for (var j = 0; j < randomCommentsQuantity; j++) {
			var commentNumber = getRandomInt(0, commentsArray.length - 1);
			var randomComment = commentsArray[commentNumber];
			randomComments.push(randomComment);
		}
		var descriptionNumber = getRandomInt(0, descriptionArray.length - 1);
		var randomDescription = descriptionArray[descriptionNumber];

		var object = {
			url: 'photos/'+(i+1)+'.jpg',
			likes: likesVal,
			comments: randomComments ,
			description: randomDescription ,
		}
		return object
	}
	for(var i = 0; i < objectNumber; i++){
		var dataObject = generateObject();
		dataArray.push(dataObject);
	}
	return dataArray
}
/*Генерация случайного целого числа в диапазоне*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
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
		picture.setAttribute('data-number', i);
		picturesContainer.appendChild(picture);
	}
}
/*Генерация комментария (элемента) */
var generateCommentElement = function (commentText) {
	var socialComment = commentTemplate.cloneNode(true);
	var commentAvatar = socialComment.querySelector('.social__picture');
	commentAvatar.src = 'img/avatar-' + getRandomInt(1, 7) + '.svg';
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
		var commentText = commentsArray[i];
		var comment = generateCommentElement(commentText);
		socialCommentsList.appendChild(comment);
	}
}
/*Открываем фотографию в полноэкранном режиме*/
var openBigPicture = function (){
	bigPicture.classList.remove('hidden');
	var currentPhotoNumber = this.dataset.number;
	var pictureData = dataArray[currentPhotoNumber];
	bigPictureContain(pictureData);
}
/*Закрываем фотографию в полноэкранном режиме*/
var closeBigPicture = function (){
	bigPicture.classList.add('hidden');
}

var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
var socialCommentsList = document.querySelector('.social__comments');
var picturesContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var formComment = document.querySelector('.text__description');

/* ссылки на элементы блока big-picture*/
var bigPicture = document.querySelector('.big-picture');
var photo = document.querySelector('.big-picture__img img');
var likesCount = document.querySelector('.likes-count');
var commentsCount = document.querySelector('.comments-count');
var description = document.querySelector('.social__caption');
var bigPictureCansel =  document.querySelector('.big-picture__cancel');

/*вызовы функций*/

var dataArray = generateDataArray(25);
renderPictures(dataArray);

/*добавляем eventListener для кнопки закрытия полноэкранного фото*/
bigPictureCansel.addEventListener('click', closeBigPicture);
document.addEventListener('keydown', function (evt) {
	// alert(evt.keyCode);
	if (evt.keyCode === 27 && evt.target != formComment ) {
		closeBigPicture();
		closeEditPhoto();
	}
})




