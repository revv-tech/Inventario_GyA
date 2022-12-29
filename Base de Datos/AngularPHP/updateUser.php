<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requestes-Whit, Content-Type, Accept');

$json = file_get_contents('php://input');
$params = json_decode($json);
require("./DBConnection.php");
$con = returnConection();

mysqli_query($con ,"update usuario set usuario='$params->usuario',
contraseña='$params->contraseña',
tipoUsuario='$params->tipoUsuario',
IDInventario='$params->IDInventario' 
where IDUsuario='$params->IDUsuario'");

class Result{}

$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'Usuario modificado';


header('Content-Type: application/json');
echo json_encode($response);