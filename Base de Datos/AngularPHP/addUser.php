<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requestes-Whit, Content-Type, Accept');
header('Content-Type: application/json');
$json = file_get_contents('php://input');
$params = json_decode($json);

require("./DBConnection.php");
$con = returnConection();
 $registro=mysqli_query($con ,"insert into usuario(usuario, contraseña, tipoUsuario, IDInventario)
 values ('$params->usuario','$params->contraseña ', '$params->tipoUsuario', '$params->IDInventario')");

class Result{}

$response = new Result();
$response->resultado = 'OK';
$response->mensaje ='Usuario Agregado';



echo json_encode($response);