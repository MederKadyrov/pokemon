// Import stylesheets

// Асинхронность, промисы и HTTP.  Домашняя работа

// Задание №1
// Создать программу - список покемонов.

// Пример:
// Bulbasaur
// Ivysaur
// Venusaur
// Charmander
// Charmeleon
// Charizard
// Squirtle
// … и т.п.

let API = 'https://pokeapi.co/api/v2/pokemon';


let wrapApi = document.getElementById('app');
// контейнер
let container = document.createElement('div');
container.classList.add('container');
wrapApi.append(container);

// создание списка
let mainUl = document.createElement('ul');
mainUl.classList.add('pokemonUl');
container.append(mainUl);

// кнопка PREVIOS
let previos = document.createElement('button');
previos.innerText = '<< PREVIOS';
container.append(previos);

// кнопка NEXT
let nextBtn = document.createElement('button');
nextBtn.innerText = 'NEXT >>';
container.append(nextBtn);


async function createUl(a) {
    mainUl.innerHTML = '';
  fetch(a).then((res) => res.json()).
  then((data) => {
    data.results.forEach((element, index) => {
        let li = document.createElement('li');
        let p = document.createElement('p');
        p.innerHTML = element.name;
        li.append(p);
        // создание дива с информацией
        let infoDiv = document.createElement('div');
        infoDiv.classList.add('infoDiv_none');
        mainUl.append(li);
        li.append(infoDiv);
        // добавление информации к диву
        fetch(data.results[index].url).then(res => res.json()).then(data => infoDiv.innerHTML += `<img src="${data.sprites.front_default}" alt=""> <p>рост: ${data.height}</p> <p>вес: ${data.weight}</p> <p>тип: ${data.types[0].type.name}</p>`);

        // при клике по li появляется информационный див, если еще раз кликнуть на li див обратно скроется
        li.addEventListener('click', (e) => {
            // toggle позволяет убирать и добавлять infoDiv при клике на li
            infoDiv.classList.toggle('infoDiv_none');
            infoDiv.classList.toggle('infoDiv');
        })
    });
  });
}

createUl(API);

async function poginationNext() {
        fetch(API).then((res) => res.json()).
        then((data) => {
            API = data.next;
            createUl(API);
        });
    
    }

async function poginationPrevios() {
    fetch(API).then((res) => res.json()).
    then((data) => {
        if (!data.previous) {
            return;
        }
        API = data.previous;
        createUl(API);
    });
}

nextBtn.addEventListener('click', poginationNext);
previos.addEventListener('click', poginationPrevios);


// При клике на имя покемона, показать рядом (в соседнем div-е) или во всплывающем
// окне информацию об этом покемоне, например:

// Имя: Charmeleon
// Тип: fire
// Рост: 11
// Вес: 190
// Изображение покемона (дополнительно)

// Указания:
// Список покемонов (первые 20 штук) получить через запрос к API:
// https://pokeapi.co/api/v2/pokemon
// Информацию о каждом покемоне получать через запрос к API:
// https://pokeapi.co/api/v2/pokemon/{id}/
// где {id} - номер покемона
// Подсказка об используемых ключах результата
// (предположим что полученный объект у вас лежит в переменной result)
// Изображение: result.sprites.front_default
// Имя: result.name
// Тип: массив result.types. Из каждого элемента массива можно взять только type.name
// Рост: result.height
// Вес: result.weight

// Дополнительно:
// Используя ссылку на следующую страницу в результате (ссылку на API следующих
// результатов) реализовать пагинацию (постраничный вывод) в программе, т.е.:
// На клик по ссылке “Next” делать запрос на следующие 20 штук, заменять текущий список.
// Реализовать “Previous” и “Next” - возможность возвращаться на страницу ранее


