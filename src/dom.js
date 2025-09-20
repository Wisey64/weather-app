import { fetchWeather } from "./api";
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
let weatherdata;
searchBtn.addEventListener("click", () => {
    const userinput = cityInput.value;
    fetchWeather(userinput)
    .then(data => {
        weatherdata = data;
        console.log(weatherdata);
        updateWeather(weatherdata);
})
    .catch(error => console.error('Error fetching weather data:', error));
    
    
});
function updateWeather(data) {
    const cityh2 = document.querySelector('.city');
    const date = document.querySelector('.datep');
    const country = document.querySelector('.country');
    const sunrise = document.querySelector('.sunrise');
    const sunset = document.querySelector('.sunset');
    const temp = document.querySelector('.tempnum');
    const feelslike = document.querySelector('.feelslike');
    const condition = document.querySelector('.conditiontext');
    const humidity = document.querySelector('.humidity');
    const icon = document.querySelector('.icon');
    const wind = document.querySelector('.wind');
    const visibility = document.querySelector('.visibility');

    cityh2.textContent = data.address;
    //maybe change the date to a more readable format
    date.textContent = data.days[0].datetime;
    //the api does not provide country data, left blank for now
    //country.textContent = data.country;
    sunrise.textContent = `Sunrise: ${data.days[0].sunrise}`;
    sunset.textContent = `Sunset: ${data.days[0].sunset}`;
    temp.textContent = `${data.days[0].temp}°C`;
    feelslike.textContent = `Feels like: ${data.days[0].feelslike}°C`;
    condition.textContent = data.days[0].conditions;
    humidity.textContent = `Humidity: ${data.days[0].humidity}%`;
    icon.src = `https://cdn.weatherapi.com/weather/64x64/day/${data.days[0].icon}.png`;
    wind.textContent = `Wind: ${data.days[0].windspeed} km/h`;
    visibility.textContent = `Visibility: ${data.days[0].visibility} km`;
    


}
