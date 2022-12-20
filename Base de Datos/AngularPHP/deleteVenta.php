<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requestes-Whit, Content-Type, Accept');

require("./DBConnection.php");
$con = returnConection();
$registro=mysqli_query($con ,"delete from venta where IDVenta=$_GET[IDVenta]");

class Result{}

$response = new Result();
$response->resultado = 'OK';
$response->mensaje ='Venta eliminada';

header('Content-Type: application/json');
echo json_encode($response);