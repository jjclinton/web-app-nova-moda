<?php
include('config.php');

include('header.php');

if ($loggedin) {
	include('sidebar.php');
} else {
	include('login.php');
}

include('footer.php');