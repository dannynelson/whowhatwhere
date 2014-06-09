angular.module('filters.phoneFilter', [])

.filter('phone', function() {
  return function(numberStr) {
    if (numberStr.length) {
      return numberStr.substring(0,3)+'-'+numberStr.substring(3,6)+'-'+numberStr.substring(6);
    } else {
      return '';
    }
  };
});
