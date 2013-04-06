angular.module('nagValidate.min', [])
.directive('nagValidateMin', ['nagDataValidation', function(nagDataValidation) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attributes, controller) {
			var validate = function(value) {
				if(nagDataValidation.min(value, attributes.nagValidateMin) === true) {
					controller.$setValidity('nagMin', true);
				} else {
					controller.$setValidity('nagMin', false);
				}

				return value;
			};

			controller.$formatters.push(validate);
			controller.$parsers.unshift(validate);

			attributes.$observe('nagValidateMin', function() {
				validate(controller.$modelValue);
			});
		}
	};
}]);
