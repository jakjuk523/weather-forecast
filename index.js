const weather = document.getElementById("dv1");
const button = document.getElementById("btn1");
const button2 = document.getElementById("btn2");
const search_city = document.getElementById("npt1");
const p_error = document.getElementById("p1");
const p_time = document.getElementById("p2");
const p_city = document.getElementById("p3");
const p_temperature = document.getElementById("p4");
const p_date = document.getElementById("p5");
const p_relative = document.getElementById("p6");
const p_speed = document.getElementById("p7");
const p_cloud = document.getElementById("p8");
const p_error2 = document.getElementById("p9");
const p_maxMinTemp = document.getElementById("p10");
const p_weather = document.getElementById("p11");
const p_windDirection = document.getElementById("p12");
const p_precipitation = document.getElementById("p13");
const p_sunrise = document.getElementById("p14");
const p_sunset = document.getElementById("p15");
const p_apparentMinMax = document.getElementById("p16");
const p_dailyHumidity = document.getElementById("p17");
const p_сoordinats = document.getElementById("p18");

const buttonToday = document.getElementById("btn3");
const buttonTomorrow = document.getElementById("btn4");
const buttonOvermorrow = document.getElementById("btn5");
const buttonDays_style = document.querySelectorAll(".buttonDays_style");

buttonDays_style.forEach(button => {
    button.addEventListener("click", () => {
        buttonDays_style.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");
    });
});

// Выбираем сегодняшний день при загрузке страницы
document.getElementById("btn3").click();


p_error.textContent = "";

let lat = null;
let lon = null;
let cityesData = [];
let weatherData = null;
let apiUrl = null;
let selectedDay = 0;

async function getCityesApi() {
    try {
        const response = await fetch("cityes.json");
        const data = await response.json();
        return data;
    } catch (error) {
        p_error.textContent = "Ошибка";
    }
}


function whatDay(selectedDay, weatherData) {
    
    const time = weatherData.current.time.split("T")[1];
    const date = weatherData.daily.time[selectedDay];
    const weatherCode = weatherData.daily.weather_code[selectedDay];
    
    const temperature = weatherData.daily.temperature_2m_mean[selectedDay];
    const min_temp = weatherData.daily.temperature_2m_min[selectedDay];
    const max_temp = weatherData.daily.temperature_2m_max[selectedDay];
    
    const apparentMin = weatherData.daily.apparent_temperature_min[selectedDay];
    const apparentMax = weatherData.daily.apparent_temperature_max[selectedDay];
    
    const relative = weatherData.daily.relative_humidity_2m_mean[selectedDay];
    const speed = weatherData.daily.wind_speed_10m_max[selectedDay];
    const windDirection = weatherData.daily.wind_direction_10m_dominant[selectedDay];
    const cloud = weatherData.daily.cloud_cover_mean[selectedDay];
    
    const precipitation = weatherData.daily.precipitation_sum[selectedDay];
    const sunrise = weatherData.daily.sunrise[selectedDay].split("T")[1];
    const sunset = weatherData.daily.sunset[selectedDay].split("T")[1];
    
    p_date.textContent = `Дата: ${date}`
    p_time.textContent = `Время текущих погодных данных: ${time}`;
    p_temperature.textContent = `средняя температура за день: ${temperature}°C`;
    p_maxMinTemp.textContent = `Диапозон: ${min_temp}°C - ${max_temp}°C`;
    p_speed.textContent = `Максимальная скорость ветра за день: ${speed} км/ч`;
    p_cloud.textContent = `Облачность: ${cloud}%`;
    p_weather.textContent = `Код погоды: ${weatherCode}`;
    p_windDirection.textContent = `Направление ветра: ${windDirection}°`;
    p_precipitation.textContent = `Осадки: ${precipitation} мм`;
    p_sunrise.textContent = `Восход солнца: ${sunrise}`;
    p_sunset.textContent = `Закат солнца: ${sunset}`;
    p_apparentMinMax.textContent = `Ощущаемая температура: ${apparentMin}°C — ${apparentMax}°C`;
    p_dailyHumidity.textContent = `Средняя влажность за день: ${relative}%`;
    p_error2.textContent = "";
    p_error2.classList.remove("p1_style");
    p_error.textContent = "";
}

function weatherToday() {
    if (!weatherData) return;
    
    selectedDay = 0;
    whatDay(selectedDay, weatherData);
}

function weatherTomorrow() {
    if (!weatherData) return;
    
    selectedDay = 1;
    whatDay(selectedDay, weatherData);
}

function weatherOvermorrow() {
    if (!weatherData) return;
    
    selectedDay = 2;
    whatDay(selectedDay, weatherData);
}


async function openMeteo() {
    try {
        if (!apiUrl) {
            p_error.textContent = "Город не выбран";
            return;
        }
        
        weatherData = null;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error();
        }
        
        weatherData = await response.json();

        whatDay(selectedDay, weatherData);
        
        weather.style.display = "flex";
        weather.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        weather.classList.add("div1_style");

    } catch (error) {
        p_date.textContent = "" ;
        p_time.textContent = "" ;
        p_temperature.textContent = "" ;
        p_maxMinTemp.textContent = "" ;
        p_relative.textContent = "" ;
        p_speed.textContent = "" ;
        p_cloud.textContent = "" ;
        p_weather.textContent = "" ;
        p_windDirection.textContent = "" ;
        p_precipitation.textContent = "" ;
        p_sunrise.textContent = "" ;
        p_sunset.textContent = "" ;
        p_apparentMinMax.textContent = "" ;
        p_dailyHumidity.textContent = "" ;
        
        
        p_error2.classList.add("p1_style");
        p_error2.textContent = "Ошибка загрузки данных";
        p_error.textContent = "Ошибка";
        weather.style.display = "none";
    }
}

function userSelect() {
    let user_search = search_city.value.trim().toLowerCase();

    if (user_search === "") {
        p_error.textContent = "Введите название города";
        return;
    }

    let cityFound = false;

    for (const city of cityesData) {
        if (user_search === city.name.toLowerCase()) {
            p_error.textContent = "";
            lat = city.lat;
            lon = city.lon;
            apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,cloud_cover&hourly=temperature_2m&daily=temperature_2m_mean,weather_code,temperature_2m_min,temperature_2m_max,apparent_temperature_min,apparent_temperature_max,relative_humidity_2m_mean,wind_speed_10m_max,wind_direction_10m_dominant,cloud_cover_mean,precipitation_sum,sunrise,sunset&timezone=auto`;
            cityFound = true;
            p_city.textContent = `${city.status}: ${city.name}`;
            p_сoordinats.textContent = `Долгота: ${city.lat}, Широта: ${city.lon}`;
            break;
        }
    }

    if (cityFound === false) {
        p_error.textContent = "Город не найден";
        return;
    }

    openMeteo();
}

async function loadCityes() {
    cityesData = await getCityesApi();

    if (!cityesData) {
        p_error.textContent = "Ошибка";
    }
}

loadCityes();

button.addEventListener("click", userSelect);
button2.addEventListener("click", openMeteo);
buttonToday.addEventListener("click", weatherToday);
buttonTomorrow.addEventListener("click", weatherTomorrow);
buttonOvermorrow.addEventListener("click", weatherOvermorrow);

