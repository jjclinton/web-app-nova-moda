<?php
/**
 * Screen for the countries
 */

include('config.php');

include('header.php');
//check if user is logged on
if ($loggedin) {
	include('sidebar.php');
	?>
	<div class="head-text">
		<h1>Air pressure graphic</h1>
	</div>
<?php include('graph.php'); ?>
<?php

} else {
	include('login.php');
}

include('footer.php');