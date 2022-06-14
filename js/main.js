let locationCity = prompt("Type in the location:");


let degreeMark = '°';
let degreesCelsius = 'C';
let degreesFahrenheit = 'F';

async function fetchDataCurrentWeather() {
    const getCurrentWeathData = await fetch ("https://api.openweathermap.org/data/2.5/weather?q=" + locationCity + "&appid=" + apiKey + "&units=metric");
    const currentDataRecord = await getCurrentWeathData.json();
    console.log(currentDataRecord);

    // gathering the weather data here
    let currentTemp = currentDataRecord.main.temp;
    let lowestTemp = currentDataRecord.main.temp_min;
    let highestTemp = currentDataRecord.main.temp_max;
    let humidity;
    let airPressure;
    let feelsLike;

    let sunrise;
    let sunset;

    let weathDescription = currentDataRecord.weather[0].description;

    // manipulating the HTML
    document.getElementById('location-name').innerHTML = locationCity;
    document.getElementById('weather-situation').innerHTML = weathDescription;
    document.getElementById('current-temp').innerHTML = currentTemp + degreeMark + degreesCelsius;
    document.getElementById('low-high-temp').innerHTML = lowestTemp + degreeMark + ' / ' + highestTemp + degreeMark;
}
fetchDataCurrentWeather();

async function fetchDataHourlyForecast() {
    const getHourlyForecast = await fetch ("https://api.openweathermap.org/data/2.5/forecast?q=" + locationCity + "&appid=" + apiKey + "&units=metric");
    const hourlyForecastRecord = await getHourlyForecast.json();
    // console.log(hourlyForecastRecord);


}
fetchDataHourlyForecast();
