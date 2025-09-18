import { fetchWeather } from "./api";
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener("click", () => {
    const cityy = cityInput.value;
    fetchWeather(cityy);
    
    
});
function updateWeather(data) {

}
