<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requestes-Whit, Content-Type, Accept');
header('Content-Type: application/json');

require("./DBConnection.php");
$con = returnConection();

$registro=mysqli_query($con ,"SELECT producto.codigoBarra, producto.codigoCabys, producto.nombre, SUM(productoxventa.cantidad) as cantidad FROM productoxventa INNER JOIN venta ON productoxventa.IDVenta = venta.IDVenta INNER JOIN producto ON productoxventa.IDProducto = producto.IDProducto WHERE venta.fecha >= '$_GET[fechaInicio]' and venta.fecha <= '$_GET[fechaFinal]' GROUP BY producto.IDProducto ORDER BY cantidad");
$vec=[];
while($reg=mysqli_fetch_array($registro)){
    $vec[]=$reg;
}
$cad = json_encode($vec);
echo $cad;