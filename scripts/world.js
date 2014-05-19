function setUpWorld() {

  world = new b2World(new b2Vec2(0, 10), true);
  
  var w = $('#container').width(); 
  var h = $('#container').height();
  
  createBox(0, h , w, 2, true, null, 0);
  createBox(0, 0, 2, h, true);
  createBox(w, 0, 2, h, true);
  createBox(0, 0, w, 2, true);
}