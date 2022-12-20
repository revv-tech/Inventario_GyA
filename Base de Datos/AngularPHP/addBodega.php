<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requestes-Whit, Content-Type, Accept');
header('Content-Type: application/json');
$json = file_get_contents('php://input');
$params = json_decode($json);

require("./DBConnection.php");
$con = returnConection();       INSERT INTO `bodega` (`IDBodega`) VALUES (NULL);
 $registro=mysqli_query($con ,"insert into bodega (IDBodega) values ('NULL')");

class Result{}

$response = new Result();
$response->resultado = 'OK';
$response->mensaje ='Bodega Agregada';



echo json_encode($response);