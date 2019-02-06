$(document).ready(function () {
    $('.filters input').click(function () {
        const fr = $('.chck-france');
        const esp = $('.chck-esp');
        const mex = $('.chck-mex');
        const us = $('.chck-us');
        const np = $('.chck-np');
        const sp = $('.chck-sp');

        if ($(this).hasClass('chck-france')) {
            if (fr.hasClass('checked')) {
                fr.removeClass('checked');
                fr.addClass('unchecked');
                $('.col-france').hide();
            } else if (fr.hasClass('unchecked')) {
                fr.removeClass('unchecked');
                fr.addClass('checked');
                $('.col-france').show();
            }
        }

        if ($(this).hasClass('chck-esp')) {
            if (esp.hasClass('checked')) {
                esp.removeClass('checked');
                esp.addClass('unchecked');
                $('.col-esp').hide();
            } else if (esp.hasClass('unchecked')) {
                esp.removeClass('unchecked');
                esp.addClass('checked');
                $('.col-esp').show();
            }
        }

        if ($(this).hasClass('chck-mex')) {
            if (mex.hasClass('checked')) {
                mex.removeClass('checked');
                mex.addClass('unchecked');
                $('.col-mex').hide();
            } else if (mex.hasClass('unchecked')) {
                mex.removeClass('unchecked');
                mex.addClass('checked');
                $('.col-mex').show();
            }
        }

        if ($(this).hasClass('chck-us')) {
            if (us.hasClass('checked')) {
                us.removeClass('checked');
                us.addClass('unchecked');
                $('.col-us').hide();
            } else if (us.hasClass('unchecked')) {
                us.removeClass('unchecked');
                us.addClass('checked');
                $('.col-us').show();
            }
        }

        if ($(this).hasClass('chck-np')) {
            if (np.hasClass('checked')) {
                np.removeClass('checked');
                np.addClass('unchecked');
                $('.col-np').hide();
            } else if (np.hasClass('unchecked')) {
                np.removeClass('unchecked');
                np.addClass('checked');
                $('.col-np').show();
            }
        }

        if ($(this).hasClass('chck-sp')) {
            if (sp.hasClass('checked')) {
                sp.removeClass('checked');
                sp.addClass('unchecked');
                $('.col-sp').hide();
            } else if (sp.hasClass('unchecked')) {
                sp.removeClass('unchecked');
                sp.addClass('checked');
                $('.col-sp').show();
            }
        }
    });
});