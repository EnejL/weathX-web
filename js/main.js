// let locationCity = prompt("Type in the location:");
let locationCity = 'Rotterdam';

let degreeMark = '°';
let degreesCelsius = 'C';
let degreesFahrenheit = 'F';
let baseUrl = "http://openweathermap.org/img/wn/";
let imgEnd = "@2x.png";

const api = {
    base: 'https://api.openweathermap.org/data/2.5/',
    key: '60cfb8f38558ab067c7d3bb49893be0c\n'
}


// current weather
async function fetchDataCurrentWeather() {
    const getCurrentWeathData = await fetch (api.base + "weather?q=" + locationCity + "&appid=" + api.key + "&units=metric");
    const currentDataRecord = await getCurrentWeathData.json();

    console.log(currentDataRecord);

    // gathering the weather data here
    let currentTemp = currentDataRecord.main.temp.toFixed(1);
    let lowestTemp = currentDataRecord.main.temp_min.toFixed(1);
    let highestTemp = currentDataRecord.main.temp_max.toFixed(1);
    let feelsLike = currentDataRecord.main.feels_like;
    let humidity = currentDataRecord.main.humidity;
    let airPressure = currentDataRecord.main.pressure;
    let windSpeed = currentDataRecord.wind.speed;
    let sunrise = currentDataRecord.sys.sunrise;
    let sunset = currentDataRecord.sys.sunset;
    let weathDescription = currentDataRecord.weather[0].description;

    // getting the weather icon
    let weathIcon = currentDataRecord.weather[0].icon;

    // current weather HTML
    document.getElementById('location-name').innerHTML = locationCity;
    document.getElementById('weather-image').src = 'http://openweathermap.org/img/wn/' + weathIcon + '@2x.png';
    document.getElementById('weather-situation').innerHTML = weathDescription;
    document.getElementById('current-temp').innerHTML = currentTemp + degreeMark + degreesCelsius;
    document.getElementById('low-high-temp').innerHTML = lowestTemp + degreeMark + ' / ' + highestTemp + degreeMark;

    // current weather detailed view HTML
    document.getElementById('feels-like').innerHTML = feelsLike;
    document.getElementById('humidity').innerHTML = humidity;
    document.getElementById('air-pressure').innerHTML = airPressure;
    document.getElementById('wind-speed').innerHTML = windSpeed;
    document.getElementById('sunrise').innerHTML = sunrise;
    document.getElementById('sunset').innerHTML = sunset;
}
fetchDataCurrentWeather();


// hourly weather forecast
async function fetchDataHourlyForecast() {
    const getHourlyForecast = await fetch (api.base + "forecast?q=" + locationCity + "&appid=" + api.key + "&units=metric");
    const hourlyForecastRecord = await getHourlyForecast.json();

    for (let i = 0; i <= 9; i++) {
        let hourlyHour = hourlyForecastRecord.list[i].dt_txt.substring(11, 16);
        let hourlyIcon = hourlyForecastRecord.list[i].weather[0].icon;
        let hourlyTemp = hourlyForecastRecord.list[i].main.temp.toFixed(1) + " " + degreeMark;

        const futureHourlyDiv = document.getElementById('future-hourly-wrapper');

        futureHourlyDiv.innerHTML +=
            "<div   class=\"future-hourly-child\">\n" +
            "<span  class=\"future-hour\">" + hourlyHour + "</span>\n" +
            "<img   src=\"" + baseUrl + "" + hourlyIcon + "" + imgEnd + "\" class=\"future-hourly-icon\" alt=\"\" />\n" +
            "<span  class=\"future-temp\">" + hourlyTemp + "</span></div>";
    };
}
fetchDataHourlyForecast();


// daily weather forecast
async function fetchDataDailyForecast() {
    const getDailyForecast = await fetch (api.base + "forecast?q=" + locationCity + "&appid=" + api.key + "&units=metric");
    const dailyForecastRecord = await getDailyForecast.json();

    const intervalVal = 8;
    for (let i = 0; i <= 30; i = i + intervalVal) {
        let dailyDay = dailyForecastRecord.list[i].dt_txt.substring(0, 10);
        let stringToDate = new Date(dailyDay).getDay();
        let dailyIcon = dailyForecastRecord.list[i].weather[0].icon;
        let dailyTemp = dailyForecastRecord.list[i].main.temp.toFixed(1) + " " + degreeMark + " " + degreesCelsius;

        let dayName;
        switch (stringToDate) {
            case 1:
                dayName = 'Monday'
                break;
            case 2:
                dayName = 'Tuesday'
                break;
            case 3:
                dayName = 'Wednesday'
                break;
            case 4:
                dayName = 'Thursday'
                break;
            case 5:
                dayName = 'Friday'
                break;
            case 6:
                dayName = 'Saturday'
                break;
            case 7:
                dayName = 'Sunday'
                break;
            default:
                dayName = dailyForecastRecord.list[i].dt_txt.substring(0, 10);
        }

        let lowestTemp = dailyForecastRecord.list[i].main.temp_min.toFixed(1);
        let highestTemp = dailyForecastRecord.list[i].main.temp_max.toFixed(1);
        const futureDaysDiv = document.getElementById('future-days');

        futureDaysDiv.innerHTML +=
            "<div   class=\"future-day-item\">\n" +
            "<span  class=\"future-day-title\">" + dayName + "</span>\n" +
            "<img   src=\"" + baseUrl + "" + dailyIcon + "" + imgEnd + "\" class=\"future-day-icon\" alt=\"\" />\n" +
            "<span  class=\"future-day-temp\">" + dailyTemp + "</span></div>";
    }
}
fetchDataDailyForecast();
