angular.module('nag.siteOverlay', [])
.service('nagSiteOverlay', [function() {
  var enableCount = 0;

  return {
    enable: function() {
      if($('#nag-site-overlay').length === 0) {
        $('body').append('<div id="nag-site-overlay" class="nag-site-overlay"></div>');
        enableCount = 1;
      } else {
        enableCount += 1;
      }

    },

    addEvent: function(eventName, callback) {
      if($('#nag-site-overlay') != 0) {
        $('#nag-site-overlay').bind(eventName, callback);
      }
    },

    disable: function() {
      enableCount -= 1;
      if(enableCount === 0 && $('#nag-site-overlay').length !== 0) {
        $('#nag-site-overlay').remove();
      }
    },

    isActive: function() {
      return enableCount > 0;
    }
  }
}]);
