<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>
        <script src="<?php echo get_url('/js/graph.js'); ?>"></script>
</head>
<body>
    <div class="card">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle countries" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Countries
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenu1">
          <button class="dropdown-item drp-mex" type="button">Mexico</button>
          <button class="dropdown-item drp-fr" type="button">France</button>
        </div>
      </div>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle locations" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Locations</button>
        <div class="dropdown-menu locations" aria-labelledby="dropdownMenu2" id="countryDropdown">
        </div>
      </div>

        <canvas id="APChart"></canvas>
    </div>
</body>


</html>
