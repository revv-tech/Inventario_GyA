<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requestes-Whit, Content-Type, Accept');

$json = file_get_contents('php://input');
$params = json_decode($json);
require("./DBConnection.php");
$con = returnConection();

mysqli_query($con ,"update inventario set IDInventario='$params->IDInventario',
nombre='$params->nombre',
IDBodega='$params->IDBodega' 
where IDInventario=$params->IDInventario");

class Result{}

$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'inventario modificado';


header('Content-Type: application/json');
echo json_encode($response);