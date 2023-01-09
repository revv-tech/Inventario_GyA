<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requestes-Whit, Content-Type, Accept');
header('Content-Type: application/json');
$json = file_get_contents('php://input');
$params = json_decode($json);

require("./DBConnection.php");
$con = returnConection();
 $registro=mysqli_query($con ,"insert into venta (IDVenta, fecha, descuento, cantidad, total, subtotal, metodo, IDInventario) 
 values ('NULL','$params->fecha', '$params->descuento', '$params->cantidad', '$params->total', '$params->subtotal', '$params->metodo', '$params->IDInventario')");

class Result{}

$response = new Result();
$response->resultado = 'OK';
$response->mensaje ='Venta Agregada';



echo json_encode($response);