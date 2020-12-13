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
    }
    , rules: {
        "current-member-query": {
            required: true
        }
        , "eligibility-desc-query": {
            required: true
        }
        , "forces-work-status-query": {
            required: true
        }
        , "tax-outside-uk-query": {
            required: true
        }
        , "loan-receive-query": {
            required: true
        }
        , "contract-type-query": {
            required: true
        }
        , "bankrupt-check-query": {
            required: true
        }
        , "dmp-check-query": {
            required: true
        }
        , "ccj-check-query": {
            required: true
        }
        , "home-tel-num": {
            require_from_group: [1, ".js-phone-group"]
        }
        , "mobile-num": {
            require_from_group: [1, ".js-phone-group"]
        }
        , "contract-end-year": {
            futureDate: true
            , number: true
        }
        , "contract-end-month": {
            futureDate: true
            , number: true
        }
        , "method-connect-acc": {
            require_from_group: [1, ".js-doc-upload-group"]
        }
        , "method-upload-docs": {
            require_from_group: [1, ".js-doc-upload-group"]
        }
        , "dd-date-query": {
            required: true
        }
        , "acc-owner-query": {
            required: true
        }
        , "mod-address-query": {
            required: true
        }
        , "cuca-acc-select-query": {
            required: true
        }
        , "income-frequency-query": {
            required: true
        }
        , "credit-card-amex": {
            require_from_group: [1, ".js-credit-card-group"]
        }
        , "credit-card-visa": {
            require_from_group: [1, ".js-credit-card-group"]
        }
        , "credit-card-master": {
            require_from_group: [1, ".js-credit-card-group"]
        }
        , "credit-card-other": {
            require_from_group: [1, ".js-credit-card-group"]
        }
        , "credit-card-none": {
            require_from_group: [1, ".js-credit-card-group"]
        }
    }
    , groups: {
        dateOfBirth: "dob-date dob-month dob-year"
        , sortcode: "sort-code-first sort-code-mid sort-code-last"
        , futureDate: "contract-end-year contract-end-month"
        , uploadMethodGroup: "method-upload-docs method-connect-acc"
        , creditCardGroup: "credit-card-visa credit-card-master credit-card-amex credit-card-none credit-card-other"
    , }
});

$.validator.addClassRules({
    "js-input-mandatory": {
        required: true
    }
    , "js-form-control--postcode": {
        required: true
        , postcodeUK: true
    }
    , "js-form-control--email": {
        required: true
        , email: true
    }
    , "js-form-control--mobile": {
        mobileUK: true
    }
    , "js-form-control--phone": {
        phoneUK: true
    }
    , "js-form-control--phones": {
        phonesUK: true
    }
    , "js-form-control--dob-date": {
        required: true
        , minlength: 1
        , dateOfBirth: true
        , number: true
        , minAge: 18
    }
    , "js-form-control--dob-month": {
        required: true
        , minlength: 1
        , dateOfBirth: true
        , number: true
        , minAge: 18
    }
    , "js-form-control--dob-year": {
        required: true
        , minlength: 4
        , dateOfBirth: true
        , number: true
        , minAge: 18
    }
    , "js-form-control--month": {
        max: 12
        , min: 1
    }
    , "js-form-control--year": {
        max: 2020
        , min: 1920
        , minlength: 4
    }
    , "js-form-control--cont-year": {
        minlength: 4
        , max: 2080
    }
    , "js-form-control--sortcode": {
        minlength: 2
        , number: true
        , required: true
    }
    , "js-form-control--accno": {
        number: true
        , minlength: 8
        , required: true
    }
    , "js-form-control--nino": {
        niUK: true
        , required: true
    }
    , "js-form-control--income-desc": {
        required: true
    }
    , "js-form-control--currency": {
        required: true
        , currency: ['£', false]
    }
    , "js-form-control--max-income": {
        max: function (el) {
            var amount = $(el).val().replace(/[^\d.-]/g, "");
            if (amount > 10000) {
                return false;
            }
        }
    }
    , "js-form-control--min-saving": {
        required: false
        , min: function (el) {
            var saving = $(el).val().replace(/[^\d.-]/g, "");
            if (saving < 10) {
                return false;
            }
        }
    }
    , "js-textarea-char-count": {
        required: true
        , maxlength: 500
    }
    , "js-num-of-tickets": {
        number: true
        , max: 10
        , required: true
    }
    , "js-dependant-max-age": {
        max: 18
    }
});

//DOB validation rules using Date Text Entry Library
$('.js-adult-dob').datetextentry({
    show_tooltips : false,
    custom_validation:function(){
        $('.jq-dte-errorbox').insertBefore('.jq-dte').addClass('form-control--error');
    },
    on_change : function() {
        $('.jq-dte-errorbox').removeClass('form-control--error');
    }
});

$('.js-cbl-form').submit(function(e) {
    var dob =  $('.js-adult-dob').val();
    if(dob === '') {
        $('.js-adult-dob').datetextentry('set_error', 'Date of birth is required');
        $('.jq-dte-errorbox').insertBefore('.jq-dte').addClass('form-control--error');
    }
});