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
  createRevJoint(polygon, middlePin, true, 8, false);
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