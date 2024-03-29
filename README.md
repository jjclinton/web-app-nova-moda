"# web-app-nova-moda" 


username: novamoda

password: k0R*l%mK4$95

# Documentation

## Introduction

This documentation is for the web application for the weather stations
with info relevant to Nova Moda's requirements.

## PHP

## Config.php
In the configuration file the login settings are configured. There is no database.
The password hash is for safety requirements. So the password itself is nowhere
to be fount in the PHP files. The username is not hashed because it doesn't need to
be. Username is open for everyone

At the top of the configuration file the session is started so if the user logs in
the user stays logged in during the entire session, until the user closes the window.

```
<?php
/**
 * Configuration file
 **/
require('functions.php');
define('INCLUDED', true);
//start session to save loggedin users
session_start();

//not loggedin by default
$loggedin = false;

//username and password hash for security
$username = "novamoda";
$hash = "$2y$10$8eny5silxm6o/Mgekb/I/.MP3TfiO6r4mAD/wXPcwnpvdwLT3E0.m";

//no login error by default
$login_error = "";

//is the get variable logout is empty and not 1 do not reset the session array
if (!empty($_GET['logout'])) {
	if ($_GET['logout'] == '1') {
		$_SESSION = [];
	}
}

//if the post variables are not empty, check the post variables username and verify password with hash
if (!empty($_POST['username']) && !empty($_POST['password'])) {
	if ( $_POST['username'] == $username && password_verify($_POST['password'], $hash) ) {
		$_SESSION['username'] = $_POST['username'];
		$_SESSION['password'] = $_POST['password'];
	} else {
		$login_error = "invalid username or password";
	}
}

//check session username and password, so the user stays loggedin
if (!empty($_SESSION['username']) && !empty($_SESSION['password'])) {
	if ( $_SESSION['username'] == $username && password_verify($_SESSION['password'], $hash) ) {
		$loggedin = true;
	}
}
```

As you can see the session username and password is saved and the user doesn't have to login each
time a page is refreshed.

### socketConnector.php
This file ensures that a connection has been made with a local running java program that is used on the VM itself.
The java program works like a database engine. You just have to give it arguments and it will send the values back to you
in a way that easier for the people that are working on the front end.

```
function connectSocket(){
  $address = "localhost";
  $port = 54872;
  
  //Attempt to create a socket resource and echo an error code if the attempt fails
  if (($socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP)) === false) {
    echo "socket creation failed: " .socket_strerror(socket_last_error())."\n";
  }
  
  //Attempt to establish socket connection and echo an error code if the attempt fails
  if (($connection = socket_connect($socket, $address, $port)) === false){
    echo "Socket connection failed: ".socket_strerror(socket_last_error())."\n";
  }

  return $socket;
}
```

This code snippet ensures that a good connection has been made between the java program and the php file.

```
function parseData($result){
  // Split into rows
  $entries = explode(";", $result);
  $aso = [];

  // Extract header
  $header = explode(",", array_shift($entries));

  // Create associative array 
  foreach($entries as $entry) {
    $arr = explode(",", $entry);
    array_push($aso, array_combine($header, explode(",", $entry)));
  }

  return $aso;
}
```

This part of the code makes is so the data that has been recieved from the database engine is parsed
as an array of an associative array. 

```
function update(){
  //Establish connection with storage application
  $socket = connectSocket();

  //Request update data
  $input = "update\r\n";
  socket_write($socket, $input, strlen($input));
  $result = socket_read($socket, 4096, PHP_NORMAL_READ);

  //Close socket
  socket_close($socket);

  //Parse data into associative array
  $parsed = parseData($result);

  //Return parsed data to caller
  return $parsed;
}

function history($date){
  //Establish connection with storage application
  $socket = connectSocket();

  //Request update data
  $input = "history;".$date."\r\n";
  socket_write($socket, $input, strlen($input));
  $result = socket_read($socket, 4096, PHP_NORMAL_READ);

  //Close socket
  socket_close($socket);

  //Parse data into associative array
  $parsed = parseData($result);

  //Return parsed data to caller
  return $parsed;
}
```

these two function are called from the Jquery library when it needs data from the database engine.
You just type in your values for history function and the update function does it by itself.

### encoder.php
The encoder.php echos the data that was requested from him. The echoed data is used in a ajax function
and is fully parsed into a table by a javascript file. The php file uses a function from the socketConnector.php file.


```
include('config.php');
include('socketConnector.php');
if($loggedin == true){
    $json_encoded = json_encode(update());
    $json_encoded = str_replace("\\r", "", $json_encoded);
    $json_encoded = str_replace("\\","",$json_encoded);
    $json_encoded = str_replace('""','"',$json_encoded);
    print_r($json_encoded);
}
```

you need to be loggedin to be able to use this php file otherwise it wont show anything
This is a security feature implemented into the website itself. So that other people can't call the 
php file from the outside and get results from it.

### history.php
This php uses a function from the socketConnector.php file and gets the data corresponding to the arguments that were given.
The arguments that is used is date. The format of the date is as following yyyy/mm/dd
````
include('config.php');
include('socketConnector.php');
if($loggedin == true){
    header('Content-Type: application/json');

    $aResult = array();
    if( !isset($aResult['error']) ) {

        switch($_POST['functionname']) {
            case 'return':
                $aResult = history($_POST['arguments']);
            default:
                break;
        }

    }

    echo json_encode($aResult);
}
````
This snippet of the code ensures that the data that was given by the ajax post correctly comes back as a json array.

### countries-table.php
The countries-table.php file has a function that generates a table with a country id so that it can be called by a javascript 
code by the elementid. The code is very straightforward you give you amount of rows and specify the name of the country that
you want to use in your table.

```
<?php function temp_table($country, $rows = 10) { ?>
<table class="temp-table <?php echo $country ?>" id = "temp-table <?php echo $country ?>">
    <thead>
    <tr class="tr-head">
        <th>Nr.</th>
        <?php if ($country === 'all') {?>
        <th>Country</th>
        <?php } ?>
        <th>Place</th>
        <th>Windchill</th>
    </tr>
    </thead>
    <tbody>
    <?php for ($i = 0; $i < $rows; $i++) { ?>
    <tr id = "tr <?php echo $i?>">
        <td> <?php echo $i + 1?></td>
        <td></td>
        <td></td>
        <?php if ($country === 'all') {?>
        <td></td>
        <?php } ?>
    </tr>
    <?php } ?>

        </tbody>

</table>
<?php } ?>
```
All the country table have a number to indicate the ranking, Place and Windchill.

###

## Javascript
### cron.js
This javascript file is the backbone of countries_date.js. Theres an update function that
is used in the same javascript file. The javascript gets the values from the java program that's 
running on the VM. After that it doesn't need to do much. The numbers are already crunched and it 
just needs to be put into the table. Even the order is already set right by the pi. 

```
//puts the data into the table
        function updatetable_simplified(tableId, fields, data, amount, country) {
            var json_data = data;
			var start_rows = 1;
            for(var i = 0; i < amount; i++){
                var check = 0;
                var start = 0;
                var selected_json = data[i];
                console.log(selected_json);
                //loops through the selected keys
				if(country != "SOUTH POLE" && country != "NORTH POLE"){
					$.each(fields, function (index, field) {
						var selected_value = selected_json[field];
						if(check == 0 && selected_value == country){
							check++;
						}
                    if(check == 1) {
                        var x = document.getElementById(tableId).rows[start_rows].cells;
                        if (start == 1) {
                            x[start].innerHTML = selected_value;

                        } else if (start == 2) {
                            x[start].innerHTML = selected_value;
							start_rows++;
                        }
                       
                    }
					start++;

					})
				}
				
				if(country == "SOUTH POLE" || country == "NORTH POLE"){
					if(start_rows < 4){
                $.each(fields, function (index, field) {
                    var selected_value = selected_json[field];
					if(check == 0 && selected_value == country){
						check++;
					}
                    if(check == 1) {
                        var x = document.getElementById(tableId).rows[start_rows].cells;
                        if (start == 1) {
                            x[start].innerHTML = selected_value;

                        } else if (start == 2) {
                            x[start].innerHTML = selected_value;
							start_rows++;
                        }
                       
                    }
					start++;

					})
					}
				}
				

                }

            }
```

This is most important part of the code itself. It puts the values into the corresponding tables.

```
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
```
this gets the values from the php file that calls a function from the socketConnector.php. It gets 
the value from the function by echoing the values in a json_decode(); function.
### date.js
This javascript file is very straightforward. The code makes it so it only goes back 
four weeks prior on the current day and sets the default value of the input to the 
current date of today. The code itself has a function so it converts the date to a format that
is required by jQuery. 

```
function formatDate(date){
		//initialization of the variables
		var day, month, year;
        var fulldate;
		
		day = date.getDate(); // gets the day
        month = date.getMonth() + 1; // gets the the month
        year = date.getFullYear(); // gets the year

		// puts a zero in front of it if under 10
        if(month < 10){
            month = "0" + month.toString();
        }

        if(day < 10){
            day = "0" + day.toString();
        }

        year = year.toString();
        // joins the strings together
        fulldate = [year, month, day].join('-');
        //debug log
		console.log(fulldate);
		//returns the formated date
        return fulldate;
	}
```

this part converts the data into a format that is accepted for changing the max and min values in Jquery

```
function setDate(){
		var currentDate = formatDate(new Date());
		var minimalDate = new Date();
		minimalDate.setDate(minimalDate.getDate() - 28);
		console.log(minimalDate);
		minimalDate = formatDate(minimalDate)
		
		console.log(currentDate);
		$("#date-input").val(currentDate);
		$("#date-input").attr({
			"max" : currentDate,        // current date of the day
			"min" : minimalDate          // max 4 weeks ago
		});
		
	}
```

This function actually puts the attributes into the element of html itself.

###countries_date.js
The countries_date.js uses the same function that is included in cron.js. The script itself is very simple
it gets the values from the input that the user picks with the datepicker in the html code. 
Jquery gets the values when the user presses the submit button and queries a code to a php file 

```
$('#submit').on('click', function(){
		event.preventDefault();
        date = getDate();
		console.log(date);
        jQuery.ajax({
            type: "POST",
            url: 'history.php',
            dataType: 'json',
            async: false,
            data: {functionname: 'return', arguments: date},
            success: function (data){
				console.log(data);
                date = data;
            }
        });
		console.log(date);
		updater(date);
		return false;
    });
```
This small code snippet ensures it gets the data from a php file. The php file is configured in such 
a way so when you give your data in a post type. It reads the arguments in the post data that was given
and gives the history data back in a json_encoded(); function. 

###maps.js
The maps.js sets the markers top three most windchill countries in both the south pole and in the pole 
on the map. The maps.js uses the google maps api. The maps has been setup in the most basic way
and the only thing that is remarkable about this code is that when you click on a marker. It moves 
in the markers corresponding position. 

```
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
```

This is the code that makes the markers and setups a event listener so that when you click it you
move in that direction altought the direction is very very small. It needs to be in the outer 
edge to be able to see the difference in coordination. 

###export.js

In this export file we created artificial HTML elements with the help of jQuery. Then we converted the HTML
elements to XML. The data is directly extracted from the tables, so an extra API call is not needed.
This is beneficial for the server because it takes up a little bit less recourses.

```
$('.btn.export').click(function() {
        var countries = document.createElement("countries");
        $('.card.country').each(function (object) {
            var country = document.createElement("country");
            $(country).attr('name', $('h2', this).text());

            countries.append(country);
=======
### cron-coldest.js
The cron-coldest.js sorts the incoming data from the the java application 
with the key that is presented within. they data is sorted by the windchill. 
So we get a top ten of all the coldest places in the world that comes from our weatherstation
expect the stations located in the north pole and south pole. 

```php
function sortByKey(array, key) {
            return array.sort(function(a, b) {
                var x = parseFloat(a[key]); 
                var y = parseFloat(b[key]);
                
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

        function update_tables(data) {
            for (key in data) {
                console.log(data[key]);
				/**
                $('table tr:nth-child('+key+1+') td:nth-child(2)').append(data[key]['COUNTRY']);
                $('table tr:nth-child('+key+1+') td:nth-child(3)').append(data[key]['LOCATION']);
                $('table tr:nth-child('+key+1+') td:nth-child(4)').append(data[key]['WINDCHILL']);
				*/
				if(key < 10){
					var start = 1;
					var table = document.getElementById("temp-table all").rows[parseInt(key) + 1].cells;
					table[start].innerHTML = data[key]['COUNTRY'];start++;
					table[start].innerHTML = data[key]['LOCATION'];start++;
					table[start].innerHTML = data[key]['WINDCHILL'];
				}
            }
        }
    }
```
The most important functions are these two functions. The two functions update the table and sorts the data by the key that has been given to the function itself.
In the file itself it uses ajax to get the data from the java application from the 
socketConnector.php file.

### export-coldest.js
The export-coldest.js is a script that exports the top ten of the coldest places based on all the weather 
stations that are positioned on earth. The xml data that it exports divides in with country, location, 
windchill. So that the user that downloaded the xml data has the full data provided.

```php
$('.btn.export').click(function() {
        var countries = document.createElement("countries");
        $('.card.country').each(function (object) {
            if(window.location.href.indexOf("coldest.php") <= -1) {
                var country = document.createElement("country");
                $(country).attr('name', $('h2', this).text());
                countries.append(country);
            }


            $('tr', this).not('.tr-head').each(function () {
                var nr = document.createElement("nr");
                var place = document.createElement("place");
                var wnch = document.createElement("WNCH");
                $(place).attr('name', $('td:nth-child(2)', this).text());
                wnch.append($('td:nth-child(3)', this).text());

                country.append(place);
                place.append(wnch);
                
                
            });
        });
```


The above click method starts extracting data from the table(s) and creates the artificial HTML tags.
The tags are appended to each other to create an XML-like structure.

```
function download(filename, text) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);


            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        }

        // Start file download.
        parser = new DOMParser();
        console.log($(countries).prop('outerHTML'));
        xmlDoc = $(countries).prop('outerHTML');
        download('novamoda ' + new Date().toDateString() + '.xml', '<?xml version="1.0" encoding="UTF-8"?>' + xmlDoc);
```

This is where the file is prepared and converted to XML. The download starts.

###graph.js

In this file we got code from our Belgium companios. They used a few technologies from different sources.
We are extracting data from the weather station data file and update the graph every 60 seconds, but only
if a location is clicked.

###jQuery

We used jQuery library to make our work with interacting with the API and website easier.
This is not a framework so it should be allowed for this project.
=======
                
                $(place).attr('name', $('td:nth-child(3)', this).text());
                wnch.append($('td:nth-child(4)', this).text());

                
                if(window.location.href.indexOf("coldest.php") > -1) {
                    var country = document.createElement("country");
                    countries.append(country);
                    $(country).attr('name', $('td:nth-child(2)', this).text());
                    country.append(place);
                }
                place.append(wnch);
                country.append(place);
            });
        });
```

This puts the data onto the xml file so that it can be readily available to download.
>>>>>>> 0e214f4508b97494192609640c6d41796bfb4e1f
