<?php
/**
 * Main template file
 *
 * This file will be rendered when starting the application
 */

include('config.php');

include('header.php');

//check if user is logged on
if ($loggedin) {
	include('sidebar.php');
} else {
	include('login.php');
}

include('footer.php');