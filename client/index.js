angular.module('app', [
  'angularSpinner',
  'services.foursquareService',
  'services.yelpService',
  'filters.phoneFilter',
  'directives.mapDirective',
  'directives.raty'
])

.controller('AppController', function($scope, $q, foursquareService, yelpService, _) {
  /** 
   * Merge results into one unique array. If there is a duplicate, go with the first set.
   * @param {array} results1 - first array of business data
   * @param {array} results1 - second array of business data
   * @return {array} merged data
   */
  var mergeUniqueResults = function(results1, results2) {
    var resultsMap = {};
    angular.forEach(results1, function(result) {
      resultsMap[result.name.toLowerCase()] = result;
    });
    angular.forEach(results2, function(result) {
      var businessName = result.name.toLowerCase();
      resultsMap[businessName] = resultsMap[businessName] || result;
    });
    return _.map(resultsMap, function(result, businessName) {
      return result;
    });
  };

  /** 
   * Search both yelp and foursquare, and update page with results.
   * @param {string} location - location to search for
   * @param {string} term - additional term to refine search
   */
  $scope.search = function(location, term) {
    if (!/\w+/.test(location)) {
      alert('Sorry, a location is required!');
    } else {
      $scope.searching = true;
      $scope.refreshMap(location);
      $q.all([
        yelpService.search(location, term),
        foursquareService.search(location, term)
      ]).then(function(results) {
        $scope.searching = false;
        $scope.results = mergeUniqueResults(results[0], results[1]).slice(0, 25);
        $scope.addMarkers($scope.results);
        $scope.location = '';
        $scope.term = '';
      });
    }
  };

  $scope.select = function(business) {
    $scope.selectedBusiness = business;
    $scope.addMarkers([business]);
  };

  $scope.returnToList = function() {
    $scope.selectedBusiness = null;
    $scope.addMarkers($scope.results);
  };
});
