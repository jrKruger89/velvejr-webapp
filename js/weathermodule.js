const api_key = "3a4d6547d5956fb585f93d1377dc1796";
let location = "Århus";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}&lang=da`;
let _weather_data = [];

export let loadWeather = async () => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  _weather_data = data;
};
