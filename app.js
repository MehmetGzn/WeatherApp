let apiKey = DecryptStringAES(localStorage.getItem("apiKey"));
let apiKey2 = DecryptStringAES(localStorage.getItem("apiKey2"));
let unitType = "metric";
let lang = "tr";

const currentWeather = document.getElementById("currentWeather");

const showPosition = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  const getCurweather = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=${lang}&units=${unitType}`;
      const response = await axios(url);
      const { name, main, sys, weather } = response.data;
      currentWeather.innerText = `${name}, ${main.temp}, ${sys.country}`;
    } catch (error) {}
  };
  getCurweather();
};

const getCurPosition = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("error");
  }
};

getCurPosition();

const warsawWeather = document.querySelector(".warsawWeather");

const getWeatherDataFromApi = async () => {
  let inputVal = "warsaw";

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=${unitType}&lang=${lang}`;
  try {
    const response = await axios(url);
    const { name, main, sys, weather } = response.data;
    let iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    console.log(response);
    warsawWeather.innerText = `${name}, ${main.temp}, ${sys.country}`;
  } catch {}
};

getWeatherDataFromApi();

// getCurrentWeather();
