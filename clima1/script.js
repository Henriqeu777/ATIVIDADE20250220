const weatherApiKey = "af7e3f17809ce951167ee4aca3cabb92"; 
const geoApiKey = "eda7c9f5330442f794bb10db6e548639"; 

function getWeatherByCity() {
    const city = document.getElementById("city-input").value.trim();

    if (city === "") {
        alert("Por favor, insira o nome de uma cidade.");
        return;
    }
    const urlClima = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${weatherApiKey}`;

    // Chamada para OpenWeatherMap (obter latitude e longitude)
    fetch(urlClima)
        .then(response => {
            if (!response.ok) {
                throw new Error("Cidade não encontrada.");
            }
            return response.json();
        })
        .then(data => {
            const lat = data.coord.lat;
            const lon = data.coord.lon;

            // Exibe informações de clima
            document.getElementById("city-name").innerText = `${data.name}, ${data.sys.country}`;
            document.getElementById("temperature").innerText = data.main.temp;
            document.getElementById("weather").innerText = data.weather[0].description;
            document.getElementById("humidity").innerText = data.main.humidity;
            document.getElementById("wind-speed").innerText = (data.wind.speed * 3.6).toFixed(2); // Convertendo m/s para km/h
            document.getElementById("latitude").innerText = lat;
            document.getElementById("longitude").innerText = lon;

            // Agora busca mais detalhes de localização na API OpenCage
            return fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${geoApiKey}&language=pt`);
        })
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const details = data.results[0].components;
                document.getElementById("state").innerText = details.state || "Não disponível";
                document.getElementById("postal-code").innerText = details.postcode || "Não disponível";
            }

            document.getElementById("info-clima").classList.remove("d-none");
        })
        .catch(error => {
            alert(error.message);
        });
}