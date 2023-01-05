<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requestes-Whit, Content-Type, Accept');

require("./DBConnection.php");
$con = returnConection();
$registro=mysqli_query($con ,"delete from productoxventa where IDProductoXVenta =$_GET[IDProductoXVenta ]");

class Result{}

$response = new Result();
$response->resultado = 'OK';
$response->mensaje ='productoxventa eliminado';

header('Content-Type: application/json');
echo json_encode($response);