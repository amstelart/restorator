// Если на проекте jQuery
$( document ).ready(function() {

    var MqL = 1199;
    moveNavigation();
    $(window).on('resize', function(){
      (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
    });

    // инициализация каруселей
    $("#banner-carousel").owlCarousel({
      items: 1,
      nav: true,
      dots: false,
      loop: true,
      center: true
    });

    $(".product-card-carousel").owlCarousel({
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
      autoHeight:false,
      autoHeightClass: 'brand-item ',
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
          items: 3,
          loop: true,
          center: true,
        },
        480 : {
          items: 3,
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

    // .end инициализация каруселей


    // Работа аккордеона
    $('.catalog-nav__pseudolink').on('click', function(e) {
      e.stopPropagation();
      $(this).closest('.catalog-nav__item').toggleClass('catalog-nav__item--show-child');

      if ($(this).closest('.catalog-nav__item').hasClass('catalog-nav__item--show-child')) {
        $(this).next('.catalog-nav__sublist-wrapper').slideDown(200);
      } else {
        $(this).next('.catalog-nav__sublist-wrapper').slideUp(200);
      }

    });


    $('.catalog-nav__toggler').on('click', function(e){
      event.preventDefault();
      $('.catalog-nav').slideToggle(200).end().toggleClass('catalog-nav--show');
      $(this).toggleClass('open');
    });


    // range slider
    var stepsSlider = document.getElementById('steps-slider');
    var input0 = document.getElementById('input-with-keypress-0');
    var input1 = document.getElementById('input-with-keypress-1');
    var inputs = [input0, input1];

    noUiSlider.create(stepsSlider, {
      start: [0, 1150],
      connect: true,
      range: {
        'min': [0],
        // '10%': [10, 10],
        // '50%': [80, 50],
        // '80%': 150,
        'max': 1150
      }
    });

    stepsSlider.noUiSlider.on('update', function (values, handle) {
      inputs[handle].value = values[handle];
    });

    // Listen to keydown events on the input field.
    inputs.forEach(function (input, handle) {

      input.addEventListener('change', function () {
        stepsSlider.noUiSlider.setHandle(handle, this.value);
      });

      input.addEventListener('keydown', function (e) {

        var values = stepsSlider.noUiSlider.get();
        var value = Number(values[handle]);

        // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
        var steps = stepsSlider.noUiSlider.steps();

        // [down, up]
        var step = steps[handle];

        var position;

        // 13 is enter,
        // 38 is key up,
        // 40 is key down.
        switch (e.which) {

          case 13:
          stepsSlider.noUiSlider.setHandle(handle, this.value);
          break;

          case 38:

          // Get step to go increase slider value (up)
          position = step[1];

          // false = no step is set
          if (position === false) {
            position = 1;
          }

          // null = edge of slider
          if (position !== null) {
            stepsSlider.noUiSlider.setHandle(handle, value + position);
          }

          break;

          case 40:

          position = step[0];

          if (position === false) {
            position = 1;
          }

          if (position !== null) {
            stepsSlider.noUiSlider.setHandle(handle, value - position);
          }

          break;
        }
      });
    });
    // ./end range slider

    function checkWindowWidth() {
  		//check window width (scrollbar included)
  		var e = window,
              a = 'inner';
          if (!('innerWidth' in window )) {
              a = 'client';
              e = document.documentElement || document.body;
          }
          if ( e[ a+'Width' ] >= MqL ) {
  			return true;
  		} else {
  			return false;
  		}
  	}

    function moveNavigation(){
  		var navigation = $('.catalog-nav');
    		var desktop = checkWindowWidth();
          if ( desktop ) {
  			navigation.detach();
  			navigation.insertBefore('.d-nav');
  		} else {
  			navigation.detach();
  			navigation.insertAfter('.m-nav');
  		}
  	}
});
