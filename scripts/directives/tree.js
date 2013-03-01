nucleusAngular.directive('nagTree', ['$compile', 'nagHelper', 'nagDefaults', function($compile, nagHelper, nagDefaults) {
	return {
		restrict: 'A',
		scope: {
			options: '=nagTree'
		},
		compile: function() {
			return {
				pre: function(scope, element, attributes) {
					scope.options = nagDefaults.getTreeOptions(scope.options);
					var template = $(nagHelper.getTemplateString(scope.options));

					$(element).append($compile(template)(scope));
					$(element).addClass('nag-tree');
				},
				post: function(scope, element, attributes) {
					scope.treeClick = function($event) {
						$event.preventDefault();
						$event.stopPropagation();
						$($event.currentTarget).toggleClass('expanded');
					}

					scope.nodeClick = function($event, nodeData) {
						$event.preventDefault();
						$event.stopPropagation();
					}

					scope.hasNodes = function(data) {
						return (angular.isDefined(data.nodes) && angular.isArray(data.nodes));
					}
				}
			};
		}
	};
}]);
