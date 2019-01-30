$(document).ready(function() {
    $('.btn.export').click(function() {
        var countries = document.createElement("countries");
        $('.card.country').each(function (object) {
            var country = document.createElement("country");
            $(country).attr('name', $('h2', this).text());

            countries.append(country);

            $('tr', this).not(':first-child').each(function () {
                var nr = document.createElement("nr");
                var place = document.createElement("place");
                var wnch = document.createElement("WNCH");

                nr.append($('td:first-child', this).text());
                place.append($('td:nth-child(2)', this).text());
                wnch.append($('td:nth-child(3)', this).text());

                country.append(nr);
                country.append(place);
                country.append(wnch);
            });
        });

        //var xmlWindow = window.open();

        //xmlWindow.document.write(new XMLSerializer().serializeToString(countries));
        console.log(countries);
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