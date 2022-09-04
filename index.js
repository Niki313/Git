let now = new Date();
let date = now.getDate();
let month = now.getMonth();
let year = now.getFullYear();
let hours = now.getHours();
let minute = now.getMinutes();

let nowDate = document.querySelector("#currentDate");
let nowTime = document.querySelector("#currentTime");

let setTime = function (setTime) {
  if (month <= 9) {
    nowDate.innerHTML = `${date}/ 0${month}/ ${year}`;
  } else {
    nowDate.innerHTML = `${date}/ ${month}/ ${year}`;
  }

  if (hours <= 9) {
    nowTime.innerHTML = `0${hours}:${minute}`;
  } else {
    nowTime.innerHTML = `${hours}:${minute}`;
  }
};
if (minute <= 9) {
  nowTime.innerHTML = `${hours}:0${minute}`;
} else {
  nowTime.innerHTML = `${hours}:${minute}`;
}

setTime();

let search = document.querySelector("#buttonSearch");
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
// WEEK 5 HOMEWORK
search.addEventListener("click", searchTown);

function searchTown(event) {
  event.preventDefault();
  let dataTown = document.querySelector("#searchForm");
  let town = document.querySelector(".town");
  if (dataTown.value) {
    town.innerHTML = `${dataTown.value}`;
    let apiKey = "3c3046eb3665ca592e70fff5ccda526b";
    let city = dataTown.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
  } else {
    town.innerHTML = null;
    alert(`Please type a city name`);
  }
}

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

function showTemperature(response) {
  let city = response.data.name;
  let currentlyTemp = Math.round(response.data.main.temp);
  let dataCity = document.querySelector(".town");
  let temperatureElement = document.querySelector("#dataDegrees");
  let dataDegrees = document.querySelector("#dataDegrees");
  dataDegrees.innerHTML = `${currentlyTemp}`;

  let celsius = document.querySelector(".celsius");
  let fahrenheit = document.querySelector(".f");
  let convertToFahr = Math.round(currentlyTemp * 1.8 + 32);

  fahrenheit.addEventListener("click", function () {
    dataDegrees.innerHTML = convertToFahr;
  });

  celsius.addEventListener("click", function () {
    dataDegrees.innerHTML = currentlyTemp;
  });
  dataCity.innerHTML = `${city}`;
  temperatureElement.innerHTML = `${currentlyTemp}`;
}
