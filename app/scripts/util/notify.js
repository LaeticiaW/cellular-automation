// notify.js uses the 'Bootstrap Growl Alerts' for Bootstrap Alert elements, recommended 
// by http://styleguide.peaklibrary.com/ (according UX Specs).
// For now, is just implemented the 'success' version of this alerts, and auto-hide (5000ms).
// Info, docs & config: http://bootstrap-growl.remabledesigns.com/

define(['jquery'], function($) {
    return {
        showSuccess: function(obj) {
            $.notify({
                icon: 'fa fa-smile-o',
                message: '<strong>' + obj.messageTitle + '</strong><br />' + obj.message
            },{ element: 'body', type: "success",
                placement: { align: 'center' },
                animate:{
                    enter: "animated-fx fadeIn",
                    exit: "animated-fx fadeOut"
                }
            });
        }
    };
});