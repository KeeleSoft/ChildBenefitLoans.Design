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
        this.incomeExpenseCalc();
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
            updateHiddenInputs(totalIncome,totalExpenses,disposableIncome);
        }
        function updateHiddenInputs(inc,exp,disInc){
            $('#jsHiddenTotalDisposable').val(disInc);
            $('#jsHiddenTotalExpenses').val(exp);
            $('#jsHiddenTotalIncome').val(inc);
        }
    },
    heroSlider: function(){
        $('.hero-slider').slick({
            autoplay: true,
            fade: true,
            autoplaySpeed: 4500,
            arrows: false
        });
    },
    popOver: function(){
        $('.js-popover').webuiPopover({
            animation:'fade',
            arrow:true,
            width: 280
        });
    },
    loanSlider: function(){
        var loanAmountSlider = document.getElementById('loanAmountSlider');
        noUiSlider.create(loanAmountSlider, {
            start: 500,
            connect: 'lower',
            step: 20,
            tooltips: wNumb({
                decimals: 0,
                prefix: '£'
            }),
            range: {
                'min': 300,
                'max': 600
            },
            format: wNumb({
                decimals: 0,
            }),
            pips: {
                mode: 'count', 
                values: 2, 
                density: 100,
                format: wNumb({
                    prefix: '£'
                })
            }
        });
        var loanWeekSlider = document.getElementById('loanWeekSlider');
        noUiSlider.create(loanWeekSlider, {
            start: 39,
            connect: 'lower',
            step: 1,
            tooltips: wNumb({
                decimals: 0,
                suffix: ' Weeks'
            }),
            range: {
                'min': 26,
                'max': 52
            },
            format: wNumb({
                decimals: 0
            }),
            pips: {
                mode: 'count', 
                values: 2, 
                density: 100,
                format: wNumb({
                    suffix: ' Weeks'
                })
            }
        });
    },
    mainLoanCalculator: function(){
        //loan calculator vars
        var minNumOfChildren = 1,
        maxNumOfChildren = 9,
        firstChildBenefit = 21.05,
        additionalChildBenefit = 13.95,
        numOfChildren = 1,
        benefitMultipleFrequency = 4,
        interestRate = 0.36,
        minLockedInSavingsVal = 2.50,

        checkCbFrequency = $('.js-check-cb-frequency'),
        numOfChildrenInput = $('.js-num-of-children-input'),  
        childBenefitAmountDisplay = $('.js-child-benefit-amount');

        var cb ={};
        cb.amount = firstChildBenefit;
        cb.lockedInFunds = minLockedInSavingsVal;
        updateCbValue(firstChildBenefit);
        numOfChildrenInput.val(minNumOfChildren); //assign min number of children needed on page load
        $('#jsHiddenNoOfChildrenU15').val(minNumOfChildren);

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
            $('#jsHiddenNoOfChildrenU15').val(numOfChildren);
        });

        function calcBenefitIncome(){
            var totalChildBenefitPerWeek = 0;
            var totalChildBenefit = 0;
            if(numOfChildrenInput.val() > minNumOfChildren){
                var numOfAdditionalChildren = numOfChildrenInput.val() - 1;
                totalChildBenefitPerWeek = firstChildBenefit + (numOfAdditionalChildren * additionalChildBenefit);
                cb.amount = totalChildBenefitPerWeek;
                totalChildBenefit = checkCbFrequencySelection(totalChildBenefitPerWeek);
                displayCalcValue(childBenefitAmountDisplay,totalChildBenefit);
                updateCbValue(totalChildBenefit);
            }
            else{
                cb.amount = firstChildBenefit;
                totalChildBenefit = checkCbFrequencySelection(firstChildBenefit);
                displayCalcValue(childBenefitAmountDisplay,totalChildBenefit);
                updateCbValue(totalChildBenefit);
            }
        }
        
        //check for week/s selection and return the values accordingly
        function checkCbFrequencySelection(cb){
            if (checkCbFrequency.filter(':checked').hasClass('js-check-cb-frequency--4weekly')) {
                var fourWeeklyVal = cb * benefitMultipleFrequency;
                $('.js-4-week-digit').removeClass('d-none');
                return fourWeeklyVal;
            }
            else{
                $('.js-4-week-digit').addClass('d-none');
                return cb;
            }
        }
        //recalculate when weeks radio is changed 
        function benefitFrequencyBasedCalc(){
            checkCbFrequency.on('change',function(){
                var total = checkCbFrequencySelection(cb.amount);
                displayCalcValue(childBenefitAmountDisplay,total);
                updateCbValue(total); 
                callPMT();              
            });
        }
        benefitFrequencyBasedCalc();

        function pmt(rate, nper, pv, fv, type){
            if (!fv) fv = 0;
            if (!type) type = 0;
    
            if (rate == 0) return -(pv + fv)/nper;
            
            var pvif = Math.pow(1 + rate, nper);
            var pmt = rate / (pvif - 1) * -(pv * pvif + fv);
    
            if (type == 1) {
                pmt /= (1 + rate);
            };    
            return pmt;
        }
        
        loanAmountSlider.noUiSlider.on('update', function () { 
            var currentSliderVal = loanAmountSlider.noUiSlider.get();
            $('#jsLoanAmountCurrentVal').val(currentSliderVal);
            cb.sliderLoanVal = currentSliderVal;
            callPMT();
        });

        loanWeekSlider.noUiSlider.on('update', function () { 
            var currentSliderVal = loanWeekSlider.noUiSlider.get();
            $('#jsPaymentTermCurrentVal').val(currentSliderVal);
            cb.sliderWeekVal = currentSliderVal;
            callPMT();
        });

        function callPMT(){
            var loanRepaymentAmount = pmt(interestRate/52,cb.sliderWeekVal,-(cb.sliderLoanVal));
            updateLoanRepaymentVal(checkCbFrequencySelection(loanRepaymentAmount));
            calcTotalAmountToPay(loanRepaymentAmount,cb.sliderWeekVal);
        }

        function updateCbValue(val){
            cb.updatedChildBenefitVal = val;
            displayCalcValue($('.js-breakdown-block__val--benefit'),val);
            calcRemainingFunds();
        }

        function updateLoanRepaymentVal(val){
            cb.updatedLoanRepaymentVal = val;
            displayCalcValue($('.js-breakdown-block__val--repayment'),val);
            calcRemainingFunds();
        }

        function calcTotalAmountToPay(val,weeks){
            var totalAmountToPay = val * weeks;
            displayCalcValue($('.js-total-amount-to-pay'),totalAmountToPay);
            calcTotalInterestFees(cb.sliderLoanVal,totalAmountToPay);
        }

        function calcTotalInterestFees(loan, totalAmt){
            var totalInterestAndFees = totalAmt - loan;
            displayCalcValue($('.js-total-interest-and-fees'),totalInterestAndFees);
        }

        function calcRemainingFunds(){
            cb.remainingFunds = cb.updatedChildBenefitVal - cb.updatedLoanRepaymentVal;
            displayCalcValue($('.js-breakdown-block__val--remainder'),cb.remainingFunds);
            calcLockedInSavings();
            checkRemainingFundsStatus();
        }

        function calcLockedInSavings(){
            cb.remainingFunds = cb.remainingFunds - checkCbFrequencySelection(minLockedInSavingsVal);
            cb.lockedInFunds = checkCbFrequencySelection(minLockedInSavingsVal);
            displayCalcValue($('.js-breakdown-block__val--locked'),cb.lockedInFunds);
            displayCalcValue($('.js-breakdown-block__val--remainder'),cb.remainingFunds);
        }

        $('.js-minus-lis,.js-plus-lis').on('click', function(e){
            e.preventDefault();
            if(cb.remainingFunds >= minLockedInSavingsVal && $(this).hasClass('js-plus-lis')){
                cb.remainingFunds = cb.remainingFunds - minLockedInSavingsVal;
                cb.lockedInFunds = cb.lockedInFunds + minLockedInSavingsVal;         
                displayCalcValue($('.js-breakdown-block__val--locked'),cb.lockedInFunds);
                displayCalcValue($('.js-breakdown-block__val--remainder'),cb.remainingFunds);
                checkRemainingFundsStatus();
            }
            else if(cb.lockedInFunds > checkCbFrequencySelection(minLockedInSavingsVal) && $(this).hasClass('js-minus-lis')){
                cb.remainingFunds = cb.remainingFunds + minLockedInSavingsVal;
                cb.lockedInFunds = cb.lockedInFunds - minLockedInSavingsVal; 
                displayCalcValue($('.js-breakdown-block__val--locked'),cb.lockedInFunds);
                displayCalcValue($('.js-breakdown-block__val--remainder'),cb.remainingFunds); 
                checkRemainingFundsStatus();
            }
            else {
                if($(this).hasClass('js-plus-lis')){
                    alert('You do not have enough funds');
                }
                else if($(this).hasClass('js-minus-lis')){
                    alert('You have reached the minimum Locked in Savings required for this loan');
                }               
                checkRemainingFundsStatus();
            }
        });

        function checkRemainingFundsStatus(){
            if(cb.remainingFunds < 0){
                $('.js-remainder-wrap').addClass('red-text');
                $('.js-calc-block-alert').removeClass('d-none');
            }
            else{
                $('.js-remainder-wrap').removeClass('red-text');
                $('.js-calc-block-alert').addClass('d-none');
            }
        }

        //display function for all calculator values
        function displayCalcValue(el,amt){
            el.text(amt.toFixed(2));
            updateHiddenFieldsInCalc(el,amt.toFixed(2));
        }
 
        function updateHiddenFieldsInCalc(el,amt){
            if(el.hasClass('js-total-interest-and-fees')){
                $('#jsHiddenTotalIntFeesVal').val(amt);                
            }
            if(el.hasClass('js-breakdown-block__val--repayment')){               
                $('#jsHiddenLoanRepaymentAmount').val(amt);                
            }
            if(el.hasClass('js-breakdown-block__val--remainder')){               
                $('#jsHiddenRemainingAmount').val(amt);                               
            }
            if(el.hasClass('js-breakdown-block__val--locked')){
                $('#jsHiddenLockedSavingsAmount').val(amt);                
            }
            if(el.hasClass('js-total-amount-to-pay')){
                $('#jsHiddenTotalAmount').val(amt);                
            }
            if(el.hasClass('js-breakdown-block__val--benefit')){
                $('#jsHiddenCbAmount').val(amt);
            }           
        }
    }
};

cblApp.init();

