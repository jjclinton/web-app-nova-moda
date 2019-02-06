$(document).ready(function () {
	
	function formatDate(date){
		var day, month, year;
        var fulldate;
		
		day = date.getDate();
        month = date.getMonth() + 1;
        year = date.getFullYear();
		
        if(month < 10){
            month = "0" + month.toString();
        }

        if(day < 10){
            day = "0" + day.toString();
        }

        year = year.toString();
        fulldate = [year, month, day].join('-');
		console.log(fulldate);
        return fulldate;
	}

	function setDate(){
		var currentDate = formatDate(new Date());
		var minimalDate = new Date();
		minimalDate.setDate(minimalDate.getDate() - 28);
		console.log(minimalDate);
		minimalDate = formatDate(minimalDate)
		
		console.log(currentDate);
		$("#date-input").val(currentDate);
		$("#date-input").attr({
			"max" : currentDate,        // current date of the day
			"min" : minimalDate          // max 4 weeks ago
		});
		
	}
	
	setDate();
});
