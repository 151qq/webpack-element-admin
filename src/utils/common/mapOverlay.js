function WindowOverlay (center, opts) {
  this._center = center
  this._width = opts.width || 140
  this._height = opts.height || 100
  this._message = opts.message || ''
  this._color = opts.color || '#ffffff'
  this._template = opts.template || this._message
}
// 继承API的BMap.Overlay
WindowOverlay.prototype = new window.BMap.Overlay()

// 实现初始化方法
WindowOverlay.prototype.initialize = function (map) {
  // 保存map对象实例
  this._map = map
  // 创建div元素，作为自定义覆盖物的容器
  var div = document.createElement('div')
  div.className = 'info-box'
  div.style.position = 'absolute'
  // 可以根据参数设置元素外观
  div.style.width = this._width === 'auto' ? this._width : this._width + 'px'
  div.style.height = this._height + 'px'
  div.style.background = this._color
  div.style.borderRadius = '5px'

  var botB = document.createElement('div')
  botB.style.width = '0'
  botB.style.height = '0'
  botB.style.borderLeft = '10px solid transparent'
  botB.style.borderRight = '10px solid transparent'
  botB.style.borderTop = '15px solid ' + this._color
  botB.style.margin = '-8px auto 0'

  div.appendChild(this._template)
  div.appendChild(botB)
  // 将div添加到覆盖物容器中
  map.getPanes().markerPane.appendChild(div)
  this._clientWhidth = div.clientWidth
  this._clientHeight = div.clientHeight
  // 保存div实例
  this._div = div
  // 需要将div元素作为方法的返回值，当调用该覆盖物的show
  // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
  return div
}

// 实现绘制方法
WindowOverlay.prototype.draw = function () {
  // 根据地理坐标转换为像素坐标，并设置给容器
  var position = this._map.pointToOverlayPixel(this._center)
  this._div.style.left = position.x - this._clientWhidth / 2 + 'px'
  this._div.style.top = position.y - this._clientHeight - 13 + 'px'
}

export default WindowOverlay
