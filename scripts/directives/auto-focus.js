nucleusAngular.directive('nagAutoFocus', function() {
	return {
		restrict: 'A',
		compile: function(element, attributes, transclude) {
			return {
				pre: function(scope, element, attributes) {},
				post: function(scope, element, attributes) {
					$(element).focus();
				}
			}
			/*return function(scope, element, attributes) {
				$(element).focus();
			}*/
		}
	};
});
