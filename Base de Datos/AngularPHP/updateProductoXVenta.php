<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requestes-Whit, Content-Type, Accept');

$json = file_get_contents('php://input');
$params = json_decode($json);
require("./DBConnection.php");
$con = returnConection();

mysqli_query($con ,"update prductoxventa set IDProducto='$params->IDProducto',
IDVenta='$params->IDVenta',
total='$params->total',
subtotal='$params->subtotal',
cantidad='$params->cantidad' 
where IDProductoXVenta =$params->IDProductoXVenta ");

class Result{}

$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'productoxventa modificado';


header('Content-Type: application/json');
echo json_encode($response);