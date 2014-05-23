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

      // requestAnimFrame shim
      var requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback, frameOffset) {
            window.setTimeout(callback, frameOffset);
          };
      })();

      // a nice canvas / background image based crossfading image switcher
      var canvas = $('#canvas')[0];
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      var ctx = canvas.getContext('2d');
      var img = new Image();
      var alpha = 0.0;
      var speed = 0.05;
      var delta = speed;

      var changeImage = false;

      // draw the canvas
      var drawStuff = function() {

        // compute new alpha
        alpha += delta;

        // draw faded image`
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = alpha;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // stop fading if all the way faded in or out
        if (alpha >= 1.0) {
          alpha = 1.0;
          delta = 0.0;
        }
        else if (alpha < 0) {
          alpha = 0.0;
          delta = 0.0;
        }

        if (changeImage) {
          changeImage = false;
          img.src = chooseRandomImage();
          delta = -speed;
        }

        // repeat forever
        requestAnimFrame(drawStuff);
      };

      // when the image is done loading, set alpha and delta to fade it in
      // periodically change the image, setting the old one as the background image of the page
      img.onload = function() {
        alpha = 0.0;
        delta = speed;
        setTimeout(function() {
          setBGImage(img.src);
          changeImage = true;
        }, 6000);
      };
      img.src = chooseRandomImage();
      setBGImage(img.src);

      // update canvas size
      var resizeCanvas = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resizeCanvas();
      $(window).resize(resizeCanvas);

      // start
      drawStuff();
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
