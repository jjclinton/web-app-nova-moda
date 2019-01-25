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
    <script src="<?php echo get_url('/js/countries.js'); ?>"></script>
	<div class="head-text">
		<h1>Countries with 5 coldest places</h1>
	</div>
	<div class="row">
		<div class="col-3-4 left">
			<div class="row">
				<div class="col-1-3 col-france">
					<div class="card">
						<div class="card-head">
							<h2>France</h2>
						</div>
						<div class="card-body">
							<?php //hier komt een tabel met 5 koudste plekken in Frankrijk ?>
							Hier komt een tabel
						</div>
					</div>
				</div>
				<div class="col-1-3 col-esp">
					<div class="card">
						<div class="card-head">
							<h2>Spain</h2>
						</div>
						<div class="card-body">
							<?php //hier komt een tabel met 5 koudste plekken in Frankrijk ?>
							Hier komt een tabel
						</div>
					</div>
				</div>
				<div class="col-1-3 col-mex">
					<div class="card">
						<div class="card-head">
							<h2>Mexico</h2>
						</div>
						<div class="card-body">
							<?php //hier komt een tabel met 5 koudste plekken in Frankrijk ?>
							Hier komt een tabel
						</div>
					</div>
				</div>
				<div class="col-1-3 col-us">
					<div class="card">
						<div class="card-head">
							<h2>United States</h2>
						</div>
						<div class="card-body">
							<?php //hier komt een tabel met 5 koudste plekken in Frankrijk ?>
							Hier komt een tabel
						</div>
					</div>
				</div>
				<div class="col-1-3 col-poles">
					<div class="card">
						<div class="card-head">
							<h2>Pole circles</h2>
						</div>
						<div class="card-body">
							<?php //hier komt een tabel met 5 koudste plekken in Frankrijk ?>
							Hier komt een tabel
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-1-4 right">
			<div class="filters">
				<div class="card">
					<div class="card-head">
						<h2>Filters</h2>
					</div>
					<div class="card-body">
						<ul>
							<li><input type="checkbox" name="France" checked="checked" class="chck-france checked"/><label>France</label></li>
							<li><input type="checkbox" name="Esp" checked="checked" class="chck-esp checked"/><label>Spain</label></li>
							<li><input type="checkbox" name="Mex" checked="checked" class="chck-mex checked"/><label>Mexico</label></li>
							<li><input type="checkbox" name="us" checked="checked" class="chck-us checked"/><label>United States</label></li>
							<li><input type="checkbox" name="Poles" checked="checked" class="chck-poles checked"/><label>Pole circles</label></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
<?php

} else {
	include('login.php');
}

include('footer.php');