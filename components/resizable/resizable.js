angular.module('nagResizable', [])
.directive('nagResizable', ['nagDefaults', function(nagDefaults) {
	return {
		restrict: 'A',
		compile: function(tElement, tAttributes, transclude) {
			return {
				pre: function(scope, element, attributes) {},
				post: function(scope, element, attributes) {
					$(element).resizable(scope.options);
				}
			}
		}
	}
}]);
