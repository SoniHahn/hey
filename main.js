// on load, get data
document.addEventListener("DOMContentLoaded", init, false);
// $( document ).ready(function() {
function init(){
  $.ajax({
      url: 'data/data.json',
      type: 'GET',
      failure: function(err){
        return alert(err);
      },
      success: function(data) {
        //map
        positionMap(); // let's position the map
          var location = getLocationData(data);
            buildMap(location, {map: document.getElementById('map-canvas')});
//          buildLegend(data);
     
      }
  });  

}

function getLocationData(value){
  var map = [];
  
  value.forEach(function(data){
    if(data.location != null){
      map.push(data.location);
    }
  });
  return map;

}
  

function buildMap (location, elements) {

  // Start of Map based stuff
  var getDefaultMapViewSettings = function(location) {
    return {
      center: {lat: 52.085313, lng: 30.607189},
      zoom: 2,
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      }
    };
  } 

  var buildCircles = function(location, map) {
    return location.map(function(loc) { 
      var options = {
        // strokeColor: '#000000',
        strokeOpacity: 0,
        strokeWeight: 0,
        fillColor: '#e20074',
        fillOpacity: 0.8,
        map: map,
        center: new google.maps.LatLng(loc.geo[0], loc.geo[1]),
        radius: 5
      };
      return new google.maps.Circle(options);
    });
  }


  var center = new google.maps.LatLng(location[0].geo[1], location[0].geo[0]);

  var map = new google.maps.Map(elements.map, getDefaultMapViewSettings(center));

  var circles = buildCircles(location, map);

  circles.forEach(function(circle) {
    var p = Math.pow(2, (21 - map.getZoom()));
    circle.setRadius(p * 110.0 * 0.0025);    
  });


  google.maps.event.addListener(map, 'zoom_changed', function() {
    circles.forEach(function(circle) {
      var p = Math.pow(2, (21 - map.getZoom()));
      circle.setRadius(p * 110.0 * 0.0025);
    });
  });
}


function positionMap(){
  var width = $( window ).width();
  var height = $( window ).height();

  $( '#map-canvas' ).width(width);
  $( '#map-canvas' ).height(height);
  console.log("Marc, Taking over the world is hard.")
  console.log("Good luck with that!")
  console.log("Anyway, prom with me? Say YES!")
  console.log("Love you <3")
}

function positionLegend(){
  var width = ($( window ).width())/5;
  var height = $( window ).height();

  $( '#map-legend' ).width(width);
  $( '#map-legend' ).height(height);  
}

// adjust map on window resize
$( window ).resize(function() {
  positionMap();
  positionLegend();
});

//End of Map
