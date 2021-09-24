export default function showMoreBtn() {
  var x = document.getElementById("p_showmore");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
