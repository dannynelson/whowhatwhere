angular.module('services.foursquareService', [
  'services.lodash'
])

.factory('foursquareService', function($http, $q, _) {
  var convertFoursquareDataFormat = function(businesses) {
    return _.map(businesses, function(business) {
      return {
        name: business.name,
        address: {
          address1: business.location.address,
          address2: '',
          address3: '',
          city: business.location.city,
          state: business.location.state,
          zip: business.location.postalCode,
          country: business.location.country,
          geometry: {
            lat: business.location.lat,
            lng: business.location.lng
          }
        },
        categories: _.map(business.categories, function(category) {
          return category.name;
        }),
        phone: business.contact.phone || '',
        menu: business.menu && business.menu.url,
        url: business.url,
        photo: null,
        rating: null,
        reviews: []
      };
    });
  };

  return {
    search: function(location, term) {
      var deferred = $q.defer();
      $http.jsonp('https://api.foursquare.com/v2/venues/search?callback=JSON_CALLBACK', {
        params: {
          near: location,
          query: term,
          limit: 20,
          client_id: 'CBXEZMJBP2M1VV3WEVZKMY2C5CNAHVA42NIEEJCFFG1AWM21',
          client_secret: '4YGI4CU3JXX0M32R5CSVDMMD21JUQZG1Z33LECZRXIZ0CD0Q',
          v: '20140608'
        }
      }).then(function(response) {
        debugger;
        deferred.resolve(convertFoursquareDataFormat(response.data.response.venues));
      });
      return deferred.promise;
    }
  };
});
