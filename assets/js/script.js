let cityInput = document.querySelector("#city-name");
let displayCity = document.querySelector("#display-city");
let displayForecast = document.querySelector("#display-forecast");
let userformE1 = document.querySelector("#user-form");
let displayTemp = document.querySelector("#tempature");
let weatherIcon = document.querySelector("#weather-icon");
let currentWeatherText = document.querySelector("#current-forecast");
let historyContainer = document.querySelector("#search-history");
let lat = [];
let lon = [];
let cityStorage = [];
// localStorage.setItem('city', JSON.stringify(displayCity))
// localStorage.getItem('city', cityStorage)

let formSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityInput.value.trim();

  if (cityName) {
    getAPI(cityName);

    displayCity.textContent = "";
    cityInput.value = "";
  } else {
    alert("Please enter city name");
  }
  searchHistory();
};

function getAPI() {
  let requestURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityInput.value +
    "&units=imperial&appid=9d5252d6e73536828453752658f52306";
  fetch(requestURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (apiOneData) {
        // console.log(data);
        lat.push(apiOneData.coord.lat);
        lon.push(apiOneData.coord.lon);
        cityStorage.push(apiOneData.name);
        localStorage.setItem("city", cityStorage);
        

        getAPI2(lat, lon, apiOneData);
      });
    }
  });
}

function getAPI2(lat, lon, apiOneData) {
  let requestURLForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat[0]}&lon=${lon[0]}&units=imperial&appid=9d5252d6e73536828453752658f52306`;
  fetch(requestURLForecast).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayCurrentWeather(apiOneData);
        displayFiveDayForecast(data);
        console.log(data);
        // console.log(data.list[0].main.temp);
      });
    }
  });
}

function displayCurrentWeather(data) {
  displayCity.innerHTML = data.name;
  displayCity.classList.add("current-weather");
  displayTemp.innerHTML = data.main.temp + " ℉";
  displayTemp.classList.add("current-weather");
  // weatherIcon.src = data.weather[0].icon
  let iconURL =
    "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
  weatherIcon.src = iconURL;
  weatherIcon.classList.remove("hide");
  currentWeatherText.classList.remove("hide");
}
function displayFiveDayForecast(data) {
  var headerDiv = document.createElement("div");
  var header = document.createElement("h4");
  headerDiv.setAttribute("class", " center col");
  header.setAttribute("class", "center");
  header.textContent = "5 Day Forecast";
  headerDiv.append(header);
  displayForecast.innerHTML = "";
  displayForecast.append(headerDiv);
  var row = document.createElement("div");
  row.setAttribute("class", "row");

  for (let i = 0; i < 5; i++) {
    let iconURL =
      "http://openweathermap.org/img/wn/" +
      data.daily[i].weather[0].icon +
      "@2x.png";
    let temp = data.daily[i].temp.day;
    let humidity = data.daily[i].humidity;
    let wind = data.daily[i].wind_speed;
    console.log(iconURL, temp, humidity, wind);

    let col = document.createElement("div");
    let card = document.createElement("div");
    let cardBody = document.createElement("div");
    let title = document.createElement("h4");
    let weatherIconEl = document.createElement("img");
    let tempatureEl = document.createElement("p");
    let humidityEl = document.createElement("p");
    let windEl = document.createElement("p");

    col.append(card);
    card.append(cardBody);
    card.setAttribute("class", "card col");
    cardBody.append(title, weatherIconEl, tempatureEl, humidityEl, windEl);
    weatherIconEl.setAttribute("src", iconURL);
    // title.textContent = date
    tempatureEl.textContent = temp + "℉";
    humidityEl.textContent = humidity;
    windEl.textContent = wind;
    row.append(col);
  }
  displayForecast.append(row);
}


function searchHistory(localstorage){
   let li = document.createElement("li")

  // for loop to select all items in the localstorage array
  for (let i = 0; i < cityStorage.length; i++) {
    li.append(cityStorage)
    console.log(cityStorage);
    historyContainer.append();

    historyContainer.innerHTML = cityStorage
  };
}
    
  
  
  
userformE1.addEventListener("submit", formSubmitHandler);
searchHistory();