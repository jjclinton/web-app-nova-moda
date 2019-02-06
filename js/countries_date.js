$(document).ready(function () {
    var date;
	
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
	
    function updater(json_php_data) {
        //table names for calling
        var tables = ["temp-table france", "temp-table esp", "temp-table mex", "temp-table us", "temp-table np", "temp-table sp"];
        var countries = ["FRANCE", "SPAIN", "MEXICO", "UNITED STATES", "NORTH POLE", "SOUTH POLE"];
        //gets the data from a php file and parses it into a json variable

        console.log(json_php_data);
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

        //activates the functions for the table update
        for(var i = 0; i < 6; i++){
            var select = tables[i];
            var select_countries = countries[i];
            console.log(select);
            if(i < 4){
                updatetable_simplified(select,["COUNTRY", "LOCATION", "WINDCHILL"], json_php_data, json_php_data.length, select_countries);
            }

            else if(i => 4){
                updatetable_simplified(select, ["COUNTRY", "LOCATION", "WINDCHILL"], json_php_data,json_php_data.length, select_countries);
            }
        }
    }

    function getDate(){
        var day, month, year;
        var fulldate;
        var date = new Date($('#date-input').val());
        day = date.getDate();
        month = date.getMonth() + 1;
        year = date.getFullYear();
        if(month < 10){
            month = "0" + month.toString();
            console.log(month);
        }

        if(day < 10){
            day = "0" + day.toString();
        }

        year = year.toString();
        fulldate = [year, month, day].join('-');
        return fulldate;
    }
    
});