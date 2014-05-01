$(document).ready(function() {
  
  // pick a random background
  var setBGImage = function() {
    var bg_image = window.BG_IMAGES[Math.floor(Math.random() * window.BG_IMAGES.length)]
    $('body').css('background', 'url(' + bg_image.replace('dist/', '') + ') no-repeat center center / 100% 100% fixed');
  }
  setBGImage();

  // special stuff just for the landing page
  if (window.BASENAME == 'index') {
    
    // disable scrolling
    $('body').bind('touchmove', function(e){e.preventDefault()});
    $('body').css('overflow', 'hidden');
    
    // vertical center (pity this isn't elegant with css)
    var verticalCenter = function() {
      var windowHeight = $(window).height();
      var navBarHeight = $('.navbar').height();

      var ratio = 0.6;
      var paddingHeight = Math.abs(windowHeight - navBarHeight) / 2.0;
      
      $('.top-padding').height(ratio * paddingHeight);
      $('.bottom-padding').height( (1.0 + (1.0 - ratio)) * paddingHeight);
    }
    setInterval(setBGImage, 7000);
    verticalCenter();
    $(window).resize(verticalCenter);
  }
});
