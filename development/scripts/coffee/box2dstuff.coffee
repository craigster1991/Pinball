createRevJoint = () ->
  joint = new b2RevoluteJointDef()
  joint.Initialize body, pin, pin.GetWorldCenter()
  joint.upperAngle = 35*D2R
  joint.lowerAngle = -35*D2R
  joint.enableLimit = true
  joint.maxMotorTorque = 5000.0
  joint.motorSpeed = (if reverse then -1000 else 1000)
  joint.enableMotor = true
  world.CreateJoint joint

createBox = (x, y, width, height, isStatic, fGI, rest) ->
  bodyDef = new b2BodyDef()
  bodyDef.type = (if isStatic then b2Body.b2_staticBody else b2Body.b2_dynamicBody)
  bodyDef.position.x = x / SCALE
  bodyDef.position.y = y / SCALE
  fixDef = new b2FixtureDef()
  fixDef.density = 10
  fixDef.friction = 0.5
  fixDef.restitution = (if typeof rest isnt "undefined" then rest else 0.3)
  fixDef.filter.groupIndex = (if typeof fGI isnt "undefined" then fGI else 1)
  fixDef.shape = new b2PolygonShape()
  fixDef.shape.SetAsBox width / SCALE, height / SCALE
  world.CreateBody(bodyDef).CreateFixture fixDef