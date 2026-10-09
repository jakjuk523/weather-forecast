const weather = document.getElementById("dv1");
const button = document.getElementById("btn1");
const button2 = document.getElementById("btn2");
const select = document.getElementById("slct1");
const search_city = document.getElementById("npt1");
const p_error = document.getElementById("p1");
const p_time = document.getElementById("p2");
const p_city = document.getElementById("p3");
const p_temperature = document.getElementById("p4");
const p_appTemp = document.getElementById("p5");
const p_relative = document.getElementById("p6");
const p_speed = document.getElementById("p7");
const p_cloud = document.getElementById("p8");
const p_error2 = document.getElementById("p9");

p_error.textContent = "";
let lat = null;
let lon = null;
let data = [];
let apiUrl = null;

async function getCityesApi() {
    try {
        const response = await fetch("cityes.json");
        const data = await response.json();
        return data;
    } catch (error) {
        p_error.textContent = "Ошибка";
    }
}

async function createOption() {
    data = await getCityesApi();
    
    if (data) {
        select.innerHTML = "<option value=''>Не выбрано</option>";
        
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
        const time = data.current.time.split("T")[1];
        let apparent = data.current.apparent_temperature;
        let relative = data.current.relative_humidity_2m;
        let speed = data.current.wind_speed_10m;
        let cloud = data.current.cloud_cover;
        
        p_time.textContent = `Последнее обновление данных: ${time}`;
        p_temperature.textContent = `Температура: ${temperature}°C`;
        p_appTemp.textContent = `Ощущается как: ${apparent}°C`;
        p_relative.textContent = `Влажность: ${relative}%`;
        p_speed.textContent = `Скорость ветра: ${speed} км/ч`;
        p_cloud.textContent = `Облачность: ${cloud}%`;
        p_error2.textContent = "";
        p_error.textContent = "";
        
        weather.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


        weather.style.display = "flex";
        weather.classList.add("div1_style");
        
    } catch (error) {
        p_error.textContent = "Ошибка";
        p_time.textContent = "";
        p_city.textContent = "";
        p_temperature.textContent = "";
        p_appTemp.textContent = "";
        p_relative.textContent = "";
        p_speed.textContent = "";
        p_cloud.textContent = "";
        weather.style.display = "none";
        p_error2.classList.add("p1_style");
        p_error2.textContent = "Ошибка загрузки данных";
    }
}

function userSelect() { 
    let user_search = search_city.value.trim().toLowerCase();
    let user_choice = select.value.toLowerCase();
    
    if (user_search === "" && user_choice === "") {
        p_error.textContent = "Заполните одно из полей";
        return
    }
    
    if (user_search != "") {
        
        let cityFound = false;
        
        for (const city of data) {
            
            if (user_search === city.name.toLowerCase()) {
                p_error.textContent = "";
                lat = city.lat;
                lon = city.lon;
                apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,cloud_cover&hourly=temperature_2m&timezone=auto`;
                cityFound = true;
                p_city.textContent = `Город: ${city.name}`;
                break;
            }
        }
        
        if (cityFound === false) {
            p_error.textContent = "Город не найден";
            return;
        }
        openMeteo();
    } else {
        
        let cityFound = false;
        
        for (const city of data) {
            
            if (user_choice === city.name.toLowerCase()) {
                p_error.textContent = "";
                lat = city.lat;
                lon = city.lon;
                apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,cloud_cover&hourly=temperature_2m&timezone=auto`;
                cityFound = true;
                p_city.textContent = `Город: ${city.name}`;
                break;
            }
        }
        
        if (cityFound === false) {
            p_error.textContent = "Город не найден";
            return;
        }
        openMeteo();
    }
}
    
createOption();

button.addEventListener("click", userSelect);
button2.addEventListener("click", openMeteo);