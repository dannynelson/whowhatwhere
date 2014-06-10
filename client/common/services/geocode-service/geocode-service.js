angular.module('services.geocodeService', [])

.factory('geocodeService', function($q) {
  geocoder = new google.maps.Geocoder();

  return {
    geocode: function(address) {
      var d = $q.defer();
      geocoder.geocode({address: address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          d.resolve(results[0].geometry.location);
        } else {
          d.reject("Was not able to locate the address for the following reason: " + status);
        }
      });
      return d.promise;
    }
  };
});
