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
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCvNireP8cx6TyNSq4R3FT0VFn33tPgj0s"></script>
<style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100%;
        width: 106.5%;
		margin-left: -100px;
      }

    </style>
<html>
  <head>
    <!-- This stylesheet contains specific styles for displaying
         the map on this page. Replace it with your own styles as
         described in the documentation:
         https://developers.google.com/maps/documentation/javascript/tutorial
    -->
  </head>
  <body>
    <div id="map">
    <script src = "<?php echo get_url('/js/maps.js');?>"></script>
    </div>
  </body>
</html>
<?php
} else {
	include('login.php');
}

include('footer.php');