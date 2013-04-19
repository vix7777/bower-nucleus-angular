angular.module('nag.prism', [])
.directive('nagPrism', [
  '$timeout',
  function($timeout) {
    return {
      restrict: 'A',
      compile: function(tElement, tAttributes, transclude) {
        return {
          pre: function(scope, element, attributes) {},
          post: function(scope, element, attributes) {
            var $element = $(element);

            $timeout(function(){Prism.highlightElement($element.find('code')[0])}, 0);
          }
        }
      }
    }
  }
]);
