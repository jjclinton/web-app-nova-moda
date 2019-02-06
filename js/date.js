$(document).ready(function () {
	
	function formatDate(date){
		//initialization of the variables
		var day, month, year;
        var fulldate;
		
		day = date.getDate(); // gets the day
        month = date.getMonth() + 1; // gets the the month
        year = date.getFullYear(); // gets the year

		// puts a zero in front of it if under 10
        if(month < 10){
            month = "0" + month.toString();
        }

        if(day < 10){
            day = "0" + day.toString();
        }

        year = year.toString();
        // joins the strings together
        fulldate = [year, month, day].join('-');
        //debug log
		console.log(fulldate);
		//returns the formated date
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
