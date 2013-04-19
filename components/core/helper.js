angular.module('nag.core.helpers', [])
.factory('nagHelper', [
  '$templateCache',
  'nagDefaults',
  function($templateCache, nagDefaults) {
    return {
      getAsyncTemplate: function(templateUrl) {
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
      },

      generateId: function(prefix) {
          return prefix + ($('[id^=' + prefix + ']').length + 1);
      },

      defaultValue: function(variable, defaultValue) {
          return (!_.isUndefined(variable) && !_(variable).isNull()) ? variable : defaultValue;
      },

      getTemplateString: function(options) {
          if(angular.isString(options.template) && options.template.length > 0) {
              return options.template;
          } else if (angular.isString(options.templateUrl) && options.templateUrl.length > 0) {
              return this.getAsyncTemplate(options.templateUrl);
          } else {
              return '';
          }
      },

      resolveTemplatePath: function(templatePath) {
        return (templatePath.indexOf('./') !== 0 && templatePath.indexOf('/') !== 0
        ? nagDefaults.getRootTemplatePath() + templatePath
        : templatePath);
      }
    }
  }
]);
