let apiKey = DecryptStringAES(localStorage.getItem("apiKey"));
let apiKey2 = DecryptStringAES(localStorage.getItem("apiKey2"));
let unitType = "metric";
let lang = "en";
const figcaption = document.getElementsByTagName("figcaption")[0];
const cityTemp = document.getElementsByClassName("city-temp")[0];
const img = document.getElementsByClassName("img")[0];
const areaName = document.getElementsByTagName("h2")[0];
const feelsLike = document.getElementsByClassName("feels-like")[0];

const success = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
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
      }
    } catch (error) {}
  };
  getCurweather();
};

const error = () => {
  currentWeather.innerText = alert(
    "Please make your browser's location services available for this site !!!"
  );
};

navigator.geolocation.getCurrentPosition(success, error);

const warsawWeather = document.querySelector(".warsawWeather");
const input = document.querySelector(".input");
const form = document.querySelector(".sectionSearch");
const container = document.querySelector(".container");

const getWeatherDataFromApi = async () => {
  let inputVal = input.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=${unitType}&lang=${lang}`;
  try {
    const response = await axios(url);
    const { name, main, sys, weather } = response.data;
    let iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    console.log(response);

    const createdLi = document.createElement("li");
    createdLi.classList.add("card");
    const cardInnerText = `
        <div class="upper">
          <h3 class="city-temp">${Math.floor(main.temp)}<sup>°C</sup></h3>
          <figure>
            <img class="img" src="${iconUrl}"/>
            <figcaption>${weather[0].description}</figcaption>
          </figure>
        </div>
        <div class="info">
          <h2>${name}<sup class="countrySup">${sys.country}</sup></h2>
        </div>`;
    createdLi.innerHTML = cardInnerText;
    console.log(createdLi);
    container.prepend(createdLi);
  } catch {}
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherDataFromApi();
});
