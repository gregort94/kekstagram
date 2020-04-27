(function () {
	var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
	var URL_UPLOAD = 'https://js.dump.academy/kekstagram';

	/* Получение массива данных для фото с сервера. 
		Вывод фотографий на страницу сразу после получения данных*/
	var load = function (successHandler) {
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'json';

		xhr.addEventListener('load', function () {
			var error;
			switch (xhr.status) {
				case 200:
					window.currentPhotoArray = xhr.response;
					successHandler(window.currentPhotoArray);
					break;
				case 400:
					error = 'Неверный запрос';
					break;
				case 401:
					error = 'Пользователь не авторизован';
					break;
				case 404:
					error = 'Ничего не найдено';
					break;

				default:
					error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
			}

			if (error) {
				alert(error);
			}
		});
		xhr.addEventListener('error', () => {
			window.currentPhotoArray = window.data.backupsData;
			successHandler(window.currentPhotoArray);
		});

		xhr.open('GET', URL_LOAD);
		xhr.send();
		return xhr
	};

	/* Отправка данных формы загружаемой фотографии на сервер */
	var upload = function (data, successHandler, errorHandler) {
		var xhr = new XMLHttpRequest();
		xhr.addEventListener('load', function () {

			var loadingSection = document.querySelector('.img-upload__message--loading');
			loadingSection.classList.add('hidden');

			var error;
			switch (xhr.status) {
				case 200:
					successHandler();
					break;
				case 400:
					error = 'Неверный запрос';
					break;
				case 401:
					error = 'Пользователь не авторизован';
					break;
				case 404:
					error = 'Ничего не найдено';
					break;

				default:
					error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
			}
			if (error) {
				errorHandler(error);
			}
		})
		xhr.open('POST', URL_UPLOAD);
		xhr.send(data);
	};

	/*===================== Экспорт ====================*/
	window.backend = {
		load: load,
		upload: upload,
	};


})();
