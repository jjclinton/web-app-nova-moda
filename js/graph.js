
$(document).ready(function() {
    var chart;
    var data;
    var previousDataPoint;

    // nu op 2000 voor demonstratie, 60000 is correcte waarde
    var interval = window.setInterval(intervalCallBack, 61000);
    var locationObjFR = {};
    var locationObjMEX = {};
    
    function get_data() {
        var json_php_data = [];
        $.ajax({
            url : 'https://novamodaweather.site/encoder.php',
            type : 'POST',
            dataType : 'json',
            async: false,
            success : function (data) {
                json_php_data = data;
                for (var key in data) {
                    if (data[key]['COUNTRY'] == 'FRANCE') {
                        locationObjFR[data[key]['LOCATION']] = data[key]['AIRPRESSURE'];
                    }
                    
                    if (data[key]['COUNTRY'] == 'MEXICO') {
                        locationObjMEX[data[key]['LOCATION']] = data[key]['AIRPRESSURE'];
                    }
                }
            }
        })
    }
    
    setInterval(function() {
        get_data();
    }, 60000);
    
    function reset_data() {
        data.datasets[0].data = [];
    }

    // initialiseren: data van voorbije uur ophalen en klaarzetten voor grafiek
    function initialize() {

        data = {
            datasets: [{
                label: "Air pressure in hPa",
                backgroundColor: 'rgb(42, 114, 154)',
                fill: false,
                borderColor: 'rgb(82, 158, 203)',
            }]
        };

        drawGraph();
    }

    // grafiek tekenen
    function drawGraph() {
        var ctx = document.getElementById('APChart').getContext('2d');
        chart = new Chart(ctx, {
            // type van grafiek
            type: 'line',

            // gebruikte data
            data: data,

            // eventuele configuratieopties
            options: {}
        });
    }

    // nieuw datapunt toevoegen aan grafiek
    function addNewDataPoint() {
        // mode om zonder API te kunnen testen

        if (data.datasets.length > 0) {

            // oudste label en datapoint verwijderen uit begin arrays
            if (data.labels.length > 60) {
                data.labels.shift();
                data.datasets[0].data.shift();
            }
            
            if ($('.dropdown-toggle.countries').text() !== 'Locations') {
                if ($('.dropdown-toggle.countries').text() === 'France') {
                    data.datasets[0].data.push(parseFloat(locationObjFR[$('.dropdown-toggle.locations').text()]));
                    console.log(parseFloat(locationObjFR[$('.dropdown-toggle.locations').text()]));
                }
                
                if ($('.dropdown-toggle.countries').text() === 'Mexico') {
                    data.datasets[0].data.push(parseFloat(locationObjMEX[$('.dropdown-toggle.locations').text()]));
                    console.log(parseFloat(locationObjMEX[$('.dropdown-toggle.locations').text()]));
                }
            }

            data.labels.push(getCurrentTime());

            // chart verwittigen dat data geüpdatet is
            chart.update();

        }

    }

    // functie wordt iedere x milliseconden uitgevoerd
    function intervalCallBack() {
        addNewDataPoint();
    }

    // geeft string met huidig tijdsstip terug in formaat hh:mm
    function getCurrentTime() {
        var date = new Date();
        var str = date.toTimeString();
        str = str.substring(0, 5);
        return str;
    }
    
    function PopulateDropdown(country){
        // Get list of locations for that country.
        $('#countryDropdown').append('')
        
        if (country === 'FRANCE') {
            for (var value in locationObjFR){
               $('#countryDropdown').append('<button class="lo dropdown-item" type="button">' + value + '</button>');
                reset_data();
            }
        }
        
        if (country === 'MEXICO') {
            for (var value in locationObjMEX){
               $('#countryDropdown').append('<button class="dropdown-item" type="button">' + value + '</button>');
                reset_data();
            }
        }
    
        $('.locations .dropdown-item').click(function() {
            $('.dropdown-toggle.locations').text($(this).text());
            reset_data();
        })
    }
    
    $('.drp-fr').click(function() {
        get_data();
        addNewDataPoint();
        $('.dropdown-menu.locations').empty();
        $('.dropdown-toggle.countries').text('France');
        PopulateDropdown('FRANCE');
    })

    $('.drp-mex').click(function() {
        get_data();
        addNewDataPoint();
        $('.dropdown-menu.locations').empty();
        $('.dropdown-toggle.countries').text('Mexico');
        PopulateDropdown('MEXICO');
    })
    
    initialize();
    
});