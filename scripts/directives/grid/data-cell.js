nucleusAngular.directive('nagGridDataCell', ['$compile', '$http', '$templateCache', 'nagHelper', 'nagDefaults', function($compile, $http, $templateCache, nagHelper, nagDefaults) {
	var ngCell = {
		restrict: 'A',
		scope: false,
		compile: function() {
			return {
				pre: function(scope, element, attributes) {
					var template = scope.$eval(attributes.template);
					//scope.options = nagDefaults.getGridOptions(scope.options);
					$(element).addClass('nag-grid-data-cell');

					//todo: figure out if there is a way to using $http instead of jQuery $.ajax with async false without having the render of initial load
					/*$http.get(template, {cache: $templateCache}).success(function(html) {
						element.append($compile(html)(scope));
					});*/

					var html = nagHelper.getAsyncTemplate(template);
					element.append($compile(html)(scope));
				}
			};
		}
	};
	return ngCell;
}]);
