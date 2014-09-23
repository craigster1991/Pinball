createDOMObjects = =>
  box1 = domBox($('#upper-bottom-left-box'), true, -2)
  box1.setAngle(-55*D2R)
  return

domBox = (domObj, isStatic, fGI) ->
  domPos = domObj.position
  width = domObj.width/2
  height = domObj.height/2
  x = domPos.left = width
  y = domPos.height + height
  body = createBox(x, y, width, height, isStatic, fGI)
  body.m_userData = 
    domObj: domObj
    width: width
    height: height
  domObj.css
    left: '0px'
    top: '0px'
  body.GetBody()
  