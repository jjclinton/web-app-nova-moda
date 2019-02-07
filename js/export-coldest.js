$(document).ready(function() {
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

        //var xmlWindow = window.open();

        //xmlWindow.document.write(new XMLSerializer().serializeToString(countries));
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
    })
});