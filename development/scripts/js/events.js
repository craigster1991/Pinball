function addEvents(){
  window.addEventListener("keypress", FlipIt, false);
  box2d_ballContact();
}

function FlipIt(e) {
  if([32].indexOf(e.keyCode) > -1) {
    e.preventDefault();
    if (!keyPressed) {
      keyPressed = true;
      flipperLeft.ApplyTorque(-100000);
      flipperRight.ApplyTorque(100000);
      setTimeout(function(){keyPressed = false;}, 300);
    }
  }
}

function box2d_ballContact() {
  var listener = new b2ContactListener();
  
  listener.EndContact = function(contact) {
    if (contact.GetFixtureA().GetUserData() !== null && contact.GetFixtureB().GetUserData() !== null){
      if ((contact.GetFixtureA().GetUserData().domObj.selector == '#floor' && 
            contact.GetFixtureB().GetUserData().domObj.selector == '.circle') || 
          (contact.GetFixtureB().GetUserData().domObj.selector == '#floor' && 
            contact.GetFixtureA().GetUserData().domObj.selector == '.circle')) {
        setTimeout(function(){blueBall.SetPosition(new b2Vec2(100/SCALE, 100/SCALE));}, 0);
      }
    }
  };
  
  this.world.SetContactListener(listener);
}

