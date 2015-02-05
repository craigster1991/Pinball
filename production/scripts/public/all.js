function createDOMObjects() {
  box1 = domBox($('#upper-bottom-left-box'), true, -2);
  box1.SetAngle(-55*D2R);
  box2 = domBox($('#upper-bottom-right-box'), true, -2);
  box2.SetAngle(55*D2R);

  flipperLeft = domBox($('.f-left'), false, -2);
  flipperRight = domBox($('.f-right'), false, -2);
  blueBall = domCircle($('.circle'), false, -1, 0.5);
  leftInnerPin = domCircle($('.static-circle-il'), false, -2);
  rightInnerPin = domCircle($('.static-circle-ir'), false, -2);
  leftPin = domCircle($('.static-circle-l'), true, -2);
  rightPin = domCircle($('.static-circle-r'), true, -2);
  middlePin = domCircle($('.centrepin'), true, -2);
  floor = domBox($('#floor'), true);
  polygon = domPolygon($('#polygon'), [
    new b2Vec2(0/SCALE, -150/SCALE),
    new b2Vec2(10/SCALE, -30/SCALE),
    // new b2Vec2(10/SCALE, 0/SCALE),
    new b2Vec2(10/SCALE, 30/SCALE),
    new b2Vec2(0/SCALE, 150/SCALE),
    new b2Vec2(-10/SCALE, 30/SCALE),
    new b2Vec2(-10/SCALE, -30/SCALE)
  ], false, 1, 0.3);

  createWeldJoint(flipperLeft, leftInnerPin, leftInnerPin.GetWorldCenter());
  createWeldJoint(flipperRight, rightInnerPin, rightInnerPin.GetWorldCenter());
  createRevJoint(polygon, middlePin, true, 0.5, false);
  createRevJoint(flipperLeft, leftPin, true, 1000, true);
  createRevJoint(flipperRight, rightPin, false, 1000, true);

}

function domBox(domObj, isStatic, fGI, rest){
  var domPos = domObj.position();
  var width = domObj.width() / 2;
  var height = domObj.height() / 2;
  var x = (domPos.left) + width;
  var y = (domPos.top) + height;
  var body = createBox(x, y, width, height, isStatic, fGI, rest);
  body.m_userData = {domObj:domObj, width:width, height:height};
  domObj.css({'left':'0px', 'top':'0px'});
  return body.GetBody();
}

function domCircle(domObj, isStatic, fGI, rest){
  var domPos = domObj.position();
  var radius = domObj.width() / 2 ;
  var x = (domPos.left) + radius;
  var y = (domPos.top) + radius;
  var body = createCircle(x, y, radius, isStatic, fGI, rest);
  body.m_userData = {domObj:domObj, width:radius, height:radius};
  domObj.css({'left':'0px', 'top':'0px'});
  return body.GetBody();
}

function domPolygon(domObj, points, isStatic, fGI, rest){
  var domPos = domObj.position();
  var width = domObj.width() / 2;
  var height = domObj.height() / 2;
  var x = (domPos.left) + width;
  var y = (domPos.top) + height;
  var body = createPolygon(points, x, y, isStatic, fGI, rest);
  body.m_userData = {domObj:domObj, width:width, height:height};
  domObj.css({'left':'0px', 'top':'0px'});
  return body.GetBody();
}
function createRevJoint(body, pin, reverse, power, limit) {
  var joint = new b2RevoluteJointDef();
  joint.Initialize(body, pin, pin.GetWorldCenter());
  joint.upperAngle = 35*D2R;
  joint.lowerAngle = -35*D2R;
  joint.enableLimit = limit;
  joint.maxMotorTorque = 5000.0;
  joint.motorSpeed = reverse ? -power : power;
  joint.enableMotor = true;
  world.CreateJoint(joint);
}

function createWeldJoint(body1, body2, vec2Pos) {
  var joint = new b2WeldJointDef();
  joint.Initialize(body1, body2, vec2Pos);
  world.CreateJoint(joint);
}


function createBox(x,y,width,height, isStatic, fGI, rest) {
  var bodyDef = new b2BodyDef();
  bodyDef.type = isStatic ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;
  bodyDef.position.x = x / SCALE;
  bodyDef.position.y = y / SCALE;

  var fixDef = new b2FixtureDef();
  fixDef.density = 10;
  fixDef.friction = 0.5;
  fixDef.restitution = typeof rest !== 'undefined' ? rest : 0.3;
  fixDef.filter.groupIndex = typeof fGI !== 'undefined' ? fGI : 1;
  fixDef.shape = new b2PolygonShape();
  fixDef.shape.SetAsBox(width / SCALE, height / SCALE);
  return world.CreateBody(bodyDef).CreateFixture(fixDef);
}

function createCircle(x, y, r, isStatic, fGI, rest) {
  var bodyDef = new b2BodyDef();
  bodyDef.type = isStatic ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;
  bodyDef.position.x = x / SCALE;
  bodyDef.position.y = y / SCALE;

  var fixDef = new b2FixtureDef();
  fixDef.density = 0.1;
  fixDef.friction = 0.3;
  fixDef.restitution = typeof rest !== 'undefined' ? rest : 0.5;
  fixDef.filter.groupIndex = typeof fGI !== 'undefined' ? fGI : 1;
  fixDef.shape = new b2CircleShape(r / SCALE);
  return world.CreateBody(bodyDef).CreateFixture(fixDef);
}

function createPolygon(pointsArr, x, y, isStatic, fGI, rest){
  var bodyDef = new b2BodyDef();
  bodyDef.type = isStatic ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;
  bodyDef.position.x = x / SCALE;
  bodyDef.position.y = y / SCALE;

  var fixDef = new b2FixtureDef();
  fixDef.density = 10;
  fixDef.friction = 0.5;
  fixDef.restitution = typeof rest !== 'undefined' ? rest : 0.3;
  fixDef.filter.groupIndex = typeof fGI !== 'undefined' ? fGI : 1;
  fixDef.shape = new b2PolygonShape();
  fixDef.shape.SetAsArray(pointsArr);
/*   console.log(fixDef); */
  return world.CreateBody(bodyDef).CreateFixture(fixDef);
}
function addEvents(){
  window.addEventListener("keypress", FlipIt, false);
  window.addEventListener("mousedown", FlipItTap, false);
  window.addEventListener("touchstart", FlipItTap, false);
  box2d_ballContact();
}

function FlipIt(e) {
  console.log('keypress');
  if([32].indexOf(e.keyCode) > -1) {
    console.log('keypress - SPACE');
    e.preventDefault();
    if (!keyPressed) {
      keyPressed = true;
      flipperLeft.ApplyTorque(-100000);
      flipperRight.ApplyTorque(100000);
      setTimeout(function(){keyPressed = false;}, 300);
    }
  }
}

function FlipItTap(e) {
  console.log('TAP');
  if (!keyPressed) {
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
        }, 0);
      }
    }
  };

  this.world.SetContactListener(listener);
}


var world,
    interval,
    canvas,
    ctx,
    blueBall,
    leftInnerPin,
    rightInnerPin,
    leftPin,
    middlePin,
    rightPin,
    flipperLeft,
    flipperRight,
    box1,
    box2,
    listener,
    floor,
    polygon;
var debug = false;
var keyPressed = false;
var SCALE = 30;
var D2R = Math.PI / 180;
var R2D = 180 / Math.PI;
var PI2 = Math.PI * 2;

var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2AABB = Box2D.Collision.b2AABB,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World,
    b2MassData = Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
    b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef,
    b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
    b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint,
    b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
    b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef,
    b2ContactListener = Box2D.Dynamics.b2ContactListener;

$(document).ready(init);

function init() {

  canvas = $("#canvas")[0];

  ctx = canvas.getContext("2d");
  setUpWorld();
  createDOMObjects();
  addEvents();
  update();
  interval = setInterval(update,1000/60);
  resizeHandler();
}

function update() {
  // world.DrawDebugData();
  world.Step(1 / 30, 30, 30);
  drawDOMObjects();
  updateMouseDrag();
  world.ClearForces();

  // ctx.clearRect(0, 0, canvas.width(), canvas.height());
  fps.update(true);
  // fps.draw();
}

function drawDOMObjects() {
  for (var b = world.m_bodyList; b; b = b.m_next) {
    for (var f = b.m_fixtureList; f; f = f.m_next) {
      if (f.m_userData) {
        var x = Math.floor((f.m_body.m_xf.position.x * SCALE) - f.m_userData.width);
        var y = Math.floor((f.m_body.m_xf.position.y * SCALE) - f.m_userData.height);
        var z = 1;
        var r = Math.round(((f.m_body.m_sweep.a + PI2) % PI2) * R2D * 100) / 100;
        var css = {'-webkit-transform':'translate3d(' + x + 'px,' + y + 'px,'+ z + 'px) rotate(' + r  + 'deg)', '-moz-transform':'translate3d(' + x + 'px,' + y + 'px,'+ z + 'px) rotate(' + r  + 'deg)', '-ms-transform':'translate3d(' + x + 'px,' + y + 'px,'+ z + 'px) rotate(' + r  + 'deg)'  , '-o-transform':'translate3d(' + x + 'px,' + y + 'px,'+ z + 'px) rotate(' + r  + 'deg)', 'transform':'translate3d(' + x + 'px,' + y + 'px,'+ z + 'px) rotate(' + r  + 'deg)'};
        f.m_userData.domObj.css(css);
      }
    }
  }
}

function resizeHandler() {
	canvas.attr('width', $('#container').width());
	canvas.attr('height', $('#container').height());
  $(window).bind('resize', resizeHandler);
}
function setUpWorld() {

  world = new b2World(new b2Vec2(0, 10), true);
  var debugDraw = new b2DebugDraw();
  canvas = $("#canvas");
  debugDraw.SetSprite(canvas[0].getContext("2d"));
  debugDraw.SetDrawScale(SCALE);
  debugDraw.SetFillAlpha(0.5);
  debugDraw.SetLineThickness(1.0);
  debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
  world.SetDebugDraw(debugDraw);
  var w = $('#container').width();
  var h = $('#container').height();

  createBox(0, h , w, 2, true, null, 0);
  createBox(0, 0, 2, h, true);
  createBox(w, 0, 2, h, true);
  createBox(0, 0, w, 2, true);
}