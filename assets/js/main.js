$(document).ready(function() {
  
  var pass = function() {}
  
  var print = function(s) {
    console.log(s)
  }

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

      var interval = 8000;
      var _setBGImage = function() {
        var imagePath = chooseRandomImage();
        setBGImage(imagePath);
        setTimeout(_setBGImage, interval);
      };
      _setBGImage();
    },
    
    blox: pass
  }

  if (pages.hasOwnProperty(window.BASENAME)) {
    pages[window.BASENAME]();
  }
  else {
    setBGImage(chooseRandomImage());
  }
});
