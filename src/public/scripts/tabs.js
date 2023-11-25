function openTab(evt, cityName) {
  console.log("Function called with cityName:", cityName);

  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
  }

  var selectedTab = document.getElementById(cityName);
  if (selectedTab) {
    
      selectedTab.style.display = "block";
      evt.currentTarget.classList.add("active");
      console.log("Selected tab:", selectedTab);
  } else {
   
  }
}

document.addEventListener("DOMContentLoaded", function() {

  var defaultTab = document.getElementById("novaKnjigaOsnovno");
  if (defaultTab) {
      console.log("Tab andjen", defaultTab);
      defaultTab.click();
  } else {
 
  }
});
