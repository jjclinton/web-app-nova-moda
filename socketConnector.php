<?php

function update(){
    //Establish connection with storage application
    $socket = connectSocket();

    //Request update data
    $input = "update\r\n";
    socket_write($socket, $input, strlen($input));
    $result = socket_read($socket, 4096, PHP_NORMAL_READ);

    //Close socket
    socket_close($socket);

    //Parse data into associative array
    $parsed = parseData($result);

    //Return parsed data to caller
    return $parsed;
}

//Establishes a connection with the local java storage application
function connectSocket(){
    $address = "localhost";
    $port = 54872;

    //Attempt to create a socket resource and echo an error code if the attempt fails
    if (($socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP)) === false) {
        echo "socket creation failed: " .socket_strerror(socket_last_error())."\n";
    }

    //Attempt to establish socket connection and echo an error code if the attempt fails
    if (($connection = socket_connect($socket, $address, $port)) === false){
        echo "Socket connection failed: ".socket_strerror(socket_last_error())."\n";
    }

    return $socket;
}

function parseData($result){
    // Split into rows
    $entries = explode(";", $result);
    $aso = [];

    // Extract header
    $header = explode(",", array_shift($entries));

    // Create associative array
    foreach($entries as $entry) {
        $arr = explode(",", $entry);
        array_push($aso, array_combine($header, explode(",", $entry)));
    }

    return $aso;
}

//$data = update();

// Print result
//foreach($data as $row) {
// print_r($row);
// echo "<br><br>";
//}
?>
