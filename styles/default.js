;(function() {
  // Init
  let container = document.getElementById('code-banner-container'),
    inner = document.getElementById('code-banner')

  // Mouse
  let mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function(event) {
      let e = event || window.event
      this.x = e.clientX - this._x
      this.y = (e.clientY - this._y) * -1
    },
    setOrigin: function(e) {
      this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2)
      this._y = e.offsetTop + Math.floor(e.offsetHeight / 2)
    },
    show: function() {
      return '(' + this.x + ', ' + this.y + ')'
    },
  }

  // Track the mouse position relative to the center of the container.
  mouse.setOrigin(container)

  let counter = 0
  let updateRate = 10
  let isTimeToUpdate = function() {
    return counter++ % updateRate === 0
  }

  let onMouseEnterHandler = function(event) {
    update(event)
  }

  let onMouseLeaveHandler = function() {
    inner.style = ''
  }

  let onMouseMoveHandler = function(event) {
    if (isTimeToUpdate()) {
      update(event)
    }
  }

  let update = function(event) {
    mouse.updatePosition(event)
    updateTransformStyle(mouse.x / inner.offsetWidth, mouse.y / inner.offsetWidth)
  }

  let updateTransformStyle = function(x, y) {
    // define style
    let style = `rotateX(${((y + 0.1) * 4).toFixed(2)}deg) rotateY(${(x / 2).toFixed(2)}deg)`
    let shadow = `${-x * 2 + 2}em ${(y + 1) * 4}em 6em -2em rgba(0, 0, 0, 0.5), ${-x + 1}em ${(y + 1) *
      2}em 3.5em -2.5em rgba(0, 0, 0, 0.5)`
    inner.style.transform = style
    inner.style.webkitTransform = style
    inner.style.mozTransform = style
    inner.style.msTransform = style
    inner.style.oTransform = style
    inner.style.boxShadow = shadow
  }

  container.onmouseenter = onMouseEnterHandler
  container.onmouseleave = onMouseLeaveHandler
  container.onmousemove = onMouseMoveHandler
})()
