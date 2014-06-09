function createRevJoint(body, pin, reverse) {
  var joint = new b2RevoluteJointDef;
  joint.Initialize(body, pin, pin.GetWorldCenter());
  joint.upperAngle = 35*D2R;
  joint.lowerAngle = -35*D2R;
  joint.enableLimit = true;
  joint.maxMotorTorque = 7000.0;
  joint.motorSpeed = reverse ? -7000 : 7000;
  joint.enableMotor = true;
  world.CreateJoint(joint);
}

function createWeldJoint(body1, body2, vec2Pos) {
  var joint = new b2WeldJointDef();
  joint.Initialize(body1, body2, vec2Pos);
  world.CreateJoint(joint);
}


function createBox(x,y,width,height, static, fGI, rest) {
  var bodyDef = new b2BodyDef;
  bodyDef.type = static ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;
  bodyDef.position.x = x / SCALE;
  bodyDef.position.y = y / SCALE;
  
  var fixDef = new b2FixtureDef;
  fixDef.density = 10;
  fixDef.friction = 0.5;
  fixDef.restitution = typeof rest !== 'undefined' ? rest : 0.3;
  fixDef.filter.groupIndex = typeof fGI !== 'undefined' ? fGI : 1;
  fixDef.shape = new b2PolygonShape;
  fixDef.shape.SetAsBox(width / SCALE, height / SCALE);
  return world.CreateBody(bodyDef).CreateFixture(fixDef);
}

function createCircle(x, y, r, static, fGI, rest) {
  var bodyDef = new b2BodyDef;
  bodyDef.type = static ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;
  bodyDef.position.x = x / SCALE;
  bodyDef.position.y = y / SCALE;
  
  var fixDef = new b2FixtureDef;
  fixDef.density = 0.1;
  fixDef.friction = 0.3;
  fixDef.restitution = typeof rest !== 'undefined' ? rest : 0.5;
  fixDef.filter.groupIndex = typeof fGI !== 'undefined' ? fGI : 1;
  fixDef.shape = new b2CircleShape(r / SCALE);
  return world.CreateBody(bodyDef).CreateFixture(fixDef);
}

function createPolygon(pointsArr, x, y, static, fGI, rest){
  var bodyDef = new b2BodyDef;
  bodyDef.type = static ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;
  bodyDef.position.x = x / SCALE;
  bodyDef.position.y = y / SCALE;
  
  var fixDef = new b2FixtureDef;
  fixDef.density = 10;
  fixDef.friction = 0.5;
  fixDef.restitution = typeof rest !== 'undefined' ? rest : 0.3;
  fixDef.filter.groupIndex = typeof fGI !== 'undefined' ? fGI : 1;
  fixDef.shape = new b2PolygonShape;
  fixDef.shape.SetAsArray(pointsArr);
  return world.CreateBody(bodyDef).CreateFixture(fixDef);
}