/**
 * todo: add ajax supported tabs
 */
nucleusAngular.directive('nagTabs', ['$timeout', '$http', 'nagDefaults', function($timeout, $http, nagDefaults){
	return {
		restrict: 'A',
		scope: {
			options: '=nagTabs'
		},
		compile: function() {
			return {
				pre: function(scope, element, attributes) {
					scope.options = nagDefaults.getTabsOptions(scope.options);
					$(element).addClass('nag-tabs');
				},
				post: function(scope, element, attributes) {
					scope.switchTab = function(tab) {
						if(angular.isNumber(tab)) {
							tab = $(element).find('.tabs li:nth-child(' + tab + ')').data('tab');
						}

						$(element).find('.tabs li').removeClass('active');
						$(element).find('.tabs li[data-tab="' + tab + '"]').addClass('active');

						$(element).find('.tab-content-item').removeClass('active');
						$(element).find('.tab-content-item[data-tab="' + tab + '"]').addClass('active');
					}

					//load the default tab
					scope.switchTab(scope.options.defaultTab);
				}
			};
		}
	}
}]);
