<?php

include('config.php');
include('socketConnector.php');
if($loggedin == true){
    $json_encoded = json_encode(update());
    $json_encoded = str_replace("\\r", "", $json_encoded);
    $json_encoded = str_replace("\\","",$json_encoded);
    $json_encoded = str_replace('""','"',$json_encoded);
    print_r($json_encoded);
}
?>
