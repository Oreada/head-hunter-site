//! ВЫБОР СПОСОБА СОРТИРОВКИ (order) И ПЕРИОДА (period) - ВЫПАДАЮЩИЕ СПИСКИ 

const optionBtnOrder = document.querySelector('.option__btn_order');
const optionBtnPeriod = document.querySelector('.option__btn_period');
const optionListOrder = document.querySelector('.option__list_order');
const optionListPeriod = document.querySelector('.option__list_period');

const orderItems = optionListOrder.querySelectorAll('.option__item');  //! массив из пунктов меню '.option__list_order'
const periodItems = optionListPeriod.querySelectorAll('.option__item');  //! массив из пунктов меню '.option__list_period'

//! при нажатии кнопки появляется список с пунктами
optionBtnOrder.addEventListener('click', () => {
	optionListOrder.classList.toggle('option__list_active');
	optionListPeriod.classList.remove('option__list_active');  //! если щёлкаем по одному списку, то другой нужно закрыть
});

//! при нажатии кнопки появляется список с пунктами
optionBtnPeriod.addEventListener('click', () => {
	optionListPeriod.classList.toggle('option__list_active');
	optionListOrder.classList.remove('option__list_active');  //! если щёлкаем по одному списку, то другой нужно закрыть
});

//! обработка нажатия пункта выпадающего меню - меню ".option__list_order"
optionListOrder.addEventListener('click', (event) => {
	const targetOrder = event.target;

	if (targetOrder.classList.contains('option__item')) {
		optionBtnOrder.textContent = targetOrder.textContent;  //! текстовое содержимое кнопки '.option__btn_order' будет равно содержимому пункта меню
		for (const element of orderItems) {
			if (element === targetOrder) {
				element.classList.add('option__item_active');
			} else {
				element.classList.remove('option__item_active');
			};
		};
		setTimeout(() => { optionListOrder.classList.remove('option__list_active') }, 500);  //! убираем открытое меню после того как сделан выбор пункта
	};
});

//! обработка нажатия пункта выпадающего меню - меню ".option__list_period"
optionListPeriod.addEventListener('click', (event) => {
	const targetPeriod = event.target;

	if (targetPeriod.classList.contains('option__item')) {
		optionBtnPeriod.textContent = targetPeriod.textContent;  //! текстовое содержимое кнопки '.option__list_period' будет равно содержимому пункта меню
		for (const element of periodItems) {
			if (element === targetPeriod) {
				element.classList.add('option__item_active');
			} else {
				element.classList.remove('option__item_active');
			};
		};
		setTimeout(() => { optionListPeriod.classList.remove('option__list_active') }, 500);  //! убираем открытое меню после того как сделан выбор пункта
	};
});


//! ВЫБОР ГОРОДА

const topCityBtn = document.querySelector('.top__city');
const cityBox = document.querySelector('.city');
const crossCityClose = document.querySelector('.city__close');
const cityRegionList = document.querySelector('.city__region-list');

topCityBtn.addEventListener('click', (event) => {
	cityBox.classList.toggle('city_active');
});

cityRegionList.addEventListener('click', (event) => {
	const targetCity = event.target;

	if (targetCity.classList.contains('city__link')) {
		topCityBtn.textContent = targetCity.textContent;  //! меняем надпись
		cityBox.classList.remove('city_active');  //! после выбора города убираем меню с городами
	}
});

crossCityClose.addEventListener('click', (event) => {
	cityBox.classList.remove('city_active');
});


//! МОДАЛЬНОЕ ОКНО - ОТКРЫВАЕТСЯ ПО КЛИКУ НА КНОПКУ "ОТКЛИКНУТЬСЯ" И ПО ЗАГОЛОВКУ ВАКАНСИИ

const overlayVacancy = document.querySelector('.overlay_vacancy');
const resultList = document.querySelector('.result__list');

resultList.addEventListener('click', (event) => {
	//! если есть атрибут data-vacancy (а он есть у ссылок ".vacancy__open-modal": одна в заголовке, др. в "Откликнуться"), то выполнить код:
	if (event.target.hasAttribute('data-vacancy')) {
		event.preventDefault();  //! чтобы не добавлялось значение из href="#" (поведение ссылки по умолчанию)
		overlayVacancy.classList.add('overlay_active');  //! показываем модальное окно
	};
});

document.addEventListener("click", function (event) {

	//! если кликнули на крестик
	if (event.target.classList.contains('modal__close')) {
		overlayVacancy.classList.remove('overlay_active');
	};

	//! если кликнули не внутри окна и не по ссылкам для открытия окна
	if (!event.target.closest('.modal') && !event.target.hasAttribute('data-vacancy')) {
		overlayVacancy.classList.remove('overlay_active');  //! то удаляем класс 'overlay_active', т.е. убираем модальное окно
	};
});



