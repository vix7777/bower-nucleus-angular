nucleusAngular.directive('nagGridData', ['$compile', '$http', '$templateCache', '$timeout', 'nagHelper', 'nagDefaults', function($compile, $http, $templateCache, $timeout, nagHelper, nagDefaults) {
	var ngCell = {
		restrict: 'A',
		scope: false,
		compile: function() {
			return {
				pre: function(scope, element) {
					//scope.options = nagDefaults.getGridOptions(scope.options);
					var template = scope.options.dataTemplateUrl;
					$(element).addClass('nag-grid-data');

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
