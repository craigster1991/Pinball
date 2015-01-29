var createBox, createRevJoint;

createRevJoint = function() {
  var joint;
  joint = new b2RevoluteJointDef();
  joint.Initialize(body, pin, pin.GetWorldCenter());
  joint.upperAngle = 35 * D2R;
  joint.lowerAngle = -35 * D2R;
  joint.enableLimit = true;
  joint.maxMotorTorque = 5000.0;
  joint.motorSpeed = (reverse ? -1000 : 1000);
  joint.enableMotor = true;
  return world.CreateJoint(joint);
};

createBox = function(x, y, width, height, isStatic, fGI, rest) {
  var bodyDef, fixDef;
  bodyDef = new b2BodyDef();
  bodyDef.type = (isStatic ? b2Body.b2_staticBody : b2Body.b2_dynamicBody);
  bodyDef.position.x = x / SCALE;
  bodyDef.position.y = y / SCALE;
  fixDef = new b2FixtureDef();
  fixDef.density = 10;
  fixDef.friction = 0.5;
  fixDef.restitution = (typeof rest !== "undefined" ? rest : 0.3);
  fixDef.filter.groupIndex = (typeof fGI !== "undefined" ? fGI : 1);
  fixDef.shape = new b2PolygonShape();
  fixDef.shape.SetAsBox(width / SCALE, height / SCALE);
  return world.CreateBody(bodyDef).CreateFixture(fixDef);
};
