// ------------------------------- Fetching data -------------------------------
//current weather data by location (city)
let _current_weather_data = [];
let _daily_weather_data = [];
let _weather_by_city = [];
const api_key = "3a4d6547d5956fb585f93d1377dc1796";
let url;
let cityName = "";

let loadWeather = async (lat, lon) => {
  url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}&lang=da`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  _current_weather_data = data;
};

//daily weather data by longitude + latitude
let loadDailyWeather = async (lat, lon) => {
  url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${api_key}&lang=da`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  _daily_weather_data = data;
  appendDaily("#home", 0, _daily_weather_data, _current_weather_data);
  appendDaily("#homePlusOne", 1, _daily_weather_data, _current_weather_data);
  appendDaily("#homePlusTwo", 2, _daily_weather_data, _current_weather_data);
  appendDaily("#homePlusThree", 3, _daily_weather_data, _current_weather_data);
  // to give the weatherChange func data
  weatherChange("#home", 0, _daily_weather_data);
  weatherChange("#homePlusOne", 1, _daily_weather_data);
  weatherChange("#homePlusTwo", 2, _daily_weather_data);
  weatherChange("#homePlusThree", 3, _daily_weather_data);
};
// ------------------------------- Getting location with geoLocation -------------------------------
window.getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};
// position latitude and longitude are used to call the data from loadWeather for the specifik location
let setPosition = (position) => {
  loadWeather(position.coords.latitude, position.coords.longitude);
  loadDailyWeather(position.coords.latitude, position.coords.longitude);
};
getLocation();
// ------------------------------- Using fetched data and appending values to the DOM -------------------------------
function appendDaily(sectionId, index, data, data2) {
  let htmlTemplateShowMore = "";
  htmlTemplateShowMore += /*html*/ `
    <article>
    <p><b>Sol op: kl. </b>${format_time(data.daily[index].sunrise)}</p>
    <p><b>Sol ned: kl. </b>${format_time(data.daily[index].sunset)}</p>
    <p><b>Max temp.: </b>${data.daily[index].temp.max}??C</p>
    <p><b>Min. temp.: </b>${data.daily[index].temp.min}??C</p>
    <p><b>F??les som: </b>${data.daily[index].feels_like.day}??C</p>
    <p><b>Nattetemp.: </b>${data.daily[index].temp.night}??C</p>
    <p><b>Risiko for nedb??r: </b>XX</p>
  </article>
  <article>
    <p><b>Nedb??r: </b>${data.daily[index].rain}mm.</p>
    <p><b>Vind: </b>${data.daily[index].wind_speed}m/s.</p>
    <p><b>Vindst??d: </b>${data.daily[index].wind_gust}m/s.</p>
    <p><b>Lufttugtighed: </b>${data.daily[index].humidity}%</p>
    <p><b>Pollen: </b>XX</p>
    <p><b>U.V.-indeks: </b>${data.daily[index].uvi}</p>
    <p><b>Sigtbarhed: </b>${data.current.visibility}m</p>
  </article>
    `;
  document.querySelector(`${sectionId} .read_more_div`).innerHTML =
    htmlTemplateShowMore;

  let htmlTemplateCurrent = "";
  htmlTemplateCurrent += /*html*/ `
    <article>
    <h2 class="description">Det bliver ${data.daily[index].weather[0].description}</h2>
    <p>Dags temp.: ${data.daily[index].temp.day}??C</p>
    <p>F??les som: ${data.daily[index].feels_like.day}??C</p>
    </article>
  `;
  document.querySelector(`${sectionId} .weatherDataDay`).innerHTML =
    htmlTemplateCurrent;

  //city
  let appendCity = "";
  appendCity += /*html*/ `<p class="by">Viser vejr for ${data2.name}</p>`;
  document.querySelector(`${sectionId} .by`).innerHTML = appendCity;
}

async function setNewLocation() {
  cityName = document.querySelector(".input_search").value;
  url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${api_key}&lang=da`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  _weather_by_city = data;
  _current_weather_data = _weather_by_city;
  loadDailyWeather(data.coord.lat, data.coord.lon);
  document.querySelector("#home .overlay").style.display = "none";
  document.querySelector(".input_search").value = "";
}

window.setNewLocation = () => setNewLocation();

// ------------------------------- Converting fetched sun up/down data into DK-time -------------------------------
function format_time(s) {
  const dtFormat = new Intl.DateTimeFormat("da-DK", {
    timeStyle: "short",
    timeZone: "Europe/Copenhagen",
  });

  return dtFormat.format(new Date(s * 1e3));
}
// ------------------------------- Using weatherdata for background + avatar + "dagens tip" -------------------------------
// Change background + animation based on the weather
function weatherChange(sectionId, index, weather) {
  let page = document.querySelector(`${sectionId}`);
  let animation = document.querySelector(`${sectionId} .animation`);
  let daytip = document.querySelector(`${sectionId} .daytip`);
  let weatherDescription = weather.daily[index].weather[0].main;

  setWeatherSun(page, animation, daytip);

  if (weatherDescription == "Rain") {
    setWeatherRain(page, animation, daytip);
  } else if (weatherDescription == "Thunderstorm") {
    setWeatherThunder(page, animation, daytip);
  } else if (weatherDescription == "Snow") {
    setWeatherSnow(page, animation, daytip);
  } else if (weatherDescription == "Atmosphere") {
    setWeatherAtmosphere(page, animation, daytip);
  } else if (weatherDescription == "Drizzle") {
    setWeatherDrizzle(page, animation, daytip);
  } else {
    setWeatherClouds(page, animation, daytip);
  }
}

let setWeatherRain = (page, animation, daytip) => {
  page.style.backgroundImage = "url(../img/sky_4.png)";
  animation.src = "../img/rain.gif";
  daytip.innerHTML = "Husk regnjakken, s?? du ikke bliver v??d!";
};

let setWeatherThunder = (page, animation, daytip) => {
  page.style.backgroundImage = "url(../img/sky_4.png)";
  animation.src = "../img/lightning.gif";
  daytip.innerHTML = "Bliv indenfor - det bliver buldervejr!";
};

let setWeatherSnow = (page, animation, daytip) => {
  page.style.backgroundImage = "url(../img/sky_3.png)";
  animation.src = "../img/snow.gif";
  daytip.innerHTML = "F?? vinterjakken p?? idag - det bliver snevejr!";
};

let setWeatherAtmosphere = (page, animation, daytip) => {
  page.style.backgroundImage = "url(../img/sky_3.png)";
  animation.style.display = "none";
  daytip.innerHTML =
    "M??ske du skulle overveje nogle ekstra reflekser idag, s?? du tydeligt kan ses!";
};

let setWeatherDrizzle = (page, animation, daytip) => {
  page.style.backgroundImage = "url(../img/sky_3.png)";
  animation.style.display = "none";
  daytip.innerHTML = "Medbring en paraply eller vandafvisende jakke idag!";
};

let setWeatherClouds = (page, animation, daytip) => {
  page.style.backgroundImage = "url(../img/sky_3.png)";
  animation.style.display = "none";
  daytip.innerHTML =
    "En let tr??je er fin idag, men medbring evt. en jakke, for en sikkerhedsskyld!";
};

let setWeatherSun = (page, animation, daytip) => {
  page.style.backgroundImage = "url(../img/sky_1.png)";
  animation.src = "../img/sun.gif";
  daytip.innerHTML =
    "P?? med solcreme, solbriller og t-shirt - det bliver solrigt idag!";
};
