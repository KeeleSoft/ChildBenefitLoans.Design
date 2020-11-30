

var cblApp = {    
    init: function(){
        this.scrollDetection();
    },
    scrollDetection:function(){
        //scroll detection and header status change
        $(window).scroll(function(){
            if ($(window).scrollTop() >= 50) {
                $('.header').addClass('header--fixed');
            }
            else {
                $('.header').removeClass('header--fixed');
            }
        });
    }
};

cblApp.init();