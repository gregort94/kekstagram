(function () {
 
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

		var data = {
			url: 'photos/'+(i+1)+'.jpg',
			likes: likesVal,
			comments: randomComments ,
			description: randomDescription ,
		}
		return data
	}
	for(var i = 0; i < objectNumber; i++){
		var dataObject = generateObject();
		dataArray.push(dataObject);
	}
	return dataArray
};

/*Генерация случайного целого числа в диапазоне*/
	var getRandomInt = function (min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	};
	
/*===================== Экспорт ====================*/
	window.data = {
		generateDataArray: generateDataArray,
		getRandomInt: getRandomInt,
	};

})();