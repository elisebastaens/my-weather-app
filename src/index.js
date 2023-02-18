//show current temperature
function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureTitle = document.querySelector("#degrees");
  temperatureTitle.innerHTML = `temperature is ${temperature}°C`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#windSpeed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let feelElement = document.querySelector("#feelsLike");
  feelElement = response.data.main.feels_like;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src", 
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  document.querySelector("#description").innerHTML = response.data.weather[0].description;
}
function searchLocation(position) {
  let apiKey = "f9d0ac5396e7d9e79a39336860e5f2ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//show city
function showCity(event) {
  event.preventDefault();
  let apiKey = "f9d0ac5396e7d9e79a39336860e5f2ef";
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = cityInput.value;
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", showCity);

//show date & time
let date = document.querySelector("#date");
let currentDate = new Date();
let todaysDate = currentDate.getDate();
let month = currentDate.getMonth();
let hour = currentDate.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let day = currentDate.getDay();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

date.innerHTML = `${weekDays[day]}, ${months[month]} ${todaysDate}, ${hour}:${minutes}`;
