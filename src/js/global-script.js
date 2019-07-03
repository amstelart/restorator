// Если на проекте jQuery
$( document ).ready(function() {

    $("#banner-carousel").owlCarousel({
      items: 1,
      nav: false,
      dots: false,
      loop: true,
      center: true
    });

    $("#hits-carousel").owlCarousel({
      items: 3,
      nav: false,
      dots: false,
      loop: true,
      center: true
    });

    $("#arrival-carousel").owlCarousel({
      items: 3,
      nav: false,
      dots: false,
      loop: true,
      center: true
    });

    $("#brands-carousel").owlCarousel({
      items: 4,
      nav: false,
      dots: false,
      loop: true,
      center: false
    });

    $("#photo-carousel").owlCarousel({
      items: 4,
      nav: false,
      dots: false,
      loop: true,
      center: false
    });

    $("#reviews-carousel").owlCarousel({
      items: 1,
      margin: 30,
      nav: false,
      dots: true,
      loop: true,
      center: true,
      dotsContainer: '.carousel__dots-wrap'
    });

});

// Изоляция без jQuery
// (function(){
//   // code
// }());

// На проекте нет jQuery, но хочется $( document ).ready...
// function ready(fn) {
//   if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
//     fn();
//   } else {
//     document.addEventListener('DOMContentLoaded', fn);
//   }
// }
//
// ready(function(){
//   // code
// });
