var uploadForm = document.querySelector('.img-upload__overlay');
var uploadFileInput = document.querySelector('#upload-file');
var uploadFormClose = uploadForm.querySelector('.img-upload__cancel');
/*Открытие формы редактирования фото*/ 
var openEditPhoto = function (){
	uploadForm.classList.remove('hidden');
}
/*Закрытие формы редактирования фото*/ 
var closeEditPhoto = function () {
	uploadForm.classList.add('hidden');
}
uploadFileInput.addEventListener('change', openEditPhoto);
uploadFormClose.addEventListener('click', closeEditPhoto);
