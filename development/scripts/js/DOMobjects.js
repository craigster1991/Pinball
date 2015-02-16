function createDOMObjects() {
  box1 = domBox(document.getElementById('upper-bottom-left-box'), true, -2);
  box1.SetAngle(-55*D2R);
  box2 = domBox(document.getElementById('upper-bottom-right-box'), true, -2);
  box2.SetAngle(55*D2R);

  flipperLeft = domBox(document.querySelector('.f-left'), false, -2);
  flipperRight = domBox(document.querySelector('.f-right'), false, -2);
  blueBall = domCircle(document.querySelector('.circle'), false, -1, 0.5);
  leftInnerPin = domCircle(document.querySelector('.static-circle-il'), false, -2);
  rightInnerPin = domCircle(document.querySelector('.static-circle-ir'), false, -2);
  leftPin = domCircle(document.querySelector('.static-circle-l'), true, -2);
  rightPin = domCircle(document.querySelector('.static-circle-r'), true, -2);
  middlePin = domCircle(document.querySelector('.centrepin'), true, -2);
  floor = domBox(document.getElementById('floor'), true);
  polygon = domPolygon(document.getElementById('polygon'), [
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
  // var domPos = domObj.position();
  var width = domObj.style.width / 2;
  var height = domObj.style.height / 2;
  var x = (domObj.offsetLeft) + width;
  var y = (domObj.offsetTop) + height;
  var body = createBox(x, y, width, height, isStatic, fGI, rest);
  body.m_userData = {domObj:domObj, width:width, height:height};
  // domObj.css({'left':'0px', 'top':'0px'});
  domObj.style.left = "0px";
  domObj.style.top = "0px";
  return body.GetBody();
}

function domCircle(domObj, isStatic, fGI, rest){
  // var domPos = domObj.position();
  var radius = domObj.style.width / 2 ;
  var x = (domObj.offsetLeft) + radius;
  var y = (domObj.offsetTop) + radius;
  var body = createCircle(x, y, radius, isStatic, fGI, rest);
  body.m_userData = {domObj:domObj, width:radius, height:radius};
  // domObj.css({'left':'0px', 'top':'0px'});
  domObj.style.left = "0px";
  domObj.style.top = "0px";
  return body.GetBody();
}

function domPolygon(domObj, points, isStatic, fGI, rest){
  // var domPos = domObj.position();
  var width = domObj.style.width / 2;
  var height = domObj.style.height / 2;
  var x = (domObj.offsetLeft) + width;
  var y = (domObj.offsetTop) + height;
  var body = createPolygon(points, x, y, isStatic, fGI, rest);
  body.m_userData = {domObj:domObj, width:width, height:height};
  // domObj.css({'left':'0px', 'top':'0px'});
  domObj.style.left = "0px";
  domObj.style.top = "0px";
  return body.GetBody();
}