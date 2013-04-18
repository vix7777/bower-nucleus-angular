angular.module('nag.siteLoader', [
  'nag.notify'
])
.factory('nagSiteLoader', ['nagNotify', function(nagNotify) {
  var nagNotifyId = null;
    return {
      enableBlocking: function(html) {
        if(!html) {
          html = '<div class="nag-site-loader-text">Loading Application</div>';
        }

        if($('#nag-site-loader').length === 0) {
          $('body').append('<div id="nag-site-loader" class="nag-site-loader">' + html + '</div>');
        }
      },

      disableBlocking: function() {
        if($('#nag-site-loader').length !== 0) {
          $('#nag-site-loader').remove();
        }
      },

      isBlockingActive: function() {
        return $('#nag-site-loader').length !== 0;
      },

      enableNonBlocking: function(options) {
        var self = this;

        var notifyOptions = _.extend({
          content: '<div class="nag-message nag-message-notice">loading data</div>',
          autoCloseDelay: false,
          closeOnClick: false,
          verticalPosition: 'top',
          horizontalPosition: 'middle',
          cssClass: 'nag-non-blocking-loader',
          margin: 0
        }, options);

        if(nagNotifyId) {
          self.disableNonBlocking();
        }

        nagNotifyId = nagNotify.notify(notifyOptions);
      },

      disableNonBlocking: function() {
        if(nagNotifyId) {
          nagNotify.remove(nagNotifyId);
          nagNotifyId = null;
        }
      }
    }
}]);
