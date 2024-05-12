const apikey = `fa7af243b6c88cdaafecf69f5e03c054`;


async function fetchWeatherData(city){
    try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`);
    
    if (!response.ok){
        throw new Error("Unable to fetch weather data");
    }
    const data = await response.json();
    console.log(data);
    updateWeatherData(data);    
    }
    catch(error){
        console.log(error);
    }
}
const cityElement = document.querySelector(".city_name")
const temperature = document.querySelector(".temp")
const windspeed = document.querySelector(".wind-speed")
const humidity = document.querySelector(".humidity")
const descriptiontext = document.querySelector(".description-text")
const date = document.querySelector(".date")
const descriptionicon = document.querySelector(".description i")


function updateWeatherData(data){
    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°`;
    windspeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    descriptiontext.textContent = data.weather[0].description;

    const currentDate = new Date();
    date.textContent =  currentDate.toDateString();
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionicon.innerHTML =`<i class="material-icons">${weatherIconName}</i>`;
}

const formElement = document.querySelector(".search-form");
const cityinput = document.querySelector(".city");

formElement.addEventListener("submit",function (e){
    e.preventDefault();

    const city = cityinput.value;
    if ( city != ""){
        fetchWeatherData(city); 
        cityinput.value = ""; 
    }
});

function getWeatherIconName (weatherCondition){
    const iconMap = {
        Clear : "wb_sunny",
        Clouds : "wb_cloudy",
        Rain : "umbrella",
        Thunderstrom : "flash-on",
        Drizzle : "grain",
        Snow : "ac_unit",
        Mist : "cloud",
        Smoke : "cloud",
        Haze : "cloud",
        Fog : "cloud"
    };
    return iconMap[weatherCondition] || "help"
}
