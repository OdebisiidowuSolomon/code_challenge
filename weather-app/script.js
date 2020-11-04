const key = "4f0c5f237b428cfe861db9dc06e5875a";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (location) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;

async function getWeatherByLocation(location) {
  const respData = await fetch(url(location))
    .then((res) => res.json())
    .then((res) => res);
  console.log(respData);
  addWeatherToPage(respData, location);
}

function addWeatherToPage(data, location) {
  const temp = KtoC(data?.main?.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
  <h3>${Math.floor(temp)}°C</h3>
  <small><img src='https://openweathermap.org/img/wn/${
    data.weather[0]?.icon
  }@2x.png'/>
  ${data.weather[0].description}</small><br/>
  <small style='text-transform: uppercase;'>${location}</small>
  `;

  main.innerHTML = "";

  main.appendChild(weather);
}

function KtoC(K) {
  return K - 273.15;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  if (location) {
    getWeatherByLocation(location);
  }
});
