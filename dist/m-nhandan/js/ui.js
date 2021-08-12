
// hamburger-menu
$('.hamburger').on('click', function () {
    $('.hamburger').toggleClass('animation');
    $('.menu-toggle').toggleClass('open');
})

// toggle sub-menu
$('.menu-toggle .chevron-down').click(function (event) {
    // event.preventDefault();
    console.log('click');
    $('.menu-toggle .sub-menu').removeClass('active');
    $(this).siblings('.sub-menu').addClass('active');
    $('.menu-toggle li').siblings('.sub-menu').not('.active').hide();
    $(this).siblings(".sub-menu").slideToggle("slow");
})



