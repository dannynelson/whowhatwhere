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
  // var marker = new google.maps.Marker({
  //   position: myLatlng,
  //   map: map,
  //   title:"Hello World!"
  // });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
}
google.maps.event.addDomListener(window, 'load', initialize);

// this works too!
// $.getJSON('http://api.yelp.com/business_review_search?callback=?', {
//   term: 'vegan',
//   location: 'San Francisco',
//   ywsid: 'K2fIkNxOV2onPMDDF6867g',
//   limit: 10
// }, function(data) {
//   console.log(data);
// });

// // this works
// $.getJSON('https://api.foursquare.com/v2/venues/search?callback=?', {
//   near: 'Chicago, IL', // geocodable string
//   query: 'vegan',
//   limit: 10,
//   client_id: 'CBXEZMJBP2M1VV3WEVZKMY2C5CNAHVA42NIEEJCFFG1AWM21',
//   client_secret: '4YGI4CU3JXX0M32R5CSVDMMD21JUQZG1Z33LECZRXIZ0CD0Q',
//   v: '20140608'
// }, function(data) {
//   console.log(data);
// });
