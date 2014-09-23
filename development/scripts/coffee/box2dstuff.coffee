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