angular.module('nag.siteLoader', [
  'nag.notify'
]).service('nagSiteLoader', ['nagNotify', function(nagNotify) {
  var self = this;
  var nagNotifyId = null;

  self.enableBlocking = function(html) {
    if(!html) {
      html = '<div class="nag-site-loader-text">Loading Application</div>';
    }

    if($('#nag-site-loader').length === 0) {
      $('body').append('<div id="nag-site-loader" class="nag-site-loader">' + html + '</div>');
    }
  };

  self.disableBlocking = function() {
    if($('#nag-site-loader').length !== 0) {
      $('#nag-site-loader').remove();
    }
  };

  self.isBlockingActive = function() {
    return $('#nag-site-loader').length !== 0;
  };

  self.enableNonBlocking = function(options) {
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
  };

  self.disableNonBlocking = function() {
    if(nagNotifyId) {
      nagNotify.remove(nagNotifyId);
      nagNotifyId = null;
    }
  };
}]);
