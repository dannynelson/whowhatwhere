/**
 * Service for injecting lodash.
 */

angular.module('services.lodash', [])

.factory('_', function($window) {
  return $window._;
});
