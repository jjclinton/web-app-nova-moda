<?php
/**
 * Configuration file
 **/
require('functions.php');
define('INCLUDED', true);
//start session to save loggedin users
session_start();

//not loggedin by default
$loggedin = false;

//username and password hash for security
$username = "novamoda";
$hash = "$2y$10$8eny5silxm6o/Mgekb/I/.MP3TfiO6r4mAD/wXPcwnpvdwLT3E0.m";

//no login error by default
$login_error = "";

//is the get variable logout is empty and not 1 do not reset the session array
if (!empty($_GET['logout'])) {
	if ($_GET['logout'] == '1') {
		$_SESSION = [];
	}
}

//if the post variables are not empty, check the post variables username and verify password with hash
if (!empty($_POST['username']) && !empty($_POST['password'])) {
	if ( $_POST['username'] == $username && password_verify($_POST['password'], $hash) ) {
		$_SESSION['username'] = $_POST['username'];
		$_SESSION['password'] = $_POST['password'];
	} else {
		$login_error = "invalid username or password";
	}
}

//check session username and password, so the user stays loggedin
if (!empty($_SESSION['username']) && !empty($_SESSION['password'])) {
	if ( $_SESSION['username'] == $username && password_verify($_SESSION['password'], $hash) ) {
		$loggedin = true;
	}
}