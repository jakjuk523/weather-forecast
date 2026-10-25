
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
const p_coordinates = document.getElementById("p18");

const buttonDays_style = document.querySelectorAll(".buttonDays_style");

const buttons = [
    document.getElementById("btn3"),
    document.getElementById("btn4"),
    document.getElementById("btn5"),
    document.getElementById("btn6"),
    document.getElementById("btn7"),
    document.getElementById("btn8"),
    document.getElementById("btn9")
];

let lat = null;
let lon = null;
let cityesData = [];
let weatherData = null;
let apiUrl = null;
let selectedDay = 0;
let codsWet = null;

p_error.textContent = "";
weather.style.display = "none";

buttonDays_style.forEach((dayButton, index) => {
    dayButton.addEventListener("click", () => {
        buttonDays_style.forEach(item => {
            item.classList.remove("active");
        });

        dayButton.classList.add("active");

        if (weatherData) {
            selectedDay = index;
            whatDay(selectedDay, weatherData);
        }
    });
});

// Названия дней прогноза
function updateDaysButtons() {
    const dayNames = ["Сегодня", "Завтра", "Послезавтра"];
    const today = new Date();

    buttons.forEach((dayButton, index) => {
        if (!dayButton) return;

        if (index < 3) {
            dayButton.textContent = dayNames[index];
        } else {
            const date = new Date(today);
            date.setDate(today.getDate() + index);

            dayButton.textContent = new Intl.DateTimeFormat("ru-RU", {
                day: "numeric",
                month: "long"
            }).format(date);
        }
    });
}

updateDaysButtons();

// Загрузка списка городов
async function getCityesApi() {
    try {
        const response = await fetch("./cityes.json");

        if (!response.ok) {
            throw new Error(`Не удалось загрузить cityes.json: HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("cityes.json должен содержать массив городов");
        }

        return data;
    } catch (error) {
        console.error("Ошибка загрузки городов:", error);
        p_error.textContent = "Ошибка загрузки списка городов";
        return null;
    }
}

// Загрузка необязательного файла описаний погоды
async function getWeatherCodsApi() {
    try {
        const response = await fetch("./cods.json");

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.warn("cods.json недоступен, используются встроенные описания:", error);
        return null;
    }
}

// Описания погодных условий по кодам WMO
function getWeatherDescription(code) {
    const descriptions = {
        0: "Ясно",
        1: "Преимущественно ясно",
        2: "Переменная облачность",
        3: "Пасмурно",
        45: "Туман",
        48: "Туман с изморозью",
        51: "Слабая морось",
        53: "Умеренная морось",
        55: "Сильная морось",
        56: "Слабая ледяная морось",
        57: "Сильная ледяная морось",
        61: "Небольшой дождь",
        63: "Умеренный дождь",
        65: "Сильный дождь",
        66: "Слабый ледяной дождь",
        67: "Сильный ледяной дождь",
        71: "Небольшой снег",
        73: "Умеренный снег",
        75: "Сильный снег",
        77: "Снежная крупа",
        80: "Небольшие ливни",
        81: "Умеренные ливни",
        82: "Сильные ливни",
        85: "Слабый снегопад",
        86: "Сильный снегопад",
        95: "Гроза",
        96: "Гроза с небольшим градом",
        99: "Гроза с сильным градом"
    };

    return descriptions[code] ?? `Неизвестный код погоды: ${code}`;
}

// Если cods.json содержит описание для кода, используем его.
// Иначе используем встроенный словарь.
function getWeatherDescriptionFromFile(code) {
    if (codsWet) {
        if (Array.isArray(codsWet) && codsWet[code] != null) {
            return codsWet[code];
        }

        if (!Array.isArray(codsWet) && codsWet[code] != null) {
            const item = codsWet[code];

            if (typeof item === "string") return item;
            if (item.description) return item.description;
            if (item.name) return item.name;
        }
    }

    return getWeatherDescription(code);
}

// Среднее значение показателя за выбранный день
function getDailyAverage(hourly, field, date) {
    if (!hourly?.time || !hourly[field]) {
        return null;
    }

    const values = [];

    hourly.time.forEach((time, index) => {
        if (time.startsWith(date)) {
            const value = hourly[field][index];

            if (typeof value === "number" && Number.isFinite(value)) {
                values.push(value);
            }
        }
    });

    if (values.length === 0) {
        return null;
    }

    return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function formatNumber(value, digits = 1) {
    if (value == null || !Number.isFinite(value)) {
        return "нет данных";
    }

    return Number(value.toFixed(digits)).toLocaleString("ru-RU");
}

function formatTime(value) {
    if (!value) return "нет данных";
    return value.split("T")[1] ?? value;
}

// Отображение прогноза на выбранный день
function whatDay(day, data) {
    if (!data?.daily?.time || !data.daily.time[day]) {
        p_error.textContent = "Нет данных для выбранного дня";
        return;
    }

    const date = data.daily.time[day];
    const dateObject = new Date(`${date}T12:00:00`);

    const formattedDate = new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(dateObject);

    const temperature = getDailyAverage(
        data.hourly,
        "temperature_2m",
        date
    );

    const minTemp = data.daily.temperature_2m_min?.[day];
    const maxTemp = data.daily.temperature_2m_max?.[day];

    const apparentMin = data.daily.apparent_temperature_min?.[day];
    const apparentMax = data.daily.apparent_temperature_max?.[day];

    const relative = getDailyAverage(
        data.hourly,
        "relative_humidity_2m",
        date
    );

    const cloud = getDailyAverage(
        data.hourly,
        "cloud_cover",
        date
    );

    const speed = data.daily.wind_speed_10m_max?.[day];
    const windDirection = data.daily.wind_direction_10m_dominant?.[day];
    const precipitation = data.daily.precipitation_sum?.[day];
    const sunrise = data.daily.sunrise?.[day];
    const sunset = data.daily.sunset?.[day];
    const weatherCode = data.daily.weather_code?.[day];

    p_date.textContent = `Дата: ${formattedDate}`;

    p_time.textContent =
        `Время текущих погодных данных: ${formatTime(data.current?.time)}`;

    p_temperature.textContent =
        `Средняя температура за день: ${formatNumber(temperature)}°C`;

    p_maxMinTemp.textContent =
        `Диапазон температур: ${formatNumber(minTemp)}°C — ${formatNumber(maxTemp)}°C`;

    p_speed.textContent =
        `Максимальная скорость ветра за день: ${formatNumber(speed)} км/ч`;

    p_cloud.textContent =
        `Средняя облачность: ${formatNumber(cloud, 0)}%`;

    p_windDirection.textContent =
        `Направление ветра: ${formatNumber(windDirection, 0)}°`;

    p_precipitation.textContent =
        `Осадки: ${formatNumber(precipitation)} мм`;

    p_sunrise.textContent =
        `Восход солнца: ${formatTime(sunrise)}`;

    p_sunset.textContent =
        `Закат солнца: ${formatTime(sunset)}`;

    p_apparentMinMax.textContent =
        `Ощущаемая температура: ${formatNumber(apparentMin)}°C — ${formatNumber(apparentMax)}°C`;

    p_dailyHumidity.textContent =
        `Средняя влажность за день: ${formatNumber(relative, 0)}%`;

    p_weather.textContent =
        getWeatherDescriptionFromFile(weatherCode);

    p_error.textContent = "";
    p_error2.textContent = "";
    p_error2.classList.remove("p1_style");
}

// Загрузка прогноза погоды
async function openMeteo() {
    if (!apiUrl) {
        p_error.textContent = "Сначала выберите город";
        return;
    }

    p_error.textContent = "Загрузка прогноза...";
    p_error2.textContent = "";

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);

            throw new Error(
                errorData?.reason ||
                `Ошибка API: HTTP ${response.status}`
            );
        }

        const data = await response.json();

        if (!data.daily?.time || !data.hourly?.time) {
            throw new Error("API не вернул данные прогноза");
        }

        weatherData = data;

        // Необязательный файл: отсутствие файла не мешает прогнозу
        if (codsWet === null) {
            codsWet = await getWeatherCodsApi();
        }

        selectedDay = Math.min(selectedDay, data.daily.time.length - 1);

        updateDaysButtons();

        buttons.forEach(dayButton => {
            if (dayButton) dayButton.style.display = "flex";
        });

        weather.style.display = "flex";
        weather.classList.add("div1_style");

        whatDay(selectedDay, weatherData);

        weather.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    } catch (error) {
        console.error("Ошибка загрузки погоды:", error);

        p_error.textContent = "Не удалось загрузить прогноз";

        p_error2.classList.add("p1_style");
        p_error2.textContent = error.message || "Ошибка загрузки данных";

        weatherData = null;
        weather.style.display = "none";

        buttons.forEach(dayButton => {
            if (dayButton) dayButton.style.display = "none";
        });
    }
}

// Поиск города
function userSelect() {
    const userSearch = search_city.value.trim().toLocaleLowerCase("ru-RU");

    if (!userSearch) {
        p_error.textContent = "Введите название города";
        return;
    }

    if (!cityesData.length) {
        p_error.textContent = "Список городов ещё загружается";
        return;
    }

    const city = cityesData.find(item =>
        item.name?.trim().toLocaleLowerCase("ru-RU") === userSearch
    );

    if (!city) {
        p_error.textContent = "Город не найден";
        return;
    }

    lat = Number(city.lat);
    lon = Number(city.lon);

    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
        p_error.textContent = "Некорректные координаты города";
        return;
    }

    p_error.textContent = "";

    p_city.textContent = `${city.status ? city.status + ": " : ""}${city.name}`;
    p_coordinates.textContent = `Широта: ${lat}, Долгота: ${lon}`;

    apiUrl =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${lat}` +
        `&longitude=${lon}` +
        `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,cloud_cover` +
        `&hourly=temperature_2m,relative_humidity_2m,cloud_cover` +
        `&daily=weather_code,temperature_2m_min,temperature_2m_max,apparent_temperature_min,apparent_temperature_max,wind_speed_10m_max,wind_direction_10m_dominant,precipitation_sum,sunrise,sunset` +
        `&timezone=auto&forecast_days=7`;

    selectedDay = 0;

    buttonDays_style.forEach(item => item.classList.remove("active"));
    buttons[0]?.classList.add("active");

    openMeteo();
}

// Начальная загрузка
async function loadCityes() {
    const data = await getCityesApi();

    if (data) {
        cityesData = data;
    }
}

// Обработчики событий
button.addEventListener("click", userSelect);

button2.addEventListener("click", () => {
    if (apiUrl) {
        openMeteo();
    } else {
        userSelect();
    }
});

loadCityes();
