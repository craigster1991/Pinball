function setUpWorld() {

  world = new b2World(new b2Vec2(0, 10), true);
  var debugDraw = new b2DebugDraw();
  canvas = document.getElementById("canvas");
  debugDraw.SetSprite(canvas.getContext("2d"));
  debugDraw.SetDrawScale(SCALE);
  debugDraw.SetFillAlpha(0.5);
  debugDraw.SetLineThickness(1.0);
  debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
  world.SetDebugDraw(debugDraw);
  var w = document.getElementById('container').style.width;
  var h = document.getElementById('container').style.height;

  createBox(0, h , w, 2, true, null, 0);
  createBox(0, 0, 2, h, true);
  createBox(w, 0, 2, h, true);
  createBox(0, 0, w, 2, true);
}