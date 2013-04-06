angular.module('nagValidate.max', [])
.directive('nagValidateMax', ['nagDataValidation', function(nagDataValidation) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attributes, controller) {
			var validate = function(value) {
				if(nagDataValidation.max(value, attributes.nagValidateMax) === true) {
					controller.$setValidity('nagMax', true);
				} else {
					controller.$setValidity('nagMax', false);
				}

				return value;
			};

			controller.$formatters.push(validate);
			controller.$parsers.unshift(validate);

			attributes.$observe('nagValidateMax', function() {
				validate(controller.$modelValue);
			});
		}
	};
}]);
