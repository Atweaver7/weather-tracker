let cityInput = document.querySelector("#city-name")
let displayCity = document.querySelector("#display-city")
let displayForecast = document.querySelector("#display-forecast")
let userformE1 = document.querySelector("#user-form")
let displayTemp = document.querySelector("#tempature")
let weatherIcon = document.querySelector("#weather-icon")

let formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityInput.value.trim();

    if (cityName) {
        getAPI(cityName);

        displayCity.textContent = '';
    cityInput.value = '';
    } else {
        alert('Please enter city name')
    }
};






function getAPI() {
let requestURL = 'https://api.openweathermap.org/data/2.5/weather?q='+ cityInput.value +'&units=imperial&appid=9d5252d6e73536828453752658f52306';
console.log(cityInput.value);
fetch(requestURL)
.then(function (response) {
    if(response.ok) {
        response.json().then(function (data) {
            console.log(data);
            displayWeather(data)
            
        })
    }
})}

function displayWeather (data) {
    displayCity.innerHTML = data.name;
    displayTemp.innerHTML = data.main.temp
    // weatherIcon.src = data.weather[0].icon
    let iconURL = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
    weatherIcon.src = iconURL





}

userformE1.addEventListener('submit', formSubmitHandler);
