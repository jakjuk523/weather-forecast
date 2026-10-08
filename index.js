const button = document.getElementById("btn1");
const select = document.getElementById("select1");
const p_error = document.getElementById("p1");

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
    const data = await getCityesApi();
    
    if (data) {
        for (const city of data.name) {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            select.appendChild(option);
        }
    }
}

createOption()