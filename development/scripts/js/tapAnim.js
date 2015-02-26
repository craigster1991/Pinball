tapAnim = function(copy, x, y) {
  var c = $('#container');
  var _copy = (typeof copy === 'undefined' || !copy || copy === "") ? 'action' : copy;
  var _class = _copy === "RESPAWN" ? 'bigpunch' : 'punch';
  var div = $('<div class="'+_class+'"><h3>'+_copy+'!</h3></div>');
  c.append(div);
  var _x = x === null ? ( c.offset().left + (c.width()/2) ) - (div.width()/2) : x- (div.width()/2);
  var _y = y === null ? ( c.offset().top + (c.height()/2) ) - (div.height()/2) : y- (div.height()/2);
  div.offset( { top:_y, left:_x } );
  div.fadeOut('slow', function(){
    div.remove();
  });
};