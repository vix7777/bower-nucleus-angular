angular.module('nagValidate.match', [])
.directive('nagValidateMatch', ['nagDataValidation', function(nagDataValidation) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attributes, controller) {
			var validate = function(value) {
				var match = scope.$eval(attributes.nagValidateMatch);

				if(nagDataValidation.match(value, match) === true) {
					controller.$setValidity('nagMatch', true);
				} else {
					controller.$setValidity('nagMatch', false);
				}

				return value;
			};

      scope.$watch(attributes.nagValidateMatch, function(otherModelValue) {
        controller.$setValidity('nagMatch', controller.$viewValue === otherModelValue);
      });

			controller.$formatters.push(validate);
			controller.$parsers.unshift(validate);

			attributes.$observe('nagValidateMatch', function() {
				validate(controller.$modelValue);
			});
		}
	};
}]);
