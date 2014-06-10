/**
 * @ngdoc directive
 * @name raty
 * @restrict E
 *
 * @description
 * Directive that converts rating data into stars
 * 
 * @example
 * <raty id="star{{$index}}" score="1" number="5"></raty>
 */

angular.module('directives.raty', [])

.directive("raty", function() {
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      angular.element(element).raty({
        score: attrs.score,
        number: attrs.number,
        readOnly: true
      });
    }
  };
});
