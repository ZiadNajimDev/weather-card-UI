const input = document.querySelector(".todo__input");

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const city = input.value;
    if (city) {
      getWeather(city);
      input.value = "";
    }
  }
});

const getWeather = (city) => {
  const request = new XMLHttpRequest();
  request.open("GET", `https://wttr.in/${city}?format=j1`);
  request.send();

  request.addEventListener("load", function () {
    const {
      current_condition: currentConditions,
      nearest_area: nearestArea,
      weather: weather,
    } = JSON.parse(this.responseText);
    const [currentLocation] = nearestArea;
    const [currentWeather] = currentConditions;
    const [astronomy] = weather;
    // Update Display
    const tempElement = document.querySelector(".temp");
    const sunset = document.querySelector(".sunset");
    const wind = document.querySelector(".wind");
    const Feels = document.querySelector(".Feels");
    const location = document.querySelector(".location");
    const humidity = document.querySelector(".humidity");

    tempElement.innerHTML = `${currentWeather.temp_C} <span>°C</span>`;
    location.innerHTML = `${currentLocation.areaName[0].value}, ${currentLocation.country[0].value}`;
    wind.innerHTML = ` Wind <br />${currentWeather.windspeedKmph}km/h`;
    humidity.innerHTML = ` humidity <br />${currentWeather.humidity}%`;
    sunset.innerHTML = `Sunset <br />${astronomy.astronomy[0].sunset}`;
    Feels.innerHTML = `Feels like <br />${currentWeather.FeelsLikeC}°C`;
  });
};
