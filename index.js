(function() {
    var init, rotate, start, stop, active = false,
      angle = 0,
      rotation = 0,
      startAngle = 0,
      center = {
        x: 0,
        y: 0
      },
      R2D = 180 / Math.PI,
      rot = document.getElementById('rotate');
  
    init = function() {
      rot.addEventListener("touchstart", start, false);
      $(document).bind('touchmove', function(event) {
        if (active === true) {
          event.preventDefault();
          rotate(event);
        }
      });
      $(document).bind('touchend', function(event) {
        event.preventDefault();
        stop(event);
      });
    };
  
    start = function(e) {
      e.preventDefault();
      var bb = this.getBoundingClientRect(),
        t = bb.top,
        l = bb.left,
        h = bb.height,
        w = bb.width,
        x, y;
      center = {
        x: l + (w / 2),
        y: t + (h / 2)
      };
      x = e.touches[0].clientX - center.x;
      y = e.touches[0].clientY - center.y;
      startAngle = R2D * Math.atan2(y, x);
      return active = true;
    };
  
    rotate = function(e) {
      e.preventDefault();
      var x = e.touches[0].clientX - center.x,
        y = e.touches[0].clientY - center.y,
        d = R2D * Math.atan2(y, x);
      rotation = d - startAngle;
  
      let val = angle + rotation % 360;
      if (val < 0) {
        val = 360 + val;
      }
      val = (val / 360) * 100;
      $('#rotate-value').val(Math.round(val));
  
      return rot.style.transform = "rotate(" + (angle + rotation) + "deg)";
    };
  
    stop = function() {
      angle += rotation;
      return active = false;
    };
  
    init();
  }).call(this);