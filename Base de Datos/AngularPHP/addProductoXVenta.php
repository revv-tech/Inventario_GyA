<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requestes-Whit, Content-Type, Accept');
header('Content-Type: application/json');
$json = file_get_contents('php://input');
$params = json_decode($json);

require("./DBConnection.php");
$con = returnConection();
 $registro=mysqli_query($con ,"insert into productoxventa (IDProductoXVenta, IDProducto, IDVenta, cantidad) values ('NULL','$params->IDProducto', '$params->IDVenta', '$params->cantidad')");

class Result{}

$response = new Result();
$response->resultado = 'OK';
$response->mensaje ='productoxventa Agregado';



echo json_encode($response);