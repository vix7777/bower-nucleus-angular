nucleusAngular.directive('nagExpander', ['nagDefaults', function(nagDefaults){
	return {
		restrict: 'A',
		scope: {
			options: '=nagExpander'
		},compile: function(element, attributes, transclude) {
			$(element).addClass('nag-expander');

			$(element).find('.handle').attr('ng-click', 'contentVisible = !contentVisible');
			$(element).find('.content').attr('ng-show', 'contentVisible');

			return function(scope, element, attributes) {
				scope.options = nagDefaults.getExpanderOptions(scope.options);
				scope.contentVisible = false;
			}
		}
	};
}]);
