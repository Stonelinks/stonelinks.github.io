var pass = function() {};

var print = function(s) {
  console.log(s);
};

var chooseRandomImage = function() {
  return window.BG_IMAGES[Math.floor(Math.random() * window.BG_IMAGES.length)];
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

    // vertical center (pity this still isn't elegant with css)
    var _verticalCenter = function() {
      var windowHeight = $(window).height();
      var landingHeight = $('.landing-navbar-wrapper').height();

      var ratio = 0.6;
      var paddingHeight = Math.abs(windowHeight - landingHeight) / 2.0;

      $('.top-padding').height(ratio * paddingHeight);
      $('.bottom-padding').height((1.0 + (1.0 - ratio)) * paddingHeight);
    };
    _verticalCenter();
    $(window).resize(_verticalCenter);

    // requestAnimationFrame shim
    var _requestAnimationFrame = (function() {
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
    var imagesShown = {};
    bgImgNotSet = true;
    var alpha = 0.0;
    var speed = 0.05;
    var delta = speed;

    // choose a random image (but avoid repeats)
    var _chooseImage = function() {
      var candidate = chooseRandomImage();

      window.imagesShown = imagesShown;

      if (_.isEqual(_.keys(imagesShown).sort(), window.BG_IMAGES)) {
        imagesShown = {};
      }

      while (imagesShown.hasOwnProperty(candidate)) {
        candidate = chooseRandomImage();
      }
      imagesShown[candidate] = true;
      return candidate;
    };

    // draw the canvas
    var _drawStuff = function() {

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
      if (!bgImgNotSet) {
        ctx.save();
        ctx.globalAlpha = 1.0;
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        ctx.restore();
      }

      // faded image
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // repeat forever
      _requestAnimationFrame(_drawStuff);
    };

    // fade images back and fourth
    img.onload = function() {

      // fade image in
      alpha = 0.0;
      delta = speed;

      // switch every six seconds
      setTimeout(function() {
        bgImgNotSet = false;
        bgImg.src = img.src;
      }, 3000);
    };

    bgImg.onload = function() {

      // fade image out
      alpha = 1.0;
      delta = -speed;

      img.src = _chooseImage();
    };

    img.src = _chooseImage();

    // update canvas size
    var _resizeCanvas = function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    _resizeCanvas();
    $(window).resize(_resizeCanvas);

    // start
    _drawStuff();
  },

  blox: pass,

  luke: function() {
    setBGImage(chooseRandomImage());
    var jumbotron = $('.about-jumbotron');
    if (jumbotron.get(0) !== undefined) {
      var _origPosition = jumbotron.css('background-position').split('% ');
      var _origX = parseInt(_origPosition[0]);
      var _origY = parseInt(_origPosition[1].replace('%', ''));
      var _moveBackground = function(e) {
        var scale = 25;
        jumbotron.css({
          'background-position': (_origX + (scale / ($(window).width() / e.pageX))) + '% ' + (_origY + (scale / ($(window).height() / e.pageY))) + '%'
        });
      };

      $(document).mousemove(_moveBackground);

      // TODO
      // document.ontouchmove = function(e) {
        // _moveBackground(e);
      // }
    }

    var popovers = [
      {
        selector: '.microcontrollers',
        image: '/img/misc/IMG_0184-1024x682.jpg',
        link: '/projects/robots/index.html#Litec-Blimp-2010',
        title: 'Intel 8051 and PID loops on a blimp'
      },
      {
        selector: '.battlebot',
        image: '/img/projects/battlebot-gallery/101.jpg',
        link: '/projects/battlebots/index.html',
        title: 'Battlebot concept'
      },
      {
        selector: '.harvard',
        image: '/img/projects/amf/chamber.png',
        link: '/projects/amf/index.html',
        title: 'Automated Multilayer Fabrication at Harvard'
      },
      {
        selector: '.boat',
        image: '/img/misc/AIboat.jpg',
        link: '/projects/robots/index.html#AI-Autonomous-Boat-2007',
        title: 'ASP Autonomous Boat'
      },
      {
        selector: '.ied',
        image: '/img/projects/ied-robot.jpg',
        link: '/projects/robots/index.html#IED-Border-Patrol-Robot-2010',
        title: 'IED Border Patrol Robot'
      },
      {
        selector: '.anybots',
        image: '/img/projects/anybots/qb.jpg',
        link: '/projects/anybots/index.html',
        title: 'Anybots Telepresence'
      },
      {
        selector: '.wingbox',
        image: '/img/projects/boeing/screenshot.png',
        link: '/projects/boeing/index.html',
        title: 'Boeing Robotic Wingbox'
      },
      {
        selector: '.camera',
        image: '/img/misc/tld.png',
        link: '/tag/computer%20vision/1/',
        title: 'Tag: Computer vision'
      },
      {
        selector: '.web',
        image: '/img/projects/stonelinks-web-framework.png',
        link: '/tag/web%20development/1/',
        title: 'Tag: Web development'
      },
      {
        selector: '.plane',
        image: '/img/posts/IMG_20140623_145234.jpg',
        link: '/tag/airplane/1/',
        title: 'Tag: Airplane'
      }
    ];

    $('body').append($('<div id="#preloaded-images"></div>'));

    $('#preloaded-images').imagesLoaded(function() {
      $('#preloaded-images').hide();

      _.forEach(popovers, function(popover) {
        var _popoverOptions = {
          container: 'body',
          placement: 'top',
          title: popover.title,
          content: _.template('<a href="<%= link %>" target="_blank"><img class="img-responsive" src="<%= image %>"></a>', {
            image: popover.image,
            link: popover.link
          }),
          delay: {
            show: 100,
            hide: 600
          },
          trigger: 'hover',
          html: true
        };
        $(popover.selector).attr('href', popover.link).popover(_popoverOptions);
      });
    });

    $('#preloaded-images').html(_.map(popovers, function(popover) {
      return '<img width="1" height="1" src="' + popover.image + '">';
    }).join(''));
  },

  projects: function() {
    setBGImage(chooseRandomImage());

    var $container = $('#projects');

    $container.imagesLoaded(function() {

      $container.isotope({
        layoutMode: 'packery',
        packery: {
          columnWidth: '.grid-sizer',
          gutter: '.gutter-sizer'
        }
      });
      $('#project-filters').on('click', '.tag', function() {
        var filterValue = $(this).attr('data-filter');
        filterValue = filterValue == '*' ? filterValue : '.' + filterValue;
        $container.isotope({
          filter: '*'
        }).isotope({
          filter: filterValue
        });
      });
      $('.grid-sizer .gutter-sizer').hide();
    });
  },

  'projects/mindshare/index': function() {
    setBGImage(chooseRandomImage());
    $('h3').each(function() {
      var $this = $(this);
      $this.css('margin-top', '200px');
      $('#mindshare-archive-anchor').append($('<li><a href="#' + $this.attr('id') + '"><b>' + $this.text() + '</b></a></li>'));
    });
  },

  'projects/robots/index': function() {
    setBGImage(chooseRandomImage());
    $('<div id="ied-gallery"></div>').insertAfter($('.box .media-container:first'));
  },

  'posts/interview/index': function() {
    setBGImage(chooseRandomImage());

    var showButton = '<button type="button" class="btn btn-default show-answer">Click for answer</a>';

    $('.interview-answer').each(function() {
      $(showButton).insertAfter($(this));
    });

    $('.show-answer').each(function() {
      $(this).click(function() {
        $(this).hide().prev('.interview-answer').show();
      });
    });

    var _hideAll = function() {
      $('.interview-answer').hide();
      $('.show-answer').show();
    };
    $('.btn.hide-all').click(_hideAll);

    var _showAll = function() {
      $('.interview-answer').show();
      $('.show-answer').hide();
    };
    $('.btn.show-all').click(_showAll);

    _hideAll();
  }
};

$(document).ready(function() {
  window.BG_IMAGES = window.BG_IMAGES.sort();
  if (pages.hasOwnProperty(window.BASENAME)) {
    pages[window.BASENAME]();
  }
  else {
    setBGImage(chooseRandomImage());
  }

  if (window.hasOwnProperty('GALLERY')) {
    $(window.GALLERY.anchor).attr('id', 'links').html(_.map(window.GALLERY.images, function(image, index) {
      return '<a class="gallery-link" href="' + image + '" data-gallery><img src="' + image + '"></a>';
    }));
  }

  $('.external-links a').each(function() {
    $(this).attr('target', '_blank');
  });
});
