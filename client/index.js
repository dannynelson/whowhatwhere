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

angular.module('app', [
  'services.foursquareService',
  'services.yelpService',
  'directives.mapDirective'
])

.controller('AppController', function($scope, $q, foursquareService, yelpService) {
  $scope.search = function(location, term) {
    debugger;
    $q.all([
      yelpService.search(location, term),
      foursquareService.search(location, term)
    ]).then(function(results) {
      debugger;
      $scope.location = '';
      $scope.term = '';
    });
  };
});

// $(function() {
//   $('#search').click(function() {
//     debugger;
//     var location = $('#location').val();
//     var term = $('#term').val();
//     $('#location').val('');
//     $('#term').val('');
//     debugger;

//     async.parallel({
//       yelp: function(callback){
//         searchYelp(location, term, callback);
//       },
//       foursquare: function(callback){
//         searchFoursquare(location, term, callback);
//       }
//     }, function(err, results) {
//       debugger;
//         // results is now equals to: {one: 1, two: 2}
//     });
//   });
// });

