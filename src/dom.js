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
})
    .catch(error => console.error('Error fetching weather data:', error));
    
    
});
function updateWeather(data) {
    
    


}
