// ------------------------------- Fetching data -------------------------------
let _current_weather_data = [];
const api_key = "3a4d6547d5956fb585f93d1377dc1796";
let loadWeather = async (lat, lon) => {
  // skift til onecall
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}&lang=da`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  _current_weather_data = data;
  appendWeatherData(_current_weather_data);
  weatherChange(_current_weather_data); // to give the weatherChange func data
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
};
getLocation();
// ------------------------------- Using fetched data and appending values to the DOM -------------------------------
let appendWeatherData = (data) => {
  //data is all what we get from the API
  //"bynavn"
  document.getElementById("by").innerHTML += ` ${data.name}`;
  //"aktuel temp."
  document.getElementById("temp").innerHTML += ` ${data.main["temp"]}ºC`;
  //"max temp.""
  let max_temp = Array.from(document.querySelectorAll(".max"));
  max_temp.forEach((item) => {
    item.innerHTML += ` ${data.main["temp_max"]}ºC`;
  });
  //"min temp."
  document.querySelector(".min").innerHTML += ` ${data.main["temp_min"]}ºC`;
  //"føles som"
  let chill = Array.from(document.querySelectorAll(".chill"));
  chill.forEach((item) => {
    item.innerHTML += ` ${data.main["feels_like"]}ºC`;
  });
  //"nattetemp."
  //"vind"
  document.querySelector(".wind").innerHTML += ` ${data.wind["speed"]} m/s`;
  //"vindstød"
  document.querySelector(".gust").innerHTML += ` ${data.wind["gust"]} m/s`;
  //"luftfugtig"
  document.querySelector(".humidity").innerHTML += ` ${data.main["humidity"]}%`;
  //"Pollen"
  //"uv"
  //"sigtbarhed"
  document.querySelector(".visibility").innerHTML += ` ${data.visibility} m`;
  //"vejrbeskrivelse"
  let description = document.querySelector(".description");
  description.innerHTML += ` I dag er der ${data.weather[0]["description"]}`;
  //"sol op"
  document.querySelector(".sun_up").innerHTML += format_time(
    data.sys["sunrise"]
  );
  //"sol ned"
  document.querySelector(".sun_down").innerHTML += format_time(
    data.sys["sunset"]
  );
};
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
function weatherChange(weather) {
  let page = document.querySelector(".page");
  let animation = document.querySelector(".animation");
  let daytip = document.querySelector(".daytip");

  if (weather.weather[0]["main"] == "Rain") {
    page.style.backgroundImage = "url(../img/sky_3.png)";
    animation.src = "../img/rain.gif";
    daytip.innerHTML = "Husk regnjakken, så du ikke bliver våd!";
  } else if (weather.weather[0]["main"] == "Thunderstorm") {
    page.style.backgroundImage = "url(../img/sky_3.png)";
    animation.src = "../img/lightning.gif";
    daytip.innerHTML = "Bliv indenfor - det bliver buldervejr!";
  } else if (weather.weather[0]["main"] == "Snow") {
    page.style.backgroundImage = "url(../img/sky_3.png)";
    animation.src = "../img/snow.gif";
    daytip.innerHTML = "Få vinterjakken på idag - det bliver snevejr!";
  } else if (weather.weather[0]["main"] == "Atmosphere") {
    page.style.backgroundImage = "url(../img/sky_3.png)";
    animation.style.display = "none";
    daytip.innerHTML =
      "Måske du skulle overveje nogle ekstra reflekser idag, så du tydeligt kan ses!";
  } else if (weather.weather[0]["main"] == "Drizzle") {
    page.style.backgroundImage = "url(../img/sky_2.png)";
    animation.style.display = "none";
    daytip.innerHTML = "Medbring en paraply eller vandafvisende jakke idag!";
  } else if (weather.weather[0]["main"] == "Clouds") {
    page.style.backgroundImage = "url(../img/sky_2.png)";
    animation.style.display = "none";
    daytip.innerHTML =
      "En let trøje er fin idag, men medbring evt. en jakke, for en sikkerhedsskyld!";
  } else if (weather.weather[0]["main"] == "Clear") {
    page.style.backgroundImage = "url(../img/sky_1.png)";
    animation.src = "../img/sun.gif";
    daytip.innerHTML =
      "På med solcreme, solbriller og t-shirt - det bliver solrigt idag!";
  }
}
