const button = document.getElementById("btn1");
const select = document.getElementById("slct1");
const p_error = document.getElementById("p1");

p_error.textContent = "";
let lat = null;
let lon = null;
let data = [];

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

function userSelect() {
    console.log("Кнопка нажата");
    
    let user_choice = select.value;
    
    if (user_choice === "") {
        p_error.textContent = "Город не выбран";
        return;
    }

    console.log(user_choice);
    for (const city of data) {
        if (city.name === user_choice) {
            console.log("Город найден");
            p_error.textContent = "";
            
            lat = city.lat;
            lon = city.lon;
            
            const p = document.createElement("p");
            const p2 = document.createElement("p");
            
            p.textContent = lat;
            p2.textContent = lon;
            
            document.body.appendChild(p);
            document.body.appendChild(p2);
            break;
        }
    }
}

createOption();

button.addEventListener("click", userSelect)
