/**
 * Service for injecting async
 */

angular.module('services.async', [])

.factory('async', function($window) {
  return $window.async;
});
