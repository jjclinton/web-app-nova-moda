<?php
session_start();

$loggedin = false;

$username = "root";
$password = "root";

$login_error = "";


if (!empty($_GET['logout'])) {
	if ($_GET['logout'] == '1') {
		$_SESSION = [];
	}
}

if (!empty($_POST)) {
	if ( $_POST['username'] == $username && $_POST['password'] == $password ) {
		$_SESSION['username'] = $_POST['username'];
		$_SESSION['password'] = $_POST['password'];
	} else {
		$login_error = "invalid username or password";
	}
}

if (!empty($_SESSION['username']) && !empty($_SESSION['password'])) {
	if ( $_SESSION['username'] == $username && $_SESSION['password'] == $password ) {
		$loggedin = true;
	}
}