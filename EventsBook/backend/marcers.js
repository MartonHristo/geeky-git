//var synonyms = require('synonyms');
var map;
var MarkersArray = new Array();
function myMap() {
  var mapCanvas = document.getElementById("map");  margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
  var mapOptions = {
    center: new google.maps.LatLng(42.619441, 25.392958),
    zoom: 8
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
   // synonyms($('#search').val());
    console.log ($('#search').val());
     $.ajax({url: "http://192.168.99.1:8081/" + $('#search').val(), success: function(result){
        
        console.log(result.length);
     
     
     if(result.length > 0){
	   for (var i=0; i<result.length; i++) {
           
	   console.log(result[i].events.description); 
           
	    var LatLng1 =  new google.maps.LatLng(result[i].events.venue.location.latitude,result[i].events.venue.location.longitude);
           
	    var contentString = result[i].events.description;
           
        var titleString = result[i].events.name;

           
        var infowindow = new google.maps.InfoWindow();
           
	    
           
	    var marker = new google.maps.Marker({
          position: LatLng1,
          map: map,
		  center: LatLng1
        });
		
	MarkersArray.push (marker);
    bindInfoWindow(marker, map, infowindow, contentString, titleString)
		
  
      }
	    }
     else{
         alert("Няма такива събития! :(");
     }
	   }   
    }); 
}

      function bindInfoWindow(marker, map, infowindow, content, title) {
        marker.addListener('click', function() {
            infowindow.setContent('<h4>' + title + '</h2><p>' + content + '</p>');
            infowindow.open(map, this);
    });
} 



		
