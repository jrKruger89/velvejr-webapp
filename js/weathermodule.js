const api_key = "3a4d6547d5956fb585f93d1377dc1796";

let _weather_data = [];

export let loadWeather = async (lat, lon) => {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}&lang=da`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  _weather_data = data;
  document.getElementById("by").innerHTML += ` ${data.name}`;
  document.getElementById("temp").innerHTML += ` ${data.main["temp"]}ºC`;
};

export function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function setPosition(position) {
  console.log(
    `Lat: ${position.coords.latitude} Lon: ${position.coords.longitude}`
  );
  loadWeather(position.coords.latitude, position.coords.longitude);
}
