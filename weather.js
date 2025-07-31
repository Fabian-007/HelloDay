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
  const sidebar = document.getElementById("sidebar")
  const logOut = document.getElementById("logout")
  const dailyEssentials = document.getElementById("daily-essentials")
  const essentailsDisplay = document.getElementById("essentails-display")
  const essentailsInput = document.getElementById("essentials-input")
  const essentailsInputGroup = document.getElementById("essentials-input-group")
  const submitBtn = document.getElementById("submit")

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

  function logout(){
   localStorage.removeItem("isLoggedIn")
   window.location.href = "index.html"
   
 }

 if(logOut){
  logOut.addEventListener("click", (e)=>{
  e.preventDefault()
  e.stopPropagation()
  logout()

 })
}


const workEssentials = [
  {id:1, name: "Phone & Charger"},
  {id:2, name: "ID badge"},
  {id:3, name: "Wallet or purse"},
  {id:4, name: "Keys"},
  {id:5, name: "Water bottle"},
  {id:6, name: "Laptop or notebook"},
  {id:7, name: "Transportation pass or fuel card "},
  {id:8, name: "Lunch"},
  {id:9, name: "Grooming items(e.g. comb, deodoranrt)"},
  {id:10,name: "Sanitizer"},
  {id:11,name: "Umbrella"},
]

const selectedEssential = JSON.parse(localStorage.getItem("selectedEssential"))|| []

function createButton(essentialItem){

  const btn = document.createElement("button")
  btn.textContent = essentialItem.name
  btn.setAttribute("data-id", essentialItem.id)
  btn.classList.add(
    "p-3", "text-md", 
    "rounded","text-white", "bg-purple-600","hover:bg-purple-300", 
    "hover:text-white","transition", "duration-300", "cursor-pointer"
  )
  essentailsDisplay.appendChild(btn)
};
workEssentials.forEach(createButton);

dailyEssentials.addEventListener("click", (e)=>{

const itemRawId = e.target.getAttribute("data-id")
if(!itemRawId)return 
console.log(typeof itemRawId)
console.log(itemRawId)
// coverts stringed id to interger
const id = parseInt(itemRawId, 10)
const essentialItem = workEssentials.find((ess)=> ess.id === id)
addToSelectedEssential(essentialItem)
})

function addToSelectedEssential(essentialItem){
 latestSelect = selectedEssential.push(essentialItem)
 console.log("Added", essentialItem)
 console.log("Current selected",selectedEssential)
 saveSelectedEssential()
}
function saveSelectedEssential(){
localStorage.setItem("selectedEssentials", JSON.stringify(selectedEssential))
}



submitBtn.addEventListener("click", (e)=>{
  e.preventDefault
 const item = essentailsInput.value.trim()
 if(item === "") return
 console.log(item)

 const newItem = {
  id: Date.now(),
  name: item
   }

   workEssentials.push(newItem)
   createButton(newItem)
   essentailsInput.value = ""
   
})

});
