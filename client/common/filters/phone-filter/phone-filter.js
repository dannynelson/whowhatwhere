/**
 * @ngdoc filter
 * @name phone
 *
 * @description
 * Formats a phone number with dashes
 *
 * @param {string} numberStr - Phone number to format. Should be 10 consecutive digits as a string.
 * 
 * @example
 * <raty id="star{{$index}}" score="1" number="5"></raty>
 */

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
