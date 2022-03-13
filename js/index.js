//! РАБОТА С API
//! получаем данные из api и преобразовываем
const getData = ({ search, id } = {}) => {  //! по умолчанию - пустой объект, т.к. search может и не передаваться
	// console.log(search);

	if (search) {
		return fetch(`http://localhost:3000/api/vacancy?search=${search}`).then(response => response.json());
	}

	return fetch(`http://localhost:3000/api/vacancy/${id ? id : ''}`).then(response => response.json());
};

//! если убрать из функции init слова async и await, то в data мы получим Promise, в котором есть массив, а нам нужен только сам массив, поэтому:
const init = async () => {
	const data = await getData();
	// console.log(data);  //! получаем массив данных для карточек-вакансий
	renderCards(data);
};


//! ФУНКЦИЯ ДЛЯ ВЕРНОГО СКЛОНЕНИЯ СУЩ. "ВАКАНСИЯ" РЯДОМ С НОМЕРОМ, ОБОЗНАЧАЮЩИМ КОЛИЧЕСТВО

const declOfNum = (n, titles) => {
	return n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
		0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
};


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

topCityBtn.addEventListener('click', () => {
	cityBox.classList.toggle('city_active');
});

cityRegionList.addEventListener('click', (event) => {
	const targetCity = event.target;

	if (targetCity.classList.contains('city__link')) {
		topCityBtn.textContent = targetCity.textContent;  //! меняем надпись
		cityBox.classList.remove('city_active');  //! после выбора города убираем меню с городами
	}
});

crossCityClose.addEventListener('click', () => {
	cityBox.classList.remove('city_active');
});


//! МОДАЛЬНОЕ ОКНО - ОТКРЫВАЕТСЯ ПО КЛИКУ НА КНОПКУ "ОТКЛИКНУТЬСЯ" И ПО ЗАГОЛОВКУ ВАКАНСИИ

const overlayVacancy = document.querySelector('.overlay_vacancy');
const resultList = document.querySelector('.result__list');  //! список с карточками-вакансиями

const createModal = (data) => {
	console.log(data);

	const {
		address,
		compensation,
		description,
		employer,
		employment,
		experience,
		skills,
		title
	} = data;

	const modal = document.createElement('div');
	modal.classList.add('modal');

	const closeButtonElem = document.createElement('button');
	closeButtonElem.classList.add('modal__close');
	closeButtonElem.textContent = '✕';

	const titleElem = document.createElement('h2');
	titleElem.classList.add('modal__title');
	titleElem.textContent = title;

	const compensationElem = document.createElement('p');
	compensationElem.classList.add('modal__compensation');
	compensationElem.textContent = compensation;

	const employerElem = document.createElement('p');
	employerElem.classList.add('modal__employer');
	employerElem.textContent = employer;

	const addressElem = document.createElement('p');
	addressElem.classList.add('modal__address');
	addressElem.textContent = address;

	const experienceElem = document.createElement('p');
	experienceElem.classList.add('modal__experience');
	experienceElem.textContent = experience;

	const employmentElem = document.createElement('p');
	employmentElem.classList.add('modal__employment');
	employmentElem.textContent = employment;

	const descriptionElem = document.createElement('p');
	descriptionElem.classList.add('modal__description');
	descriptionElem.textContent = description;

	const skillsElem = document.createElement('div');
	skillsElem.classList.add('modal__skills skills');

	const skillsTitleElem = document.createElement('h3');
	skillsTitleElem.classList.add('skills__title');
	skillsTitleElem.textContent = 'Подробнее:';

	const skillsListElem = document.createElement('ul');
	skillsListElem.classList.add('skills__list');

	for (const skill of skills) {
		const skillsItemElem = document.createElement('li');
		skillsItemElem.classList.add('skills__item');
		skillsItemElem.textContent = skill;
		skillsListElem.append(skillsItemElem);
	};

	skillsElem.append(skillsTitleElem, skillsListElem);

	const submitButtonElem = document.createElement('button');
	submitButtonElem.classList.add('modal__response');
	submitButtonElem.textContent = 'Отправить резюме';

	modal.append(
		closeButtonElem,
		titleElem,
		compensationElem,
		employerElem,
		addressElem,
		experienceElem,
		employmentElem,
		descriptionElem,
		skillsElem,
		submitButtonElem
	);

	return modal;
};

/*
modal
modal__close
modal__title
modal__compensation
modal__employer
modal__address
modal__experience
modal__employment
modal__description
modal__skills skills
skills__title
skills__list
skills__item
/*
	<div class="modal">
	  <button class="modal__close">✕</button>
	  <h2 class="modal__title">Junior+/Middle Front-end разработчик</h2>
	  <p class="modal__compensation">от 100 000 руб.</p>
	  <p class="modal__employer">ИНТИСИС</p>
	  <p class="modal__address">Челябинск</p>
	  <p class="modal__experience">Требуемый опыт работы: 1–3 года</p>
	  <p class="modal__employment">Полная занятость, удаленная работа</p>
	  <p class="modal__description">Ожидаем, решения задач связанных с визуальными изменениями на сайтах сервисов, к
		таковым задачам относится, как верстка отдельных компонентов и/или отдельных страниц по макету, так и внесение
		изменений в визуальную составляющую для работающих проектов.</p>
	  <div class="modal__skills skills">
		<h2 class="skills__title">Подробнее:</h2>
		<ul class="skills__list">
		  <li class="skills__item">Ожидаем, решения задач связанных с визуальными изменениями на сайтах сервисов, к
			таковым задачам относится, как верстка отдельных компонентов и/или отдельных страниц по макету, так и
			внесение изменений в визуальную составляющую для работающих проектов.</li>
		  <li class="skills__item">Обязателен опыт в выполнении верстки под ключ, опыт работы с react, минимальные
			знания и опыт в backend разработке.</li>
		  <li class="skills__item">Опыт, на аналогичной позиции, не менее 3-х лет самостоятельной полноценной верстки с
			нуля.</li>
		</ul>
	  </div>

	  <button class="modal__response">Отправить резюме</button>
	</div>
*/

resultList.addEventListener('click', async (event) => {
	//! если есть атрибут data-vacancy (а он есть у ссылок ".vacancy__open-modal": одна в заголовке, др. в "Откликнуться"), то выполнить код:
	if (event.target.hasAttribute('data-vacancy')) {
		event.preventDefault();  //! чтобы не добавлялось значение из href="#" (поведение ссылки по умолчанию)
		overlayVacancy.classList.add('overlay_active');  //! показываем модальное окно

		const data = await getData({ id: event.target.dataset.vacancy });
		const modal = createModal(data);
		overlayVacancy.append(modal);
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


//! ВЫВОД КАРТОЧЕК С ВАКАНСИЯМИ (В СПИСОК ".result__list")

const createCardVacancy = (vacancy) => {
	// console.log(vacancy);
	//! деструктуризация - создаём переменные, вытаскивая их значение из объекта по такому же названию
	//! без деструктуризации нужно было бы обращаться к значениям из объекта так: vacancy.title, vacancy.id и так далее
	const {
		id,
		title,
		compensation,
		workSchedule,
		employer,
		address,
		description,
		date,
	} = vacancy;  //! деструктуризация
	const cardVacancy = document.createElement('li');  //! т.к. каждая карточка является пунктом списка ".result__list"
	cardVacancy.classList.add('result__item');  //! это <li class="result__item">

	cardVacancy.insertAdjacentHTML('afterbegin', `
		<article class="vacancy">
			<h2 class="vacancy__title">
				<a class="vacancy__open-modal" href="#" data-vacancy="${id}">${title}</a>
			</h2>
			<p class="vacancy__compensation">${compensation}</p>
			<p class="vacancy__work-schedule">${workSchedule}</p>
			<div class="vacancy__employer">
				<p class="vacancy__employer-title">${employer}</p>
				<p class="vacancy__employer-address">${address}</p>
			</div>
			<p class="vacancy__description">${description}</p>
			<p class="vacancy__date">
				<time datetime="${date}">${date}</time>
			</p>
			<div class="vacancy__wrapper-btn">
				<a class="vacancy__response vacancy__open-modal" href="#" data-vacancy="${id}">Откликнуться</a>
				<button class="vacancy__contacts">Показать контакты</button>
			</div>
		</article>
	`);
	return cardVacancy;
};

const renderCards = (data) => {
	resultList.textContent = '';  //! очищаем список с карточками-вакансиями
	const cards = data.map((item) => createCardVacancy(item));  //! создаём массив карточек-вакансий
	// console.log(cards);
	resultList.append(...cards);  //! добавляем только что созданные карточки-вакансии в список ".result__list"
};


//! ПОИСК ПО ВАКАНСИЯМ

const formSearch = document.querySelector('.bottom__search');

formSearch.addEventListener('submit', async (event) => {
	event.preventDefault(); //! отменяем стандартное поведение 'submit' - перезагрузку страницы

	const inputSearch = formSearch.elements.search;  //! получаем input из этой формы по его имени (name="search")
	const textSearch = inputSearch.value;  //! получаем значение input (то, что написал пользователь в поле поиска)

	if (textSearch.length > 2) {
		inputSearch.style.borderColor = '';

		const data = await getData({ search: textSearch }) //! деструктуризация. Получаем только те данные, которые ищем
		console.log(data);
		renderCards(data); //! вызываем функцию вывода списка карточек именно с теми данными, которые ищем

		//! записываем в заголовок количество найденных вакансий - с вызовом функции declOfNum для правильного склонения
		//! записываем в заголовок тот запрос, который вводили в строку поиска
		const foundVacanciesTitle = document.querySelector('.found');
		foundVacanciesTitle.innerHTML = `${declOfNum(data.length, ['вакансия', 'вакансии', 'вакансий'])} &laquo;${textSearch}&raquo`;

		formSearch.reset();  //! очистка формы поиска

	} else {
		inputSearch.style.borderColor = 'red';
		setTimeout(() => {
			inputSearch.style.borderColor = '';
		}, 2000);
	};
});









init();

