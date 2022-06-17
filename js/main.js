// let locationCity = prompt("Type in the location:");
let locationCity = 'Tokio';

let degreeMark = '°';
let degreesCelsius = 'C';
let degreesFahrenheit = 'F';
let baseUrl = "http://openweathermap.org/img/wn/";
let imgEnd = "@2x.png";

const api = {
    base: 'https://api.openweathermap.org/data/2.5/',
    key: ''
}

// current weather
async function fetchDataCurrentWeather() {
    const getCurrentWeathData = await fetch (api.base + "weather?q=" + locationCity + "&appid=" + api.key + "&units=metric");
    const currentDataRecord = await getCurrentWeathData.json();

    // gathering the weather data here
    let currentTemp = currentDataRecord.main.temp.toFixed(1);
    let lowestTemp = currentDataRecord.main.temp_min.toFixed(1);
    let highestTemp = currentDataRecord.main.temp_max.toFixed(1);
    let humidity;
    let airPressure;
    let feelsLike;
    let sunrise;
    let sunset;
    let weathDescription = currentDataRecord.weather[0].description;

    // getting the weather icon
    let weathIcon = currentDataRecord.weather[0].icon;

    // manipulating the HTML
    document.getElementById('location-name').innerHTML = locationCity;
    document.getElementById('weather-image').src = 'http://openweathermap.org/img/wn/' + weathIcon + '@2x.png';
    document.getElementById('weather-situation').innerHTML = weathDescription;
    document.getElementById('current-temp').innerHTML = currentTemp + degreeMark + degreesCelsius;
    document.getElementById('low-high-temp').innerHTML = lowestTemp + degreeMark + degreesCelsius + ' / ' + highestTemp + degreeMark + degreesCelsius;
}
fetchDataCurrentWeather();


// hourly weather forecast
async function fetchDataHourlyForecast() {
    const getHourlyForecast = await fetch (api.base + "forecast?q=" + locationCity + "&appid=" + api.key + "&units=metric");
    const hourlyForecastRecord = await getHourlyForecast.json();
    // console.log(hourlyForecastRecord);

    for (let i = 0; i <= 14; i++) {
        let hourlyHour = hourlyForecastRecord.list[i].dt_txt.substring(11, 16);
        // let hourlyIcon = hourlyForecastRecord.list[i].weather[i].icon;
        let hourlyTemp = hourlyForecastRecord.list[i].main.temp.toFixed(1) + " " + degreeMark + " " + degreesCelsius;

        const futureHourlyDiv = document.getElementById('future-hourly');

        futureHourlyDiv.innerHTML +=
            "<div   class=\"future-hourly-child\">\n" +
            "<span  class=\"future-hour\">" + hourlyHour + "</span>\n" +
            "<img   src=\"http://openweathermap.org/img/wn/04n@2x.png\" class=\"future-hourly-icon\" alt=\"\" />\n" +
            "<span  class=\"future-temp\">" + hourlyTemp + "</span></div>";
    };
}
fetchDataHourlyForecast();


// daily weather forecast
async function fetchDataDailyForecast() {
    const getDailyForecast = await fetch (api.base + "forecast?q=" + locationCity + "&appid=" + api.key + "&units=metric");
    const dailyForecastRecord = await getDailyForecast.json();
    // console.log(dailyForecastRecord);

    const intervalVal = 8;

    for (let i = 0; i <= 30; i = i + intervalVal) {
        let dailyDay = dailyForecastRecord.list[i].dt_txt.substring(0, 10);
        // let dailyIcon = dailyForecastRecord.list[i].weather[i].icon;
        let dailyTemp = dailyForecastRecord.list[i].main.temp.toFixed(1) + " " + degreeMark + " " + degreesCelsius;

        console.log(dailyDay);

        const futureDaysDiv = document.getElementById('future-days');

        futureDaysDiv.innerHTML +=
            "<div   class=\"future-day-item\">\n" +
            "<span  class=\"future-day-title\">" + dailyDay + "</span>\n" +
            "<img   src=\"http://openweathermap.org/img/wn/04n@2x.png\" class=\"future-day-icon\" alt=\"\" />\n" +
            "<span  class=\"future-day-temp\">" + dailyTemp + "</span></div>";
    }
}
fetchDataDailyForecast();
