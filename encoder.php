<?php

// Example of String received from socket
$result = "STN,DATE,TIME,TEMP,DEWP,STP,SLP,VISIB,WDSP,PRCP,SNDP,CLDC,WNDDIR,RAIN,SNOW,FROST,HAIL,TNDR,TORN
  10880,2019-01-25,13:41:52,-5.3,-7.3,1015.4,1005.2,10.9,21.9,0.0,0.0,34.2,245,1,0,0,0,0,0
  80250,2019-01-25,13:41:52,2.5,-2.9,1015.5,1019.7,8.4,12.0,0.25,0.0,50.0,219,0,1,0,0,0,0
  128050,2019-01-25,13:41:52,-1.6,-5.1,1002.2,1019.6,15.6,14.7,0.08,1.1,90.9,4,1,1,1,0,0,0
  539590,2019-01-25,13:41:52,-4.4,-14.0,1010.4,1029.3,14.0,7.9,0.01,0.0,50.0,238,1,1,0,0,0,0
  724673,2019-01-25,13:41:52,-14.0,-20.1,1018.7,1018.6,14.6,11.5,0.01,0.0,87.3,134,1,1,0,0,0,0
  724674,2019-01-25,13:41:52,-14.5,-17.5,1027.7,1023.0,15.2,6.1,0.02,0.0,74.7,124,1,1,0,0,0,0
  724675,2019-01-25,13:41:52,-14.3,-20.1,891.7,1016.9,29.7,5.6,0.01,3.8,73.7,356,1,1,1,0,0,0
  724680,2019-01-25,13:41:52,-1.2,-12.6,930.6,1011.7,91.7,12.7,0.0,0.0,98.7,305,1,0,0,0,0,0
  724684,2019-01-25,13:41:52,-12.9,-20.9,996.2,1024.7,32.3,27.6,0.0,0.0,92.4,339,1,0,0,0,0,0
  724685,2019-01-25,13:41:52,-10.8,-17.6,1013.6,1019.4,46.9,18.2,0.0,0.0,96.9,89,1,0,0,0,0,0";

function get_list($data)
{


    // Splitting into rows
    $entries = explode("\n", $data);
    $aso = [];

    // Extract header
    $header = explode(",", array_shift($entries));

    // Create associative array
    foreach ($entries as $entry) {
        $arr = explode(",", $entry);
        array_push($aso, array_combine($header, explode(",", $entry)));
    }

    print_r(json_encode($aso));
}

get_list($result);


?>