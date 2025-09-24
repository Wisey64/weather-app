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
import clearnightIcon from './assets/clear-night.svg';
import partlyCloudyNightIcon from './assets/partly-cloudy-night.svg';


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
    const sunriseicon = document.createElement('img');
    
    //sunriseicon.classList.add('sunriseicon');
    //const sun = document.querySelector('.sun');
    //sun.prepend(sunriseicon);
    //sunriseicon.src = sunrise;

    sunset.textContent = `Sunset: ${data.days[0].sunset}`;
    temp.textContent = `${data.days[0].temp}°`;
    feelslike.textContent = `Feels like: ${data.days[0].feelslike}°C`;
    condition.textContent = data.days[0].conditions;
    humidity.textContent = `Humidity: ${data.days[0].humidity}%`;
    wind.textContent = `Wind: ${data.days[0].windspeed} km/h`;
    visibility.textContent = `Visibility: ${data.days[0].visibility} km`;

    //an object to map the icon strings to the imported svg files
    const iconMap = {
        "rain": rainIcon,
        "partly-cloudy-day": partlyCloudyDayIcon,
        "clear-day": cleardayIcon,
        "fog": fogIcon,
        "hail": hailIcon,
        "rain-snow": rainsnowIcon,
        "showers-day": showersIcon,
        "sleet": sleeticon,
        "snow": snowIcon,
        "thunder-rain": thunderrainIcon,
        "thunder": thundericon,
        "wind": windIcon,
        "cloudy": cloudyDayIcon
        ,"clear-night": clearnightIcon
        ,"partly-cloudy-night": partlyCloudyNightIcon
      };

    //function to set the icon based on the icon string from the api
    function getIcon(element) {
          const iconKey = data.days[0].icon;      
          element.src = iconMap[iconKey]
    }
    getIcon(icon);
    //filter the hourly data to get only the next 6 hours
    function filterHourlyData(hourlyData) {
        // Get the current hour
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        
        return hourlyData.filter(hour => {
            const hourTime = parseInt(hour.datetime.split(':')[0]); // Extract hour from API data
            return hourTime >= currentHour && hourTime < currentHour + 6;
        });
    }
    function updateHourly(data) {
        const hoursContainer = document.querySelector('.middlehours');
        hoursContainer.innerHTML = '';

        const hourData = filterHourlyData(data.days[0].hours);
        console.log(hourData);

        hourData.forEach(hour => {
            const hourDiv = document.createElement('div');
            hourDiv.classList.add('hour');
            hoursContainer.appendChild(hourDiv);

            const timeP = document.createElement('p');
            timeP.classList.add('timep');
            timeP.textContent = hour.datetime;
            hourDiv.appendChild(timeP);
            const iconImg = document.createElement('img');
            iconImg.classList.add('houricon');
            hourDiv.appendChild(iconImg);
            function gethourIcon(element) {
          const houriconKey = hour.icon
          element.src = iconMap[houriconKey]  
    }
            gethourIcon(iconImg);
            const conditionP = document.createElement('p');
            conditionP.classList.add('conditionp');
            conditionP.textContent = hour.conditions;
            hourDiv.appendChild(conditionP);
            const tempP = document.createElement('p');
            tempP.classList.add('temphour');
            tempP.textContent = `${hour.temp}°`;
            hourDiv.appendChild(tempP);
            const windP = document.createElement('p');
            windP.classList.add('windhour');
            windP.textContent = `Wind: ${hour.windspeed} km/h`;
            hourDiv.appendChild(windP);

            
        });
    }
    updateHourly(data);
}
