angular.module('nag.core.helpers', [])
.service('nagHelper', ['$templateCache', 'nagDefaults', function($templateCache, nagDefaults) {
	this.getAsyncTemplate = function(templateUrl) {
		//todo: figure out if there is a way to using $http instead of jQuery $.ajax with async false without having the render of initial load
		/*$http.get(template, {cache: $templateCache}).success(function(html) {
			element.append($compile(html)(scope));
		});*/

    templateUrl = this.resolveTemplatePath(templateUrl);
		var html = $templateCache.get(templateUrl);

		if(!html) {
			html = $.ajax({
				type: "GET",
				url: templateUrl,
				async: false
			}).responseText;
			$templateCache.put(templateUrl, html);
		}

		return html;
	};

	this.generateId = function(prefix) {
		return prefix + ($('[id^=' + prefix + ']').length + 1);
	};

	this.defaultValue = function(variable, defaultValue) {
		return (!_.isUndefined(variable) && !_(variable).isNull()) ? variable : defaultValue;
	}

	this.getTemplateString = function(options) {
		if(angular.isString(options.template) && options.template.length > 0) {
			return options.template;
		} else if (angular.isString(options.templateUrl) && options.templateUrl.length > 0) {
			return this.getAsyncTemplate(options.templateUrl);
		} else {
			return '';
		}
	}

  this.resolveTemplatePath = function(templatePath) {
    return (templatePath.indexOf('./') !== 0 && templatePath.indexOf('/') !== 0
    ? nagDefaults.getRootTemplatePath() + templatePath
    : templatePath);
  }
}]);
