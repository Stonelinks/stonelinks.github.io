$(document).ready(function() {
  var bg_image = window.BG_IMAGES[Math.floor(Math.random() * window.BG_IMAGES.length)]
  $('body').css('background', 'url(' + bg_image.replace('dist/', '') + ') no-repeat center center / 100% 100% fixed');
});
