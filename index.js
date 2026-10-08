/* ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ */

const button = document.getElementById("btn1");
const button2 = document.getElementById("btn2");
const select = document.getElementById("slct1");
const p_error = document.getElementById("p1");
const p_time = document.getElementById("p2");
const p_temperature = document.getElementById("p3");


/* ПЕРЕМЕННЫЕ */

p_error.textContent = "";

let lat = null;
let lon = null;

let data = [];

let apiUrl = null;


/* ЗАГРУЗКА СПИСКА ГОРОДОВ ИЗ JSON */

async function getCityesApi() {

    try {

        const response = await fetch("cityes.json");

        const data = await response.json();

        return data;

    } catch (error) {

        p_error.textContent = "Ошибка";

    }
}


/* СОЗДАНИЕ OPTION ДЛЯ SELECT */

async function createOption() {

    data = await getCityesApi();

    if (data) {

        select.innerHTML = "<option value=''>Не выбрано</option>";

        /* ПЕРЕБОР ВСЕХ ГОРОДОВ И СОЗДАНИЕ OPTION */

        for (const city of data) {

            const option = document.createElement("option");

            option.value = city.name;
            option.textContent = city.name;

            select.appendChild(option);
        }

    } else {

        p_error.textContent = "Ошибка";

    }
}


/* ПОЛУЧЕНИЕ ВЫБРАННОГО ГОРОДА */

function userSelect() {

    let user_choice = select.value;

    if (user_choice === "") {

        p_error.textContent = "Город не выбран";

        return;
    }

    /* ПОИСК ВЫБРАННОГО ГОРОДА В МАССИВЕ JSON */

    for (const city of data) {

        if (city.name === user_choice) {

            p_error.textContent = "";

            lat = city.lat;
            lon = city.lon;

            /* СОЗДАНИЕ URL ДЛЯ API ПОГОДЫ */

            apiUrl =
`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m`;

            break;
        }
    }
}


/* ПОЛУЧЕНИЕ ПОГОДЫ ИЗ OPEN-METEO */

async function openMeteo() {

    try {

        if (!apiUrl) {

            p_error.textContent = "Город не выбран";

            return;
        }

        const response = await fetch(apiUrl);

        if (!response.ok) {

            throw new Error();

        }

        const data = await response.json();

        const temperature = data.current.temperature_2m;
        const time = data.current.time;

        p_time.textContent = time;
        p_temperature.textContent = temperature;

        p_error.textContent = "";

    } catch (error) {

        p_error.textContent = "Ошибка";

    }
}


/* ПЕРВОНАЧАЛЬНАЯ ЗАГРУЗКА ГОРОДОВ */

createOption();


/* СОБЫТИЯ КНОПОК */

button.addEventListener("click", userSelect);

button2.addEventListener("click", openMeteo);