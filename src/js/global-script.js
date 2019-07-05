// Если на проекте jQuery
$( document ).ready(function() {

    $("#banner-carousel").owlCarousel({
      items: 1,
      nav: true,
      dots: false,
      loop: true,
      center: true
    });

    $("#hits-carousel").owlCarousel({
      items: 3,
      nav: true,
      dots: false,
      loop: false,
      center: false,
      responsive : {
        0 : {
          items: 1,
          nav: true,
          loop: true,
          center: true,
          autoWidth:true,
        },
        480 : {
          items: 3,
          autoWidth:true,
        },
        768 : {
          items: 3,
          autoWidth:true,
        },
        992 : {
          items: 3,
          autoWidth:true,
        },
        1200 : {
          items: 3,
        },
      }
    });

    $("#arrival-carousel").owlCarousel({
      items: 3,
      nav: true,
      dots: false,
      loop: false,
      center: false,
      responsive : {
        0 : {
          items: 1,
          nav: true,
          loop: true,
          center: true,
          autoWidth:true,
        },
        480 : {
          items: 3,
          autoWidth:true,
        },
        768 : {
          items: 3,
          autoWidth:true,
        },
        992 : {
          items: 3,
          autoWidth:true,
        },
        1200 : {
          items: 3,
        },
      }
    });

    $("#brands-carousel").owlCarousel({
      items: 4,
      nav: true,
      dots: false,
      loop: true,
      responsive : {
        0 : {
          items: 2,
          nav: true,
          loop: true,
          center: true,
        },
        480 : {
          items: 3,
        },
        768 : {
          items: 4,
        },
        992 : {
          items: 4,
          autoHeight: true,
        },
        1200 : {
          items: 4,
        },
      }
    });

    $("#photo-carousel").owlCarousel({
      items: 4,
      nav: true,
      dots: false,
      loop: true,
      lazyLoad: true,
      center: false,
      responsive : {
        0 : {
          items: 2,
          loop: true,
          center: true,
        },
        480 : {
          items: 2,
        },
        768 : {
          items: 4,
        }
      }
    });

    $("#reviews-carousel").owlCarousel({
      items: 1,
      margin: 30,
      nav: true,
      dots: true,
      loop: true,
      center: true,
      dotsContainer: '.carousel__dots-wrap'
    });

    // product view
    var sync1 = jQuery("#sync1");
    var sync2 = jQuery("#sync2");
    var slidesPerPage = 4; //globaly define number of elements per page
    var syncedSecondary = true;

    sync1
      .owlCarousel({
      items: 1,
      slideSpeed: 3000,
      nav: true,

      autoplayHoverPause: true,
      autoplaySpeed: 1400,
      dots: false,
      loop: true,
      responsiveClass: true,
      responsive: {
        0: {
          autoplay: false
        },
        600: {
          autoplay: false
        }
      },
      responsiveRefreshRate: 200
    })
      .on("changed.owl.carousel", syncPosition);

    sync2
      .on("initialized.owl.carousel", function() {
      sync2
        .find(".owl-item")
        .eq(0)
        .addClass("current");
    })
      .owlCarousel({
      items: slidesPerPage,
      dots: false,
      //   nav: true,
      margin: 10,
      smartSpeed: 1000,
      slideSpeed: 1000,
      slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
      responsiveRefreshRate: 100
    })
      .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
      //if you set loop to false, you have to restore this next line
      //var current = el.item.index;

      //if you disable loop you have to comment this block
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

      if (current < 0) {
        current = count;
      }
      if (current > count) {
        current = 0;
      }

      //end block

      sync2
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = sync2.find(".owl-item.active").length - 1;
      var start = sync2
      .find(".owl-item.active")
      .first()
      .index();
      var end = sync2
      .find(".owl-item.active")
      .last()
      .index();

      if (current > end) {
        sync2.data("owl.carousel").to(current, 100, true);
      }
      if (current < start) {
        sync2.data("owl.carousel").to(current - onscreen, 100, true);
      }
    }

    function syncPosition2(el) {
      if (syncedSecondary) {
        var number = el.item.index;
        sync1.data("owl.carousel").to(number, 100, true);
      }
    }

    sync2.on("click", ".owl-item", function(e) {
      e.preventDefault();
      var number = jQuery(this).index();
      sync1.data("owl.carousel").to(number, 300, true);
    });
    // end product view

    var mainNav = $('.sidebar');

    $('.burger').on('click', function(event){
      event.preventDefault();
      $('body').toggleClass('no-scroll');
      mainNav.find('.catalog-nav').toggleClass('catalog-nav--open');
      $(this).toggleClass('burger--close');
    });

    // Работа аккордеона
    $('.catalog-nav__pseudolink').on('click', function(e){
      e.stopPropagation();
      $(this).closest('.catalog-nav__item').toggleClass('catalog-nav__item--show-child');
    });


    $('.catalog-nav__toggler').on('click', function(event){
      event.preventDefault();
      $('.catalog-nav').toggleClass('catalog-nav--show');
      // mainNav.find('.catalog-nav').toggleClass('catalog-nav--open');
      $(this).toggleClass('open');
    });
    // $('.catalog-nav__toggler').on('click', function(e){
    //   e.stopPropagation();
    //   .find('.catalog-nav').toggleClass('open');
    // });
});
