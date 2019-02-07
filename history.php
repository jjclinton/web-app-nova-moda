<?php 
include('config.php');
include('socketConnector.php');
if($loggedin == true){
header('Content-Type: application/json');

    $aResult = array();
    if( !isset($aResult['error']) ) {

        switch($_POST['functionname']) {
            case 'return':
               $aResult = history($_POST['arguments']);
            default:
               break;
        }

    }

    echo json_encode($aResult);
}
?>
