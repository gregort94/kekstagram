(function () {
	var URL_LOAD = 'https://js.dump.academy/kekstagram/data';

	var load = function (onLoad){
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'json';

		xhr.addEventListener('load', function () {
		   var error;
		   switch (xhr.status) {
		      case 200:
		        onLoad(xhr.response);
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
		     		onError(error);
		     }
		});
		
		xhr.open('GET', URL_LOAD);
		xhr.send();
		return xhr
	}
	window.backend = {
		load: load,
	};

})();
