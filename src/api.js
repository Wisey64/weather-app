export function fetchWeather(city) {
    const key = "JQKYJVRRDN6HH3YN3PGCW2USZ"
    const cityName = city
    return fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/?key=${key}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        return response.json()})
            
        }
