angular.module('nag.siteLoader', [])
.service('nagSiteLoader', [function() {
	var self = this;
	var enableCount = 0

	self.enable = function(html) {
    if(!html) {
      html = '<div class="nag-site-loader-text">Loading Application</div>';
    }

		if($('#nag-site-loader').length === 0) {
			$('body').append('<div id="nag-site-loader" class="nag-site-loader">' + html + '</div>');
			enableCount = 1;
		} else {
			enableCount += 1;
		}

	};

	self.disable = function() {
		enableCount -= 1;
		if(enableCount === 0 && $('#nag-site-loader').length !== 0) {
			$('#nag-site-loader').remove();
		}
	};

	self.isActive = function() {
		return enableCount > 0;
	};
}]);
