$(document).ready(function () {
    function updater() {
        //table names for calling
        var tables = ["temp-table france", "temp-table esp", "temp-table mex", "temp-table us", "temp-table np", "temp-table sp"];
        //gets the data from a php file and parses it into a json varibale
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
        // for debugging
        console.log(json_php_data);

        //puts the data into the table
        function updatetable_simplified(tableId, fields, data, amount) {
            var rows = '';
            var json_data = data;
            for(var i = 1; i < amount; i++){
                var start = 0;
                var random = Math.floor(Math.random() * 10);
                console.log(random);
                var selected_json = json_data[random];
                console.log(selected_json);
                var feel = (10 * Math.sqrt(parseFloat(selected_json["WDSP"])) - parseFloat(selected_json["WDSP"]) + 10.5) * (33 - parseFloat(selected_json["TEMP"]));
                feel = feel.toFixed(2);
                $.each(fields, function (index, field) {
                    var selected_value = selected_json[field];
                    var x = document.getElementById(tableId).rows[i].cells;
                    if(start < 2){
                        x[start].innerHTML = selected_value;

                    }

                    else if(start == 2){
                        x[start].innerHTML = feel;
                    }
                    start++;

                })

                }

            }

        //activates the functions for the table update
        for(var i = 0; i < 6; i++){
            var random = Math.random(0,10);
            var select = tables[i];
            console.log(select);
            if(i < 4){
                updatetable_simplified(select,["STN", "STN", "DEWP"], json_php_data, 11);
            }

            else if(i => 4){
                updatetable_simplified(select, ["STN", "STN", "DEWP"], json_php_data,4);
            }
        }


        console.log(json_php_data[1]);
    }
    //sets interval for updating tables
    setInterval(updater, 10000);
})