"use strict";

import { loadWeather } from "./weathermodule.js";

loadWeather();

// ------------------------------- Help page show/hide answer with rotating arrow -------------------------------
const buttons = Array.from(document.querySelectorAll(".showmore"));
buttons.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.nextElementSibling.style.display === "") {
      item.nextElementSibling.style.display = "block";
      item.style.transform = "rotate(90deg)";
    } else {
      item.nextElementSibling.style.display = "";
      item.style.transform = "rotate(0deg)";
    }
  });
});

// ------------------------------- Home page search/get location -------------------------------

//current date and time
var today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + " " + time;

document.getElementById("time").innerHTML = dateTime;
