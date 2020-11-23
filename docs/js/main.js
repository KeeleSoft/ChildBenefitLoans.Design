$(window).scroll(function(){
    if ($(window).scrollTop() >= 10) {
        $('.header').addClass('header--fixed');
    }
    else {
        $('.header').removeClass('header--fixed');
    }
});