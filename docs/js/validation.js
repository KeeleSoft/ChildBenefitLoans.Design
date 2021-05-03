$('.js-cbl-form').validate({
    errorClass: 'form-control--error'
    , errorElement: "span"
    , errorGroupClass: 'form-group--error'
    , errorPlacement: function (error, element) {
        var errorParentNode = element.closest('.form-group');
        var errorTargetElement = errorParentNode.find('legend');
        var errorParentLabel = errorParentNode.find('label');
        if (errorTargetElement.length) {
            error.insertBefore(errorTargetElement);
        }
        else {
            error.insertAfter(errorParentLabel);
        }
    }
    , highlight: function (element, errorClass, validClass) {
        $(element).closest('.form-group').addClass(this.settings.errorGroupClass);
        $(element).addClass(errorClass);
    }
    , unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass(errorClass);
        if ($(element).closest('.form-group').find('input.form-control--error').length === 0) {
            $(element).closest('.form-group').removeClass(this.settings.errorGroupClass);
        }
    },
    groups: {
        sortcode: "sortCodeFirst sortCodeMid sortCodeLast"
    }
});

$.validator.addClassRules({
    "js-val-mandatory": {
        required: true
    },
    "js-val-email": {
        required: true,
        email: true
    },
    "js-val-num":{
        number: true
    },
    "js-disp-currency":{
        currency: ['£', false]
    },
    "js-val-postcode": {
        postcodeUK: true
    },
    "js-val-niuk": {
        niUK: true
    }  
});

//DOB validation rules using Date Text Entry Library
$('.js-dob').datetextentry({
    show_tooltips : false,
    //is_required: true,
    //E_REQUIRED_FIELD : 'Please enter a date',
    //field_order : 'DMY',
    //separator   : '-',
    on_error : function(msg) {
        var dobInput = this.$element;
        dobInput.siblings('.jq-dte-errorbox')
            .insertBefore(dobInput.closest('.form-group').find('.jq-dte'))
            .addClass('form-control--error')
            .text(msg);
    },
    custom_validation:function(valid){
        var errMsg = 'You should be at least 18 years old to apply'
        if(this.$element.hasClass('js-val-min-age')){
            var minage = 18;
            var mydate = new Date();
            mydate.setFullYear(valid.year, valid.month-1, valid.day);
        
            var currdate = new Date();
            currdate.setFullYear(currdate.getFullYear() - minage);
            if ((currdate - mydate) < 0){
                throw errMsg;
            }
            return true;
        }
    }  
});


//DOB Validation on submit
$('.js-cbl-form').submit(function(e) {        
    var allValidDob = true;
    $('.js-dob').each(function(){
        if($(this).val() ===''){
            $(this).datetextentry('set_error', 'Date of birth is required');
            allValidDob = false;
        }
    });
    if(!allValidDob){
        e.preventDefault();
    }
});

//display dob values on page load
$('.js-dob').each(function(){
    var dobVal = $(this).attr('value');
    if(dobVal){
        var arr = dobVal.split('/');
        var formattedDate = arr[2] + '-' + arr[1] + '-' + arr[0];
        $(this).datetextentry('set_date', formattedDate);
    }
});

//JQ Validation additional methods
$.validator.addMethod("currency", function (value, element, param) {
    var isParamString = typeof param === "string"
        , symbol = isParamString ? param : param[0]
        , soft = isParamString ? true : param[1]
        , regex;
    symbol = symbol.replace(/,/g, "");
    symbol = soft ? symbol + "]" : symbol + "]?";
    regex = "^[" + symbol + "([1-9]{1}[0-9]{0,2}(\\,[0-9]{3})*(\\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\\.[0-9]{0,2})?|0(\\.[0-9]{0,2})?|(\\.[0-9]{1,2})?)$";
    regex = new RegExp(regex);
    return this.optional(element) || regex.test(value);
}, "Enter a valid amount");

$.validator.addMethod("postcodeUK", function (value, element) {
    return this.optional(element) || /^((([A-PR-UWYZ][0-9])|([A-PR-UWYZ][0-9][0-9])|([A-PR-UWYZ][A-HK-Y][0-9])|([A-PR-UWYZ][A-HK-Y][0-9][0-9])|([A-PR-UWYZ][0-9][A-HJKSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?([0-9][ABD-HJLNP-UW-Z]{2})|(GIR)\s?(0AA))$/i.test(value);
}, "Enter a valid UK postcode");

jQuery.validator.addMethod('niUK', function(nino, element) {
    return this.optional(element) || nino.length >= 9 &&
        nino.replace(/ /g,'').match(/^[A-CEGHJ-PR-TW-Z]{1}[A-CEGHJ-NPR-TW-Z]{1}[0-9]{6}[A-D]{1}$/i);
}, 'Please specify a valid national insurance number');


