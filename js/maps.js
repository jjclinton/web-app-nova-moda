$(document).ready(function () {
	//variables initialization
	var map;
	var json_php_data;
	var bounds = new google.maps.LatLngBounds();
	var infowindow = new google.maps.InfoWindow();

	//initialize map 
      function initialize() {
        map = new google.maps.Map(document.getElementById('map'), { //make the map callable
		//setup for the map
			center: new google.maps.LatLng(0,0),
			zoom: 1,
			mapTypeId: google.maps.MapTypeId.HYBRID,
			zoomControl: true,
			mapTypeControl: true,
			scaleControl: true,
			streetViewControl: true,
			rotateControl: true,
			fullscreenControl: true
        });
	  }
	  
	  //makes the marker
	  function setMarker(lat, lng, name){
		  var myLatlng = new google.maps.LatLng(lat, lng);
		  var marker = new google.maps.Marker({
			position: myLatlng,
			title:name,
		});
		//setups the click function for the marker
		bounds.extend(marker.getPosition());
		google.maps.event.addListener(marker, 'click', (function (marker) {
        return function () {
            infowindow.setContent(name);
            infowindow.open(map, marker);
			}
		})(marker));
	
		map.fitBounds(bounds);
		return marker;
	}
	
	//sets the marker on the map
	  function setonmap(marker){
		  marker.setMap(map);
	  }
	
	//gets the data from the php file
	  $.ajax({
                url : 'https://novamodaweather.site/encoder.php',
                type : 'POST',
                dataType : 'json',
                async: false,
                success : function (data) {
                    json_php_data = data;
                    console.log("parsed");
                }
            })
	
	
	//generated data from the php file is put onto the map by this function
	function setAll(){
		console.log(json_php_data);
		var start_north = 0;
		var start_south = 0;
		var markers = [];
		for(var i = 0; i < json_php_data.length; i++){
			var selected = json_php_data[i];
			//the markers for the south pole
			if(selected["COUNTRY"] == "SOUTH POLE" && start_south < 3){
				var lat_ = selected["LAT"];
				console.log(lat_);
				var long_ = selected["LONG"];
				var location_ = selected["LOCATION"];
				var marker = setMarker(lat_,long_, location_);
				setonmap(marker);
				start_south++;
				markers.push(marker);
			}
			//the markers for the north pole
			if(selected["COUNTRY"] == "NORTH POLE" && start_north < 3){
				var lat_ = selected["LAT"];
				console.log(lat_);
				var long_ = selected["LONG"];
				var location_ = selected["LOCATION"];
				var marker = setMarker(lat_,long_, location_);
				setonmap(marker);
				start_north++;
				markers.push(marker);
			}
			
		}
		//returns the markers
		return markers;
	}
	
	//initializes map en sets the markers with the click functions
	initialize();
	var markers = setAll();
	console.log(json_php_data.length);
});