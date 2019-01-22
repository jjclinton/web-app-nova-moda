<?php
/**
 * Screen for the countries
 */

include('../config.php');

include('../header.php');

//check if user is logged on
if ($loggedin) {
	include('../sidebar.php');
	//table with data here
} else {
	include('../login.php');
}

include('../footer.php');