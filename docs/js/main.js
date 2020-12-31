var cblApp = {    
    init: function(){
        this.scrollDetection();
        this.loanEligibilityCheck();
        this.loadSpinner();
        this.responsiveMenu();
        this.showAttachmentName();
        this.hideCookieMsg();
        this.checkCookieOnLoad();
        this.convertToUppercase();
        this.formatCurrencyConfig();
        this.incomeExpenseTrigger();
        this.mainLoanCalculator();
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
    },
    showAttachmentName: function(){    
        $('.custom-file-input').on('change',function(){
            if($(this).val()){
                var fileName = $(this).val().split('\\').pop();
                $(this).next('.custom-file-label').addClass('selected').html(fileName);
            }
            else{
                $(this).next('.custom-file-label').html('Choose file')
            }
        });
    },
    hideCookieMsg: function(){
        $('.js-close-cookie-msg').on('click', function (e) {
            e.preventDefault();
            localStorage.setItem('cookieStatus', 'hidden');
            $('.js-cookie-msg').hide();
        });         
    },
    checkCookieOnLoad: function(){
        if (localStorage.getItem('cookieStatus') === 'hidden') {
            $('.js-cookie-msg').hide();
        } else {
            $('.js-cookie-msg').show();
        }
    },
    convertToUppercase: function(){
        $('.js-to-uppercase').on('blur', function (e) {
            var input = $(this);
            var start = input[0].selectionStart;
            $(this).val(function (_, val) {
                return val.toUpperCase();
            });
            input[0].selectionStart = input[0].selectionEnd = start;
        });
    },
    formatCurrencyConfig: function(){
        $(document).on('blur', '.js-disp-currency', function () {
            $(this).formatCurrency({
                colorize: true
                , negativeFormat: '-%s%n'
                , roundToDecimalPlace: 2
            });
        }).keyup(function (e) {
            var e = window.event || e;
            var keyUnicode = e.charCode || e.keyCode;
            if (e !== undefined) {
                switch (keyUnicode) {
                case 16:
                    break; // Shift
                case 17:
                    break; // Ctrl
                case 18:
                    break; // Alt
                case 27:
                    this.value = '';
                    break; // Esc: clear entry
                case 35:
                    break; // End
                case 36:
                    break; // Home
                case 37:
                    break; // cursor left
                case 38:
                    break; // cursor up
                case 39:
                    break; // cursor right
                case 40:
                    break; // cursor down
                case 78:
                    break; // N (Opera 9.63+ maps the "." from the number key section to the "N" key too!) (See: http://unixpapa.com/js/key.html search for ". Del")
                case 110:
                    break; // . number block (Opera 9.63+ maps the "." from the number block to the "N" key (78) !!!)
                case 190:
                    break; // .
                default:
                    $('.js-disp-currency').formatCurrency({
                        colorize: true
                        , negativeFormat: '-%s%n'
                        , roundToDecimalPlace: -1
                        , eventOnDecimalsEntered: true
                    });
                }
            }
        });
    },
    incomeExpenseTrigger: function(){
        $('.js-income-inp, .js-expense-inp').on('blur',this.incomeExpenseCalc);
    },
    incomeExpenseCalc: function(){
        var totalIncome = 0,
            totalExpenses = 0;
        $('.js-income-inp,.js-expense-inp').each(function () {
            if($(this).hasClass('js-income-inp')){
                var intTotalIncome = parseCurrencyVal(this);
                if (!isNaN(intTotalIncome)) {
                    totalIncome += intTotalIncome;
                }
                else {
                    return;
                }
            }
            else if($(this).hasClass('js-expense-inp')){
                var intTotalExpenses = parseCurrencyVal(this);
                if (!isNaN(intTotalExpenses)) {
                    totalExpenses += intTotalExpenses;
                }
                else {
                    return;
                }
            }
            dispFinances();                     
        });    
        function parseCurrencyVal(el) {
            return parseFloat(el.value.replace(/[^\d.-]/g, ""));
        }
        function dispFinances(){
            var currencyFormat = {
                style: 'currency',
                currency: 'GBP'
            };
            var disposableIncome = totalIncome - totalExpenses;
            $('.js-disp-total-income').text(totalIncome.toLocaleString('en-GB', currencyFormat));
            $('.js-disp-total-expenses').text(totalExpenses.toLocaleString('en-GB', currencyFormat));
            $('.js-disp-total-disposable').text(disposableIncome.toLocaleString('en-GB', currencyFormat));
        }
    },
    mainLoanCalculator: function(){
        //loan calculator vars
        var minNumOfChildren = 1,
        maxNumOfChildren = 5,
        firstChildBenefit = 20.00,
        additionalChildBenefit = 13.70,
        numOfChildren = 1,
        benefitMultipleFrequency = 4,

        checkCbFrequency = $('.js-check-cb-frequency'),
        numOfChildrenInput = $('.js-num-of-children-input'),  
        childBenefitAmountDisplay = $('.js-child-benefit-amount');

        var cb ={};
        cb.amount = firstChildBenefit;
        numOfChildrenInput.val(minNumOfChildren); //assign min number of children needed on page load

        //increment decremenet functionality
        $('.js-decrement-num-of-children, .js-increment-num-of-children').on('click', function(e){ 
            e.preventDefault();
            if($(this).hasClass('js-decrement-num-of-children') && numOfChildrenInput.val() > minNumOfChildren){
                numOfChildren--;
                numOfChildrenInput.val(numOfChildren);
                calcBenefitIncome();
            }
            else if($(this).hasClass('js-increment-num-of-children') && numOfChildrenInput.val() < maxNumOfChildren){
                numOfChildren++;
                numOfChildrenInput.val(numOfChildren);
                calcBenefitIncome();
            }
        });

        function calcBenefitIncome(){
            var totalChildBenefitPerWeek = 0;
            var totalChildBenefit = 0;
            if(numOfChildrenInput.val() > minNumOfChildren){
                var numOfAdditionalChildren = numOfChildrenInput.val() - 1;
                totalChildBenefitPerWeek = firstChildBenefit + (numOfAdditionalChildren * additionalChildBenefit);
                cb.amount = totalChildBenefitPerWeek;
                totalChildBenefit = checkCbFrequencySelection(totalChildBenefitPerWeek);
                displayCbAmount(totalChildBenefit);
            }
            else{
                cb.amount = firstChildBenefit;
                totalChildBenefit = checkCbFrequencySelection(firstChildBenefit);
                displayCbAmount(totalChildBenefit);
            }
        }
        
        //check for week/s selection and return the values accordingly
        function checkCbFrequencySelection(cb){
            if (checkCbFrequency.filter(':checked').hasClass('js-check-cb-frequency--4weekly')) {
                var fourWeeklyVal = cb * benefitMultipleFrequency;
                return fourWeeklyVal;
            }
            else{
                return cb;
            }
        }
        //recalculate when weeks radio is changed 
        function benefitFrequencyBasedCalc(){
            checkCbFrequency.on('change',function(){
                var total = checkCbFrequencySelection(cb.amount);
                displayCbAmount(total);
            });
        }
        benefitFrequencyBasedCalc();

        function displayCbAmount(amt){
            childBenefitAmountDisplay.text(amt.toFixed(2));
        }
    }
};

cblApp.init();

