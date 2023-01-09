<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requestes-Whit, Content-Type, Accept');

$json = file_get_contents('php://input');
$params = json_decode($json);
require("./DBConnection.php");
$con = returnConection();

mysqli_query($con ,"update venta set IDVenta='$params->IDVenta',
factura='$params->factura',
fecha='$params->fecha',
descuento=$params->descuento,
cantidad='$params->cantidad',
total='$params->total',
subtotal='$params->subtotal',
metodo='$params->metodo',
IDInventario='$params->IDInventario' 
where IDVenta=$params->IDVenta");

class Result{}

$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'Venta modificada';


header('Content-Type: application/json');
echo json_encode($response);