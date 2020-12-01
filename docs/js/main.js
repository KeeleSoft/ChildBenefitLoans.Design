

var cblApp = {    
    init: function(){
        this.scrollDetection();
        this.loanEligibilityCheck();
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
    },
    loanEligibilityCheck:function(){
        $('.js-eligibility-check').change(function(){
            if ($('.js-eligibility-check:checked').length === $('.js-eligibility-check').length) {
                $('.js-postcode-display').removeClass('js-hidden');
            }
            else{
                $('.js-postcode-display').addClass('js-hidden');
            }
        });
    }
};

cblApp.init();