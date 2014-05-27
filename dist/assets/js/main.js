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

  var origHash = window.location.hash;
  var changeHash = function(hash) {
    window.location.hash = hash;
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
      var canvas = $('#canvas').get(0);
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

      var $loader = $('#loader');

      var _showLoader = function() {
        $loader.show();
      };
      var _hideLoader = function() {
        $loader.hide();
      };

      var posts = window.POSTS;

      // get one post and add it to the page
      var _getPost = function(postURL, callback) {
        callback = callback || pass;

        _showLoader();
        $.get(postURL, function(postHTML) {
          $(postHTML).appendTo('#blog-anchor');
          _hideLoader();

          var id = '#' + $(postHTML).find('a:first').attr('id');
          callback(id);
        });
      };

      // fetch initial posts
      var postsLength = posts.length;

      // number of posts to load
      // pays attention to hash so we stop on the correct post
      var postsToLoad;
      if (origHash.length) {
        postsToLoad = posts.indexOf(_.find(posts, function(post) {
          return post.indexOf(origHash.slice(1)) != -1;
        }));
      }
      if (postsToLoad === undefined || postsToLoad == -1) {
        postsToLoad = 5;
      }

      var _done = _.after(postsToLoad, function() {

        // scroll to the post when done loading
        if (origHash.length) {
          if ($(origHash).get(0)) {
            $(origHash).get(0).scrollIntoView(true);
          }
        }
      });

      // load posts
      var reversePosts = _.clone(posts).reverse();
      var _getInitialPosts = function(callback) {
        _getPost(reversePosts.pop(), function(id) {
          if (reversePosts.length + 1 > postsLength - postsToLoad) {
            _getInitialPosts();
          }
          _done();
        });
      };
      _getInitialPosts();

      $(window).scroll(_.throttle(function() {

        // load posts when scrolled to the bottom
        if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
          _getPost(reversePosts.pop(), function(id) {
            changeHash(id);
          });
        }
        else {

          // change hash as we scroll through posts
          $('.post').each(function() {
            if ($(this).offset().top - 50 < window.pageYOffset && $(this).offset().top + 50 > window.pageYOffset) {
              changeHash($(this).find('a:first').attr('id'));
            }
          });
        }
      }, 50));
    },

    blox: pass
  };

  if (pages.hasOwnProperty(window.BASENAME)) {
    pages[window.BASENAME]();
  }
  setBGImage(chooseRandomImage());
});
