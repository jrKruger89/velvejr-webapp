"use strict";
import "./router.js";
import "./weathermodule.js";
import "./usermodule.js";
// ------------------------------- Home page search for city / get city -------------------------------
// Open the full screen search box
function openSearch() {
  document.getElementById("myOverlay").style.display = "block";
}

// Close the full screen search box
function closeSearch() {
  document.getElementById("myOverlay").style.display = "none";
}

window.openSearch = () => openSearch();
window.closeSearch = () => closeSearch();
// -------------------------------------- Home page date + day + time ----------------------------------------
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

let today = new Date();
let time = today.getHours();
let date = `${weekDays[today.getDay()]} d. ${today.getDate()}. ${
  monthNames[today.getMonth()]
} ${today.getFullYear()}`;
let dateTime = date + " kl " + time;
document.getElementById("time").innerHTML = dateTime;
// -------------------------------------- Home page + today's info ----------------------------------------
// greeting
let greeting = "";

if (time >= 17 && time <= 23) greeting = "Go' aften";
else if (time >= 0 && time <= 5) greeting = "Go' nat";
else if (time >= 6 && time <= 11) greeting = "Go' morgen";
else if (time >= 12 && time <= 16) greeting = "Go' eftermiddag";

document.querySelector(".greeting").innerHTML = greeting;

// ------------------------------- Edit profile page -------------------------------
// avatar slideshow
let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides((slideIndex += n));
}
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slides");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

window.showSlides = () => showSlides();
document.querySelector(".prev").onclick = () => plusSlides(-1);
document.querySelector(".next").onclick = () => plusSlides(1);

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
