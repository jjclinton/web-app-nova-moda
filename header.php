<?php
/**
 * Header template with opening body tag and css inclusion
 *
 * This file will be loaded everywhere
 **/
defined('INCLUDED') or die();
?>


<html>
<head>
    <script src="<?php echo get_url('/node_modules/jquery/dist/jquery.min.js'); ?>"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<link rel="stylesheet" href="<?php echo get_url('/css/style.css'); ?>"/>
</head>
<body>


