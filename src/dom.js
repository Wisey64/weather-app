import { fetchWeather } from "./api";
import rainIcon from './assets/rain.svg';
import cloudyDayIcon from './assets/cloudy.svg';
import cleardayIcon from './assets/clear-day.svg';
import fogIcon from './assets/fog.svg';
import hailIcon from './assets/hail.svg';
import partlyCloudyDayIcon from './assets/partly-cloudy-day.svg';
import rainsnowIcon from './assets/rain-snow.svg';
import showersIcon from './assets/showers-day.svg';
import sleeticon from './assets/sleet.svg';
import snowIcon from './assets/snow.svg';
import thunderrainIcon from './assets/thunder-rain.svg';
import thundericon from './assets/thunder.svg';
import windIcon from './assets/wind.svg';

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
    wind.textContent = `Wind: ${data.days[0].windspeed} km/h`;
    visibility.textContent = `Visibility: ${data.days[0].visibility} km`;
    //check the the condition to set the icon
    function getIcon() {
        if (data.days[0].icon === "rain") {
            icon.src = rainIcon;
        } else if (data.days[0].icon === "partly-cloudy-day") {
            icon.src = partlyCloudyDayIcon;
        } else if (data.days[0].icon === "clear-day") {
            icon.src = cleardayIcon;
        } else if (data.days[0].icon === "fog") {
            icon.src = fogIcon;
        } else if (data.days[0].icon === "hail") {
            icon.src = hailIcon;
        } else if (data.days[0].icon === "rain-snow") {
            icon.src = rainsnowIcon;
        } else if (data.days[0].icon === "showers-day") {
            icon.src = showersIcon;
        } else if (data.days[0].icon === "sleet") {
            icon.src = sleeticon;
        } else if (data.days[0].icon === "snow") {
            icon.src = snowIcon;
        } else if (data.days[0].icon === "thunder-rain") {
            icon.src = thunderrainIcon;
        } else if (data.days[0].icon === "thunder") {
            icon.src = thundericon;
        } else if (data.days[0].icon === "wind") {
            icon.src = windIcon;
        } else if (data.days[0].icon === "cloudy") {
            icon.src = cloudyDayIcon;
        } else {
            icon.src = cleardayIcon; //default icon
        }
         
         
    }
    getIcon()
}
