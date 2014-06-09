debugger;
angular.module('directives.mapDirective', [])

.directive('mapDirective', function() {
  return {
    restrict: 'EA',
    // template: '<div id="#map-canvas"></div>',
    link: function(scope, element, attrs) {
      debugger;
      // var initializeMap = function() {
        // start map at San Francisco latitude and longitude
        var myLatlng = new google.maps.LatLng(37.783, -122.419);
        var mapOptions = {
          center: myLatlng,
          zoom: 10,
          disableDefaultUI: true
        };
        var map = new google.maps.Map(element[0], mapOptions);

        var infowindow = new google.maps.InfoWindow({
          content: "<span>any html goes here</span>"
        });

        // To add the marker to the map, use the 'map' property
        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title:"Hello World!"
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });
      // };

      // google.maps.event.addDomListener(window, 'load', initializeMap);
    }
  };
});