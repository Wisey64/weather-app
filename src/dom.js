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
import sunriseiconsvg from './assets/sunrise.svg';
import sunseticonsvg from './assets/sunset.svg';
import humidityiconsvg from './assets/humidity.svg';
import windiconsvg from './assets/cooling.svg';
import thermometericonsvg from './assets/thermometer.svg';
//global variables for DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
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
const unitbtn = document.querySelector('.unit');

let weatherdata;
//event listener for the search button to fetch weather data and update the DOM
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
//function to update the DOM with fetched weather data
function updateWeather(data) {
    cityh2.textContent = data.address;
    //maybe change the date to a more readable format
    date.textContent = data.days[0].datetime;
    //the api does not provide country data, left blank for now
    //country.textContent = data.country;

//update dom elements with weather data

    sunrise.textContent = use12hourFormat(data.days[0].sunrise)
    sunset.textContent = use12hourFormat(data.days[0].sunset);
    temp.textContent = `${data.days[0].temp}°`;
    feelslike.textContent = `Feels like: ${data.days[0].feelslike}°`;
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
        , "clear-night": clearnightIcon
        , "partly-cloudy-night": partlyCloudyNightIcon
    };

    //function to set the icon based on the icon string from the api
    function getIcon(element, data) {
        const iconKey = data.icon;
        element.src = iconMap[iconKey]
    }
    getIcon(icon,data.days[0]);

//update hourly forecast
    function updateHourly(data) {
        const hoursContainer = document.querySelector('.middlehours');
        hoursContainer.innerHTML = '';

        //filter the hourly data to get only the next 6 hours
        const hourData = filterHourlyData(data.days[0].hours);

        hourData.forEach(hour => {
            const hourDiv = document.createElement('div');
            hourDiv.classList.add('hour');
            hoursContainer.appendChild(hourDiv);

            const timeP = document.createElement('p');
            timeP.classList.add('timep');
            timeP.textContent = use12hourFormat(hour.datetime);
            hourDiv.appendChild(timeP);
            const iconImg = document.createElement('img');
            iconImg.classList.add('houricon');
            hourDiv.appendChild(iconImg);
            //set the icon for each hour
            getIcon(iconImg,hour);
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
    //update next days forecast
    function updatedays(data) {
    const daysContainer = document.querySelector('.daycontainer');
    daysContainer.innerHTML = '';
    const daysData = data.days.slice(1, 4); // Get the next 3 days

    daysData.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('daycard');
        daysContainer.appendChild(dayDiv);
        const dateP = document.createElement('p');
        dateP.classList.add('datep');
        dateP.textContent = day.datetime;
        dayDiv.appendChild(dateP);
        const tempP = document.createElement('p');
        tempP.classList.add('tempday');
        tempP.textContent = `${day.temp}°`;
        dayDiv.appendChild(tempP);
        const iconpdiv = document.createElement('div');
        iconpdiv.classList.add('iconpdiv');
        dayDiv.appendChild(iconpdiv);
        const iconImg = document.createElement('img');
        iconImg.classList.add('dayicon');
        iconpdiv.appendChild(iconImg);
        getIcon(iconImg,day);
        const conditionP = document.createElement('p');
        conditionP.classList.add('conditionday');
        conditionP.textContent = day.conditions;
        iconpdiv.appendChild(conditionP);
        
});
}
    updatedays(data);
}
function use12hourFormat(timeString) {
    // Split into parts: ["HH", "MM", "SS"]
    const parts = timeString.split(":");
    let hour = parseInt(parts[0], 10);
    const minutes = parts[1];
    const seconds = parts[2];

    let suffix = "AM";
    if (hour === 0) {
        hour = 12; // midnight
    } else if (hour === 12) {
        suffix = "PM"; // noon
    } else if (hour > 12) {
        hour = hour - 12;
        suffix = "PM";
    }

    
    const formattedHour = String(hour).padStart(2, "0");

    return `${formattedHour}:${minutes}:${seconds} ${suffix}`;
}

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

//convert from fahrenheit to celsius
function toCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5 / 9).toFixed(1);
}


//event listener for the unit button to toggle between celsius and fahrenheit
unitbtn.addEventListener('click', () => {
    if (unitbtn.textContent === 'C°') {
        unitbtn.textContent = 'F°';
        temp.textContent = `${toCelsius(weatherdata.days[0].temp)}°`;
        feelslike.textContent = `Feels like: ${toCelsius(weatherdata.days[0].feelslike)}°`;
        //update hourly temps
        const hourTemps = document.querySelectorAll('.temphour');

        const hourData = filterHourlyData(weatherdata.days[0].hours);
        hourTemps.forEach((tempP) => {
            tempP.textContent = `${toCelsius(hourData.shift().temp)}°`;
        });
        //update next days temps
        const dayTemps = document.querySelectorAll('.tempday');
        const daysData = weatherdata.days.slice(1, 4); // Get the next 3 days
        dayTemps.forEach((tempP) => {
            tempP.textContent = `${toCelsius(daysData.shift().temp)}°`;
        });

    } else if (unitbtn.textContent === 'F°') {
        unitbtn.textContent = 'C°';
        temp.textContent = `${weatherdata.days[0].temp}°`;
        feelslike.textContent = `Feels like: ${weatherdata.days[0].feelslike}°`;
        //update hourly temps
        const hourTemps = document.querySelectorAll('.temphour');
        const hourData = filterHourlyData(weatherdata.days[0].hours);
        hourTemps.forEach((tempP) => {
            tempP.textContent = `${hourData.shift().temp}°`;
        });
        //update next days temps
        const dayTemps = document.querySelectorAll('.tempday');
        const daysData = weatherdata.days.slice(1, 4); // Get the next 3 days
        dayTemps.forEach((tempP) => {
            tempP.textContent = `${daysData.shift().temp}°`;
        });
        
    }

});

