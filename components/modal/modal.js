angular.module('nag.modal', [])
.factory('nagModal', [
  'nagHelper',
  'nagSiteOverlay',
  function(nagHelper, nagSiteOverlay) {
    var content = '';

    return {
      setContent: function(modalContent) {
        content = modalContent;
      },

      enable: function(options) {
        var self = this;

        if($('#nag-modal').length == 0) {
          options = $.extend({
            //general modal settings
            overlayClick: false,
            closeOnEscape: true,
            autoCenter: true,
            appendSelector: 'body',
            cssClass: '',

            //css specific settings
            width: '250',
            height: '250'
          }, options);

          nagSiteOverlay.enable();

          if(options.overlayClick) {
            nagSiteOverlay.addEvent('click', function() {
              self.disable();
            });
          }

          if(options.closeOnEscape) {
            $(document).bind('keydown.nag-modal', function(event) {
              if(event.which == 27) {
                self.disable();
              }
            });
          }

          $(options.appendSelector).append('<div id="nag-modal" class="nag-modal ' + options.cssClass + '"><div class="   nag-modal-content' + options.cssClass + '">' + content + '</div></div>');
          $('#nag-modal').css({
            width: options.width,
            height: options.height
          });

          //anything that is clicked on with a class of nag-modal-close that is contained within the modal should close that modal window
          $('#nag-modal .nag-modal-close').bind('click', function(event) {
            self.disable();
          });

          if(options.autoCenter) {
            $('#nag-modal').addClass('auto-center').css({
              marginTop: (($('#nag-modal').children().slice(0, 1).outerHeight() / 2) * -1),
              marginLeft: (($('#nag-modal').children().slice(0, 1).outerWidth() / 2) * -1)
            });
          }
        }
      },

      disable: function() {
        if($('#nag-modal').length != 0) {
          content = '';
          $('#nag-modal').remove();
          nagSiteOverlay.disable()
        }
      }
    }
}]);
