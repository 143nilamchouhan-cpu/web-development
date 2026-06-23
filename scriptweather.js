const API_KEY = "52601b3851aca594635af61cf1b2a216";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const description = document.getElementById("description");

const weatherCard = document.getElementById("weatherCard");
const errorMessage = document.getElementById("errorMessage");

async function getWeather(city) {
    try {
        errorMessage.textContent = "";
        weatherCard.style.display = "none";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();

        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `🌡 Temperature: ${data.main.temp} °C`;
        humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
        wind.textContent = `🌬 Wind Speed: ${data.wind.speed} m/s`;
        description.textContent = `☁ Weather: ${data.weather[0].description}`;

        weatherCard.style.display = "block";

    } catch (error) {
        errorMessage.textContent = error.message;
        console.error(error);
    }
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (!city) {
        errorMessage.textContent = "Please enter a city name";
        return;
    }

    getWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getWeather(cityInput.value.trim());
    }
});