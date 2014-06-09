function initialize() {
  var myLatlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    center: myLatlng,
    zoom: 8,
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

var yelpResource = 'http://api.yelp.com/business_review_search'

// this works too!
$.getJSON('http://api.yelp.com/business_review_search?callback=?', {
  term: 'vegan',
  location: 'San Francisco',
  ywsid: 'K2fIkNxOV2onPMDDF6867g',
  limit: 10
}, function(data) {
  console.log(data);
});
