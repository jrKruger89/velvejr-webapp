"use strict";

import { getLocation } from "./weathermodule.js";
getLocation();

// Open the full screen search box
function openSearch() {
  document.getElementById("myOverlay").style.display = "block";
}

// Close the full screen search box
function closeSearch() {
  document.getElementById("myOverlay").style.display = "none";
}
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
const monthNames = [
  "januar",
  "februar",
  "marts",
  "april",
  "maj",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "december",
];

const weekDays = [
  "Søndag",
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
];

var today = new Date();
var time = today.getHours();
let date = `${weekDays[today.getDay()]} d. ${today.getDate()}. ${
  monthNames[today.getMonth()]
} ${today.getFullYear()}`;
var dateTime = date + " kl " + time;
document.getElementById("time").innerHTML = dateTime;
