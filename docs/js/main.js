
var cblApp = {    
    init: function(){
        this.scrollDetection();
        this.loanEligibilityCheck();
        this.loadSpinner();
        this.responsiveMenu();
    },
    //--------- scroll detection and header status change
    scrollDetection:function(){    
        $(window).scroll(function(){
            if ($(window).scrollTop() >= 50) {
                $('.header').addClass('header--fixed');
                $('.js-header-placeholder').removeClass('d-none');
            }
            else {
                $('.header').removeClass('header--fixed');
                $('.js-header-placeholder').addClass('d-none');
            }
        });
    },
    //--------- check user eligibiliy for a loan based on meeting all criteria
    loanEligibilityCheck:function(){
        $('.js-eligibility-check').change(function(){
            if ($('.js-eligibility-check:checked').length === $('.js-eligibility-check').length) {
                $('.js-postcode-display').removeClass('js-hidden');
            }
            else{
                $('.js-postcode-display').addClass('js-hidden');
            }
        });
    },
    loadSpinner: function(){
        $('.js-loader-activate').on('click', function () {
            var spinnerEl = $(this).closest('.form-group').find('.js-loader-icon');
            spinnerEl.addClass('js-loader-icon--show');
            // ------------- setTimeout is for demo only
            setTimeout(function () {
                spinnerEl.removeClass('js-loader-icon--show');
            }, 2000);
        });
    },
    responsiveMenu:function(){
        var menu = new MmenuLight(
            document.querySelector('.js-main-nav'),
            '(max-width: 767px)'
        );
        var navigator = menu.navigation({
            // selectedClass: 'Selected',
            // slidingSubmenus: true,
            // theme: 'dark',
            // title: 'Menu'
        });
        var drawer = menu.offcanvas({
            position: 'right'
        });
        //	Open the menu.
        document.querySelector('.js-nav-trigger')
            .addEventListener('click', evnt => {
                evnt.preventDefault();
                drawer.open();
            });
    }
};

cblApp.init();