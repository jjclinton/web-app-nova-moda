<?php
/**
 * Sidebar menu with all the menu items
 */

defined('INCLUDED') or die();
?>
<!-- zijnavigatie -->
<div class="sidebar">
	<div class="sidebar-inner">
		<div class="sidebar-logo">
			<img src="<?php echo get_url('/imgs/final-logo-example.png'); ?>"/>
		</div>
		<nav class="sidenav">
			<ul class="sidebar-menu">
				<li class="hvr-sweep-to-right"><a href="<?php echo get_url('/places.php'); ?>">Countries</a></li>
				<li class="hvr-sweep-to-right"><a href="#">Poles</a></li>
				<li class="hvr-sweep-to-right"><a href="#">Air presure</a></li>
			</ul>
			<button class="logout-button fade-effect-btn"><a href="<?php echo get_url('/?logout=1'); ?>">Logout</a></button>
		</nav>
	</div>
</div>
<div class="container">