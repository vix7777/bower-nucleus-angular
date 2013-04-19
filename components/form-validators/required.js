angular.module('nag.validate.required', [])
.directive('nagValidateRequired', [
  'nagDataValidation',
  function(nagDataValidation) {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {},
      link: function(scope, element, attributes, controller) {
        var validate = function(value) {
          if(nagDataValidation.notEmpty(value) === true) {
            controller.$setValidity('nagRequired', true);
          } else {
            controller.$setValidity('nagRequired', false);
          }

          return value;
        };

        controller.$formatters.push(validate);
        controller.$parsers.unshift(validate);

        attributes.$observe('nagValidateRequired', function() {
          validate(controller.$modelValue);
        });
      }
    };
  }
]);
