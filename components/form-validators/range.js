angular.module('nag.validate.range', [])
.directive('nagValidateRange', ['nagDataValidation', function(nagDataValidation) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attributes, controller) {
			var options = scope.$eval(attributes.nagValidateRange);
			var validate = function(value) {
				if(nagDataValidation.range(value, options.min, options.max) === true) {
					controller.$setValidity('nagRange', true);
				} else {
					controller.$setValidity('nagRange', false);
				}

				return value;
			};

			controller.$formatters.push(validate);
			controller.$parsers.unshift(validate);

			attributes.$observe('nagValidateRange', function() {
				validate(controller.$modelValue);
			});
		}
	};
}]);
