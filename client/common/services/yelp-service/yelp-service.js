angular.module('services.yelpService', [
  'services.lodash',
  'services.geocodeService'
])

.factory('yelpService', function($http, $q, _, geocodeService) {
  var convertYelpDataFormat = function(businesses) {
    return _.map(businesses, function(business) {
      debugger;
      return {
        name: business.name,
        address: {
          address1: business.address1,
          address2: business.address2,
          address3: business.address3,
          city: business.city,
          state: business.state,
          zip: business.zip,
          country: business.country,
          geometry: null
        },
        categories: _.map(business.categories, function(category) {
          return category.name;
        }),
        phone: business.phone,
        menu: null,
        url: business.url,
        photo: business.photo_url,
        rating: business.avg_rating,
        // for some reason, yelp only returns at most 1 review
        reviews: _.map(business.reviews, function(review) {
          return {
            user: review.user_name,
            rating: review.rating,
            text: review.text_excerpt
          };
        }).slice(0,5)
      };
    });
  };

  var addGeocodeToBusinesses = function(businesses) {
    // return map of functions that will resolve all geocodes
    return _.map(businesses, function(business) {
      var deferred = $q.defer();
      geocodeService.geocode(business.address.address1 + ' ' + business.address.city + ' ' + business.address.state + ' ' + business.address.zip).then(function(geometry) {
        business.address.geometry = {
          lat: geometry.k,
          lng: geometry.A,
        };
        deferred.resolve(business);
      // geocoder maxes out at 10 consecutive queries. Could try throttling to get more
      }).catch(function(err) {
        deferred.resolve(business);
      });
      return deferred.promise;
    });
  };

  return {
    search: function(location, term) {
      var deferred = $q.defer();
      $http.jsonp('http://api.yelp.com/business_review_search?callback=JSON_CALLBACK', {
        params: {
          location: location,
          term: term,
          ywsid: 'K2fIkNxOV2onPMDDF6867g',
          limit: 20
        }
      }).then(function(response) {
        var businesses = convertYelpDataFormat(response.data.businesses);
        var promises = addGeocodeToBusinesses(businesses);
        $q.all(promises).then(function(results) {
          deferred.resolve(results);
        });
      });
      return deferred.promise;
    }
  };
});
