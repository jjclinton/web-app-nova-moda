$(document).ready(function () {
    function updater() {
        //table names for calling
        var tables = ["temp-table france", "temp-table esp", "temp-table mex", "temp-table us", "temp-table np", "temp-table sp"];
        var countries = ["FRANCE", "SPAIN", "MEXICO", "UNITED STATES", "NORTH POLE", "SOUTH POLE"];
        //gets the data from a php file and parses it into a json variable
        var json_php_data = [];
            $.ajax({
                url : 'http://localhost:63342/novamoda/encoder.php',
                type : 'POST',
                dataType : 'json',
                async: false,
                success : function (data) {
                    json_php_data = data;
                    console.log("parsed");
                }
            })

        console.log(json_php_data);

        //puts the data into the table
        function updatetable_simplified(tableId, fields, data, amount, country) {
            var rows = '';
            var json_data = data;
            for(var i = 1; i < amount; i++){
                var check = 0;
                var country_check = 0;
                var start = 0;
                var selected_json = data[i];
                console.log(selected_json);
                //loops through the selected keys
                $.each(fields, function (index, field) {
                    var selected_value = selected_json[field];
                    if(country == selected_value && check == 0){
                        check++;
                    }
                    if(check == 1) {
                        var x = document.getElementById(tableId).rows[i].cells;
                        if (start == 1) {
                            x[start].innerHTML = selected_value;

                        } else if (start == 2) {
                            x[start].innerHTML = selected_value;
                        }
                        start++;
                    }

                })

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
    //sets interval for updating tables
    updater();
    setInterval(updater, 60000);
})