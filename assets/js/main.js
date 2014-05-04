$(document).ready(function() {

  var chooseRandomImage = function() {
    return window.BG_IMAGES[Math.floor(Math.random() * window.BG_IMAGES.length)].replace('dist/', '');
  };

  var setBGImage = function(imageURL) {

    // specifically DONT use jquery here since the image doesn't always load smoothly
    document.body.style.backgroundImage = 'url(\'' + imageURL + '\')';
  };

  if (window.BASENAME == 'index') {

    // disable scrolling
    $('body').bind('touchmove', function(e) {e.preventDefault()});
    $('body').css('overflow', 'hidden');

    // vertical center (pity this isn't elegant with css)
    var verticalCenter = function() {
      var windowHeight = $(window).height();
      var navBarHeight = $('.navbar').height();

      var ratio = 0.6;
      var paddingHeight = Math.abs(windowHeight - navBarHeight) / 2.0;

      $('.top-padding').height(ratio * paddingHeight);
      $('.bottom-padding').height((1.0 + (1.0 - ratio)) * paddingHeight);
    };

    verticalCenter();
    $(window).resize(verticalCenter);

    var interval = 6600;
    var _setBGImage = function() {
      var imagePath = chooseRandomImage();
      setBGImage(imagePath);
      setTimeout(_setBGImage, interval);
    };
    _setBGImage();

  }
  else {
    setBGImage(chooseRandomImage());
  }
});
