let locationCity = prompt("Type in the location:");

let degreeMark = '°';
let degreesCelsius = 'C';
let degreesFahrenheit = 'F';

// current weather

async function fetchDataCurrentWeather() {
    const getCurrentWeathData = await fetch ("https://api.openweathermap.org/data/2.5/weather?q=" + locationCity + "&appid=" + apiKey + "&units=metric");
    const currentDataRecord = await getCurrentWeathData.json();
    // console.log(currentDataRecord);

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

    // getting the weather icon
    let weathIcon = currentDataRecord.weather[0].icon;

    // manipulating the HTML
    document.getElementById('location-name').innerHTML = locationCity;
    document.getElementById('weather-image').src = 'http://openweathermap.org/img/wn/' + weathIcon + '@2x.png';
    document.getElementById('weather-situation').innerHTML = weathDescription;
    document.getElementById('current-temp').innerHTML = currentTemp + degreeMark + degreesCelsius;
    document.getElementById('low-high-temp').innerHTML = lowestTemp + degreeMark + ' / ' + highestTemp + degreeMark;
}
fetchDataCurrentWeather();


// hourly weather forecast

async function fetchDataHourlyForecast() {
    const getHourlyForecast = await fetch ("https://api.openweathermap.org/data/2.5/forecast?q=" + locationCity + "&appid=" + apiKey + "&units=metric");
    const hourlyForecastRecord = await getHourlyForecast.json();
    console.log(hourlyForecastRecord);

    // getting the weather icon
    let weathIcon = hourlyForecastRecord.list[0].weather[0].icon;

    // adding the hours to the hourly forecast
    document.getElementById('future-hour-1').innerHTML = hourlyForecastRecord.list[0].dt_txt;
    document.getElementById('future-hour-2').innerHTML = hourlyForecastRecord.list[1].dt_txt;
    document.getElementById('future-hour-3').innerHTML = hourlyForecastRecord.list[2].dt_txt;
    document.getElementById('future-hour-4').innerHTML = hourlyForecastRecord.list[3].dt_txt;
    document.getElementById('future-hour-5').innerHTML = hourlyForecastRecord.list[4].dt_txt;

    // adding the degrees to the hourly forecast
    document.getElementById('future-temp-1').innerHTML = hourlyForecastRecord.list[0].main.temp + degreeMark + degreesCelsius;
    document.getElementById('future-temp-2').innerHTML = hourlyForecastRecord.list[1].main.temp + degreeMark + degreesCelsius;
    document.getElementById('future-temp-3').innerHTML = hourlyForecastRecord.list[2].main.temp + degreeMark + degreesCelsius;
    document.getElementById('future-temp-4').innerHTML = hourlyForecastRecord.list[3].main.temp + degreeMark + degreesCelsius;
    document.getElementById('future-temp-5').innerHTML = hourlyForecastRecord.list[4].main.temp + degreeMark + degreesCelsius;

    // adding the icons ot the hourly forecast
    document.getElementById('future-desc-1').src = 'http://openweathermap.org/img/wn/' + hourlyForecastRecord.list[0].weather[0].icon + '@2x.png';
    document.getElementById('future-desc-2').src = 'http://openweathermap.org/img/wn/' + hourlyForecastRecord.list[1].weather[0].icon + '@2x.png';
    document.getElementById('future-desc-3').src = 'http://openweathermap.org/img/wn/' + hourlyForecastRecord.list[2].weather[0].icon + '@2x.png';
    document.getElementById('future-desc-4').src = 'http://openweathermap.org/img/wn/' + hourlyForecastRecord.list[3].weather[0].icon + '@2x.png';
    document.getElementById('future-desc-5').src = 'http://openweathermap.org/img/wn/' + hourlyForecastRecord.list[4].weather[0].icon + '@2x.png';
}
fetchDataHourlyForecast();
