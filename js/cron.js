$(document).ready(function () {
    function updater() {
        var tables = ["temp-tablefrance", "temp-tableesp", "temp-tablemex", "temp-tableus", "temp-tablenp", "temp-tablesp"];
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

        function updatetable(tableId, fields, data, amount) {
            var rows = '';
            var standstill = 0;
            $.each(data, function (index, item) {
                var row = '<tr>';
                $.each(fields, function (index, field) {
                    row += '<td>' + item[field + ''] + '</td>';
                });
                rows += row + '<tr>';
                standstill++;
                if(standstill == amount){
                    return false;
                }
            });
            $('#' + tableId + ' tbody').html(rows);

        }

        for(var i = 0; i < 6; i++){
            var random = Math.random(0,10);
            var select = tables[i];
            if(i < 4){
                updatetable(select, ['STN', 'STN', 'DEWP'], json_php_data[random], 10);
            }

            if(i => 4){
                updatetable(select, ['STN', 'STN', 'DEWP'], json_php_data[random], 5)
            }
        }
        console.log(json_php_data);
    }

    setInterval(updater, 10000);
})