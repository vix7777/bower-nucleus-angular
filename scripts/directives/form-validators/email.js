nucleusAngular.directive('nagValidateEmail', ['nagDataValidation', function(nagDataValidation) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attributes, controller) {
			var validate = function(value) {
				if(nagDataValidation.email(value) === true) {
					controller.$setValidity('nagEmail', true);
				} else {
					controller.$setValidity('nagEmail', false);
				}

				return value;
			};

			controller.$formatters.push(validate);
			controller.$parsers.unshift(validate);

			attributes.$observe('nagValidateEmail', function() {
				validate(controller.$modelValue);
			});
		}
	};
}]);
