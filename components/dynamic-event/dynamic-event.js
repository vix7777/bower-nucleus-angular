(function() {
  var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
  var MOZ_HACK_REGEXP = /^moz([A-Z])/;

  function camelCase(name) {
    return name.
      replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
      }).
      replace(MOZ_HACK_REGEXP, 'Moz$1');
  }

  var PREFIX_REGEXP = /^(x[\:\-_]|data[\:\-_])/i;

  function directiveNormalize(name) {
    return camelCase(name.replace(PREFIX_REGEXP, ''));
  }

  var lowercase = function(string){return angular.isString(string) ? string.toLowerCase() : string;};

  var nagDynamicEventDirectives = {};
  angular.forEach(
    'click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave'.split(' '),
    function(name) {
      var directiveName = directiveNormalize('nag-' + name);
      nagDynamicEventDirectives[directiveName] = ['$parse', function($parse) {
        return function(scope, element, attr) {
          var fn = $parse(attr[directiveName]);
          element.bind(lowercase(name), function(event) {
            scope.$apply(function() {
              var results = fn(scope, {$event:event});

              if(angular.isObject(results)) {
                var trueFunction = null;

                angular.forEach(results, function(check, newFunction) {
                  if(check === true) {
                    trueFunction = $parse(newFunction);
                  }
                });

                if(angular.isFunction(trueFunction)) {
                  trueFunction(scope, {$event:event});
                }
              }
            });
          });
        };
      }];
    }
  );

  angular.module('nag.dynamicEvent', [])
  .directive(nagDynamicEventDirectives);
}());
