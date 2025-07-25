document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("Weather-info");
  const cityName = document.getElementById("city-name");
  const cityTemperature = document.getElementById("temperature");
  const weatherDescription = document.getElementById("description");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("wind");
  const errorMsg = document.getElementById("error-message");
  const icons = document.getElementById("weather-icon" )

  const apiKey = "e46376b0b3e8c7063718c400db178738";
  const weatherIcons = {
  Clear: 'fa-solid fa-cloud-sun text-yellow-400',
  Clouds: 'fas fa-cloud text-gray-400',
  Rain: 'fas fa-cloud-showers-heavy text-blue-500',
  Thunderstorm: 'fas fa-bolt text-yellow-600',
  Snow: 'fas fa-snowflake text-blue-300',
  Drizzle: 'fas fa-cloud-rain text-blue-400',
  Mist: 'fas fa-smog text-gray-500',
  Haze: 'fas fa-smog text-gray-400',
  Fog: 'fas fa-smog text-gray-300',
  Default: 'fas fa-question-circle text-gray-600',
};


 console.log("weather icons:", weatherIcons)

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    console.log(city);
    if (city !== "") {
      try {
        const weatherData = await fetchWeatherData(city);
        displayWeatherData(weatherData);
      } catch (error) {
        showError();
      }
    }
    cityInput.value = ""
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      console.log("Raw response:", response);
      console.log("Type of response:", typeof response);

      if (!response) {
        throw new Error(`HTTP error! status: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch failed:", error.message);
    }
  }

  function displayWeatherData(data) {
    console.log(data);

    const { name, main, weather, wind} = data;
    cityName.textContent = name;
    weatherInfo.style.display = "flex"
    cityTemperature.textContent = `${main.temp}°C`;
    humidity.textContent = `${main.humidity}%`;
    weatherDescription.textContent = weather[0].description;
    windSpeed.textContent = `${wind.speed}m/s`;



    weatherInfo.classList.remove("hidden");
    errorMsg.classList.add("hidden");

    // show icons 
    const weatherType = weather[0].main;
    const iconClass = weatherIcons[weatherType] || 'fas fa-question-circle';
    icons.innerHTML = `<i class="${iconClass} text-2xl text-purple-600 animate-bounce"></i>`
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMsg.classList.remove("hidden");
  }
});
