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
    <script src="<?php echo get_url('/js/export-coldest.js'); ?>"></script>
    <script src="<?php echo get_url('/js/cron-coldest.js'); ?>"> </script>
	<div class="head-text">
		<h1>Coldest places per country</h1>
	</div>
    <div class="export">
        <button class="btn export">Export data</button>
    </div>
	<div class="row">
		<div>
			<div class="row">
				<div class="col-1-2 col-france">
					<div class="card country">
						<div class="card-head">
							<h2>Coldest places</h2>
						</div>
						<div class="card-body">
							<?php temp_table('all') ?>
						</div>
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