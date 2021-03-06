$(document).ready(function () {
  $('.slider').slick({
    nextArrow: false,
    prevArrow: false,
    autoPlay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
    slidesToShow: 1,
    swipe: true,
    dots: true,
  })

  $('.plans-list').slick({
    nextArrow: false,
    prevArrow: false,
    autoPlay: false,
    slidesToScroll: 1,
    slidesToShow: 1.1,
    swipe: true,
    dots: false,
  })

  $('.partners-slider').slick({
    nextArrow: false,
    prevArrow: false,
    autoPlay: false,
    slidesToScroll: 1,
    slidesToShow: 1,
    swipe: true,
    dots: true,
  })

  if (window.matchMedia('(min-width: 1024px)').matches) {
    $('.plans-list').slick('unslick')
  }

  const slickButtons = document.querySelectorAll('.slick-dots li button')
  for (let i = 0; i < slickButtons.length; i++) {
    slickButtons[i].textContent = ''
  }
})
