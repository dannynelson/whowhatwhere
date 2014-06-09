angular.module('services.yelpService', [
  'services.lodash'
])

.factory('yelpService', function($http, $q, _) {
  var convertYelpDataFormat = function(businesses) {
    return _.map(businesses, function(business) {
      return {
        name: business.name,
        address: {
          address1: business.address1,
          address2: business.address2,
          address3: business.address3,
          city: business.city,
          state: business.state,
          zip: business.zip,
          country: business.country
        },
        categories: _.map(business.categories, function(category) {
          return category.name;
        }),
        phone: business.phone,
        menu: null,
        url: business.url,
        photo: business.photo_url,
        avgRating: business.avg_rating,
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

  return {
    search: function(location, term) {
      return $http.jsonp('http://api.yelp.com/business_review_search', {
        location: location,
        term: term,
        ywsid: 'K2fIkNxOV2onPMDDF6867g',
        limit: 20
      });
      // angular.getJSON('http://api.yelp.com/business_review_search?callback=?', {
      //   location: location,
      //   term: term,
      //   ywsid: 'K2fIkNxOV2onPMDDF6867g',
      //   limit: 20
      // }, function(data) {
      //   onSuccess(null, data.businesses);
      // });
    }
  };
});
