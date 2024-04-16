const apiKey = '51c128416175dd7a68f9ad51b5608ac6';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
const timezoneApiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric';

const mainCardElement = document.querySelector('.card');

const searchBoxElement = document.querySelector('.search input[type=text]');
const searchBtnElement = document.querySelector('.search button');
const weatherIconElement = document.querySelector('.weather-icon');
const errorDivElement = document.querySelector('.error');
const weatherDivElement = document.querySelector('.weather');

async function getWeather(city) {
    try {
        const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);

        if (response.status === 404) {
            errorDivElement.style.display = 'block';
            weatherDivElement.style.display = 'none';
            throw new Error();
        }

        const data = await response.json();

        switch (data.weather[0].main) {
            case 'Clear':
                weatherIconElement.src = 'images/clear.png';
                mainCardElement.style.background = 'var(--clr-sunny)';
                break;
            case 'Clouds':
                weatherIconElement.src = 'images/clouds.png';
                mainCardElement.style.background = 'var(--clr-sunny)';
                break;
            case 'Drizzle':
                weatherIconElement.src = 'images/drizzle.png';
                mainCardElement.style.background = 'var(--clr-cloudy)';
                break;
            case 'Mist':
                weatherIconElement.src = 'images/mist.png';
                mainCardElement.style.background = 'var(--clr-cloudy)';
                break;
            case 'Rain':
                weatherIconElement.src = 'images/rain.png';
                mainCardElement.style.background = 'var(--clr-rainy)';
                break;
            case 'Snow':
                weatherIconElement.src = 'images/snow.png';
                mainCardElement.style.background = 'var(--clr-rainy)';
                break;
            default:
                break;
        }

        const timezoneResponse = await fetch(`${timezoneApiUrl}&lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`);
        const timezoneData = await timezoneResponse.json();

        const localTime = new Date((data.dt + timezoneData.timezone) * 1000);
        const sunriseTime = new Date(data.sys.sunrise * 1000);
        const sunsetTime = new Date(data.sys.sunset * 1000);

        const isNight = localTime > sunsetTime || localTime < sunriseTime;

        if (isNight) {
            mainCardElement.style.background = 'var(--clr-night)'; 
        }

        const cityH2Element = document.querySelector('.city');
        const descriptionElement = document.querySelector('.description');
        const temperatureH1Element = document.querySelector('.temperature');
        const feelsLikePElement = document.querySelector('.feels-like');
        const humidtyPElement = document.querySelector('.humidity');
        const windPElement = document.querySelector('.wind');

        cityH2Element.textContent = data.name;
        descriptionElement.textContent = data.weather[0].description;
        temperatureH1Element.textContent = Math.round(data.main.temp) + '°C';
        feelsLikePElement.textContent = `Feels like: ${Math.round(data.main.feels_like)} °C`
        humidtyPElement.textContent = data.main.humidity + ' %';
        windPElement.textContent = data.wind.speed + ' km/h';

        weatherDivElement.style.display = 'block';

        if (data.wind.speed > 50) {
            windPElement.textContent += ' !!!';
            windPElement.style.color = '#ff0000';
            windPElement.style.fontWeight = 'bold';
        }

        if (data.main.temp > 28) {
            temperatureH1Element.style.color = '#ff0000';
        } else if (data.main.temp < 0) {
            temperatureH1Element.style.color = '#0000ff';
        }
    } catch (err) {
        console.error(err);
    }
}

searchBtnElement.addEventListener('click', () => {
    getWeather(searchBoxElement.value);
});