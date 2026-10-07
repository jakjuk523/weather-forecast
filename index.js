const button = document.getElementById("btn1");

async function getCityesApi() {
    try {
        const response = await fetch("cityes.json");
        const data = await response.json();
        
        const p = document.createElement("p");
        document.body.appendChild(p);
        p.textContent = data;
        p.style.margin = "0";
        p.textContent = JSON.stringify(data, null, 2); 
    } catch (error) {
        const p = document.createElement("p");
        document.body.appendChild(p);
        p.textContent = "ERROR";
        p.style.margin = "0";
    }
}

button.addEventListener("click", getCityesApi);