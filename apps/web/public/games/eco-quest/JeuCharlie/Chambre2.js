var outButton = document.querySelector('.click'),
    pop = document.getElementById('click_button');
var main = document.getElementById("window");
var shadow = document.querySelector("body");
var hide = document.getElementById("close");

function simulator_FB (){
  "use strict"
  main.style.display = "block";
  shadow.style.backgroundColor = "rgba(0, 0, 0, 0.38)"
}

function simulator_FB_close (){
  "use strict"
  main.style.display = "none";
   shadow.style.backgroundColor = "#FFF"

}
function afficherMessage() {
    // Affichez un pop-up avec le message "Faux, ce n'est pas le bon"
    alert("Faux, ce n'est pas le bon");
}