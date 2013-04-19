/*
 * Defines the ui-if tag. This removes/adds an element from the dom depending on a condition
 * Originally created by @tigbro, for the @jquery-mobile-angular-adapter
 * https://github.com/tigbro/jquery-mobile-angular-adapter
 */
angular.module('nag.if', [])
.directive('nagIf', [function() {
  return {
    transclude:'element',
    priority:1000,
    terminal:true,
    compile:function(element, attr, linker) {
      return function(scope, iterStartElement, attr) {
        iterStartElement[0].doNotMove = true;
        var expression = attr.nagIf;
        var lastElement;
        var lastScope;
        scope.$watch(expression, function(newValue) {
          if (lastElement) {
            lastElement.remove();
            lastElement = null;
          }
          if (lastScope) {
            lastScope.$destroy();
            lastScope = null;
          }
          if (newValue) {
            lastScope = scope.$new();
            linker(lastScope, function(clone) {
              lastElement = clone;
              iterStartElement.after(clone);
            });
          }
        });
      };
    }
  }
}]);
