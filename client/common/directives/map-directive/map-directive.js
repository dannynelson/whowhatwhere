/**
 * @ngdoc directive
 * @name mapDirective
 * @restrict A
 *
 * @description
 * Creates a google map, with an API for adding markers, and recentering.
 *
 * @example
 * <div map-directive id="map-canvas" refresh="refreshMap" add-markers="addMarkers" select="select"></div>
 */

angular.module('directives.mapDirective', [
  'services.geocodeService'
])

.directive('mapDirective', function(geocodeService) {
  return {
    restrict: 'A',
    scope: {
      refresh: '=',
      addMarkers: '=',
      select: '='
    },
    link: function(scope, element, attrs) {
      var myLatlng = new google.maps.LatLng(37.783, -122.419);
      var mapOptions = {
        center: myLatlng,
        zoom: 12,
        disableDefaultUI: true
      };
      var map = new google.maps.Map(element[0], mapOptions);
      var infowindow = new google.maps.InfoWindow();
      var markers = [];

      // Sets the map on all markers in the array.
      var setAllMap = function(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      };
      // Removes the markers from the map, but keeps them in the array.
      var clearMarkers = function() {
        setAllMap(null);
      };
      // Deletes all markers in the array by removing references to them.
      var deleteMarkers = function() {
        clearMarkers();
        markers = [];
      };
      
      /** 
       * Recenter map at new location
       * @param {string} location - String of location where map will be centered
       */
      scope.refresh = function(location) {
        geocodeService.geocode(location).then(function(coordinates) {
          // offset coordinates to accomodate for sidebar width
          coordinates.A += 0.08;
          map.setCenter(coordinates);
        });
      };

      /** 
       * Add collection of markers to map, remove existing markers. Add listeners for marker click and hover.
       * @param {array} businesses - Array of businesses, containing coordinate information to represent markers on the map
       */
      scope.addMarkers = function(businesses) {
        deleteMarkers();
        angular.forEach(businesses, function(business) {
          if (business.address.geometry) {
            var marker = new google.maps.Marker({
              map: map,
              position: business.address.geometry,
              title: business.name
            });
            markers.push(marker);

            google.maps.event.addListener(marker, 'click', function() {
              scope.$apply(function() {
                scope.select(business);
              });
            });

            google.maps.event.addListener(marker, 'mouseover', function() {
              var contentString = '<div>'+
                '<div><strong>'+business.name+'</strong></div>'+
                angular.element('<div></div>').raty({
                  score: business.rating || 0,
                  number: 5,
                  readOnly: true
                }).html() +
                '<div>'+(business.address.address1 || business.address.city || '') + ', ' + business.address.zip+'</div>'+
                '</div>';

              infowindow.setContent(contentString);
              infowindow.open(map, marker);
            });
          }
        });
      };
    }
  };
});
