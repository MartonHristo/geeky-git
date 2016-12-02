var map;
var MarkersArray = new Array();
function myMap() {
  var mapCanvas = document.getElementById("map");  margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
  var mapOptions = {
    center: new google.maps.LatLng(43.0786, 25.6272),
    zoom: 6
  }
  map = new google.maps.Map(mapCanvas, mapOptions);

}

function deleteMarkers() {				
 for (var i = 0; i < MarkersArray.length; i++) {
    MarkersArray[i].setMap(null);
  }
  MarkersArray = [];
}

function addMarker (){
deleteMarkers();
 console.log ($('#search').val());
 $.ajax({url: "http://192.168.99.1:8081/" + $('#search').val(), success: function(result){
      
	   
	   for (var i=0; i<result.length; i++) {
	   console.log(result[i].geo.coordinates[0]); 
	   
	   
	   var LatLng1 =  new google.maps.LatLng(result[i].geo.coordinates[0],result[i].geo.coordinates[1]);
	    var contentString = result[i].description;
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
	   
	    var marker = new google.maps.Marker({
          position: LatLng1,
          map: map,
		  center: LatLng1
        });
		
	MarkersArray.push (marker);
		
  marker.addListener('click', function() {
          this.infowindow.open(map, this.marker);
        });
      }
	   
	   }
    }); }