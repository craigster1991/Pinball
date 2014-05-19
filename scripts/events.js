function addEvents(){
  window.addEventListener("keypress", function(e) { if([32].indexOf(e.keyCode) > -1) { e.preventDefault(); FlipIt(); }}, false);
}

function FlipIt() {
  if (!keyPressed) {
    keyPressed = true;
    flipperLeft.ApplyTorque( -100000);  
    flipperRight.ApplyTorque( 100000);
    setTimeout(function(){keyPressed = false;}, 150);
  }
}