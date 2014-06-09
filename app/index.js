// this works too!
var searchYelp = function(location, term, onSuccess) {
  $.getJSON('http://api.yelp.com/business_review_search?callback=?', {
    location: location,
    term: term,
    ywsid: 'K2fIkNxOV2onPMDDF6867g',
    limit: 20
  }, function(data) {
    debugger;
    onSuccess(null, data.businesses);
  });
};

var searchFoursquare = function(location, term, onSuccess) {
  $.getJSON('https://api.foursquare.com/v2/venues/search?callback=?', {
    near: location,
    query: term,
    limit: 20,
    client_id: 'CBXEZMJBP2M1VV3WEVZKMY2C5CNAHVA42NIEEJCFFG1AWM21',
    client_secret: '4YGI4CU3JXX0M32R5CSVDMMD21JUQZG1Z33LECZRXIZ0CD0Q',
    v: '20140608'
  }, function(data) {
    debugger;
    onSuccess(null, data.response.venues);
  });
};

function initialize() {
  var myLatlng = new google.maps.LatLng(37.783, -122.419);
  var mapOptions = {
    center: myLatlng,
    zoom: 10,
    disableDefaultUI: true
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

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
}
google.maps.event.addDomListener(window, 'load', initialize);

$(function() {
  $('#search').click(function() {
    debugger;
    var location = $('#location').val();
    var term = $('#term').val();
    $('#location').val('');
    $('#term').val('');
    debugger;

    async.parallel({
      yelp: function(callback){
        searchYelp(location, term, callback);
      },
      foursquare: function(callback){
        searchFoursquare(location, term, callback);
      }
    }, function(err, results) {
      debugger;
        // results is now equals to: {one: 1, two: 2}
    });
  });
});

