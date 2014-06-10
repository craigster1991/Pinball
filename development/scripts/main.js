
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
	$(window).bind('resize', resizeHandler);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
/*   world.DrawDebugData(); */
  world.Step(1 / 30, 60, 60);
  drawDOMObjects();
  updateMouseDrag();
  world.ClearForces();
/*   fps.update(); */
/*   fps.draw(); */
}

function drawDOMObjects() {
  var i = 0;
  for (var b = world.m_bodyList; b; b = b.m_next) {
    for (var f = b.m_fixtureList; f; f = f.m_next) {
      if (f.m_userData) {
        var x = Math.floor((f.m_body.m_xf.position.x * SCALE) - f.m_userData.width);
        var y = Math.floor((f.m_body.m_xf.position.y * SCALE) - f.m_userData.height);
        var r = Math.round(((f.m_body.m_sweep.a + PI2) % PI2) * R2D * 100) / 100;
        var css = {'-webkit-transform':'translate(' + x + 'px,' + y + 'px) rotate(' + r  + 'deg)', '-moz-transform':'translate(' + x + 'px,' + y + 'px) rotate(' + r  + 'deg)', '-ms-transform':'translate(' + x + 'px,' + y + 'px) rotate(' + r  + 'deg)'  , '-o-transform':'translate(' + x + 'px,' + y + 'px) rotate(' + r  + 'deg)', 'transform':'translate(' + x + 'px,' + y + 'px) rotate(' + r  + 'deg)'};
        f.m_userData.domObj.css(css);
      }
    }
  }
}

function resizeHandler() {
			canvas.attr('width', $(window).width()/1.615);
			canvas.attr('height', $(window).height()/1.13);
		}