export function fetchWeather(city) {
    const key = "JQKYJVRRDN6HH3YN3PGCW2USZ"
    const cityName = city
    const data = fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/?key=${key}`)
    data.then(function(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        return response.json()})
        .then(result => {
            console.log(result);
            return result;
            
        })
        .catch(error => console.error('Error fetching weather data:', error));
  }
