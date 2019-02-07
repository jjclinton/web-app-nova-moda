$(document).ready(function () {
    function updater() {
        $('tr').each(function() {
            $('table tr td').not(':first-child').empty();
        });
        
        //table names for calling
        var tables = ["temp-table all"];
        var countries = ["ALL"];
        //gets the data from a php file and parses it into a json variable
        var json_php_data = [];
            $.ajax({
                url : 'https://novamodaweather.site/encoder.php',
                type : 'POST',
                dataType : 'json',
                async: false,
                success : function (data) {
                    for (key in data) {
                        if (data[key]['COUNTRY'] == 'SOUTH POLE' || data[key]['COUNTRY'] == 'NORTH POLE') {
                            continue
                        } else {
                            json_php_data.push(data[key]);
                        }
                    }
                    json_php_data = sortByKey(json_php_data, 'WINDCHILL');
                    update_tables(json_php_data);
                }
            });

        
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
    
    //sets interval for updating tables
    updater();
    setInterval(updater, 10000);
})