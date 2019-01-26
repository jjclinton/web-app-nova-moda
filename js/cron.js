$(document).ready(function () {
    function updater() {
        var tables = ["temp-table france", "temp-table esp", "temp-table mex", "temp-table us", "temp-table np", "temp-table sp"];
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

        function updatetable_simplified(tableId, fields, data, amount) {
            var rows = '';
            var json_data = data;
            for(var i = 1; i < amount; i++){
                var start = 0;
                var random = Math.floor(Math.random() * 10);
                console.log(random);
                var selected_json = json_data[random];
                console.log(selected_json);
                $.each(fields, function (index, field) {
                    var selected_value = selected_json[field];
                    var x = document.getElementById(tableId).rows[i].cells;
                    x[start].innerHTML = selected_value;
                    start++;
                })

                }

            }


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

    setInterval(updater, 10000);
})