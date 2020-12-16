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
});

$.validator.addClassRules({
    "js-input-mandatory": {
        required: true
    }    
});

//DOB validation rules using Date Text Entry Library
$('.js-dob').datetextentry({
    show_tooltips : false,
    //is_required: true,
    //E_REQUIRED_FIELD : 'Please enter a date',
    
    on_error : function(msg) {
        var dobInput = this.$element;
        dobInput.siblings('.jq-dte-errorbox')
            .insertBefore(dobInput.closest('.form-group').find('.jq-dte'))
            .addClass('form-control--error')
            .text(msg);
    }
});

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
