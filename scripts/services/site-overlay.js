nucleusAngular.service('nagSiteOverlay', [function() {
	var self = this;
	var enableCount = 0

	self.enable = function() {
		if($('#nag-site-overlay').length === 0) {
			$('body').append('<div id="nag-site-overlay" class="nag-site-overlay"></div>');
			enableCount = 1;
		} else {
			enableCount += 1;
		}

	};

	self.addEvent = function(eventName, callback) {
		if($('#nag-site-overlay') != 0) {
			$('#nag-site-overlay').bind(eventName, callback);
		}
	};

	self.disable = function() {
		enableCount -= 1;
		if(enableCount === 0 && $('#nag-site-overlay').length !== 0) {
			$('#nag-site-overlay').remove();
		}
	};

	self.isActive = function() {
		return enableCount > 0;
	};
}]);
