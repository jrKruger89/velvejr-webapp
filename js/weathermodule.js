let _weather_data = [];

export let loadWeather = async (lat, lon) => {
  const api_key = "3a4d6547d5956fb585f93d1377dc1796";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}&lang=da`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  _weather_data = data;
  appendWeatherData(_weather_data);
};

export let getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};

let setPosition = (position) => {
  loadWeather(position.coords.latitude, position.coords.longitude);
};

export let appendWeatherData = (data) => {
  document.getElementById("by").innerHTML += ` ${data.name}`;
  document.getElementById("temp").innerHTML += ` ${data.main["temp"]}ºC`;

  document.querySelector(".sun_up").innerHTML += new Date(
    data.sys["sunrise"] * 1e3
  )
    .toISOString()
    .slice(-13, -5);

  document.querySelector(".sun_down").innerHTML += new Date(
    data.sys["sunset"] * 1e3
  )
    .toISOString()
    .slice(-13, -5);

  let max_temp = Array.from(document.querySelectorAll(".max"));
  max_temp.forEach((item) => {
    item.innerHTML += ` ${data.main["temp_max"]}ºC`;
  });
  let chill = Array.from(document.querySelectorAll(".chill"));
  chill.forEach((item) => {
    item.innerHTML += ` ${data.main["feels_like"]}ºC`;
  });
};
