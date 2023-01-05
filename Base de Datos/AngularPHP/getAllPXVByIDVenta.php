<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requestes-Whit, Content-Type, Accept');
header('Content-Type: application/json');

require("./DBConnection.php");
$con = returnConection();

$registro=mysqli_query($con, "SELECT producto.IDProducto, productoxventa.cantidad, producto.codigoBarra, producto.codigoCabys, producto.iva, producto.nombre, producto.precio, producto.IDBodega, productoxventa.IDProductoXVenta, productoxventa.IDVenta from producto INNER JOIN productoxventa ON productoxventa.IDVenta = '$_GET[IDVenta]' and productoxventa.IDProducto = producto.IDProducto;");
$vec=[];
while($reg=mysqli_fetch_array($registro)){
    $vec[]=$reg;
}
$cad = json_encode($vec);
echo $cad;