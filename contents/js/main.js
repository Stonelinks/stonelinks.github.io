$(document).ready(function () {

    switch (window.BASENAME) {

        case 'index':
            $("html,body").css({
                height: '100%'
            });
            break;
        case 'luke':
            //setBGImage(chooseRandomImage());
            var jumbotron = $('.about-jumbotron');
            if (jumbotron.get(0) !== undefined) {
                var _origPosition = jumbotron.css('background-position').split('% ');
                var _origX = parseInt(_origPosition[0]);
                var _origY = parseInt(_origPosition[1].replace('%', ''));
                var _moveBackground = function (e) {
                    var scale = 25;
                    jumbotron.css({
                        'background-position': (_origX + (scale / ($(window).width() / e.pageX))) + '% ' + (_origY + (scale / ($(window).height() / e.pageY))) + '%'
                    });
                };

                $(document).mousemove(_moveBackground);
            }

            var popovers = [
                {
                    selector: '.microcontrollers',
                    image: '/images/misc/IMG_0184-1024x682.jpg',
                    link: '/projects/robots/index.html#Litec-Blimp-2010',
                    title: 'Intel 8051 and PID loops on a blimp'
                },
                {
                    selector: '.battlebot',
                    image: '/images/projects/battlebot-gallery/101.jpg',
                    link: '/projects/battlebots/index.html',
                    title: 'Battlebot concept'
                },
                {
                    selector: '.harvard',
                    image: '/images/projects/amf/chamber.png',
                    link: '/projects/amf/index.html',
                    title: 'Automated Multilayer Fabrication at Harvard'
                },
                {
                    selector: '.boat',
                    image: '/images/misc/AIboat.jpg',
                    link: '/projects/robots/index.html#AI-Autonomous-Boat-2007',
                    title: 'ASP Autonomous Boat'
                },
                {
                    selector: '.ied',
                    image: '/images/projects/ied-robot.jpg',
                    link: '/projects/robots/index.html#IED-Border-Patrol-Robot-2010',
                    title: 'IED Border Patrol Robot'
                },
                {
                    selector: '.anybots',
                    image: '/images/projects/anybots/qb.jpg',
                    link: '/projects/anybots/index.html',
                    title: 'Anybots Telepresence'
                },
                {
                    selector: '.wingbox',
                    image: '/images/projects/boeing/screenshot.png',
                    link: '/projects/boeing/index.html',
                    title: 'Boeing Robotic Wingbox'
                },
                {
                    selector: '.camera',
                    image: '/images/misc/tld.png',
                    link: '/tag/computer%20vision/1/',
                    title: 'Tag: Computer vision'
                },
                {
                    selector: '.web',
                    image: '/images/projects/stonelinks-web-framework.png',
                    link: '/tag/web%20development/1/',
                    title: 'Tag: Web development'
                },
                {
                    selector: '.plane',
                    image: '/images/posts/IMG_20140623_145234.jpg',
                    link: '/tag/airplane/1/',
                    title: 'Tag: Airplane'
                }
            ];

            $('body').append($('<div id="#preloaded-images"></div>'));

            $('#preloaded-images').imagesLoaded(function () {
                $('#preloaded-images').hide();

                _.forEach(popovers, function (popover) {
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
                    $(document).click(function () {
                        _.forEach(popovers, function (popover) {
                            $(popover.selector).popover('hide');
                        });
                    });
                });
            });

            $('#preloaded-images').html(_.map(popovers, function (popover) {
                return '<img width="1" height="1" src="' + popover.image + '">';
            }).join(''));
            break;

        case 'projects':
            //setBGImage(chooseRandomImage());

            var $container = $('#projects');

            $container.imagesLoaded(function () {

                $container.isotope({
                    layoutMode: 'packery',
                    packery: {
                        columnWidth: '.grid-sizer',
                        gutter: '.gutter-sizer'
                    }
                });
                $('#project-filters').on('click', '.tag', function () {
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
            break;

        case 'projects/mindshare/index':
            //setBGImage(chooseRandomImage());
            $('h3').each(function () {
                var $this = $(this);
                $this.css('margin-top', '200px');
                $('#mindshare-archive-anchor').append($('<li><a href="#' + $this.attr('id') + '"><b>' + $this.text() + '</b></a></li>'));
            });
            break;

        case 'projects/robots/index':
            //setBGImage(chooseRandomImage());
            $('<div id="ied-gallery"></div>').insertAfter($('.box .media-container:first'));
            break;

        case 'posts/interview/index':
            //setBGImage(chooseRandomImage());

            var showButton = '<button type="button" class="btn btn-default show-answer">Click for answer</a>';

            $('.interview-answer').each(function () {
                $(showButton).insertAfter($(this));
            });

            $('.show-answer').each(function () {
                $(this).click(function () {
                    $(this).hide().prev('.interview-answer').show();
                });
            });

            var _hideAll = function () {
                $('.interview-answer').hide();
                $('.show-answer').show();
            };
            $('.btn.hide-all').click(_hideAll);

            var _showAll = function () {
                $('.interview-answer').show();
                $('.show-answer').hide();
            };
            $('.btn.show-all').click(_showAll);

            _hideAll();
            break;

        default:
        //setBGImage(chooseRandomImage());
    }

    if (window.hasOwnProperty('GALLERY')) {
        $(window.GALLERY.anchor).attr('id', 'links').html(_.map(window.GALLERY.images, function (image, index) {
            return '<a class="gallery-link" href="' + image + '" data-gallery><img src="' + image + '"></a>';
        }));
    }

    $('.external-links a').each(function () {
        $(this).attr('target', '_blank');
    });
});