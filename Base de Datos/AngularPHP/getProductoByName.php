<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requestes-Whit, Content-Type, Accept');
header('Content-Type: application/json');

require("./DBConnection.php");
$con = returnConection();

$registro=mysqli_query($con ,"select *  from producto where nombre = '$_GET[name]'");
if($reg=mysqli_fetch_array($registro)){
    $vec[]=$reg;
}


$cad = json_encode($vec);
echo $cad;