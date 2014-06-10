// //  Business name 

// //  Business address 

// //  Business Phone number 

// //  Business url 

// //  The business photo 

// //  ??(foursquare only) If the business has a menu display a link to the menu 

// //  List of categories attributed to the business 

// //  Average business rating 

// //  ? Hours of operation with the current days hours of operation highlighted 

// //  ? Business description 

// //  Up to 5 customer reviews
// Add markers
// display info

angular.module('app', [
  'angularSpinner',
  'services.foursquareService',
  'services.yelpService',
  'filters.phoneFilter',
  'directives.mapDirective',
  'directives.raty'
])

.controller('AppController', function($scope, $q, foursquareService, yelpService) {
  $scope.search = function(location, term) {
    $scope.searching = true;
    $q.all([
      yelpService.search(location, term),
      foursquareService.search(location, term)
    ]).then(function(results) {
      // TODO: remove duplicates
      $scope.refreshMap(location);
      $scope.searching = false;
      $scope.results = results[0].concat(results[1]).slice(0, 25);
      $scope.addMarkers($scope.results);
      $scope.location = '';
      $scope.term = '';
    });
  };

  $scope.select = function(business) {
    $scope.selectedBusiness = business;
  };
});
