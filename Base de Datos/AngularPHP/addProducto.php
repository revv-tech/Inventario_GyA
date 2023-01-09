<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requestes-Whit, Content-Type, Accept');
header('Content-Type: application/json');
$json = file_get_contents('php://input');
$params = json_decode($json);

require("./DBConnection.php");
$con = returnConection();
 $registro=mysqli_query($con ,"insert into producto (IDProducto, cantidad, codigoBarra, codigoCabys, iva, typeiva, nombre, precio, IDBodega)
 values (NULL, $params->cantidad, '$params->codigoBarra', '$params->codigoCabys', $params->iva, '$params->typeiva','$params->nombre', $params->precio, 2)");

class Result{}

$response = new Result();
$response->resultado = 'OK';
$response->mensaje ='Producto Agregado';



echo json_encode($response);