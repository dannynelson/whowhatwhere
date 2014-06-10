angular.module('directives.mapDirective', [
  'services.geocodeService'
])

.directive('mapDirective', function(geocodeService) {
  return {
    restrict: 'EA',
    scope: {
      refresh: '=',
      addMarkers: '='
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

      // Controllers APIs
      // ---------------------------------
      scope.refresh = function(location, markers) {
        geocodeService.geocode(location).then(function(coordinates) {
          debugger;
          map.setCenter(coordinates);
        });
      };

      scope.addMarkers = function(businesses) {
        angular.forEach(businesses, function(business) {
          if (business.address.geometry) {
            var marker = new google.maps.Marker({
              map: map,
              position: business.address.geometry,
              title: business.name
            });

            google.maps.event.addListener(marker, "mouseover", function() {
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
