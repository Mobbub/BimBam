// Вызов базовых функций после загрузки страницы
$(document).ready(function () {

    PrintCards();
    FilerReader();
    BtnLoadPosts();

});

// Функция вывода карточек, передаётся флаг, true - добавление, false - обновление
const PrintCards = (flag_add_or_up) => {

    // Создание базовых переменных, роут на которые отправляется запрос, data - промежуточные данные, 
    // request - данные для запроса
    route = '';
    var data = {};
    var request = {};

    // Вызов функции получающей данные фильтра
    data['filter'] = InfoInput();

    // Получение заголовка последней карточки
    if (flag_add_or_up) {
        console.log(document.querySelectorAll(".achivment-item__text > h3")[document.querySelectorAll(".achivment-item__text > h3").length - 1].textContent);
        request['id_last_proj'] = document.querySelectorAll(".achivment-item__text > h3")[document.querySelectorAll(".achivment-item__text > h3").length - 1].textContent;
        route = '/api/more_achivm_ps';
    } else {
        request['id_last_proj'] = '';
        route = '/api/achivm_ps';
    }

    // Формирование индекса действия
    request['input'] = data['filter']['input'];
    if (data['filter']['selected'] == 'new' && data['filter']['input'] == '') {
        request['index_action'] = 1;
    } else if (data['filter']['selected'] == 'old' && data['filter']['input'] == '') {
        request['index_action'] = 2;
    } else if (data['filter']['selected'] == 'new' && data['filter']['input'] != '') {
        request['index_action'] = 3;
    } else if (data['filter']['selected'] == 'old' && data['filter']['input'] != '') {
        request['index_action'] = 4;
    }

    // Отправка пост запроса на сервер
    fetch(route, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {


            // Если кнопка "Загрузить ещё" уже есть, удалить текущую
            if (document.querySelector(".achivment-button") != null) {
                document.querySelector(".achivment-button").remove();
            }

            // Получение объектов для вставки кнопки и карточек
            const section_achivment_container = document.querySelector(".section-achivment > .container");
            const achivment__list = document.querySelector(".achivment__list");

            // Проверка успешности запроса
            if (data['status'] == 200) {

                // Цикл для вывода всех карточек
                for (i = 1; i <= Object.keys(data['projects']).length; i++) {

                    achivment__list.append(create('<div class="achivment__item _anim-items"><div class="achivment-item__img"></div><div class="achivment-item__text"><h3 class="montserrat">' + data['projects'][i]['name'] + '</h3><p><span>Дата: </span>' + data['projects'][i]['date'] + '</p><p><span>Описание: </span>' + data['projects'][i]['description'] + '</p></div></div>'));

                    new_element = document.querySelectorAll(".achivment-item__img")[document.querySelectorAll(".achivment-item__img").length - 1]

                    // new_element.style.backgroundImage = 'linear-gradient(to left, rgb(42, 17, 75), rgba(0, 0, 0, 0))', 'url("../' + data['projects'][i]['image'] + '")';
                    new_element.style.setProperty('background-image', 'linear-gradient(to left, rgb(42, 17, 75), rgba(0, 0, 0, 0)), url("../static/' + data['projects'][i]['image'] + '")');

                }

                if (data['flag_proj'] == 1) {
                    // Добавление кнопки
                    section_achivment_container.append(create('<div class="achivment-button"><button class="montserrat">Загрузить еще</button></div>'));
                }



            } else if (data['status'] == 0) {

                //Обработка статуса ошибки

            }

        })
        // Подгрузка скриптов которые должны работать у сгенерированных ajax элементов 
        .then(() => {
            scroll();
        });

}

// Функция для детектирования взаимодействия с фильтром
const FilerReader = () => {
    // Добавляем обработчики событий после загрузки страницы
    // window.onload = function () {
        const selectElement = document.getElementById('filter');
        const inputElement = document.querySelector('#filter > #lenguage');

        // Обработчик для нажатия на кнопку
        selectElement.addEventListener('submit', function (e) {
            processInput(e);
        });

        // Обработчик для изменения поля selected
        inputElement.addEventListener('change', function (e) {
            processInput(e);
        });
    };
// }

// Получение информации о фильтре
function InfoInput() {

    // Получаем значение selected
    const selectElement = document.querySelector('#filter > #lenguage');
    const selectedValue = selectElement.value;

    // Получаем текст из инпута
    const inputElement = document.querySelector('input[type="search"]');
    const inputValue = inputElement.value;

    // console.log('Выбранное значение:', selectedValue);
    // console.log('Текст в инпуте:', inputValue);

    // Возвращаем информацию о фильтре
    filter = {
        'selected': selectedValue,
        'input': inputValue
    }
    return filter
}

// Функция для удаления всех карточек и вызов функции PrintCards(false)
function processInput(e) {

    e.preventDefault();
    // Получаем все элементы с классом 'achivment__item'
    const elements = document.querySelectorAll('.achivment__item');

    // Перебираем найденные элементы и удаляем каждый из них
    elements.forEach(element => {
        element.remove();
    });

    PrintCards(false);
}


// Функция для создания html объекта из строки
function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

// Обработчик кнопки "Загрузить ещё"
function BtnLoadPosts() {
    // Слушатель кнопки 
    $('body').delegate('.achivment-button', 'click', function (e) {
        e.preventDefault();

        PrintCards(true);

    });
}



