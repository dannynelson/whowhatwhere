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

      // To add the marker to the map, use the 'map' property
      // var marker = new google.maps.Marker({
      //   position: myLatlng,
      //   map: map,
      //   title:"Hello World!"
      // });

      // google.maps.event.addListener(marker, 'click', function() {
      //   infowindow.open(map, marker);
      // });

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
              infowindow.setContent(business.name);
              infowindow.open(map, marker);
            });
          }
        });
      };
    }
  };
});
