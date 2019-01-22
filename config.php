<?php
session_start();

$loggedin = false;

$username = "novamoda";
$hash = "$2y$10$8eny5silxm6o/Mgekb/I/.MP3TfiO6r4mAD/wXPcwnpvdwLT3E0.m";

$login_error = "";


if (!empty($_GET['logout'])) {
	if ($_GET['logout'] == '1') {
		$_SESSION = [];
	}
}

if (!empty($_POST)) {
	if ( $_POST['username'] == $username && password_verify($_POST['password'], $hash) ) {
		$_SESSION['username'] = $_POST['username'];
		$_SESSION['password'] = $_POST['password'];
	} else {
		$login_error = "invalid username or password";
	}
}

if (!empty($_SESSION['username']) && !empty($_SESSION['password'])) {
	if ( $_SESSION['username'] == $username && password_verify($_SESSION['password'], $hash) ) {
		$loggedin = true;
	}
}