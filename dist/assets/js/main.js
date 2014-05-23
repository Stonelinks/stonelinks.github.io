$(document).ready(function() {

  var pass = function() {};

  var print = function(s) {
    console.log(s);
  };

  var chooseRandomImage = function() {
    return window.BG_IMAGES[Math.floor(Math.random() * window.BG_IMAGES.length)].replace('dist/', '');
  };

  var setBGImage = function(imageURL) {

    // specifically DON'T use jquery here since the image doesn't always load smoothly
    document.body.style.backgroundImage = 'url(\'' + imageURL + '\')';
  };

  var pages = {

    index: function() {

      // disable scrolling
      $('body').bind('touchmove', function(e) {e.preventDefault()});
      $('body').css('overflow', 'hidden');

      // vertical center (pity this isn't elegant with css)
      var verticalCenter = function() {
        var windowHeight = $(window).height();
        var landingHeight = $('.landing-navbar-wrapper').height();

        var ratio = 0.6;
        var paddingHeight = Math.abs(windowHeight - landingHeight) / 2.0;

        $('.top-padding').height(ratio * paddingHeight);
        $('.bottom-padding').height((1.0 + (1.0 - ratio)) * paddingHeight);
      };

      verticalCenter();
      $(window).resize(verticalCenter);

      var canvas = $('#canvas')[0];
      var ctx = canvas.getContext('2d');

      // requestAnimFrame shim
      var requestAnimFrame = (function()
      {
         return window.requestAnimationFrame ||
                 window.webkitRequestAnimationFrame ||
                 window.mozRequestAnimationFrame ||
                 window.oRequestAnimationFrame ||
                 window.msRequestAnimationFrame ||
                 function(callback, frameOffset)
                 {
                     window.setTimeout(callback, frameOffset);
                 };
      })();

      var drawStuff = function() {

        var width = canvas.width;
        var height = canvas.height;

        // setup aliases
        var Rnd = Math.random,
            Sin = Math.sin,
            Floor = Math.floor;

        // constants and storage for objects that represent star positions
        var warpZ = 16,
            units = 200,
            Z = 0.025 + (1 / 25 * 2);

        // function to reset a star object
        function resetstar(a)
        {
           a.x = (Rnd() * width - (width * 0.5)) * warpZ;
           a.y = (Rnd() * height - (height * 0.5)) * warpZ;
           a.z = warpZ;
           a.px = 0;
           a.py = 0;
        }

        // initialisation
        if (typeof stars === 'undefined')
        {
           stars = [];
           // initial star setup
           for (var i = 0, n; i < units; i++)
           {
              n = {};
              resetstar(n);
              stars.push(n);
           }
           cycle = 0;
        }

        // star rendering
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, width, height);

        var cx = width / 2,
            cy = height / 2;

        // update all stars
        var sat = Floor(Z * 500);       // Z range 0.01 -> 0.5
        if (sat > 100) sat = 100;
        for (var i = 0; i < units; i++)
        {
           var n = stars[i],            // the star
               xx = n.x / n.z,          // star position
               yy = n.y / n.z,
               e = (1.0 / n.z + 1) * 2;   // size i.e. z

           if (n.px)
           {
              // hsl colour from a sine wave
              ctx.strokeStyle = 'hsl(' + ((cycle * i) % 360) + ',80%,80%)';
              ctx.lineWidth = e;
              ctx.beginPath();
              ctx.moveTo(xx + cx, yy + cy);
              ctx.lineTo(n.px + cx, n.py + cy);
              ctx.stroke();
           }

           // update star position values with new settings
           n.px = xx;
           n.py = yy;
           n.z -= Z;

           // reset when star is out of the view field
           if (n.z < Z || n.px > width || n.py > height)
           {
              // reset star
              resetstar(n);
           }
        }

        // colour cycle sinewave rotation
        cycle += 0.01;

        requestAnimFrame(drawStuff);

      };

      var resizeCanvas = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        drawStuff();
      };
      resizeCanvas();
      $(window).resize(resizeCanvas);
    },

    blox: pass
  };

  if (pages.hasOwnProperty(window.BASENAME)) {
    pages[window.BASENAME]();
  }
  else {
    setBGImage(chooseRandomImage());
  }
});
