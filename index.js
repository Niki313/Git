let now = new Date();
let date = now.getDate();
let month = now.getMonth();
let year = now.getFullYear();
let hours = now.getHours();
let minute = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let nowDate = document.querySelector(".currentDate");

function search(city) {
  let apiKey = "3c3046eb3665ca592e70fff5ccda526b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#searchForm");
  search(cityInputElement.value);
}

let form = document.querySelector("#form-search");
form.addEventListener("submit", handleSubmit);

let setTime = function () {
  let dateToday = now;
  if (date < 10) {
    date = `0${date}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let day = days[dateToday.getDay()];

  nowDate.innerHTML = `${date}/ ${month}/ ${year} <br/> ${hours}:${minute} <br/> ${day}`;
};

setTime();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row" id="forecastDays">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `  
  <div class="col-2 text-center">
    <div class="forecastColumn">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="42"
      />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperatures-max"> ${Math.round(
          forecastDay.temp.max
        )}°</span>
        <span class="weather-forecast-temperatures-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
    </div>
  </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let current = document.querySelector("#buttonCurrent");
let curentTemp = 20;
let dataDegrees = document.querySelector("#dataDegrees");

dataDegrees.innerHTML = `${curentTemp}`;

let celsius = document.querySelector(".celsius");
let fahrenheit = document.querySelector(".f");
let convertToFahr = Math.round(curentTemp * 1.8 + 32);

fahrenheit.addEventListener("click", function () {
  dataDegrees.innerHTML = convertToFahr;
});

celsius.addEventListener("click", function () {
  dataDegrees.innerHTML = curentTemp;
});

current.addEventListener("click", function () {
  function showPosition(position) {
    let apiKey = "3c3046eb3665ca592e70fff5ccda526b";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
});

function getForecast(coordinates) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let city = response.data.name;
  let currentlyTemp = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector(".description");
  let dataHumidity = document.querySelector(".dataHumidity");
  let dataCity = document.querySelector(".town");
  let temperatureElement = document.querySelector("#dataDegrees");
  let dataDegrees = document.querySelector("#dataDegrees");
  let dataWind = document.querySelector(".dataWind"); //Homework (week7) Wind
  let celsius = document.querySelector(".celsius");
  let fahrenheit = document.querySelector(".f");
  let convertToFahr = Math.round(currentlyTemp * 1.8 + 32);
  let icon = document.querySelector("#icon");
  let feelsLike = document.querySelector("#feelsLike");
  let pressure = document.querySelector(".pressure");

  descriptionElement.innerHTML = response.data.weather[0].description;
  dataHumidity.innerHTML = Math.round(response.data.main.humidity);
  dataDegrees.innerHTML = `${currentlyTemp}`;
  dataWind.innerHTML = Math.round(response.data.wind.speed);
  pressure.innerHTML = Math.round(response.data.main.pressure);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  fahrenheit.addEventListener("click", function () {
    dataDegrees.innerHTML = convertToFahr;
  });
  getForecast(response.data.coord);

  celsius.addEventListener("click", function () {
    dataDegrees.innerHTML = currentlyTemp;
  });
  dataCity.innerHTML = `${city}`;
  temperatureElement.innerHTML = `${currentlyTemp}`;
}
search("oslo");
