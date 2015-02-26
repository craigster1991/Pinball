function addEvents(){
  window.addEventListener("keypress", FlipIt, false);
  window.addEventListener("mousedown", FlipItTap, false);
  window.addEventListener("touchstart", FlipItTap, false);
  box2d_ballContact();
}

function FlipIt(e) {
  if([32].indexOf(e.keyCode) > -1) {
    e.preventDefault();
    if (!keyPressed) {
      tapAnim('Space', null, null);
      keyPressed = true;
      flipperLeft.ApplyTorque(-100000);
      flipperRight.ApplyTorque(100000);
      setTimeout(function(){keyPressed = false;}, 300);
    }
  }
}

function FlipItTap(e) {
  var x = e.type === "mousedown" ? e.pageX : e.targetTouches[0].clientX;
  var y = e.type === "mousedown" ? e.pageY : e.targetTouches[0].clientY;
  if (!keyPressed) {
    tapAnim('Tap', x, y);
    keyPressed = true;
    flipperLeft.ApplyTorque(-100000);
    flipperRight.ApplyTorque(100000);
    setTimeout(function(){keyPressed = false;}, 300);
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
        setTimeout(function(){
          blueBall.SetLinearVelocity(new b2Vec2(0,0));
          blueBall.SetAngularVelocity(0);
          blueBall.SetPosition(new b2Vec2(100/SCALE, 100/SCALE));
          tapAnim('RESPAWN', null, null);
        }, 0);
      }
    }
  };

  this.world.SetContactListener(listener);
}

