$(document).ready(function() {

  var pass = function() {};

  var print = function(s) {
    console.log(s);
  };

  var chooseRandomImage = function() {
    return window.BG_IMAGES[Math.floor(Math.random() * window.BG_IMAGES.length)].replace('dist/assets', window.ASSETS);
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

      // a nice canvas based crossfading image switcher
      var canvas = $('#canvas')[0];
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      var ctx = canvas.getContext('2d');
      var img = new Image();
      var bgImg = new Image();
      var alpha = 0.0;
      var speed = 0.05;
      var delta = speed;

      // draw the canvas
      var drawStuff = function() {

        // compute new alpha
        alpha += delta;

        // clip alpha and stop fading if all the way faded in or out
        if (alpha >= 1.0) {
          alpha = 1.0;
          delta = 0.0;
        }
        else if (alpha < 0) {
          alpha = 0.0;
          delta = 0.0;
        }

        // clear everything
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // background at full opacity
        ctx.save();
        ctx.globalAlpha = 1.0;
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        ctx.restore();

        // faded image
        ctx.globalAlpha = alpha;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // repeat forever
        requestAnimFrame(drawStuff);
      };

      // fade images back and fourth
      img.onload = function() {

        // fade image in
        alpha = 0.0;
        delta = speed;

        // switch every six seconds
        setTimeout(function() {
          bgImg.src = img.src;
        }, 6000);
      };

      bgImg.onload = function() {

        // fade image out
        alpha = 1.0;
        delta = -speed;

        img.src = chooseRandomImage();
      };

      img.src = bgImg.src = chooseRandomImage();

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

    blog: function() {

      var posts = window.POSTS;

      // get one post and add it to the page
      var _getPost = function(postURL, callback) {
        callback = callback || pass;
        $.get(postURL, function(postHTML) {
          $(postHTML).appendTo('#blog-anchor');
          callback();
        });
      };

      // fetch initial posts
      var postsToLoad = 3;
      var postsLength = posts.length;
      var reversePosts = _.clone(posts).reverse();
      var _getInitialPosts = function() {
        _getPost(reversePosts.pop(), function() {
          if (reversePosts.length + 1 > postsLength - postsToLoad) {
            _getInitialPosts();
          }
        });
      };
      _getInitialPosts();

      // load posts when scrolled to the bottom
      $(window).scroll(_.throttle(function() {
        if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
          _getPost(reversePosts.pop());
        }
      }, 500));
    },

    blox: pass
  };

  if (pages.hasOwnProperty(window.BASENAME)) {
    pages[window.BASENAME]();
  }
  setBGImage(chooseRandomImage());
});
