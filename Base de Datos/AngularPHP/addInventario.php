<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requestes-Whit, Content-Type, Accept');
header('Content-Type: application/json');
$json = file_get_contents('php://input');
$params = json_decode($json);

require("./DBConnection.php");
$con = returnConection();
 $registro=mysqli_query($con ,"insert into inventario (IDInventario, nombre, IDBodega) values ('NULL','$params->nombre', '$params->IDBodega')");

class Result{}

$response = new Result();
$response->resultado = 'OK';
$response->mensaje ='Inventario Agregado';



echo json_encode($response);