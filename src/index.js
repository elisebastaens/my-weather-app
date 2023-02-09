//show current temperature

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureTitle = document.querySelector("h5");
  temperatureTitle.innerHTML = `temperature is ${temperature}°C`;

  document.querySelector("h3").innerHTML = response.data.weather[0].main;
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

//show current date & time
let date = document.querySelector("#date");
let currentDate = new Date();
let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();
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

date.innerHTML = `${weekDays[day]} ${hour}:${minutes}`;
