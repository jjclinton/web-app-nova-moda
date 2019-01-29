<?php
/**
 * Screen for the countries
 */

include('config.php');

include('header.php');
//check if user is logged on
if ($loggedin) {
	include('sidebar.php');
	include('countries-table.php');
	?>
    <script src="<?php echo get_url('/js/countries.js'); ?>"></script>
    <script src="<?php echo get_url('/js/export.js'); ?>"></script>
    <script src="<?php echo get_url('/js/cron.js'); ?>"> </script>
	<div class="head-text">
		<h1>Coldest places per country</h1>
	</div>
    <div class="export">
        <button class="btn export">Export data</button>
    </div>
	<div class="row">
		<div class="col-3-4 left">
			<div class="row">
				<div class="col-1-3 col-france">
					<div class="card country">
						<div class="card-head">
							<h2>France</h2>
						</div>
						<div class="card-body">
							<?php temp_table('france') ?>
						</div>
					</div>
				</div>
				<div class="col-1-3 col-esp">
					<div class="card country">
						<div class="card-head">
							<h2>Spain</h2>
						</div>
						<div class="card-body">
							<?php temp_table('esp') ?>
						</div>
					</div>
				</div>
				<div class="col-1-3 col-mex">
					<div class="card country">
						<div class="card-head">
							<h2>Mexico</h2>
						</div>
						<div class="card-body">
							<?php temp_table('mex') ?>
						</div>
					</div>
				</div>
				<div class="col-1-3 col-us">
					<div class="card country">
						<div class="card-head">
							<h2>United States</h2>
						</div>
						<div class="card-body">
							<?php temp_table('us') ?>
						</div>
					</div>
				</div>
				<div class="col-1-3 col-np">
					<div class="card country">
						<div class="card-head">
							<h2>North Pole</h2>
						</div>
						<div class="card-body">
							<?php temp_table('np', 3) ?>
						</div>
					</div>
				</div>
				<div class="col-1-3 col-sp">
					<div class="card country">
						<div class="card-head">
							<h2>South Pole</h2>
						</div>
						<div class="card-body">
							<?php temp_table('sp', 3) ?>
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
							<li><input type="checkbox" name="np" checked="checked" class="chck-np checked"/><label>North Pole</label></li>
							<li><input type="checkbox" name="sp" checked="checked" class="chck-sp checked"/><label>South Pole</label></li>
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