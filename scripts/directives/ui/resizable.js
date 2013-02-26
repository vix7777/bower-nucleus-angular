nucleusAngular.directive('nagResizable', ['nagDefaults', function(nagDefaults) {
	return {
		restrict: 'A',
		scope: {
			options: '=nagResizable'
		},
		compile: function(tElement, tAttributes, transclude) {
			return {
				pre: function(scope, element, attributes) {
					scope.options = nagDefaults.getResizableOptions(scope.options);
				},
				post: function(scope, element, attributes) {
					$(element).resizable(scope.options);
				}
			}
		}
	}
}]);
