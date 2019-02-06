"# web-app-nova-moda" 


username: novamoda

password: k0R*l%mK4$95

# Documentation

## Introduction

This documentation is for the web application for the weather stations
with info relevant to Nova Moda's requirements.

## Configuration
In the configuration file the login settings are configured. There is no database.
The password hash is for safety requirements. So the password itself is nowhere
to be fount in the PHP files. The username is not hashed because it doesn't need to
be. Username is open for everyone

At the top of the configuration file the session is started so if the user logs in
the user stays logged in during the entire session, until the user closes the window.

##Javascript
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
```


