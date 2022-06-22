let apiKey = DecryptStringAES(localStorage.getItem("apiKey"));
let apiKey2 = DecryptStringAES(localStorage.getItem("apiKey2"));
let lang = "en";
let unitType = "metric";
const figcaption = document.getElementsByTagName("figcaption")[0];
const cityTemp = document.getElementsByClassName("city-temp")[0];
const img = document.getElementsByClassName("img")[0];
const areaName = document.getElementsByTagName("h2")[0];
const feelsLike = document.getElementsByClassName("feels-like")[0];
const currentWeatherCard =
  document.getElementsByClassName("currentWeatherCard")[0];
console.log(currentWeatherCard);

const success = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const getCurweather = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=${lang}&units=${unitType}`;
      const response = await axios(url);
      const { name, main, sys, weather } = response.data;
      console.log(response);
      if (response) {
        figcaption.innerText = weather[0].description;
        cityTemp.innerHTML = `${Math.floor(main.temp)}<sup>°C</sup>`;
        feelsLike.innerHTML = ` Feels Like ${Math.floor(
          main.feels_like
        )}<sup class='sup2'>°C</sup>`;
        img.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        areaName.innerHTML = `${name}<sup class="countrySup">${sys.country}</sup>`;
        currentWeatherCard.style.display = "flex";
      }
    } catch (error) {
      alert(
        "Please refresh the site and allow the location services for this site"
      );
    }
  };
  getCurweather();
};

const error = () => {
  currentWeather.innerText = alert(
    "Please make your browser's location services available for this site !!!"
  );
};

navigator.geolocation.getCurrentPosition(success, error);

const input = document.querySelector(".input");
const form = document.querySelector(".sectionSearch");
const container = document.querySelector(".container");
const cityNames = document.querySelector(".cityNames");
const cityArray = [];

const getWeatherDataFromApi = async () => {
  let inputVal = input.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=${unitType}&lang=${lang}`;
  try {
    const response = await axios(url);
    const { name, main, sys, weather } = response.data;
    cityArray.push(name);
    const cityArrayLower = cityArray.map((element) => {
      return element.toLowerCase();
    });
    console.log(cityArrayLower);
    if (cityArrayLower.length > 0) {
      while (cityArrayLower.includes(input.value.toLowerCase())) {
        console.log("there is a warsaw city on ur list");
        break;
      }
    }

    let iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    const createdLi = document.createElement("li");
    createdLi.classList.add("card");
    const cardInnerText = `
        <a class="delete" onclick="deleteThis(this)">X</a>
        <div class="upper">
          <h3 class="city-temp">${Math.floor(main.temp)}<sup>°C</sup></h3>
          <figure>
            <img class="img" src="${iconUrl}"/>
            <figcaption>${weather[0].description}</figcaption>
          </figure>
        </div>
        <div class="info">
          <h2 class="cityNames">${name}<sup class="countrySup">${
      sys.country
    }</sup></h2>
          <h3 class="feels-like"> Feels Like ${Math.floor(
            main.feels_like
          )}<sup class='sup2'>°C</sup></h3>
        </div>`;
    createdLi.innerHTML = cardInnerText;
    container.prepend(createdLi);
  } catch {}
  form.reset();
};

function deleteThis(selectedTask) {
  selectedTask.parentElement.style.display = "none";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherDataFromApi();
});
