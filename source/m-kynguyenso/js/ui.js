$('.section-homepage .box-highlight .rank-1').slick({
    dots: false,
    infinite: false,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
});

// active nav-tab
const $navTabLink = $('.nav-tab .nav-tab__link a');
const $navTabContent = $('.nav-tab .nav-tab__content ');

$(".nav-tab .nav-tab__link a").click(function (e) {
    // INFO: prevent hash-jumping from anchor element
    e.preventDefault();
    const $this = $(e.target);
    const chosenTab = $this.attr('data-link');
    $navTabLink.removeClass('active');
    $this.addClass('active');
    $navTabContent.find('.tab-pane')
        .removeClass('active fadeInUp')
    $('.nav-tab .nav-tab__content .' + chosenTab).addClass('active fadeInUp');
});