const input = document.querySelector("[data-cmnjs-input]");
const btnSearch = document.querySelector("[data-cmnjs-btn-search]");
const temperature = document.getElementById("temperature");
const desc = document.getElementById("desc");
const cityName = document.getElementById("cityName");
const loading = document.getElementById("loading");

const showLoading = () => loading.style.display = "block";
const hideLoading = () => loading.style.display = "none";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search?name=";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

const handleSearch = async () => {
  const query = input.value.trim();
  showLoading();
  if (query) {
    fetchCityWeather(query);
  } else {
    getCurrentLocationWeather();
  }
};

const fetchCityWeather = async (city) => {
  try {
    const response = await fetch(GEOCODING_URL + city);
    const geo = await response.json();

    if (!geo.results || geo.results.length === 0) {
      cityName.textContent = "City not found";
      temperature.textContent = "";
      desc.textContent = "";
      hideLoading();
      return;
    }

    const { latitude, longitude, admin1 } = geo.results[0];
    fetchWeather(latitude, longitude, admin1);
  } catch (err) {
    console.error("Geocoding error:", err);
  }
};

const getCurrentLocationWeather = () => {
  navigator.geolocation.getCurrentPosition(
    pos => {
      fetchWeather(pos.coords.latitude, pos.coords.longitude, "Your location");
    },
    err => {
      cityName.textContent = "Location access denied";
    }
  );
};

const fetchWeather = async (lat, lng, cityLabel = "") => {
  try {
    const url = `${WEATHER_URL}?latitude=${lat}&longitude=${lng}&current_weather=true`;

    const response = await fetch(url);
    const weather = await response.json();

    const { temperature: temp, windspeed } = weather.current_weather;
    const unitTemp = weather.current_weather_units.temperature;
    const unitWind = weather.current_weather_units.windspeed;

    cityName.textContent = cityLabel;
    temperature.textContent = `${temp}${unitTemp}`;
    desc.textContent = `Temp: ${temp}${unitTemp} | Wind: ${windspeed}${unitWind}`;
    changeBackgroundByTemp(temp)
    hideLoading();
  } catch (err) {
    console.error("Weather fetch error:", err);
  }
};
const changeBackgroundByTemp = (temp) => {
  const app = document.querySelector(".weather-app");

  if (temp <= 5) {
    app.style.background = "linear-gradient(135deg, #4b6cb7, #182848)";
  }
  else if (temp <= 15) {
    app.style.background = "linear-gradient(135deg, #5a8dee, #8ec5fc)";
  }
  else if (temp <= 25) {
    app.style.background = "linear-gradient(135deg, #42e695, #3bb2b8)";
  }
  else if (temp <= 32) {
    app.style.background = "linear-gradient(135deg, #f6d365, #fda085)";
  }
  else {
    app.style.background = "linear-gradient(135deg, #f83600, #fe8c00)";
  }
};

btnSearch.addEventListener("click", handleSearch);
document.addEventListener("DOMContentLoaded", handleSearch);
