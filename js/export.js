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
    })
});