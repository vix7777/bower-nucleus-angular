/**
 * todo: add custom that will execute a custom function
 */
angular.module('nag.dataValidation', [])
.factory('nagDataValidation', [function() {
  return {
    email: function(value){
        var regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
        return regex.test(value);
    },

    notEmpty: function(value){
        var test = value;
        return (!_(test).isNull() && !_(test).isEmpty() && !_(test).isUndefined());
    },

    min: function(value, minValue){
        var value = parseInt(value)
        return (!_(value).isNaN() && value >= minValue);
    },

    max: function(value, maxValue){
        var value = parseInt(value)
        return (!_(value).isNaN() && value <= maxValue);
    },

    range: function(value, minValue, maxValue){
        var value = parseInt(value)
        return (!_(value).isNaN() && value >= minValue && value <= maxValue);
    },

    match: function(value1, value2){
        return _(value1).isEqual(value2);
    }
  }
}]);
