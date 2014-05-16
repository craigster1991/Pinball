var fps = {
  current: 0,
  last: 0,
  lastUpdated: Date.now(),
  draw: function() {
/*     ctx.fillStyle = '#FFF'; */
/*     ctx.fillRect(0, 0, 100, 20); */
    ctx.font = '40pt Arial';
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'top';
    ctx.fillText(fps.last + 'fps', 5, 3);
  },
  update: function() {
    fps.current ++;
    if (Date.now() - fps.lastUpdated >= 1000) {
      fps.last = fps.current;
      fps.current = 0;
      fps.lastUpdated = Date.now();
    }
  }
};