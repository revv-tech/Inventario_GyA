<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requestes-Whit, Content-Type, Accept');

$json = file_get_contents('php://input');
$params = json_decode($json);
require("./DBConnection.php");
$con = returnConection();

mysqli_query($con ,"update producto set 
    cantidad='$params->cantidad', 
    codigoBarra='$params->codigoBarra', 
    codigoCabys='$params->codigoCabys', 
    iva='$params->iva', 
    typeiva='$params->typeiva',
    nombre='$params->nombre', 
    precio='$params->precio'
    where IDProducto=$params->IDProducto");

class Result{}

$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'Producto modificado';


header('Content-Type: application/json');
echo json_encode($response);