const api_key = "3a4d6547d5956fb585f93d1377dc1796";
let lon = "9.9815365";
let lat = "56.1473513";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}&lang=da`;
let _weather_data = [];

export let loadWeather = async () => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  _weather_data = data;
  document.getElementById(
    "by"
  ).innerHTML = `Viser vejr for ${data.name}, Aktuel temp. ${data.main["temp"]}ºC`;
};
