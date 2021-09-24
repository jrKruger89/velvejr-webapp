export let show = (window.showMoreBtn = () => {
  // vi gemmer vores globale funktionskald til showMoreBtn i en variabel for at få lov til at eksportere en global variabel.
  /*const ptags = document.querySelectorAll(".p_showmore");
  ptags.forEach((item) => {
    if (item.style.display === "") {
      item.style.display = "block";
    } else {
      item.style.display = "";
    }
  });
});*/

  var acc = document.getElementsByClassName("showmore");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      var p_showmore = this.nextElementSibling;
      if (p_showmore.style.display === "block") {
        p_showmore.style.display = "none";
      } else {
        p_showmore.style.display = "block";
      }
    });
  }
});
